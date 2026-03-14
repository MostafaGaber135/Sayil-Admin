"use client";

// features/listings/hooks/use-uploads.ts


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