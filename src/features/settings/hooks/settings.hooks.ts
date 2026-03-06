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

//Post
export const useCreateLandClassification = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLandClassification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["land-classifications"],
      });

      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};
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
//Delete
export const useDeleteLandClassification = () => {
  const t = useTranslations();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLandClassification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["land-classifications"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};
//Put
export const useUpdateLandClassification = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: {
        id: number;
        nameAr: string;
        nameEn: string;
        discountPercent: number;
      };
    }) => updateLandClassification(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["land-classifications"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
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
//Put
export const useUpdateGlobalCommission = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGlobalCommissionRate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commission-offer-settings"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};
//Put
export const useUpdateMinOffer = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMinOfferPercent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commission-offer-settings"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};
//Put
export const useUpdateMaxOffer = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMaxOfferPercent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commission-offer-settings"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};

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
//Put
export const useUpdateCommunicationSettings = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommunicationSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["communication-settings"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};

//FAQ

//Post
export const useAddFaq = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFaq,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};

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

// Patch

export const useReorderFaqs = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reorderFaqs,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};

//Delete

export const useDeleteFaq = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFaq(id),

    onSuccess: () => {
      // refresh FAQ list automatically
      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};

// Put

export const useUpdateFaq = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFaq,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["faqs"],
      });
      toast.success(t("pages.roles.toasts.AddedLand"));
    },
    onError: () => {
      toast.error(t("pages.roles.toasts.Failed"));
    },
  });
};
