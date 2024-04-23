// // script.js

// // Cargar el modelo de TensorFlow.js
// async function loadModel() {
//     return await tf.loadLayersModel('https://tfhub.dev/google/universal-sentence-encoder/4/model.json');
// }

// // Codifica el texto usando el modelo de TensorFlow.js
// async function encodeText(text) {
//     const model = await loadModel();
//     const embeddings = model.predict(text);
//     return embeddings;
// }

// // Envía el mensaje del usuario a Dialogflow y muestra la respuesta
// async function sendMessage() {
//     const userMessage = document.getElementById("user-input").value;
//     document.getElementById("chat-box").innerHTML += "<p><strong>Tú:</strong> " + userMessage + "</p>";

//     const embeddings = await encodeText([userMessage]);
//     const input = {
//         text: {
//             text: userMessage,
//             languageCode: 'es'
//         }
//     };
//     const response = await detectIntent(input);
//     document.getElementById("chat-box").innerHTML += "<p><strong>Chatbot:</strong> " + response + "</p>";

//     document.getElementById("user-input").value = "";
// }

// // Llama al agente de Dialogflow y obtiene la respuesta
// function detectIntent(input) {
//     return new Promise((resolve, reject) => {
//         window.dfMessenger.detectIntent(
//             input,
//             (response) => {
//                 const fulfillmentText = response.queryResult.fulfillmentText;
//                 resolve(fulfillmentText);
//             },
//             (error) => {
//                 reject(error);
//             }
//         );
//     });
// }
