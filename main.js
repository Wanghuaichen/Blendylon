const {app, BrowserWindow} = require('electron');
let win;

let createWindow = _ =>
{
    win = new BrowserWindow({
        width       : 1280,
        height      : 720,
        center      : true,
        frame       : true,
        movable     : true,
        resizable   : true,
        alwaysOnTop : false,
        show        : true,
    });

    win.loadURL(`file://${__dirname}/index.html`);
    win.maximize();

    if(process.env.ELECTRON_ENV == 'development') {
        win.webContents.openDevTools();
        BrowserWindow.addDevToolsExtension('./app/libs/vuedevtools/3.0.8_0');
    }

    win.on('ready', _ => {
        win.maximize();
        win.on('closed', _ => win = null);
    })
};

app.on('ready', createWindow);
app.on('window-all-closed', _ => process.platform !== 'darwin' ? app.quit() : null);
app.on('activate',          _ => win === null ? createWindow() : null);
app.on('ready',             _ => win.once('ready-to-show', _ => win.show()));
