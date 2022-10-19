const server = 'http://localhost:3000';

function sendMsg() {

    let text = document.getElementById('message').value ;

    let dt = new Date ;

    let hour = "" + dt.getHours() +"h"+ dt.getMinutes();

    let msg = { 
            userId:"no",
            hour  : ""+hour,
            messageText : ""+text
    };

    console.log(msg);

    fetch(`${server}/message/`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg)
    });

    addMsg(msg)
}

function addMsg(msg) {

    //first part

    let chatList = document.getElementById('toFill') ;
    let li       = document.createElement("li");
    let name     = document.createElement("div");
    let span     = document.createElement("span") ;

    li  .setAttribute("class","me"  );
    name.setAttribute("class","name");

    span.innerHTML = msg.userId ;

    name    .appendChild(span);
    li      .appendChild(name);
    chatList.appendChild(li  );

    //second part

    let message = document.createElement("div" );
    let time    = document.createElement("span");
    let p       = document.createElement("p");

    time.setAttribute("class", "msg-time")
    message.setAttribute("class","message") ;

    p.innerText    = msg.messageText ;
    time.innerText = msg.hour ;

    message .appendChild(p);
    message .appendChild(time);
    li.appendChild(message);


    `<li class="me">
        <div class="name">
            <span class="">John Doe</span>
        </div>
        <div class="message">
            <p>Hello</p>
            <span class="msg-time">5:00 pm</span>
        </div>
    </li>`
}


(function () {
    const server = 'http://127.0.0.1:3000'
    const socket = io(server);

    socket.on('notification', (data) => {
        console.log('Message depuis le seveur:', data);
    })

    fetch(`${server}/messages`).then((res) => {
        return res.json()
    }).then((data) => {
        //console.log(Object.getOwnPropertyNames(data[0]))

        for (let i of data)
            addMsg(i);
    })
})()