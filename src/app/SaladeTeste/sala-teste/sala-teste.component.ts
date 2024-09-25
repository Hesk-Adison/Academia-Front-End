import { Component, Inject, OnInit } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;}

@Component({
  selector: 'app-sala-teste',
  templateUrl: './sala-teste.component.html',
  // standalone: true,
  styleUrls: ['./sala-teste.component.scss'],
  // imports: [MatTreeModule, MatButtonModule, MatIconModule],
})
export class SalaTesteComponent implements OnInit{

  closeDialog() {  
    this.modalActual.close("true");
  }
  

  lista=[1,2,3,4,5]

  minDate: Date;
  maxDate: Date;

  constructor(

    private modalActual: MatDialogRef<SalaTesteComponent>,
    @Inject(MAT_DIALOG_DATA) public dadosestudantes: File,
  ) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);

  }

  mostra(){

   
    for(let i:any; i<this.lista.length; i++ ){
      
      
    }
  }

  ngOnInit(): void {

  
    
  }




}


