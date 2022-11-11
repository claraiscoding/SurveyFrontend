import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-partecipate',
  templateUrl: './partecipate.component.html',
  styleUrls: ['./partecipate.component.css']
})
export class PartecipateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PartecipateComponent>) { }

  ngOnInit(): void { }

  public close() {
    this.dialogRef.close();
  }
}
