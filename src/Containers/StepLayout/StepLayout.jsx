import { Welcome, Search, Tickets, Passengers } from "../../Components";

import "./StepsLayout.css";

export const StepsLayout = ({ state, send }) => {
  const renderContent = () => {
    if (state.matches("initial")) return <Welcome send={send} />;
    if (state.matches("search")) return <Search state={state} send={send} />;
    if (state.matches("tickets"))
      return <Tickets context={state.context} send={send} />;
    if (state.matches("passengers"))
      return <Passengers state={state} send={send} />;
    return null;
  };

  return <div className="StepsLayout">{renderContent()}</div>;
};
