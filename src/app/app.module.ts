import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { FormsModule , ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from "./pages/login/login.component";


import { LoginLayoutComponent } from "./layouts/login-layout/login-layout.component";
import { RegisterLayoutComponent } from "./layouts/register-layout/register-layout.component";

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { environment } from "src/environments/environment";
import { RegisterComponent } from './pages/register/register.component';
import { PanneComponent } from './pages/panne/panne.component';
import { PanneLayoutComponent } from "./layouts/panne-layout/panne-layout.component";
import { ConsPanneComponent } from './pages/cons-panne/cons-panne.component';
import { BonTravComponent } from './pages/bon-trav/bon-trav.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { ConsAppareilComponent } from './pages/cons-appareil/cons-appareil.component';
import { DemandeComponent } from './pages/demande/demande.component';
import { SuppCompteComponent } from './pages/supp-compte/supp-compte.component';
import { ConsBonTravComponent } from './pages/cons-bon-trav/cons-bon-trav.component';
import { TerAlertComponent } from './pages/ter-alert/ter-alert.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule



  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent,LoginLayoutComponent,RegisterComponent, RegisterLayoutComponent , PanneLayoutComponent,PanneComponent,ConsPanneComponent,BonTravComponent,ConsAppareilComponent,DemandeComponent, SuppCompteComponent, ConsBonTravComponent, TerAlertComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
