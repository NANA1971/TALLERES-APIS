const gallery = document.getElementById("gallery");
const errorText = document.getElementById("error");
const loadBtn = document.getElementById("loadBtn");

// Función async con fetch
async function obtenerFotos() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/photos");

        if (!respuesta.ok) {
            throw new Error("Error al obtener las fotos");
        }

        const datos = await respuesta.json();
        return datos.slice(0, 10);

    } catch (error) {
        errorText.textContent = error.message;
        throw error;
    }
}

// Función que retorna una Promesa
function mostrarGaleria(fotos) {
    return new Promise((resolve) => {

        gallery.innerHTML = ""; // Limpia galería previa

        fotos.forEach(foto => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${foto.url}" alt="${foto.title}">
                <div class="info">
                    <p><strong>ID:</strong> ${foto.id}</p>
                    <p><strong>Título:</strong> ${foto.title}</p>
                    <p><strong>Álbum ID:</strong> ${foto.albumId}</p>
                </div>
            `;

            gallery.appendChild(card);
        });

        resolve("Galería cargada correctamente");
    });
}

// Evento del botón
loadBtn.addEventListener("click", () => {
    obtenerFotos()
        .then(fotos => mostrarGaleria(fotos))
        .then(mensaje => console.log(mensaje))
        .catch(error => console.error(error));
});