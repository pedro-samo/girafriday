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
``
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
  body.appendChild(div);1

  const form = document.querySelector(".giraFriday_modal form");
  const input = document.querySelector(".giraFriday_modal input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.toLowerCase() === "ultimogiro" || input.value.toLowerCase() === "últimogiro") {
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

// const changeGoBackButton = () => {
//   const isCheckout = window.location.pathname.includes("carrinho");
//   if (!isCheckout) return;

//   const waitForElement = (selector, callback) => {
//     const element = document.querySelector(selector);
//     if (element) {
//       callback(element);
//     } else {
//       const observer = new MutationObserver((mutations, observer) => {
//         if (document.querySelector(selector)) {
//           callback(document.querySelector(selector));
//           observer.disconnect();
//         }
//       });

//       observer.observe(document.body, {
//         childList: true,
//         subtree: true,
//       });
//     }
//   };

//   waitForElement(".cart-products-list", () => {
//     const itensLink = document.querySelectorAll(".cart-item-name a");

//     const hasPromotionalItem = Array.from(itensLink).some((item) => {
//       return item.href.includes("promo-trico");
//     });

//     if (!hasPromotionalItem) return;

//     const goBackButton = document.querySelector(".row .link");
//     goBackButton.setAttribute(
//       "href",
//       "https://www.giraflorstore.com.br/promo-tricot-66a2a31fe987d"
//     );
//   });
// };

window.addEventListener("DOMContentLoaded", () => {
  // const IS_PRODUCTION = window.location.hostname === "www.giraflorstore.com.br";
  // if (IS_PRODUCTION) return;
  getTime();
  // changeGoBackButton();
});