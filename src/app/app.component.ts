import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTemplateComponent } from "./dialog-template/dialog-template.component";
import {LoginComponent} from "./login/login.component";

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
    config.width        = "600px";
    config.height       = "400px";

    const dialogRef = this.dialog.open(LoginComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
