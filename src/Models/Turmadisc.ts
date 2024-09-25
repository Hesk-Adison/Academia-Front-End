import { Turmadiscp } from "./Turmadiscp"

// export interface Turmadisc{

//     turmadiscstamp :string
//     turmastamp :string
//     ststamp :string
//      referenc :string
//     disciplina :string
// }

export interface Turmadisc {
    turmadiscstamp: string;
    turmastamp: string;
    ststamp: string;
    referenc: string;
    disciplina: string;
    turmadiscp: Turmadiscp[];
}