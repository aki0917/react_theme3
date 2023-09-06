// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// export{};

import * as admin from 'firebase-admin';
import firebaseAdminConfig from './firebaseAdminConfig';

admin.initializeApp({
  credential: admin.credential.cert(firebaseAdminConfig as any)
});

export default admin;
