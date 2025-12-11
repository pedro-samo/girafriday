const runPromoModal = async () => {
  const currentTime = new Date();
  const promoStartTime = new Date("2025-12-11T08:30:00.000000-03:00");
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
        <img src="https://pedro-samo.github.io/girafriday/images/aventurina/aventurina_logos_title.png" alt="Gira Friday Logo" />
        <div class="giraFriday_modal-logo-text"> 
          <p>Você chegou até aqui porque faz parte do <strong>Clube Gira!</strong> Aproveite o Site todo da Aventurina com <strong>desconto de 15%OFF</strong> para as participantes do Clube, </br> hoje – 11/12 das 9h às 14h.</p>
          <a href="https://lp.clubegira.com.br/clubegira-vestidos" target="_blank">Se você ainda não faz parte do Clube, cadastre-se aqui para entrar e receber o seu acesso.</a>
        </div>
      </div>
      <form>
        <img src="https://pedro-samo.github.io/girafriday/images/aventurina/aventurina_logos.png" alt="Aventurina Logos" />
        <input name="password" type="password" placeholder="SENHA" />
        <button type="submit" class="giraFriday_modal-button">Entrar</button>
      </form>
    </div>
  `;
  body.appendChild(div);

  const form = document.querySelector(".giraFriday_modal form");
  const passwordInput = document.querySelector(
    ".giraFriday_modal input[type='password']"
  );

  passwordInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      validatePassword();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validatePassword();
  });

  const validatePassword = () => {
    if (passwordInput.value.toLowerCase() === "leveza15") {
      localStorage.setItem("clubeGira2025Modal", true);
      body.classList.remove("clubeGira2025Modal");
      const element = document.querySelector(".giraFriday_overlay");
      setTimeout(() => {
        element.remove();
      }, 500);
    } else {
      passwordInput.value = "SENHA INCORRETA";
      passwordInput.setAttribute("type", "text");
      passwordInput.classList.add("error");
      passwordInput.disabled = true;
      setTimeout(() => {
        passwordInput.disabled = false;
        passwordInput.classList.remove("error");
        passwordInput.value = "";
        passwordInput.setAttribute("type", "password");
      }, 3000);
    }
  };
};

const checkClubeGiraQueryParam = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const clubeGiraParam = urlParams.get("clubeGira2025");

  const hasShowLinkOnLocalStorage = localStorage.getItem("clubeGira2025Link");

  const currentTime = new Date();
  const promoEndTime = new Date("2025-12-14T23:59:00.000000-03:00");

  if (hasShowLinkOnLocalStorage && currentTime >= promoEndTime) {
    return localStorage.removeItem("clubeGira2025Link");
  }

  if (clubeGiraParam) {
    localStorage.setItem("clubeGira2025Link", "true");
  }
};

const createLinkGira = () => {
  const desktopMenu = document.querySelector(".js-desktop-nav.desktop-nav");
  const mobileMenu = document.querySelector("#nav-hamburger .clear-both ul");

  const buttonGira = document.querySelector(
    '[data-store="home-categories-featured"] ul li [title="Clube Gira"]'
  );

  const hasShowLinkOnLocalStorage = localStorage.getItem("clubeGira2025Link");

  if (hasShowLinkOnLocalStorage !== "true") {
    buttonGira?.remove();
    return;
  }

  if (desktopMenu) {
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

  if (mobileMenu) {
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
