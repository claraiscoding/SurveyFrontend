import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTemplateComponent } from "./dialog-template/dialog-template.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog) { }

  openLogin() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.id           = "login-component";
    config.height       = "350px";
    config.width        = "600px";
    config.data = {
      title: "Login or Register",
      component: "login"
    };

    const dialogRef = this.dialog.open(DialogTemplateComponent, config);
  }
}
