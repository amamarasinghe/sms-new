document.addEventListener('DOMContentLoaded', () => {
    fetch('/history')
        .then(response => response.json())
        .then(data => {
            const historyList = document.getElementById('history-list');
            data.history.forEach(logEntry => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>Action:</strong> ${logEntry.action} - <strong>Administrator:</strong> ${logEntry.administrator} - <strong>Timestamp:</strong> ${new Date(logEntry.timestamp).toLocaleString()} - <strong>Details:</strong> ${logEntry.details}`;
                historyList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching history:', error));
});
