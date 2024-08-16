//Para validacoes de dados precisa ser uma classe
export class TaskDto {
  id: string;
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}
