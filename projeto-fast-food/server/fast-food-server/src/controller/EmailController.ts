import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from 'src/service/EmailService';

@Controller('email')
export class  EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/sendEmail')
  async sendPasswordRecoveryEmail(@Body() userData: any) {
    this.emailService.sendPasswordRecoveryEmail(userData.email);
  }
}