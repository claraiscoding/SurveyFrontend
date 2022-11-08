import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { HomeComponent } from './home/home.component';
import { PartecipateComponent } from './partecipate/partecipate.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogTemplateComponent,
    SurveyListComponent,
    HomeComponent,
    PartecipateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
