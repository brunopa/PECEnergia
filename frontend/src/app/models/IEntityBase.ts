import { LogData } from "src/app/models/logusuario";

export enum DBEntityState {
  unchanged = 0,
  inserted = 1,
  altered = 2,
  deleted = 3,
}

export interface IEntityBase {
  id: number;
  state: DBEntityState;
  lasLog?: LogData;
}
/*
function loadParcial<T>(init?: Partial<T>) {

  Object.assign(this, init);
}
*/
