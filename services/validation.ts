import {FormValidators} from '@/types';

// Validateur
export const validators: FormValidators = {
  pickUpDate: (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickUpDate = new Date(date);
    return pickUpDate >= today ? null : "La date de récupération doit être aujourd'hui ou dans le futur.";
  },
  pickUpTime: (pickUpTime, pickUpDate) => {
    if (!pickUpDate) return null;
    const now = new Date();
    const pickUpDateTime = new Date(`${pickUpDate}T${pickUpTime}`);
    return pickUpDateTime < now ? "L'heure de récupération doit être dans le futur." : null;
  },
  dropOffDate: (dropOffDate, pickUpDate) => {
    !pickUpDate && null;
    const start = new Date(pickUpDate);
    const end = new Date(dropOffDate);
    if (end < start) {
      return "La date de retour doit être après la date de récupération.";
    }
    return null; // Aucune erreur si la condition est respectée
  },
  dropOffTime: (dropOffTime, pickUpTime, pickUpDate, dropOffDate) => {
    if (!pickUpDate || !pickUpTime || !dropOffDate) return null;
    if (pickUpDate === dropOffDate) {
      const startTime = pickUpTime.split(":").map(Number);
      const endTime = dropOffTime.split(":").map(Number);
      const startDateTime = new Date(pickUpDate);
      startDateTime.setHours(startTime[0], startTime[1], 0);
      const endDateTime = new Date(dropOffDate);
      endDateTime.setHours(endTime[0], endTime[1], 0);
      return endDateTime <= startDateTime ? "L'heure de retour doit être après l'heure de récupération pour le même jour." : null;
    }
    return null;
  },
  firstName: (name) => name.trim() ? null : "Le prénom est requis.",
  lastName: (name) => name.trim() ? null : "Le nom est requis.",
  emailAdress: (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email) ? null : "L'email est invalide.";
  },
  phoneNumber: (phone, whatsAppNumber) => {
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : "";
    const trimmedWhatsAppNumber = typeof whatsAppNumber === 'string' ? whatsAppNumber.trim() : "";

    if (!trimmedPhone && !trimmedWhatsAppNumber) {
      return "Au moins un numéro de téléphone est requis.";
    }

    const phoneRegex = /^\+?\d{10,15}$/;

    // Vérifier que chaque numéro fourni est valide
    if (trimmedPhone && !phoneRegex.test(trimmedPhone)) {
      return "Numéro de téléphone non valide";
    }
    if (trimmedWhatsAppNumber && !phoneRegex.test(trimmedWhatsAppNumber)) {
      return "Numéro WhatsApp non valide";
    }

    return null; // Aucune erreur
  },
};

/*
// Fonction de validation pour la date de récupération
export const validateDate= (date: string,  referenceDate : string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(date);
  const end = new Date(referenceDate);
  return start >= today ? null : "La date de récupération doit être aujourd'hui ou dans le futur.";
  if (end < start) {
    return "La date de retour doit être après la date de récupération.";
  }
};

// Fonction de validation pour la date de retour
export const validateDropOffDate = (date: string, referenceDate : string): string => {
  const start = new Date(pickUpDate);
  const end = new Date(dropOffDate);
  return end < start ? "La date de retour doit être après la date de récupération." : "";
};

// Fonction de validation pour l'heure de récupération
export const validatePickUpTime = (pickUpDate: string, pickUpTime: string): string => {
  const now = new Date();
  const pickUpDateTime = new Date(`${pickUpDate}T${pickUpTime}`);
  return pickUpDateTime < now ? "L'heure de récupération doit être dans le futur." : "";
};

// Fonction de validation pour l'heure de retour
export const validateDropOffTime = (pickUpDate: string, dropOffDate: string, pickUpTime: string, dropOffTime: string): string => {
  if (pickUpDate === dropOffDate) {
    const startTime = pickUpTime.split(":").map(Number);
    const endTime = dropOffTime.split(":").map(Number);
    const startDateTime = new Date(pickUpDate);
    startDateTime.setHours(startTime[0], startTime[1], 0);
    const endDateTime = new Date(dropOffDate);
    endDateTime.setHours(endTime[0], endTime[1], 0);
    return endDateTime <= startDateTime ? "L'heure de retour doit être après l'heure de récupération pour le même jour." : "";
  }
  return "";
};

// Fonction de validation pour le prénom et le nom
export const validateName = (name: string): string => {
  return name.trim() === "" ? "Ce champ est obligatoire." : "";
};

// Fonction de validation pour l'email
export const validateEmail = (email: string): string => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !regex.test(email) ? "L'adresse email est invalide." : "";
};

// Fonction de validation pour le numero de tél
export const validatePhone = (phone: string, whatsApp: string): string => {
  const phoneRegex = /^\+?\d{10,15}$/;

  // Vérification si au moins un des deux numéros est fourni
  if (!phone && !whatsApp) { return "Au moins un numéro de téléphone est requis"; }

  // Vérification de la validité de chaque numéro, si fourni
  if (phone && !phoneRegex.test(phone)) { return "Numéro de téléphone non valide"; }
  if (whatsApp && !phoneRegex.test(whatsApp)) { return "Numéro WhatsApp non valide"; }
  return "";
}; */