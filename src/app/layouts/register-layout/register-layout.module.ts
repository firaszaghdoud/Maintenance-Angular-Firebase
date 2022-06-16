import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RegisterComponent } from "src/app/pages/register/register.component";

import { RegisterLayoutRoutes } from "./register-layout.routing";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [

    // RtlComponent
  ]
})
export class RegisterLayoutModule {}
