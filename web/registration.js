// Registration Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const eventSelection = document.getElementById('eventSelection');
    const registrationForms = document.getElementById('registrationForms');
    const formTitle = document.getElementById('formTitle');
    const backToEvents = document.getElementById('backToEvents');
    const registrationModal = document.getElementById('registrationModal');
    const closeModal = document.getElementById('closeModal');
    const clubRegistration = document.getElementById('clubRegistration');
    const vitRegistration = document.getElementById('vitRegistration');

    // Event selection buttons
    const selectEventBtns = document.querySelectorAll('.select-event-btn');
    
    // Team registration elements
    const teamRegistration = document.getElementById('teamRegistration');
    const teamLeaderForm = document.getElementById('teamLeaderForm');
    const teamMemberForm = document.getElementById('teamMemberForm');
    const individualForm = document.getElementById('individualForm');
    const roleBtns = document.querySelectorAll('.role-btn');
    
    // Team ID generation
    const teamIdDisplay = document.getElementById('teamIdDisplay');
    
    // Current selected event
    let currentEvent = null;
    let currentRole = 'leader';

    // Initialize
    initializeEventListeners();
    generateTeamId();

    function initializeEventListeners() {
        // Event selection
        selectEventBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const event = this.getAttribute('data-event');
                selectEvent(event);
            });
        });

        // Back to events
        backToEvents.addEventListener('click', function() {
            showEventSelection();
        });

        // Role selection for team events
        roleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const role = this.getAttribute('data-role');
                selectRole(role);
            });
        });

        // Form submissions
        teamLeaderForm.addEventListener('submit', handleTeamLeaderSubmission);
        teamMemberForm.addEventListener('submit', handleTeamMemberSubmission);
        individualForm.addEventListener('submit', handleIndividualSubmission);

        // Modal controls
        closeModal.addEventListener('click', hideModal);
        clubRegistration.addEventListener('click', handleClubRegistration);
        vitRegistration.addEventListener('click', handleVitRegistration);

        // Close modal on outside click
        registrationModal.addEventListener('click', function(e) {
            if (e.target === registrationModal) {
                hideModal();
            }
        });

        // Mobile navigation toggle
        const navToggle = document.getElementById('navToggle');
        const navList = document.getElementById('navList');

        if (navToggle && navList) {
            navToggle.addEventListener('click', function() {
                navList.classList.toggle('active');
            });

            // Close menu when clicking a link
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.addEventListener('click', function() {
                    navList.classList.remove('active');
                });
            });
        }

        // Dropdown functionality
        const dropdown = document.querySelector('.dropdown');
        if (dropdown) {
            dropdown.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            });
        }
    }

    function selectEvent(event) {
        currentEvent = event;
        
        // Update form title
        const eventNames = {
            'survival': 'Survival Showdown',
            'hackathon': 'Code Cortex',
            'data': 'Data Alchemy'
        };
        
        formTitle.textContent = `${eventNames[event]} Registration`;
        
        // Show appropriate form
        if (event === 'data') {
            // Individual event
            teamRegistration.style.display = 'none';
            individualForm.style.display = 'block';
            individualForm.classList.add('fade-in');
        } else {
            // Team events
            teamRegistration.style.display = 'block';
            individualForm.style.display = 'none';
            teamRegistration.classList.add('fade-in');
            
            // Show team leader form by default
            selectRole('leader');
        }
        
        // Show registration forms
        eventSelection.style.display = 'none';
        registrationForms.style.display = 'block';
        registrationForms.classList.add('fade-in');
    }

    function selectRole(role) {
        currentRole = role;
        
        // Update active role button
        roleBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-role') === role) {
                btn.classList.add('active');
            }
        });
        
        // Show appropriate form
        if (role === 'leader') {
            teamLeaderForm.style.display = 'block';
            teamMemberForm.style.display = 'none';
            teamLeaderForm.classList.add('slide-in');
        } else {
            teamLeaderForm.style.display = 'none';
            teamMemberForm.style.display = 'block';
            teamMemberForm.classList.add('slide-in');
        }
    }

    function showEventSelection() {
        registrationForms.style.display = 'none';
        eventSelection.style.display = 'block';
        eventSelection.classList.add('fade-in');
        currentEvent = null;
    }

    function generateTeamId() {
        // Generate a random 4-digit team ID
        const teamId = Math.floor(1000 + Math.random() * 9000);
        if (teamIdDisplay) {
            teamIdDisplay.textContent = teamId.toString();
        }
        return teamId;
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff0000';
                input.classList.add('error');
            } else {
                input.style.borderColor = '';
                input.classList.remove('error');
            }
        });
        
        // Email validation
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (input.value && !emailRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = '#ff0000';
                input.classList.add('error');
            }
        });
        
        // Phone validation
        const phoneInputs = form.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            const phoneRegex = /^[0-9]{10}$/;
            if (input.value && !phoneRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = '#ff0000';
                input.classList.add('error');
            }
        });
        
        // Team ID validation for team members
        const teamIdInput = form.querySelector('input[name="existingTeamId"]');
        if (teamIdInput) {
            const teamIdRegex = /^[0-9]{4}$/;
            if (teamIdInput.value && !teamIdRegex.test(teamIdInput.value)) {
                isValid = false;
                teamIdInput.style.borderColor = '#ff0000';
                teamIdInput.classList.add('error');
            }
        }
        
        return isValid;
    }

    function handleTeamLeaderSubmission(e) {
        e.preventDefault();
        
        if (!validateForm(teamLeaderForm)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        const formData = {
            event: currentEvent,
            role: 'leader',
            name: document.getElementById('leaderName').value,
            regNo: document.getElementById('leaderRegNo').value,
            email: document.getElementById('leaderEmail').value,
            contact: document.getElementById('leaderContact').value,
            teamName: document.getElementById('teamName').value,
            teamSize: document.getElementById('teamSize').value,
            teamId: teamIdDisplay.textContent
        };
        
        console.log('Team Leader Registration Data:', formData);
        showRegistrationModal();
    }

    function handleTeamMemberSubmission(e) {
        e.preventDefault();
        
        if (!validateForm(teamMemberForm)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        const formData = {
            event: currentEvent,
            role: 'member',
            name: document.getElementById('memberName').value,
            regNo: document.getElementById('memberRegNo').value,
            email: document.getElementById('memberEmail').value,
            contact: document.getElementById('memberContact').value,
            teamId: document.getElementById('existingTeamId').value,
            teamName: document.getElementById('memberTeamName').value
        };
        
        console.log('Team Member Registration Data:', formData);
        showRegistrationModal();
    }

    function handleIndividualSubmission(e) {
        e.preventDefault();
        
        if (!validateForm(individualForm)) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        const formData = {
            event: currentEvent,
            role: 'individual',
            name: document.getElementById('individualName').value,
            regNo: document.getElementById('individualRegNo').value,
            email: document.getElementById('individualEmail').value,
            contact: document.getElementById('individualContact').value
        };
        
        console.log('Individual Registration Data:', formData);
        showRegistrationModal();
    }

    function showRegistrationModal() {
        registrationModal.style.display = 'flex';
        registrationModal.classList.add('fade-in');
    }

    function hideModal() {
        registrationModal.style.display = 'none';
        registrationModal.classList.remove('fade-in');
    }

    function handleClubRegistration() {
        // Here you would typically send data to your backend
        console.log('Submitting to club website...');
        showNotification('Registration submitted to club website!', 'success');
        hideModal();
        
        // Reset forms
        resetAllForms();
        showEventSelection();
    }

    function handleVitRegistration() {
        // Redirect to VIT Gravitas website
        const vitUrls = {
            'survival': 'https://gravitas.vit.ac.in/events/4959ecd8-e4d0-4348-b3b0-5b9c539972ed',
            'hackathon': 'https://gravitas.vit.ac.in/events/hackathon', // Update with actual URL
            'data': 'https://gravitas.vit.ac.in/events/data-alchemy' // Update with actual URL
        };
        
        const url = vitUrls[currentEvent] || 'https://gravitas.vit.ac.in/';
        window.open(url, '_blank');
        hideModal();
    }

    function resetAllForms() {
        // Reset all form inputs
        const forms = [teamLeaderForm, teamMemberForm, individualForm];
        forms.forEach(form => {
            if (form) {
                form.reset();
                const inputs = form.querySelectorAll('input, select');
                inputs.forEach(input => {
                    input.style.borderColor = '';
                    input.classList.remove('error');
                });
            }
        });
        
        // Generate new team ID
        generateTeamId();
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ff0000' : type === 'success' ? '#00aa00' : '#101D4D'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 3000;
            font-family: var(--primary-font);
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add error styles to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border-color: #ff0000 !important;
            box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.2) !important;
        }
        
        .notification {
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
            }
            to {
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
});
