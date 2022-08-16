//v4 11.08.2022
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
response.end (JSON.stringify({ 
  parameters: {
    typingEnabled: true,
    typingDelay: 3,
    typingDelta: 1,
    previewEnabled: true,
    deliveryStateEnabled: true,
    ratingCloseTimeout: 120,
    fileUploadTimeout: 120,
    fileCustomerUrl: "https://csc-ift.csctest.sberbank.ru/chat_cb/file/uploadToEcm",
    redirectTechSupportTopicId: 53399,
    widgetMetricsUrl: "https://iftmpclickstream.testonline.sberbank.ru:8098/metrics/partners",
    ratingEnabled: true,
    chatHistoryEnabled: true,
    fileUploadEnabled: true,
    rtdmEnabled: false,
    startChatButtonsEnabled: true,
    textAssistEnabled: true,
    systemMessageEnabled: true,
    redirectToAssistantCardEnabled: true
  },
    suggestions: [
    "Как пополнить счет; Как пополнить баланс на счете; Как внести нал на счет; Как внести кэш на свой счет; Внесение налички на счет",
    "Не могу скачать выписку; Как сделать выписку; Нужна выписка по счету; Не понимаю как сделать выписку по счету и скачать ее; Как выгрузить выписку"
  ],
    startButtons: [
    {buttonText:"Отправить платеж", "scenarioId": "cb_ckr_platej"},
    {buttonText:"Сформировать выписку", "scenarioId": "cb_ckr_vipiski"}
  ],
startMessages: [ "Добрый день! Чем могу помочь?", "Все системы работают в штатном режиме" ], 
systemMessage: ["алЯрм"], 
letterMapping: ["Уважаемый клиент! Вы можете решить свой вопрос в чате.", "Уважаемый клиент! Для быстрого решения"
  ], 
assistantCard: {header: "Меняемся, чтобы стать удобнее", text: "Виртуальный ассистент поможет решить вопрос, а если не справится - позовёт оператора.", buttonText: "Спросить ассистента" },
wssKey: "hsBlbuDTkk24srzEOTBUlZAlC2g",
serverDatetime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000')
}, null, '\t'));


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
        wsClient.send(JSON.stringify({      
          eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
          eventId: uuidv4(),
          eventType: "history",
          payload: {
            "lastMessage": false,
            "messages": [
              {
                "messageId": "b497d684-93d1-4e69-9536-f928de1552cf",
                "time": "2021-06-06T18:29:11.333+0000",
                "userType": "CUSTOMER",
                "text": "Спасибо! Вы мне очень помогли! Я рад, что Сбер оперативно решает вопросы своих клиентов :)",
                "messageStatus": "messageRead",
                "quote": {
                  "messageId": "d0028f40-8b45-4f99-b63d-fceb670c4d4d",
                  "text": "Согласно вашему документу мы внесли изменение в реквизиты Вашей компании. Теперь ваша проблема 1 решена. Всего доброго!",
                  "authorName": "Евгений"
                }
              },
              {
                "messageId": "d0028f40-8b45-4f99-b63d-fceb670c4d4d",
                "time": "2021-06-06T18:25:33.223+0000",
                "userType": "OPERATOR",
                "authorName": "Евгений",
                "text": "Согласно вашему документу мы внесли изменение в реквизиты Вашей компании. Теперь ваша проблема 1 решена. Всего доброго!",
                "messageStatus": "messageRead"
              },
              {
                "messageId": "9f000409-aed6-45c3-b07f-a76373bf2565",
                "time": "2021-06-06T18:21:22.111+0000",
                "userType": "CUSTOMER",
                "messageStatus": "messageRead",
                "fileInfo": {
                  "ecmId": "5aab1ca0-5d28-413a-a100-6b0cc178d5af",
                  "name": "document.pdf",
                  "size": "10485760"
                }
              },
              {
                "messageId": "b7095bba-73b9-4c23-907e-1a5a088441bc",
                "time": "2021-06-06T18:20:44.555+0000",
                "userType": "CUSTOMER",
                "text": "Хорошо, я сейчас подготовлю и направлю документ.",
                "messageStatus": "messageRead",
                "quote": {
                  "messageId": "c90e34e3-c1e3-4ae7-bf22-e11531003e3f",
                  "text": "Здравствуйте! Для решения Вашего вопроса необходимо предоставить документ №1. После этого, мы сможем решить Вашу проблему.",
                  "authorName": "Евгений"
                }
              },
              {
                "messageId": "c90e34e3-c1e3-4ae7-bf22-e11531003e3f",
                "time": "2021-06-06T18:19:41.104+0000",
                "userType": "OPERATOR",
                "authorName": "Евгений",
                "text": "Здравствуйте! Для решения Вашего вопроса необходимо предоставить документ №1. После этого, мы сможем решить Вашу проблему.",
                "messageStatus": "messageRead",
                "quote": {
                  "messageId": "c22da6c0-40f3-4794-8153-e68f092c74a8",
                  "text": "Добрый день! У меня есть проблема номер 1"
                }
              },
              {
                "messageId": "c22da6c0-40f3-4794-8153-e68f092c74a8",
                "time": "2021-06-06T18:18:44.213+0000",
                "userType": "CUSTOMER",
                "text": "Добрый день! У меня есть проблема номер 1",
                "messageStatus": "messageRead"
              }
            ]
          }
      }, null, '\t'));
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
                case 'getHistory':
                    setTimeout(function() {
                      wsClient.send(JSON.stringify({
                  
                        eventDateTime: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                        eventId: uuidv4(),
                        eventType: "history",
                        payload: {
                          "lastMessage": true,
                          "messages": [
                            {
                              "messageId": "b497d684-93d1-4e69-9536-f928de1552cf",
                              "time": "2021-05-05T17:18:51.222+0000",
                              "userType": "CUSTOMER",
                              "text": "Спасибо! Все отлично, мой вопрос №0 решен!",
                              "messageStatus": "messageRead",
                              "quote": {
                                "messageId": "ecd7d127-ef93-47a5-8835-380e1c98325d",
                                "text": "Уважаемый клиент, я решил Ваш вопрос №0",
                                "authorName": "Дмитрий"
                              }
                            },
                            {
                              "messageId": "b22a3db5-56cc-4526-8304-4b7ef358b5c9",
                              "time": "2021-05-05T17:18:50.222+0000",
                              "userType": "CUSTOMER",
                              "text": "Спасибо! Все отлично, мой вопрос №0 решен!",
                              "messageStatus": "messageRead",
                              "quote": {
                                "messageId": "ecd7d127-ef93-47a5-8835-380e1c98325d",
                                "text": "Уважаемый клиент, я решил Ваш вопрос №0",
                                "authorName": "Дмитрий"
                              }
                            },
                            {
                              "messageId": "ecd7d127-ef93-47a5-8835-380e1c98325d",
                              "time": "2021-05-05T17:17:41.222+0000",
                              "userType": "OPERATOR",
                              "authorName": "Дмитрий",
                              "text": "Уважаемый клиент, я решил Ваш вопрос №0",
                              "messageStatus": "messageRead"
                            },
                            {
                              "messageId": "2904d625-ff32-4d8f-bb33-463765aa383b",
                              "time": "2021-05-05T17:15:45.555+0000",
                              "userType": "CUSTOMER",
                              "text": "У меня есть вопрос №0",
                              "messageStatus": "messageRead"
                            },
                            {
                              "messageId": "78e426a6-c47c-4dcf-a450-3762200b3c20",
                              "time": "2021-05-05T17:15:44.555+0000",
                              "userType": "CUSTOMER",
                              "text": "У меня есть вопрос №0",
                              "messageStatus": "messageRead"
                            }
                          ]
                        }
                    }, null, '\t'));
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
                          userType: "OPERATOR",
                          message: {
                              messageId: uuidv4(),
                              text: "Готов ответить на ваш вопрос и решить проблему",
                              time: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS+0000'),
                              type: "text",
                              authorName: "Евгений"
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
    "eventDateTime": "2021-06-06Т18:18:45,767+0000",
    "eventId": "066d6558-8e0d-43cc-be85-99068a45f5fd",
    "eventType": "history",
    "payload": {
      "lastMessage": true,
      "messages": [
        {
          "messageId": "b497d684-93d1-4e69-9536-f928de1552cf",
          "time": "2021-06-06T18:29:11,333+0000",
          "userType": "CUSTOMER",
          "text": "Спасибо! Вы мне очень помогли! Я рад, что Сбер оперативно решает вопросы своих клиентов :)",
          "messageStatus": "messageRead",
          "quote": {
            "messageId": "d0028f40-8b45-4f99-b63d-fceb670c4d4d",
            "text": "Согласно вашему документу мы внесли изменение в реквизиты Вашей компании. Теперь ваша проблема 1 решена. Всего доброго!",
            "authorName": "Евгений"
          }
        },
        {
          "messageId": "d0028f40-8b45-4f99-b63d-fceb670c4d4d",
          "time": "2021-06-06T18:25:33,223+0000",
          "userType": "OPERATOR",
          "authorName": "Евгений",
          "text": "Согласно вашему документу мы внесли изменение в реквизиты Вашей компании. Теперь ваша проблема 1 решена. Всего доброго!",
          "messageStatus": "messageRead"
        },
        {
          "messageId": "9f000409-aed6-45c3-b07f-a76373bf2565",
          "time": "2021-06-06T18:21:22,111+0000",
          "userType": "CUSTOMER",
          "messageStatus": "messageRead",
          "fileInfo": {
            "ecmId": "5aab1ca0-5d28-413a-a100-6b0cc178d5af",
            "name": "document.pdf",
            "size": "10485760"
          }
        },
        {
          "messageId": "b7095bba-73b9-4c23-907e-1a5a088441bc",
          "time": "2021-06-06T18:20:44,555+0000",
          "userType": "CUSTOMER",
          "text": "Хорошо, я сейчас подготовлю и направлю документ.",
          "messageStatus": "messageRead",
          "quote": {
            "messageId": "c90e34e3-c1e3-4ae7-bf22-e11531003e3f",
            "text": "Здравствуйте! Для решения Вашего вопроса необходимо предоставить документ №1. После этого, мы сможем решить Вашу проблему.",
            "authorName": "Евгений"
          }
        },
        {
          "messageId": "c90e34e3-c1e3-4ae7-bf22-e11531003e3f",
          "time": "2021-06-06T18:19:41,104+0000",
          "userType": "OPERATOR",
          "authorName": "Евгений",
          "text": "Здравствуйте! Для решения Вашего вопроса необходимо предоставить документ №1. После этого, мы сможем решить Вашу проблему.",
          "messageStatus": "messageRead",
          "quote": {
            "messageId": "c22da6c0-40f3-4794-8153-e68f092c74a8",
            "text": "Добрый день! У меня есть проблема номер 1"
          }
        },
        {
          "messageId": "c22da6c0-40f3-4794-8153-e68f092c74a8",
          "time": "2021-06-06T18:18:44,213+0000",
          "userType": "CUSTOMER",
          "text": "Добрый день! У меня есть проблема номер 1",
          "messageStatus": "messageRead"
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
      {"buttonText":"Отправить платеж", "scenarioId": "cb_ckr_platej"},
      {"buttonText":"Сформировать выписку", "scenarioId": "cb_ckr_vipiski"}
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

let historyPage = {

  "eventDateTime": "2021-06-06Т18:18:45,767+0000",
  "eventId": "066d6558-8e0d-43cc-be85-99068a45f5fd",
  "eventType": "history",
  "payload": {
    "lastMessage": true,
    "messages": [
      {
        "messageId": "b497d684-93d1-4e69-9536-f928de1552cf",
        "time": "2021-05-05 17:18:51,222+0000",
        "userType": "CUSTOMER",
        "text": "Спасибо! Все отлично, мой вопрос №0 решен!",
        "messageStatus": "messageRead",
        "quote": {
          "messageId": "ecd7d127-ef93-47a5-8835-380e1c98325d",
          "text": "Уважаемый клиент, я решил Ваш вопрос №0",
          "authorName": "Дмитрий"
        }
      },
      {
        "messageId": "ecd7d127-ef93-47a5-8835-380e1c98325d",
        "time": "2021-05-05 17:17:41,222+0000",
        "userType": "OPERATOR",
        "authorName": "Дмитрий",
        "text": "Уважаемый клиент, я решил Ваш вопрос №0",
        "messageStatus": "messageRead"
      },
      {
        "messageId": "2904d625-ff32-4d8f-bb33-463765aa383b",
        "time": "2021-05-05 17:15:44,555+0000",
        "userType": "CUSTOMER",
        "text": "У меня есть вопрос №0",
        "messageStatus": "messageRead"
      }
    ]
  }
}
