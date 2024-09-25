import { Fact } from "./Fact";

export interface Factreg {
    factregstamp: string;
    factstamp: string;
    ccstamp: string;
    descricao: string;
    nrdoc: number;
    valpreg: number;
    valorreg: number;
    fact: Fact;
}