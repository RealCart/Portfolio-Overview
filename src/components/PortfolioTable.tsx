  import React from 'react';
  import { Asset } from '../features/portfolioSlice';
  import '../styles/PortfolioTable.scss';

  interface Props {
    assets: Asset[];
  }

  const PortfolioTable: React.FC<Props> = ({ assets }) => {
    if (assets.length === 0) {
      return <div className="empty-portfolio">Нет активов в вашем портфеле. Добавьте что-нибудь, чтобы начать!</div>;
    }

    return (
      <div className="portfolio-table-container">
        <table className="portfolio-table">
          <thead>
            <tr>
              <th>Актив</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Общая стоимость</th>
              <th>Изм. за 24 ч.</th>
              <th>% портфеля</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.name}</td>
                <td>{asset.quantity.toFixed(6)}</td>
                <td>${asset.currentPrice.toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                <td>${asset.totalValue.toLocaleString('en-US',{minimumFractionDigits:2, maximumFractionDigits:2})}</td>
                <td style={{ color: asset.change24h >= 0 ? 'green' : 'red' }}>
                  {asset.change24h >= 0 ? `+${(asset.change24h ?? 0).toFixed(2)}%` : `${(asset.change24h ?? 0).toFixed(2)}%`}
                </td>
                <td>{asset.portfolioShare.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  export default PortfolioTable;
