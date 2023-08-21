"use client";

import { createEvent, Event } from "@/services/events";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Add() {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [event, setEvent] = useState("");
  const [category, setCategory] = useState("");
  const [totalHours, setHours] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const createNewEvent = async () => {
    // start date must be iso format
    const startDateIso = new Date(startDate).toISOString();

    // end date must be iso format
    const endDateIso = new Date(endDate).toISOString();

    const currEvent: Event = {
      id: 0,
      event,
      category,
      totalHours,
      startDate: startDateIso,
      endDate: endDateIso,
    };

    try {
      await createEvent(currEvent);
      setShowModal(true);
      setShowError(false);
    } catch (error) {
      setShowError(true);
    }
  };

  const clearForm = () => {
    setEvent("");
    setCategory("");
    setHours(0);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-2/5 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-3xl font-bold sm:text-3xl">
              Add a new event
            </h1>

            <p className="mt-4 text-gray-500">
              In order to add a new event, please fill the form below.
            </p>
          </div>

          {showError && (
            <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
              <p>
                An error occurred while trying to register your event. Please
                try again.
              </p>
            </div>
          )}

          <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Event / Activity Name
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ex: Masterclass with Mark Lane"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="Masterclass"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="20/08/2023"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="21/08/2023"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <label className="text-sm font-bold text-stone-dark-500 tracking-wide">
                  Hours
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-solid border-stone-dark-500 rounded-lg p-4 pe-12 text-sm shadow-sm"
                  placeholder="50"
                  value={totalHours}
                  onChange={(e) => setHours(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center flex-col justify-between h-28">
              <button
                type="button"
                className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-4 text-center mb-2 "
                onClick={() => {
                  createNewEvent();
                }}
              >
                Add event
              </button>
              <Link href="/" className="text-blue-500 hover:text-blue-700">
                Go back
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex flex-center content-center items-center h-64 hidden md:block sm:h-96 lg:h-full lg:w-3/5 bg-[url(https://images.unsplash.com/photo-1486746290722-483e8f1e44d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=997&q=80)] bg-cover bg-center bg-no-repeat">
          {" "}
          <div className="w-full h-full flex items-center justify-center"></div>
        </div>
      </section>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Event registered!</h2>
            <p>Your activity / Event was registered with success.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
              onClick={() => {
                setShowModal(false);
                clearForm();
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
