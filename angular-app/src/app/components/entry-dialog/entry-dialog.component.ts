import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreClientService } from 'src/app/service/firestore-client.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,//カプセル化の解除

})
export class EntryDialogComponent {
  key: string = '';
  showCursor = true;

  constructor(
    public dialogRef: MatDialogRef<EntryDialogComponent>,
    private router: Router,
    private firestoreClient: FirestoreClientService,
    ) {

  }

  entryRoom(){
    this.dialogRef.close();
    this.firestoreClient.roomKey = this.key;
    this.firestoreClient.putUser(this.key, false);
    this.router.navigateByUrl('/lobby');
  }
}
