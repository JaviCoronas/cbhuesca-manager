import React from "react";
import CardArchivement from "./CardArchivement";

const Archivements: React.FC = () => {
  const cardData = [
    {
      title: "Socios",
      text: "Todos somos parte de la familia",
      colour: "#7209b7",
      icon: "/assets/icons/community.svg",
      number: 158,
    },
    {
      title: "Medallas en Campeonatos de España",
      text: "Grandes logros de nuestros jugadores",
      colour: "#4361ee",
      icon: "/assets/icons/trophyIcon.svg",
      number: 34,
    },
    {
      title: "Participaciones Selección Nacional",
      text: "Aportaciones y resultados en competiciones internacionales",
      colour: "#3a0ca3",
      icon: "/assets/icons/medalIcon.svg",
      number: 86,
    },
    {
      title: "Entrenadores titulados",
      text: "4 entrenadores Nivel III, 2 entrenadores Nivel II, 9 de nivel ShuttleTime",
      colour: "#f72585",
      icon: "/assets/icons/badIcon.svg",
      number: 15,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center md:w-3/4 mb-10">
      <div className="w-full">
        <h2 className="font-sans text-4xl mb-2 mt-3">
          <strong className="text-5xl font-sans">NUESTROS</strong> NÚMEROS
        </h2>
        <CardArchivement data={cardData} />
      </div>
    </div>
  );
};

export default Archivements;
