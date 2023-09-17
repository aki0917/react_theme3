import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../../styles/main.css";

const Dashboard = () => {
  const [username, setUsername] = useState<string | null>("ゲスト");
  const [loading, setLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<number>(0);

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

  if (loading) {
    return <p>読み込み中...</p>;
  };

  return (
    <div className="dashboard">
      <h2>ダッシュボード</h2>
      <p>ユーザー名: {username}</p>
      <p>ウォレット残高: {wallet}円</p>
    </div>
  );
}
export default Dashboard;