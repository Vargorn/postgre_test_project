import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class AgeRangeDto {
  @ApiProperty({ example: 18, minimum: 1, maximum: 120 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(120)
  @IsNotEmpty()
  minAge: number;

  @ApiProperty({ example: 25, minimum: 1, maximum: 120 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(120)
  @IsNotEmpty()
  maxAge: number;
}