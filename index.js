// Function to handle sign-up
function signup() {
    const name = document.getElementById('register-fullname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error message
    errorMessage.textContent = '';

    if (!name || !email || !password) {
        errorMessage.textContent = "Please fill in all fields.";
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = "Invalid email format.";
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        errorMessage.textContent = "This email is already registered.";
        return;
    }

    const hashedPassword = btoa(password); // Simple hashing using Base64 (for demo purposes)
    users.push({ name, email, password: hashedPassword });
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    alert(`Account created successfully!`);

    // Clear input fields after signup
    document.getElementById('register-fullname').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';

    toggleForms();  // Switch to login form after signup
}

// Function to handle login
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error message
    errorMessage.textContent = '';

    if (!email || !password) {
        errorMessage.textContent = "Please fill in both fields.";
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === btoa(password));

    if (user) {
        alert(`Welcome, ${user.name}!`);
        window.location.href = "dash.html";  // Redirect to dashboard
    } else {
        errorMessage.textContent = "Invalid email or password.";
    }
}

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function toggleForms() {
    document.querySelector('.register-form').classList.toggle('hidden');
    document.querySelector('.login-form').classList.toggle('hidden');
}

window.onload = () => {
    document.querySelector('.register-form').classList.add('hidden');
};
