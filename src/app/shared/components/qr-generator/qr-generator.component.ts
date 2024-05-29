import { Component } from '@angular/core';
import { SubjectService } from 'src/app/core/services/subject.service';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QrGeneratorComponent {

  name: string = '';
  address: string = '';
  qr: string | null = null;
  subjects: any[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (data: any) => {
        this.subjects = data; // Suponiendo que los datos devueltos contienen un array con objetos que tienen las propiedades 'name' y 'qr'
      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }

  generateQRCode() {
    const qrCodeDataUri = 'https://api.qrserver.com/v1/create-qr-code/?data=' + encodeURIComponent(this.address) + '&size=256x256';
    this.convertImageToBase64(qrCodeDataUri);
  }

  convertImageToBase64(url: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx!.drawImage(img, 0, 0);

      // Convertir la imagen del código QR a base64
      this.qr = canvas.toDataURL('image/png');
    };

    img.src = url;
  }

  submitForm() {
    if (!this.qr) {
      console.error('Primero debes generar el código QR');
      return;
    }

    this.subjectService.createSubject(this.name, this.qr).subscribe(
      (response) => {
        console.log('Asignatura creada:', response);
        this.getSubjects()
        this.clearFields()
      },
      (error) => {
        console.error('Error al crear asignatura:', error);
      }
    );
  }

  clearFields() {
    this.name = '';
    this.address = '';
    this.qr = '';
  }

}
