import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  registerForm!: FormGroup;
  submitted = false;
  subjects: any[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.getSubjects();
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.maxLength(2)]],
      code_teacher: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  get formControlsValidate() {
    return this.registerForm.controls;
  }

  async register() {
    this.submitted = true;
  
    if (this.registerForm.invalid) {
      return;
    }
  
    this.user = { ...this.registerForm.value };
  
    try {
      this.authService.register(this.user).subscribe((response) => {
        console.log('Usuario registrado con éxito', response);
        console.log('Formulario válido, valores:', this.registerForm.value);
  
        Swal.fire({
          title: 'Usuario registrado',
          text: 'Serás redirigido al inicio de sesión',
          icon: 'success',
          showCancelButton: false,
          showCloseButton: true,
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true,
        });
  
        this.router.navigate(['/login']);
      });
    } catch (error) {
      console.error('Error al registrar usuario', error);
      Swal.fire({
        title: 'Error al registrar usuario',
        text: 'Por favor, inténtalo de nuevo más tarde',
        icon: 'error',
      });
    }
  }
  

  getSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (data: any) => {
        this.subjects = data; 
      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }
}
