// 필요한 부품들(모듈)을 가져옵니다.
const { app, BrowserWindow } = require('electron');
const path = require('path');

// 프로그램을 실행할 창을 생성하는 함수입니다.
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1600, // 창의 가로 크기
    height: 1000, // 창의 세로 크기
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 가장 중요한 부분: 우리가 만든 index.html 파일을 창에 불러옵니다.
  mainWindow.loadFile('index.html');

  // 개발자 도구를 열고 싶다면 아래 줄의 주석을 해제하세요.
  // mainWindow.webContents.openDevTools();
};

// Electron이 준비되면 창을 생성합니다.
app.whenReady().then(() => {
  createWindow();

  // 맥OS에서 Dock 아이콘 클릭 시 새 창 열기 (일반적인 기능)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 모든 창이 닫히면 앱을 종료합니다. (윈도우, 리눅스)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit(); // 'darwin'은 맥OS를 의미합니다.
});