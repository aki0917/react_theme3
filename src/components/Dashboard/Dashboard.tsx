import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { onSnapshot, DocumentSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import WalletModal from "../WalletModal/WalletModal";
import UserList from "../UserList/UserList";
import SendMoneyModal from "../SendMoneyModal/SendMoneyModal";
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
  const [isModalOpen, setIsModalOpen ] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);
  const [selectedReceiver, setSelectedReceiver] = useState<User | null>(null);
  const [isTipFunctionVisible, setIsTipFunctionVisible] = useState<boolean>(false);


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
    const db = getFirestore();
    const usersCollection = collection(db, "users");

    const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
      const updatedUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== currentUserId);
      setUsers(updatedUsers);
    });

    return () => unsubscribe();
  }, [currentUserId]);
  
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

  const handleUserClick = (user: User) => { 
    setSelectedUser(user);
    setIsModalOpen(true);
    setIsTipFunctionVisible(false);
  };

  const handleSendMoneyClick = (user: User) => {
    setSelectedReceiver(user);
    setIsSendMoneyModalOpen(true);
    setIsTipFunctionVisible(true);
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

      <UserList users={users} onUserClick={handleUserClick} onSendMoneyClick={handleSendMoneyClick} />
      
      {isModalOpen && selectedUser && (
        <WalletModal
          username={selectedUser.username}
          walletBalance={selectedUser.wallet}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    
      {isSendMoneyModalOpen && selectedReceiver && currentUserId && (
        <SendMoneyModal
        senderId={currentUserId}
        receiverId={selectedReceiver.id}
        onClose={() => setIsSendMoneyModalOpen(false)}
        onSendMoney={(amount) => {
          if (amount > 0) {
            alert(`${amount}円送金しました`);
          }
        }}
      />
      )}
    </div>
  );
}

export default Dashboard;
