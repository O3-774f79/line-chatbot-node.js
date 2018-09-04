// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    let msg = req.body.events[0].message.text
    let type = req.body.events[0].message.type
    reply(reply_token, msg, type)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token,msg,type) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {NZmbMY1LEsmLHz2dr76gAuyIk/0XmrcO+QaRJP5IwG6DkBsdCZ85lSxahZTsXox5ArGCkOCre9U3BPy56aYZH6NBS3nMX0uEfBbJR4sxz1vj3S1mE/u/oy7rctpXo94vCMHlRQZCQB4CxEetsHrHTgdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
    console.log(msg)
    console.log(type)
}