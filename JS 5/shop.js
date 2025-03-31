// Структури даних для обліку
const productsMap = new Map(); // Зберігання продуктів
const ordersSet = new Set(); // Відстеження замовлень
const productHistoryWeakMap = new WeakMap(); // Історія змін продуктів
const userWeakSet = new WeakSet(); // Відстеження користувачів

let productId = 1; // Ідентифікатор для нових продуктів

// Функція для додавання продукту
function addProduct(name, price, quantity) {
    const product = { id: productId++, name, price, quantity };
    productsMap.set(product.id, product);
    console.log(`Продукт "${name}" додано до каталогу.`);
}

// Функція для видалення продукту
function deleteProduct(id) {
    if (productsMap.has(id)) {
        productsMap.delete(id);
        console.log(`Продукт з ID ${id} видалено.`);
    } else {
        console.log(`Продукт з ID ${id} не знайдений.`);
    }
}

// Функція для оновлення інформації про продукт
function updateProduct(id, newPrice, newQuantity) {
    if (productsMap.has(id)) {
        const product = productsMap.get(id);
        product.price = newPrice;
        product.quantity = newQuantity;
        console.log(`Інформація про продукт з ID ${id} оновлено.`);
        logProductHistory(product);
    } else {
        console.log(`Продукт з ID ${id} не знайдений.`);
    }
}

// Функція для пошуку продукту за назвою
function searchProduct(name) {
    const foundProducts = [];
    for (const product of productsMap.values()) {
        if (product.name.toLowerCase().includes(name.toLowerCase())) {
            foundProducts.push(product);
        }
    }
    displaySearchResults(foundProducts);
}

// Функція для відстеження замовлень
function trackOrder(productId, quantity) {
    if (productsMap.has(productId)) {
        const product = productsMap.get(productId);
        if (product.quantity >= quantity) {
            product.quantity -= quantity;
            ordersSet.add({ productId, quantity });
            console.log(`Замовлено ${quantity} одиниць продукту "${product.name}".`);
            displayOrders();
        } else {
            console.log("Недостатньо кількості на складі.");
        }
    } else {
        console.log("Продукт не знайдений.");
    }
}

// Функція для логування змін у продукті
function logProductHistory(product) {
    const history = productHistoryWeakMap.get(product) || [];
    history.push({ price: product.price, quantity: product.quantity, date: new Date() });
    productHistoryWeakMap.set(product, history);
}

// Відображення результатів пошуку
function displaySearchResults(foundProducts) {
    const searchResultsDiv = document.getElementById("searchResults");
    searchResultsDiv.innerHTML = "";
    if (foundProducts.length > 0) {
        foundProducts.forEach((product) => {
            const li = document.createElement("li");
            li.textContent = `ID: ${product.id}, Назва: ${product.name}, Ціна: ${product.price}, Кількість: ${product.quantity}`;
            searchResultsDiv.appendChild(li);
        });
    } else {
        const li = document.createElement("li");
        li.textContent = "Продукти за таким запитом не знайдено.";
        searchResultsDiv.appendChild(li);
    }
}

// Відображення замовлень
function displayOrders() {
    const orderList = document.getElementById("orderList");
    orderList.innerHTML = "";
    ordersSet.forEach((order) => {
        const product = productsMap.get(order.productId);
        const li = document.createElement("li");
        li.textContent = `Продукт: ${product.name}, Кількість замовлених: ${order.quantity}`;
        orderList.appendChild(li);
    });
}

// Інтерфейс для додавання продуктів через кнопку
document.getElementById("addProductBtn").addEventListener("click", () => {
    const name = prompt("Введіть назву продукту:");
    const price = parseFloat(prompt("Введіть ціну продукту:"));
    const quantity = parseInt(prompt("Введіть кількість на складі:"));
    addProduct(name, price, quantity);
});

// Інтерфейс для видалення продукту
document.getElementById("deleteProductBtn").addEventListener("click", () => {
    const id = parseInt(prompt("Введіть ID продукту для видалення:"));
    deleteProduct(id);
});

// Інтерфейс для оновлення продукту
document.getElementById("updateProductBtn").addEventListener("click", () => {
    const id = parseInt(prompt("Введіть ID продукту для оновлення:"));
    const newPrice = parseFloat(prompt("Введіть нову ціну:"));
    const newQuantity = parseInt(prompt("Введіть нову кількість:"));
    updateProduct(id, newPrice, newQuantity);
});

// Інтерфейс для пошуку продукту
document.getElementById("searchProductBtn").addEventListener("click", () => {
    const name = prompt("Введіть назву продукту для пошуку:");
    searchProduct(name);
});

// Інтерфейс для відстеження замовлень
document.getElementById("trackOrderBtn").addEventListener("click", () => {
    const id = parseInt(prompt("Введіть ID продукту для замовлення:"));
    const quantity = parseInt(prompt("Введіть кількість замовлених одиниць:"));
    trackOrder(id, quantity);
});

// Функція для відображення продуктів на екран
function displayProducts() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    productsMap.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = `ID: ${product.id}, Назва: ${product.name}, Ціна: ${product.price}, Кількість: ${product.quantity}`;
        productList.appendChild(li);
    });
}

// Функція для відображення історії змін продуктів
function displayProductHistory() {
    const productHistory = document.getElementById("productHistory");
    productHistory.innerHTML = "";
    productHistoryWeakMap.forEach((history, product) => {
        history.forEach((entry, index) => {
            const li = document.createElement("li");
            li.textContent = `Продукт: ${product.name}, Історія змін: Ціна: ${entry.price}, Кількість: ${entry.quantity}, Дата: ${entry.date}`;
            productHistory.appendChild(li);
        });
    });
}

// Функція для відображення даних на сторінці
setInterval(() => {
    displayProducts();
    displayProductHistory();
}, 1000);
