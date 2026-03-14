import { useRouter } from "next/navigation";
import { useListingById, useLookups } from ".";
import { useActionState, useEffect, useTransition } from "react";
import { updateListingAction } from "../actions";
import { ListingFormValues } from "../validation";
import { mapListingToForm } from "@/shared/lib/utils";

export function useEditListing(id: number) {
    const router = useRouter();
    const { data: lookups } = useLookups();
    const { data: response } = useListingById(id);
    const [isPending, startTransition] = useTransition();
    const [state, dispatch] = useActionState(updateListingAction, null);
  
    useEffect(() => {
      if (state?.success) router.push(`/listings/${id}`);
    }, [state]);
  
    const handleSubmit = (data: ListingFormValues) => {
      startTransition(() => dispatch({ ...data, id }));
    };
  
    return {
      lookups,
      defaultData: response?.data ? mapListingToForm(response.data) : undefined,
      isPending,
      error: state?.error,
      handleSubmit,
    };
  }