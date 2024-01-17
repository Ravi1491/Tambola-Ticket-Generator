import { PartialType } from '@nestjs/mapped-types';
import { CreateTambolaTicketDto } from './create-tambola-ticket.dto';

export class UpdateTambolaTicketDto extends PartialType(CreateTambolaTicketDto) {}
