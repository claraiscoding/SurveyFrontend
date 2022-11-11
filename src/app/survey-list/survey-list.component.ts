import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RestApiService } from "../services/rest-api.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PartecipateComponent } from "../partecipate/partecipate.component";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  public mail: string = "";
  public error: string  = "";
  public surveyTable: SURVEY_TABLE[] = [];
  public surveyDone: SURVEY_TABLE[] = [];
  public displayedColumns: string[] = ['Name', 'Category', 'Publishing Date', 'Ending Date', 'Created By', 'id'];
  public dataSource = this.surveyTable;

  constructor(private route: ActivatedRoute, private router: Router, private ras: RestApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mail = params["mail"];
    });
    this.getSurveys();
  }

  public async getSurveys() {
    this.error = "";
    await this.ras.callApi('http://localhost:8080/survey/api/surveys', 'GET', '')
      .then((res) => {
        this.surveyTable = res;
        this.dataSource = this.surveyTable;
        //this.dialogRef.close({"loginCheck": true, "mail": this.form.value.mail});
      }).catch((err) => {
        this.error = "Surveys not found";
      });
    await this.ras.callApi('http://localhost:8080/survey/api/users/' + this.mail, 'GET', '')
      .then((res) => {
        this.surveyDone = res["surveys"];
      }).catch((err) => {
        this.error = "Surveys not found";
      });
  }

  public async openSurvey() {
    const config = new MatDialogConfig();

    config.disableClose = true;
    config.id           = "survey-component";
    config.width        = "1000px";
    config.height       = "800px";
    config.data         = {
      title: "Survey",
      component: "survey"
    }
    const dialogRef = this.dialog.open(PartecipateComponent, config);
  }

  public checkSurvey (row: any) {
    let ret = true;
    this.surveyDone.forEach(element => {
      if (element.id === row['id']) ret = false;
    });
    return ret;
  }
}

export interface SURVEY_TABLE {
  id: number;
  id_mail: string;
  id_category: number;
  name: string;
  description: string;
  publish_date: string;
  ending_date: string;
  category: {
    id: number;
    name: string;
  }
}
