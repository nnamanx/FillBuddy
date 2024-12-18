//Gozal done

document.addEventListener('DOMContentLoaded', () => {
    const mappingContainer = document.getElementById('mappingContainer');
    const addMappingButton = document.getElementById('addMappingButton');
    const saveMappingButton = document.getElementById('saveMappingButton');

    let profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    let activeProfile = localStorage.getItem('activeProfile') || 'default';

    if (!profiles[activeProfile]) {
        profiles[activeProfile] = {};
    }

    let mappings = profiles[activeProfile];

    // Function to render existing mappings
    function renderMappings() {
        mappingContainer.innerHTML = '';
        for (const [linkedInField, formField] of Object.entries(mappings)) {
            addMappingRow(linkedInField, formField);
        }
    }

    // Function to add a new row to the mapping interface
    function addMappingRow(linkedInField = '', formField = '') {
        const row = document.createElement('div');
        row.classList.add('mapping-row');

        const linkedInFieldInput = document.createElement('input');
        linkedInFieldInput.type = 'text';
        linkedInFieldInput.placeholder = 'LinkedIn Field';
        linkedInFieldInput.value = linkedInField;
        linkedInFieldInput.classList.add('linkedin-field');

        const formFieldInput = document.createElement('input');
        formFieldInput.type = 'text';
        formFieldInput.placeholder = 'Form Field';
        formFieldInput.value = formField;
        formFieldInput.classList.add('form-field');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            row.remove();
        });

        row.appendChild(linkedInFieldInput);
        row.appendChild(formFieldInput);
        row.appendChild(removeButton);
        mappingContainer.appendChild(row);
    }

    // Event listener to add a new mapping row
    addMappingButton.addEventListener('click', () => {
        addMappingRow();
    });

    // Event listener to save mappings to localStorage
    saveMappingButton.addEventListener('click', () => {
        mappings = {};
        const rows = document.querySelectorAll('.mapping-row');
        rows.forEach(row => {
            const linkedInField = row.querySelector('.linkedin-field').value;
            const formField = row.querySelector('.form-field').value;
            if (linkedInField && formField) {
                mappings[linkedInField] = formField;
            }
        });
        profiles[activeProfile] = mappings;
        localStorage.setItem('profiles', JSON.stringify(profiles));
        alert('Mappings saved successfully!');
    });

    // Profile switching logic
    const profileSelect = document.getElementById('profileSelect');
    Object.keys(profiles).forEach(profileName => {
        const option = document.createElement('option');
        option.value = profileName;
        option.textContent = profileName;
        if (profileName === activeProfile) {
            option.selected = true;
        }
        profileSelect.appendChild(option);
    });

    profileSelect.addEventListener('change', () => {
        activeProfile = profileSelect.value;
        localStorage.setItem('activeProfile', activeProfile);
        if (!profiles[activeProfile]) {
            profiles[activeProfile] = {};
        }
        mappings = profiles[activeProfile];
        renderMappings();
    });

    renderMappings();
});

// Function to save form data
function saveForm(formData) {
    const savedForms = JSON.parse(localStorage.getItem('savedForms')) || [];
    savedForms.push(formData); // Add new form data to history
    localStorage.setItem('savedForms', JSON.stringify(savedForms));
    alert('Form saved successfully!');
}

// Example usage: Call this function after form submission
document.getElementById('saveMappingButton').addEventListener('click', () => {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        portfolio: document.getElementById('portfolio').value,
    };
    saveForm(formData);
});
