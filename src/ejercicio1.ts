z//un deposito registra paquetes y calcula el costo de envio segun el peso

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
    private paquete: Paquete [] = [] //propiedad que comienza vacio
    // constructor(paquete: Paquete[]){  //no necesita constructor porque no necesita 
    //     this.paquete = paquete        //recibir nada ya que empieza vacío y lo vamos agregando 
    // }  

    registrar(paquete: Paquete): void{
        this.paquete.push(paquete)
        // console.log(paquete) //NO LLEVA CONSOLE.LOG PORQUE EL CONSOLE.LOG DEVUELVE EL OBJETO.
    }
    
    public get cantidad(): number {
        return this.paquete.length
    }
    
    mostrarCostos(peso: number): void {
        this.paquete.forEach( p => {
        console.log(`${p.codigo} cuesta: ${p.calcularCosto(peso)}`)
        })
    }
}


const paqueteNac = new PaqueteNacional("PKG001").calcularCosto(3)
console.log(paqueteNac)

const paqueteInt = new PaqueteInternacional("PKG002").calcularCosto(3)
console.log(paqueteInt)


// salida esperada:

// PKG001 cuesta $900
// PKG002 cuesta $2400
// Paquetes en deposito: 2
// Total historico: 2