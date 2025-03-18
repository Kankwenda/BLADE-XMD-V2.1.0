const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUdUTW1jRWE2RGNZanphYjd3UUYxLyt3M21zMWVFam5vQkpGUTIxTllGcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMytqUHRtVG9reVFrcVRkSFhWVkNwUW9TUTJlejhwZTkwdG1mdkVvWXppcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBTHBIaEQ2VUJIODE5K1R6d3R4OGZBUDNmUHU4ZnJlNkJSaVU1V3RjQzFVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3MWkrYi9FU3B2dE1IZUl6Z21ORmVaRS9jWklkcDRtYWd6REdPMTAzSWlVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVKZXNlYzhCUlMrZmZHNmZkTXBsUE1WTThPMlUvWEtuYTYySEhHa3hVMlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ims5TXRxRDB1cVA5ZWJTQkNBR1dVU2VoUkYzRitiVFRuREJzUURobm5GVVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0YvZCtMRFNjWUVROUovcEdpd3VJZmFlY2hCTDIxMkFITHZXSlI2M3ptYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOW1vWVhicmh0TkFHTGZ3ZGxybjhQaFhsU1lTdVU0ZTRvL25LQVpXMDZIdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im4yQmt2UXAwOVpGRXlHMFdLOVU0L04wUHVod3JhcFdQdkpoaWJkUTJaN3E4UFRkaExMMEtpUEZtU0d2MUMyZDQ0TWFreHJiSEpKaTlpM2djUkNPRkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTcsImFkdlNlY3JldEtleSI6IjFyNCtENWhCYzhxcktRNEVhZVZWRmNkOGVHK3NvSlYrajNqcEp0Qjl2ZTQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlVfWk9PZzAxUnNLczJtZENNLVNmM3ciLCJwaG9uZUlkIjoiY2NmYTBlMDktYzkwNy00ZDg2LWE1M2UtNGMyZjc3ZDRkNDRiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBLMHFUbUJybzVHTTFXdGlSM1NkakkrbUNiRT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFOEtlcFJDYnMrR2ZTOW0wNmlYOER6UTFONVE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUkw1VFZOVkQiLCJtZSI6eyJpZCI6IjI0Mzg5ODU5ODUzMDoyMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnpZbjkwQ0VKdWw1TDRHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicU1DOWFNd253OEJRMkxjVW04NDhsb0FiUXZ6N0dZVDB3ZHdLbUJ3UDZGRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiK0sxRkRmT0NjMk1KeDAwRmVyTWFIVjUrVVRRODJtQ3VQRmhmYVVlejZJelVhRnl2M0tVTXVGL3Jtd0lkUUlveWQrV0JGbXB3dGZFcXlqeW9HVkJhQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6ImZ5WGRNMFpsQ3FBNnZZY2RSbEVYamlvRzdJNWZWQmRycTE2WWlQd1ZoSGNaS3MrVStGSWYyZ0UybHRxZE1JZGxXMGNYZ29UbTAwRzNXYXdqOElhS0FBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQzODk4NTk4NTMwOjIwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFqQXZXak1KOFBBVU5pM0ZKdk9QSmFBRzBMOCt4bUU5TUhjQ3BnY0QraFIifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDIyNzkzMzcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQXJrIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "243898598530",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
