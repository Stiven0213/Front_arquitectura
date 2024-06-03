import { Component } from '@angular/core';
import { SubjectService } from 'src/app/core/services/subject.service';
import Swal from 'sweetalert2';

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
        console.log(data)
      },
      (error) => {
        console.error('Error al obtener las asignaturas:', error);
      }
    );
  }

  generateQRCode() {
    if (!this.name || !this.address) {
      Swal.fire({
        title: 'Campos Incompletos',
        text: 'Por favor completa todos los campos antes de generar el código QR.',
        icon: 'error',
        showCancelButton: false,
        showCloseButton: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

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
      Swal.fire({
        title: 'Primero genera el QR',
        icon: 'error',
        showCancelButton: false,
        showCloseButton: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      return;
    }

    this.subjectService.createSubject(this.name, this.qr).subscribe(
      (response) => {
        console.log('Asignatura creada:', response);
        this.getSubjects()
        this.clearFields()
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Asignatura creada correctamente"
        });
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

  deleteSubject(id_asignatura: number): void {
    this.subjectService.deleteSubjectById(id_asignatura).subscribe(() => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Asignatura eliminada correctamente"
      });
      this.getSubjects(); // Recargar la lista de asignaturas después de eliminar
    });
  }

}
