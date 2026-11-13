const ALLOWED_STATUSES = ['new', 'in_progress', 'done'];

export function validateApplication(req, res, next) {
  const { name, phone, status } = req.body || {};

  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Поле name є обов\'язковим і не може бути порожнім' });
  }

  if (typeof phone !== 'string' || phone.trim() === '') {
    return res.status(400).json({ message: 'Поле phone є обов\'язковим і не може бути порожнім' });
  }

  if (status !== undefined && !ALLOWED_STATUSES.includes(status)) {
    return res.status(400).json({
      message: `Поле status має бути одним із: ${ALLOWED_STATUSES.join(', ')}`
    });
  }

  next();
}
