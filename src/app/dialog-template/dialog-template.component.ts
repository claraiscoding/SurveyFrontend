import {Component, Input, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.css']
})
export class DialogTemplateComponent implements OnInit {

  title: string;
  component: string;

  constructor(private dialogRef: MatDialogRef<DialogTemplateComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.title = data.title;
    this.component = data.component;
  }

  ngOnInit(): void {
  }

}
