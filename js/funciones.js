// Funciones generales compartidas por las seis páginas de TechSolutions.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");

  // Menú desplegable para celulares y tabletas.
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const abierto = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(abierto));
      toggle.textContent = abierto ? "✕" : "☰";
    });
    nav.querySelectorAll("a").forEach(enlace => {
      enlace.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      });
    });
  }

  // Marca automáticamente la página actual en el menú.
  const pagina = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(enlace => {
    if (enlace.getAttribute("href") === pagina) {
      enlace.classList.add("active");
      enlace.setAttribute("aria-current", "page");
    }
  });

  // Año actualizado automáticamente en el pie de página.
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Validación y respuesta demostrativa del formulario.
  const formulario = document.querySelector("#contact-form");
  if (formulario) {
    formulario.addEventListener("submit", event => {
      event.preventDefault();
      const nombre = formulario.elements.nombre.value.trim();
      const correo = formulario.elements.correo.value.trim();
      const telefono = formulario.elements.telefono.value.trim();
      const mensaje = formulario.elements.mensaje.value.trim();
      const salida = document.querySelector("#form-message");

      if (!nombre || !correo || !mensaje) {
        mostrar("Por favor completa nombre, correo y mensaje.", false);
        return;
      }
      const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
      if (!correoValido) {
        mostrar("Escribe una dirección de correo electrónico válida.", false);
        formulario.elements.correo.focus();
        return;
      }
      if (telefono && !/^[+\d\s()-]{7,20}$/.test(telefono)) {
        mostrar("Revisa el número de teléfono. Usa únicamente números y símbolos telefónicos.", false);
        formulario.elements.telefono.focus();
        return;
      }
      mostrar(`¡Gracias, ${nombre}! Tus datos fueron validados correctamente. Esta demostración no envía ni almacena el mensaje.`, true);
      formulario.reset();

      function mostrar(texto, correcto) {
        salida.textContent = texto;
        salida.style.background = correcto ? "#ecfdf5" : "#fff7ed";
        salida.style.color = correcto ? "#047857" : "#c2410c";
        salida.classList.add("show");
      }
    });
  }
});
