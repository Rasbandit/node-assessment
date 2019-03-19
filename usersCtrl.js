let userData = require('./userData.json')

module.exports = {
    getUser: (req, res) => {
        const fav = req.query.favorites
        const age = req.query.age
        const email = req.query.email
        console.log(req.query)

        // would be a good idea to put these in the if statments, so that you are not running these unesicarily
        const correctEmails = userData.filter(user => user.email === email)
        const correctAges = userData.filter(user => user.age < age)
        const correctFavs = userData.filter(user => user.favorites.includes(fav))

        // console.log(correctEmails)
        // console.log(correctAges)
        // console.log(correctFavs)
        if (fav) {
            res.status(200).send(correctFavs)
        } else if (age) {
            res.status(200).send(correctAges)
        } else if (email) {
            res.status(200).send(correctEmails)
        } else {
            res.status(200).send(userData)
        }

    },
    getUserId: (req, res) => {
        // console.log(req.params)
        const id = +req.params.id
        // console.log(id)
        const correctUser = userData.filter(user => user.id === id)
        if (correctUser[0]) {
            res.status(200).send(correctUser[0])
        } else {
            res.sendStatus(404)
        }
    },
    getAdmin: (req, res) => {
        const admins = userData.filter(user => user.type === 'admin')
        if (admins) {
            res.status(200).send(admins)
        } else {
            res.sendStatus(404)
        }
    },
    getNonAdmin: (req, res) => {
        const nonAdmins = userData.filter(user => user.type !== 'admin')
        if (nonAdmins) {
            res.status(200).send(nonAdmins)
        } else {
            res.sendStatus(404)
        }
    },
    getUserType: (req, res) => {
        const userType = req.params.userType
        const correctUsers = userData.filter(user => user.type === userType)

        if (correctUsers) {
            res.status(200).send(correctUsers)
        } else {
            res.sendStatus(404)
        }
    },
    editUser: (req, res) => {
        const id = +req.params.id

        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body

        const index = userData.findIndex(element => element.id === id)

        
        //using the spread operator here would save you a lot of typing
        userData[index].first_name = first_name || userData[index].first_name,
            userData[index].last_name = last_name || userData[index].last_name,
            userData[index].email = email || userData[index].email,
            userData[index].gender = gender || userData[index].gender,
            userData[index].language = language || userData[index].language,
            userData[index].age = age || userData[index].age,
            userData[index].city = city || userData[index].city,
            userData[index].state = state || userData[index].state,
            userData[index].type = type || userData[index].type,
            userData[index].favorites = favorites || userData[index].favorites

        res.status(200).send(userData)

    },
    addUser: (req, res) => {
        const newId = userData[userData.length - 1].id + 1

        //here you dustructure the req.body object from an object to a bunch of values then immediatly put them back into an object.
        // Would be better to use the spread operator or just add the id to the req.body
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body
        const newObj = { id: newId, first_name, last_name, email, gender, language, age, city, state, type, favorites }

        userData.push(newObj)

        res.status(200).send(userData)

    },
    deleteUser: (req, res) => {
        const id = +req.params.id
        console.log(id)
        // you could just comibine the two lines below into one and set userData = userData.filter
        const newArr = userData.filter(user => user.id !== id)
        userData = newArr
        res.status(200).send(userData)

    }
}
