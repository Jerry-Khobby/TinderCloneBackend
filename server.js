import express from 'express';
import mongoose from 'mongoose';
import cards from './dbCards.js';
import Cors from 'cors';


//app config
const app = express();
const PORT = process.env.PORT || 8000;
const connection_url = 'mongodb+srv://Jeremiah:tinderapp@cluster0.fxmxjge.mongodb.net/?retryWrites=true&w=majority'
    //middleware
app.use(express.json());
app.use(Cors());
// db config 
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//api endpoint
app.get('/', (req, res) => {
    res.status(200).send('Hello Clever Programmers')
});
app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
    cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201)

        }
    })
});
app.get('/tinder/cards', (req, res) => {
    cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
})



//listeners
app.listen(PORT, () => console.log(`listening on localhost ${PORT}`));