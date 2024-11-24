const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.validatePartner = functions.https.onRequest(async (req, res) => {
  const { partnerId } = req.query;

  if (!partnerId) {
    return res.status(400).send("ID du partenaire manquant.");
  }

  try {
    // Récupérer les données du partenaire en attente
    const pendingDoc = db.collection("pendingPartners").doc(partnerId);
    const partnerData = (await pendingDoc.get()).data();

    if (!partnerData) {
      return res.status(404).send("Partenaire introuvable.");
    }

    // Ajouter aux partenaires validés
    await db.collection("validatedPartners").doc(partnerId).set(partnerData);

    // Supprimer des partenaires en attente
    await pendingDoc.delete();

    return res.send("Partenaire validé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la validation :", error);
    return res.status(500).send("Erreur lors de la validation du partenaire.");
  }
});
