

document.onload = getMessage();
async function getMessage(){
    try{
        const response = await fetch("http://localhost:4000/");
        const data = await response.json();
        console.log(data.message);
        displayMessage(data.message);
    } catch (error){
        console.log("Error while fetching message: ", error);
    }
}

function displayMessage(message){
    const container = document.getElementById("messageContainer");
    const data = document.createElement("p");
    data.innerHTML = message;
    container.appendChild(data);
}

document.getElementById("usernameForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  if (!username) return;

  sessionStorage.setItem("chatUsername", username);
  window.location.href = "Pages/chatroom.html";
});