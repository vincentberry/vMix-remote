function createNotification(type: string, title: string, description: string) {
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type} in`;

    const closeButton = document.createElement('span');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function () {
        notification.classList.remove('in');
        setTimeout(() => {
            notification.remove();
        }, 500);
    });

    notification.innerHTML = `<strong>${title}</strong><br>${description}`;
    notification.appendChild(closeButton);

    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.remove('in');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000); // 3 seconds timeout
}
