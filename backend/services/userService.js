const UserDAO = require('../models/userDAO')

class User {
    /**
     * get existing user
     * @param {String} data user filter data
     * @returns object
     */
    static async getUser(data) {
        try {
            const user = await UserDAO.findOne({ email: data })
           
            return user
        } catch (error) {
            console.error(`Unable to get user, ${error}`)
            return {}
        }
    }
    /**
     * get existing user by id
     * @param {String} id user id
     * @returns object
     */
    static async getUserById(id) {
        try {
            const user = await UserDAO.findById({ _id: id }).select('-password')
            return user
        } catch (error) {
            console.error(`Unable to get user, ${e}`)
            return {}
        }
    }

    /**
     * create new user 
     * @param {String} email user email
     * @param {String} email user email
     * @param {String} email user email
     * @returns object
     */
    static async createUser(name, email, password) {
        try {
            const user = await UserDAO.create({ name, email, password })
            return user
        } catch (error) {
            console.error(`Unable to create user, ${error}`)
            return {}
        }
    }

    /**
     * get all users     
     * @returns array
     */
    static async getUserList() {
        try {
            const list = await UserDAO.find({}).select('-password')
            return list
        } catch (error) {
            console.error(`Unable to get users list, ${e}`)
            return []
        }
    }

}

module.exports = User