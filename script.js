document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const messagesContainer = document.getElementById("messages");
    const newConversationButton = document.getElementById("newConversation");

    // Adiciona mensagem no chatbox
    function addMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll automático
    }

    // Envia mensagem ao servidor (simulação)
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        addMessage("user", userMessage);
        userInput.value = ""; // Limpa o campo de input

        try {
            // Simula a resposta do bot (aqui você pode conectar ao backend)
            const botReply = "Bot: " + userMessage.split("").reverse().join(""); // Resposta simulada
            setTimeout(() => {
                addMessage("bot", botReply);
            }, 1000);
        } catch (error) {
            addMessage("bot", "Desculpe, ocorreu um erro.");
            console.error("Erro:", error);
        }
    }

    // Função para criar uma nova conversa
    function newConversation() {
        messagesContainer.innerHTML = ""; // Limpa as mensagens
    }

    // Eventos
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
    
    // Evento para nova conversa
    newConversationButton.addEventListener("click", newConversation);
});
