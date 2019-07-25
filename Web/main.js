//ServiceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(function (res) {  console.log("Cargado correctamente: ", res) })
        .catch(function (err) { console.log("Error al cargar: ", err) })
}

//Scroll Suavizado
$(document).ready(function () {
    $("#menu a").click(function (e) {
        e.preventDefault();

        $("html,body").animate({
            scrollTop:$($(this).attr("href")).offset().top
        })

        return false;
    })
});