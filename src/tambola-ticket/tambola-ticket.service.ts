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

  async fetchTicketsFromDatabase(
    setNumber: number,
    limit?: number,
    offset?: number,
  ) {
    try {
      limit = limit || setNumber * 6;
      offset = offset || 0;

      const tickets = await this.tambolaTicketModel.findAll({
        where: {
          setNumber,
        },
        limit,
        offset,
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

      const modifiedArray = this.placeZero(ticket);
      const response = this.sortArrayColumn(modifiedArray);

      return [response];
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

  sortArrayColumn(sampleArray) {
    for (let j = 0; j < 9; j++) {
      let a = sampleArray[0][j];
      let b = sampleArray[1][j];
      let c = sampleArray[2][j];

      let sortedArray;
      if (a !== 0 && b !== 0 && c !== 0) {
        sortedArray = [a, b, c].sort((x, y) => x - y);
        sampleArray[0][j] = sortedArray[0];
        sampleArray[1][j] = sortedArray[1];
        sampleArray[2][j] = sortedArray[2];
      } else if (a !== 0 && b !== 0 && c === 0) {
        sortedArray = [a, b].sort((x, y) => x - y);
        sampleArray[0][j] = sortedArray[0];
        sampleArray[1][j] = sortedArray[1];
        sampleArray[2][j] = 0;
      } else if (a !== 0 && c !== 0 && b === 0) {
        sortedArray = [a, c].sort((x, y) => x - y);
        sampleArray[0][j] = sortedArray[0];
        sampleArray[1][j] = 0;
        sampleArray[2][j] = sortedArray[1];
      } else if (b !== 0 && c !== 0 && a === 0) {
        sortedArray = [b, c].sort((x, y) => x - y);
        sampleArray[0][j] = 0;
        sampleArray[1][j] = sortedArray[0];
        sampleArray[2][j] = sortedArray[1];
      } else {
        continue;
      }
    }

    return sampleArray;
  }
}
