window.addEventListener("DOMContentLoaded", (event) => {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  div.setAttribute("class", "blackfriday_overlay");
  div.innerHTML = `
    <div class="blackfriday_modal">
      <h3>Gira Friday</h3>
      <div class="blackfriday_modal-discount">
        <p>Até</p>
        <p class="blackfriday_modal-discount-value">70%</p>
        <p>Desconto</p>
      </div>
      <p class="blackfriday_modal-text">Vem aproveitar o seu <strong>acesso antecipado</strong> e garantir as suas peças com exclusividade antes de todo mundo.</p>
      <form>
        <input type="password" />
        <button type="submit">Entrar</button>
      <form>  
      <span>*O site libera para o público 00:00h</span>
    </div>
  `;
  body.appendChild(div);

  const form = document.querySelector(".blackfriday_modal form");
  const input = document.querySelector(".blackfriday_modal input");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value === "girafriday") {
      const element = document.querySelector(".blackfriday_overlay");
      element.remove();
    }
  });
});
