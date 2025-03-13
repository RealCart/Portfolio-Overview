Portfolio Overview

Запуск

  Клонируйте репозиторий или скачайте архив проекта:
  ```git clone https://github.com/yourname/portfolio-overview.git```
  ```cd portfolio-overview```

  Установите зависимости:
  ```npm install```

  Запустите приложение в режиме разработки:
  ```npm start```

Архитектура проекта

  ```portfolio-overview
  │  package.json
  │  tsconfig.json
  │  README.md
  │  ...
  └─ src
    ├─ app
    │   ├─ store.ts        
    │   └─ hooks.ts        
    ├─ features
    │   └─ portfolioSlice.ts 
    ├─ components
    │   ├─ Layout
    │   │   ├─ Header.tsx   
    │   │   └─ Layout.tsx   
    │   ├─ PortfolioTable.tsx
    │   ├─ AddAssetModal.tsx
    │   ├─ FloatingAddButton.tsx
    │   ├─ AnalyticsChart.tsx
    │   └─ WebSocketManager.tsx
    ├─ styles
    │   ├─ global.scss
    │   ├─ Layout.scss
    │   ├─ Modal.scss
    │   └─ ...
    ├─ App.tsx
    └─ index.tsx```

Использованные библиотеки
  React
  TypeScript
  Redux Toolkit (@reduxjs/toolkit)
  SCSS 
  WebSocket 
  framer-motion
  react-chartjs-2
  chart.js 
  uuid