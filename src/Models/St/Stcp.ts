import { St } from "./St";

export interface Stcp {
    stcpstamp: string;
    refcp: string;
    descricao: string;
    quantcp: number;
    precocp: number;
    servico: boolean;
    ststamp: string;
    status: boolean;
    ivainc: boolean;
    oristamp: string;
    totall: number;
    st: St;
}