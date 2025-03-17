zokou({
  'nomCom': "bible",
  'reaction': '🎎',
  'categorie': "General"
}, async (message, sender, args) => {
  const { repondre: respond, arg: arguments, ms: metadata } = args;
  const searchQuery = arguments.join(" ");
  if (!searchQuery) {
    return respond("Veuillez spécifier le livre, le chapitre et le verset que vous souhaitez lire. Exemple : bible Romains 6:23");
  }
  let response = await fetch("https://bible-api.com/" + searchQuery + "?translation=lsg");
  if (!response.ok) {
    return respond("Veuillez spécifier le numéro ou le nom du chapitre. Exemple : timothée jean 3:16");
  }
  let data = await response.json();
  let replyText = "📖 *LA SAINTE BIBLE*\n\n📜 *_NOUS LISONS :_* " + data.reference + "\n\n🔢 *_NOMBRE DE VERSETS :_* " + data.verses.length + "\n\n🤍 *_TEXTE :_* " + data.text + "\n\n🌍 *_LANGUE :_* " + data.translation_name + "\n\n\n╭────────────────◆\n│ *_𝐁𝐋𝐀𝐃𝐄 𝐗𝐌𝐃 Écriture._*\n╰─────────────────◆";
  await respond(replyText);
});
