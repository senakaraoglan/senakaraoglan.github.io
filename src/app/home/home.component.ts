import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <div class="main-div">
      <div class="center-div">
        <mat-card class="card">
          <a mat-raised-button href="mailto:iletisim@disar.org.tr">İLETİŞİM</a>
          <img mat-card-image src="assets/onsozyuksek.jpg" alt="onsoz" />
          <div>
            Adres: MİMAR SİNAN MAH. HAKİMİYETİ MİLLİYE CAD. DIŞ KAPI NO:53 HİLAL
            HAN İÇ KAPI NO:4 ÜSKÜDAR/İSTANBUL
          </div>
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
        max-width: 1450px;
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
