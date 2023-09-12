import * as admin from 'firebase-admin';
import firebaseAdminConfig from './firebaseAdminConfig';

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminConfig as any)
});

export default admin;
