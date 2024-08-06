const getTime = async () => {
  const url = "https://worldtimeapi.org/api/timezone/America/Sao_Paulo";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentTime = data.datetime;
      const promoStartTime = "2024-01-07T10:00:00.000000-03:00";
      const promoEndTime = "2024-08-07T12:00:00.000000-03:00";

      if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
        mountElmentBlock();
      }
    })
    .catch((error) => {
      console.error(`Error fetching time data: ${error}`);
    });
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("gf24-cores");

  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");

  body.classList.add("gf24-cores");

  const div = document.createElement("div");
  div.setAttribute("class", "giraFriday_overlay");
  div.innerHTML = `
    <div class="giraFriday_modal slide-top">
      <div class="giraFriday_modal-logo">
        <img src="/images/cores_logos.webp" />
      </div>
      <p class="giraFriday_modal-text">4 Novas cores do nosos vestido amplo já disponíveis!</p>
      <p class="giraFriday_modal-subtext desktop">Acesso Exclusivo para você - Das 10h às 12h</p>
      <p class="giraFriday_modal-subtext mobile">Acesso Exclusivo para você <br> Das 10h às 12h</p>
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
    if (input.value.toLowerCase() === "novas cores") {
      localStorage.setItem("gf24-cores", true);
      body.classList.remove("gf24-cores");
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
