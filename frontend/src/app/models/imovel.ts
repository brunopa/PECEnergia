import { DBEntityState, IEntityBase  } from "./IEntityBase";

export class Imovel implements IEntityBase { 
  id: number;
  nome: number;
  situacao: string;
  municipio: string;
  estado: string;
  area: string;
  matricula: string;
  cri: string;
  ccir: string;
  nrf: string;
  state: DBEntityState = DBEntityState.unchanged;
}
