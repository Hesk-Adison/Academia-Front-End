import { Component, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Estudante } from 'src/Models/Estudante';
import { Turmanota1 } from 'src/Models/Turma';
import { EmailServiceService } from 'src/Service/EmailService/EmailService/email-service.service';
import { TurmaNotaService } from 'src/Service/turma-nota.service';
import { DadosLancamento } from 'src/app/GuardarSessoes/DadosLancamento';
import { DadosTemporarios } from 'src/app/GuardarSessoes/DadosTemporarios';
import { GuardarSessoes } from 'src/app/GuardarSessoes/Gaurdarsessoes';
import { TestesComponent } from 'src/app/Teste/testes/testes.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teste1232',
  templateUrl: './teste1232.component.html',
  styleUrls: ['./teste1232.component.scss']
})
export class Teste1232Component {

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailServiceService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const form = this.contactForm.getRawValue();
      const formElement = this.createFormElement(form);
      this.emailService.sendEmail(formElement).then(
        (result) => {
          console.log('Email enviado:', result.text);
        },
        (error) => {
          console.error('Erro ao enviar email:', error.text);
        }
      );
    }
}
createFormElement(formValue: any): HTMLFormElement{
  const formElement = document.createElement('form');
  Object.keys(formValue).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formValue[key];
        formElement.appendChild(input);
      });
      return formElement;
    }
}



