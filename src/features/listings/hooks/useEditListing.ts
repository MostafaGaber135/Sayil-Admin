"use client";
import { useRouter } from "next/navigation";
import { useListingById, useLookups } from ".";
import { useActionState, useEffect, useTransition } from "react";
import { addLandAction, updateListingAction } from "../actions";
import { CreateListingRequest, ListingFormValues } from "../validation";
import { mapListingToForm } from "@/shared/lib/utils";

export function useEditListing(id: number) {
  const router = useRouter();
  const { data: lookups } = useLookups();
  const { data: response } = useListingById(id);
  const [state, dispatch, isPending] = useActionState(updateListingAction, null);

  useEffect(() => {
    if (state?.success) router.push(`/listings/${id}`);
  }, [state, router, id]);

  const handleSubmit = (data: ListingFormValues) => {
    dispatch({ ...data, id });
  };

  return {
    lookups,
    defaultData: response?.data ? mapListingToForm(response.data) : undefined,
    isPending,
    error: state?.error,
    handleSubmit,
  };
}

export function useAddLand() {
  const router = useRouter();
  const [state, dispatch, isPending] = useActionState(addLandAction, null);

  useEffect(() => {
    if (state?.success) router.push("/listings");
  }, [state, router]);

  const addLand = (data: CreateListingRequest) => {
    dispatch(data);
  };

  return {
    addLand,
    isPending,
    error: state?.error,
  };
}