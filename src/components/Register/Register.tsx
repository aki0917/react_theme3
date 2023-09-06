import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, {
          displayName: username,
        });
        console.log(user.displayName);
        alert('登録完了');
      }
    } catch (error) { 
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
      <p className="login-link">ログインは<a href="">こちらから</a></p>
    </div>
  );
};

export default Register;