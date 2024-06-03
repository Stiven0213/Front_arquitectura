import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';


import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { MainViewComponent } from './shared/components/main-view/main-view.component';
import { QrGeneratorComponent } from './shared/components/qr-generator/qr-generator.component';



const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mainView', component: MainViewComponent, canActivate: [AuthGuard]},
  { path: 'qrGenerator', component: QrGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
