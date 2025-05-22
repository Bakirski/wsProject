const username = sessionStorage.getItem("chatUsername") || "Anonymous";
const socket = new WebSocket("ws://localhost:4000");

window.onload = () => {
  const name = document.getElementById("usernameDisplay");
  name.innerHTML = "User: " + username;
};

function disconnect() {
  socket.close();
  window.location.href = "/frontend/index.html";
}

socket.addEventListener("open", () => {
  socket.send(JSON.stringify({ type: "register", username }));
});

socket.addEventListener("message", (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.type === "userCount") {
      const userCount = document.getElementById("connectedUsers");
      userCount.textContent =
        data.count === 1
          ? data.count + " Connected User"
          : data.count + " Connected Users";
    } else {
      const { username: sender, message } = data;
      renderMessage(sender, message);
    }
  } catch (err) {
    console.error("Invalid message format", err);
  }
});

document.getElementById("chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const message = input.value.trim();
  if (!message) return;

  socket.send(JSON.stringify({ type: "chat", message }));
  input.value = "";
});

function renderMessage(sender, messageText) {
  const chatContainer = document.getElementById("chat");
  const msgElement = document.createElement("div");

  msgElement.classList.add("message");

  if (sender === username) {
    msgElement.classList.add("sent");
    sender = "You";
  } else {
    msgElement.classList.add("received");
  }

  msgElement.textContent = `${sender}: ${messageText}`;
  chatContainer.appendChild(msgElement);
}
