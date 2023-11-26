import { Controller, Post, Body } from '@nestjs/common';

@Controller('email')
export class  EmailController {
  constructor() {}

  @Post('/sendEmail')
  async sendEmail(@Body() userData: any) {
    //TODO SEND EMAIL
  }
}