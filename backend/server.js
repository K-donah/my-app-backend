const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Test route
app.get('/api/test', async (req, res) => {
  try {
    const testRef = db.collection('test').doc('backend-test');
    await testRef.set({
      message: 'Hello from Backend API!',
      timestamp: new Date()
    });
    
    res.json({ 
      success: true, 
      message: 'Backend connected to Firebase!',
      documentId: testRef.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all test documents
app.get('/api/documents', async (req, res) => {
  try {
    const snapshot = await db.collection('test').get();
    const documents = [];
    snapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    res.json({ success: true, documents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend server is running!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log('?? Backend server running on http://localhost:' + PORT);
  console.log('?? Health check: http://localhost:' + PORT + '/api/health');
});
