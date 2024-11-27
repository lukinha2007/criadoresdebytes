const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const languageSelect = document.getElementById("languageSelect");
const translateButton = document.getElementById("translateButton");
const speakButton = document.getElementById("speakButton");
const playButton = document.getElementById("playButton");

// Função de tradução usando Google Tradutor
translateButton.addEventListener("click", async () => {
    const text = inputText.value.trim();
    const targetLanguage = languageSelect.value;

    if (!text) {
        alert("Por favor, insira um texto para traduzir.");
        return;
    }

    try {
        const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`);
        
        if (!response.ok) {
            console.error("Erro na requisição:", response.status, response.statusText);
            alert("Erro ao traduzir. Verifique os parâmetros ou o serviço da API.");
            return;
        }

        const data = await response.json();
        console.log("Resposta da API:", data);

        if (data && data[0] && data[0][0] && data[0][0][0]) {
            outputText.value = data[0][0][0]; // Extrai a tradução da resposta
        } else {
            alert("Erro ao processar a tradução.");
        }
    } catch (error) {
        console.error("Erro na tradução:", error);
        alert("Erro ao traduzir. Verifique sua conexão com a internet.");
    }
});

// Reconhecimento de voz
speakButton.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "pt-BR";

    recognition.onresult = (event) => {
        inputText.value = event.results[0][0].transcript;
    };

    recognition.start();
});

// Reprodução de voz
playButton.addEventListener("click", () => {
    const text = outputText.value;

    if (!text) {
        alert("Nenhum texto para reproduzir.");
        return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageSelect.value;
    synth.speak(utterance);
});
