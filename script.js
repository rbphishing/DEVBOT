document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const messagesContainer = document.getElementById("messages");

    // Adiciona mensagem no chatbox
    function addMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll automático
    }

    // Envia mensagem ao servidor
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        addMessage("user", userMessage);
        userInput.value = ""; // Limpa o campo de input

        try {
            // URL dinâmica para o backend
            const url = "http://127.0.0.1:5000/chat";

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            if (!response.ok) {
                throw new Error(`Erro no servidor: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            addMessage("bot", data.reply);
        } catch (error) {
            addMessage("bot", "Desculpe, ocorreu um erro ao conectar ao servidor.");
            console.error("Erro:", error);
        }
    }

    // Eventos
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
});





// Toggle do menu lateral
document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const button = document.getElementById("animateButton");

    // Animação para abrir o menu
    sidebar.classList.add("active");

    // Efeito ao clicar no botão
    button.addEventListener("click", () => {
        const section = document.querySelector(".section");
        section.classList.add("animated");

        // Alterar cor do botão após animação
        button.style.backgroundColor = "#2ecc71";
    });
});
