from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
import speech_recognition as sr

# Configuração da chave de API
os.environ["GROQ_API_KEY"] = "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"  # Substitua pela sua chave
chat = ChatGroq(model="llama-3.1-8b-instant")

# Configuração do Flask
app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as origens

# Função para gerar resposta do bot
def gerar_resposta(mensagem_usuario):
    mensagens = [("system", "Você é um assistente criado pela equipe DevSupport, seja amigável e útil.")]
    mensagens.append(("user", mensagem_usuario))
    template = ChatPromptTemplate.from_messages(mensagens)
    resposta = template | chat
    return resposta.invoke(input={}).content

# Rota para chatbot
@app.route("/chat", methods=["POST"])
def chat_endpoint():
    dados = request.get_json()
    mensagem_usuario = dados.get("message", "")
    resposta = gerar_resposta(mensagem_usuario)
    return jsonify({"reply": resposta})

# Rota para conversão de fala para texto
@app.route("/speech", methods=["POST"])
def speech_to_text():
    recognizer = sr.Recognizer()
    audio_file = request.files.get("audio")
    if not audio_file:
        return jsonify({"error": "Nenhum arquivo de áudio foi enviado."}), 400

    try:
        with audio_file as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio, language="pt-BR")
        return jsonify({"text": text})
    except sr.UnknownValueError:
        return jsonify({"error": "Não conseguimos entender o áudio."}), 400
    except sr.RequestError:
        return jsonify({"error": "Erro ao conectar ao serviço de reconhecimento."}), 500

# Iniciar o servidor
if __name__ == "__main__":
    app.run(debug=True)
