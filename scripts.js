document.getElementById('start-button').addEventListener('click', function() {
  const responseElement = document.getElementById('response');

  // Check for browser compatibility
  if (!('webkitSpeechRecognition' in window)) {
      responseElement.innerHTML = "Sorry, your browser does not support speech recognition.";
      return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false; // Stop automatically after the first result
  recognition.interimResults = false; // Don't show interim results

  recognition.onstart = function() {
      responseElement.innerHTML = "Listening...";
  };

  recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      responseElement.innerHTML = "You said: " + transcript;
      processCommand(transcript);
  };

  recognition.onerror = function(event) {
      responseElement.innerHTML = "Error occurred in recognition: " + event.error;
  };

  recognition.onend = function() {
      responseElement.innerHTML += "<br>Stopped listening.";
  };

  recognition.start();
});

function processCommand(command) {
  // Basic command processing (you can expand this as needed)
  const responseElement = document.getElementById('response');
  if (command.toLowerCase().includes("hello")) {
      responseElement.innerHTML += "<br>Maneger 2: Hello! How can I assist you today?";

  } else {
      responseElement.innerHTML += "<br>Maneger 2: Sorry, I didn't understand that.";
  }
}