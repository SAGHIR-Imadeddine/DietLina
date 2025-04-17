document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const form = document.querySelector('form');
    
    // Create toggle container and buttons
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'user-type-toggle';
    
    const heading = document.createElement('h2');
    heading.textContent = 'I am a:';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'toggle-container';
    
    const individualBtn = document.createElement('button');
    individualBtn.id = 'individualToggle';
    individualBtn.className = 'toggle-btn active';
    individualBtn.type = 'button';
    individualBtn.textContent = 'Individual';
    
    const companyBtn = document.createElement('button');
    companyBtn.id = 'companyToggle';
    companyBtn.className = 'toggle-btn';
    companyBtn.type = 'button';
    companyBtn.textContent = 'Company';
    
    buttonContainer.appendChild(individualBtn);
    buttonContainer.appendChild(companyBtn);
    toggleContainer.appendChild(heading);
    toggleContainer.appendChild(buttonContainer);
    
    // Insert toggle before the form
    form.parentNode.insertBefore(toggleContainer, form);
    
    // Field selectors
    const individualFields = [
        'salutation', 
        'first_name', 
        'last_name', 
        'email', 
        'mobile', 
        '00NgL00000nTTSD'
    ];
    
    const companyFields = [
        'company', 
        'email', 
        'phone', 
        '00NgL00000nTXh7'
    ];
    
    // Get all form fields
    const allFormFields = {};
    const allLabels = {};
    
    document.querySelectorAll('input, select, textarea').forEach(element => {
        if (element.id && element.id !== 'submit') {
            allFormFields[element.id] = element;
            
            // Find label for this field
            const label = document.querySelector(`label[for="${element.id}"]`);
            if (label) {
                allLabels[element.id] = label;
            }
        }
    });
    
    // Show only specified fields and their labels, hide others
    function showOnlyFields(fieldsToShow) {
        // First hide all fields and their labels
        Object.keys(allFormFields).forEach(id => {
            if (id !== 'oid' && id !== 'retURL') {
                allFormFields[id].style.display = 'none';
                if (allLabels[id]) {
                    allLabels[id].style.display = 'none';
                }
                
                // Find and hide the <br> element that follows
                const nextSibling = allFormFields[id].nextSibling;
                if (nextSibling && nextSibling.nodeName === 'BR') {
                    nextSibling.style.display = 'none';
                }
            }
        });
        
        // Then show only the specified fields and their labels
        fieldsToShow.forEach(id => {
            if (allFormFields[id]) {
                allFormFields[id].style.display = '';
                if (allLabels[id]) {
                    allLabels[id].style.display = '';
                }
                
                // Find and show the <br> element that follows
                const nextSibling = allFormFields[id].nextSibling;
                if (nextSibling && nextSibling.nodeName === 'BR') {
                    nextSibling.style.display = '';
                }
            }
        });
    }
    
    // Validation rules
    const validationRules = {
        salutation: {
            validate: value => value !== '',
            message: 'Please select a salutation'
        },
        first_name: {
            validate: value => value.trim().length >= 2,
            message: 'First name must be at least 2 characters long'
        },
        last_name: {
            validate: value => value.trim().length >= 2,
            message: 'Last name must be at least 2 characters long'
        },
        email: {
            validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: 'Please enter a valid email address'
        },
        mobile: {
            validate: value => /^\+?[\d\s-]{8,}$/.test(value),
            message: 'Please enter a valid mobile number'
        },
        '00NgL00000nTTSD': {
            validate: value => {
                const age = parseInt(value);
                return !isNaN(age) && age >= 0 && age <= 120;
            },
            message: 'Please enter a valid age between 0 and 120'
        },
        company: {
            validate: value => value.trim().length >= 2,
            message: 'Company name must be at least 2 characters long'
        },
        phone: {
            validate: value => /^\+?[\d\s-]{8,}$/.test(value),
            message: 'Please enter a valid phone number'
        },
        '00NgL00000nTXh7': {
            validate: value => value.trim().length >= 10,
            message: 'Please provide more details about your motive (at least 10 characters)'
        }
    };
    
    // Create error message element
    function createErrorElement(fieldId) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.id = `${fieldId}-error`;
        return errorElement;
    }
    
    // Validate a single field
    function validateField(fieldId, value) {
        const field = allFormFields[fieldId];
        const label = allLabels[fieldId];
        const rule = validationRules[fieldId];
        
        if (!rule) return true;
        
        let errorElement = document.getElementById(`${fieldId}-error`);
        if (!errorElement) {
            errorElement = createErrorElement(fieldId);
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        if (!rule.validate(value)) {
            errorElement.textContent = rule.message;
            field.classList.add('error');
            return false;
        } else {
            errorElement.textContent = '';
            field.classList.remove('error');
            return true;
        }
    }
    
    // Validate all visible fields
    function validateForm() {
        let isValid = true;
        const currentFields = individualBtn.classList.contains('active') ? individualFields : companyFields;
        
        currentFields.forEach(fieldId => {
            const field = allFormFields[fieldId];
            if (field && field.style.display !== 'none') {
                if (!validateField(fieldId, field.value)) {
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Set user type
    function setUserType(type) {
        if (type === 'individual') {
            individualBtn.classList.add('active');
            companyBtn.classList.remove('active');
            showOnlyFields(individualFields);
        } else {
            companyBtn.classList.add('active');
            individualBtn.classList.remove('active');
            showOnlyFields(companyFields);
        }
    }
    
    // Toggle event listeners
    individualBtn.addEventListener('click', () => {
        setUserType('individual');
    });
    
    companyBtn.addEventListener('click', () => {
        setUserType('company');
    });
    
    // Form submission handler
    form.addEventListener('submit', (e) => {
        if (!validateForm()) {
            e.preventDefault();
        }
    });
    
    // Initialize with individual type
    setUserType('individual');
}); 