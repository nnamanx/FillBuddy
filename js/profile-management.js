document.addEventListener('DOMContentLoaded', () => {
    const profileSelect = document.getElementById('profileSelect');
    const addMappingButton = document.getElementById('addMappingButton');
    const saveMappingButton = document.getElementById('saveMappingButton');
    const mappingContainer = document.getElementById('mappingContainer');

    // Load profiles and mappings from localStorage
    function loadProfiles() {
        const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
        profileSelect.innerHTML = ''; // Clear existing options
        for (const profileName in profiles) {
            const option = document.createElement('option');
            option.value = profileName;
            option.textContent = profileName;
            profileSelect.appendChild(option);
        }
    }

    // Save mappings for the selected profile
    function saveMappings() {
        const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
        const selectedProfile = profileSelect.value;

        if (!selectedProfile) {
            alert('Please select or create a profile first.');
            return;
        }

        let mappings = {};
        const rows = document.querySelectorAll('.mapping-row');
        rows.forEach(row => {
            const linkedInField = row.querySelector('.linkedin-field').value;
            const formField = row.querySelector('.form-field').value;
            if (linkedInField && formField) {
                mappings[linkedInField] = formField;
            }
        });

        profiles[selectedProfile] = mappings;
        localStorage.setItem('profiles', JSON.stringify(profiles));
        alert('Mappings saved successfully!');
    }

    // Load mappings for the selected profile
    function loadMappings() {
        const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
        const selectedProfile = profileSelect.value;
        mappingContainer.innerHTML = ''; // Clear existing mappings

        if (selectedProfile && profiles[selectedProfile]) {
            const mappings = profiles[selectedProfile];
            for (const linkedInField in mappings) {
                const formField = mappings[linkedInField];

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
        }
    }

    // Add event listeners
    if (addMappingButton) {
        addMappingButton.addEventListener('click', () => {
            const row = document.createElement('div');
            row.classList.add('mapping-row');

            const linkedInFieldInput = document.createElement('input');
            linkedInFieldInput.type = 'text';
            linkedInFieldInput.placeholder = 'LinkedIn Field';
            linkedInFieldInput.classList.add('linkedin-field');

            const formFieldInput = document.createElement('input');
            formFieldInput.type = 'text';
            formFieldInput.placeholder = 'Form Field';
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
        });
    }

    if (saveMappingButton) {
        saveMappingButton.addEventListener('click', saveMappings);
    }

    profileSelect.addEventListener('change', loadMappings);

    // Add a "Create Profile" button
    const createProfileButton = document.createElement('button');
    createProfileButton.textContent = 'Create Profile';
    createProfileButton.addEventListener('click', () => {
        const profileName = prompt('Enter a name for the new profile:');
        if (profileName) {
            const profiles = JSON.parse(localStorage.getItem('profiles')) || {};
            if (profiles[profileName]) {
                alert('A profile with this name already exists.');
            } else {
                profiles[profileName] = {}; // Create empty mappings for the new profile
                localStorage.setItem('profiles', JSON.stringify(profiles));
                loadProfiles();
                profileSelect.value = profileName; // Select the new profile
            }
        }
    });

    document.querySelector('.profile-manager').appendChild(createProfileButton);

    loadProfiles();
    if (profileSelect.value) {
        loadMappings();
    }
});
