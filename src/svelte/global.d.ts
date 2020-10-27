/// <reference types="electron" />

interface NodeRequire {
  (id: "electron"): typeof Electron;
  (id: "electron/common"): typeof Electron.Common;
  (id: "electron/main"): typeof Electron.Main;
  (id: "electron/renderer"): typeof Electron.Renderer;
  (id: "electron-is-dev"): typeof import("electron-is-dev");
}
