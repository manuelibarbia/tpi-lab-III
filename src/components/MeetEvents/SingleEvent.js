import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import EventsCard from "../EventsCard/EventsCard";
import EventsInscription from "../EventsInscription/EventsInscription";

const SingleEvent = ({ eventSingle }) => {
  const { contextTheme } = useContext(ThemeContext);
  return (
    <section id={contextTheme}>
      <section className="container vh-100">
        <div className="px-4 py-5 px-md-5 text-center ">
          <EventsCard>
            <p>Fecha: {eventSingle.date}</p>
            <p>{eventSingle.title}</p>
            <p>Organiza: {eventSingle.organizer}</p>
            <p>Ubicación: {eventSingle.location}</p>
            <p>Descripción: {eventSingle.description}</p>
          </EventsCard>
        </div>
        <EventsInscription/>
      </section>
    </section>
  );
};

export default SingleEvent;
