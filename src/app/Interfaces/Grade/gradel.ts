export interface gradel{

       gradelstamp:string;
       gradestamp:string;
       codetapa:string;//
       etapa:string;//ordem etapa 
       coddisc:string;
       displina:string;
       ststamp:string;//representa o stamp da disciplina 
       semstamp:string;//stamp do semestre 
       categoria:string;
       opcao:boolean;        
        credac:number;//credito Academico        
        cargahtotal:number;//somatorio de teorica e pratica         
        cargahteorica:number;//carga Horaria contacto         
        cargahpratica:number;//carga Horaria de estudo 
      prec:boolean;//Indica se a disciplina tem precedencia 
      
}