import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <div
      style="background-position: center;
      background-repeat: no-repeat;
      background-size: cover; width: 100%; height: 100%; background-image: url('assets/bg1.jpeg');"
    >
      <mat-toolbar
        class="transparent"
        style="position: absolute;
      background-color:transparent !important;"
      >
        <mat-toolbar-row>
          <a
            style="
          background-color:white;"
            mat-button
            routerLink="/login"
          >
            <span>login</span>
          </a>
        </mat-toolbar-row>
      </mat-toolbar>
    </div>
  `,
})
export class HomeComponent {
  constructor() {}
}
