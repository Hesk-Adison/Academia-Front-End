import { Turmanota1 } from "./Turma";

export interface Estudante{
    anosem :string;
    curso :string;
    cursostamp :string;
    disciplina :string;
    ststamp :string;
    turma :string;
    turmanota: Turmanota1[];
    turmastamp :string;
}


export interface  ReportPauta
{
  estudante: Estudante;
    filename:string;
    origem:string;
    xmlstring:string;
}











