import { Component, OnInit } from '@angular/core';
import { GoogleFormsService } from 'src/app/core/services/google-forms.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { SubjectService } from 'src/app/core/services/subject.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from 'src/environments/environment';
import { marked } from 'marked';

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
  showPreloader: boolean = false;

  //AI

  inputText: string = '';
  preguntas: string[] = [];
  respuestas: string[] = [];
  genAI: any;

  constructor(
    private googleFormsService: GoogleFormsService,
    private sharedDataService: SharedDataService,
    private subjectService: SubjectService,
    private authservice: AuthService,
    private router: Router
  ) {
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
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
    this.showPreloader = true; 
  
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
      const result = await model.generateContent(pregunta);
      const response = await result.response;

      const responseText = await response.text();

      const formattedResponse = await marked.parse(responseText);
  
      
      this.preguntas.push(pregunta);
      this.respuestas.push(formattedResponse);
  
      
      this.inputText = '';
    } catch (error) {
      console.error('Error al generar contenido:', error);
    } finally {
      this.showPreloader = false; 
    }
  }
  
}
