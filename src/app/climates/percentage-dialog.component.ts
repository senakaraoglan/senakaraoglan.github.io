import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-percentage-dialog',
  template: `
    <circle-progress class="circle-progress" [percent]="data"></circle-progress>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  styleUrls: ['./percentage-dialog.component.css'],
})
export class PercentageDialogComponent {
  public constructor(
    public dialogRef: MatDialogRef<PercentageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}
}
