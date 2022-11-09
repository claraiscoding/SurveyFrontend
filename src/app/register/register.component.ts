import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RestApiService } from "../services/rest-api.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form!:           FormGroup;
  public error:           string  = "";
  public hidePassword:    boolean = true;

  constructor(
    private ras: RestApiService,
    public dialogRef: MatDialogRef<RegisterComponent>
  ) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      mail: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('', [Validators.required])
    });
  }

  public async register() {
    this.error = "";

    await this.ras.callApi('http://localhost:8080/survey/api/users', 'POST', this.form.value)
      .then((res) => {
        this.dialogRef.close("register-ok");
      }).catch((err) => {
        this.error = "User already exists";
      });
  }

  public close() {
    this.dialogRef.close("register-ko");
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.form.controls[controlName].hasError(errorName);
  }
}

