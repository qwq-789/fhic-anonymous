const url = "https://script.google.com/macros/s/AKfycbyj6DJPKjFbeYmAS2cgZnyVXSGrPHqFDrgzo1FuZAUH-uOkAu_3UN3ggIWPTV-FxS2M/exec"

function renderMessageBox(message, timestamp) {
    const messageBox = document.getElementById('messages').content;
    messageBox.getElementById('boardMessage').innerText = message;
    messageBox.getElementById('messageTimeRecord').innerText = timestamp;
    
    //複製一份 template 的內容
    const cloneMessageBox = document.importNode(messageBox, true);
    document.getElementById('messageBoard').appendChild(cloneMessageBox);
    
}


const messageCreater = document.getElementById('messageCreater');
const messageInput = document.getElementById('messageInput');
const messageSubmit = document.getElementById('messageSubmit');
messageCreater.addEventListener('submit', function(e) {
    e.preventDefault();
    if (messageInput.value == "") {
        return;
    }
    const message = messageInput.value;
    const fetchData = {
        message: message,
        timestamp: timeFormat(new Date()),
    };

    const fetchOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain'
        },
        body: JSON.stringify(fetchData)
    };
    messageInput.value = "";
    messageSubmit.disabled = true;
    messageSubmit.classList.remove("messageSubmiter");

    fetch(url, fetchOptions)
    .then(res => {
        return res.json();
    }).then(doc => {
        console.log(doc);
        renderMessageBox(doc.message, doc.timestamp);
    }).catch(e => {
        console.log(e);
        alert('不好意思，目前系統有點狀況，請通知管理員。')
    });
});

messageInput.addEventListener('input', function() {
    // early return 不要管的事情提前結束
    if (messageInput.value == "") {
        messageSubmit.disabled = true;
        messageSubmit.classList.remove("messageSubmiter");
        return;
    }
    messageSubmit.disabled = false;
    messageSubmit.classList.add("messageSubmiter");
})


function timeFormat(date) {
    // yyyy-MM-dd hh:mm
    const year = date.getFullYear();
    const month = timeAddZero(date.getMonth() + 1);
    const day = timeAddZero(date.getDate());
    const hour = timeAddZero(date.getHours());
    const minute = timeAddZero(date.getMinutes());

    return `${year}-${month}-${day} ${hour}:${minute}`
}

function timeAddZero(number) {
    if (number < 10) {
        return `0${number}`;
    }
    return number;
}