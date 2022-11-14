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

  public title: string = this.data.title;
  public mail: string = this.data.mail;
  public id_survey: number = this.data.id_survey;
  public error: string = "";
  public QnAs: QnA[] = [];
  public values: Question[] = [];
  public myvalue: string = "";

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
    await this.ras.callApi('http://localhost:8080/survey/api/survey-composition/' + this.id_survey, 'GET', '')
      .then((res) => {
        this.QnAs = res;
        let id_prec = 0;
        let q = new Question("", []);
        let check = false;
        for (let i = 0; i < this.QnAs.length; i++) {
          let id_question = this.QnAs[i].question_answer.id_question;
          if (id_question != id_prec) {
            if (check) this.values.push(q);
            check = true;
            id_prec = id_question;
            let question = this.QnAs[i].question_answer.question.question;
            q = new Question(question, []);
          }
          let answer = this.QnAs[i].question_answer.answer.answer;
          q.addAnswer(answer);
        }
        this.values.push(q);
      }).catch((err) => {
        this.error = "Cannot retrieve data";
      });
  }

  public close() {
    this.dialogRef.close();
  }
}

export interface QnA {
  id_survey: number;
  id_question_answer: number;
  question_answer: {
    id: number;
    id_question: number;
    id_answer: number;
    question: {
      id: number;
      question: string;
      categoryId: number;
      answers: ANSWER[];
      category: {
        id: number;
        name: string;
      }
    }
    answer: ANSWER;
  }
}

export interface ANSWER {
  id: number;
  answer: string;
}

export class Question {
  public question: string = "";
  public answers: string[] = [];

  constructor (question: string, answers: string[]) {
    this.question = question;
    this.answers = answers;
  }
  public addAnswer (answer: string) { this.answers.push(answer); }
}
