import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { MemberService } from '../_services/member.service';
import { AuthService } from '../_services/auth.service';

@Component({templateUrl: 'register.component.html',

  styleUrls: ['register.component.css']

})



export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];


  constructor(
    // private patternValidator: PatternValidator,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private memberService: MemberService,
    private notification: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentMemberValue) {
      this.router.navigate(['/']);
    }
  }
  //5404492602

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      role: [''],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', [Validators.required]],
      racketTension: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      racketType: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      racketStrings: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });

    this.roles = [{name: 'Member'},
      {name: 'Admin'}];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    this.memberService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          //  this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Error:', error);
          this.notification.showNotif(error);
          this.loading = false;
        });
  }
}
