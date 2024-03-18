function createNotification(type: string, title: string, description: string) {
    const notificationContainer = document.getElementById('notification-container');
    if (notificationContainer !== null) {
        const notification = document.createElement('div');
        notification.className = `notification ${type} in`;

        const closeButton = document.createElement('span');
        closeButton.className = 'close-btn';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => {
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
        }, 3000); // 5 seconds timeout
    } else {
        console.error("Notification container element not found.");
        // Handle the case where notificationContainer is null, e.g., display an error message.
    }
}
