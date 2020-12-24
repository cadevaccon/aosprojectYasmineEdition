import { FormationComponent } from './formation/formation.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiviteComponent } from './activite/activite.component';

import { CandidatComponent } from './candidat/candidat.component';
import { ElecteurComponent } from './electeur/electeur.component';
import { ElectionComponent } from './election/election.component';
import { JustificatifComponent } from './justificatif/justificatif.component';
import { ListeCandidComponent } from './liste-candid/liste-candid.component';
import { PartiComponent } from './parti/parti.component';
import { PersonneComponent } from './personne/personne.component';
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component'



@NgModule({
  declarations: [
    AppComponent,
    ActiviteComponent,
    FormationComponent,
    CandidatComponent,
    ElecteurComponent,
    ElectionComponent,
    JustificatifComponent,
    ListeCandidComponent,
    PartiComponent,
    PersonneComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
