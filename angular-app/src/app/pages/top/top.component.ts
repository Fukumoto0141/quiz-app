import { Component, Inject, Type, inject } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EntryDialogComponent } from 'src/app/components/entry-dialog/entry-dialog.component';
import { CreateRoomDialogComponent } from 'src/app/components/create-room-dialog/create-room-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { OpenDialogService } from 'src/app/service/open-dialog.service';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent {

  name: string|null ='';

  entryDialog = EntryDialogComponent;
  createRoomDialog = CreateRoomDialogComponent;

  constructor(
    private auth: Auth = inject(Auth),
    public dialog: MatDialog,
    private openDialogService: OpenDialogService,
    private firestoreClient: FirestoreClientService
  ){
    this.name = this.firestoreClient.userName;
  }

  openDialog(targetDialog: ComponentType<unknown>): void {
    this.openDialogService.openDialog(targetDialog);
  }
}
