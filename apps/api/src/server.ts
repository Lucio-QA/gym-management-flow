import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo exitosamente en el puerto ${PORT}`);
  console.log(`👉 Entorno: ${process.env.NODE_ENV || "development"}`);
})