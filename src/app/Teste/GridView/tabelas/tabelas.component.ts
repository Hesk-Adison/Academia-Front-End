import { Component } from '@angular/core';
import { User, UserColumns } from 'src/Models/user';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/Service/services/user.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabelas',
  templateUrl: './tabelas.component.html',
  styleUrls: ['./tabelas.component.scss']
})
export class TabelasComponent {
  displayedColumns: string[] = UserColumns.map((col) => col.key)
  columnsSchema: any = UserColumns
  dataSource = new MatTableDataSource<User>()
  valid: any = {}

  constructor(public dialog: MatDialog, private userService: UserService) {}
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

  deleteFieldValue(index:number) {
      this.fieldArray.splice(index, 1);
  }
  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.dataSource.data = res
    })
  }

  editRow(row: User) {
    console.log(`a minha senha é ${row.id }`)
    if (row.id === 0) {
      this.userService.addUser(row).subscribe((newUser: User) => {
        row.id = newUser.id
        row.isEdit = false
      })
    } else {
      this.userService.updateUser(row).subscribe(() => (row.isEdit = false))
    }
  }

  addRow() {
    const newRow: User = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      birthDate: '',
      isEdit: true,
      isSelected: false,
    }
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }

  removeRow(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (u: User) => u.id !== id,
      )
    })
  }

  removeSelectedRows() {
    const users = this.dataSource.data.filter((u: User) => u.isSelected)
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.userService.deleteUsers(users).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: User) => !u.isSelected,
            )
          })
        }
      })
  }

  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }

  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected)
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected)
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }))
  }
}
