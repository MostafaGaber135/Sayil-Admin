import { api } from "@/shared/lib/axios/axios.instance";
import { AddFaqPayload, Data } from "../types";

//Add LandClassification

//Post
export const createLandClassification = (data: Data) => {
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


// FAQ
//Post
export const addFaq = (data: {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}) => {
  return api.post("/api/admin/faq/add", data);
};

//Get
export const getFaqs = ()=>{
  return api.get(`/api/admin/faq/list`)
}

//Patch
export const reorderFaqs = (data: {
  items: { id: number; displayOrder: number }[];
}) => {
  return api.patch("/api/admin/faq/reorder", data);
};

//Delete 

export const deleteFaq = (id: number) => {
  return api.delete(`/api/admin/faq/${id}`);
};

//Put
export const updateFaq = (data: {
  id: number;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}) => {
  return api.put("/api/admin/faq/update", data);
};