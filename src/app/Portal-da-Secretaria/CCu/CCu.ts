import { Ccu_Arm } from "./Ccu_Arm";
import { Ccu_Caixa } from "./Ccu_Caixa";
import { Ccudep } from "./Ccudep";
import { Ccutv } from "./Ccutv";

export interface CCu {
    ccustamp: string;
    empresastamp: string;
    nome: string;
    codCcu: string;
    descricao: string;
    codigo: string;
    status: string;
    defeito: boolean;
    morada: string;
    email: string;
    cell: string;
    nuit: number;
    padrao: boolean;
    controlanumcl: boolean;
    controlanumfnc: boolean;
    minimocl: number;
    maximocl: number;
    minimofnc: number;
    maximofnc: number;
    director: string;
    ccuCaixa: Ccu_Caixa[];
    ccuArm: Ccu_Arm[];
    ccuTv: Ccutv[];
    ccudep: Ccudep[];
}