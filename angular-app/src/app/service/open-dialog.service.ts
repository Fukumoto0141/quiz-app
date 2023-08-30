import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root'
})
export class OpenDialogService {

  constructor(
    public dialog: MatDialog,
  ) { }

  openDialog(targetDialog: ComponentType<unknown>): void {
    const dialogRef = this.dialog.open(targetDialog, {
    });
  }
}
