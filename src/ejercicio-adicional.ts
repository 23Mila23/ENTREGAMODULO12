interface ReservaConDesayuno {
  tipoHabitacion: "standard" | "suite";
  desayuno: boolean;
  pax: number;
  noches: number;
}

const reservas = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

class baseReserva {
  tipoHabitacion: string;
  personas: number;
  noches: number;
  desayuno: boolean;
  listaPrecios: { [key: string]: number };

  constructor(
    tipoHabitacion: string,
    personas: number,
    noches: number,
    listaPrecios: { [key: string]: number },
    desayuno: boolean
  ) {
    this.tipoHabitacion = tipoHabitacion;
    this.personas = personas;
    this.noches = noches;
    this.listaPrecios = listaPrecios;
    this.desayuno = desayuno;
  }

  calculaSubtotal = () => {
    let precioHabitacion = this.listaPrecios[this.tipoHabitacion] * this.noches;

    if (this.personas > 1) {
      const extraPorPersona = (this.personas - 1) * 40;
      precioHabitacion += this.noches * extraPorPersona;
    }

    let precioDesayuno = 0;

    if (this.desayuno) {
      const extraDesayunoPorPersona = this.personas * 15;
      precioDesayuno = this.noches * extraDesayunoPorPersona;
    }

    let precio = precioHabitacion + precioDesayuno;
    return precio;
  };
}

class clienteParticular extends baseReserva {
  constructor(
    tipoHabitacion: string,
    personas: number,
    noches: number,
    desayuno: boolean
  ) {
    const listaPrecios: { [key: string]: number } = {
      standard: 100,
      suite: 150,
    };

    super(tipoHabitacion, personas, noches, listaPrecios, desayuno);
  }

  calculaTotal = () => {
    const subTotal = this.calculaSubtotal();
    const total = subTotal + (subTotal * 21) / 100;
    return total;
  };
}

class tourOperador extends baseReserva {
  constructor(tipoHabitacion: string, personas: number, noches: number, desayuno : boolean) {
    const listaPrecios = {
      standard: 100,
      suite: 100,
    };
    super(tipoHabitacion, personas, noches, listaPrecios, desayuno);
  }

  calculaTotal = () => {
    const subTotal = this.calculaSubtotal();
    const totalSinDescuento = subTotal + (subTotal * 21) / 100;
    const total = totalSinDescuento - (totalSinDescuento * 15) / 100;
    return total;
  };
}
