let products = [];
let originalProducts = [];
let editingId = null;
let currentFilter = null;

const productList = document.getElementById("product-list");
const form = document.getElementById("productForm");
const modal = document.getElementById("modal");
const snackbar = document.getElementById("snackbar");
const filtersContainer = document.getElementById("filters");

document.getElementById("addProductBtn").addEventListener("click", () => {
  editingId = null;
  form.reset();
  document.getElementById("modalTitle").innerText = "Новий товар";
  openModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const now = new Date();
  const product = {
    ...data,
    id: editingId || Date.now().toString(),
    price: Number(data.price),
    category: data.category.trim(),
    image: data.image,
    createdAt: editingId ? products.find(p => p.id === editingId).createdAt : now,
    updatedAt: now
  };

  if (editingId) {
    products = products.map(p => p.id === editingId ? product : p);
    originalProducts = originalProducts.map(p => p.id === editingId ? product : p);
    showToast(`Товар ${product.title} (ID: ${product.id}) оновлено`);
  } else {
    products.push(product);
    originalProducts.push(product);
    showToast(`Товар ${product.title} додано`);
  }

  closeModal();
  renderProducts();
  renderFilters();
});

function renderProducts() {
  productList.innerHTML = "";
  const filteredProducts = currentFilter
    ? products.filter(p => p.category === currentFilter)
    : products;

  if (filteredProducts.length === 0) {
    productList.innerHTML = '<p class="empty-text">Наразі список товарів пустий або не знайдено за фільтром.</p>';
    updateTotal(filteredProducts);
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <p><strong>ID:</strong> ${product.id}</p>
      <p><strong>Назва:</strong> ${product.title}</p>
      <p><strong>Ціна:</strong> ${product.price} грн</p>
      <p><strong>Категорія:</strong> ${product.category}</p>
      <p><small>Оновлено: ${new Date(product.updatedAt).toLocaleString()}</small></p>
      <img src="${product.image}" alt="${product.title}" />
      <button onclick="editProduct('${product.id}')">Редагувати</button>
      <button onclick="deleteProduct('${product.id}')">Видалити</button>
    `;
    productList.appendChild(card);
  });

  updateTotal(filteredProducts);
}

function deleteProduct(id) {
  const title = products.find(p => p.id === id).title;
  products = products.filter(p => p.id !== id);
  originalProducts = originalProducts.filter(p => p.id !== id);
  showToast(`Товар ${title} видалено`);
  renderProducts();
  renderFilters();
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  form.title.value = product.title;
  form.price.value = product.price;
  form.category.value = product.category;
  form.image.value = product.image;
  form.id.value = product.id;
  editingId = id;
  document.getElementById("modalTitle").innerText = "Редагування товару";
  openModal();
}

function updateTotal(list = products) {
  const sum = list.reduce((acc, p) => acc + p.price, 0);
  document.getElementById("total-price").innerText = `Загальна вартість: ${sum} грн`;
}

function openModal() {
  modal.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
}
function showToast(text) {
  snackbar.textContent = text;
  snackbar.className = "show";
  setTimeout(() => snackbar.className = snackbar.className.replace("show", ""), 2500);
}

// Сортування
function sortByPrice() {
  products.sort((a, b) => a.price - b.price);
  renderProducts();
}
function sortByCreateDate() {
  products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  renderProducts();
}
function sortByUpdateDate() {
  products.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // по спаданні
  renderProducts();
}
function resetSort() {
  products = [...originalProducts];
  renderProducts();
}

// Фільтри по категорії
function renderFilters() {
  const categories = [...new Set(originalProducts.map(p => p.category))];
  filtersContainer.innerHTML = categories.map(cat =>
    `<button onclick="filterByCategory('${cat}')">${cat}</button>`
  ).join("");
  filtersContainer.innerHTML += `<button onclick="clearFilter()">Скинути фільтр</button>`;
}

function filterByCategory(category) {
  currentFilter = category;
  renderProducts();
}
function clearFilter() {
  currentFilter = null;
  renderProducts();
}
