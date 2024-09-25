import { Fact } from "./Fact";

export interface Factprest {
    factpreststamp: string;
    factstamp: string;
    descricao: string;
    data: string;
    perc: number;
    valor: number;
    obs: string;
    status: boolean;
    fact: Fact;
}