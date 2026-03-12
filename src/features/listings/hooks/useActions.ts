import {useMutation} from "@tanstack/react-query";
;
import {CreateListingRequest} from "@/features/listings/validation";
import { fetchAddLandAction } from "@/server-actions/listings/create-land.action";

export const useCreateListing = () => {
    return useMutation({
        mutationFn:(body:CreateListingRequest)=> fetchAddLandAction(body),
        onSuccess:(data:any) => {
        },
        onError: (error) => {
            console.error(' Error:', error);
        },
    })
    // server action
    // const [isPending, startTransition] = useTransition()
    // const [state, addListingAction] = useActionState(fetchAddLandAction, undefined);
    //
    // const handleAddListings = (formData: FormData) => {
    //     startTransition(() => {
    //         addListingAction(formData)
    //     })
    // }
    //
    // return { handleAddListings, isPending, state }
}
