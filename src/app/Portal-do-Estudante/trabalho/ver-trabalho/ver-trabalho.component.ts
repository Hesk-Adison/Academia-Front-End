import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Trabalho } from 'src/Models/trabalho';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-ver-trabalho',
  templateUrl: './ver-trabalho.component.html',
  styleUrls: ['./ver-trabalho.component.scss']
})
export class VerTrabalhoComponent {

  titloAccao: string='';
  isSpinnerDisplayed: boolean=false;

  totalrecordturma:number=0;
  totalrecordturma1:number=0;

  closeDialog() {

    this.modalActual.close("true");
  }


  ngAfterViewInit(): void {

this.path= `${environment.APIurl}Repor`
this.setUrl(this.filename)
  }


  cadastro!:FormGroup
filename:string=''

ngOnInit(): void {
}
path:string= `${environment.APIurl}Repor`
src: SafeResourceUrl | undefined;
constructor(private sanitizer: DomSanitizer,
  private modalActual: MatDialogRef<VerTrabalhoComponent>,
  @Inject(MAT_DIALOG_DATA) public trabalho: Trabalho,
) {
  this.filename=this.trabalho.path;
}
private _isLoading$ = new BehaviorSubject<boolean>(false);

get isLoading$() {
  return this._isLoading$.asObservable();
}
setUrl(fileName:string) {
  this._isLoading$.next(true);
  this.cleanup();
  this.src = this.bypassAndSanitize(`${this.path}/LeituraDeFicheiros?ficheiro=${fileName}`);
  setTimeout(() => {
    this._isLoading$.next(false);
  }, 150);
}

cleanup() {
  this.src = "";
}

bypassAndSanitize(url:string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

}
