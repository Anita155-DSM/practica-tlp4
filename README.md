# Practica TLP4

Ejercicios de programacion orientada a objetos y patrones de diseno
implementados en TypeScript.

## Indice

- [Ejercicio A: Deposito de paquetes](#ejercicio-a-deposito-de-paquetes)
- [Ejercicio B: Entradas de cine](#ejercicio-b-entradas-de-cine)
- [Ejercicio C: Refactor de impuestos](#ejercicio-c-refactor-de-impuestos)

---

## Ejercicio A: Deposito de paquetes

Un deposito registra paquetes y calcula el costo de envio segun el peso.

### Requisitos

#### `Paquete`

- Clase abstracta.
- Propiedad `codigo: string` de solo lectura (`readonly`), recibida por
  constructor.
- Metodo abstracto `calcularCosto(peso: number): number`.

#### Tipos de paquete

| Clase | Costo por kilogramo |
| --- | ---: |
| `PaqueteNacional` | `$300` |
| `PaqueteInternacional` | `$800` |

#### `Deposito`

- Mantiene un arreglo privado de `Paquete`.
- Expone `registrar(paquete: Paquete): void`.
- Incluye un atributo estatico que cuenta el total historico de paquetes
  registrados.
- Expone el getter `cantidad`.
- Implementa `mostrarCostos(peso: number): void`, recorriendo el arreglo sin
  comprobar el tipo concreto del paquete mediante `if`.

### Salida esperada

Con un paquete nacional y uno internacional de `3 kg`:

```text
PKG001 cuesta $900
PKG002 cuesta $2400
Paquetes en deposito: 2
Total historico: 2
```

---

## Ejercicio B: Entradas de cine

Sistema de venta de entradas utilizando Singleton, interfaz y Factory.

### Requisitos

#### `ConfiguracionCine`

- Implementa el patron **Singleton**.
- Tiene constructor privado.
- Expone el metodo estatico `obtenerInstancia()`.
- Incluye el atributo de solo lectura `recargoVIP = 2000`.

#### `Entrada`

Define la interfaz:

```typescript
interface Entrada {
  calcularPrecio(base: number): number;
}
```

| Clase | Precio |
| --- | --- |
| `EntradaGeneral` | Precio base |
| `EntradaVIP` | Precio base + recargo del Singleton |

#### `FabricaEntradas`

- Implementa el patron **Factory**.
- Expone el metodo estatico:

  ```typescript
  crear(tipo: "general" | "vip"): Entrada
  ```

- Fuera de la fabrica, no se debe instanciar directamente ninguna de las
  clases concretas.

### Salida esperada

Con un precio base de `$3000` para ambas entradas:

```text
Mismo Singleton: true
General: $3000
VIP: $5000
```

---

## Ejercicio C: Refactor de impuestos

El siguiente sistema funciona, pero presenta dos problemas:

1. Contiene un `if` que crece cada vez que se agrega una nueva categoria.
2. `CalculadoraImpuestos` crea una dependencia concreta dentro de su metodo.

### Codigo original

```typescript
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
```

### Refactor solicitado

#### Principio OCP

Crear la interfaz `Categoria`, con:

- `nombre`.
- `calcularTotal(monto: number): number`.

Implementar una clase por cada opcion:

| Categoria | Calculo |
| --- | --- |
| `Basico` | `monto * 1.10` |
| `Premium` | `monto * 1.21` |

`CalculadoraImpuestos.calcular` debe recibir una instancia de `Categoria` y
resolver el calculo sin utilizar un `if` por categoria.

#### Principio DIP

`CalculadoraImpuestos` no debe crear `LoggerConsola` internamente. En su lugar,
debe recibir por constructor una dependencia basada en la interfaz `Logger`.

Implementar dos alternativas:

- `LoggerConsola`.
- `LoggerArchivo`.

De esta forma, la calculadora depende de una abstraccion y no de una
implementacion concreta.
