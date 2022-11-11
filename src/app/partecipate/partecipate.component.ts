import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";

@Component({
  selector: 'app-partecipate',
  templateUrl: './partecipate.component.html',
  styleUrls: ['./partecipate.component.css']
})
export class PartecipateComponent implements OnInit {

  public mail: string = this.data.mail;
  public survey_id: number = this.data.id_survey;
  public error: string = "";
  public myvalue: string ="NA";
  public myoptions: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    component: string,
    mail: string,
    id_survey: number
  }, private ras: RestApiService, public dialogRef: MatDialogRef<PartecipateComponent>) { }

  ngOnInit(): void {
    this.getQnA();
  }

  public async getQnA() {
    this.error = "";
    await this.ras.callApi('http://localhost:8080/survey/api/survey-composition/' + this.survey_id, 'GET', '')
      .then((res) => {
        // qui devo prendere json e trasformarlo in struttura domande e risposte (da definire)
      }).catch((err) => {
        this.error = "Cannot retrieve data";
      });
  }

  public close() {
    this.dialogRef.close();
  }
}
