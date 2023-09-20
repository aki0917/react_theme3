import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

const Dashboard = () => {
  const [username, setUsername] = useState<string | null>("ゲスト");
  const [loading, setLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || "ゲスト");
      } else {
        setUsername("ゲスト");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
      navigate("/login");
      alert("ログアウトしました");
    } catch (error) {
      alert("ログアウト中にエラーが発生しました");
    }

    if (loading) {
      return <p>読み込み中...</p>;
    };
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>ダッシュボード</h2>
        <button className="logout-button" onClick={handleLogout}>ログアウト</button>
      </div>
      <p>ユーザー名: {username}</p>
      <p>ウォレット残高: {wallet}円</p>
    </div>
  );
}
export default Dashboard;