document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("product-catalog")) {
        loadProducts();
    }

    if (document.getElementById("cart-summary")) {
        loadCart();
    }

    if (document.getElementById("add-product-form")) {
        document.getElementById("add-product-form").addEventListener("submit", function(event) {
            event.preventDefault();
            addProduct();
        });
    }

    if (document.getElementById("login-form")) {
        document.getElementById("login-form").addEventListener("submit", function(event) {
            event.preventDefault();
            loginUser();
        });
    }

    if (document.getElementById("register-form")) {
        document.getElementById("register-form").addEventListener("submit", function(event) {
            event.preventDefault();
            registerUser();
        });
    }

    if (document.getElementById("checkout-button")) {
        document.getElementById("checkout-button").addEventListener("click", function() {
            finalizePurchase();
        });
    }

    if (document.getElementById("search-bar")) {
        document.getElementById("search-bar").addEventListener("input", function() {
            searchProducts();
        });
    }
});

function loadProducts(productsToLoad) {
    const products = productsToLoad || JSON.parse(localStorage.getItem("products")) || [];
    const catalog = document.getElementById("product-catalog");
    catalog.innerHTML = ''; // Clear any existing content
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Preço: ${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        catalog.appendChild(productDiv);
    });
}

function addProduct() {
    const name = document.getElementById("product-name").value;
    const description = document.getElementById("product-description").value;
    const price = document.getElementById("product-price").value;
    const image = document.getElementById("product-image").value;

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name: name,
        description: description,
        price: parseFloat(price),
        image: image,
        available: true
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    alert("Produto cadastrado com sucesso!");
    window.location.href = "index.html";
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find(p => p.id === productId);
    const productInCart = cart.find(p => p.id === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produto adicionado ao carrinho!");
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartSummary = document.getElementById("cart-summary");

    if (cart.length === 0) {
        cartSummary.innerHTML = "<p>Seu carrinho está vazio.</p>";
        return;
    }

    let total = 0;
    cartSummary.innerHTML = "<ul>";
    cart.forEach(product => {
        total += product.price * product.quantity;
        cartSummary.innerHTML += `
            <li>
                <img src="${product.image}" alt="${product.name}">
                <div class="cart-details">
                    <p><strong>Nome do Produto:</strong> ${product.name}</p>
                    <p><strong>Quantidade:</strong> ${product.quantity}</p>
                    <p><strong>Preço:</strong> ${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <p><strong>Total:</strong> ${(product.price * product.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
            </li>
        `;
    });
    cartSummary.innerHTML += `</ul><p>Total: ${total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>`;
}

function finalizePurchase() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    // Envio de Notificação
    alert("Compra finalizada!");
    
    // Limpar carrinho
    localStorage.removeItem("cart");
    loadCart();
}

function loginUser() {
    // Simulação de login
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Para fins de simplicidade, aceitamos qualquer combinação de email/senha
    alert(`Login realizado com sucesso!`);
    window.location.href = "index.html";
}

function registerUser() {
    // Simulação de registro
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Para fins de simplicidade, aceitamos qualquer combinação de dados
    alert(`Registrado com sucesso!`);
    window.location.href = "login.html";
}

function searchProducts() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
    );
    loadProducts(filteredProducts);
}
