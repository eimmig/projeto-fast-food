import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'siteprog123@gmail.com',
        pass: 'siteprog',
      },
    });
  }

  async sendPasswordRecoveryEmail(to: string): Promise<void> {
    try {
      const newPassword = this.generateRandomPassword(8);

      const mailOptions = {
        from: 'siteprog123@gmail.com',
        to: to,
        subject: 'Recuperação de Senha',
        text: `Sua nova senha: ${newPassword}`,
      };

      // Enviar o e-mail
      await this.transporter.sendMail(mailOptions);

      console.log('E-mail de recuperação de senha enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail de recuperação de senha:', error);
    }
  }

  private generateRandomPassword(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    return password;
  }
}
