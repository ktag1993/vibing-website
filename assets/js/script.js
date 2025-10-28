// Lead Form Submission
document.getElementById('leadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const submitText = document.getElementById('submitText');
    const loadingText = document.getElementById('loadingText');
    const formMessage = document.getElementById('formMessage');
    
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    
    // Basic validation
    if (!name || !email) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    loadingText.style.display = 'inline';
    formMessage.style.display = 'none';
    
    try {
        // TODO: Replace with your actual API endpoint
        const API_URL = 'https://api.vibing.live'; // Vibing production API
        
        const response = await fetch(`${API_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone || null,
                source: 'website',
                submitted_at: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            showMessage('Thank you! We\'ll be in touch soon.', 'success');
            document.getElementById('leadForm').reset();
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        console.error('Lead submission error:', error);
        showMessage('Something went wrong. Please try again later.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        loadingText.style.display = 'none';
    }
});

// Helper function to show messages
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

// Email validation
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

