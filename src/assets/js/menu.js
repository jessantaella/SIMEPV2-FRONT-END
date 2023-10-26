var elements = document.querySelectorAll(".menu-boton");

elements.forEach(function(element) {
  element.addEventListener("click", function() {
    var nav = element.closest(".navbar");
    if (nav) {
      console.log("Entro aqui");
      nav.classList.toggle("open");
    }
  });
});