import { Controller, Post, Body } from '@nestjs/common';
import { TambolaTicketService } from './tambola-ticket.service';

@Controller('tambola-ticket')
export class TambolaTicketController {
  constructor(private readonly tambolaTicketService: TambolaTicketService) {}

  @Post()
  generateTicket(@Body() body: { N: number }) {
    console.log(body.N);
    return body.N;
  }
}
