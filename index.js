import express from "express";
import admin from "firebase-admin";

const app = express();
const PORT = process.env.PORT || 3000;

// 🔥 FIREBASE DESDE VARIABLE DE ENTORNO
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://TU-PROYECTO.firebaseio.com"
});

const db = admin.database();

app.get("/data", async (req, res) => {
  const data = {
    bpm: Number(req.query.bpm || 0),
    bateria: Number(req.query.bateria || 0),
    senal: Number(req.query.senal || 0),
    lat: Number(req.query.lat || 0),
    lng: Number(req.query.lng || 0),
    time: Date.now()
  };

  await db.ref("dispositivo1").set(data);
  res.json({ status: "ok", data });
});

app.listen(PORT, () => {
  console.log("Servidor activo");
});

