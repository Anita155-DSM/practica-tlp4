//un deposito registra paquetes y calcula el costo de envio segun el peso

abstract class Paquete {
    readonly codigo: string;
    constructor(codigo: string){
        this.codigo = codigo
    }

    abstract calcularCosto(peso: number): number;
}

const kilogramoNacional = 300
const kilogramoInternacional = 800

class PaqueteNacional extends Paquete {
    calcularCosto(peso: number): number {
        return peso * kilogramoNacional;
    }
}

class PaqueteInternacional extends Paquete{
    calcularCosto(peso: number): number {
        return peso * kilogramoInternacional
    }
}

class Deposito {
    private paquete: Paquete [] = [] //propiedad que comienza vacio, sin constructor, se calcula adentro
    private static total: number = 0 //empieza en 0

    // constructor(paquete: Paquete[]){  //no necesita constructor porque no necesita 
    //     this.paquete = paquete        //recibir nada ya que empieza vacío y lo vamos agregando 
    // }  

    registrar(paquete: Paquete): void{
        this.paquete.push(paquete)
        // console.log(paquete) //NO LLEVA CONSOLE.LOG PORQUE EL CONSOLE.LOG DEVUELVE EL OBJETO.
        Deposito.total++ //va sumando, se puede unicamente porque es estático
    }
    
    public get cantidad(): number {
        return this.paquete.length
    }

    //cuenta el total historico
    public get totalHistorico(): number{
        return Deposito.total //retorna el total historico
    }
    
    mostrarCostos(peso: number): void {
        this.paquete.forEach( p => {
        console.log(`${p.codigo} cuesta: $${p.calcularCosto(peso)}`)
        })
    }
}


// const paqueteNac = new PaqueteNacional("PKG001").calcularCosto(3) //error crack, objeto guarda lo ultimo -> 3
const paqueteNac = new PaqueteNacional("PKG001") //primero creamos el objeto, ya que lo vamos a utilizar proximamente
// console.log(paqueteNac)
const paqueteInt = new PaqueteInternacional("PKG002")
// console.log(paqueteInt)


//creamos o instanciamos nuestro deposito
const d = new Deposito()

//en nuestro deposito, utilizamos el metodo registrar y registramos nuestros dos tipos de objetos (nac e int)
d.registrar(paqueteNac)
d.registrar(paqueteInt)

//en nuestro deposito, utilizamos el metodo mostrarCostos y le pasamos el peso, en este caso:
d.mostrarCostos(3) //3kg, no hacemos console.log porque es un void que ya tiene un console.log

//EL TEXTO DE SALIDA SIEMPRE LO ARMAMOS NOSOTROS
console.log(`Paquetes en deposito: ${d.cantidad}`) //solo visualiza la cantidad no es una funcion
console.log(`Total historico: ${d.totalHistorico}`) //solo muestra el total historico


// salida esperada:

// PKG001 cuesta $900
// PKG002 cuesta $2400
// Paquetes en deposito: 2
// Total historico: 2