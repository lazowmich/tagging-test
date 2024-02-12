import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const t = 100;
    const j = "feat 1"
    const k = "feat 3"
    return this.appService.getHello();
  }
}
