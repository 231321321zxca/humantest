const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const path = require('path');
const si = require('systeminformation');
const fs = require('fs');

let mainWindow;
let tray = null; // トレイアイコン用
let isQuitting = false; // "本当に終了するか"のフラグ

const settingsPath = path.join(app.getPath('userData'), 'settings.json');

const defaultSettings = {
  runOnStartup: false,
  minimizeToTray: false,
  hardwareAcceleration: true,
  theme: 'violet' // テーマ設定を追加
};

function loadSettings() {
  try {
    if (fs.existsSync(settingsPath)) {
      const data = fs.readFileSync(settingsPath, 'utf-8');
      return { ...defaultSettings, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Failed to load settings:', e);
  }
  return defaultSettings;
}

function saveSettings(settings) {
  try {
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    
    // スタートアップ登録
    app.setLoginItemSettings({
      openAtLogin: settings.runOnStartup,
      path: app.getPath('exe'),
    });
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

// ▼ ハードウェアアクセラレーション設定 (アプリ起動前に適用必須)
const initialSettings = loadSettings();
if (!initialSettings.hardwareAcceleration) {
  app.disableHardwareAcceleration();
}

function createTray() {
  if (tray) return;
  // トレイアイコン画像 (public/tray.png が必要ですが、無い場合はエラー回避のため空のアイコンになります)
  // ※本来は `tray.png` を用意すべきですが、今回は簡易的にアプリアイコンを使います
  try {
    tray = new Tray(path.join(__dirname, 'public/favicon.ico')); // faviconがあればそれを使う
    const contextMenu = Menu.buildFromTemplate([
      { label: 'Show App', click: () => mainWindow.show() },
      { label: 'Quit', click: () => { isQuitting = true; app.quit(); } }
    ]);
    tray.setToolTip('Zero Hub');
    tray.setContextMenu(contextMenu);
    
    tray.on('click', () => mainWindow.show());
  } catch (e) {
    console.log("Tray icon creation failed (Icon not found?). Skipping.");
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Zero Hub",
    backgroundColor: '#050507',
    autoHideMenuBar: true, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'out/index.html'));
  }

  // ▼ 閉じるボタンを押した時の挙動 (トレイ機能)
  mainWindow.on('close', (event) => {
    const currentSettings = loadSettings();
    if (currentSettings.minimizeToTray && !isQuitting) {
      event.preventDefault(); // 終了をキャンセル
      mainWindow.hide();      // ウィンドウを隠す
      createTray();           // トレイアイコンを作る
    }
    // 設定がOFFならそのまま終了
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// ▼ IPC通信
ipcMain.handle('get-settings', async () => loadSettings());

ipcMain.handle('save-settings', async (event, newSettings) => {
  saveSettings(newSettings);
  
  // ハードウェアアクセラレーション変更時は再起動が必要な旨を伝えるなどの処理が可能
  return true;
});

ipcMain.handle('get-system-stats', async () => {
  // (前回と同じデータ取得処理)
  try {
    const cpuLoad = await si.currentLoad();
    const cpuTemp = await si.cpuTemperature();
    const mem = await si.mem();
    const graphics = await si.graphics();
    let gpuLoad = 0;
    let gpuTemp = 0;
    if (graphics.controllers && graphics.controllers.length > 0) {
      gpuLoad = graphics.controllers[0].load || 0;
      gpuTemp = graphics.controllers[0].temperatureGpu || 0;
    }
    // エラー回避のためダミーPing
    const latency = { ms: 15 }; 

    return {
      cpuUsage: Math.round(cpuLoad.currentLoad),
      cpuTemp: Math.round(cpuTemp.main) || 0,
      ramUsage: Math.round((mem.active / mem.total) * 100),
      gpuUsage: Math.round(gpuLoad),
      gpuTemp: Math.round(gpuTemp) || 0,
    };
  } catch (error) {
    return { cpuUsage: 0, cpuTemp: 0, ramUsage: 0, gpuUsage: 0, gpuTemp: 0 };
  }
});