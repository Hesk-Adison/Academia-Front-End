import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Userss } from 'src/app/modalrelatorio/modalrelatorio/modalrelatorio.component';

@Component({
  selector: 'app-autocomplete-display-example',
  templateUrl: './autocomplete-display-example.component.html',
  styleUrls: ['./autocomplete-display-example.component.scss']
})
export class AutocompleteDisplayExampleComponent  implements OnInit {
  myControl = new FormControl<string | Userss>('');
  options: Userss[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions!: Observable<Userss[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: Userss): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): Userss[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
