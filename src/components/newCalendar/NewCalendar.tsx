import React, { useState } from "react";

const NewCalendar = ({ tournaments }: { tournaments: any }) => {
  const pageTitle = "Calendario Club";

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

  const currentMonth = new Date().toLocaleString("es-ES", { month: "long" });
  const [openMonth, setOpenMonth] = useState<string | null>(currentMonth);
  const toggleMonth = (month: string) => {
    setOpenMonth((prevMonth) => (prevMonth === month ? null : month));
  };

  function capitalizeWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

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
              Este es el calendario aprobado por el club para los próximos
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
                      className="flex md:flex-row flex-col p-2 my-2 md:h-40 h-full"
                    >
                      <div className="flex flex-col md:w-64 items-start justify-start mr-3 md:border-r md:border-gray-500">
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
                      <div className="flex flex-col justify-start w-full">
                        <h3 className="text-2xl md:text-43xl font-bold mb-2">
                          {tournament.name}
                        </h3>
                        <div className="flex justify-start items-end h-full">
                          <a
                            className="flex flex-row  w-36 p-2 hover:bg-gray-200 rounded-xl font-sans font-bold cursor-pointer"
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
                              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                              <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></g>
                              <g id="SVGRepo_iconCarrier">
                                {" "}
                                <circle
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="#000000"
                                  strokeWidth="1.5"
                                ></circle>{" "}
                                <path
                                  d="M12 17V11"
                                  stroke="#000000"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
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
                          {tournament.inscription != null ? (
                            <a
                              className="flex flex-row  w-36 p-2 hover:bg-gray-200 rounded-xl font-sans font-bold cursor-pointer animate-pulse bg-slate-300"
                              href={tournament.inscription}
                              target="_blank"
                            >
                              <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    d="M18.18 8.03933L18.6435 7.57589C19.4113 6.80804 20.6563 6.80804 21.4241 7.57589C22.192 8.34374 22.192 9.58868 21.4241 10.3565L20.9607 10.82M18.18 8.03933C18.18 8.03933 18.238 9.02414 19.1069 9.89309C19.9759 10.762 20.9607 10.82 20.9607 10.82M18.18 8.03933L13.9194 12.2999C13.6308 12.5885 13.4865 12.7328 13.3624 12.8919C13.2161 13.0796 13.0906 13.2827 12.9882 13.4975C12.9014 13.6797 12.8368 13.8732 12.7078 14.2604L12.2946 15.5L12.1609 15.901M20.9607 10.82L16.7001 15.0806C16.4115 15.3692 16.2672 15.5135 16.1081 15.6376C15.9204 15.7839 15.7173 15.9094 15.5025 16.0118C15.3203 16.0986 15.1268 16.1632 14.7396 16.2922L13.5 16.7054L13.099 16.8391M13.099 16.8391L12.6979 16.9728C12.5074 17.0363 12.2973 16.9867 12.1553 16.8447C12.0133 16.7027 11.9637 16.4926 12.0272 16.3021L12.1609 15.901M13.099 16.8391L12.1609 15.901"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                  ></path>{" "}
                                  <path
                                    d="M8 13H10.5"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>{" "}
                                  <path
                                    d="M8 9H14.5"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>{" "}
                                  <path
                                    d="M8 17H9.5"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>{" "}
                                  <path
                                    d="M3 14V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157M21 14C21 17.7712 21 19.6569 19.8284 20.8284M4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284M19.8284 20.8284C20.7715 19.8853 20.9554 18.4796 20.9913 16"
                                    stroke="#000000"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  ></path>{" "}
                                </g>
                              </svg>
                              <small className="ml-3 text-base text-slate-700 font-normal">
                                Inscripción
                              </small>
                            </a>
                          ) : (
                            <></>
                          )}
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
