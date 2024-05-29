import { Component, OnInit } from '@angular/core';
import { GoogleFormsService } from 'src/app/core/services/google-forms.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent implements OnInit {

  attendanceData: any[] = [];

  constructor(private googleFormsService: GoogleFormsService){}

  ngOnInit(): void {
    this.getAttendance('calculo');
  }

  getAttendance(subject: string): void{
    this.googleFormsService.getAttendanceBySubject(subject)
    .subscribe(data => {
      this.attendanceData = data;
    })
  }
}
