import Handlebars from "handlebars";
import './sass/main.scss'

const start = async() => {

    try {
        const respuesta = await fetch('templates/card.hbs')

        if (!respuesta.ok) {
            throw new Error ('No se pudo obtener la plantillla')
        }
        const plantilla = await respuesta.text()

        //console.log(plantilla)


        const template = Handlebars.compile(plantilla)


        const respuestaBack = await fetch('https://66b64d9fb5ae2d11eb668223.mockapi.io/productos')
        if (!respuestaBack.ok){
            throw new Error("Algo paso con los productos", respuestaBack.status)
        }
        const dataProductos = await respuestaBack.json()
        //console.log(dataProductos)


        const data = {productos : dataProductos}
        //console.log(data)
        const html = template(data)
        //console.log(html)

        const contenedorCard = document.querySelector('#contenedor-cards')
        contenedorCard.innerHTML = html

    } catch (error) {
        console.log('Hubo un error en la peticion:', error)
    }
}





window.addEventListener('DOMContentLoaded', start)
