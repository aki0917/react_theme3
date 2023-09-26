import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { onSnapshot, DocumentSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

type User = {
  id: string;
  username: string;
  wallet: number;
};

const Dashboard = () => {
  const [username, setUsername] = useState<string | null>("ゲスト");
  const [loading, setLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<number>(0);
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName || "ゲスト");
    }
    setLoading(false);
  }, [auth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const filteredUsersList = usersList.filter(user => user.id !== currentUserId);

        setUsers(filteredUsersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchData();
  }, [currentUserId]);
  
  useEffect(() => {
    console.log("Updated Users State:", users);
  }, [users]);

  useEffect(() => { 
    if (currentUserId) {
      const db = getFirestore();
      const userDocRef = doc(db, "users", currentUserId);

      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setWallet(userData?.wallet || 0);
        }
      });
    }
  });

  const handleWalletCheck = (user:User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      alert("ログインしました");
    } catch (error) {
      alert("ログアウト中にエラーが発生しました");
    }
  }

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>ダッシュボード</h2>
        <button className="logout-button" onClick={handleLogout}>ログアウト</button>
      </div>
      <p>ユーザー名: {username}</p>
      <p>ウォレット残高: {wallet}円</p>
      <div className="users-list">
        <h3>ユーザー一覧</h3>
        <ul>
          {users.map(user => (
            <li key={user.id} className="user-item">
              <p className="username">ユーザー名: {user.username}</p>
              <button onClick={() => handleWalletCheck(user)}>ウォレット確認</button>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && selectedUser && (
        <>
          <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal">
            <p>{selectedUser.username}のウォレット残高: {selectedUser.wallet}円</p>
            <button onClick={() => setIsModalOpen(false)}>閉じる</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
