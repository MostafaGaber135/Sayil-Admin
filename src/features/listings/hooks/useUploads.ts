import {useMutation} from "@tanstack/react-query";
import {DocumentType, fetchUploadDocument, fetchUploadImages} from "@/features/listings/api";

export const useUploadImages =()=> {
    return useMutation({
        mutationFn:(files:File[])=> fetchUploadImages(files),
        onSuccess: (data) => {
        },

        onError: (error) => {
            console.error("Mutation failed", error);
        }
    })
}


export const useUploadDocument = () => {
    return useMutation({
        mutationFn: ({ file, documentType }: { file: File; documentType: DocumentType }) =>
            fetchUploadDocument(file, documentType),
        onSuccess: (data) => {
        },

        onError: (error) => {
            console.error("Mutation failed", error);
        }
    });
};
