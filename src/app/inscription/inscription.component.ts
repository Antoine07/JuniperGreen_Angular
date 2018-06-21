import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

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
      'pseudo': new FormControl('', [
        Validators.required, Validators.pattern(/[a-zA-Z]{3,}/)
      ]),
    });
  }

  get email() { return this.authForm.get('email'); }
  get password() { return this.authForm.get('password'); }
  get pseudo() { return this.authForm.get('pseudo'); }

  onSubmit() {
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];
    const pseudo = this.authForm.value['pseudo'];

    this.authService.isValidUser(pseudo).then(
      (m) => console.log(m)
    );

    this.authService.createUser(email, password, pseudo).then(
      () => {
        this.router.navigate(['/game'])
      },
      error => {
        this.errors = `Il y a eu un problème : ${error}`
      }
    )
  }
}