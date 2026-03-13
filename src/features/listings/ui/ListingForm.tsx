"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListingLookupsResponse } from "../types";
import {
  AdminSection,
  BasicInfoSection,
  FeaturesSection,
  LocationSection,
  PropertyDetailsSection,
} from "@/features/listings";
import { useEffect } from "react";
import {
  ListingFormValues,
  listingSchema,
} from "@/features/listings/validation";

interface Props {
  defaultData?: ListingFormValues;
  onSubmit: (data: ListingFormValues) => void;
  isPending: boolean;
  lookups?: ListingLookupsResponse;
}

export const ListingForm = ({
  defaultData,
  onSubmit,
  isPending,
  lookups,
}: Props) => {
  const isEditMode = !!defaultData;

  const methods = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema) as any,
    defaultValues: defaultData ?? {
      features: [],
      imageUrls: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      ],
      titleDeedUrl: "https://example.com/deeds/deed_101.pdf",
      nationalIdCopyUrl: "https://example.com/ids/id_99.jpg",
      landSurveyReportUrl: "https://example.com/reports/survey_01.pdf",
      buyerId: null,
      purchasedPrice: null,
    },
  });

  useEffect(() => {
    if (defaultData) {
      methods.reset(defaultData);
    }
  }, [defaultData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50/50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditMode ? "Edit Listing" : "Add New Listing"}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {isEditMode
                ? "Update the details below to edit this property listing."
                : "Fill in the details below to create a new property listing."}
            </p>
          </div>

          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <Section title="Basic Information">
              <BasicInfoSection />
            </Section>

            <Section title="Property Details">
              <PropertyDetailsSection lookups={lookups} />
            </Section>

            <Section title="Property Features">
              <FeaturesSection />
            </Section>

            <Section title="Location Details">
              <LocationSection lookups={lookups} />
            </Section>

            <Section title="Administrative Information">
              <AdminSection lookups={lookups} />
            </Section>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-8 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-xl hover:bg-black transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending
                  ? "Saving..."
                  : isEditMode
                    ? "Save Changes"
                    : "Save Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-50">
      <h2 className="text-base font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);