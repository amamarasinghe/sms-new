// Check if user is authenticated (token exists)
const token = localStorage.getItem('token');
if (!token) {
    // Redirect to login page if not authenticated
    window.location.href = '/login.html';
}

// Fetch student data and display in UI
fetch('/students', {
    headers: {
        'Authorization': token
    }
})
.then(response => response.json())
.then(data => {
    // Display student data in UI
    console.log('Student data:', data);
})
.catch(error => {
    console.error('Error:', error);
    alert('Error fetching student data');
});
