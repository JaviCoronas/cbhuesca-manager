import React, { type FormEvent } from "react";

const FeedbackForm = () => {
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/email", {
      method: "POST",
      body: formData,
    });

    if (response.status == 200) {
      alert("Mensaje mandado con éxito.");
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z" />
          </svg>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 block w-full pl-10 p-2.5"
          placeholder="nombre..."
        />
      </div>
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <>
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </>
          </svg>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 block w-full pl-10 p-2.5"
          placeholder="nombre@dominio.com"
        />
      </div>
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <>
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </>
          </svg>
        </div>
        <input
          type="phone"
          id="phone"
          name="phone"
          autoComplete="tel"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 block w-full pl-10 p-2.5"
          placeholder="999 999 999"
        />
      </div>
      <p className="">
        Escríbenos sobre qué quieres información, reservar pistas, cumpleaños,
        colaborar...
      </p>
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <>
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </>
          </svg>
        </div>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          required
          rows={5}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 block w-full pl-10 p-2.5"
          placeholder="Escribe lo que quieras"
        />
      </div>
      <div className="flex justify-end pt-2 pb-5">
        <button id="btnEnviar">
          <a
            type="button"
            className="bg-black hover:bg-black text-white font-semibold hover:text-white py-2 px-4 m-6 border border-white hover:border-transparent rounded"
          >
            Enviar
          </a>
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
