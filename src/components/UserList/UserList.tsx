import React from "react";
import WalletModal from "../WalletModal/WalletModal";

type User = {
  id: string;
  username: string;
  wallet: number;
};

type UserListProps = { 
  users: User[];
  onUserClick: (user: User) => void;
  onSendMoneyClick: (user: User) => void;
};

const UserList : React.FC<UserListProps> = ({ users, onUserClick, onSendMoneyClick }) => { 

  return (
    <div className="users-list">
      <h3>ユーザー一覧</h3>
        <ul>
        {users.map(user => (
          <li key={user.id} className="user-item">
            <p className="username">ユーザー名: {user.username}</p>
            <div className="button-group">
              <button className="wallet-check-button" onClick={() => onUserClick(user)}>ウォレット確認</button>
              <button className="send-money-button" onClick={() => onSendMoneyClick(user)}>送る</button>
            </div>
          </li>
        ))}
        </ul>
    </div>
  )
}

export default UserList;