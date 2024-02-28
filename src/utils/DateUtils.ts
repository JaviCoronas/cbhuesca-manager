export const dateToLocalString = (date: String) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const partes = date.split("-");

  if (partes.length !== 3) {
    // La cadena no tiene el formato esperado
    return null;
  }

  const dia = parseInt(partes[2], 10);
  const mesIndex = parseInt(partes[1], 10) - 1;

  if (
    isNaN(dia) ||
    isNaN(mesIndex) ||
    mesIndex < 0 ||
    mesIndex >= meses.length ||
    dia < 1 ||
    dia > 31
  ) {
    // La cadena contiene valores inválidos
    return null;
  }

  const mes = meses[mesIndex];

  return `${dia} de ${mes}`;
};
