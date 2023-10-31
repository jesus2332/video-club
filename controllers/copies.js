const Copy = require('../models/copy');

async function create(req, res, next) {
  try {
    const { number, format, movie } = req.body;
    const copy = new Copy({
      number,
      format,
      movie,
    });
    const savedCopy = await copy.save();
    res.status(201).json({ message: 'Copia creada con éxito', copy: savedCopy });
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
    try {
        const copies = await Copy.find().populate({
            path: '_movie',
            model: 'Movie',
            populate: [
              {
                path: '_director',
                model: 'Director',
              },
              {
                path: '_actors',
                model: 'Actor',
              },
              {
                path: '_genre',
                model: 'Genre',
              },
            ],
          });
      res.status(200).json({ message: 'Lista de copias', copies });
    } catch (error) {
      next(error);
    }
  }
  

  async function index(req, res, next) {
    try {
      const copyId = req.params.id;
      const copy = await Copy.findById(copyId).populate({
        path: '_movie',
        model: 'Movie',
        populate: [
          {
            path: '_director',
            model: 'Director',
          },
          {
            path: '_actors',
            model: 'Actor',
          },
          {
            path: '_genre',
            model: 'Genre',
          },
        ],
      });
      if (!copy) {
        return res.status(404).json({ message: 'Copia no encontrada', copy: null });
      }
      res.status(200).json({ message: 'Copia encontrada', copy });
    } catch (error) {
      next(error);
    }
  }
  
  async function replace(req, res, next) {
    try {
        const copyId = req.params.id;
        let number = req.body.number? req.body.number : "";
        let format = req.body.format? req.body.format : "";
        let movie = req.body.movie? req.body.movie : "";

        const updatedCopy = await Copy.findOneAndReplace(
            { _id: copyId },
            { number, format, movie }
        );

        if (!updatedCopy) {
            return res.status(404).json({ message: 'Copia no encontrada', copy: null });
        }

        res.status(200).json({ message: 'Copia reemplazada correctamente', copy: updatedCopy });
    } catch (error) {
        next(error);
    }
}

  
async function update(req, res, next) {
    try {
        const copyId = req.params.id;
        const { number, format, movie } = req.body;

        const updatedCopy = await Copy.findOneAndReplace(
            { _id: copyId },
            { number, format, movie }
        );

        if (!updatedCopy) {
            return res.status(404).json({ message: 'Copia no encontrada', copy: null });
        }

        res.status(200).json({ message: 'Copia actualizada correctamente', copy: updatedCopy });
    } catch (error) {
        next(error);
    }
}
  
  async function destroy(req, res, next) {
    try {
      const copyId = req.params.id;
      const copy = await Copy.findByIdAndRemove(copyId).populate({
        path: '_movie',
        model: 'Movie',
        populate: [
          {
            path: '_director',
            model: 'Director',
          },
          {
            path: '_actors',
            model: 'Actor',
          },
          {
            path: '_genre',
            model: 'Genre',
          },
        ],
      });
      if (!copy) {
        return res.status(404).json({ message: 'Copia no encontrada', copy: null });
      }
      res.status(200).json({ message: 'Copia eliminada con éxito', copy });
    } catch (error) {
      next(error);
    }
  }
  

module.exports = {
  create,
  list,
  index,
  replace,
  update,
  destroy
};
