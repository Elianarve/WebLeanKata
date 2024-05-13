const dialogflow = require('@google-cloud/dialogflow-cx');

const projectId = 'leankata';
const locationId = 'YOUR_LOCATION_ID';
const agentId = 'YOUR_AGENT_ID';
const sessionId = 'YOUR_SESSION_ID';

const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(query) {
  const request = {
    session: sessionClient.projectLocationAgentSessionPath(projectId, locationId, agentId, sessionId),
    queryInput: {
      text: {
        text: query
      }
    }
  };

  const [response] = await sessionClient.detectIntent(request);

  return response;
}

module.exports = {
  detectIntent
};
