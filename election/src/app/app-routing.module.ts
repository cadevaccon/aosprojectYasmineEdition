import { PartiComponent } from './parti/parti.component';
import { PersonneComponent } from './personne/personne.component';
import { ListeCandidComponent } from './liste-candid/liste-candid.component';
import { JustificatifComponent } from './justificatif/justificatif.component';
import { FormationComponent } from './formation/formation.component';
import { ElectionComponent } from './election/election.component';
import { ElecteurComponent } from './electeur/electeur.component';
import { CandidatComponent } from './candidat/candidat.component';
import { ActiviteComponent } from './activite/activite.component';
import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"activite",component:ActiviteComponent},
  {path:"candidat",component:CandidatComponent},
  {path:'parti', component:PartiComponent}, 
  {path:'electeur', component:ElecteurComponent},
  {path:'election', component:ElectionComponent},
  {path:'formation', component:FormationComponent},
  {path:'personne', component:PersonneComponent},
  {path:'home', component:HomeComponent},
  {path:'justificatif', component:JustificatifComponent},
  {path:'liste-candid', component:ListeCandidComponent},
  {path:'',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
