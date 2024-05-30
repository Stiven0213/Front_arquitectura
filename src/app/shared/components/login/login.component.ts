import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private sharedDataService: SharedDataService
  ) {}

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

    const code = this.loginForm.value.code;
    const password = this.loginForm.value.password;

    this.authService.login(code, password).subscribe(
      (response) => {
        if (response.teacherData) {
          this.sharedDataService.setTeacherData(response.teacherData);
          this.router.navigate(['/mainView']);
        } else {
          console.error('No se encontró teacherData en la respuesta del servidor');
        }
      },
      (error) => {
        Swal.fire({
          title: 'Error al ingresar',
          text: 'Verifica usuario o password',
          icon: 'error',
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
