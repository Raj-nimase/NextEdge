import imagekit from "../config/imagekit.js";

export const uploadBuffer = (buffer, folder, fileName) => {
  return new Promise((resolve, reject) => {
    // Ensure fileName has an extension
    const fileNameWithExt = fileName.includes(".")
      ? fileName
      : `${fileName}.jpg`;

    const base64String = buffer.toString("base64");

    imagekit
      .upload({
        file: base64String,
        fileName: fileNameWithExt,
        folder: folder,
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.error("ImageKit upload error:", error);
        reject(error);
      });
  });
};
