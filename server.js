//v3
//var dt = new Date().toISOString().replace(/Z/, '+0000');
const dayjs = require('dayjs')

var randomSentence = require('random-sentence');

const { v4: uuidv4 } = require('uuid');
const text = require('ryba-js')
const { Guid } = require('js-guid');



// ДЛЯ СТАРТОВОГО RESTа ---------
// рест
const http = require('http');

http.createServer((request, response) => {
console.log ('server work');
response.end (JSON.stringify(REST, null, '\t'));


}).listen(8000);
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
                
              case 'messageFromClient':
                if (jsonMessage.payload.message.text === "дай ошибку") {
                wsClient.send(JSON.stringify({
                  
                    eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                    eventId: uuidv4(),
                    eventType: "error",
                    payload: {
                            errorCode: "BACKEND_ERROR",
                            onEventId: jsonMessage.eventId,
                            description: "Ошибка на уровне backend-систем"
                    }
                
                }, null, '\t'))
                return;}
          
                default :
                
                wsClient.send(JSON.stringify({
                  eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                  eventId: jsonMessage.eventId,
                  eventType: "ok",
              }, null, '\t'));
                  break;}
                
            switch (jsonMessage.eventType) {
                case 'ECHO':
                    wsClient.send(jsonMessage.data);
                    break;
                case 'ping':
                  wsClient.send(JSON.stringify({
                    eventId: jsonMessage.eventId,
                    eventType: "pong"
                }, null, '\t'));

                  //wsClient.send (JSON.stringify(PONG, null, '\t'));
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
                      eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                      eventId: uuidv4(),
                      eventType: "messageDelivered",
                      payload: {
                          messageId: jsonMessage.eventId,
                      }
                        }, null, '\t'));
                      }, 1000);

                      setTimeout(function() {
                        wsClient.send(JSON.stringify({
                          eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                          eventId: uuidv4(),
                          eventType: "messageRead",
                          payload: {
                              messageId: jsonMessage.eventId,
                          }
                            }, null, '\t'));
                          }, 2000);

                setTimeout(function() {
                    wsClient.send(JSON.stringify({
                            eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                            eventId: uuidv4(),
                            eventType: "typing",
                            payload: {
                              "authorName": "Евгений"
                              }
                        }, null, '\t'));
                      }, 3000);
                      setTimeout(function() {
                        wsClient.send(JSON.stringify({
                                eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                                eventId: uuidv4(),
                                eventType: "typing",
                                payload: {
                                  "authorName": "Евгений"
                                  }
                            }, null, '\t'));
                          }, 6000);
                  setTimeout(function() {
                wsClient.send(JSON.stringify({
                        eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                        eventId: uuidv4(),
                        eventType: "messageToClient",
                        payload: {
                          message: {
                              messageId: uuidv4(),
                              text: text(),
                              time: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                              type: "text"
                          }
                      },
                    }, null, '\t'));
                  }, 9000);
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
  "eventDateTime": dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
  "eventId": uuidv4(),
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
  "eventDateTime": dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
  "eventId": uuidv4(),
  "eventType": "history",
  "payload": {
    "events": [
      {
          "eventDateTime": "2022-06-29 15:20:22,213",
          "eventId": "4f84c968-6847-40df-a118-0f028e2b895e",
          "eventType": "messageFromClient",
          "message": {
            "MessageId": "4f84c968-6847-40df-a118-0f028e2b895e",
            "userType": "CUSTOMER",
            "type": "text",
            "text": "..."
          },
          "last": true
      },
      {
        "eventDateTime": "2022-06-29 15:19:24,213",
        "eventId": "ee6bff78-279d-45f2-a8ad-632a2aba301a",
        "eventType": "messageToClient",
        "message": {
          "authorName": "Operator Operatorovich",
          "MessageId": "ee6bff78-279d-45f2-a8ad-632a2aba301a",
          "userType": "OPERATOR",
          "type": "text",
          "text": "Ну конечно продавать и выходить в рубль. Видите - растет?!",
          "quote": {
            "MessageId": "d2f0e43d-4362-40b8-b086-d7d64aa970a2",
            "text": "И снова здравствуйте! Сегодня доллар по 52р./шт. что теперь мне делать?"
          }
        },
        "last": false
      },
      {
        "eventDateTime": "2022-06-29 15:18:44,213",
        "eventId": "182c6bbd-856e-4e11-baa3-9c9239346418",
        "eventType": "messageFromClient",
        "message": {
          "MessageId": "182c6bbd-856e-4e11-baa3-9c9239346418",
          "userType": "CUSTOMER",
          "type": "text",
          "text": "Кажется, я потерял все рубли..."
        },
        "last": false
      },
      {
          "eventDateTime": "2022-06-29 15:17:44,213",
          "eventId": "d2f0e43d-4362-40b8-b086-d7d64aa970a2",
          "eventType": "messageFromClient",
          "message": {
            "MessageId": "d2f0e43d-4362-40b8-b086-d7d64aa970a2",
            "userType": "CUSTOMER",
            "type": "text",
            "text": "И снова здравствуйте! Сегодня доллар по 52р./шт. что теперь мне делать?",
            "quote": {
              "MessageId": "df89b311-4c4d-43a9-9ce3-47ad1098607f",
              "authorName": "Petr Petrovich",
              "text": "Здравствуйте! Конечно покупать! Иторически доллар всегда рос. Будет по 250!"
            }
          },
          "last": false
        },
        {
          "eventDateTime": "2022-03-11 10:17:22,113",
          "eventId": "65d479cd-cf8a-41ee-87ab-8e177712cd60",
          "eventType": "messageToClient",
          "message": {
            "authorName": "Operator Operatorovich",
            "MessageId": "65d479cd-cf8a-41ee-87ab-8e177712cd60",
            "userType": "OPERATOR",
            "type": "text",
            "text": "Не благодарите, всего доброго, держитесь там!",
          },
          "last": false
        },
        {
          "eventDateTime": "2022-03-11 10:16:47,213",
          "eventId": "88e43c1a-a27b-4567-8be3-165b8e0dcc79",
          "eventType": "messageFromClient",
          "message": {
            "MessageId": "88e43c1a-a27b-4567-8be3-165b8e0dcc79",
            "userType": "CUSTOMER",
            "type": "text",
            "text": "Спасибо, вы мне очень помогли! :)"
          },
          "last": false
        },
        {
          "eventDateTime": "2022-03-11 10:15:44,213",
          "eventId": "df89b311-4c4d-43a9-9ce3-47ad1098607f",
          "eventType": "messageToClient",
          "message": {
            "authorName": "Operator Operatorovich",
            "MessageId": "df89b311-4c4d-43a9-9ce3-47ad1098607f",
            "userType": "OPERATOR",
            "type": "text",
            "text": "Здравствуйте! Конечно покупать! Иторически, доллар всегда рос. Будет по 250!",
            "quote": {
              "MessageId": "ee6bff78-279d-45f2-a8ad-632a2aba300a",
              "text": "Добрый день! Доллар по 120 рублей, что мне делать?"
            }
          },
          "last": false
        },
        {
          "eventDateTime": "2022-03-11 10:10:44,213",
          "eventId": "ee6bff78-279d-45f2-a8ad-632a2aba300a",
          "eventType": "messageFromClient",
          "message": {
            "MessageId": "ee6bff78-279d-45f2-a8ad-632a2aba300a",
            "userType": "CUSTOMER",
            "type": "text",
            "text": "Добрый день! Доллар по 120 рублей, что мне делать?"
          },
          "last": false
        }
    ]
  }
}

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
  "serverDatetime": dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000')
}
let PONG = {
    "eventId": uuidv4(),
    "eventType": "pong"
};
