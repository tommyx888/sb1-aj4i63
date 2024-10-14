import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://nbkmoelouinqlhrlzvnv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ia21vZWxvdWlucWxocmx6dm52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4OTY0MDcsImV4cCI6MjA0NDQ3MjQwN30.h5brPgYxhpSPSA1wQzgI3zcNVcddY5b-QlW8OwY_AI0');
  }

  async saveEmployeeInfo(employeeInfo: any) {
    const { data, error } = await this.supabase
      .from('employees')
      .insert(employeeInfo);
    
    if (error) throw error;
    return data;
  }

  async uploadDocument(file: any, employeeId: string) {
    const { data, error } = await this.supabase
      .storage
      .from('documents')
      .upload(`${employeeId}/${file.name}`, file);
    
    if (error) throw error;
    return data;
  }

  async getLegalDocuments(employeeId: string) {
    const { data, error } = await this.supabase
      .from('legal_documents')
      .select('*')
      .eq('employee_id', employeeId);
    
    if (error) throw error;
    return data;
  }

  async signDocument(documentId: string, signature: string) {
    const { data, error } = await this.supabase
      .from('legal_documents')
      .update({ signed: true, signature })
      .eq('id', documentId);
    
    if (error) throw error;
    return data;
  }
}