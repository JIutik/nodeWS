
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 9000 });

wsServer.on('connection', onConnect);
var dt = new Date("30 July 2010 15:05 UTC");


function onConnect(wsClient) {
    console.log('Новый пользователь');
    //wsClient.send('Привет');

    wsClient.on('close', function() {
        console.log('Пользователь отключился');
    });



    wsClient.on('message', function(message) {
        console.log(message);
        try {
            const jsonMessage = JSON.parse(message);
            console.log("MESSAGE", jsonMessage);
                wsClient.send(JSON.stringify({
                    eventDateTime: (dt.toISOString()),
                    eventId: jsonMessage.eventId,
                    eventType: "ok",
                }, null, '\t'));
            switch (jsonMessage.type) {
                case 'ECHO':
                    wsClient.send(jsonMessage.data);
                    break;
                case 'PING':
                    setTimeout(function() {
                        wsClient.send('PONG');
                    }, 2000);
                    break;
                case 'getChatInfo':
                    wsClient.send (JSON.stringify(updateChatInfo, null, '\t'));
                    setTimeout(function() {
                        wsClient.send(JSON.stringify(history, null, '\t'));
                    }, 3000);
                    break;
                default:
                    console.log('Неизвестная команда');
                    break;
            }
        } catch (error) {
            console.log('Ошибка', error);
        }
    });
}

console.log('Сервер запущен на 9000 порту');



// ----------ТУТ Я ПИШУ КЕЙСЫ ДЛЯ КОНКРЕТНЫХ СОБЫТИЙ ----------



let updateChatInfo = {
  eventDateTime: "2021-10-01T09:45:00",
  eventId: "066d6558-8e0d-43cc-be85-99068a45f5fd",
  eventType: "updateChatInfo",
  chatId: "33b06619-1ee7-3db5-827d-0dc85df1f759",
  payload: {
    splits: [
      {
        splitId: "23345",
        name: "УСО"
      },
      {
        splitId: "23355",
        name: "default"
      }
    ],
    chatBotEnabled: true,
    haveActiveCommunication: false,
    continuationChat: false
  }
}

let history = {
  eventDateTime: "2021-06-06 18:18:45,767",
  eventId: "066d6558-8e0d-43cc-be85-99068a45f5fd",
  eventType: "history",
  payload:
  { events:
  [
    {
      eventDateTime: "2021-06-06 18:18:44,213",
      eventId: "Сообщение от банка Допустимы все символы.",
      message: {
        authorName: "Ivan Ivanovich",
        userType: "OPERATOR",
        type: "text",
        text: "Hello world!",
        quote: {
          MessageId: "ee6bff78-279d-45f2-a8ad-632a2aba300a",
          authorName: "Petr Petrovich",
          text: "Hello Mister!!"
        }
      },
      last: true
      },
      {
      eventDateTime: "2021-06-06 18:17:44,213",
      eventId: "ee6bff78-279d-45f2-a8ad-632a2aba300a",
      message: {
        authorName: "Ivan Ivanovich",
        userType: "CUSTOMER",
        type: "text",
        text: "Hello Mister!!"
      },
      last: false
      }
      ]
  }
}