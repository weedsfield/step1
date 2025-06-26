const catalogData = [
  {
    name: "Cabernet Sauvignon",
    country: "USA",
    price: 1800,
    img: "cabernet.jpg",
    link: "product.html"
  },
  {
    name: "Chateau Margaux",
    country: "France",
    price: 1500,
    img: "chateau.png"
  },
  {
    name: "Barolo Riserva",
    country: "Italy",
    price: 950,
    img: "Barolo.jpg"
  },
  {
    name: "Rioja Gran Reserva",
    country: "Spain",
    price: 2100,
    img: "rioja.png"
  },
  {
    name: "Merlot Vintage",
    country: "France",
    price: 1700,
    img: "merlot.webp"
  },
  {
    name: "Chianti Classico",
    country: "Italy",
    price: 1200,
    img: "wine2.jpg"
  },
  {
    name: "Zinfandel Reserve",
    country: "USA",
    price: 1350,
    img: "reserve.webp"
  },
  {
    name: "Malbec Oro",
    country: "Argentina",
    price: 1550,
    img: "malbek.webp"
  },
  {
    name: "Tempranillo Especial",
    country: "Spain",
    price: 1900,
    img: "Tempranillo.webp"
  },
  {
    name: "Pinot Noir Deluxe",
    country: "France",
    price: 2000,
    img: "pinot.webp"
  },
  {
    name: "Carmenere Select",
    country: "Chile",
    price: 1600,
    img: "Carmenere.jpg"
  },
  {
    name: "Sangiovese Rosso",
    country: "Italy",
    price: 1000,
    img: "rosso.jpg"
  }
];

const catalogEl = document.getElementById("catalog");
const searchEl = document.getElementById("search");
const paginationEl = document.getElementById("pagination");
const sortButtons = document.querySelectorAll(".sort-buttons button");

let currentPage = 1;
const itemsPerPage = 4;
let filteredData = [...catalogData];

function renderCatalog(data, page) {
  catalogEl.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  data.slice(start, end).forEach(item => {
    const itemEl = document.createElement(item.link ? "a" : "div");
    itemEl.className = "item";
    if (item.link) itemEl.href = item.link;
    itemEl.dataset.price = item.price;
    itemEl.dataset.country = item.country.toLowerCase();

    itemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.country}, ${item.price} ₽</p>
    `;

    catalogEl.appendChild(itemEl);
  });
}

function renderPagination(data) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  paginationEl.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderCatalog(filteredData, currentPage);
      renderPagination(filteredData);
    });
    paginationEl.appendChild(btn);
  }
}

searchEl.addEventListener("input", () => {
  const val = searchEl.value.toLowerCase();
  filteredData = catalogData.filter(item =>
    item.name.toLowerCase().includes(val) ||
    item.country.toLowerCase().includes(val)
  );
  currentPage = 1;
  renderCatalog(filteredData, currentPage);
  renderPagination(filteredData);
});

sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.sort;
    filteredData.sort((a, b) => {
      if (type === "price") return a.price - b.price;
      if (type === "country") return a.country.localeCompare(b.country);
    });
    currentPage = 1;
    renderCatalog(filteredData, currentPage);
    renderPagination(filteredData);
  });
});

// Init
renderCatalog(filteredData, currentPage);
renderPagination(filteredData);
