'use strict'

const nodemailer = require('nodemailer');
const crypto = require('crypto')
const moment = require('moment')
const User = use('App/Models/User')
const Mail = use('Mail')
const Env = use('Env')

const transport = nodemailer.createTransport({
  host: Env.get('MAIL_HOST'),
  port: Env.get('MAIL_PORT'),
  auth: {
      user: Env.get('MAIL_USERNAME'),
      pass: Env.get('MAIL_PASSWORD'),
  }
});
class EsqueciSenhaController {
  async store ({ request, response }) {
    try {
      // Solicitando o email para o Usuário
      const { email } = request.only(['email'])

      //Verficando se o email existe
      const user = await User.findByOrFail('email', email)

      // Registrando um novo token
      user.token = crypto.randomBytes(10).toString('hex') // gerando um token aleatório
      user.token_created_at = new Date() // data de quando o token foi criado.

      await user.save() // Salvando o token para o usuário

      const app_url =  Env.get('FRONT_URL');// Variável de ambiente para o endereço do frontend
      
      // Realizando o envio de email
     await transport.sendMail({
        to: email,
        from: Env.get('MAIL_USERNAME'),
        html: `
        <strong>Recuperação de senha</strong>
        <p>
        parece que você fez uma requisição de redefinir a senha com o email: 
        </p>
        <p>
            ${email}
        </p>
        <a href=${app_url}/criarNovaSenha/${user.token}>Clique para Criar uma nova senha</a>
        <p>Atenciosamente,</p>
        <p>MageoQuiz</p>
        <p>Emanuelle Fereira</p>
        `,
        subject:"Recuperação de senha - Mageo ",
    }, (err) => {
        if (err) {
            console.log(err);
            return response.status(400).send({ error: { message: "Erro ao enviar o email" } })
        }
        return response.status(200).send({message:'Email enviado com sucesso'})
    })
      // await Mail.send(
      //   'emails.forgotpass',
      //   { email, link: `http://127.0.0.1:3000/criarNovaSenha/${user.token}` },
      //   message => {
      //     message.from(Env.get('MAIL_USERNAME'))
      //     message.to(email)
      //     message.subject('Esqueceu a Senha')
      //   }
      // )
    } catch (err) {
        console.log(err)
      return response.status(err.status).send({
        error: {
          message:
            'Algo deu errado. Este email não é válido'
        }
      })
    }
  }

  async update ({ request, response, params }) {
    try {
      const { senha } = request.all() // Solicitando a senha para que seja alterada
      const { token } = params

      const user = await User.findByOrFail('token', token) // verificando se o token gerado é do usuário mesmo.

      // verificando se o token expirou
      const tokenExpired = moment()
        /**
         * pegando o exato momento da requisição do token e verificando
         * e subtraindo 1 dia para que o token possa estar valido
         */
        .subtract(1, 'days')
        /**
         * verificando se o dia atual é válido para o token
         */
        .isAfter(user.token_created_at)

      // Se o token expirou, retorna um erro
      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message:
              'Seu token expirou, por favor solicite um novo'
          }
        })
      }

      // se o token é válido
      user.token = null // apaga o token atual
      user.token_created_at = null // apaga o dia do token gerado
      user.senha = senha // troca a senha

      await user.save()
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Algo deu errado, o token está inválido.'
        }
      })
    }
  }
}

module.exports = EsqueciSenhaController 