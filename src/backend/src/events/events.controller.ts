import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  async findAll() {
    const responseObj = {
      message: 'Events retrieved successfully',
      events: await this.eventsService.findAll(),
    };
    return responseObj;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const responseObj = {
      message: 'Event retrieved successfully',
      event: await this.eventsService.findOne(+id),
    };

    return responseObj;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    const responseObj = {
      message: 'Event updated successfully',
      event: await this.eventsService.update(+id, updateEventDto),
    };

    return responseObj;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const responseObj = {
      message: 'Event deleted successfully',
      event: await this.eventsService.remove(+id),
    };

    return responseObj;
  }
}
