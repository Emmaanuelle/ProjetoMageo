'use strict'
const User = use('App/Models/User');
const Database = use('Database');

class UserController {
    async index({ request, response, view }) {
        const user = await User.all()
        return user
    }

    async store({ request, response }) {
        const data = request.only([
            "nome",
            "email",
            "senha",
            "idade",

        ])
        const user = await User.create(data)
        return user
        
    }




}
module.exports = UserController
