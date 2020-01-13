import File from '../models/File';

class FileController {
  async store(req, res) {
    // desestru. do arquivo de upload, pegando os 2 dados e renomeando para o bd
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
