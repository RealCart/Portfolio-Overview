import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../app/hooks';
import { addAsset } from '../../features/portfolioSlice';

const AddAssetForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddAsset = () => {
    if (!name || quantity <= 0) return;
    dispatch(
      addAsset({
        id: uuidv4(),
        name,
        quantity,
        currentPrice: 0,
        totalValue: 0,
        change24h: 0,
        portfolioShare: 0,
      })
    );
    setName('');
    setQuantity(0);
  };

  const handleReset = () => {
    setName('');
    setQuantity(0);
  };

  return (
    <div className="add-asset-form">
      <div>
        <label>Актив:</label>
        <input
          type="text"
          placeholder="BTC, ETH, AAPL..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Количество:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
        />
      </div>
      <div className="buttons">
        <button onClick={handleReset}>Сброс</button>
        <button onClick={handleAddAsset}>Добавить</button>
      </div>
    </div>
  );
};

export default AddAssetForm;
