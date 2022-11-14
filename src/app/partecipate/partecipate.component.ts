import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {RestApiService} from "../services/rest-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  public form!: FormGroup;
  public QnAs: QnA[] = [];
  public values: Question[] = [];
  public myvalue: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    component: string,
    mail: string,
    id_survey: number
  }, private ras: RestApiService, public dialogRef: MatDialogRef<PartecipateComponent>) { }

  ngOnInit(): void {
    this.getQnA();
    this.form = new FormGroup({
      id_question_answer: new FormControl('', [Validators.required])
    });
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
          let id_question_answer = this.QnAs[i].id_question_answer;
          q.addAnswer(new Answer(answer, id_question_answer));
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
  public answers: Answer[] = [];

  constructor (question: string, answers: Answer[]) {
    this.question = question;
    this.answers = answers;
  }
  public addAnswer (answer: Answer) { this.answers.push(answer); }
}

export class Answer {
  public answer: string = "";
  public id_question_answer: number = 0;

  constructor (answer: string, id_question_answer: number) {
    this.answer = answer;
    this.id_question_answer = id_question_answer;
  }
}
