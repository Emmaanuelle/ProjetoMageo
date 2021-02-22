'use strict'

const nodemailer = require('nodemailer');
const moment = require('moment');
const crypto = require('crypto');
const User = use('App/Models/User');
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
  async store({ request, response }) {
    try {
      // Solicitando o email para o Usuário
      const { email } = request.only(['email'])

      //Verficando se o email existe
      const user = await User.findByOrFail('email', email)

      // Registrando um novo token
      user.token = crypto.randomBytes(10).toString('hex') // gerando um token aleatório
      user.token_created_at = new Date() // data de quando o token foi criado.

      await user.save() // Salvando o token para o usuário

      const app_url = Env.get('FRONT_URL');// Variável de ambiente para o endereço do frontend

      // Realizando o envio de email
      await transport.sendMail({
        to: email,
        from: Env.get('MAIL_USERNAME'),
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recuperação de Senha</title>
<style type="text/css">
/**
   * Collapse table borders to avoid space between cells.
   */
table {
	border-collapse: collapse !important;
}
</style>

</head>
<body style="background-color: #e9ecef;">
	<table style="width: 100%">

		
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<h1 style="font-size: 32px; font-weight: 700;">Recuperação de
					Senha</h1>
			</td>
		</tr>
		<tr>
			<td align="center" bgcolor="#e9ecef">
				<table style="max-width: 600px; width: 100%">
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p><strong>Olá ${user.nome} ${user.sobrenome}</strong></p>
              <p style="margin: 0;">Clique no botão para redefinir a sua
								senha, caso não tenha solicitado desconsidere este email.</p>
						</td>
					</tr>
					<tr>
						<td align="left" bgcolor="#ffffff">
							<table style="width: 100%">
								<tr>
									<td align="center" bgcolor="#ffffff" style="padding: 12px;">
										<table>
											<tr>
												<td align="center" bgcolor="#1a82e2"
													style="border-radius: 6px;">    <a href='${app_url}/criarNovaSenha/${user.token}'
													target="_blank"
													style="display: inline-block; padding: 16px 36px; font-size: 20px; color: #ffffff; text-decoration: none; border-radius: 6px;">Redefinir
														Senha</a></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td align="left" bgcolor="#ffffff"
							style="padding: 24px; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
							<p style="margin: 0;">
              <p>Atenciosamente,</p>
              <p>MageoQuiz</p>
              <p>Emanuelle Fereira</p>
							</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html> 
  `,
        subject: "Recuperação de senha - Mageo ",

      }, (err) => {
        if (err) {
          console.log(err);
          return response.status(400).send({ error: { message: "Erro ao enviar o email" } })
        }
        return response.status(200).send({ message: 'Email enviado com sucesso' })
      })

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

  async update({ request, response, params }) {
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