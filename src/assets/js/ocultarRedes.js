var miDiv = document.getElementById("divOcultarRedes");

var miDiv2 = document.getElementById("divOcultarTitulo");

var miDiv3 = document.getElementById("nombreSistema");


window.handleScroll = function() {
    var scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        miDiv.classList.add("hidden");
         miDiv2.classList.add("hidden");
        miDiv3.classList.add("hidden");
    } else {
        miDiv.classList.remove("hidden");
        miDiv2.classList.remove("hidden");
        miDiv3.classList.remove("hidden");
    }
}
window.addEventListener("scroll", handleScroll);