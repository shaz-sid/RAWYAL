import express from 'express';
import { submitContactForm } from '../controllers/contact.controller.js';

const router = express.Router();

/**
 * POST /api/contact/submit
 * Submit a new quote request
 */
router.post('/submit', submitContactForm);

export default router;
