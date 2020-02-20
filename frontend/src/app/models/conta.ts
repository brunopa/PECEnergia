import { DBEntityState, IEntityBase  } from "./IEntityBase";

export class Conta implements IEntityBase { 
  id: number;
  banco: number;
  espConta: string;
  numeroConta: string;
  numeroAgencia: string;
  titular: string;
  documento: string;
  valor: number;
  periodicidade: string;
  dataBaseCorrecao: string;
  state: DBEntityState = DBEntityState.unchanged;
}
