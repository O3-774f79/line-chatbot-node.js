const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    try {
        let sender = req.body.events[0].source.userId
        let reply_token = req.body.events[0].replyToken
        let msg = req.body.events[0].message.text
        reply(reply_token, msg)
        // res.sendStatus(200)
        console.log(req.body.events[0].source)
        res.status(200).json({ "message": "success" })
    } catch (e) {
        console.log(e)
        res.status(200).json({ "message": "success" })

    }

})
app.get("/test", (req, res) => {
    res.status(200).json({ "message": "test" })
})
app.post("/test", (req, res) => {
    const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
    const LINE_HEADER = {
        "Content-Type": "application/json",
        "Authorization": 'Bearer FuqCE3Egmr6IJE+1ktAaj5L00b0LxSwJs1unU2GfXv5lWKlWh9LOWYJQ6vMfnv2jYg4Q13uGzad+uAsZzCE2+Ymk5zaRH9yMYR5vzl1vFzPA8mTGHx+a65T8tLHkrFSoHVMQoLwUpKFO6tZNslKj9gdB04t89/1O/w1cDnyilFU='
    };
    request.post({
        url: `${LINE_MESSAGING_API}/push`,
        headers: LINE_HEADER,
        body: JSON.stringify({
                    to: 'U21cd063434ae18892415a26d1770406a',
                    messages: [{
                        type: "text",
                        text: "สวัสดีหมู"
                    }]
                })
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
    res.status(200).json("success")
})
app.listen(port)
function reply(reply_token, msg) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer FuqCE3Egmr6IJE+1ktAaj5L00b0LxSwJs1unU2GfXv5lWKlWh9LOWYJQ6vMfnv2jYg4Q13uGzad+uAsZzCE2+Ymk5zaRH9yMYR5vzl1vFzPA8mTGHx+a65T8tLHkrFSoHVMQoLwUpKFO6tZNslKj9gdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: msg
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}