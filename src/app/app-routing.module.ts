import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SurveyListComponent } from "./survey-list/survey-list.component";
import { HomeComponent } from "./home/home.component";
import { FirstHomeComponent } from "./first-home/first-home.component";

const routes: Routes = [
  { path: '', component: FirstHomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'survey-list', component: SurveyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
