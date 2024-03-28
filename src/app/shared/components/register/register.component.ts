import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/core/services/auth.service';
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
  //user: User;
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    //private authService: AuthService,
    //private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
   // this.user = new User();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userChat: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get formControlsValidate() {
    return this.registerForm.controls;
  }

  signUp() {
  //   this.submitted = true;

  //   if (this.registerForm.invalid) {
  //     return;
  //   }

  //   this.user.userChat = this.registerForm.value.userChat;
  //   this.user.email = this.registerForm.value.email;
  //   this.user.password = this.registerForm.value.password;

  //   this.authService.signUp(this.user).subscribe(
  //     (response) => {
  //       console.log('Usuario registrado con éxito', response);

  //       Swal.fire({
  //         title: "Usuario registrado",
  //         text: "Serás redirigido al inicio de sesión",
  //         icon: "success",
  //         showCancelButton: false,
  //         showCloseButton: true,
  //         showConfirmButton: false,
  //         timer: 4000,
  //         timerProgressBar: true
  //       });


  //       this.userService.setUserData(response);
  //       this.router.navigate(['/login']);
  //     },
  //     (error) => {
  //       console.error('Error al registrar usuario', error);
  //     }
  //   );
   }
}
