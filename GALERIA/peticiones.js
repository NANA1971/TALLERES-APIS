//variables globales
let contenedor = document.querySelector("#contenedor");
let botton = document.querySelector("button");

botton.addEventListener("click", () => {
    peticionApi();
});

//funcion para realizar peticiones a Apis
function peticionApi() {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=10")
    .then(res => res.json())
    .then(datos => {
        contenedor.innerHTML = "";

        datos.forEach(img => {
            contenedor.innerHTML += `
                <div class="imagen-card">
                    <img src="${img.thumbnailUrl}" width="200">
                    <h3>${img.title}</h3>
                </div>
            `;
        });
    })
    .catch(error => console.log("Error:", error));
}