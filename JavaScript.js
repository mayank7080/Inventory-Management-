<script>
    const API_URL = 'http://localhost:3000'; // Adjust the URL if your backend is hosted elsewhere

    // Fetch products on page load
    async function fetchProducts() {
        const response = await fetch(`${API_URL}/getProducts`);
        const products = await response.json();
        renderProducts(products);
    }

    // Render products in the table
    function renderProducts(products) {
        const productList = document.querySelector('#product-list tbody');
        productList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td>${product.stock}</td>
                <td class="actions">
                    <button class="edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;
            productList.appendChild(row);
        });
    }

    // Add a new product
    async function addProduct(name, price, stock) {
        const response = await fetch(`${API_URL}/addProduct`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, stock })
        });
        const result = await response.json();
        fetchProducts(); // Refresh product list
    }

    // Update product stock
    async function updateProduct(id, stock) {
        const response = await fetch(`${API_URL}/updateProduct`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, stock })
        });
        const result = await response.json();
        fetchProducts(); // Refresh product list
    }

    // Call fetchProducts on page load
    window.onload = fetchProducts;

    // Add product form submission handler
    const form = document.getElementById('product-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = document.getElementById('product-price').value;
        const stock = document.getElementById('product-stock').value;
        addProduct(name, price, stock);
        form.reset();
    });

    // Edit product functionality
    function editProduct(id) {
        // Fetch the product data and populate the form for editing
        // You can call the addProduct function with updated data
    }

    // Delete product functionality can also be added here
</script>
