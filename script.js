const stage = document.querySelector("#assistantStage");
const statusText = document.querySelector("#status");
const composer = document.querySelector("#composer");
const promptInput = document.querySelector("#prompt");
const messages = document.querySelector("#messages");
const paperclip = document.querySelector("#paperclip");

const cannedReplies = [
  "I can answer that once the AI backend is connected. For now, I am showing the full interaction flow.",
  "Great question. In the native app, this would be sent to a secure AI proxy so your API key never ships inside the client.",
  "I heard you. The next step is connecting speech input, a system prompt, and a streaming answer endpoint.",
  "That is exactly the kind of thing the assistant should handle: quick answers, app actions, reminders, and context-aware help."
];

function setMode(mode) {
  stage.dataset.mode = mode;
  statusText.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
}

function addMessage(text, role) {
  const article = document.createElement("article");
  article.className = `message ${role}-message`;
  article.textContent = text;
  messages.append(article);
  messages.scrollTop = messages.scrollHeight;
}

function pickReply(question) {
  if (/ios|iphone|ipad/i.test(question)) {
    return "On iOS, I can live inside the app, appear as a widget or Live Activity, and work with Siri/App Intents. Apple does not allow me to float above every app like a Windows desktop companion.";
  }

  if (/windows|desktop|float|sit/i.test(question)) {
    return "On Windows, I can be packaged as a transparent always-on-top desktop window, so the character can sit on the screen and animate while you talk.";
  }

  return cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
}

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = promptInput.value.trim();
  if (!question) return;

  addMessage(question, "user");
  promptInput.value = "";
  setMode("think");

  window.setTimeout(() => {
    addMessage(pickReply(question), "assistant");
    setMode("celebrate");
    window.setTimeout(() => setMode("idle"), 1500);
  }, 850);
});

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

paperclip.addEventListener("click", () => {
  setMode("listen");
  promptInput.focus();
});

setMode("idle");
