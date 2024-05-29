import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Librerias terceros
import { QRCodeModule } from 'angularx-qrcode';

//Componentes propios
import { RegisterComponent } from './shared/components/register/register.component';
import { MainViewComponent } from './shared/components/main-view/main-view.component';
import { LoginComponent } from './shared/components/login/login.component';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

//Servicios
import { AuthService } from './core/services/auth.service';
import { SubjectService } from './core/services/subject.service';
import { QrGeneratorComponent } from './shared/components/qr-generator/qr-generator.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    MainViewComponent,
    QrGeneratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
  ],
  providers: [AuthService, SubjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
