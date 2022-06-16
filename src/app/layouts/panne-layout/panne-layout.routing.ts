import { Routes } from "@angular/router";

import { PanneComponent } from "src/app/pages/panne/panne.component";
import { ConsPanneComponent } from "src/app/pages/cons-panne/cons-panne.component";
import { BonTravComponent } from "src/app/pages/bon-trav/bon-trav.component";
import { ConsAppareilComponent } from 'src/app/pages/cons-appareil/cons-appareil.component';
import { DemandeComponent } from "src/app/pages/demande/demande.component";
import { SuppCompteComponent } from "src/app/pages/supp-compte/supp-compte.component";
import {ConsBonTravComponent} from "src/app/pages/cons-bon-trav/cons-bon-trav.component";
import { TerAlertComponent } from "src/app/pages/ter-alert/ter-alert.component";

export const PanneLayoutRoutes: Routes = [

  { path: "panne", component: PanneComponent },
  { path: "consPanne", component: ConsPanneComponent },
  { path: "bonTrav", component: BonTravComponent },
  { path: "consApp", component: ConsAppareilComponent },
  { path: "demande", component: DemandeComponent },
  { path: "suppCompte", component: SuppCompteComponent },
  { path: "cons_bonTrav", component: ConsBonTravComponent },
  { path: "terAlert", component: TerAlertComponent }


];
