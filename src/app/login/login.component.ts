import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  template: `
    <mat-card>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <h2>Log In</h2>
          <mat-error *ngIf="loginForm.invalid">
            Kullanıcı Adı ve şifre geçersiz!
          </mat-error>
          <mat-form-field class="full-width-input">
            <input
              matInput
              placeholder="Email"
              formControlName="username"
              required
            />
            <mat-error>
              Lütfen kullanıcı adı giriniz!
            </mat-error>
          </mat-form-field>
          <mat-form-field class="full-width-input">
            <input
              matInput
              type="password"
              placeholder="Password"
              formControlName="password"
              required
            />
            <mat-error>
              Lütfen şifre giriniz!
            </mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary">Login</button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/logged"]);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/logged";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe((data) => {
        this.router.navigate([this.returnUrl]);
      });
  }
}
