export interface TurmaNota{
    id:number
    alunonome:string;
    alunostamp:string;
    anosem:string;
    aprovado:boolean;
    ativo:boolean;
    codSit:number;
    coddis:string;
    codetapa:number
    cursostamp:string;
   // data:string; vou inicializar com um valor predefinido
    //datafecho:string; Estamos a dizer que todos os campos da turmanota devem ter valores, neste caso, o codsit está vazio
    disciplina:string;
    e1:number;
    e2:number;
    es:number;
    fecho:boolean;
    media:number;
    mediafinal:number;
    motivo:string;
    n1:number;
    n2:number;
    n3:number;
    n4:number;
    n5:number;
    no:number;
    pestamp:string;
    pestamp2:string;
    profnome:string;
    profnome2:string;
    resultado:string;
    resultadofinal:string;
    sem:string;
    turmanotastamp:string;
    turmastamp:string;
  
    }


export interface Turmanota1View {
    turmanotastamp: string;
    turmastamp: string;
    no: string;
    alunostamp: string;
    alunoNome: string;
    n1: string;
    n2: string;
    n3: string;
    n4: string;
    n5: string;
    media: string;
    data: string;
    aprovado: boolean;
    coddis: string;
    disciplina: string;
    anosem: string;
    sem: string;
    cursostamp: string;
    e1: number;
    e2: number;
    es: number;
    mediafinal: number;
    pestamp: string;
    profnome: string;
    pestamp2: string;
    profnome2: string;
    fecho: boolean;
    obs: string;
    datafecho: string;
    resultado: string;
    resultadoFinal: string;
    codSit: number;
    codetapa: string;
    activo: boolean;
    motivo: string;
    sexo3: string;
    sala21: string;
    curso23: string;
    periodo24: string;
    departamento25: string;
    director26: string;
    patente27: string;
    prof28: string;
    dire29: string;
    nivel: string;
    res30: string;
}