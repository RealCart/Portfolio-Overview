
# Portfolio Overview

# Запуск

  Клонируйте репозиторий или скачайте архив проекта:
```bash
    git clone https://github.com/yourname/portfolio-overview.git
    cd portfolio-overview 
```

  Установите зависимости:
```bash
    npm install
```

  Запустите приложение в режиме разработки:
```bash
    npm start
```

# Архитектура проекта

  ```
  portfolio-overview
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
    └─ index.tsx
  ```

# Библиотеки
  ```
    React, 
    TypeScript,
    Redux Toolkit,
    SCSS,
    WebSocket,
    framer-motion,
    react-chartjs-2, 
    chart.js,
    uuid.
  ```
