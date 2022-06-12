//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
articulosCarrito = [];

//función main
cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso); 
    vaciarCarrito.addEventListener('click', () => {
            articulosCarrito=[];
            limpiarHTML();
    });

    document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('producto'))||[];
        carritoHTML();
    });
}

//Funciones
function agregarCurso(e){
    e.preventDefault()
    if(e.target.classList.contains('agregar-carrito')){
        const cursosSeleccionado = e.target.parentElement.parentElement;
        leeDatosCurso(cursosSeleccionado);
    }
}
//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}




//Lee el contenido del html
function leeDatosCurso(curso){
    
    //crea un objeto con el contenido
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('p span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //Revisa si hay id duplicado
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe){
        //Se aumenta la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
            articulosCarrito=[...curso];
        });
    }else{
        //se agrega al carrito
        //Agrega los articulos al array
    articulosCarrito = [...articulosCarrito, infoCurso];
    }

    
    carritoHTML();
}
//Muestra el carrito en el HTML
function carritoHTML(){
    //Limpiar html
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const {imagen, titulo,precio,cantidad,id} = curso;
        //Crea el elemento
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width=100>
        </td>
        <td>
        ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}" > X </a>
        </td>
        
        `;
        //Incerta el elemento
        contenedorCarrito.appendChild(row);
    });

    actualizarStorage();

}
//Mantiene los datos en el storage
function actualizarStorage(){
    localStorage.setItem('producto',JSON.stringify(articulosCarrito));
}

function limpiarHTML(){
    //Forma lenta
    // contenedorCarrito.innerHTML ='';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}
