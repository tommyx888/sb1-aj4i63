import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { DatabaseService } from '../services/DatabaseService';

export const DocumentViewerScreen = () => {
  const [document, setDocument] = useState(null);
  const [signature, setSignature] = useState('');
  const route = useRoute();
  const databaseService = new DatabaseService();

  useEffect(() => {
    const documentId = route.params?.documentId;
    if (documentId) {
      loadDocument(documentId);
    }
  }, []);

  const loadDocument = async (documentId) => {
    try {
      const documents = await databaseService.getLegalDocuments(documentId);
      setDocument(documents[0]);
    } catch (error) {
      console.error('Error loading document:', error);
    }
  };

  const signDocument = async () => {
    try {
      await databaseService.signDocument(document.id, signature);
      // Update UI to show document as signed
      setDocument({ ...document, signed: true });
    } catch (error) {
      console.error('Error signing document:', error);
    }
  };

  if (!document) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{document.title}</Text>
      <Text style={styles.content}>{document.content}</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your full name to sign"
        value={signature}
        onChangeText={setSignature}
      />
      <Button
        title="Sign Document"
        onPress={signDocument}
        disabled={document.signed}
      />
      {document.signed && (
        <Text style={styles.signedText}>Document Signed</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  signedText: {
    color: 'green',
    fontWeight: 'bold',
    marginTop: 8,
  },
});