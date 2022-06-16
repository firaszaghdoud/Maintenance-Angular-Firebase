import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PanneLayoutRoutes } from "./panne-layout.routing";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PanneComponent } from "src/app/pages/panne/panne.component";
import { ConsPanneComponent } from "src/app/pages/cons-panne/cons-panne.component";
import { BonTravComponent } from "src/app/pages/bon-trav/bon-trav.component";
import { ConsAppareilComponent } from "src/app/pages/cons-appareil/cons-appareil.component";
import { DemandeComponent } from "src/app/pages/demande/demande.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PanneLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
  ]
})
export class PanneLayoutModule {}
