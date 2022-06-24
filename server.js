var dt = new Date().toISOString().replace(/Z/, '+0000');
const { Guid } = require('js-guid');

var randomSentence = require('random-sentence');
const { v4: uuidv4 } = require('uuid');




// ДЛЯ СТАРТОВОГО RESTа ---------
const http = require('http');

http.createServer((request, response) => {
console.log ('server work');
response.end (JSON.stringify(REST, null, '\t'));


}).listen(3000);
// ДЛЯ СТАРТОВОГО RESTа ---------

// ОТКРЫВАЕМ СОКЕТ ---------
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 9000 });

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
    console.log('Новый пользователь');
    //сообщения при установлении WSS
    setTimeout(function() {
      wsClient.send(JSON.stringify(updateChatInfo, null, '\t'));
  },  2000);
      setTimeout(function() {
          wsClient.send(JSON.stringify(history, null, '\t'));
      }, 4000);
    //wsClient.send('Привет');

    wsClient.on('close', function() {
        console.log('Пользователь отключился');
    });

    wsClient.on('message', function(message) {
        console.log(message);
        try {
            const jsonMessage = JSON.parse(message);
            console.log("MESSAGE", jsonMessage);
            switch (jsonMessage.eventType) {
              case 'ping':
                break;
                default :
                wsClient.send(JSON.stringify({
                  eventDateTime: dt,
                  eventId: jsonMessage.eventId,
                  eventType: "ok",
              }, null, '\t'));
                  break;}
            switch (jsonMessage.eventType) {
                case 'ECHO':
                    wsClient.send(jsonMessage.data);
                    break;
                case 'ping':
                  wsClient.send (JSON.stringify(PONG, null, '\t'));
                    break;
                case 'getChatInfo':
                    wsClient.send (JSON.stringify(updateChatInfo, null, '\t'));
                    setTimeout(function() {
                        wsClient.send(JSON.stringify(history, null, '\t'));
                    }, 3000);
                    break;

                case 'messageFromClient':
                  setTimeout(function() {
                wsClient.send(JSON.stringify({
                        eventType: "messageToClient",
                        eventDateTime: dt,
                        eventId: uuidv4(),
                        payload: {
                          message: {
                              messageId: uuidv4(),
                              text: randomSentence(),
                              time: dt,
                              type: "text"
                          }
                      },
                    }, null, '\t'));
                  }, 5000);
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
  "eventDateTime": dt,
  "eventId": "5654d497-73df-4b55-9a95-cea32f26001c",
  "eventType": "updateChatInfo",
  "payload": {
    "splits": [
      {
        "splitId": "23345",
        "name": "УСО"
      },
      {
        "splitId": "23355",
        "name": "default"
      }
    ],
    "chatBotEnabled": true,
    "haveActiveCommunication": false,
    "continuationChat": false
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
      eventId: "329fee04-c3d9-4754-a2c1-468d2e32fda1",
      message: {
        authorName: "Ivan Ivanovich",
        userType: "OPERATOR",
        type: "text",
        text: "Добрый день!",
        quote: {
          MessageId: "ee6bff78-279d-45f2-a8ad-632a2aba300a",
          authorName: "Petr Petrovich",
          text: "Добрый день, Иван Иванович!"
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
        text: "У меня есть вопрос"
      },
      last: false
      }
      ]
  }
};

let REST = {

    "parameters": {
      "typingEnabled": true,
      "typingDelay": 3,
      "previewEnabled": true,
      "deliveryStateEnabled": true,
      "ratingCloseTimeout": 120,
      "fileUploadTimeout": 120,
      "fileCustomerUrl": "https://csc-ift.csctest.sberbank.ru/chat_cb/file/uploadToEcm",
      "redirectTechSupportTopicId": 53399,
      "widgetMetricsUrl": "https://iftmpclickstream.testonline.sberbank.ru:8098/metrics/partners",
      "ratingEnabled": true,
      "chatHistoryEnabled": false,
      "fileUploadEnabled": false,
      "rtdmEnabled": false,
      "startChatButtonsEnabled": true,
      "textAssistEnabled": true,
      "systemMessageEnabled": true,
      "redirectToAssistantCardEnabled" : true
    },
    "suggestions": [
      "Как пополнить счет; Как пополнить баланс на счете; Как внести нал на счет; Как внести кэш на свой счет; Внесение налички на счет",
      "Не могу скачать выписку; Как сделать выписку; Нужна выписка по счету; Не понимаю как сделать выписку по счету и скачать ее; Как выгрузить выписку"
    ],
    "startButtons": [
      {"buttonText":"Отправить платеж", "scenarionId": "cb_ckr_platej"},
      {"buttonText":"Сформировать выписку", "scenarionId": "cb_ckr_vipiski"}
    ],
  "startMessages": [ "Добрый день! Чем могу помочь?", "Все системы работают в штатном режиме" ], 
  "systemMessage": ["алЯрм"], 
  "letterMapping": ["Уважаемый клиент! Вы можете решить свой вопрос в чате.", "Уважаемый клиент! Для быстрого решения"
    ], 
  "assistantCard": {"header": "Меняемся, чтобы стать удобнее", "text": "Виртуальный ассистент поможет решить вопрос, а если не справится - позовёт оператора.", "buttonText": "Спросить ассистента" },
  "wssKey": "hsBlbuDTkk24srzEOTBUlZAlC2g", 
  "serverDatetime": dt
}
let PONG = {
    "eventId": uuidv4(),
    "eventType": "pong"
};