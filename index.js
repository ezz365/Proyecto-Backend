//Se crea la clase ProductManager
class ProductManager {
    //se hace una variable privada con 0.15 de valor
    #precioBaseDeGanancia=0.15;
    //se crea un constructor
    constructor(){
         this.products = []
    }

    getProducts(){
        return this.products
    }

    addProduct(title, description, price, thumbnail, stock){
        if(!title || !description || !price || !thumbnail || !stock){
            return "error";
        }
        const product = {
            code:this.#generarCode(),
            title,
            description,
            price: price + this.#precioBaseDeGanancia,
            thumbnail,
            stock, 
        }
    //Se pushean los productos
    this.products.push(product)
    }

    agregarProducto(codeProduct, codeUsuario){
        const product = this.#getProductbyId(codeProduct)
        if(product){
            if(!product.includes(codeProduct)){
                product.push(codeProduct)
            }
        }else{
            console.log("Not found")
        }
    }

    //se genera un id, si products esta vacio se crea uno sino va con length hasta el ultimo (por eso se pone -1) y se le suma un id nuevo
    #generarCode(){
        let code =
        this.products.length === 0 
        ? 1
        : this.products[this.products.length - 1].code + 1
    return code    
    }

    #getProductbyId(code){
    return  this.products.find(product=>product.code===code)
    }
}
//si usa # significa que es una variable privada, que solo puede ser usada por la clase asignada

const products = new ProductManager()
products.addProduct("Producto1","Este es el producto 1",2.5,Image="img/producto1.jpg",15)
products.addProduct("Producto1","Este es el producto 2",0.8,Image="img/producto2.png",15)
console.log(products.getProducts())
