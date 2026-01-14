import api from "./axios";
export const contactUser = (data) =>
  api.post("/contact/submit", data);