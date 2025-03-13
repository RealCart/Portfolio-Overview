import React from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { useAppDispatch } from '../app/hooks';
import { removeAsset, Asset } from '../features/portfolioSlice';
import './AssetsList.scss';

interface Props {
  assets: Asset[];
}

const ROW_HEIGHT = 50; 
const MAX_HEIGHT = 400;

const AssetsList: React.FC<Props> = ({ assets }) => {
  const dispatch = useAppDispatch();

  const Row = ({ index, style }: ListChildComponentProps) => {
    const asset = assets[index];

    const handleRemove = () => {
      dispatch(removeAsset(asset.id));
    };

    return (
      <div
        className="asset-row"
        style={style}
        onClick={handleRemove}
        title="Нажмите, чтобы удалить актив"
      >
        <div className="asset-col">{asset.name}</div>
        <div className="asset-col">Кол-во: {asset.quantity}</div>
        <div className="asset-col">Цена: ${asset.currentPrice.toFixed(2)}</div>
        <div className="asset-col">Сумма: ${asset.totalValue.toFixed(2)}</div>
        <div className="asset-col">24ч: {asset.change24h.toFixed(2)}%</div>
        <div className="asset-col">Доля: {asset.portfolioShare.toFixed(2)}%</div>
      </div>
    );
  };

  if (!assets.length) {
    return <div>Активов пока нет</div>;
  }

  return (
    <div className="assets-list-container">
      <List
        height={MAX_HEIGHT}
        itemCount={assets.length}
        itemSize={ROW_HEIGHT}
        width="100%"
        style={{ border: '1px solid #ccc' }}
      >
        {Row}
      </List>
    </div>
  );
};

export default AssetsList;
