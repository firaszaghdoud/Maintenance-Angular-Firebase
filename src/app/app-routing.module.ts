import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { RegisterLayoutComponent } from "./layouts/register-layout/register-layout.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginLayoutComponent } from "./layouts/login-layout/login-layout.component";
import { PanneLayoutComponent } from "./layouts/panne-layout/panne-layout.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
      }
    ]
  },

  {
    path: "",
    component: LoginLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/login-layout/login-layout.module").then(m => m.LoginLayoutModule)
      }
    ]
  },
  {
    path: "",
    component: RegisterLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/register-layout/register-layout.module").then(m => m.RegisterLayoutModule)
      }
    ]
  },

  {
    path: "",
    component: PanneLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/panne-layout/panne-layout.module").then(m => m.PanneLayoutModule)
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
