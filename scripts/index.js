const getTime = async () => {
  const url = "https://worldtimeapi.org/api/timezone/America/Sao_Paulo";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentTime = data.datetime;
      const promoStartTime = "2024-09-24T12:00:00.000000-03:00";
      const promoEndTime = "2024-10-24T20:00:00.000000-03:00";

      if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
        console.log('rodou')
        mountElmentBlock();
      }
    })
    .catch((error) => {
      console.error(`Error fetching time data: ${error}`);
    });
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("gf24-coresaosol");

  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");

  body.classList.add("gf24-coresaosol");

  const div = document.createElement("div");
  div.setAttribute("class", "giraFriday_overlay");
  div.innerHTML = `
    <div class="giraFriday_modal slide-top">
      <div class="giraFriday_modal-logo">
        <img src="../images/cores-ao-sol_logo.png" />
      </div>
      <img class="giraFriday_modal-text desktop" src="../images/acesso_exclusivo.png" /> 
      <img class="giraFriday_modal-text mobile" src="../images/acesso_exclusivo_mobile.png" /> 
      <form>
        <input type="password" placeholder="Senha para acesso" />
        <button type="submit">Entrar</button>
      <form>
    </div>
  `;
  body.appendChild(div);

  const form = document.querySelector(".giraFriday_modal form");
  const input = document.querySelector(".giraFriday_modal input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.toLowerCase() === "melhorcliente") {
      localStorage.setItem("gf24-coresaosol", true);
      body.classList.remove("gf24-coresaosol");
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

const changeGoBackButton = () => {
  const isCheckout = window.location.pathname.includes("carrinho");
  if (!isCheckout) return;

  const waitForElement = (selector, callback) => {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
    } else {
      const observer = new MutationObserver((mutations, observer) => {
        if (document.querySelector(selector)) {
          callback(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  };

  waitForElement(".cart-products-list", () => {
    const itensLink = document.querySelectorAll(".cart-item-name a");

    const hasPromotionalItem = Array.from(itensLink).some((item) => {
      return item.href.includes("promo-trico");
    });

    if (!hasPromotionalItem) return;

    const goBackButton = document.querySelector(".row .link");
    goBackButton.setAttribute(
      "href",
      "https://www.giraflorstore.com.br/promo-tricot-66a2a31fe987d"
    );
  });
};

window.addEventListener("DOMContentLoaded", () => {
  getTime();
  // changeGoBackButton();
});


// div.innerHTML = `
// <div class="giraFriday_modal slide-top">
//   <div class="giraFriday_modal-logo">
//     <img src="../images/cores-ao-sol_logo.png" />
//   </div>
//   <p class="giraFriday_modal-text" style="margin: 10px auto"><strong>O site está fechado!</strong></p>
//   <p class="giraFriday_modal-text">Hoje é dia de <strong>Promoção exclusiva</strong> para nossas clientes cadastradas!</p>
//   <p class="giraFriday_modal-text">Se você já faz parte do grupo, insira sua senha abaixo e aproveite <strong>até 15% OFF</strong> em todo site.</p>
//   <form>
//     <input type="password" placeholder="Senha para acesso" />
//     <button type="submit">Entrar</button>
//   <form>
//   <p class="giraFriday_modal-helptext">Ainda não tem acesso? Clique aqui para se cadastrar e participar do grupo gira</p>
//   <a href="https://rd.giraflorstore.com.br/gira_day" target="_blank"><span>Quero participar</span></a>
// </div>
// `;