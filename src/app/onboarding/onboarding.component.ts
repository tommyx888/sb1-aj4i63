import { Component } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
})
export class OnboardingComponent {
  employeeInfo: any = {};
  documents: any[] = [];

  constructor(private databaseService: DatabaseService, private router: Router) {}

  async saveEmployeeInfo() {
    try {
      await this.databaseService.saveEmployeeInfo(this.employeeInfo);
      // Navigate to document upload or next step
    } catch (error) {
      console.error('Error saving employee info:', error);
    }
  }

  async uploadDocument(args: any) {
    const file = args.object.get('file');
    try {
      await this.databaseService.uploadDocument(file, this.employeeInfo.id);
      // Update UI to show uploaded document
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  }

  async viewLegalDocuments() {
    try {
      this.documents = await this.databaseService.getLegalDocuments(this.employeeInfo.id);
      // Navigate to document viewer
      this.router.navigate(['/document', this.documents[0].id]);
    } catch (error) {
      console.error('Error fetching legal documents:', error);
    }
  }
}