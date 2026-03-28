import {api} from "@/shared/lib/axios/axios.instance";


export type DocumentType = "TitleDeed" | "NationalId" | "LandSurveyReport";


export const fetchUploadImages = async (files:File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach(file => {formData.append('file', file)});
    const { data } = await api.post("/api/admin/land/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return data.data;
}

export const fetchUploadDocument = async (
    file: File,
    documentType: DocumentType
): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("DocumentType",documentType);

    const {data}=await api.post("/api/admin/land/upload-document", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    return data;
}
