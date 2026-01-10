import api from "./axios"; // This uses your configured instance from the screenshot

export const fetchTopics = () => api.get("/topics");

export const createTopic = (topicData) => api.post("/topics", topicData);

export const reviseTopic = (id, assessmentData) => 
  api.post(`/topics/${id}/revise`, assessmentData);

export const getRevisionCalendar = () => api.get("/topics/calendar/5days");
export const getWeeklyAverageMemoryScore=()=>api.get("/topics/dashboardScore");
export const getRecentActivities=()=>api.get("/topics/recentActivity");
export const getTopicHistory = (id) => api.get(`/topics/${id}/history`);
export const deleteTopic = (id) => api.delete(`/topics/${id}`);