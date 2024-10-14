import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseService } from '../services/DatabaseService';

export const OnboardingScreen = () => {
  const [employeeInfo, setEmployeeInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const navigation = useNavigation();
  const databaseService = new DatabaseService();

  const saveEmployeeInfo = async () => {
    try {
      await databaseService.saveEmployeeInfo(employeeInfo);
      // Navigate to document upload or next step
    } catch (error) {
      console.error('Error saving employee info:', error);
    }
  };

  const uploadDocument = async (documentType: string) => {
    // In a real app, you'd use a document picker here
    console.log(`Uploading ${documentType}`);
  };

  const viewLegalDocuments = async () => {
    try {
      const documents = await databaseService.getLegalDocuments(employeeInfo.email);
      if (documents.length > 0) {
        navigation.navigate('DocumentViewer', { documentId: documents[0].id });
      }
    } catch (error) {
      console.error('Error fetching legal documents:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={employeeInfo.firstName}
        onChangeText={(text) => setEmployeeInfo({ ...employeeInfo, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={employeeInfo.lastName}
        onChangeText={(text) => setEmployeeInfo({ ...employeeInfo, lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={employeeInfo.email}
        onChangeText={(text) => setEmployeeInfo({ ...employeeInfo, email: text })}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={employeeInfo.phone}
        onChangeText={(text) => setEmployeeInfo({ ...employeeInfo, phone: text })}
        keyboardType="phone-pad"
      />
      <Button title="Save Information" onPress={saveEmployeeInfo} />
      <Button title="Upload ID" onPress={() => uploadDocument('ID')} />
      <Button title="Upload Resume" onPress={() => uploadDocument('Resume')} />
      <Button title="View Legal Documents" onPress={viewLegalDocuments} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});