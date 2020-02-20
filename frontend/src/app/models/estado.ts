import { DBEntityState, IEntityBase  } from "./IEntityBase";

export class Estado implements IEntityBase { 
  id: number;
  uf: number;
  nome: string;
  state: DBEntityState = DBEntityState.unchanged;
}
