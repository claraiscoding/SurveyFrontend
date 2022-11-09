import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule         } from './app-routing.module';
import { AppComponent             } from './app.component';
import { LoginComponent           } from './login/login.component';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { MatDialogModule          } from "@angular/material/dialog";
import { DialogTemplateComponent  } from './dialog-template/dialog-template.component';
import { HttpClientModule         } from "@angular/common/http";
import { MatCardModule            } from '@angular/material/card';
import { MatInputModule           } from '@angular/material/input';
import { MatIconModule            } from '@angular/material/icon';
import { MatButtonModule          } from '@angular/material/button';
import { ReactiveFormsModule      } from "@angular/forms";
import {SurveyListComponent} from "./survey-list/survey-list.component";
import {HomeComponent} from "./home/home.component";
import {PartecipateComponent} from "./partecipate/partecipate.component";
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogTemplateComponent,
    SurveyListComponent,
    HomeComponent,
    PartecipateComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
