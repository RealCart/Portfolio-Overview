import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Modal.scss';

type Coin = {
  name: string;
  price: number;
  change24h: number;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddAsset: (selectedCoin: Coin, quantity: number) => void;
  coinsData: Coin[];
}

const AddAssetModal: React.FC<Props> = ({ isOpen, onClose, onAddAsset, coinsData }) => {
  const [search, setSearch] = useState('');
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>(coinsData);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredCoins(coinsData);
    } else {
      setFilteredCoins(
        coinsData.filter((coin) => 
          coin.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, coinsData]);

  const handleSelectCoin = (coin: Coin) => {
    setSelectedCoin(coin);
  };

  const handleAdd = () => {
    if (!selectedCoin || quantity <= 0) return;
    onAddAsset(selectedCoin, quantity);
    onClose();
    setSelectedCoin(null);
    setQuantity(0);
    setSearch('');
  };

  const handleCancel = () => {
    onClose();
    setSelectedCoin(null);
    setQuantity(0);
    setSearch('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            onClick={handleCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h3>Поиск валюты</h3>
            <input
              type="text"
              placeholder="BTC, ETH..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <hr />

            <div className="coin-list">
              {filteredCoins.map((coin) => {
                const isSelected = coin.name === selectedCoin?.name;
                return (
                  <div
                    key={coin.name}
                    className={`coin-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectCoin(coin)}
                  >
                    <div className="coin-name">{coin.name}</div>
                    <div className="coin-price">
                      ${coin.price.toFixed(2)}
                    </div>
                    <div
                      className="coin-change"
                      style={{ color: coin.change24h >= 0 ? 'green' : 'red' }}
                    >
                      {coin.change24h >= 0 ? `+${coin.change24h.toFixed(2)}%` : `${coin.change24h.toFixed(2)}%`}
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedCoin && (
              <div className="selected-coin-summary">
                <span>{selectedCoin.name}</span>
                <span>${selectedCoin.price.toFixed(4)}</span>
              </div>
            )}

            <div className="quantity-section">
              <label>Количество</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>
            <hr />
            
            <div className="buttons">
              <button className="add-btn" onClick={handleAdd}>добавить</button>
              <button className="cancel-btn" onClick={handleCancel}>отмена</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddAssetModal;
