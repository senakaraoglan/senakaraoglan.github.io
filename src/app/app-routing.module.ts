import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./auth/auth-guard.service";
import { ClimatesComponent } from "./climates/climates.component";
import { GraphicsComponent } from "./graphics/graphics.component";
import { HomeComponent } from "./home/home.component";
import { LoggedComponent } from "./logged/logged.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "logged",
    component: LoggedComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "climates",
        component: ClimatesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "istatistik",
        component: GraphicsComponent,
        canActivate: [AuthGuardService],
      },
      { path: "", redirectTo: "climates", pathMatch: "full" },
      { path: "**", component: ClimatesComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
