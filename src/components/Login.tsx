import React ,{ useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import '../styles/main.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('ログインしました');
    } catch (error) {
      let errorMessage = 'ログイン失敗';

      switch ((error as any).code) {
        case 'auth/invalid-email':
          errorMessage = '無効なメールアドレスです。';
          break;
        case 'auth/user-disabled':
          errorMessage = 'このアカウントは無効です。';
          break;
        case 'auth/user-not-found':
          errorMessage = 'ユーザーが見つかりませんでした。';
          break;
        case 'auth/wrong-password':
          errorMessage = 'パスワードが間違っています。';
          break;
        default:
          errorMessage = 'ログインに失敗しました。再度お試しください。';
      }
      alert(errorMessage);
    }
  };

  return (
    <div className='login-container'>
      <h1 className="login-title">ログイン</h1>
      <form className="login-form" onSubmit={handleLogin}>
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
            onChange={(e) => setPassword(e.target.value)}
            className='form-group-input'
          />
        </div>
        <button type='submit' className='submit-btn'>ログイン</button>
      </form>
      <p className="login-link">新規登録は<a href="">こちらから</a></p>
    </div>
  );
};

export default Login;
