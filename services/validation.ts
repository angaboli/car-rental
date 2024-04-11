interface FormValidators {
  pickUpDate: (date: string) => string | null;
  pickUpTime: (pickUpTime: string, pickUpDate?: string) => string | null;
  dropOffDate: (dropOffDate: string, pickUpDate: string) => string | null;
  dropOffTime: (dropOffTime: string, pickUpTime: string, pickUpDate: string, dropOffDate: string) => string | null;
  firstName: (name: string) => string | null;
  lastName: (name: string) => string | null;
  emailAdress: (email: string) => string | null;
  phoneNumber: (phone: string, whatsAppNumber?: string) => string | null;
  whatsAppNumber: (phone: string, phoneNumber?: string) => string | null;
}

// Exemple d'implémentation de quelques validateurs
export const validators: FormValidators = {
  pickUpDate: (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const pickUpDate = new Date(date);
    return pickUpDate >= today ? null : "La date de récupération doit être aujourd'hui ou dans le futur.";
  },
  pickUpTime: (pickUpTime, pickUpDate) => {
    const now = new Date();
    const pickUpDateTime = new Date(`${pickUpDate}T${pickUpTime}`);
    return pickUpDateTime < now ? "L'heure de récupération doit être dans le futur." : "";
  },
  dropOffDate: (dropOffDate, pickUpDate) => {
    const start = new Date(pickUpDate);
    const end = new Date(dropOffDate);
    return end >= start ? null : "La date de retour doit être après la date de récupération.";
  },
  dropOffTime: (dropOffTime, pickUpTime, pickUpDate, dropOffDate) => {
    if (pickUpDate === dropOffDate) {
      const startTime = pickUpTime.split(":").map(Number);
      const endTime = dropOffTime.split(":").map(Number);
      const startDateTime = new Date(pickUpDate);
      startDateTime.setHours(startTime[0], startTime[1], 0);
      const endDateTime = new Date(dropOffDate);
      endDateTime.setHours(endTime[0], endTime[1], 0);
      return endDateTime <= startDateTime ? "L'heure de retour doit être après l'heure de récupération pour le même jour." : "";
    }
    return null;
  },
  firstName: (name) => {
    return name.trim() ? null : "Le prénom est requis.";
  },
  lastName: (name) => {
    return name.trim() ? null : "Le nom est requis.";
  },
  emailAdress: (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email) ? null : "L'email est invalide.";
  },
  phoneNumber: (phone, whatsAppNumber) => {
    // Assurez-vous qu'au moins un des deux numéros est fourni
    if (!phone.trim() && (!whatsAppNumber || !whatsAppNumber.trim())) {
      return "Au moins un numéro de téléphone est requis.";
    }
    // Validation du format du numéro de téléphone
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone) ? null : "Le format du numéro de téléphone est invalide.";
  },
  whatsAppNumber: (whatsAppNumber, phoneNumber) => {
    // Cette validation peut être similaire à celle de phoneNumber
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(whatsAppNumber) ? null : "Le format du numéro WhatsApp est invalide.";
  }
};

/*
// Fonction de validation pour la date de récupération
export const validatePickUpDate = (date: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pickUpDate = new Date(date);
  return pickUpDate < today ? "La date de récupération doit être aujourd'hui ou dans le futur." : "";
};

// Fonction de validation pour la date de retour
export const validateDropOffDate = (pickUpDate: string, dropOffDate: string): string => {
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