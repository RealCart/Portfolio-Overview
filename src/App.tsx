import { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import PortfolioTable from './components/PortfolioTable';
import WebSocketManager from './components/WebSocketManager';
import AddAssetModal from './components/AddAssetModal';
import FloatingAddButton from './components/FloatingAddButton';
import AnalyticsChart from './components/AnalyticsChart';

import { useAppSelector, useAppDispatch } from './app/hooks';
import { addAsset, setAssets } from './features/portfolioSlice';
import './styles/App.scss';

function App() {
  const dispatch = useAppDispatch();
  const assets = useAppSelector((state) => state.portfolio.assets);

  const [coinsData] = useState([
    { name: 'BTC', price: 80636.01, change24h: -3.08 },
    { name: 'ETH', price: 1847.61, change24h: -2.74 },
    { name: 'BNB', price: 574.09, change24h: 0.33 },
    { name: 'BCC', price: 0, change24h: 0.0 },
    { name: 'NEO', price: 7.56, change24h: -4.39 },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const savedAssets = localStorage.getItem('assets');
    if (savedAssets) {
      try {
        const parsed = JSON.parse(savedAssets);
        dispatch(setAssets(parsed));
      } catch (err) {
        console.error('Ошибка парсинга:', err);
      }
    }
  }, [dispatch]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAddAsset = (
    selectedCoin: { name: string; price: number; change24h: number },
    quantity: number
  ) => {
    dispatch(
      addAsset({
        id: Date.now().toString(),
        name: selectedCoin.name,
        quantity,
        currentPrice: selectedCoin.price,
        totalValue: selectedCoin.price * quantity,
        change24h: selectedCoin.change24h,
        portfolioShare: 0, 
      })
    );
  };

  return (
    <Layout>
      <WebSocketManager />
      <FloatingAddButton onClick={handleOpenModal} />
      <AddAssetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddAsset={handleAddAsset}
        coinsData={coinsData}
      />
      <PortfolioTable assets={assets} />
      <AnalyticsChart assets={assets} />
    </Layout>
  );
}

export default App;
