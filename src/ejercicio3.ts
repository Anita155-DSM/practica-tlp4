class LoggerConsola {
  registrar(dato: string): void {
    console.log(`[Consola] ${dato}`);
  }
}

class CalculadoraImpuestos {
  calcular(categoria: string, monto: number): void {
    let total = monto;
    if (categoria === "basico") {
      total = monto * 1.10;
    } else if (categoria === "premium") {
      total = monto * 1.21;
    }
    const logger = new LoggerConsola();
    logger.registrar(`${categoria}: $${total}`);
  }
}
