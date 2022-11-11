import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
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
  public chosen: SURVEY_TABLE = {
    id: 9,
    id_mail: "",
    id_category: 0,
    name: "",
    description: "",
    publish_date: "",
    ending_date: "",
    category: {
      id: 0,
      name: "",
    }
  };
  public chosen_id: number = 0;

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
      component: "survey",
      mail: this.mail,
      id_survey: this.chosen_id
    }
    const dialogRef = this.dialog.open(PartecipateComponent, config);
  }

  public checkSurvey(row: any) {
    let ret = true;
    this.surveyDone.forEach(element => {
      if (element.id === row['id']) {
        ret = false;
        this.chosen = row;
        this.chosen_id = row["id"];
      }
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
