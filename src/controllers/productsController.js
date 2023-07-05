import { Repuesto } from "../config/database.js";
import { body, validationResult } from 'express-validator';

// Operación de creación
export async function createRepuesto(req, res) {
  try {
    await validateCreateRepuesto(req);

    const repuestoData = req.body;
    const repuesto = await Repuesto.createRepuesto(repuestoData);
    res.status(201).json(repuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Operación de lectura
export async function getRepuesto(req, res) {
  try {
    const repuestoId = req.params.id;
    const repuesto = await Repuesto.getRepuestoById(repuestoId);
    if (!repuesto) {
      res.status(404).json({ message: 'Repuesto no encontrado.' });
    } else {
      res.json(repuesto);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Operación de actualización
export async function updateRepuesto(req, res) {
  try {
    await validateUpdateRepuesto(req);

    const repuestoId = req.params.id;
    const repuestoData = req.body;
    const repuesto = await Repuesto.updateRepuesto(repuestoId, repuestoData);
    res.json(repuesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Operación de eliminación
export async function deleteRepuesto(req, res) {
  try {
    const repuestoId = req.params.id;
    await Repuesto.deleteRepuesto(repuestoId);
    res.json({ message: 'Repuesto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Función de validación para la creación de repuesto
async function validateCreateRepuesto(req) {
  await body('nombre').notEmpty().withMessage('El nombre es requerido.').run(req);
  await body('precio').notEmpty().isDecimal().withMessage('El precio debe ser un número decimal.').run(req);
  await body('cantidadDisponible').notEmpty().isInt().withMessage('La cantidad disponible debe ser un número entero.').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error('Error de validación');
  }
}

// Función de validación para la actualización de repuesto
async function validateUpdateRepuesto(req) {
  await body('nombre').notEmpty().withMessage('El nombre es requerido.').run(req);
  await body('precio').notEmpty().isDecimal().withMessage('El precio debe ser un número decimal.').run(req);
  await body('cantidadDisponible').notEmpty().isInt().withMessage('La cantidad disponible debe ser un número entero.').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error('Error de validación');
  }
}
