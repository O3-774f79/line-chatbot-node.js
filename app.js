var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()
const pvList = ["181230", "1812341"]
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.post('/webhook', (req, res) => {
    var text = req.body.events[0].message.text
    var sender = req.body.events[0].source.userId
    var replyToken = req.body.events[0].replyToken
    console.log(text, sender, replyToken)
    console.log(typeof sender, typeof text)
    // console.log(req.body.events[0])
    if (text === 'pv' || text === 'PV' || text == 'Pv') {
        sendText(sender, text)
    } else if (text === 'approve' || text === 'Approve' || text === 'APPROVE') {
        handleApproveAfterSender(sender, text)
    } else if (text === 'reject' || text === 'Reject' || text === 'REJECT') {
        handleRejectAfterSender(sender, text)
    } else if (text === 'detail' || text === 'Detail' || text === 'DETAIL') {
        handleDetailAfterSender(sender, text)
    }
    res.sendStatus(200)
})
const handleDetailAfterSender = (sender, text) => {
    let data = {
        to: sender,
        messages: [{
            "type": "flex",
            "altText": "This is a Flex Message",
            "contents": {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "horizontal",
                    "spacing": "xs",
                    "contents": [{
                        "type": "box",
                        "layout": "horizontal",
                        "spacing": "xs",
                        "contents": [{
                                "type": "text",
                                "text": "text"
                            },
                            {
                                "type": "text",
                                "text": "text"
                            },
                        ],
                    }, {
                        "type": "box",
                        "layout": "horizontal",
                        "spacing": "xs",
                        "contents": [{
                                "type": "text",
                                "text": "text"
                            },
                            {
                                "type": "text",
                                "text": "text"
                            },
                        ],
                    }],
                },
            }
        }]
    }
    request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {MGRThT+csre3jFIXIvy56JGL4+VoXVxAOacI6QKFdhAc9HauHlS7pPPpH9CqRG+1LJ2GTJPYb+imxlZLtBNXrHRNEnv0W272PRLUjp7ed6iRW4zKEs192vU8vvompoXNYBVfmSdMYpx4NbNx2IyhTwdB04t89/1O/w1cDnyilFU=}'
        },
        url: 'https://api.line.me/v2/bot/message/push',
        method: 'POST',
        body: data,
        json: true
    }, function (err, res, body) {
        if (err) console.log('error')
        if (res) console.log('success')
        if (body) console.log(body)
    })
}
const handleRejectAfterSender = (sender, text) => {
    let data = {
        to: sender,
        messages: [{
            type: 'text',
            text: 'ส่งคืนเอกสารหมายเลข $$$$$$$'
        }]
    }
    request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {MGRThT+csre3jFIXIvy56JGL4+VoXVxAOacI6QKFdhAc9HauHlS7pPPpH9CqRG+1LJ2GTJPYb+imxlZLtBNXrHRNEnv0W272PRLUjp7ed6iRW4zKEs192vU8vvompoXNYBVfmSdMYpx4NbNx2IyhTwdB04t89/1O/w1cDnyilFU=}'
        },
        url: 'https://api.line.me/v2/bot/message/push',
        method: 'POST',
        body: data,
        json: true
    }, function (err, res, body) {
        if (err) console.log('error')
        if (res) console.log('success')
        if (body) console.log(body)
    })
}
const handleApproveAfterSender = (sender, text) => {
    let data = {
        to: sender,
        messages: [{
            type: 'text',
            text: 'อนุมัติเอกสารหมายเลข $$$$$$$'
        }]
    }
    request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {MGRThT+csre3jFIXIvy56JGL4+VoXVxAOacI6QKFdhAc9HauHlS7pPPpH9CqRG+1LJ2GTJPYb+imxlZLtBNXrHRNEnv0W272PRLUjp7ed6iRW4zKEs192vU8vvompoXNYBVfmSdMYpx4NbNx2IyhTwdB04t89/1O/w1cDnyilFU=}'
        },
        url: 'https://api.line.me/v2/bot/message/push',
        method: 'POST',
        body: data,
        json: true
    }, function (err, res, body) {
        if (err) console.log('error')
        if (res) console.log('success')
        if (body) console.log(body)
    })
}

const sendText = (sender, text) => {
    let data = {
        to: sender,
        messages: [{
            "type": "template",
            "altText": "this is a carousel template",
            "template": {
                "type": "carousel",
                "columns": [{
                    // "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                    "title": "this is menu",
                    "text": "description",
                    "actions": [{
                            "type": "message",
                            "label": "Approve",
                            "text": "approve"
                        },
                        {
                            "type": "message",
                            "label": "Reject",
                            "text": "reject"
                        },
                        {
                            "type": "message",
                            "label": "ดูรายละเอียด",
                            "text": "detail"
                        }
                    ]
                }, {
                    // "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                    "title": "this is menu",
                    "text": "description",
                    "actions": [{
                            "type": "postback",
                            "label": "Buy",
                            "data": "action=buy&itemid=222"
                        },
                        {
                            "type": "postback",
                            "label": "Add to cart",
                            "data": "action=add&itemid=222"
                        },
                        {
                            "type": "uri",
                            "label": "View detail",
                            "uri": "http://example.com/page/222"
                        }
                    ]
                }]
            }
        }]

    }
    request({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {MGRThT+csre3jFIXIvy56JGL4+VoXVxAOacI6QKFdhAc9HauHlS7pPPpH9CqRG+1LJ2GTJPYb+imxlZLtBNXrHRNEnv0W272PRLUjp7ed6iRW4zKEs192vU8vvompoXNYBVfmSdMYpx4NbNx2IyhTwdB04t89/1O/w1cDnyilFU=}'
        },
        url: 'https://api.line.me/v2/bot/message/push',
        method: 'POST',
        body: data,
        json: true
    }, function (err, res, body) {
        if (err) console.log('error')
        if (res) console.log('success')
        if (body) console.log(body)
    })
}

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'))
})