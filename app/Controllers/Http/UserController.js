'use strict'
const User = use('App/Models/User');
const Database = use('Database');

class UserController {
    async index({ request, response, view }) {  // visualizar todos os usiarios cadastrados no banco
        const user = await User.all()           // pegando todos os usuarios
        return user                             // retornando a lista de usuarios cadastrados
    }

    async store({ request, response }) {       // cadastrando os usuarios
        const data = request.only([            // requisitando apenas os dados abaixo
            "nome",
            "email",
            "senha",
            "idade",

        ])
        const user = await User.create(data)     //criando os dados que estão atribuidos na variavel data
        return user                              // retornando os dados criados

    }
    async update({ request, response, params }) {
        const user = await User.findOrFail(params.id) // editar os dados
        const data = request.only([                   // pegar os dados para editar
            "nome",
            "email",
            "senha",
            "idade",

        ])

        user.merge(data)   //compara os dados que foram editados
        await user.save()  // salvando os dados editados
        return user        // retornando os dados editados

    }

    async login({request,auth}){

        const{email,senha} = request.all();
        const token = await auth.attempt(email, senha);
        return token;

    }

}
module.exports = UserController
