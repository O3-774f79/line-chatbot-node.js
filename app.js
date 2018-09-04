const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครัช'
    };

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});
// // Reply with two static messages

// const express = require('express')
// const bodyParser = require('body-parser')
// const request = require('request')
// const app = express()
// const port = process.env.PORT || 4000
// app.use(bodyParser.urlencoded({
//     extended: false
// }))
// app.use(bodyParser.json())
// app.post('/webhook', (req, res) => {
//     let reply_token = req.body.events[0].replyToken
//     let msg = req.body.events[0].message.text
//     reply(reply_token)
//     res.sendStatus(200)
// })
// app.listen(port)

// function reply(reply_token, msg) {
//     let headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer {NZmbMY1LEsmLHz2dr76gAuyIk/0XmrcO+QaRJP5IwG6DkBsdCZ85lSxahZTsXox5ArGCkOCre9U3BPy56aYZH6NBS3nMX0uEfBbJR4sxz1vj3S1mE/u/oy7rctpXo94vCMHlRQZCQB4CxEetsHrHTgdB04t89/1O/w1cDnyilFU=}'
//     }
//     let body = JSON.stringify({
//         replyToken: reply_token,
//         messages: [{
//             "type": "template",
//             "altText": "this is a carousel template",
//             "template": {
//                 "type": "carousel",
//                 "columns": [{
//                         "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
//                         "title": "this is menu",
//                         "text": "description",
//                         "actions": [{
//                                 "type": "postback",
//                                 "label": "Buy",
//                                 "data": "action=buy&itemid=111"
//                             },
//                             {
//                                 "type": "postback",
//                                 "label": "Add to cart",
//                                 "data": "action=add&itemid=111"
//                             },
//                             {
//                                 "type": "uri",
//                                 "label": "View detail",
//                                 "uri": "http://example.com/page/111"
//                             }
//                         ]
//                     },
//                     {
//                         "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
//                         "title": "this is menu",
//                         "text": "description",
//                         "actions": [{
//                                 "type": "postback",
//                                 "label": "Buy",
//                                 "data": "action=buy&itemid=222"
//                             },
//                             {
//                                 "type": "postback",
//                                 "label": "Add to cart",
//                                 "data": "action=add&itemid=222"
//                             },
//                             {
//                                 "type": "uri",
//                                 "label": "View detail",
//                                 "uri": "http://example.com/page/222"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         }]
//     })
//     request.post({
//         url: 'https://api.line.me/v2/bot/message/reply',
//         headers: headers,
//         body: body
//     }, (err, res, body) => {
//         console.log('status = ' + res.statusCode);
//     });
//     console.log(reply_token)

// }