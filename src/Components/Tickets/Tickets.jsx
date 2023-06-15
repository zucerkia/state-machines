import React from "react";
import "./Tickets.css";

export const Tickets = ({ send, context }) => {
  const finish = () => {
    send("FINISH");
  };

  return (
    <div className="Tickets">
      <p className="Tickets-description description">
        Gracias por volar con book a fly 💚
      </p>
      <div className="Tickets-ticket">
        <div className="Tickets-country">{context.country}</div>
        <div className="Tickets-passengers">
          <span>✈</span>
          {context.passengers.map((passenger) => (
            <p>{passenger}</p>
          ))}
        </div>
      </div>
      <button onClick={finish} className="Tickets-finalizar button">
        Finalizar
      </button>
    </div>
  );
};
