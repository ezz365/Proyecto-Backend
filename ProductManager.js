//Se crea la clase ProductManager
class ProductManager {
    //se hace una variable privada con 0.15 de valor
    #precioBaseDeGanancia=0.15;
    //se crea un constructor
    constructor(){
         this.productos = []
         this.path = "productos.json"
    }

    async obtenerProductos(){
        try{
          if(fs.existsSync(this.path)){
            const infoDeProductos = await fs.promises.readFile(this.path, 'utf-8')
            const informacionProductos = JSON.parse(infoDeProductos)
            return console.log(informacionProductos)
          } else {
            return []
          }
        } catch(error){
          console.log(error)
        }
      }
    
    
      async addProduct(title, description, price, thumbnail, code, stock) {
        try {
        if(!title || !description || !price || !thumbnail || !code || !stock) {
          return console.log('Producto incompleto');
        } else {
            const esCodigo = this.#evaluarCode(code)
            if(esCodigo){
              console.log('El codigo ya existe, vuelve a intentarlo')
            } else {
              const producto = {
                id: this.#generarId(), 
                title,
                description,
                price: price + this.#precioBaseDeGanancia,
                thumbnail,
                code,
                stock,
              }
                //Se pushean los productos
              this.productos.push(producto)
              await fs.promises.writeFile(this.path, JSON.stringify(this.productos, null, 2))
            } 
        }
        } catch(error) {
          console.log(error)
        } 
      }
    
      async getProductById(code){
        try {
          if (fs.existsSync(this.path)){
            await fs.promises.readFile(this.path, 'utf-8')
            const productoEncontrado = this.#evaluarProductoId(code)
            if(productoEncontrado){
              console.log(productoEncontrado)
              return productoEncontrado
            } else {
              console.log('Producto no encontrado')
            }
          }
        } catch(error) {
          console.log(error)
        }
      }

    
      async actualizarProducto(codigoProducto, cambio){
        let read = await fs.promises.readFile(this.path, 'utf-8')
        read = JSON.parse(read)
        let producto = await this.getProductById(codigoProducto)
        if(producto){
            producto = {...producto, ...cambio}
          read = read.map(prod => {
            if(prod.id == producto.id){
              prod = producto
            }
            return prod
          })
          read = JSON.stringify(read, null, 2)
          await fs.promises.writeFile(this.path, read)
          console.log(JSON.parse(read))
          return read
        }else{
          return null
        }
      }
    
      async eliminarProducto(idProducto){
        let read = await fs.promises.readFile(this.path, 'utf-8')
        read = JSON.parse(read)
        let producto = await this.getProductById(idProducto)
        if(producto){
          const filtrado =read.filter(prod => prod.id != idProducto)
          await fs.promises.writeFile(this.path, JSON.stringify(filtrado, null, 2))
          return filtrado
        }
      }

    agregarProducto(codigoProducto, codigoUsuario){
        const producto = this.#getProductbyId(codigoProducto)
        if(producto){
            if(!producto.includes(codigoProducto)){
                producto.push(codigoProducto)
            }
        }else{
            console.log("No encontrado")
        }
    }
   
}


