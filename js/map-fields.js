// Gozal

document.addEventListener('DOMContentLoaded', () => {
    const mappingContainer = document.getElementById('mappingContainer');
    const addMappingButton = document.getElementById('addMappingButton');
    const saveMappingButton = document.getElementById('saveMappingButton');

    let mappings = JSON.parse(localStorage.getItem('formFieldMappings')) || {};

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
        localStorage.setItem('formFieldMappings', JSON.stringify(mappings));
        alert('Mappings saved successfully!');
    });

    renderMappings();
});


