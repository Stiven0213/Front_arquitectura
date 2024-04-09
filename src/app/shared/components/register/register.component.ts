import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
//import { UserService } from 'src/app/core/services/user.service';
//import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: any;
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    //private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
   // this.user = new User();
  }

  ngOnInit() {
    this.user = {};
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.maxLength(2)]],
      code_teacher: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  get formControlsValidate() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.user.name = this.registerForm.value.name;
    this.user.lastname = this.registerForm.value.lastname;
    this.user.email = this.registerForm.value.email;
    this.user.age = this.registerForm.value.age;
    this.user.code_teacher = this.registerForm.value.code_teacher;

    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito', response);

        Swal.fire({
          title: "Usuario registrado",
          text: "Serás redirigido al inicio de sesión",
          icon: "success",
          showCancelButton: false,
          showCloseButton: true,
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true
        });
        //this.userService.setUserData(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar usuario', error);
      }
    );
   }
}
