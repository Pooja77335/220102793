export const logger = (message, data = null) => {
const logEntry = {
timestamp: new Date().toISOString(),
message,
data,
};
// Store logs in localStorage
const logs = JSON.parse(localStorage.getItem("appLogs")) || [];
logs.push(logEntry);
localStorage.setItem("appLogs", JSON.stringify(logs));
};