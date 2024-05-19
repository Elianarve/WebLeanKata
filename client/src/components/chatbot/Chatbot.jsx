import '../chatbot/Chatbot.css';


const Chatbot = () => {
  return (
    <df-messenger
      location="europe-west2"
      project-id="leankata"
      agent-id="97e9e179-9dc5-4129-8c15-76176d2ad813"
      language-code="es"
      max-query-length="-1">
      <df-messenger-chat-bubble
       chat-title="">
      </df-messenger-chat-bubble>
    </df-messenger>
  )
}

export default Chatbot;