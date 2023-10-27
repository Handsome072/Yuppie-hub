const fs = require("fs");
async function convertImageToBase64(imagePath) {
  try {
    const image = fs.readFileSync(imagePath);
    const imageBase64 = image.toString("base64");

    return imageBase64;
  } catch (error) {
    console.error(
      "Erreur lors de la conversion de l'image en données base64 : ",
      error
    );
    return null;
  }
}

module.exports = convertImageToBase64;
