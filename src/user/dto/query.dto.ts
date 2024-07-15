import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsNotEmpty()
  page: string;

  @IsString()
  @IsNotEmpty()
  pageSize: string;

  @IsString()
  @IsNotEmpty()
  field: string;

  @IsString()
  @IsNotEmpty()
  sort: string;

  @IsString()
  @IsOptional()
  column: string;

  @IsString()
  @IsOptional()
  operator: string;

  @IsString()
  @IsOptional()
  value: string;
}
