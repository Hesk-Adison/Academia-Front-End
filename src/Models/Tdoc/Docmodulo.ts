import { Tdoc } from "./tdoc";

export interface Docmodulo {
    docmodulostamp: string;
    codigo: string;
    descricao: string;
    estado: boolean | null;
    rltstamp: string;
    tdistamp: string;
    tdocstamp: string;
    tdocfstamp: string;
    //tdi: Tdi;
    //tdocf: Tdocf;
    tdoc: Tdoc;
   // rlt: Rlt;
}