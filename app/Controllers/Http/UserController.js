'use strict'
const User = use('App/Models/User');
const Database = use('Database');

class UserController {
    async index({ request, response, view }) {  // visualizar todos os usiarios cadastrados no banco
        const user = await User.all()           // pegando todos os usuarios
        return user                             // retornando a lista de usuarios cadastrados
    }
    // cadastrando os usuarios
    async store({ request, response }) {
        try {

            const data = request.only([            // requisitando apenas os dados abaixo
                "nome",
                "sobrenome",
                "email",
                "senha",
                "idade",
            ])
            // Procurando no banco de dados
            const userExists = await User.findBy('email', data.email)

            // se o usuário não existe, não salva
            if (userExists) {
                return response
                    .status(400)
                    .send({ message: { error: 'Usuário já cadastrado' } })
            }

            const user = await User.create(data)     //criando os dados que estão atribuidos na variavel data
            return user                              // retornando os dados criados
        } catch (erro) {
            return response
                .status(erro.status)
                .send(erro)
        }
    }
    // editar os dados
    async update({ request, response, params }) {
        try {
            const user = await User.findByOrFail('email', request.header('email'))
            const data = request.only([                   // pegar os dados para editar
                "nome",
                "sobrenome",
                "email",
                "senha",
                "idade",

            ])

            await user.merge(data)   //compara os dados que foram editados
            await user.save()  // salvando os dados editados
            return user        // retornando os dados editados            
        } catch (error) {
            return response
                .status(404)
                .send({ message: "Usuário não encontrado" })
        }

    }

    async login({ request, auth }) {

        const { email, senha } = request.all();
        const token = await auth.attempt(email, senha);
        return token;

    }
    async perfil({ request }) {
        try {
            const user = await User.findByOrFail('email', request.header('email'))
            return user;
        } catch (error) {
            return response
                .status(404)
                .send({ message: "Usuário não encontrado" })
        }

    }

}
module.exports = UserController
