import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLandClassification,
  deleteLandClassification,
  getCommissionOfferSettings,
  getCommunication,
  getLandClassifications,
  updateCommunicationSettings,
  updateGlobalCommissionRate,
  updateLandClassification,
  updateMaxOfferPercent,
  updateMinOfferPercent,
} from "../services/settings.services";

//Land Classification

//Post
export const useCreateLandClassification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLandClassification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["land-classifications"],
      });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLandClassification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["land-classifications"],
      });
    },
  });
};
//Put
export const useUpdateLandClassification = () => {
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGlobalCommissionRate,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commission-settings"],
      });
    },
  });
};
//Put
export const useUpdateMinOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMinOfferPercent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commission-settings"],
      });
    },
  });
};
//Put
export const useUpdateMaxOffer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMaxOfferPercent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["commission-settings"],
      });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCommunicationSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["communication-settings"],
      });
    },
  });
};
