const { zokou } = require("../framework/zokou");
const axios = require("axios");
const Genius = require("genius-lyrics");
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({
  'nomCom': "bible",
  'reaction': '🎎',
  'categorie': "General"
}, async (message, sender, args) => {
  const { repondre: respond, arg: arguments, ms: metadata } = args;
  const searchQuery = arguments.join(" ");
  
  if (!searchQuery) {
    return respond("Veuillez spécifier le livre, le chapitre et le verset que vous voulez lire. Exemple : *bible Romains 6:23*");
  }
  
  try {
    // Récupération de la Bible en anglais
    let responseEn = await fetch("https://bible-api.com/" + searchQuery);
    if (!responseEn.ok) {
      return respond("Chapitre ou verset introuvable. Essayez avec : *Jean 3:16*");
    }
    let dataEn = await responseEn.json();

    // Récupération de la Bible en français (Louis Segond)
    let responseFr = await fetch("https://bible-api.com/" + searchQuery + "?translation=lsv");
    if (!responseFr.ok) {
      return respond("Chapitre ou verset introuvable en français.");
    }
    let dataFr = await responseFr.json();
    
    let replyText = `📖 *LA SAINTE BIBLE / THE HOLY BIBLE*\n\n` +
      `📜 *_LIVRE | BOOK:_* ${dataEn.reference}\n\n` +
      `🔢 *_NOMBRE DE VERSETS:_* ${dataEn.verses.length}\n\n` +
      `🇬🇧 *_ENGLISH VERSION:_*\n${dataEn.text}\n\n` +
      `🇫🇷 *_VERSION FRANÇAISE:_*\n${dataFr.text}\n\n` +
      `🌍 *_LANGUES :_* ${dataEn.translation_name} / ${dataFr.translation_name}\n\n` +
      `╭────────────────◆\n│ *_𝐁𝐋𝐀𝐃𝐄 𝐗𝐌𝐃 Scripture._*\n╰────────────────◆`;
      
    await respond(replyText);
  } catch (error) {
    console.error(error);
    respond("❌ Une erreur est survenue en récupérant les versets.");
  }
});
