export interface rltview{
       rltstamp :string;
        numero :number;
       descricao :string;
        tipofilter :number;
       comboqry1 :string;//representa o querry de centro de custo 
       tmgrid :string;
       clnbold :string;
       clmmask :string;
       clnheader :string;
       clnalign :string;
       clncor :string;
       clntab :string;      
       crquery :string;
       tabela :string;
       comboqry2 :string;//representa o querry do ano 
       comboqry3 :string;//representa os nomes das colunas para o mapa
       comboqry4 :string;//representa os tamanhos das colunas para o mapa
       comboqry5 :string;//representa a Origem para relatorio de tipo painel 
       comboqry6 :string;//representa o filtro de intervalo entre anos 
       comboqry7 :string;//representa o querry da moeda 
       comboqry8 :string;
       comboqry9 :string;
        tiporlt :number;
       filtros :string;
       descfiltroentredatas :string;
       filtroentredatas :string;

       descfiltroentreanos :string;
       filtroentreanos :string;

       descfiltroano :string;
       filtroano :string;
       descfiltrodata :string;
       filtrodata :string;

       codmodulo :string;//sigla do modulo associado 
       modulo :string;//descricao do modulo associado 
        mostracfe :number;//mostra o campos:  1-cliente, 2-fornecedor, 3-entidade
        clnreport :boolean;  
        usamoeda :boolean;
        rltgrafico :boolean;
        pos :boolean;//Visível em pOs 
        mostrapj :boolean;//mostra o campo projecto
        mostrafp :boolean;//mostra formas de pagamento 
        mostratesoura :boolean;//mostra tesouraria  
        naomostram :boolean;//Nao mostra moeda Naomostramoeda 
        mostraprc :boolean;//mostra o processanento de salario
        geramapa :boolean;                 
        mostracurso :boolean;
        mostraturma :boolean;
        mostraplanocur :boolean;//plano curricular 
        mostradisciplina :boolean;
        mostraanosem :boolean;//ano semestre 
        mostraprof :boolean;//ano professor 
        mostraetapasem :boolean;//ano etapa ou semestre          
        mostrausr :boolean;//mostra utilizador no relatorio
        mostracorredor :boolean;//mostra corredor no relatorio(usado no módulo de tpm)
       reportxml :string;


              
       xmlstring :string;
    
 }