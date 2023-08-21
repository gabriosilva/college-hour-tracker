"use client";
import { getEvents, Event, updateEvent, deleteEvent } from "@/services/events";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Register() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    title: "",
    message: "",
  });
  const [warningDeleteModal, setWarningDeleteModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [event, setEvent] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalHours, setTotalHours] = useState(0);

  const [currentEventId, setCurrentEventId] = useState("-1");

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getEvents();
      const currEvents: Event[] = response.events;
      setEvents(response.events);
    };
    fetchProducts();
  }, [showSuccess]);

  useEffect(() => {
    if (currentEventId === "-1") return;
    const event = events.find((e: Event) => String(e.id) === currentEventId);
    if (!event) return;
    setEvent(event.event);
    setCategory(event.category);

    // the start date must be using this pattern yyyy-MM-dd
    const startDate = new Date(event.startDate).toISOString().split("T")[0];
    const endDate = new Date(event.endDate).toISOString().split("T")[0];
    setStartDate(startDate);
    setEndDate(endDate);
    setTotalHours(event.totalHours);
  }, [currentEventId, events]);

  const updateCurrentEvent = async () => {
    try {
      const startDateIso = new Date(startDate).toISOString();
      const endDateIso = new Date(endDate).toISOString();

      const response = await updateEvent(currentEventId, {
        id: currentEventId,
        event,
        category,
        startDate: startDateIso,
        endDate: endDateIso,
        totalHours,
        createdAt: "",
        updatedAt: "",
      });

      setSuccessMessage({
        title: "Activity / Event updated!",
        message: "The activity / event was updated!",
      });

      setShowSuccess(true);
      setShowError(false);
    } catch (e) {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  const removeCurrentEvent = async (): Promise<void> => {
    try {
      setWarningDeleteModal(false);

      const response = await deleteEvent(currentEventId);

      setSuccessMessage({
        title: "Event removed!",
        message: "The event was successfully removed!",
      });
      setShowSuccess(true);
      setShowError(false);
      setEvent("");
      setCategory("");
      setStartDate("");
      setEndDate("");
      setTotalHours(0);
      setCurrentEventId("-1");
    } catch (e) {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-2/5 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-3xl font-bold sm:text-3xl">
              Modify an activity / event
            </h1>

            <p className="mt-4 text-gray-500">
              In order to modify an activity / event, please fill the form
            </p>
          </div>

          {showError && (
            <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
              <p>Um erro ocorreu. Por favor tente novamente mais tarde.</p>
            </div>
          )}
          <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Selecione um evento
            </label>
            <select
              id="events"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setCurrentEventId(e.target.value);
              }}
            >
              <option selected>Selecione um evento</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.event}
                </option>
              ))}
            </select>
            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Nome do evento
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ex: Trabalho Voluntário"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Categoria
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ex: Serviço Comunitário"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Data de início
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Data de término
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Total de horas
                </label>
                <input
                  type="number"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ex: 10"
                  value={totalHours}
                  onChange={(e) => setTotalHours(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center flex-col justify-between h-28">
              <button
                onClick={updateCurrentEvent}
                className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-4 text-center mb-2 "
              >
                Update Event
              </button>
              <button
                onClick={() => setWarningDeleteModal(true)}
                className="w-full text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-4 text-center mb-2 "
              >
                Remove Event
              </button>
              <Link href="/" className="text-blue-500 hover:text-blue-700 mt-5">
                Go back
              </Link>
            </div>
          </div>
        </div>
        <div className="relative flex flex-center content-center items-center h-64 hidden md:block sm:h-96 lg:h-full lg:w-3/5 bg-[url(https://images.unsplash.com/photo-1549190179-646f048c6108?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80)] bg-cover bg-center bg-no-repeat">
          <div className="w-full h-full flex items-center justify-center"></div>
        </div>
      </section>
      {warningDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Remove event</h2>
            <p>Are you sure you want to remove this event?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                onClick={() => setWarningDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => removeCurrentEvent()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{successMessage.title}</h2>
            <p>{successMessage.message}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={() => setShowSuccess(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
