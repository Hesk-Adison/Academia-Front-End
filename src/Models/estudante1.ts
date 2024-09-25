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
