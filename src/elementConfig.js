const textarea = document.querySelector('#messageInput');
textarea.oninput = function() {
    textarea.style.height = "";
    textarea.style.height = textarea.scrollHeight + "px";
}