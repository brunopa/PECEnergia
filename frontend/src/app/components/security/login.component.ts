import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MessagesComponent } from '../../directives/messages/messages.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loading = false;
  returnUrl: string;


  loginForm = new FormGroup({
    email: new FormControl('bruno.hung@gmail.com'),
    password: new FormControl('senh@123')
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: MessagesComponent) { }

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe(
        data => { this.router.navigate([this.returnUrl]); },
        error => { },
        () => this.loading = false);
  }
}
