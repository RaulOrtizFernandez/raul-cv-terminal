import { Terminal } from "./terminal.js";
import { CV } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  // Rellenar datos estáticos (SEO / no-JS friendly ya vienen en el HTML,
  // esto solo sincroniza el nombre en el título del navegador si hiciera falta).
  document.title = `${CV.name} — Interactive CV`;

  const root = document.querySelector("[data-terminal]");
  new Terminal(root);

  // Foco inicial en el input, sin robar el scroll de la página
  const input = root.querySelector("[data-input]");
  input.focus({ preventScroll: true });
});
