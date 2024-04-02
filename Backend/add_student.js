document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(this);
    const studentData = {};
    formData.forEach((value, key) => {
        studentData[key] = value;
    });

    // Send form data to the backend
    fetch('/add-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Show success message
        // You can redirect the user to another page or perform any other action here
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
