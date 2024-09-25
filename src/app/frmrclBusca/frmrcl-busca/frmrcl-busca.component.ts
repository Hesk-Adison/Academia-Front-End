import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-frmrcl-busca',
  templateUrl: './frmrcl-busca.component.html',
  styleUrls: ['./frmrcl-busca.component.scss']
})
export class FrmrclBuscaComponent {

  cadastro!:FormGroup
  constructor(
    private modalActual: MatDialogRef<FrmrclBuscaComponent>,
  ) {

  }


  Fechar(){
    this.modalActual.close()
  }
}
