const dialogflow = require('@google-cloud/dialogflow-cx');

const projectId = 'leankata';
const locationId = 'europe-west2';
const agentId = '97e9e179-9dc5-4129-8c15-76176d2ad81';
const sessionId = '12345';

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
  console.log(response);
  return response;
}

module.exports = {
  detectIntent
};