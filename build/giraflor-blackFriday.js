"use strict";window.addEventListener("DOMContentLoaded",function(){var t,e,a;"true"!==localStorage.getItem("gbf")&&((t=document.querySelector("body")).classList.add("gbf"),(e=document.createElement("div")).setAttribute("class","blackfriday_overlay"),e.innerHTML='\n    <div class="blackfriday_modal">\n      <h3>Gira Friday</h3>\n      <div class="blackfriday_modal-discount">\n        <p>Até</p>\n        <p class="blackfriday_modal-discount-value">70%</p>\n        <p>Desconto</p>\n      </div>\n      <p class="blackfriday_modal-text">Vem aproveitar o seu <strong>acesso antecipado</strong> e garantir as suas peças com exclusividade antes de todo mundo.</p>\n      <form>\n        <input type="password" placeholder="Senha" />\n        <button type="submit">Entrar</button>\n      <form>  \n      <span>*O site libera para o público 00:00h</span>\n    </div>\n  ',t.appendChild(e),e=document.querySelector(".blackfriday_modal form"),a=document.querySelector(".blackfriday_modal input"),e.addEventListener("submit",function(e){e.preventDefault(),"girafriday"===a.value?(localStorage.setItem("gbf",!0),t.classList.remove("gbf"),document.querySelector(".blackfriday_overlay").remove()):(a.value="SENHA INCORRETA",a.setAttribute("type","text"),a.classList.add("error"),setTimeout(function(){a.classList.remove("error"),a.value="",a.setAttribute("type","password")},3e3))}))});