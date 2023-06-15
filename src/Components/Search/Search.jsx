import React, { useState } from "react";
import "./Search.css";

export const Search = ({ state, send }) => {
  const [flight, setFlight] = useState("");

  const goToPassengers = () => {
    send("CONTINUE", { country: flight });
  };

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };

  const { countries: options } = state.context;

  return (
    <div className="Search">
      <p className="Search-title title">Busca tu destino</p>
      <select
        id="country"
        className="Search-select"
        value={flight}
        onChange={handleSelectChange}
      >
        <option value="" disabled defaultValue>
          Escoge un país
        </option>
        {options.map(({ name }) => (
          <option value={name.common} key={name.common}>
            {name.common}
          </option>
        ))}
      </select>
      <button
        onClick={goToPassengers}
        disabled={flight === ""}
        className="Search-continue button"
      >
        Continuar
      </button>
    </div>
  );
};
