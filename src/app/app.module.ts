import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptFormsModule } from '@nativescript/angular'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './auth/login.component'
import { OnboardingComponent } from './onboarding/onboarding.component'
import { DocumentViewerComponent } from './documents/document-viewer.component'
import { AuthService } from './auth/auth.service'
import { DatabaseService } from './services/database.service'

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    OnboardingComponent,
    DocumentViewerComponent
  ],
  providers: [
    AuthService,
    DatabaseService
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}