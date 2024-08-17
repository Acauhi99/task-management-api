import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum TaskStatusEnum {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

//Para validacoes de dados precisa ser uma classe
export class TaskDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  description: string;

  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status: TaskStatusEnum;

  @IsDateString()
  expirationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}

export class TaskRouterParameters {
  @IsUUID()
  id: string;
}
