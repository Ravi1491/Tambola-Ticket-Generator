import { Controller, Post, Body, Res } from '@nestjs/common';
import { TambolaTicketService } from './tambola-ticket.service';
import { Response } from 'express';

@Controller('tambola-ticket')
export class TambolaTicketController {
  constructor(private readonly tambolaTicketService: TambolaTicketService) {}

  @Post()
  async createTicket(@Res() res: Response, @Body() body: { N: number }) {
    const N = body.N;

    if (!N || N <= 0) {
      return res.status(400).json({ error: 'Invalid input for N' });
    }

    const fetchedTickets =
      await this.tambolaTicketService.fetchTicketsFromDatabase(N);

    if (fetchedTickets.length === N * 6) {
      return res.json({
        tickets: fetchedTickets.reduce((acc, ticket) => {
          acc[ticket.ticketNumber] = ticket.ticketData;
          return acc;
        }, {}),
      });
    }

    const remainingTickets = [];
    for (let i = fetchedTickets.length + 1; i <= N * 6; i++) {
      const ticketArray = await this.tambolaTicketService.generateTicket();

      remainingTickets.push({
        ticketData: ticketArray[0],
        ticketNumber: i,
      });
    }

    await this.tambolaTicketService.saveTicketsToDatabase(remainingTickets, N);

    const allTickets =
      await this.tambolaTicketService.fetchTicketsFromDatabase(N);

    return res.json({
      tickets: allTickets.reduce((acc, ticket) => {
        acc[ticket.ticketNumber] = ticket.ticketData;
        return acc;
      }, {}),
    });
  }
}
