import http from "./httpService";

const apiEndpoint = "/emergency-alerts";

function issueEmergencyAlert(alert) {
  return http.post(apiEndpoint, {
    lat: alert.lat,
    lng: alert.lng,
    radius: alert.radius,
    title: alert.title,
    message: alert.message,
    supervisor: alert.supervisor
  });
}

export { issueEmergencyAlert };
