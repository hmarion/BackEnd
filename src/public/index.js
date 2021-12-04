const socket = io();
//----------Eventos de Socket-----------
socket.on('tableProduct',data=>{
    let prod = data.message;
    fetch('templates/prodTable.handlebars').then(String=>String.text()).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const productTemplate = {
            productos:prod
        }
        const html = processedTemplate(productTemplate);
        let div = document.getElementById('prodTable');
        div.innerHTML=html;
    })
})



let input = document.getElementById('info');
let user = document.getElementById('user');
input.addEventListener('keyup', (e)=>{
    if(e.key==="Enter"){
        let date = new Date();
        let fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        socket.emit('message',{user: user.value, fecha: fecha,mensaje: e.target.value});
    }
})

socket.on('log', data=>{
    let p = document.getElementById('log');
    let log = data.reverse();
    fetch('templates/chat.handlebars').then(String=>String.text()).then(template=>{
        processedTemplate = Handlebars.compile(template);
        const mensajeTemplate = {
            mensajes:log
        }
        const html = processedTemplate(mensajeTemplate);
        let div = document.getElementById('chat');
        div.innerHTML=html;
    })
})




//----------Fin de Socket---------------



document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.getElementById('addProduct');
    let data = new FormData(form);
    fetch('/api/productos',{
        method:'POST',
        body:data
    }).then(result=>{
        return result.json();
    }).then(json=>{
        Swal.fire({
            title:'Exito',
            text:json.message,
            icon:'success',
            timer:2000,
        }).then(result=>{
            location.href='/'
        })
    })
})