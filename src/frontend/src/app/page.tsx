"use client";

import { getEvents, Event } from "@/services/events";
import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEvents();
      setEvents(response.events);
      const newTotalHours = response.events.reduce(
        (acc: number, curr: Event) => acc + curr.totalHours,
        0
      );
      setTotalHours(newTotalHours);
    };
    fetchEvents();
  }, []);
  return (
    <main>
      <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Tracked Hours
            </h3>
            <h2 className="text-4xl mb-2">{totalHours} Hours</h2>
            <span className="text-base font-normal text-gray-500">
              List of tracked external complementary hours and activities
            </span>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              <a href="/add">Add event</a>
            </button>

            <button
              type="button"
              className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            >
              <a href="/manage">Manage event</a>
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Event/Activity
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Start Date
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        End Date
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {events.map((data, index) => (
                      <tr key={index}>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                          {data.event}
                        </td>

                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {data.category}
                        </td>

                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {data.startDate}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                          {data.endDate}
                        </td>
                        <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {data.totalHours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
