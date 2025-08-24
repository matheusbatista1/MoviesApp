import multer from "multer";
import multerS3 from "multer-s3";
import { s3, BUCKET_NAME } from "../../config/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: BUCKET_NAME,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, `movies/${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export async function deleteImageFromS3(key: string) {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
    );
    console.log("Imagem deletada com sucesso!");
  } catch (err) {
    console.error("Erro ao deletar imagem:", err);
    throw err;
  }
}