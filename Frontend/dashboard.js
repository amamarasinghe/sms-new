document.getElementById('add-student-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const studentData = {};
    formData.forEach((value, key) => {
        studentData[key] = value;
    });
    fetch('/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Reset form or perform any other action upon successful addition
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
