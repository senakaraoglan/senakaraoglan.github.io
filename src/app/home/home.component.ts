import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <mat-card class="card"
      ><a mat-raised-button href="mailto:iletisim@disar.org.tr"
        >İLETİŞİM</a
      ></mat-card
    >
  `,
  styles: [
    `
      a {
        padding-left: 20px;
        padding-top: 20px;
        align: center;
      }

      .card {
        background-image: url(assets/onsozdusuk.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        height: 1000px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor() {}
}
