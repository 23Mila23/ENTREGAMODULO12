import "./style.css";

//CASO 1
interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
}

const reservas : Reserva[] = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

class preciosReservas {
  tipoHabitacion: string;
  personas: number;
  noches: number;
  precioHabitacion: number = 0;

  constructor(tipoHabitacion: string, personas: number, noches: number) {
    this.tipoHabitacion = tipoHabitacion;
    this.personas = personas;
    this.noches = noches;
  }

  calculaSubtotal = () => {
    if (this.tipoHabitacion === "standard") {
      this.precioHabitacion = 100;
    } else {
      this.precioHabitacion = 150;
    }

    let precio = this.precioHabitacion * this.noches;

    if (this.personas > 1) {
      const extraPorPersona = (this.personas - 1) * 40;
      precio += this.noches * extraPorPersona;
    }
    return precio;
  };

   calculaTotal = () => {
    const subTotal = this.calculaSubtotal();
    const total = subTotal + (subTotal * 21) / 100;
    return total;
  }
}

const calcularPrecios = (reserva: Reserva) => {
  const precio = new preciosReservas(
    reserva.tipoHabitacion,
    reserva.pax,
    reserva.noches
  );
  console.log(
    `Subtotal: ${precio.calculaSubtotal()}, Total : ${precio.calculaTotal()}`
  );
};

reservas.forEach((reserva) => {
calcularPrecios(reserva)
})

//CASO 2
class precioTourOperador extends preciosReservas {
  constructor(tipoHabitacion : string ,personas : number, noches : number){
    super(tipoHabitacion, personas,noches);
    this.precioHabitacion = 100;
  }
  
calculaSubtotal = () => {
  let precio = this.precioHabitacion * this.noches;

  if (this.personas > 1) {
    const extraPorPersona = (this.personas - 1) * 40;
    precio += this.noches * extraPorPersona;
  }
  return precio;
};
calculaTotal = () => {
  const subTotal = this.calculaSubtotal();
  const totalSinDescuento = subTotal + (subTotal * 21) / 100;
  const total = totalSinDescuento - ((totalSinDescuento * 15) /100)
  return total;
}

}