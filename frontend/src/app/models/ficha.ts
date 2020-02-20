import { DBEntityState, IEntityBase } from "./IEntityBase";
import { Conta } from "./Conta";
import { Imovel } from "./Imovel";
import { Proprietario } from "./Proprietario";


export class Ficha implements IEntityBase {
  id: number;
  proprietarios: Proprietario[] = [new Proprietario()];
  conta: Conta = new Conta();
  imovel: Imovel = new Imovel();
  state: DBEntityState = DBEntityState.unchanged;
}