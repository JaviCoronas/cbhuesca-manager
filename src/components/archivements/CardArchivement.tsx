import React, { useEffect, useRef } from "react";
import "./CardCounter.css";

interface CardData {
  title: string;
  number: number;
  text: string;
  colour: string;
  icon: string;
}

const CardArchivement: React.FC<{ data: CardData[] }> = ({ data }) => {
  const countersRef = useRef<
    { counterElement: HTMLDivElement; targetNumber: number }[]
  >([]);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    countersRef.current.forEach(({ counterElement }) => {
      observer.observe(counterElement);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleIntersection: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetIndex = countersRef.current.findIndex(
          (item) => item.counterElement === entry.target
        );

        if (targetIndex !== -1) {
          animateCounter(
            countersRef.current[targetIndex].counterElement,
            countersRef.current[targetIndex].targetNumber
          );
        }
      }
    });
  };

  const animateCounter = (
    counterElement: HTMLDivElement,
    targetNumber: number
  ) => {
    let currentNumber = 1;

    const updateCounter = () => {
      counterElement.textContent = currentNumber.toString();

      if (currentNumber < targetNumber) {
        currentNumber++;
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  };

  return (
    <div className="flex md:flex-row flex-col justify-center items-center text-white">
      {data.map((item, index) => (
        <div
          className={`m-2 p-2 shadow-xl flex flex-col h-96 md:w-64 w-72 justify-center items-center rounded-xl text-center`}
          style={{
            backgroundColor: item.colour,
            boxShadow: `0 0 10px ${item.colour}`,
          }}
          key={index}
        >
          <h2 className="flex top-0 mt-3 h-56 font-bold text-xl mb-5">
            {item.title}
          </h2>
          <p className="flex h-40">{item.text}</p>
          <img className="h-12 w-12 mt-4" src={item.icon} alt="Tu Icono" />
          <div
            className="flex text-6xl h-full justify-center items-center"
            ref={(el) =>
              (countersRef.current[index] = {
                counterElement: el!,
                targetNumber: item.number,
              })
            }
          >
            p c
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardArchivement;
