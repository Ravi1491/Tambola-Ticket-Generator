import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TambolaTicket } from './entities/tambola-ticket.entity';
import { Op } from 'sequelize';

@Injectable()
export class TambolaTicketService {
  constructor(
    @InjectModel(TambolaTicket)
    private tambolaTicketModel: typeof TambolaTicket,
  ) {}

  async saveTicketsToDatabase(tickets, setNumber: number) {
    const ticketRecords = tickets.map((ticket) => ({
      ticketData: ticket.ticketData,
      ticketNumber: ticket.ticketNumber,
      setNumber,
    }));

    return this.tambolaTicketModel.bulkCreate(ticketRecords);
  }

  async fetchTicketsFromDatabase(N) {
    const tickets = await this.tambolaTicketModel.findAll({
      where: {
        setNumber: N,
      },
      order: [['ticketNumber', 'ASC']],
    });

    return tickets;
  }

  async generateTicket() {
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
  }

  placeZero(sampleArray) {
    let count = 0;
    const usedPosition = new Set();

    for (let i = 0; i < sampleArray.length; i++) {
      count++;
      if (count > 2) {
        usedPosition.clear();
        count = 0;
      }

      for (let j = 0; j < 4; j++) {
        let randomNo;

        do {
          randomNo = Math.floor(Math.random() * 9);
        } while (usedPosition.has(randomNo));

        const removeNo = sampleArray[i][randomNo];
        sampleArray[i][randomNo] = 0;
        usedPosition.add(randomNo);
      }
    }

    return sampleArray;
  }
}
