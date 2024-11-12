const getTime = async () => {
  const currentTime = new Date();
  const promoStartTime = new Date("2024-11-12T11:30:00.000000-03:00");
  const promoEndTime = new Date("2024-11-12T20:00:00.000000-03:00");

  if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
    mountElmentBlock();
  }
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("gf24-9anos");

  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");

  body.classList.add("gf24-9anos");

  const div = document.createElement("div");
  div.setAttribute("class", "giraFriday_overlay");
  div.innerHTML = `
    <div class="giraFriday_modal slide-top">
      <div class="giraFriday_modal-logo">
        <img class="desktop" src="https://github.com/pedro-samo/girafriday/blob/c17a78c7e5d0d5d6ac71870c889092ed660128cf/images/9_anos/texto.png?raw=true" />
        <img class="mobile" src="https://github.com/pedro-samo/girafriday/blob/c17a78c7e5d0d5d6ac71870c889092ed660128cf/images/9_anos/texto_mobile.png?raw=true" />
      </div>
      <form>
        <input type="password" placeholder="Senha para acesso" />
        <button type="submit">Entrar</button>
      <form>
      <img class="giraFriday_modal-side right" src="https://github.com/pedro-samo/girafriday/blob/c17a78c7e5d0d5d6ac71870c889092ed660128cf/images/9_anos/9anos.png?raw=true"  />
      <img class="giraFriday_modal-side left" src="https://github.com/pedro-samo/girafriday/blob/c17a78c7e5d0d5d6ac71870c889092ed660128cf/images/9_anos/aniversario_gira.jpg?raw=true"  />
    </div>
  `;
  body.appendChild(div);

  const form = document.querySelector(".giraFriday_modal form");
  const input = document.querySelector(".giraFriday_modal input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.toLowerCase() === "festadagira") {
      localStorage.setItem("gf24-9anos", true);
      body.classList.remove("gf24-9anos");
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