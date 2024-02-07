var elements = document.querySelectorAll(".menu-boton");

elements.forEach(function(element) {
  element.addEventListener("click", function() {
    var nav = element.closest(".navbar");
    if (nav) {
      nav.classList.toggle("open");
    }
  });
});