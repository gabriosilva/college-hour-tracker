import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_BASE_API;

const API = axios.create({ baseURL: API_URL });

export interface Event {
  id: string;
  event: string;
  category: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  createdAt: string;
  updatedAt: string;
}

export const getEvents = async () => {
  const response = await API.get("/events");
  return response.data;
};

export const createEvent = async (event: Event) => {
  const response = await API.post("/events", event);
  return response.data;
};

export const updateEvent = async (id: string, event: Event) => {
  const response = await API.patch(`/events/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await API.delete(`/events/${id}`);
  return response.data;
};
