import { IVL } from "./IVL";

export interface IV {
    ivstamp: string;
    numdoc: number;
    sigla: string;
    descricao: string;
    numero: number;
    data: string;
    total: number;
    datalanc: string;
    lancado: boolean;
    numinterno: string;
    ccusto: string;
    codccu: string;
    obs: string;
    iVL: IVL[];
}