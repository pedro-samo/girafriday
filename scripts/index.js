const runPromoModal = async () => {
  const currentTime = new Date();
  const promoStartTime = new Date("2025-11-11T09:00:00.000000-03:00");
  const promoEndTime = new Date("2025-12-11T14:00:00.000000-03:00");

  if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
    mountElmentBlock();
  }
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("clubeGira2025Modal");

  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");
  body.classList.add("clubeGira2025Modal");

  const div = document.createElement("div");
  div.setAttribute("class", "giraFriday_overlay");
  div.innerHTML = `
    <div class="giraFriday_modal slide-top">
      <div class="giraFriday_modal-logo">
        <h3>Acesso Exclusivo</h3>
        <div class="giraFriday_modal-logo-text"> <p> Você chegou até aqui porque faz parte do <strong>Clube Gira!</strong> Aproveite o Site todo da Aventurina com <strong> desconto de 15%OFF </strong> para as participantes do Clube, hoje 11/12 das 9h às 14h. </p></div>
      </div>
      <form>
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
        <img src="../images/aventurina/aventurina_logos.png" alt="Giraflor Store" />
      <form>
    </div>
  `;
  body.appendChild(div);

  const form = document.querySelector(".giraFriday_modal form");
  const input = document.querySelector(".giraFriday_modal input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      input.value.toLowerCase() === "ultimogiro" ||
      input.value.toLowerCase() === "últimogiro"
    ) {
      localStorage.setItem("clubeGira2025Link", true);
      localStorage.setItem("clubeGira2025Modal", true);
      body.classList.remove("clubeGira2025Modal");
      const element = document.querySelector(".giraFriday_overlay");
      setTimeout(() => {
        element.remove();
      }, 500);
    } else {
      input.value = "SENHA INCORRETA";
      input.setAttribute("type", "text");
      input.classList.add("error");
      input.disable = true;
      setTimeout(() => {
        input.disable = false;
        input.classList.remove("error");
        input.value = "";
        input.setAttribute("type", "password");
      }, 3000);
    }
  });
};

const checkClubeGiraQueryParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const clubeGiraParam = urlParams.get("clubeGira2025");

  if (clubeGiraParam === "true") {
    localStorage.setItem("clubeGira2025Link", "true");
  }
};

const createLinkGira = () => {
  const desktopMenu = document.querySelector(".js-desktop-nav.desktop-nav");
  const mobileMenu = document.querySelector("#nav-hamburger .clear-both ul");

  const hasShowLinkOnLocalStorage = localStorage.getItem("clubeGira2025Link");

  if (desktopMenu && hasShowLinkOnLocalStorage === "true") {
    const elementDesktop = `<li class="desktop-nav-item ">
		      <a href="https://www.aaventurina.com.br/clube-gira" class="desktop-nav-link">
          <span class="divider-bullet opacity-50 m-right-half" aria-hidden="true"></span>
						Clube Gira
		      </a>
			</li>`;
    const secondChild = desktopMenu.children[1];
    if (secondChild) {
      secondChild.insertAdjacentHTML("beforebegin", elementDesktop);
    } else {
      desktopMenu.innerHTML += elementDesktop;
    }
  }

  if (mobileMenu && hasShowLinkOnLocalStorage === "true") {
    const elementMobile = `<li>
                <a class="hamburger-panel-link" href="https://www.aaventurina.com.br/clube-gira">
                    Clube Gira
                </a>
             </li>`;
    mobileMenu.insertAdjacentHTML("afterbegin", elementMobile);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  runPromoModal();
  checkClubeGiraQueryParam();
  createLinkGira();
});
