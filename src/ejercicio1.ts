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
    paquete: Paquete [] = []
    constructor(paquete: Paquete[]){
        this.paquete = paquete
    }

    registrar(paquete: Paquete): void{
        this.paquete.push(paquete)
        console.log(paquete)
    }
    
    public get cantidad(): string {
        return `Paquetes en deposito: ${this.paquete}`
    }
    
    mostrarCostos(peso: number): void {
        this.paquete.forEach( p => {
        console.log("Paquetes en deposito:", this.paquete)
        })
    }
}


const paqueteNac = new PaqueteNacional("PKG001").calcularCosto(3)
console.log(paqueteNac)

const paqueteInt = new PaqueteInternacional("PKG002").calcularCosto(3)
console.log(paqueteInt)

const paquetesDeposito = new Deposito().cantidad()

// salida esperada:

// PKG001 cuesta $900
// PKG002 cuesta $2400
// Paquetes en deposito: 2
// Total historico: 2