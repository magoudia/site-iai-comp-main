// API pour consulter les données de la base
import mongoose from 'mongoose';

// Modèles de données
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['nouveau', 'lu', 'traité'], default: 'nouveau' }
});

const formationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  formation: { type: String, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['nouveau', 'confirmé', 'annulé'], default: 'nouveau' }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const FormationInscription = mongoose.models.FormationInscription || mongoose.model('FormationInscription', formationSchema);

// Connexion MongoDB
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((mongoose) => mongoose);
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Connecter à la base de données
    await connectDB();

    if (req.method === 'GET') {
      const { type, status, limit = 50, page = 1 } = req.query;
      
      let query = {};
      if (status) query.status = status;
      
      const skip = (page - 1) * limit;
      
      if (type === 'contacts') {
        const contacts = await Contact.find(query)
          .sort({ createdAt: -1 })
          .limit(parseInt(limit))
          .skip(skip);
        
        const total = await Contact.countDocuments(query);
        
        return res.status(200).json({
          success: true,
          data: contacts,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
          }
        });
      }
      
      if (type === 'formations') {
        const formations = await FormationInscription.find(query)
          .sort({ createdAt: -1 })
          .limit(parseInt(limit))
          .skip(skip);
        
        const total = await FormationInscription.countDocuments(query);
        
        return res.status(200).json({
          success: true,
          data: formations,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
          }
        });
      }
      
      // Statistiques générales
      const contactsCount = await Contact.countDocuments();
      const formationsCount = await FormationInscription.countDocuments();
      const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
      const recentFormations = await FormationInscription.find().sort({ createdAt: -1 }).limit(5);
      
      return res.status(200).json({
        success: true,
        stats: {
          totalContacts: contactsCount,
          totalFormations: formationsCount,
          recentContacts,
          recentFormations
        }
      });
    }
    
    if (req.method === 'PATCH') {
      const { id, status, type } = req.body;
      
      if (!id || !status || !type) {
        return res.status(400).json({
          success: false,
          error: 'ID, status et type requis'
        });
      }
      
      let updatedRecord;
      if (type === 'contact') {
        updatedRecord = await Contact.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
      } else if (type === 'formation') {
        updatedRecord = await FormationInscription.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
      }
      
      if (!updatedRecord) {
        return res.status(404).json({
          success: false,
          error: 'Enregistrement non trouvé'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: updatedRecord
      });
    }
    
    return res.status(405).json({
      success: false,
      error: 'Méthode non autorisée'
    });
    
  } catch (error) {
    console.error('Erreur admin:', error);
    return res.status(500).json({
      success: false,
      error: 'Erreur serveur',
      details: error.message
    });
  }
}
