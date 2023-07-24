const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Provide a password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jamalkhidir:${password}@cluster0.zyzn2pc.mongodb.net/contactsapp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

if (process.argv.length > 3) {
    person.save().then(result => {
        console.log(`Added ${process.argv[3]} ${process.argv[4]} to the phonebook!`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}