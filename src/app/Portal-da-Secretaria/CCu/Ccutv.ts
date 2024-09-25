import { CCu } from "./CCu";

export interface Ccutv {
    ccutvstamp: string;
    ccustamp: string;
    codigo: number;
    descricao: string;
    status: string;
    codarm: number;
    armazem: string;
    tervendsusp: boolean;
    cCu: CCu;
    ccutvdoc: Ccutvdoc[];
    ccutvdocdi: Ccutvdocdi[];
}
export interface Ccutvdoc {
    ccutvdocstamp: string;
    ccutvstamp: string;
    sigla: string;
    descricao: string;
    padrao: boolean;
    ccutv: Ccutv;
}
export interface Ccutvdocdi {
    ccutvdocdistamp: string;
    ccutvstamp: string;
    sigla: string;
    descricao: string;
    padrao: boolean;
    ccutv: Ccutv;
}