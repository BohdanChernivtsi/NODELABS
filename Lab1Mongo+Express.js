const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;


MongoClient.connect(new Server('localhost', 27017), (err, database) => {
    if (err) return console.log(err)
    const db = database.db('questionDB')
    app.use(cors())
    app.get('/api/articles', (req, res) => {
        db.collection('questionCollection').find().toArray((err, result) => {

            const randomQuestionArray = result.sort((el1, el2) => Math.random() - Math.random());
            const shortenedArray = randomQuestionArray.slice(0, 10);

            res.send(shortenedArray);
        })
    })

    app.post('/api/articles', function(req, res) {
        db.collection('questionCollection').save(req.body)
        res.send();
   });
   app.get('/api/articles/:id', function(req, res) {
    db.collection('questionCollection').find().toArray((err, result) => {

        const randomQuestionArray = result.sort((el1, el2) => Math.random() - Math.random());
        const shortenedArray = randomQuestionArray.slice(0, 10);
        for (let el of shortenedArray) {
            if (el.id === req.body.id) {
                res.send(el);
            }
        }
    })
   });
   app.put('/api/articles/:id', function (req, res){
    db.collection('questionCollection').updateOne(req.body.id, req.body.value)
   });
   app.delete('/api/articles/:id', function (req, res){
    db.collection('questionCollection').deleteOne(req.body.id)
            res.send(db.collection('questionCollection').deleteOne(req.body.id));
   })
   
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
