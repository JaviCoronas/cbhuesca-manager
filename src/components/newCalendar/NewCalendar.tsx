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
      <div className="flex items-center justify-center w-full bg-slate-300">
        <div className="flex flex-col md:w-2/3 w-full justify-center items-center">
          {/* Renderizar acordeón por meses */}
          {Object.entries(tournamentsByMonth).map(([month, tournaments]) => (
            <div key={month} className="m-1 w-full">
              <button
                className="w-full p-2 bg-gray-200 hover:bg-gray-300"
                onClick={() => toggleMonth(month)}
              >
                {capitalizeWord(month)}
              </button>
              {/* Mostrar torneos si el mes está abierto */}
              {openMonth === month && (
                <div className="flex flex-col ml-1 mr-1">
                  {tournaments.map((tournament: any) => (
                    <div
                      key={tournament.id}
                      className="border border-black p-2 my-2"
                    >
                      <h2>{tournament.name}</h2>
                      {/* Renderizar otros detalles del torneo si es necesario */}
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
