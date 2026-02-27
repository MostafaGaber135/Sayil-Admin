import { api } from "@/shared/lib/axios/axios.instance";

//Add LandClassification
export const createLandClassification = (data: {
  code: string;
  nameAr: string;
  nameEn: string;
  discountPercent: number;
}) => {
  return api.post("/api/admin/land-classifications", data);
};

//Get LandClassification
export const getLandClassifications = () => {
  return api.get("/api/admin/land-classifications");
};
//Delete LandClassification
export const deleteLandClassification = (id: number) => {
  return api.delete(`/api/admin/land-classifications/${id}`);
};
//Update LandClassification
export const updateLandClassification = (
  id: number,
  data: {
    id: 0;
    nameAr: string;
    nameEn: string;
    discountPercent: number;
  },
) => {
  return api.put(`/api/admin/land-classifications/${id}`, data);
};

export const getCommissionOfferSettings = () => {
  return api.get(`/api/admin/commissionoffersettings`);
};

export const updateGlobalCommissionRate = (data: {
  globalCommissionRate: number;
}) => {
  return api.put("/api/admin/commissionoffersettings/global-commission", data);
};

export const updateMinOfferPercent = (data: { minOfferPercent: number }) => {
  return api.put("/api/admin/commissionoffersettings/min-offer", data);
};

export const updateMaxOfferPercent = (data: { maxOfferPercent: number }) => {
  return api.put("/api/admin/commissionoffersettings/max-offer", data);
};

export const getCommunication = () => {
  return api.get(`/api/admin/communicationssettings`);
};

// Communication Settings

export const updateCommunicationSettings = (data: {
  whatsAppNumber: string;
  contactUsEmail: string;
  supportEmail: string;
  businessHours: string;
  timeZone: string;
}) => {
  return api.put("/api/admin/communicationssettings", data);
};
