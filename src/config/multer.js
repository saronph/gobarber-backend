import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  // como o multer vai guardar os arquivos de imagens
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      /* randomiza a imagem, para que nao exista imagens duplicadas e caracteres
      indesejáveis, '16' numeros de bytes aleat. */
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        /* cb da função, null para caso não tenha erro, res formato hexadecimal
        dos '16', 'extname' coloca apenas a extensão do arquivo original */
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
