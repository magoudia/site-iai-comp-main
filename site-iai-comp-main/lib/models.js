// Modèles de données pour MongoDB
import mongoose from 'mongoose';

// Schéma pour les messages de contact
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['nouveau', 'lu', 'traité'],
    default: 'nouveau'
  }
});

// Schéma pour les inscriptions formation
const formationInscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  formation: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['nouveau', 'confirmé', 'annulé'],
    default: 'nouveau'
  }
});

// Créer les modèles
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const FormationInscription = mongoose.models.FormationInscription || mongoose.model('FormationInscription', formationInscriptionSchema);

export { Contact, FormationInscription };
