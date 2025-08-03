const API_URL = 'https://fakestoreapi.com/products';
const productsContainer = document.getElementById('products');
const errorElement = document.getElementById('error');
const totalPriceElement = document.getElementById('total-price');

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const products = await response.json();
    console.log("Fetched Products:", products);

    // Display Products in DOM
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p><strong>Price:</strong> $${product.price}</p>
        <button>View Details</button>
      `;

      productsContainer.appendChild(card);
    });

    // Calculate total price using reduce
    const total = products.reduce((sum, product) => sum + product.price, 0);
    totalPriceElement.textContent = `Total Price of All Products: $${total.toFixed(2)}`;

  } catch (error) {
    console.error('Fetch error:', error);
    errorElement.textContent = 'Failed to fetch products. Please try again later.';
  }
}

fetchProducts();
