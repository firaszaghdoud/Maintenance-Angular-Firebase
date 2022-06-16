import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { AppareilsComponent } from "../../pages/appareils/appareils.component";
import { RapportComponent } from "../../pages/rapport/rapport.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { ProfileComponent } from "../../pages/profile/profile.component";
import { StockComponent } from "../../pages/stock/stock.component";
import { AlertComponent } from "../../pages/alert/alert.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "appareils", component: AppareilsComponent },
  { path: "rapport", component: RapportComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "stock", component: StockComponent },
  { path: "alert", component: AlertComponent },


  // { path: "rtl", component: RtlComponent }
];
