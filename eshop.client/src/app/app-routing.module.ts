import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AuthService } from '../services/auth-service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RoleGuard } from '../guards/role.guard';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './login-page/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login-page/reset-password/reset-password.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ModeratorComponent } from './moderator/moderator.component';

export function initializeAuth(authService: AuthService) {
  return () => authService.init();
}

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'index', redirectTo: '', pathMatch: 'full' }, 
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { role: ['Admin'] } },
  { path: 'moderator', component: ModeratorComponent, canActivate: [RoleGuard], data: { role: ['Admin', 'Moderator' ]} }, 
  { path: 'product', component: ProductPageComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true
    }
  ]
})
export class AppRoutingModule { }
