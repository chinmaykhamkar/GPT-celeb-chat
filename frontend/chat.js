const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const chatWindow = document.getElementById("chat-box");

const celebName = localStorage.getItem("selectedCeleb");
document.getElementById("name").innerHTML = 'Chat with ' + celebName;

sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  const messageElement = createMessageElement("user", message);
  chatWindow.appendChild(messageElement);
  messageInput.value = "";

  setTimeout(() => {
    const videoElement = createVideoElement("celeb", "../frontend/media/dictator_orig.mp4");
    const replyElement = createReplyElement(videoElement);
    chatWindow.appendChild(replyElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1000);
});

function createMessageElement(sender, message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("message-bubble");
  messageBubble.classList.add("user-message");
  messageBubble.textContent = message;

  messageContainer.appendChild(messageBubble);
  return messageContainer;
}

function createVideoElement(sender, videoUrl) {
  const videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");
  videoContainer.classList.add(sender + "-video");

  const video = document.createElement("video");
  video.setAttribute("src", videoUrl);
  video.setAttribute("controls", true);

  videoContainer.appendChild(video);
  
  return videoContainer;
}

function createReplyElement(videoElement) {
  const replyContainer = document.createElement("div");
  replyContainer.classList.add("message-container");
  replyContainer.classList.add("reply-container");

  const replyBubble = document.createElement("div");
  replyBubble.classList.add("message-bubble");
  replyBubble.classList.add("celeb-message");
  replyBubble.appendChild(videoElement);

  replyContainer.appendChild(replyBubble);

  return replyContainer;
}
