import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-lanamento',
  templateUrl: './lanamento.component.html',
  styleUrls: ['./lanamento.component.scss']
})
export class LanamentoComponent implements OnInit {
  fomteste!:FormGroup
  Testando: string=''

ngOnInit(): void {

    
}

veja(){
 console.log(this.Testando)
}

animalControl = new FormControl<Animal | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  animals1: Animal[] = [
    {name: 'Dog', sound: 'Woof!'},
    {name: 'Cat', sound: 'Meow!'},
    {name: 'Cow', sound: 'Moo!'},
    {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
  ];
//matcher = new MyErrorStateMatcher();
}
  

