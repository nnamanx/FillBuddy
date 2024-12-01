//Turkana

document.addEventListener('DOMContentLoaded', () => {
    const generateCoverLetterButton = document.getElementById('generateCoverLetterButton');
    const coverLetterContainer = document.getElementById('coverLetterContainer');
    const jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
  
    generateCoverLetterButton.addEventListener('click', async () => {
      const selectedJobIndex = document.getElementById('jobSelect').value;
      if (selectedJobIndex === "") {
        alert('Please select a job application to generate a cover letter.');
        return;
      }
  
      const jobApplication = jobApplications[selectedJobIndex];
      const { jobTitle, companyName } = jobApplication;
  
      try {
        const coverLetter = await generateCoverLetter(jobTitle, companyName);
        displayCoverLetter(coverLetter);
      } catch (error) {
        console.error('Error generating cover letter:', error);
        alert('Failed to generate cover letter. Please try again later.');
      }
    });
  
    async function generateCoverLetter(jobTitle, companyName) {

        const apiUrl = `https://api.example.com/generate-cover-letter?jobTitle=${encodeURIComponent(jobTitle)}&companyName=${encodeURIComponent(companyName)}`;
  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.coverLetter;
    }
  
    function displayCoverLetter(coverLetter) {
      coverLetterContainer.innerHTML = '';
      const coverLetterElement = document.createElement('div');
      coverLetterElement.classList.add('cover-letter');
      coverLetterElement.textContent = coverLetter;
      coverLetterContainer.appendChild(coverLetterElement);
    }
  
    // Render in select dropdown
    function populateJobSelect() {
      const jobSelect = document.getElementById('jobSelect');
      jobSelect.innerHTML = '<option value="">Select Job Application</option>';
  
      jobApplications.forEach((application, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${application.jobTitle} at ${application.companyName}`;
        jobSelect.appendChild(option);
      });
    }
  
    populateJobSelect();
  });
  