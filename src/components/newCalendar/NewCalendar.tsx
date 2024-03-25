import React, { useEffect, useState } from "react";
import GlobalLayout from "../../layouts/GlobalLayout.astro";
import CalendarCard from "../../pages/calendar/CalendarCard.astro";

const NewCalendar = ({ tournaments }: { tournaments: any }) => {
  const pageTitle = "Calendario Club";

  // Agrupar torneos por mes
  const tournamentsByMonth: { [key: string]: any[] } = {};
  tournaments.forEach((tournament: any) => {
    const month = new Date(tournament.date).toLocaleString("es-ES", {
      month: "long",
    });
    if (!tournamentsByMonth[month]) {
      tournamentsByMonth[month] = [];
    }
    tournamentsByMonth[month].push(tournament);
  });

  // Obtener el mes actual
  const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });

  function capitalizeWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Estado para controlar qué mes está abierto en el acordeón
  const [openMonth, setOpenMonth] = useState<string | null>(currentMonth);

  // Función para alternar entre abrir y cerrar el mes
  const toggleMonth = (month: string) => {
    setOpenMonth((prevMonth) => (prevMonth === month ? null : month));
  };

  const getOrg = (organization: String) => {
    switch (organization) {
      case "FESBA":
        return "./assets/logos/bad_spain2.jpeg";
      case "FARBA":
        return "./assets/logos/bad_farba.jpeg";
      case "CAT":
        return "./assets/logos/bad_cat.jpeg";
      case "PV":
        return "./assets/logos/bad_pvasco.jpeg";
      case "HU":
        return "./assets/logos/LOGO-ROJO.png";
      default:
        return "./assets/logos/bad_spain2.jpeg";
    }
  };

  const dateToLocalString = (date: String) => {
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

  return (
    <>
      <div
        className="flex flex-col h-30 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/aboutHeader.webp')` }}
      >
        <div className="flex-none">
          <div className="flex flex-col items-center justify-center h-36 md:h-96">
            <h1 className="text-4xl md:text-5xl text-white font-sans font-extrabold text-center mb-4 z-10">
              {pageTitle.toUpperCase()}
            </h1>
            <p className="text-lg text-white text-center z-10 font-sans">
              Este es el calendario recomendado por el club para los próximos
              eventos
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col md:w-1/2 w-full justify-center items-center">
          {/* Renderizar acordeón por meses */}
          {Object.entries(tournamentsByMonth).map(([month, tournaments]) => (
            <div key={month} className="m-1 w-full">
              <button
                className="w-full p-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-sans font-bold"
                onClick={() => toggleMonth(month)}
              >
                {capitalizeWord(month)}
              </button>
              {/* Mostrar torneos si el mes está abierto */}
              {openMonth === month && (
                <div className="flex flex-col justify-center items">
                  {tournaments.map((tournament: any) => (
                    <div
                      key={tournament.id}
                      className="flex md:flex-row flex-col p-2 my-2"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex items-start justify-start text-left">
                          <h3 className="text-s md:text-lg text-slate-700 overflow-hidden max-h-14 overflow-ellipsis max-w-xs">
                            {" "}
                            {dateToLocalString(tournament?.date || "") +
                              " - " +
                              tournament?.location}
                          </h3>
                        </div>
                        <img
                          className="w-2/3 h-32 object-scale-down p-2"
                          src={getOrg(tournament?.org || "")}
                          alt={`Thumbnail image`}
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-2xl md:text-43xl font-bold mb-2">
                          {tournament.name}
                        </h3>
                        <div>
                          <a
                            className="flex flex-row justify-center items-center w-36 p-2 hover:bg-gray-200 rounded-xl font-sans font-bold cursor-pointer"
                            href={tournament.draw}
                            target="_blank"
                          >
                            <svg
                              width="24px"
                              height="24px"
                              viewBox="0 0 24 24"
                              fill="transparent"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                ></circle>{" "}
                                <path
                                  d="M12 17V11"
                                  stroke="#000000"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                ></path>{" "}
                                <circle
                                  cx="1"
                                  cy="1"
                                  r="1"
                                  transform="matrix(1 0 0 -1 11 9)"
                                  fill="#000000"
                                ></circle>{" "}
                              </g>
                            </svg>
                            <small className="ml-3 text-base text-slate-700 font-normal">
                              Información
                            </small>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewCalendar;
