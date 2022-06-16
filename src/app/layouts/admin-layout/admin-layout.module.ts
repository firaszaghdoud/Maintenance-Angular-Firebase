import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { AppareilsComponent } from "../../pages/appareils/appareils.component";
import { RapportComponent } from "../../pages/rapport/rapport.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { ProfileComponent } from "../../pages/profile/profile.component";
import { StockComponent } from "../../pages/stock/stock.component";

import { AlertComponent } from "../../pages/alert/alert.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    StockComponent,
    AppareilsComponent,
    AlertComponent,
    NotificationsComponent,
    RapportComponent,

    // RtlComponent
  ]
})
export class AdminLayoutModule {}
