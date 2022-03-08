//variables
const cards = document.getElementById('cards');
const item = document.getElementById('item');
const footer = document.getElementById('footer');
const templateProd = document.getElementById('templateprod').content;
const templateCarrito = document.getElementById('template-carrito').content;
const templateFooter = document.getElementById('template-footer').content;
const contador = document.getElementById('contador-total');
const btnbuys = document.querySelector('.btnbuy');
const nav = document.querySelector(".nav");
const fragment = document.createDocumentFragment();
let carrito = {}
let contar = 0

document.addEventListener('DOMContentLoaded', () =>{
    fetchData();
});

cards.addEventListener('click', e =>{
    addCarrito(e)
})


//cartel de alerta
const alerts = () =>{
    swal({
        title: "Bienvenido a CompuTechX",
        text: "Aqui Encontraras Los Mejores Precios Y Productos",
        button: "Continuar",
    });
}

alerts();


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
        templateProd.querySelector('.peso').textContent =  producto.peso
        templateProd.querySelector('.precio').textContent =  producto.precio
        templateProd.querySelector('.envio').innerHTML = `<i class="fa-solid camion fa-truck-fast"></i> ` + producto.envio
        templateProd.querySelector('.btnbuy').dataset.id = producto.id;

        const clone = templateProd.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}

//añadir al carrito
const addCarrito = e =>{
    if(e.target.classList.contains('btnbuy')){
        setCarrito(e.target.parentElement)
        contar++
        contador.innerHTML = contar
        swal({
            title: `Gracias Por Comprar!`,
            text: `Tu Producto Se Agrego Al Carrito`
        });
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
    objetosCarrito();
}

//creacion de objetos adentro del carrito
const objetosCarrito = () =>{
    item.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelectorAll('td')[0].textContent = producto.tituloproduct
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        templateCarrito.querySelector('.btnsuma').dataset.id = producto.id
        templateCarrito.querySelector('.btnresta').dataset.id = producto.id

        const cloner = templateCarrito.cloneNode(true)
        fragment.appendChild(cloner)
    })
    item.appendChild(fragment)

}


//modo oscuro
const darkmode = document.querySelector(".dark-mode")

darkmode.addEventListener('click', ()=>{
    document.body.classList.toggle("dark")
    document.body.classList.contains('dark') ? localStorage.setItem('darkMode', 'true') : localStorage.setItem('darkMode', 'false')
})

//modo blanco
localStorage.getItem("darkMode") === "true" ? document.body.classList.add("dark") : document.body.classList.remove("dark")
