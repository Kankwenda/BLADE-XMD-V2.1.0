const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = "public";

    // Check if bot is in private mode
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    // Organize commands by category
    cm.map(async (com, index) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT'); // Set timezone to East Africa Time (EAT)
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Bot information header
    let infoMsg = `
╭──────────────────❂
┊❂╭───*𝐁𝐋𝐀𝐃𝐄-𝐗𝐌𝐃*────❂
┊✺┊ *User* : ${s.OWNER_NAME}
┊✺┊ *Mode* : ${mode}
┊✺╰───────────────❂
┊✺┊ *Time* : ${temps}  
┊✺┊ *Ram* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┊❂╰───────────────❂
╰──────────────────❂ \n\n`;

    // Command list
    let menuMsg = `  
  **𝐁𝐋𝐀𝐃𝐄-𝐗𝐌𝐃 COMMANDS*
`;

    for (const cat in coms) {
        menuMsg += `*╭────❂* *${cat}* *❂*`;
        for (const cmd of coms[cat]) {
            menuMsg += `  
*┊❂* ${cmd}`;
        }
        menuMsg += `
*╰═════════════❂* \n`
    }

    menuMsg += `
◇            ◇
*—————✺✺✺✺—————*

  *𝐁𝐋𝐀𝐃𝐄-𝐗𝐌𝐃*                                         
*╰═════════════❂*
`;

    var lien = mybotpic();

    try {
        // Send menu with image, video, or plain text
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "I am *Zokou-MD*, developed by Djalega++", gifPlayback: true }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "*Ibrahim-tech*" }, { quoted: ms });
        } else {
            await repondre(infoMsg + menuMsg);
        }

        // Send and auto-play music
        await zk.sendMessage(dest, { 
            audio: { url: "https://files.catbox.moe/3glba0.mp3" }, 
            mimetype: "audio/mp4", 
            ptt: true  // Enables voice note playback
        }, { quoted: ms });

    } catch (e) {
        console.log("🥵🥵 Menu error " + e);
        repondre("🥵🥵 Menu error " + e);
    }
});
