const url = 'https://fakestoreapi.com/products';
const inputElement = document.getElementById('searchInput');
const productCards = document.getElementsByClassName('product_card');

const fetchProduct = async()=>{
    try{
        const response = await fetch(url);
        const data = await response.json()
        const container = document.querySelector('.product_container');
        container.innerHTML='';

        data.forEach(product => {
            // Step 4: Create HTML for each product
            const card = document.createElement('div');
            card.classList.add('product_card');
            card.innerHTML=`
            <div class='image_container' alt='image'>
                <img src=${product.image}>
            </div>
            <div class='product_content'>
                <h1>${product.title}</h1>
                <p>${product.description}</p>
                <button>${product.price}$</button>
            </div>
            `;

            container.appendChild(card);
        });

        addSearchFilter();
    }
    catch (error){
        console.log('Error fetching product:', error);
    }    
};


// Function to handle search filtering
function addSearchFilter() {
    const input = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product_card');

    input.addEventListener('input', function () {
        const query = this.value.toLowerCase();

        productCards.forEach(card => {
            const title = card.querySelector('.product_content h1').textContent.toLowerCase();
            const price = card.querySelector('.product_content button').textContent.toLowerCase();

            // Check if query matches title OR price

            if (title.includes(query) || price.includes(query)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}


// Run fetchProduct after the HTML is loaded
window.addEventListener('DOMContentLoaded',fetchProduct);