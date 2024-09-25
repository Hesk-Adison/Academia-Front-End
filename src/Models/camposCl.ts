import { clTurmaClass } from "./ClTurma";
import { Clbolsas } from "./Clbolsas";
import { Clcarts } from "./Clcarts";
import { Clcontacts } from "./Clcontacts";
import { Cldocs } from "./Cldocs";
import { Cls } from "./Cls";
import { Clturs } from "./Clturs";
import { planocurriculars } from "./planocurriculars";
import { Horarioview } from "./Horarioview";
import { Turmanota1 } from "./Turma";
import { Turmadisc } from "./Turmadisc";
import { turmass } from "./Turmass";
import { dividasalunoss } from "./dividasalunoss";

export interface camposCl{
    cl: Cls[],
    turmanotas:Turmanota1[],
    turmass: turmass[],
    dividasalunos:dividasalunoss[],
    cldocs: Cldocs[], 
    clcontacts: Clcontacts[],
    clbolsas : Clbolsas[] ,
    clturmas :clTurmaClass[],
    clturs :Clturs[],
    clcarts : Clcarts[],
    planocurriculars: planocurriculars[]
    Turmadisc:Turmadisc[],
    Horarioview: Horarioview[]
}

