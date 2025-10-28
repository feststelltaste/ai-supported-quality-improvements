const tableBody = document.getElementById('table-body');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalAssessment = document.getElementById('modal-assessment');
const modalExamples = document.getElementById('modal-examples');
const closeButton = document.querySelector('.close-button');

// Helper function to render URL if available
function renderUrl(url) {
  if (!url) {
    return '';
  }
  return `<p><strong>URL:</strong> <a href="${url}" target="_blank" rel="noopener noreferrer" class="tool-link">${url}</a></p>`;
}

// Helper function to render a single item
function renderItem(item) {
  const exampleContainer = document.createElement('div');
  exampleContainer.classList.add('example-container');

  const ratingBar = document.createElement('div');
  ratingBar.classList.add('rating-bar');
  if (item.rating <= 1/3) {
    ratingBar.classList.add('rating-red');
  } else if (item.rating <= 2/3) {
    ratingBar.classList.add('rating-yellow');
  } else {
    ratingBar.classList.add('rating-green');
  }
  exampleContainer.appendChild(ratingBar);

  const exampleDiv = document.createElement('div');
  exampleDiv.innerHTML = `
    <h3>${item.name}</h3>
    ${renderUrl(item.url)}
    <p><strong>Description:</strong> ${item.description}</p>
    <p><strong>Assessment:</strong> ${item.assessment}</p>
    <p><strong>Rating:</strong> ${item.rating}</p>
  `;
  exampleContainer.appendChild(exampleDiv);
  return exampleContainer;
}

// Helper function to render a section (single item or array)
function renderSection(title, symbol, data, colorClass) {
  if (!data) {
    return;
  }

  // Add section header
  const sectionHeader = document.createElement('h2');
  sectionHeader.innerHTML = `<span class="${colorClass}">${symbol}</span> ${title}`;
  modalExamples.appendChild(sectionHeader);

  // Handle single object or array
  if (Array.isArray(data)) {
    data.forEach(item => {
      modalExamples.appendChild(renderItem(item));
    });
  } else {
    modalExamples.appendChild(renderItem(data));
  }
}

fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (!data || !data.qualities) {
      throw new Error('Invalid data structure: missing qualities array');
    }
    data.qualities.forEach(quality => {
      const row = document.createElement('tr');

      const qualityCell = document.createElement('td');
      qualityCell.innerHTML = `<strong>${quality.name}</strong><br><em class="description">${quality.description}</em>`;
      row.appendChild(qualityCell);

      const examplesCell = document.createElement('td');
      examplesCell.innerHTML = `<em class="description">${quality.examples}</em>`;
      row.appendChild(examplesCell);

      Object.keys(quality.phases).forEach(phaseName => {
        const phase = quality.phases[phaseName];
        const phaseCell = document.createElement('td');
        const phaseContainer = document.createElement('div');
        phaseContainer.classList.add('phase-container');

        const phaseButton = document.createElement('button');
        phaseButton.textContent = phaseName.charAt(0).toUpperCase() + phaseName.slice(1);
        phaseButton.classList.add('phase-button', phase.color);
        phaseContainer.addEventListener('click', () => {
          modalTitle.textContent = `${quality.name} - ${phaseName.charAt(0).toUpperCase() + phaseName.slice(1)}`;
          modalAssessment.textContent = phase.assessment;
          modalExamples.innerHTML = '';

          // Render three sections: Limitation, Practice, Tools
          renderSection('Limitation', '△', phase.limitation, 'triangle-symbol');
          renderSection('Practice', '□', phase.practice, 'square-symbol');
          renderSection('Tools', '○', phase.tools, 'circle-symbol');

          modal.style.display = 'block';
        });
        phaseContainer.appendChild(phaseButton);

        const shapeContainer = document.createElement('div');
        shapeContainer.classList.add('circle-container'); // Reusing this class for all shapes

        // Render triangle for limitation (single object)
        if (phase.limitation) {
          const shape = document.createElement('div');
          shape.classList.add('triangle');
          if (phase.limitation.rating <= 1/3) {
            shape.classList.add('rating-red');
          } else if (phase.limitation.rating <= 2/3) {
            shape.classList.add('rating-yellow');
          } else {
            shape.classList.add('rating-green');
          }
          shape.style.left = `${phase.limitation.rating * 100}%`;
          shape.style.top = '50%';

          const tooltip = document.createElement('span');
          tooltip.classList.add('circle-tooltip');
          tooltip.textContent = `△ ${phase.limitation.name} (${phase.limitation.rating})`;
          shape.appendChild(tooltip);

          shapeContainer.appendChild(shape);
        }

        // Render square for practice (single object)
        if (phase.practice) {
          const shape = document.createElement('div');
          shape.classList.add('square');
          if (phase.practice.rating <= 1/3) {
            shape.classList.add('rating-red');
          } else if (phase.practice.rating <= 2/3) {
            shape.classList.add('rating-yellow');
          } else {
            shape.classList.add('rating-green');
          }
          shape.style.left = `${phase.practice.rating * 100}%`;
          shape.style.top = '50%';

          const tooltip = document.createElement('span');
          tooltip.classList.add('circle-tooltip');
          tooltip.textContent = `□ ${phase.practice.name} (${phase.practice.rating})`;
          shape.appendChild(tooltip);

          shapeContainer.appendChild(shape);
        }

        // Render circles for tools
        if (phase.tools && Array.isArray(phase.tools) && phase.tools.length > 0) {
          phase.tools.forEach(item => {
            const shape = document.createElement('div');
            shape.classList.add('circle');
            if (item.rating <= 1/3) {
              shape.classList.add('rating-red');
            } else if (item.rating <= 2/3) {
              shape.classList.add('rating-yellow');
            } else {
              shape.classList.add('rating-green');
            }
            shape.style.left = `${item.rating * 100}%`;
            shape.style.top = '50%';

            const tooltip = document.createElement('span');
            tooltip.classList.add('circle-tooltip');
            tooltip.textContent = `○ ${item.name} (${item.rating})`;
            shape.appendChild(tooltip);

            shapeContainer.appendChild(shape);
          });
        }

        phaseContainer.appendChild(shapeContainer);
        phaseCell.appendChild(phaseContainer);
        row.appendChild(phaseCell);
      });

      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error loading or rendering data:', error);
    const errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.padding = '20px';
    errorDiv.textContent = `Error: ${error.message}`;
    document.getElementById('container').prepend(errorDiv);
  });

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
