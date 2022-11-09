import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: 'app-first-home',
  templateUrl: './first-home.component.html',
  styleUrls: ['./first-home.component.css']
})
export class FirstHomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openLogin() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.id           = "login-component";
    config.width        = "600px";
    config.height       = "400px";
    config.data         = {
      title: "Login",
      component: "login"
    }

    const dialogRef = this.dialog.open(LoginComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === "login-ok") this.router.navigate(['/home']);
    });
  }

  openRegister() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.id           = "register-component";
    config.width        = "600px";
    config.height       = "400px";
    config.data         = {
      title: "Register",
      component: "register"
    }

    const dialogRef = this.dialog.open(RegisterComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === "register-ok") this.router.navigate(['/home']);
    });
  }
}
