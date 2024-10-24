import { Reserva, reservas } from "./main";

class baseReserva {
  tipoHabitacion: string;
  personas: number;
  noches: number;
  listaPrecios: { [key: string]: number };

  constructor(
    tipoHabitacion: string,
    personas: number,
    noches: number,
    listaPrecios: { [key: string]: number }
  ) {
    this.tipoHabitacion = tipoHabitacion;
    this.personas = personas;
    this.noches = noches;
    this.listaPrecios = listaPrecios;
  }

  calculaSubtotal = () => {
    let precio = this.listaPrecios[this.tipoHabitacion] * this.noches;

    if (this.personas > 1) {
      const extraPorPersona = (this.personas - 1) * 40;
      precio += this.noches * extraPorPersona;
    }
    return precio;
  };
}

class clienteParticular extends baseReserva {
  constructor(tipoHabitacion: string, personas: number, noches: number) {
    const listaPrecios: { [key: string]: number } = {
      standard: 100,
      suite: 150,
    };

    super(tipoHabitacion, personas, noches, listaPrecios);
  }

  calculaTotal = () => {
    const subTotal = this.calculaSubtotal();
    const total = subTotal + (subTotal * 21) / 100;
    return total;
  };
}

class tourOperador extends baseReserva {
  constructor(tipoHabitacion: string, personas: number, noches: number) {
    const listaPrecios = {
      standard: 100,
      suite: 100,
    };
    super(tipoHabitacion, personas, noches, listaPrecios);
  }

  calculaTotal = () => {
    const subTotal = this.calculaSubtotal();
    const totalSinDescuento = subTotal + (subTotal * 21) / 100;
    const total = totalSinDescuento - (totalSinDescuento * 15) / 100;
    return total;
  };
}

const calcularPreciosClienteParticular = (reserva: Reserva) => {
  const precio = new clienteParticular(
    reserva.tipoHabitacion,
    reserva.pax,
    reserva.noches
  );
  console.log(
    `Subtotal: ${precio.calculaSubtotal()}, Total : ${precio.calculaTotal()}`
  );
};
reservas.forEach((reserva) => {
  calcularPreciosClienteParticular(reserva);
});

const calcularPreciosTourOperador = (reserva: Reserva) => {
  const precio = new tourOperador(
    reserva.tipoHabitacion,
    reserva.pax,
    reserva.noches
  );
  console.log(
    `Subtotal: ${precio.calculaSubtotal()}, Total : ${precio.calculaTotal()}`
  );
};

reservas.forEach((reserva) => {
  calcularPreciosTourOperador(reserva);
});
