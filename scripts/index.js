const getTime = async () => {
  const url = "https://worldtimeapi.org/api/timezone/America/Sao_Paulo";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentTime = data.datetime;
      const promoStartTime = "2024-07-19T12:00:00.000000-03:00";
      const promoEndTime = "2024-08-19T23:59:59.000000-03:00";

      if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
        mountElmentBlock();
      }
    })
    .catch((error) => {
      console.error(`Error fetching time data: ${error}`);
    });
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("gf24-sale");

  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");

  body.classList.add("gf24-sale");

  const div = document.createElement("div");
  div.setAttribute("class", "giraFriday_overlay");
  div.innerHTML = `
    <div class="giraFriday_modal slide-top">
      <div class="giraFriday_modal-logo">
        <img src="https://alexandremapa.com/giraflor/sale_gira.png" />
      </div>
      <p class="giraFriday_modal-text">Descontos exclusivos para quem está no grupo vip!</p>
      <p class="giraFriday_modal-text">Não deixe de ter acesso a sale antes de todo mundo!</p>
      <p class="giraFriday_modal-subtext  ">12 horas de acesso antecipado para você!</p>
      <form>
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      <form>  
    </div>
  `;
  body.appendChild(div);

  const form = document.querySelector(".giraFriday_modal form");
  const input = document.querySelector(".giraFriday_modal input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.toLowerCase() === "melhoresdescontos") {
      localStorage.setItem("gf24-sale", true);
      body.classList.remove("gf24-sale");
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
  changeGoBackButton();
});
