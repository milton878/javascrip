const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

Clickbutton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    
    //Pasos para asegurar que tome los elemento del index
    //console.log(itemTitle)
    //console.log(itemPrice)
    //console.log(itemImg)

    
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad:1
    }

    addItemCarrito(newItem)
}

function addItemCarrito(newItem){
    

    const InputElemento = tbody.getElementsByClassName('input__elemento')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
           carrito[i].cantidad ++;
           const inputValue = InputElemento[i]
           inputValue.value++;
           CarritoTotal()
           return null;
        }
    }

    carrito.push(newItem)

    renderCarrito()

}

function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
       const tr = document.createElement ('tr')
       tr.classList.add('itemCarrito')
       const Content = `
       
       <th scope="row">1</th>
       <td class="table__produtos">
           <img src=${item.img} alt="">
           <h6 class="title">${item.title}</h6>
       </td>
       <td class="table__price"><p>${item.precio}</p></td>
       <td class="table__cantidad">
           <input type="number" min="1" value=${item.cantidad} class="input__elemento">
           <button class="delete btn btn-danger">x</button>
       </td>
     

       `
       tr.innerHTML = Content;
       tbody.append(tr)

       tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
       tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
    })
    CarritoTotal()
}
function CarritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) =>{
        const precio = Number(item.precio.replace("$", ''))
        Total = Total + precio*item.cantidad
    })
    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}

function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i = 0; i < carrito.length; i++){

        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1)
           
        }
    }
    const alert = document.querySelector('.remove')
    
    setTimeout(function(){
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')

    tr.remove()
    CarritoTotal()

}

function sumaCantidad(e){
    const sumaInput  = e.target
    const tr = sumaInput.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
      if(item.title.trim() === title){
        sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
        item.cantidad = sumaInput.value;
        CarritoTotal()
      }
    })
  }
  function addLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }
  
  window.onload = function(){
      const storage = JSON.parse(localStorage.getItem('carrito'));
      if(storage){
          carrito = storage;
          renderCarrito()
      }
  }

  //jquery 

//   $ (document).ready(function(){
//       $('button').on('click', function(){
//         $('.caja').animate({
//             width: '200px',
//             opacity:'0.5'
//         }, 2000, function(){
//             alert('producto añadido');
//         });
//       });
//   });

  //=== fetch:

  const boton = document.querySelector("#btn");
  const container2 = document.querySelector(".container2");

  //funcion- con fetch
//   const obtenerDatos = ()=>{
//     //fetch(url,conf opcional)
//     fetch("prueba.txt")
//         .then(response => response.text())
//         .then(result => container2.innerHTML += `<p>${result}</p>` )
//         .catch(error => console.log(error))
//   }
//--- json:
// const obtenerDatos = ()=>{
//      fetch("datos.json")
//         .then(response => response.json())
//         .then(result =>{
//             let datos = result;
//             datos.forEach(user =>{
//                 container2.innerHTML += `
//                 <h3>${user.nombre}</h3>
//                 <p>${user.edad}</p>
//                 <p>${user.profesion}<p>

//                 `
//             })
//         })
//         .catch(error => console.log(error))

// }

 // desde una api externa
const obtenerDatos = ()=>{
    fetch("https://randomuser.me/api")
       .then(response => response.json())
       .then(result => {
           console.log(result)
           let datos = result.results;
           datos.forEach(user =>{
               container2.innerHTML += `
               <img src="${user.picture.medium}">
               <h3>${user.name.first}</h3>
               <p>${user.cell}</p>
               <p>${user.email}<p>

               `
           })
       })
       .catch(error => console.log(error))

    }

  boton.onclick = () =>{
      obtenerDatos();
  }

 
 