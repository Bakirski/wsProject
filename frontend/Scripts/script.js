document.onload = getMessage();
async function getMessage(){
    try{
        const response = await fetch("http://localhost:4000");
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