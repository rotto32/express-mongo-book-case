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

  const b = new Book({title: req.body.title, author: req.body.author})

  b.save()
  .then((result) => 
    res.send(result)
  )
  .catch(err => {
    res.status(500).send(err)
  })

})

app.get('/books', (req, res, next) => {
  Book.find()
  .then((result) => 
    res.send(result)
  )
  .catch(err => {
    res.status(500).send(err)
  })
})

app.get('/books/:id', (req, res, next) => {
  Book.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } } )
  .then((result) => 
    res.send(result)
  )
  .catch(err => {
    res.status(500).send(err)
  })
})

app.delete('/books/:id', (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
  .then((result) => 
    res.send(result)
  )
  .catch(err => {
    res.status(500).send(err)
  })
})

app.patch('/books/:id', (req, res, next) => {
  Book.updateOne({_id:req.params.id},{title:req.body.title, author:req.body.author })
  .then((result) => 
    res.send(result)
  )
  .catch(err => {
    res.status(500).send(err)
  })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})