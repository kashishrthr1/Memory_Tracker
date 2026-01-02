import api from "./axios"; // This uses your configured instance from the screenshot

export const fetchTopics = () => api.get("/topics");

export const createTopic = (topicData) => api.post("/topics", topicData);

export const reviseTopic = (id, assessmentData) => 
  api.post(`/topics/${id}/revise`, assessmentData);

export const getRevisionCalendar = () => api.get("/topics/revision-calendar");