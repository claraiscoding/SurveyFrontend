import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RestApiService } from "../services/rest-api.service";

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {

  public mail: string = "";
  public error: string  = "";
  public surveyTable: SURVEY_TABLE[] = [];
  public displayedColumns: string[] = ['Name', 'Category', 'Publishing Date', 'Ending Date', 'Created By'];
  public dataSource = this.surveyTable;

  constructor(private route: ActivatedRoute, private router: Router, private ras: RestApiService) { }

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
