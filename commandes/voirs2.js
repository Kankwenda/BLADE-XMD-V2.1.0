const { zokou } = require("../framework/zokou");

zokou({ nomCom: "vv", categorie: "General", reaction: "🤲🏿" }, async (dest, zk, commandeOptions) => {
    const { ms, msgRepondu, repondre } = commandeOptions;

    // Vérification si le message est bien répondu
    if (!msgRepondu) {
        return repondre("*Mentionne un message view once*.");
    }

    // Vérification si c'est bien un message view once
    if (msgRepondu.viewOnceMessageV2) {
        const message = msgRepondu.viewOnceMessageV2.message;

        // Traitement pour une image
        if (message.imageMessage) {
            try {
                var image = await zk.downloadAndSaveMediaMessage(message.imageMessage);
                var texte = message.imageMessage.caption || "";

                // Envoi de l'image
                await zk.sendMessage(dest, { image: { url: image }, caption: texte }, { quoted: ms });
            } catch (error) {
                console.error("Erreur lors du téléchargement de l'image:", error);
                return repondre("Il y a eu une erreur lors du traitement de l'image.");
            }
        } 
        // Traitement pour une vidéo
        else if (message.videoMessage) {
            try {
                var video = await zk.downloadAndSaveMediaMessage(message.videoMessage);
                var texte = message.videoMessage.caption || "";

                // Envoi de la vidéo
                await zk.sendMessage(dest, { video: { url: video }, caption: texte }, { quoted: ms });
            } catch (error) {
                console.error("Erreur lors du téléchargement de la vidéo:", error);
                return repondre("Il y a eu une erreur lors du traitement de la vidéo.");
            }
        } else {
            return repondre("Le message ne contient ni image ni vidéo.");
        }
    } else {
        return repondre("Ce n'est pas un message view once.");
    }
});
