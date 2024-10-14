import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
})
export class DocumentViewerComponent implements OnInit {
  document: any;
  signature: string = '';

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    const documentId = this.route.snapshot.paramMap.get('id');
    this.loadDocument(documentId);
  }

  async loadDocument(documentId: string) {
    try {
      const documents = await this.databaseService.getLegalDocuments(documentId);
      this.document = documents[0];
    } catch (error) {
      console.error('Error loading document:', error);
    }
  }

  async signDocument() {
    try {
      await this.databaseService.signDocument(this.document.id, this.signature);
      // Update UI to show document as signed
    } catch (error) {
      console.error('Error signing document:', error);
    }
  }
}