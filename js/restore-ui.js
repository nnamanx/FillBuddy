document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('historyContainer');

    // Load saved forms from local storage
    function loadHistory() {
        const savedForms = JSON.parse(localStorage.getItem('savedForms')) || [];
        historyContainer.innerHTML = ''; // Clear existing history

        if (savedForms.length === 0) {
            historyContainer.textContent = 'No saved forms found.';
            return;
        }

        savedForms.forEach((form, index) => {
            const formCard = document.createElement('div');
            formCard.classList.add('form-card');

            const formDetails = document.createElement('pre');
            formDetails.textContent = JSON.stringify(form, null, 2);

            const applyButton = document.createElement('button');
            applyButton.textContent = 'Apply Form';
            applyButton.classList.add('apply-button');
            applyButton.addEventListener('click', () => {
                alert('Form data loaded into the current form.');
                localStorage.setItem('currentForm', JSON.stringify(form));
                // Redirect to the form-filling page if needed
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Form';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                deleteForm(index);
            });

            formCard.appendChild(formDetails);
            formCard.appendChild(applyButton);
            formCard.appendChild(deleteButton);
            historyContainer.appendChild(formCard);
        });
    }

    // Delete a form from history
    function deleteForm(index) {
        const savedForms = JSON.parse(localStorage.getItem('savedForms')) || [];
        savedForms.splice(index, 1); // Remove the selected form
        localStorage.setItem('savedForms', JSON.stringify(savedForms));
        loadHistory(); // Reload the history
        alert('Form deleted successfully.');
    }

    loadHistory();
});
