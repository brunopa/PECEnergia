import { DBEntityState } from "./IEntityBase";
import { User } from "./user";

export class LogData {
  id: number;
  usuario: string;
  data: Date;
  operacao?: DBEntityState;
  descricao?: string;
}
