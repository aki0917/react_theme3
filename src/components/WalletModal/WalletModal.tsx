import React from "react";

type walletModalProps = { 
  username: string;
  walletBalance: number;
  onClose: () => void;
};

const WalletModal : React.FC<walletModalProps> = ({ username, walletBalance, onClose }) => {
  return (
    <>
    <div className="overlay" onClick={onClose}></div>
    <div className="modal">
      <p>{username}のウォレット残高: {walletBalance}円</p>
      <button onClick={onClose}>閉じる</button>
    </div>
  </>
  );
};

export default WalletModal;