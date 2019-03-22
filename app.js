const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

const app = express()

// Mongoose setup //////////////

// connect to database books
const db = mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true } )

// create schema for your data
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    views: { type: Number, default: 0 }
  }, 
  {
    timestamps: true
  }
)

// associate schema with mongodb database
const Book = mongoose.model('Book', bookSchema)

// Mongoose setup //////////////

app.use(bodyParser.json())

app.post('/books', (req, res, next) => {
  // TODO: add create code here 
  Book.create(req.body, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  })
})

app.get('/books', (req, res, next) => {
  // TODO: add get all code here 
  // Book.find((err, result)=>{
  //   if (err) {
  //     return res.status(404).send(err);
  //   }
  //   res.send(result);

  // })
  Book.find()
  .then(result => {res.send(result)})
  .catch(err => {err.status(404).send(err)});
  
})

app.get('/books/:id', (req, res, next) => {
  // TODO: add get ont code here 
  Book.findById(req.params.id)
  .then(result =>{res.send(result)})
  .catch(err =>{err.status(404).send(err)})
})

app.delete('/books/:id', (req, res, next) => {
  // TODO: add delete one code here 
  Book.findByIdAndDelete(req.params.id)
  .then(result=>{res.send(result)})
  .catch(err =>{err.status(404).send(err)})
})

app.patch('/books/:id', (req, res, next) => {
  // TODO: add update one code here 
  Book.update({_id: req.params.id}, req.body)
  .then(result =>{res.send(result)})
  .catch(err=>res.status(500).send(err));

})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})