import React, { useState } from "react";
import { getFirestore, runTransaction, doc } from "firebase/firestore";

type SendMoneyModalProps = {
  senderId: string;
  receiverId: string;
  onClose: () => void;
  onSendMoney: (amount: number) => void;
};

const SendMoneyModal: React.FC<SendMoneyModalProps> = ({ senderId, receiverId, onClose, onSendMoney }) => {
  const [amount, setAmount] = useState<number | null>(null);
  const db = getFirestore();

  const handleSendMoney = async () => { 
    if (!amount || amount <= 0) {
      alert("送る金額を正しく入力してください");
      return;
    }

    onSendMoney(amount);

    const senderDocRef = doc(db, "users", senderId);
    const receiverDocRef = doc(db, "users", receiverId);

    try {
      await runTransaction(db, async (transaction) => {
        const senderDoc = await transaction.get(senderDocRef);
        const receiverDoc = await transaction.get(receiverDocRef);

        if (!senderDoc.exists() || !receiverDoc.exists()) {
          throw "送金先または送金元のデータが取得できませんでした！";
        }

        const senderData = senderDoc.data();
        const receiverData = receiverDoc.data();

        if (senderData?.wallet < amount ) {
          alert("残高が足りません");
          return;
        }

        transaction.update(senderDocRef, { wallet: senderData.wallet - amount });
        transaction.update(receiverDocRef, { wallet: receiverData.wallet + amount });
      });

      alert("送金が完了しました");
      onClose();
    } catch (error) {
      console.error('Send money failed:', error);
      alert('送金に失敗しました。');
    }
  }

  return (
    <div className="send-money-modal">
      <input
        type="number"
        value={amount || ""}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="金額を入力"
        min="1"
        className="send-money-input"
      />
      <button onClick={handleSendMoney} className="send-button">送る</button>
      <button onClick={onClose} className="cancel-button">キャンセル</button>
    </div>
  );
};

export default SendMoneyModal;