'use strict'
const User = use('App/Models/User');
//const Database = use('Database');
// Validador de Senha
var passwordValidator = require('password-validator');
var schema = new passwordValidator();

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
                "dataNascimento",
            ])
            // Procurando no banco de dados
            const userExists = await User.findBy('email', data.email)

            // se o usuário não existe, não salva
            if (userExists) {
                return response
                    .status(400)
                    .send({ message: { error: 'Email Cadastrado' } })
            }
            //Verifica se o nome contem números
            if(/\d/.test(data.nome)){
                return response
                .status(400)
                .send({ message: { error: 'Nome não pode conter números' } })
              }

              if(/\d/.test(data.sobrenome)){ //verificando se o sobrenome contem números
                return response
                .status(400)
                .send({ message: { error: 'Sobrenome não pode conter números' } })
              }

            schema
            .is().min(8)                                    // a senha deve ter no minimo 8 caracteres
            .is().max(100)                                  // a senha deve ter no minimo 100 caracteres 
            .has().uppercase([1])                           // pelo menos 1 letar maiuscula
            .has().lowercase()                              // pelo menos 1 letra minuscula
            .has().digits(2)                                // pelo menos 2 digitos
            .has().symbols([1])	                            // pelo mesnos um caracter especial
            .has().not().spaces()                           // Snão pode conter espaço
            .is().not().oneOf(['Passw0rd', 'Password123','12345','senha']); // senhas proibidas de serem colocadas
            if(!schema.validate(data.senha)){ // validando a senha
              return response
              .status(400)
              .send({ message: { error: 'Senha Fraca, deve ter no mínimo 8 caracteres tem que ter no mínimo 1 letra Maiuscula, Dois Digitos, Sem espaço, 1 caracter especial' } })
            }   
            //Verificando a data de nascimento
            const dataAtual = new Date()// Pegando a data atual
            const dataNascimento = new Date(data.dataNascimento) //convertendo a dataNascimento para o tipo Date
            if(dataNascimento >=dataAtual){//Verificando se a data de nascimento é maior ou igual ao dia de hoje
                return response
              .status(400)
              .send({ message: { error: 'Data inválida' } })  
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
                "dataNascimento",

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
