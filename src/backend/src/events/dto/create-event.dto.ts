import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
  IsISO8601,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  event: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  category: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  totalHours: number;
}
