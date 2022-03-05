const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateProd = document.getElementById('templateprod').content;
const templateCarrito = document.querySelector('.templatecarrito').content;
const templateFooter = document.querySelector('.templateFooter').content;
const fragment = document.createDocumentFragment();
let carrito = {}

document.addEventListener('DOMContentLoaded', () =>{
    fetchData();
});

items.addEventListener('click', e =>{
    addCarrito(e)
})



//json
const fetchData = async() =>{
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        pintarProd(data);
    } catch (error) {
        console.log(error);
    }
}


//creacion de objetos
const pintarProd = data =>{
    data.forEach(producto => {
        templateProd.querySelector('.tituloproduct').textContent = producto.tituloproduct
        templateProd.querySelector('.imgproduct').setAttribute("src", producto.imgproduct)
        templateProd.querySelector('.precio').textContent = producto.precio
        templateProd.querySelector('.btnbuy').dataset.id = producto.id;

        const clone = templateProd.cloneNode(true)
        fragment.appendChild(clone)
    });
    items.appendChild(fragment)
}

const addCarrito = e =>{
    if(e.target.classList.contains('btnbuy')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto =>{
    const producto ={
        id: objeto.querySelector('.btnbuy').dataset.id,
        tituloproduct: objeto.querySelector('.tituloproduct').textContent,
        precio: objeto.querySelector('.precio').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad+ 1;
    }

    carrito[producto.id] = {...producto}
    console.log(carrito);
}

const pintarCarrito = () =>{

}

//modo oscuro
const darkmode = document.querySelector(".dark-mode")

darkmode.addEventListener("click", ()=>{
    document.body.classList.toggle("dark")
})