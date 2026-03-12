"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addFaq,
  createLandClassification,
  deleteFaq,
  deleteLandClassification,
  getCommissionOfferSettings,
  getCommunication,
  getFaqs,
  getLandClassifications,
  reorderFaqs,
  updateCommunicationSettings,
  updateFaq,
  updateGlobalCommissionRate,
  updateLandClassification,
  updateMaxOfferPercent,
  updateMinOfferPercent,
} from "../services/settings.services";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

//Land Classification

//Get
export const useLandClassifications = () => {
  return useQuery({
    queryKey: ["land-classifications"],
    queryFn: async () => {
      const res = await getLandClassifications();
      return res.data.data.value;
    },
  });
};



//Commission Offer Settings

//Get

export const useCommissionOfferSettings = () =>
  useQuery({
    queryKey: ["commission-offer-settings"],
    queryFn: async () => {
      const res = await getCommissionOfferSettings();
      return res.data.data;
    },
  });




//Communication

//Get
export const useCommunication = () => {
  return useQuery({
    queryKey: ["Communication-settings"],
    queryFn: async () => {
      const res = await getCommunication();
      return res.data.data;
    },
  });
};


//FAQ



//Get

export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await getFaqs();
      return res.data.data.items;
    },
  });
};


