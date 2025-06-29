const calculateFormEl = document.getElementById('calculateForm');
const totalMarksEl = document.getElementById('totalMarks');
const averageMarksEl = document.getElementById('averageMarks');
const resultsEl = document.getElementById('results');

calculateFormEl.addEventListener('submit', function(event) {
  event.preventDefault();  // Stop form from reloading the page

  // Validate each mark
  const marks = [
    Number(document.getElementById('mark1').value),
    Number(document.getElementById('mark2').value),
    Number(document.getElementById('mark3').value),
    Number(document.getElementById('mark4').value),
  ];

  for (let i = 0; i < marks.length; i++) {
    if (marks[i] < 0 || marks[i] > 100) {
      resultsEl.innerHTML = `<span style="color: #ff3860; font-weight: 700;">Error: Marks must be between 0 and 100 only!</span>`;
      totalMarksEl.textContent = '0';
      averageMarksEl.textContent = '0';
      return; // stop function here, no calculation
    }
  }

  // Calculate total and average
  const total = marks.reduce((acc,val)=> acc+val,0);
  const average = total / marks.length;

  // Show results in the page
  totalMarksEl.textContent = total.toFixed(2);
  averageMarksEl.textContent = average.toFixed(2);
  resultsEl.style.color = '#ffffff';  // Reset color if previously error
});
