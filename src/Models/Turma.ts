export interface Turmanota1{

        turmanotastamp:  string,
        turmastamp : string,
        no : string,
        alunostamp : string,
        alunoNome : string,
        n1:string,
        n2:string,
        n3:string,
        n4:string,
        n5:string,
        media:string,
        data:Date,
        aprovado:boolean
        coddis:string,
        disciplina:string,
        anosem : string,
        sem : string,
        cursostamp : string,
        e1:string,
        e2:string, //Exame Recurso     
        es:string //Exame especial 
        mediafinal:string,
         pestamp : string,
         Profnome : string,
         pestamp2 : string,
         profnome2 : string,
         fecho: boolean//Fechar o diario pelo professor (Basta fechar nao tera mais possibilidade de alterar)
        //Dados adicionados e alterados
         datafecho:Date,
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