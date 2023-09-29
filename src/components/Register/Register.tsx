import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { app} from '../../firebaseConfig';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../../styles/main.css';


const Register = () => {
  const [username, setUsername] = useState<string>(''); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, {
          displayName: username,
        });

        const usersCollection = collection(db, 'users');
        const userId = user.uid;
        const userDocRef = doc(usersCollection, userId);
        await setDoc(userDocRef, {
          username: username,
          wallet: 0, 
        });

        console.log(user.displayName);
        alert('登録完了');
        navigate('/dashboard');
      }
    } catch (error) { 
      console.error("Error registering user:", error);
      alert('登録失敗');
    }
  };

  return (
    <div className='register-container'>
      <h1 className="register-title">ユーザー登録</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label className='form-label' htmlFor="username">ユーザ名</label>
          <input 
            type="text" 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='form-group-input'
          />
        </div>
        <div className="form-group">
          <label className='form-label' htmlFor="email">メールアドレス</label>
          <input 
            type="email" 
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-group-input'
          />
        </div>
        <div className="form-group">
          <label className='form-label' htmlFor="password">パスワード</label>
          <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            className='form-group-input'
          />
        </div>
        <button type='submit' className="submit-btn">新規登録</button>
      </form>
      <p className="login-link">ログインは<Link to="/login">こちらから</Link></p>
    </div>
  );
};

export default Register;