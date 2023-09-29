import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(
    public dialog: MatDialog,

  ) { }

  openDialog(targetDialog: ComponentType<unknown>,dialogConfig:MatDialogConfig): void {
    const dialogRef = this.dialog.open(targetDialog, dialogConfig);
  }
}
