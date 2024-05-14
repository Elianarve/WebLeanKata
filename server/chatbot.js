const dialogflow = require('@google-cloud/dialogflow-cx');

const projectId = 'leankata';
const locationId = 'es';
const agentId = '97e9e179-9dc5-4129-8c15-76176d2ad81';
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