const getTime = async () => {
  const currentTime = new Date();
  const promoStartTime = new Date("2024-11-22T11:30:00.000000-03:00");
  const promoEndTime = new Date("2024-11-22T23:59:45.000000-03:00");

  if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
    mountElmentBlock();
  }
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("gf24-70off");

  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");

  body.classList.add("gf24-70off");

  const div = document.createElement("div");
  div.setAttribute("class", "giraFriday_overlay");
  div.innerHTML = `
    <div class="giraFriday_modal slide-top">
      <div class="giraFriday_modal-logo">
        <img src="https://raw.githubusercontent.com/pedro-samo/girafriday/refs/heads/master/images/girafriday_70off.png" />
      </div>
      <p class="giraFriday_modal-text">Minha deusa, se você tem a <strong>senha</strong>, essa é a sua chance de garantir o que realmente quer! <br> Aproveite agora, seus vestidos estão te esperando!</p>
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
      localStorage.setItem("gf24-70off", true);
      body.classList.remove("gf24-70off");
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