import React, { useState } from 'react';
import { getFirestore, runTransaction, doc } from "firebase/firestore";

type User = {
  wallet: number;
};

type TipFunctionProps = {
  senderId: string;
  receiverId: string;
};

const TipFunction: React.FC<TipFunctionProps> = ({ senderId, receiverId }) => { 
  const [amount, setAmount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const db = getFirestore();

  const handleTip = async () => { 
    setStatusMessage(null);
    if (amount <= 0) {
      setStatusMessage("送る金額を正しく入力してください");
      return;
    }

    const senderDocRef = doc(db, "users", senderId);
    const receiverDocRef = doc(db, "users", receiverId);

    try {
      await runTransaction(db, async (transaction) => {
        const senderDoc = await transaction.get(senderDocRef);
        const receiverDoc = await transaction.get(receiverDocRef);

        if (!senderDoc.exists() || !receiverDoc.exists()) {
          throw "送金先または送金元のデータが取得できませんでした！";
        }

        const senderData = senderDoc.data() as User;
        const receiverData = receiverDoc.data() as User;

        if (senderData.wallet < amount) {
          setStatusMessage("残高が足りません");
          return;
        }
        transaction.update(senderDocRef, { wallet: senderData.wallet - amount });
        transaction.update(receiverDocRef, { wallet: receiverData.wallet + amount });
      });

      setStatusMessage("送金が完了しました");
    } catch (error) { 
      console.error('Tip failed:', error);
      setStatusMessage('投げ銭に失敗しました。');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="金額を入力"
        min="1"
      />
      <button onClick={handleTip}>送金</button>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default TipFunction;
