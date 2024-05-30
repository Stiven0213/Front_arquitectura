import { Component, OnInit } from '@angular/core';
import { GoogleFormsService } from 'src/app/core/services/google-forms.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {
  attendanceData: any[] = [];
  teacherName: string = '';
  qrCode: string = '';

  constructor(
    private googleFormsService: GoogleFormsService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    const teacherData = this.sharedDataService.getTeacherData();
    if (teacherData) {
      const teacherId = teacherData.codigo_profesor;
      this.teacherName = teacherData.nombre; // Ajusta esto según la estructura de tu objeto teacherData
      this.loadTeacherData(teacherId);
      console.log(teacherData);
    } else {
      console.error('No se encontró la información del profesor en el servicio compartido');
    }
  }

  loadTeacherData(teacherId: string): void {
    this.googleFormsService.getAttendanceAndQR(teacherId)
      .subscribe(data => {
        this.attendanceData = data;
        console.log(this.attendanceData)
        this.qrCode = data.qrCode;
      });
  }
}
