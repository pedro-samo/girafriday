const getTime = async () => {
  const url = "https://worldtimeapi.org/api/timezone/America/Sao_Paulo";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentTime = data.datetime;
      const promoStartTime = "2024-06-05T09:00:00.000000-03:00";
      const promoEndTime = "2024-06-15T12:00:00.000000-03:00";

      if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
        mountElmentBlock();
      }
    })
    .catch((error) => {
      console.error(`Error fetching time data: ${error}`);
    });
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("gf24-junho");

  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");

  body.classList.add("gf24-junho");

  const div = document.createElement("div");
  div.setAttribute("class", "giraFriday_overlay");
  div.innerHTML = `
    <div class="giraFriday_modal slide-top">
      <div class="giraFriday_modal-logo">
        <img src="./images/moletom.png" />
      </div>
      <p class="giraFriday_modal-text">Drop 2 - Coleção aconchego está disponível!</p>
      <p class="giraFriday_modal-subtext desktop">Acesso Exclusivo para você - Das 9h às 12h</p>
      <p class="giraFriday_modal-subtext mobile">Acesso Exclusivo para você <br> Das 9h às 12h</p>
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
    if (input.value.toLowerCase() === "aproveita") {
      localStorage.setItem("gf24-junho", true);
      body.classList.remove("gf24-junho");
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

window.addEventListener("DOMContentLoaded", () => {
  getTime();
});
