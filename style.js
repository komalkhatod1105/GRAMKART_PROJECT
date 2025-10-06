// Form toggle functions
function showSignup() {
    document.getElementById('signinForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showSignin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('signinForm').style.display = 'block';
}

// Sign In form handler
document.getElementById('signin').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Simple validation
    if(!email || !password) {
        alert('Please fill in all fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Store user data
    const userName = email.split('@')[0];
    const userInitial = userName.charAt(0).toUpperCase();
    
    if(rememberMe) {
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', userName);
        localStorage.setItem('userInitial', userInitial);
        localStorage.setItem('rememberMe', 'true');
    } else {
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('userInitial', userInitial);
    }
    
    // Show success message and redirect to dashboard
    showDashboard(userName, email, userInitial);
});

// Sign Up form handler
document.getElementById('signup').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    if(!name || !email || !password || !confirmPassword) {
        alert('Please fill all fields!');
        return;
    }
    
    if(!agreeTerms) {
        alert('Please agree to the Terms & Conditions!');
        return;
    }
    
    if(password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if(password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Store user data
    const userInitial = name.charAt(0).toUpperCase();
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userInitial', userInitial);
    
    alert('Account created successfully! Welcome to our platform.');
    showDashboard(name, email, userInitial);
});

// Show dashboard function
function showDashboard(name, email, initial) {
    document.querySelector('.container').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    // Update user info
    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = email;
    document.getElementById('userInitial').textContent = initial;
    
    // Add success animation
    document.querySelector('.dashboard-container').style.animation = 'fadeIn 0.5s ease-in';
}

// Sign Out function
function signOut() {
    // Clear stored data
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userInitial');
    localStorage.removeItem('rememberMe');
    sessionStorage.clear();
    
    // Show sign in form
    document.getElementById('dashboard').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    document.getElementById('signinForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    
    // Clear forms
    document.getElementById('signin').reset();
    document.getElementById('signup').reset();
}

// Check if user is already signed in (on page load)
document.addEventListener('DOMContentLoaded', function() {
    let userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    
    if(userEmail) {
        const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName');
        const userInitial = localStorage.getItem('userInitial') || sessionStorage.getItem('userInitial');
        showDashboard(userName, userEmail, userInitial);
    }
});

// Social login handlers
document.querySelector('.social-btn.google').addEventListener('click', function() {
    alert('Google sign in would be implemented here!');
});

document.querySelector('.social-btn.facebook').addEventListener('click', function() {
    alert('Facebook sign in would be implemented here!');
});

// Forgot password handler
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Password reset feature would be implemented here!');
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);