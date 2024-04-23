// app.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Ruta para enviar mensajes a Dialogflow
app.post('/api/message', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await sendMessageToDialogflow(message);
        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Función para enviar mensaje a Dialogflow
async function sendMessageToDialogflow(message) {
    const projectId = 'tu-proyecto-de-dialogflow'; // Reemplaza con tu ID de proyecto de Dialogflow
    const sessionId = 'sesion-usuario-unico'; // Puedes generar un ID de sesión único para cada usuario
    const languageCode = 'es'; // Lenguaje de tu agente de Dialogflow

    const url = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`;

    const requestBody = {
        queryInput: {
            text: {
                text: message,
                languageCode: languageCode,
            },
        },
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer tu-token-de-autenticacion', // Reemplaza con tu token de autenticación de Dialogflow
    };

    const response = await axios.post(url, requestBody, { headers });
    const fulfillmentText = response.data.queryResult.fulfillmentText;

    return fulfillmentText;
}

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
