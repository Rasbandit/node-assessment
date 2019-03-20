
let userData = require('./userData.json')
next = 101
module.exports = {
    getUsers: (req, res) => {
        let { age, email, favorites } = req.query
        if (age) {
            let ageData = userData.filter(user => user.age < age)
            res.status(200).send(ageData)

        } else if (email) {
            let emailData = userData.filter(user => user.email == email)
            res.status(200).send(emailData)

        } else if (favorites) {
            // includes returns a boolean, so it would be better to just use the implicit return using .includes
            let favoritesData = userData.filter(user => user.favorites.includes(favorites))
            res.status(200).send(favoritesData)

        } else {
            res.status(200).send(userData)
        }
    },
    getUsersId: (req, res) => {
        let { id } = req.params
        data = userData.filter(user => user.id === +id);
        console.log(data)
        if (data.length > 0) {
            res.status(200).send(data[0])
        } else {
            res.sendStatus(404)
        }
    },
    getAdmin: (req, res) => {
        //                                  parenthesis here is not technically needed but does not cause an issue
        let data = userData.filter(user => user.type === 'admin')
        res.status(200).send(data)
    },

    nonAdmin: (req, res) => {
        let data = userData.filter(user => user.type !== 'admin')
        res.status(200).send(data)
    },

    type: (req, res) => {
        let { type } = req.params
        let data = userData.filter(user => user.type == type)
        res.status(200).send(data)
    },

    updateUser: (req, res) => {
        // It looks like this broke your update user

        let updateUser = userData.findIndex(user => user.id == req.params.id);
        userData.splice(updateUser, 1, req.body);
        res.status(200).send(user);

    },

    newUser: (req, res) => {
        let newUser = req.body
        newUser.id = next;
        next++;
        userData.push(newUser)
        res.status(200).send(userData)
    },

    delete: (req, res) => {
        // this is not a good idea, as you will only remove the correct while the id's match the index by one.
        // you should rewrite this to not rely on the index being 1 off from the id.

        let removedUser = userData.findIndex(user => user.id == req.params.id)
        userData.splice(removedUser, 1)
        console.log(removedUser)

        res.status(200).send(userData)
    }
}
