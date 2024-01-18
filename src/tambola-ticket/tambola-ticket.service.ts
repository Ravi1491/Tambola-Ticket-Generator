import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TambolaTicket } from './entities/tambola-ticket.entity';

@Injectable()
export class TambolaTicketService {
  logger: Logger;
  constructor(
    @InjectModel(TambolaTicket)
    private tambolaTicketModel: typeof TambolaTicket,
  ) {
    this.logger = new Logger('TambolaTicketService');
  }

  async saveTicketsToDatabase(tickets, setNumber: number) {
    try {
      const ticketRecords = tickets.map((ticket) => ({
        ticketData: ticket.ticketData,
        ticketNumber: ticket.ticketNumber,
        setNumber,
      }));

      return this.tambolaTicketModel.bulkCreate(ticketRecords);
    } catch (error) {
      this.logger.error(`Error in saveTicketsToDatabase: ${error.message}`);
      throw error;
    }
  }

  async fetchTicketsFromDatabase(setNumber: number) {
    try {
      const tickets = await this.tambolaTicketModel.findAll({
        where: {
          setNumber,
        },
        order: [['ticketNumber', 'ASC']],
      });

      return tickets;
    } catch (error) {
      this.logger.error(`Error in fetchTicketsFromDatabase: ${error.message}`);
      throw error;
    }
  }

  async generateTicket() {
    try {
      const ticket = Array.from({ length: 3 }, () => Array(9).fill(0));
      const generatedNumbers = new Set();

      for (let j = 0; j < ticket.length; j++) {
        for (let i = 0; i < 9; i++) {
          let randomNo: number;

          do {
            randomNo = Math.floor(Math.random() * 9) + i * 10 + 1;
          } while (generatedNumbers.has(randomNo));

          generatedNumbers.add(randomNo);
          ticket[j][i] = randomNo;
        }
      }

      const finalArray = this.placeZero(ticket);
      return [finalArray];
    } catch (error) {
      this.logger.error(`Error in generateTicket: ${error.message}`);
      throw error;
    }
  }

  placeZero(sampleArray) {
    try {
      let count = 0;
      const usedPosition = new Set();

      for (let i = 0; i < sampleArray.length; i++) {
        count++;
        if (count > 2) {
          usedPosition.clear();
          count = 0;
        }

        for (let j = 0; j < 4; j++) {
          let randomNo: number;

          do {
            randomNo = Math.floor(Math.random() * 9);
          } while (usedPosition.has(randomNo));

          sampleArray[i][randomNo] = 0;
          usedPosition.add(randomNo);
        }
      }

      return sampleArray;
    } catch (error) {
      this.logger.error(`Error in placeZero: ${error.message}`);
      throw error;
    }
  }
}
