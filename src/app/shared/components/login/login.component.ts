import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
//import { User } from '../../models/user.model';
//import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: any;
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private authservice: AuthService,
    //private userService: UserService,
    private formBuilder: FormBuilder
  ) {
   // this.user = new User();
   this.user = {}
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControlsValidate() {
    return this.loginForm.controls;
  }

   login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.user.code = this.loginForm.value.code;
    this.user.password = this.loginForm.value.password;

    this.authservice.login(this.user.code, this.user.password).subscribe(
      (response) => {
        console.log('inicio correcto');
        console.log(response);

        if (response) {
          //this.authservice.setAuthenticationStatus(true);
          this.router.navigate(['/mainView']);
          //this.userService.setUserData(response);
        } 
      },
      (error) => {
        console.log('Error');
        console.log(error);
        
        Swal.fire({
          title: "Error al ingresar",
          text: "Verifica usuario o password",
          icon: "error",
          showCancelButton: false,
          showCloseButton: true,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });

      }
    );
    
   }
}
