// High-revenue industries ideal for web services clients
// Focused on professional services, medical/healthcare, and home services
// Full list: https://developers.google.com/maps/documentation/places/web-service/supported_types

export const POPULAR_INDUSTRIES = [
  // Legal Services
  { value: "lawyer", label: "Law Firm / Attorney" },

  // Medical & Healthcare
  { value: "doctor", label: "Doctor / Medical Practice" },
  { value: "dentist", label: "Dentist / Dental Practice" },
  { value: "physiotherapist", label: "Physical Therapist" },
  { value: "chiropractor", label: "Chiropractor" },
  { value: "veterinarian", label: "Veterinarian" },

  // Home Services - High Revenue
  { value: "plumber", label: "Plumber" },
  { value: "electrician", label: "Electrician" },
  { value: "roofing_contractor", label: "Roofing Contractor" },
  { value: "general_contractor", label: "General Contractor" },
  { value: "hvac", label: "HVAC Contractor" },
  { value: "painter", label: "Painter / Painting Contractor" },

  // Home Services - Specialized
  { value: "locksmith", label: "Locksmith" },
  { value: "pest_control_service", label: "Pest Control" },
  { value: "moving_company", label: "Moving Company" },
  { value: "landscaper", label: "Landscaping / Lawn Care" },
  { value: "tree_service", label: "Tree Service" },
  { value: "window_installation_service", label: "Window Installation" },
  { value: "flooring_contractor", label: "Flooring Contractor" },

  // Professional Services
  { value: "accounting", label: "Accounting / CPA" },
  { value: "real_estate_agency", label: "Real Estate Agency" },
  { value: "insurance_agency", label: "Insurance Agency" },

  // Auto Services
  { value: "car_repair", label: "Auto Repair Shop" },
  { value: "auto_body_shop", label: "Auto Body Shop" },

  // Premium Personal Services
  { value: "spa", label: "Spa / Wellness Center" },
  { value: "beauty_salon", label: "Beauty Salon" },
] as const;

export type IndustryValue = (typeof POPULAR_INDUSTRIES)[number]["value"];
