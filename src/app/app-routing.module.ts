import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { LoginComponent } from './auth/login.component'
import { OnboardingComponent } from './onboarding/onboarding.component'
import { DocumentViewerComponent } from './documents/document-viewer.component'
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuard] },
  { path: 'document/:id', component: DocumentViewerComponent, canActivate: [AuthGuard] },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}