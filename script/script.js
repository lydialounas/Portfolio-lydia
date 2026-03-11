// ===== NAVBAR: add "navbarDark" on scroll =====
function handleNavbarScroll() {
  const header = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    const top = window.scrollY;
    if (top >= 100) {
      header.classList.add("navbarDark");
    } else {
      header.classList.remove("navbarDark");
    }
  });
}

// ===== NAVBAR: collapse on small devices after click =====
function handleNavbarCollapse() {
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const menuToggle = document.getElementById("navbarSupportedContent");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!menuToggle) return;

      const isShown = menuToggle.classList.contains("show");
      if (!isShown) return;

      const bsCollapse = bootstrap.Collapse.getInstance(menuToggle);
      if (bsCollapse) {
        bsCollapse.hide();
      } else {
        new bootstrap.Collapse(menuToggle).hide();
      }
    });
  });
}

// ===== SKILLS: build cards from JSON =====
function createSkillsFromJSON() {
  const container = document.querySelector("#skills .container");
  if (!container) return;

  let row = document.createElement("div");
  row.classList.add("row");

  fetch("data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {
        const col = document.createElement("div");
        col.classList.add("col-lg-4", "mt-4");

        col.innerHTML = `
          <div class="card skillsText">
            <div class="card-body">
              <img src="./images/${item.image}" alt="${item.title}" loading="lazy" />
              <h3 class="card-title mt-3">${item.title}</h3>
              <p class="card-text mt-3">${item.text}</p>
            </div>
          </div>
        `;

        row.appendChild(col);

        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    })
    .catch((err) => console.error("Erreur chargement skills.json", err));
}

// ===== PORTFOLIO: build cards from JSON =====
function createPortfolioFromJSON() {
  const container = document.querySelector("#portfolio .container");
  if (!container) return;

  let row = document.createElement("div");
  row.classList.add("row");

  fetch("data/portfolio.json")   /* La fonction fetch() est utilisée pour effectuer une requête HTTP vers le fichier "data/portfolio.json". */
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item, index) => {  /* La méthode forEach() est utilisée pour itérer sur chaque élément du tableau de données JSON. Pour chaque élément (représenté par "item"), une fonction est exécutée qui crée une carte de portfolio sur la page. L'index de chaque élément est également fourni, ce qui permet de déterminer quand ajouter une nouvelle ligne après chaque groupe de trois éléments. */
        const col = document.createElement("div");
        col.classList.add("col-lg-4", "mt-4");

        col.innerHTML = `
          <div class="card portfolioContent">
            <img class="card-img-top" src="images/${item.image}" alt="${item.title}" loading="lazy">

            <!-- overlay hover -->
            <div class="card-desc">${item.text}</div>

            <div class="card-body">
              <h3 class="card-title">${item.title}</h3>
              <div class="text-center">
                <a href="${item.link}" class="btn btn-success" target="_blank" rel="noopener">
                  Voir le projet
                </a>
              </div>
            </div>
          </div>
        `;

        row.appendChild(col);    

        if ((index + 1) % 3 === 0 || index === data.length - 1) {
          container.appendChild(row);
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
    })
    .catch((err) => console.error("Erreur chargement portfolio.json", err));
}

// ===== RUN =====
handleNavbarScroll();
handleNavbarCollapse();
createSkillsFromJSON();
createPortfolioFromJSON();
