"use strict";
var pm2 = require('pm2');
// [run the app] electron ./main.js
const { app, nativeImage, Tray, Menu, BrowserWindow } = require("electron");
// var app = require('app');
const { shell } = require('electron');
const path = require('path');
const iconPath = path.join(__dirname, 'icons', 'alien-outlineTemplate.png');
const scriptPath = path.join(__dirname, 'assets', 'server_start.sh');
console.log('the path to the icons is: ' + iconPath);
let top = {}; // prevent gc to keep windows
let toptwo = {}; // prevent gc to keep windows
app.once("ready", ev => {
    top.win = new BrowserWindow({
        width: 1024, height: 600, center: true, minimizable: false, show: false,
        webPreferences: {
            nodeIntegration: false,
            webSecurity: true,
            sandbox: true,
        },
    });
    top.win.loadURL("https://kaiqa.duckdns.org");
    top.win.openDevTools();
    top.win.on("close", ev => {
        console.log('send window hide page kaiqa');
        console.log(ev);
        ev.sender.hide();
        ev.preventDefault(); // prevent quit process
    });

    toptwo.win = new BrowserWindow({
        width: 1124, height: 400 + 410,
        minimizable: true, show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    toptwo.win.loadURL('file://' + __dirname + '/index-script.html');

    toptwo.win.on("close", ev => {
        console.log('send window hide script');
        ev.sender.hide();
        ev.preventDefault(); // prevent quit process
    });
    top.tray = new Tray(iconPath);
    const menu = Menu.buildFromTemplate([
        {
            label: "Actions", submenu: [
                {
                    label: "Open kaiqa", click: (item, window, event) => {
                        top.win.show();
                    }
                },
            ]
        },
        { type: "separator" },
        {
            label: "server", submenu: [
                {
                    label: "pm2 restart webapp", click: (item, window, event) => {
                        pm2.restart('webapp', (err, proc) => {
                        });
                    }
                },
                { type: "separator" },
                {
                    label: "pm2 start webapp", click: (item, window, event) => {
                        pm2.start('webapp', (err, proc) => {
                        });
                    }
                },
                { type: "separator" },
                {
                    label: "pm2 stop webapp", click: (item, window, event) => {
                        pm2.stop('webapp', (err, proc) => {
                        });
                        pm2.list((err, list) => {
                            console.log(err, list)
                        })
                        // toptwo.win.show();
                    }
                },
                { type: "separator" },
                {
                    label: "run server script", click: (item, window, event) => {
                        toptwo.win.show();
                    }
                },
            ]
        },
        { type: "separator" },
        { role: "quit" }, // "role": system prepared action menu
    ]);
    top.tray.setToolTip("hello yo");
    top.tray.setContextMenu(menu);
});
app.on("before-quit", ev => {
    // BrowserWindow "close" event spawn after quit operation,
    // it requires to clean up listeners for "close" event
    top.win.removeAllListeners("close");
    toptwo.win.removeAllListeners("close");
    // release windows
    console.log('recieved close remove all');
    top = null;
});