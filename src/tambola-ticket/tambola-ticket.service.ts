import { Injectable } from '@nestjs/common';
import { CreateTambolaTicketDto } from './dto/create-tambola-ticket.dto';
import { UpdateTambolaTicketDto } from './dto/update-tambola-ticket.dto';

@Injectable()
export class TambolaTicketService {
  create(createTambolaTicketDto: CreateTambolaTicketDto) {
    return 'This action adds a new tambolaTicket';
  }

  findAll() {
    return `This action returns all tambolaTicket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tambolaTicket`;
  }

  update(id: number, updateTambolaTicketDto: UpdateTambolaTicketDto) {
    return `This action updates a #${id} tambolaTicket`;
  }

  remove(id: number) {
    return `This action removes a #${id} tambolaTicket`;
  }
}
