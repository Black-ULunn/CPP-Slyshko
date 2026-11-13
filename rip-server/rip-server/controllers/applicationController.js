import mongoose from 'mongoose';
import Application from '../models/Application.js';


function isInvalidId(id) {
  return !mongoose.isValidObjectId(id);
}

export async function getApplications(req, res) {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET /api/applications/:id — одна заявка
export async function getApplicationById(req, res) {
  try {
    if (isInvalidId(req.params.id)) {
      return res.status(400).json({ message: 'Некоректний id' });
    }
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Заявку не знайдено' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createApplication(req, res) {
  try {
    const { name, phone, comment, status } = req.body;
    const application = await Application.create({ name, phone, comment, status });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateApplication(req, res) {
  try {
    if (isInvalidId(req.params.id)) {
      return res.status(400).json({ message: 'Некоректний id' });
    }
    const { name, phone, comment, status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { name, phone, comment, status },
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: 'Заявку не знайдено' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteApplication(req, res) {
  try {
    if (isInvalidId(req.params.id)) {
      return res.status(400).json({ message: 'Некоректний id' });
    }
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Заявку не знайдено' });
    }
    res.status(200).json({ message: 'Заявку успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
