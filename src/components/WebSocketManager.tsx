import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateAsset, Asset } from '../features/portfolioSlice';

const WebSocketManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const assets = useAppSelector((state) => state.portfolio.assets);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const streams = ['btcusdt@miniTicker', 'ethusdt@miniTicker'];
    const url = `wss://stream.binance.com:9443/stream?streams=${streams.join('/')}`;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket подключился!!!');
    };

    ws.onmessage = (evt) => {
      try {
        const data = JSON.parse(evt.data);
        const ticker = data?.data;
        if (!ticker) return;
        const symbol = ticker.s;  
        const priceStr = ticker.c;
        const changeStr = ticker.P; 
        if (!priceStr || !changeStr) {
          return;
        }
        const price = parseFloat(priceStr);
        const change24h = parseFloat(changeStr);
        if (isNaN(price) || isNaN(change24h)) {
          console.warn('Получены некорректные значения цены/изменения:', priceStr, changeStr);
          return;
        }
        if (symbol !== 'BTCUSDT' && symbol !== 'ETHUSDT') {
          return; 
        }
        let matchedSymbolName = '';
        if (symbol === 'BTCUSDT') {
          matchedSymbolName = 'BTC';
        } else if (symbol === 'ETHUSDT') {
          matchedSymbolName = 'ETH';
        }
        const matchedAssets = assets.filter(
          (a) => a.name.toUpperCase() === matchedSymbolName
        );
        if (matchedAssets.length === 0) {
          return;
        }
        matchedAssets.forEach((asset) => {
          const updatedAsset: Asset = {
            ...asset,
            currentPrice: price,
            totalValue: asset.quantity * price,
            change24h,
          };
          dispatch(updateAsset(updatedAsset));
        });
      } catch (error) {
        console.error("Error в обработке сообщения WebSocket:", error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket отключился!!!');
    };
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [dispatch]);

  return null;
};

export default WebSocketManager;
