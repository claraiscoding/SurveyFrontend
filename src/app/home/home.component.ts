import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../services/rest-api.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig } from "@angular/material/dialog";
import { DialogTemplateComponent } from "../dialog-template/dialog-template.component";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mail: string = "";
  constructor (private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mail = params["mail"];
    });
  }
  public surveyList () {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "mail": this.mail
      },
      skipLocationChange: true
    };
    this.router.navigate(['/survey-list'], navigationExtras);
  }
}
