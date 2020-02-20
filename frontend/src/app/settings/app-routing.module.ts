import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../components/security/login.component';
import { AuthGuard } from '../components/security/auth.guard';
import { ProprietarioIndexComponent } from '../components/proprietario/proprietario.index.component';
import { FichaIndexComponent } from '../components/ficha/ficha.index.component';
import { FichaComponent } from '../components/ficha/ficha.component';
import { ProprietarioComponent } from '../components/proprietario/proprietario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'fichas', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'proprietarios', component: ProprietarioIndexComponent, canActivate: [AuthGuard] },
  { path: 'proprietarios/:id', component: ProprietarioComponent, canActivate: [AuthGuard] },
  { path: 'fichas', component: FichaIndexComponent, canActivate: [AuthGuard] },
  { path: 'fichas/:id', component: FichaComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule,]
})
export class AppRoutingModule { }
