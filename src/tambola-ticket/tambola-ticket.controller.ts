import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Query,
  Logger,
} from '@nestjs/common';
import { TambolaTicketService } from './tambola-ticket.service';
import { Response } from 'express';

@Controller('tambola')
export class TambolaTicketController {
  logger: Logger;
  constructor(private readonly tambolaTicketService: TambolaTicketService) {
    this.logger = new Logger('TambolaTicketController');
  }

  @Post('/generate')
  async createTicket(
    @Res() res: Response,
    @Body() body: { setNumber: number },
  ) {
    try {
      const setNumber = body.setNumber;

      if (!setNumber || setNumber <= 0) {
        this.logger.error('Invalid input for setNumber');
        return res.status(400).json({ error: 'Invalid input for setNumber' });
      }

      const fetchedTickets =
        await this.tambolaTicketService.fetchTicketsFromDatabase(setNumber);

      if (fetchedTickets.length === setNumber * 6) {
        return res.json({
          tickets: fetchedTickets.reduce((acc, ticket) => {
            acc[ticket.ticketNumber] = ticket.ticketData;
            return acc;
          }, {}),
        });
      }

      const remainingTickets = [];
      for (let i = fetchedTickets.length + 1; i <= setNumber * 6; i++) {
        const ticketArray = await this.tambolaTicketService.generateTicket();

        remainingTickets.push({
          ticketData: ticketArray[0],
          ticketNumber: i,
        });
      }

      await this.tambolaTicketService.saveTicketsToDatabase(
        remainingTickets,
        setNumber,
      );

      const allTickets =
        await this.tambolaTicketService.fetchTicketsFromDatabase(setNumber);

      return res.json({
        tickets: allTickets.reduce((acc, ticket) => {
          acc[ticket.ticketNumber] = ticket.ticketData;
          return acc;
        }, {}),
      });
    } catch (error) {
      this.logger.error(`Error in createTicket: ${error.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  @Get('/getTickets')
  async getTickets(
    @Res() res: Response,
    @Query() query: { setNumber: number; limit: number; offset: number },
  ) {
    try {
      const setNumber = query.setNumber;

      if (!setNumber || setNumber <= 0) {
        this.logger.error('Invalid input for setNumber');
        return res.status(400).json({ error: 'Invalid input for setNumber' });
      }

      const fetchedTickets =
        await this.tambolaTicketService.fetchTicketsFromDatabase(
          setNumber,
          query.limit,
          query.offset,
        );

      if (fetchedTickets.length === 0) {
        return res
          .status(404)
          .json({ error: 'No tickets found for the given setNumber' });
      }

      return res.json({
        tickets: fetchedTickets.reduce((acc, ticket) => {
          acc[ticket.ticketNumber] = ticket.ticketData;
          return acc;
        }, {}),
      });
    } catch (error) {
      this.logger.error(`Error in getTickets: ${error.message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
