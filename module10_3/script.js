const wsUri = "wss://echo-ws-service.herokuapp.com";
const geoUrl = "https://www.openstreetmap.org/";

const btnTextSend = document.querySelector('.btnTextSend');
const btnGeoSend = document.querySelector('.btnGeoSend');
const output = document.querySelector('.mainField');
let input = document.querySelector('.input'); 
let inputValue;
let websocket;


function writeAnswerText(message) {
    let messageText = document.createElement("p");
    messageText.style.width = "14em";
    messageText.innerHTML = message;
    messageText.className = "answerText";
    output.appendChild(messageText);
  } 
  
  
function startChat() {

    websocket = new WebSocket(wsUri);

    websocket.onopen = function(evt) {
        writeAnswerText("Hi! Unfortunately the echo-ws-service doesn't work today, but we can show your location. Please, press the button.");
    };

    inputValue = input.value;
    let messageText = document.createElement("p");
    messageText.style.width = "10em";
    messageText.innerHTML = inputValue;
    messageText.className = "messageText";
    output.appendChild(messageText);
    websocket.send(inputValue);
    inputValue = "";

    websocket.onmessage = function(evt) {
        writeAnswerText(evt.data);  
      };
    
     websocket.onclose = function(evt) {
         writeAnswerText("By");
     };

    websocket.onerror = function(evt) {
        writeAnswerText(
        '<span class="answerBox">ERROR:</span> ' + evt.data
        );        
      };
 
    }      

    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          btnTextSend.click();
        }
      });

    function getLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        writeAnswerText(`latitude: ${latitude}, langitude: ${longitude}`);
        const mapLink = document.createElement('a');
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = 'You on a map';
        mapLink.className = "answerText link"; 
        output.appendChild(mapLink)

    }

    btnGeoSend.addEventListener('click', () => {

        if (!navigator.geolocation) {
            writeAnswerText('Cannot get your location');
        } else {
            writeAnswerText('Getting your location');
            navigator.geolocation.getCurrentPosition(getLocation);
        }
    });

     