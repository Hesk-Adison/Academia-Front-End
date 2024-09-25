import { Pgf } from "./Pgf";

export interface Pgfl {
    pgflstamp: string;
    pgfstamp: string;
    fccstamp: string;
    nrdoc: number;
    valorpreg: number;
    valorreg: number;
    status: boolean;
    data: string;
    descricao: string;
    numinterno: string;
    origem: string;
    mvalorpreg: number;
    mvalorreg: number;
    valorPend: number;
    mvalorPend: number;
    valordoc: number;
    mValordoc: number;
    anulado: boolean;
    cambiousd: number;
    descontofin: number;
    mDescontofin: number;
    perdescfin: number;
    rcladiant: boolean;
    pgf: Pgf;
}