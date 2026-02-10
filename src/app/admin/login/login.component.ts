import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/services/authentification-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private mySubscription!: Subscription;
  form!: UntypedFormGroup;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.authentificationService.logoutUser();
    this.form = this.initAuthentificationForm();
  }

  initAuthentificationForm() {
    return this.formBuilder.group({
      email: this.formBuilder.control(null, Validators.required),
      password: this.formBuilder.control(null, [Validators.required]),
    });
  }

  login() {
    this.authentificate();
  }

  authentificate() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const payload = this.form.value;

      this.mySubscription = this.authentificationService.authenticate(payload).subscribe((isLoggedIn) => {
        console.log(isLoggedIn)
        this.authentificationService.saveAccessToken(isLoggedIn.payload.token);
        if (isLoggedIn) {
          this.router.navigate(["/app/dashboard"]);
        }
      });
    }
  }

}
