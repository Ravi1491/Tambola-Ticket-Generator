import { Module } from '@nestjs/common';
import { TambolaTicketService } from './tambola-ticket.service';
import { TambolaTicketController } from './tambola-ticket.controller';

@Module({
  controllers: [TambolaTicketController],
  providers: [TambolaTicketService],
})
export class TambolaTicketModule {}
