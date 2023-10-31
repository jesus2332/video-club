const Booking = require('../models/booking');

async function create(req, res, next) {
  try {
    const { date, member, copy } = req.body;
    const booking = new Booking({
      date,
      member,
      copy,
    });
    const savedBooking = await booking.save();
    res.status(201).json({ message: 'Reserva creada con éxito', booking: savedBooking });
  } catch (error) {
    next(error);
  }
}




async function list(req, res, next) {
    try {
      const bookings = await Booking.find().populate({
        path: '_member',
        model: 'Member',
        select: '_name _lastName _phone _address', 
      });
      res.status(200).json({ message: 'Lista de reservas', bookings });
    } catch (error) {
      next(error);
    }
  }
  

async function index(req, res, next) {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId).populate('member copy');
    if (!booking) {
      return res.status(404).json({ message: 'Reserva no encontrada', booking: null });
    }
    res.status(200).json({ message: 'Reserva encontrada', booking });
  } catch (error) {
    next(error);
  }
}

async function replace(req, res, next) {
  const bookingId = req.params.id;
  const { date, member, copy } = req.body;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { date, member, copy },
      { new: true }
    ).populate('member copy');
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Reserva no encontrada', booking: null });
    }
    res.status(200).json({ message: 'Reserva reemplazada correctamente', booking: updatedBooking });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  const bookingId = req.params.id;
  const { date, member, copy } = req.body;
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        $set: {
          date,
          member,
          copy,
        },
      },
      { new: true }
    ).populate('member copy');
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Reserva no encontrada', booking: null });
    }
    res.status(200).json({ message: 'Reserva actualizada correctamente', booking: updatedBooking });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  const bookingId = req.params.id;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Reserva no encontrada', booking: null });
    }
    res.status(200).json({ message: 'Reserva eliminada correctamente', booking: deletedBooking });
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
  destroy,
};
