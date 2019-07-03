const path = require("path");
const isDev = require("electron-is-dev");
const { app, BrowserWindow } = require("electron");

const icon = path.join(__dirname, "icons/icon_128@2x.png");
const buildIndex = path.join(__dirname, "../build/index.html");
const devUrl = "http://localhost:3000";
const prodUrl = `file://${buildIndex}`;
const isDarwin = process.platform === "darwin";

let mainWindow;

app.on("ready", createWindow);
app.on("window-all-closed", () => (!isDarwin ? app.quit() : null));
app.on("activate", () => (mainWindow ? createWindow() : null));

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 700, icon });
  mainWindow.loadURL(isDev ? devUrl : prodUrl);
  if (isDev) mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => (mainWindow = null));
}
