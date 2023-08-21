import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        event: createEventDto.event,
        category: createEventDto.category,
        startDate: createEventDto.startDate,
        endDate: createEventDto.endDate,
        totalHours: createEventDto.totalHours,
      },
    });
  }

  async findAll() {
    return this.prisma.event.findMany();
  }

  async findOne(id: number) {
    return this.prisma.event.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: {
        id,
      },
      data: {
        event: updateEventDto.event,
        category: updateEventDto.category,
        startDate: updateEventDto.startDate,
        endDate: updateEventDto.endDate,
        totalHours: updateEventDto.totalHours,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.event.delete({
      where: {
        id,
      },
    });
  }
}
