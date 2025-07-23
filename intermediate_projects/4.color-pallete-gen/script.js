const generateBtn = document.getElementById('generateBtn');
const paletteContainer = document.querySelector('.palete-container');

generateBtn.addEventListener("click",generatePalette)
paletteContainer.addEventListener("click",(e)=>{
  // Check if click happened on either the color div OR the copy icon
  const colorDiv = e.target.closest('.color')
  const copyBtn = e.target.closest('.copy-btn')

  if(colorDiv || copyBtn){
    // Find the nearest color-box ancestor
    const colorBox = (colorDiv || copyBtn).closest('.color-box');
    // Get the hex value from the span
    const hexValue = colorBox.querySelector('.hex-value').textContent;
    
    // Copy to clipboard
    navigator.clipboard.writeText(hexValue)
      .then(() => {
        // Optional: Show feedback
        const originalText = hexValue;
        colorBox.querySelector('.hex-value').textContent = 'Copied!';
        setTimeout(() => {
          colorBox.querySelector('.hex-value').textContent = originalText;
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = hexValue;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      });
  };
});

function generatePalette(){
  const colors = []
  for (let i=0; i<5; i++){
    colors.push(generateRandomColor())
  };

  updatePaletteDisplay(colors);
};

function generateRandomColor(){
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i=0; i<6; i++){
    color += letters[Math.floor(Math.random() * 16)];
  };
  return color
};

function updatePaletteDisplay(colors){
  const colorBox = document.querySelectorAll('.color-box');
  
  colorBox.forEach((box,index)=>{
    const color = colors[index]
    const colorDiv = box.querySelector('.color')
    const hexValue = box.querySelector('.hex-value')

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
};

generatePalette();