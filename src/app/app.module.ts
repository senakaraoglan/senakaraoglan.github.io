import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HighchartsChartModule } from "highcharts-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CdkDetailRowDirective } from "./cdk-detail-row.directive";
import { ClimatesComponent } from "./climates/climates.component";
import { GraphicsComponent } from "./graphics/graphics.component";
import { ClimateService } from "./services/climate.service";
import { TextShrinkPipe } from "./table-text-shrink.pipe";

@NgModule({
  declarations: [
    AppComponent,
    GraphicsComponent,
    ClimatesComponent,
    TextShrinkPipe,
    CdkDetailRowDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatTableModule,
    MatButtonModule,
    HighchartsChartModule,
    MatCheckboxModule,
    MatSortModule,
    MatDividerModule,
    MatInputModule,
    CdkTableModule,
    CdkTreeModule,
    FlexLayoutModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ClimateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
