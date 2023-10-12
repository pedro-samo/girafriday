const getTime = async () => {
  const url = "http://worldtimeapi.org/api/timezone/America/Sao_Paulo";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentTime = data.datetime;
      const promoStartTime = "2023-10-12T09:00:00.000000-03:00";
      const promoEndTime = "2023-10-16T12:00:00.000000-03:00";

      if (promoStartTime <= currentTime && promoEndTime >= currentTime) {
        mountElmentBlock();
      }
    })
    .catch((error) => {
      console.error(`Error fetching time data: ${error}`);
    });
};

const mountElmentBlock = () => {
  const hasKeyOnLocalStorage = localStorage.getItem("gbf23");
  if (hasKeyOnLocalStorage === "true") return;

  const body = document.querySelector("body");

  body.classList.add("gbf23");

  const div = document.createElement("div");
  div.setAttribute("class", "novosClassicos_overlay");
  div.innerHTML = `
    <div class="novosClassicos_modal slide-top">
      <div class="novosClassicos_modal-logo">
        <img src="../images/novos_classicos.png" />
      </div>
      <p class="novosClassicos_modal-text">Acesso exclusivo - 09h às 12h</p>
      <form>
        <input type="password" placeholder="Senha" />
        <button type="submit">Entrar</button>
      <form>  
    </div>
  `;
  body.appendChild(div);

  const form = document.querySelector(".novosClassicos_modal form");
  const input = document.querySelector(".novosClassicos_modal input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "melhorcliente") {
      localStorage.setItem("gbf23", true);
      body.classList.remove("gbf23");
      const element = document.querySelector(".novosClassicos_overlay");
      setTimeout(() => {
        element.remove();
      }, 500);
    } else {
      input.value = "SENHA INCORRETA";
      input.setAttribute("type", "text");
      input.classList.add("error");
      setTimeout(() => {
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
