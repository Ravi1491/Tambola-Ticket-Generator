import { Module } from '@nestjs/common';
import { TambolaTicketService } from './tambola-ticket.service';
import { TambolaTicketController } from './tambola-ticket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TambolaTicket } from './entities/tambola-ticket.entity';

@Module({
  imports: [SequelizeModule.forFeature([TambolaTicket])],
  controllers: [TambolaTicketController],
  providers: [TambolaTicketService],
})
export class TambolaTicketModule {}
