// Turkhana

document.addEventListener('DOMContentLoaded', () => {
    const jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    const dashboardContainer = document.getElementById('dashboardContainer');
  
    function renderDashboard() {
      dashboardContainer.innerHTML = '';
  
      if (jobApplications.length === 0) {
        dashboardContainer.innerHTML = '<p>No job applications to display.</p>';
        return;
      }
  
      const table = document.createElement('table');
      table.classList.add('dashboard-table');
  
      const headerRow = document.createElement('tr');
      ['Job Title', 'Company Name', 'Date Applied', 'Actions'].forEach(headerText => {
        const headerCell = document.createElement('th');
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
      });
      table.appendChild(headerRow);
  
      jobApplications.forEach((application, index) => {
        const row = document.createElement('tr');
  
        const titleCell = document.createElement('td');
        titleCell.textContent = application.jobTitle;
        row.appendChild(titleCell);
  
        const companyCell = document.createElement('td');
        companyCell.textContent = application.companyName;
        row.appendChild(companyCell);
  
        const dateCell = document.createElement('td');
        dateCell.textContent = application.dateApplied;
        row.appendChild(dateCell);
  
        const actionCell = document.createElement('td');
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.classList.add('view-button');
        viewButton.addEventListener('click', () => {
          viewApplicationDetails(index);
        });
        actionCell.appendChild(viewButton);
        row.appendChild(actionCell);
  
        table.appendChild(row);
      });
  
      dashboardContainer.appendChild(table);
    }
  
    function viewApplicationDetails(index) {
      const application = jobApplications[index];
      alert(`Job Title: ${application.jobTitle}\nCompany Name: ${application.companyName}\nDate Applied: ${application.dateApplied}`);
    }
  
    renderDashboard();
  });
  

  