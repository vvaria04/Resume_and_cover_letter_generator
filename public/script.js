// Global variables
let currentGeneratedContent = '';
let currentFilename = '';

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const loadingOverlay = document.getElementById('loadingOverlay');
const generatedContent = document.getElementById('generatedContent');

// Tab Navigation
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active tab content
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
        
        // Hide results when switching tabs
        document.getElementById('results').classList.remove('active');
    });
});

// Show/Hide Loading Overlay
function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Show Results Section
function showResults() {
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById('results').classList.add('active');
}

// Generate Resume
async function generateResume() {
    try {
        // Validate required fields
        const requiredFields = ['fullName', 'email', 'phone', 'location', 'summary', 'education', 'skills', 'experience', 'jobRequirements'];
        const missingFields = [];
        
        requiredFields.forEach(field => {
            const value = document.getElementById(field).value.trim();
            if (!value) {
                missingFields.push(field);
            }
        });
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields: ' + missingFields.join(', '));
            return;
        }
        
        showLoading();
        
        // Collect form data
        const personalInfo = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            location: document.getElementById('location').value.trim(),
            linkedin: document.getElementById('linkedin').value.trim(),
            summary: document.getElementById('summary').value.trim(),
            education: document.getElementById('education').value.trim(),
            skills: document.getElementById('skills').value.trim(),
            experience: document.getElementById('experience').value.trim(),
            projects: document.getElementById('projects').value.trim()
        };
        
        const jobRequirements = document.getElementById('jobRequirements').value.trim();
        const template = document.querySelector('input[name="resumeTemplate"]:checked').value;
        
        // Make API call
        const response = await fetch('/api/generate-resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personalInfo,
                jobRequirements,
                template
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentGeneratedContent = data.content;
            currentFilename = `resume_${personalInfo.fullName.replace(/\s+/g, '_')}`;
            generatedContent.innerHTML = data.content;
            showResults();
            
            // Add success animation
            document.getElementById('results').classList.add('success-animation');
            setTimeout(() => {
                document.getElementById('results').classList.remove('success-animation');
            }, 500);
        } else {
            const errorMsg = data.error || 'Failed to generate resume';
            const details = data.details ? `\n\nDetails: ${data.details}` : '';
            throw new Error(errorMsg + details);
        }
        
    } catch (error) {
        console.error('Error generating resume:', error);
        alert('Error generating resume: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Generate Cover Letter
async function generateCoverLetter() {
    try {
        // Validate required fields
        const requiredFields = ['clFullName', 'clEmail', 'clPhone', 'clLocation', 'companyName', 'clJobRequirements', 'relevantExperience'];
        const missingFields = [];
        
        requiredFields.forEach(field => {
            const value = document.getElementById(field).value.trim();
            if (!value) {
                missingFields.push(field);
            }
        });
        
        if (missingFields.length > 0) {
            alert('Please fill in all required fields: ' + missingFields.join(', '));
            return;
        }
        
        showLoading();
        
        // Collect form data
        const personalInfo = {
            fullName: document.getElementById('clFullName').value.trim(),
            email: document.getElementById('clEmail').value.trim(),
            phone: document.getElementById('clPhone').value.trim(),
            location: document.getElementById('clLocation').value.trim()
        };
        
        const companyInfo = {
            companyName: document.getElementById('companyName').value.trim(),
            hiringManager: document.getElementById('hiringManager').value.trim(),
            companyDetails: document.getElementById('companyInfo').value.trim()
        };
        
        const jobRequirements = document.getElementById('clJobRequirements').value.trim();
        const relevantExperience = document.getElementById('relevantExperience').value.trim();
        const template = document.querySelector('input[name="coverLetterTemplate"]:checked').value;
        
        // Make API call
        const response = await fetch('/api/generate-cover-letter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personalInfo,
                jobRequirements,
                companyInfo,
                relevantExperience,
                template
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentGeneratedContent = data.content;
            currentFilename = `cover_letter_${personalInfo.fullName.replace(/\s+/g, '_')}`;
            generatedContent.innerHTML = data.content;
            showResults();
            
            // Add success animation
            document.getElementById('results').classList.add('success-animation');
            setTimeout(() => {
                document.getElementById('results').classList.remove('success-animation');
            }, 500);
        } else {
            const errorMsg = data.error || 'Failed to generate cover letter';
            const details = data.details ? `\n\nDetails: ${data.details}` : '';
            throw new Error(errorMsg + details);
        }
        
    } catch (error) {
        console.error('Error generating cover letter:', error);
        alert('Error generating cover letter: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Export to PDF
async function exportToPDF() {
    try {
        if (!currentGeneratedContent) {
            alert('No content to export. Please generate a document first.');
            return;
        }
        
        showLoading();
        
        const response = await fetch('/api/export-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: currentGeneratedContent,
                filename: currentFilename
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Download the file
            window.open(`/download/${currentFilename}.pdf`, '_blank');
        } else {
            throw new Error(data.error || 'Failed to export PDF');
        }
        
    } catch (error) {
        console.error('Error exporting PDF:', error);
        alert('Error exporting PDF: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Export to Word Document
async function exportToWord() {
    try {
        if (!currentGeneratedContent) {
            alert('No content to export. Please generate a document first.');
            return;
        }
        
        showLoading();
        
        const response = await fetch('/api/export-docx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: currentGeneratedContent,
                filename: currentFilename
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Download the file
            window.open(`/download/${currentFilename}.docx`, '_blank');
        } else {
            throw new Error(data.error || 'Failed to export Word document');
        }
        
    } catch (error) {
        console.error('Error exporting Word document:', error);
        alert('Error exporting Word document: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Copy HTML to Clipboard
async function copyToClipboard() {
    try {
        if (!currentGeneratedContent) {
            alert('No content to copy. Please generate a document first.');
            return;
        }
        
        await navigator.clipboard.writeText(currentGeneratedContent);
        
        // Show success message
        const button = event.target.closest('.export-btn');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#28a745';
        button.style.color = 'white';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
        
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Error copying to clipboard: ' + error.message);
    }
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.style.borderColor = '#e1e5e9';
                this.setCustomValidity('');
            }
        });
    });
    
    // Phone validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#dc3545';
                this.setCustomValidity('Please enter a valid phone number');
            } else {
                this.style.borderColor = '#e1e5e9';
                this.setCustomValidity('');
            }
        });
    });
    
    // Auto-save form data to localStorage
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Load saved data
        const savedValue = localStorage.getItem(`resume_generator_${input.id}`);
        if (savedValue) {
            input.value = savedValue;
        }
        
        // Save data on input
        input.addEventListener('input', function() {
            localStorage.setItem(`resume_generator_${this.id}`, this.value);
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter to generate
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab.id === 'resume') {
            generateResume();
        } else if (activeTab.id === 'cover-letter') {
            generateCoverLetter();
        }
    }
    
    // Escape to hide loading
    if (event.key === 'Escape') {
        hideLoading();
    }
});

// Auto-resize textareas
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
});

// Smooth scrolling for better UX
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