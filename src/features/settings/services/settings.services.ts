import { api } from "@/shared/lib/axios/axios.instance";
import { AddFaqPayload, Data } from "../types";
import { LandClassificationPayload } from "../validation/land-class.validation";
import { AxiosResponse } from "axios";

//Add LandClassification

//Post



export const createLandClassification = async (
  data: LandClassificationPayload,
  token: string
): Promise<AxiosResponse> => {

  return await api.post(
    "/api/admin/land-classifications",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//Get LandClassification
export const getLandClassifications = () => {
  return api.get("/api/admin/land-classifications");
};
//Delete LandClassification
export const deleteLandClassification = (id: number, token: string) => {
  return api.delete(`/api/admin/land-classifications/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//Update LandClassification
export const updateLandClassification = (
  id: number,
  data: any,
  token: string
) => {
  return api.put(`/api/admin/land-classifications/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//commissionOffers

export const getCommissionOfferSettings = () => {
  return api.get(`/api/admin/commissionoffersettings`);
};

export const updateGlobalCommissionRate = (
  data: { globalCommissionRate: number },
  token: string
) => {
  return api.put("/api/admin/commissionoffersettings/global-commission", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMinOfferPercent = (
  data: { minOfferPercent: number },
  token: string
) => {
  return api.put("/api/admin/commissionoffersettings/min-offer", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMaxOfferPercent = (
  data: { maxOfferPercent: number },
  token: string
) => {
  return api.put("/api/admin/commissionoffersettings/max-offer", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// Communication Settings

export const getCommunication = () => {
  return api.get(`/api/admin/communicationssettings`);
};


export const updateCommunicationSettings = (
  data: {
    whatsAppNumber: string;
    contactUsEmail: string;
    supportEmail: string;
    businessHours: string;
    timeZone: string;
  },
  token: string
) => {
  return api.put("/api/admin/communicationssettings", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


// FAQ
//Post
export const addFaq = (
  data: {
    questionEn: string;
    questionAr: string;
    answerEn: string;
    answerAr: string;
  },
  token: string
) => {
  return api.post("/api/admin/faq/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Get
export const getFaqs = ()=>{
  return api.get(`/api/admin/faq/list`)
}

//Patch
export const reorderFaqs = (
  data: {
    items: { id: number; displayOrder: number }[];
  },
  token: string
) => {
  return api.patch("/api/admin/faq/reorder", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Delete 

export const deleteFaq = (id: number, token: string) => {
  return api.delete(`/api/admin/faq/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//Put
export const updateFaq = (
  data: {
    id: number;
    questionEn: string;
    questionAr: string;
    answerEn: string;
    answerAr: string;
  },
  token: string
) => {
  return api.put("/api/admin/faq/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};