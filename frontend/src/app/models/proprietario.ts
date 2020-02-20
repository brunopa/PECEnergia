import { DBEntityState, IEntityBase } from "./IEntityBase";
import { Conta } from "./Conta";
import { Imovel } from "./Imovel";
import { Estado } from "./estado";


export class Proprietario implements IEntityBase {
  id: number;
  principal: boolean;
  nome: string;
  nacionalidade: string;
  profissao: string;
  rg: string;
  orgaoExpeditor: string;
  documento: string;
  estadoCivil: string;
  nascimento: Date;  
  nomeConjuge: string;
  nacionalidadeConjuge: string;
  profissaoConjuge: string;
  rgConjuge: string;
  orgaoExpeditorConjuge: string;
  documentoConjuge: number;
  estadoCivilConjuge: string;
  nascimentoConjuge: Date;
  endereco: string;
  cidade: string;
  bairro: string;
  numero: string;
  complemento: string;
  estado: Estado = new Estado();
  cep: string;
  idTotvs: string;
  state: DBEntityState = DBEntityState.unchanged;
}
