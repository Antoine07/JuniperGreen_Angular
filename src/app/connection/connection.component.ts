
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {

  authForm: FormGroup;
  errors: string;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.authForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required, Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required, Validators.pattern(/[a-zA-Z]{6,}/)
      ]),
    });
  }

  get email() { return this.authForm.get('email'); }
  get password() { return this.authForm.get('password'); }

  onSubmit() {
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];

    this.authService.login(email, password).then(
      (user) => {
        
        this.router.navigate(['/game']);
      },
      error => {
        this.errors = `Il y a eu un problème : ${error}`
      }
    )
  }

}
