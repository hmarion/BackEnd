import fs from 'fs';

class Contenedor {
    
    async save(producto) {
        let id = this.maxId();
        id += 1;
        let obj = { ...producto, id: id}
        try{
            let fileProductos = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(fileProductos);
            if(productos.some(prod => prod.title === obj.title)){
                return {status:"error",message: "El producto ya existe"};
            }else{
                productos.push(obj);
                try{
                    await fs.promises.writeFile('./files/productos.txt', JSON.stringify(productos, null, 2));
                    return {status:"success",message: `Producto registrado. ID: ${obj.id}`}
                }catch{
                    return {status:"error",message:"No se pudo agregar el producto"}
                }
            }
        }catch{
            try{
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify([obj], null, 2));
                return {status: "success",message: `Producto registrado. ID: ${obj.id}`}
            }catch{
                return {status: "error",message: "No se pudo agregar el producto"}
            }
        }
    }    

    async getById(number) {
        try{
            let archivo = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(archivo);
            let index = productos.findIndex(prod => prod.id === number);
            if(index === -1){
                return {status: "success", message: "El id no existe"}    
            }else{
                return {status: "success", message: productos[index]}
            }
        }catch{
            return {status: "error", message: "Archivo no encontrado"}
        }
    }
    
    async getAll() {
        try{
            let archivo = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(archivo);
            return {status: "success", message: productos};
        }catch{
            //El archivo no existe
            return {status: "error", message: "El archivo no existe"}
        }
    }
    
    async deleteById(number) {
        try{
            let archivo = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(archivo);
            let index = productos.findIndex(prod => prod.id === number);
            if(index === -1){
                return {status: "success", message: "El id no existe"}    
            }else{
                let productosNuevo = productos.filter((prod) => prod.id != number);
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify(productosNuevo, null, 2));
                return {status:"success", message:"Se elimino el producto"}
            }
        }catch{
            return {status: "error", message: "No se pudo eliminar el producto"}
        }
    }

    async deleteAll() {
        try{
            await fs.promises.readFile('./files/productos.txt', 'utf-8');
            try {
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify([], null, 2));
                return {status: "success", message: "Se eliminaron todos los Productos"}
            }catch{
                return {status: "error", message: "No se pudo vaciar el archivo"}
            }
        }catch{
            //El archivo no existe
            return {status: "error", message: "El archivo no existe"}
        }
    }

    async updateById(number, producto) {
        try{
            let archivo = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(archivo);
            let index = productos.findIndex(prod => prod.id === number);
            if(index === -1){
                return {status: "success", message: "El id no existe"}    
            }else{
                let obj = { ...producto, id: number}
                let productosNuevo = productos.map((prod) => {
                    if(prod.id === number){
                        return obj;
                    }else{
                        return prod;
                    }
                });
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify(productosNuevo, null, 2));
                return {status:"success", message:"Se actualizo el producto"}
            }
        }catch{
            return {status: "error", message: "El archivo no existe"}
        }
    }

    maxId() {
        let id = 0
        try{
            let fileProductos = fs.readFileSync('./files/productos.txt');
            let productos = JSON.parse(fileProductos);
            
            let res = productos.reduce((prev, currentValue, i) =>{
                if(i==0){
                    return {
                        id: currentValue.id  
                    }
                }else{
                    let MaxId = prev.id > currentValue.id ? prev.id : currentValue.id;
                    return {
                        id: MaxId
                    }
                }          
            });
            id = res.id
        }catch{
            return id;
        }
        return id;
    }
    
}

export default Contenedor;
