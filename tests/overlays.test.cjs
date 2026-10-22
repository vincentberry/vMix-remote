const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');
const { JSDOM } = require('jsdom');
const ts = require('typescript');

const scripts = ['app', 'processSettings', 'processVideoSources'].map(name => {
    const source = fs.readFileSync(path.join(__dirname, '../app/src/assets/TypeScript', `${name}.ts`), 'utf8');
    return ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2016 } }).outputText;
});

function setup() {
    const dom = new JSDOM(`
        <div id="projetName"></div>
        <div id="videoSourcesContainer"></div>
        <div id="audioBusesContainer"></div>
        <div id="audioSourcesContainer"></div>
    `);
    const context = vm.createContext({ document: dom.window.document, window: {}, setInterval: () => 0 });
    scripts.forEach(script => vm.runInContext(script, context));

    function poll(version, overlays = {}, inputCount = 1) {
        const inputs = Array.from({ length: inputCount }, (_, i) =>
            `<input key="input-${i + 1}" number="${i + 1}" title="Camera ${i + 1}" type="Capture"/>`).join('');
        const overlayXml = Object.entries(overlays).map(([number, input]) =>
            `<overlay number="${number}">${input}</overlay>`).join('');
        const xml = new dom.window.DOMParser().parseFromString(
            `<vmix>${version ? `<version>${version}</version>` : ''}<inputs>${inputs}</inputs>
            <overlays>${overlayXml}</overlays><preview>2</preview><active>3</active></vmix>`, 'text/xml');
        context.processSettings(xml);
        context.processVideoSources(xml);
    }

    const buttons = (key = 'input-1') => Array.from(dom.window.document.querySelectorAll(
        `.video-source[data-key="${key}"] > .overlay button:not(.menu)`));
    return { poll, buttons, context };
}

test('vMix 28 omits overlays 5–8 on the first poll and keeps unchanged buttons on subsequent polls', () => {
    const { poll, buttons } = setup();
    poll('28.0.0.46');
    assert.deepEqual(buttons().map(button => button.textContent), ['1', '2', '3', '4']);
    const firstButton = buttons()[0];
    poll('28.0.0.46');
    poll('28.0.0.46');
    assert.equal(buttons().length, 4);
    assert.equal(buttons()[0], firstButton);
});

test('inputs added during a vMix 28 session also omit unsupported overlays', () => {
    const { poll, buttons } = setup();
    poll('28.0.0.46');
    poll('28.0.0.46', {}, 2);
    assert.equal(buttons('input-2').length, 4);
});

test('vMix 29 and newer expose all eight commands and refresh their tally state', () => {
    for (const version of ['29.0.0.46', '30.0.0.1']) {
        const { poll, buttons } = setup();
        poll(version, { 5: 1, 8: 1 });
        assert.equal(buttons().length, 8);
        buttons().forEach((button, index) => {
            assert.equal(button.getAttribute('onclick'), `ApiVmixSend('OverlayInput${index + 1}','input-1')`);
            assert.equal(button.classList.contains('program'), index === 4 || index === 7);
        });
        const unchangedButton = buttons()[4];
        poll(version, { 5: 1, 8: 1 });
        assert.equal(buttons()[4], unchangedButton);
        poll(version, { 6: 1 });
        assert.equal(buttons()[4].classList.contains('program'), false);
        assert.equal(buttons()[5].classList.contains('program'), true);
    }
});

test('switching between vMix 29 and 28 adjusts overlay controls for existing inputs', () => {
    const { poll, buttons } = setup();
    poll('29.0.0.46');
    assert.equal(buttons().length, 8);
    poll('28.0.0.46');
    assert.equal(buttons().length, 4);
    poll('29.0.0.46');
    assert.equal(buttons().length, 8);
});

test('unknown versions keep the four legacy overlays', () => {
    const { poll, buttons } = setup();
    poll('');
    assert.equal(buttons().length, 4);
});

test('resetting a session clears the eight tally states before reconnecting', () => {
    const { poll, buttons, context } = setup();
    poll('29.0.0.46', { 5: 1, 8: 1 });
    context.reset_session();
    assert.equal(buttons().length, 0);
    for (let number = 1; number <= 8; number++) {
        assert.equal(vm.runInContext(`activeOverlay${number}`, context), undefined);
    }
    poll('28.0.0.46');
    assert.equal(buttons().length, 4);
    assert.equal(buttons().some(button => button.classList.contains('program')), false);
});
