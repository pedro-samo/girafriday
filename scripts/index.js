const getTime = async () => {
  const currentTime = new Date();
  const promoStartTime = new Date("2025-05-06T08:00:00.000000-03:00");
  const promoEndTime = new Date("2025-05-06T08:00:00.000000-03:00");

  if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
    mountElmentBlock();
  }
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("gf-encerramento");

  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");
  ``;
  body.classList.add("gf-encerramento");

  const div = document.createElement("div");
  div.setAttribute("class", "giraFriday_overlay");
  div.innerHTML = `
    <div class="giraFriday_modal slide-top">
      <div class="giraFriday_modal-logo">
        <img src="https://raw.githubusercontent.com/pedro-samo/girafriday/refs/heads/master/images/encerramento/encerramento_logo.png" alt="Giraflor Store" />
        <div class="giraFriday_modal-logo-text"> <p>Foram 10 anos girando com vocês, criando com propósito, vestindo com alma, atendendo mais de 400 mulheres incríveis todos os meses. E agora, chegou a hora de dar um desfecho consciente a essa fase tão linda. Aproveitem! </p></div>
      </div>
      <form>
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      <form>
    </div>
  `;
  body.appendChild(div);
  1;

  const form = document.querySelector(".giraFriday_modal form");
  const input = document.querySelector(".giraFriday_modal input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      input.value.toLowerCase() === "ultimogiro" ||
      input.value.toLowerCase() === "últimogiro"
    ) {
      localStorage.setItem("gf-encerramento", true);
      body.classList.remove("gf-encerramento");
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
    mobileMenu.prepend(elementMobile);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  checkClubeGiraQueryParam();
  createLinkGira();
});
