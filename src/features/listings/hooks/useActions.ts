import {useMutation} from "@tanstack/react-query";
import {
    fetchAddLand,
} from "@/features/listings/api";
import {CreateListingRequest} from "@/features/listings/validation";

export const useCreateListing = () => {
    return useMutation({
        mutationFn:(body:CreateListingRequest)=> fetchAddLand(body),
        onSuccess:(data:any) => {
            console.log('✅ Created listing id:', data.data);
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
