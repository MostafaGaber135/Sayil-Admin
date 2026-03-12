"use client";

// features/listings/hooks/use-uploads.ts
//
// ⚠️ الـ uploads بيفضلوا useMutation — مش useTransition
// ليه استثناء؟
//   1. file upload مش server action — محتاج multipart/form-data على الـ client
//   2. مفيش revalidateTag هنا — الـ URLs بترجع وبتتحفظ في الـ form state
//   3. محتاج onSuccess عشان تاخد الـ URL اللي رجع وتحطه في الـ form

import { useMutation } from "@tanstack/react-query";
import { DocumentType, fetchUploadDocument, fetchUploadImages } from "@/features/listings/api";

export const useUploadImages = () =>
  useMutation({
    mutationFn: (files: File[]) => fetchUploadImages(files),
  });

export const useUploadDocument = () =>
  useMutation({
    mutationFn: ({ file, documentType }: { file: File; documentType: DocumentType }) =>
      fetchUploadDocument(file, documentType),
  });