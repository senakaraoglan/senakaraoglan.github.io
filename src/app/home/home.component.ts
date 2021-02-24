import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <div class="main-div">
      <div class="center-div">
        <mat-card class="card">
          <a mat-raised-button href="mailto:iletisim@disar.org.tr">İLETİŞİM</a>
          <img mat-card-image src="assets/onsozdusuk.jpg" alt="onsoz" />
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      a {
        position: absolute;
        z-index: 99;
      }

      .center-div {
        position: absolute;
      }

      .main-div {
        display: flex;

        justify-content: center;
      }

      .card {
        max-width: 1050px;
      }

      mat-card img {
        object-fit: cover; /*this makes the image in src fit to the size specified below*/
      }
    `,
  ],
})
export class HomeComponent {
  constructor() {}
}
