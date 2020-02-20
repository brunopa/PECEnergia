import { DBEntityState, IEntityBase } from "./IEntityBase";

export class User implements IEntityBase{
  id: number;
  nome: string;
  email: string;
  token: string;
  theme: string;
  state: DBEntityState;
}
