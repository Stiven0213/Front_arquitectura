import { Component, OnInit } from '@angular/core';
import { GoogleFormsService } from 'src/app/core/services/google-forms.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  attendanceData: any[] = [];
  teacherName: string = '';
  qrCode: string = '';
  subjectName = '';
  teacherData: any = '';
  isLoading = false;

  //AI

  inputText: string = '';
  preguntas: string[] = [];
  respuestas: string[] = [];
  API_KEY: string = 'AIzaSyAZvjMYGlM-JnhBCjp9o7wtM_n5H3xz2uY'; // Reemplaza con tu clave de API real
  genAI: any;

  constructor(
    private googleFormsService: GoogleFormsService,
    private sharedDataService: SharedDataService,
    private subjectService: SubjectService,
    private authservice: AuthService,
    private router: Router
  ) {
    this.genAI = new GoogleGenerativeAI(this.API_KEY);
  }

  ngOnInit(): void {
    this.teacherData = this.sharedDataService.getTeacherData();
    if (this.teacherData) {
      this.subjectName = this.teacherData.codigo_profesor;
      this.teacherName = this.teacherData.nombre; // Ajusta esto según la estructura de tu objeto teacherData
      this.loadTeacherData(this.subjectName);
      console.log(this.teacherData);
    } else {
      console.error(
        'No se encontró la información del profesor en el servicio compartido'
      );
    }
  }

  loadTeacherData(subjectName: string): void {
    this.googleFormsService.getAttendance(subjectName).subscribe((data) => {
      this.attendanceData = data;
      console.log(this.attendanceData);

      this.subjectService
        .getSubjectByName(subjectName)
        .subscribe((subjectData) => {
          this.qrCode = subjectData.foundSubject.qr;
          console.log(subjectData);
          console.log(this.qrCode);
        });
    });
  }

  refreshAttendanceData(): void {
    this.loadTeacherData(this.subjectName);
  }

  logout(): void {
    this.authservice.logout();

    // Redirigir al usuario a la página de inicio o de login
    this.router.navigate(['/login']);
  }

  async generateText() {
    const pregunta = this.inputText;
    this.isLoading = true; // Mostrar loader mientras se carga la respuesta
  
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      const result = await model.generateContent(pregunta);
      const response = await result.response;

      const formattedResponse = response.text()
      .replace(/\*\*/g, '<strong>') // Reemplazar asteriscos dobles con <strong>
      .replace(/<\/?[^>]+(>|$)/g, ''); // Eliminar cualquier otro tag HTML
  
      // Guardar pregunta y respuesta
      this.preguntas.push(pregunta);
      this.respuestas.push(formattedResponse);
  
      // Limpiar el campo de texto después de generar la pregunta y la respuesta
      this.inputText = '';
    } catch (error) {
      console.error('Error al generar contenido:', error);
    } finally {
      this.isLoading = false; // Ocultar loader cuando la respuesta se haya cargado
    }
  }
  
}
