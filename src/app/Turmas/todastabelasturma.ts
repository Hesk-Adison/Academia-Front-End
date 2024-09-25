export interface horario
{     
    horariostamp:string;
    turmastamp:string;
    turma:string;
    codigo:string;
    descricao:string;
    anosem:string;
    visualizar:boolean;// Visualizar horário a partir da data
    hactivo:boolean;//Hoarario activo ou em exercicio 
    horariol:horariol[];//Linhas do horario  
}
 export interface horariol
{
    horariolstamp:string;
    horariostamp:string;
    descricao:string;
    hora:string;
    segunda:string;
    terca:string;
    quarta:string;
    quinta:string;
    sexta:string;
    sabado:string;
    domingo:string;
}



   export interface turma
   {
       turmastamp:string;
       codigo:string;
       descricao:string;
       anoSemstamp:string;
       descanoaem:string;
       descurso:string;
       cursostamp:string;
       descgrade:string;
       gradestamp:string;
       etapa:string;
       sala:string;
       turno:string;
       vagasmin:string;
       vagasmax:string;
       responsavel:string;
       responsavel2:string;
        semanaslec:number;//Nº de semanas lectivas 
        horasaulas:number;//Nº de horas aulas por semana 
        formaaval:string;//Forma de avaliacao 
        situacao:string;//Selecione a situação da turma entre Em Inscrição (matrículas), Em Andamento (turma em atividade) e Concluída (finalizada)
       
        obs:string;
        datain:Date;
        datafim:Date;
        horain:Date;
        horafim:Date;
        codetapa:string;
       turmal:turmal[];//Alunos
       turmadisc:turmadisc[];//Disciplinas 
       turmanota:turmanota[];//Lancamento de notas  
   }
       
       export interface turmal
{
    turmalstamp :string;
    turmastamp :string;
    clstamp :string;
    no :string;
    nome :string;
   activo :boolean;//True=matrícula cancelada e false = matrícula activa
    
    motivo :string;//Motivo pelo qual lhe leva ao cancelamento da matrícula

}
export interface turmadisc
{
     turmadiscstamp:string;
     turmastamp:string;
     ststamp:string;
     referenc:string;
     disciplina:string;
    turmadiscp:turmadiscp[];//Professores 
}

export interface turmadiscp
{
    turmadiscpstamp :string;
    turmadiscstamp :string;
    pestamp :string;
    ststamp :string;
    nome :string;
       
}
export interface turmanota{

       turmanotastamp:  string,
       turmastamp : string,
       no : string,
       alunostamp : string,
       alunoNome : string,
       n1:number,
       n2:number,
       n3:number,
       n4:number,
       n5:number,
       media:number,
       data:string
       aprovado:boolean
       coddis:string,
       disciplina:string,
       anosem : string,
       sem : string,
       cursostamp : string,
       e1:number,
       e2:number, //Exame Recurso     
       es:number //Exame especial 
       mediafinal:number,
        pestamp : string,
        profnome : string,
        pestamp2 : string,
        profnome2 : string,
        fecho: boolean//Fechar o diario pelo professor (Basta fechar nao tera mais possibilidade de alterar)
       //Dados adicionados e alterados
        datafecho:string,
        resultado:string,     //Para Obter todos admitidos/Excluidos
        resultadoFinal:string,   //Para obter todas stuacoes
       //de resultados nos exames
        codSit: number, //1=exluido,2=admitido,3=dispensado
       //,4=aprovado,5=reprovado
        codetapa: string   
        activo: boolean //True=matrícula cancelada e false = matrícula activa
        motivo : string,//Motivo pelo qual lhe leva ao cancelamento da matrícula    
        obs : string, //Motivo pelo qual lhe leva ao cancelamento da matrícula    
 
   

}
      
      