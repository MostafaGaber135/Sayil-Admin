'use client'
import { useState } from "react";
import Link from "next/link";

import { Section } from "./components/Section";
import { InfoRow } from "./components/InfoRow";
import { DocumentRow } from "./components/DocumentRow";
import { QuickActions } from "./components/QuickActions";

import { ListingDetail } from "@/features/listings";
import {
  ClassificationChangeModal,
  PriceChangeModal,
  StatusChangeModal,
} from "@/features/listings/ui/scroll";

type ModalType = "status" | "classification" | "price" | null;

interface Props {
  listing: ListingDetail;
}

export const ListingViewPage = ({ listing }: Props) => {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const close = () => setOpenModal(null);

  const features = listing.features ?? [];
  const images = listing.imageUrls ?? [];
  const documents = [
    { id: "deed", label: "Title Deed", url: listing.titleDeedUrl },
    { id: "national-id", label: "National ID", url: listing.nationalIdCopyUrl },
    {
      id: "survey",
      label: "Land Survey Report",
      url: listing.landSurveyReportUrl,
    },
  ].filter((doc) => doc.url);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/listings"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Listings
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-800 font-medium line-clamp-1 max-w-xs">
            {listing.title}
          </span>
        </div>

        <Link
          href={`/listings/${listing.id}/edit`}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-black transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Listing
        </Link>
      </div>

      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Property Details</h1>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Basic Information */}
          <Section title="Basic Information">
            <div className="mb-5 pb-5 border-b border-gray-50">
              <h3 className="text-base font-semibold text-gray-900">
                {listing.title}
              </h3>
              {listing.description && (
                <p className="text-sm text-gray-500 mt-1.5">
                  {listing.description}
                </p>
              )}
            </div>

            <InfoRow label="Area" value={`${listing.area} m²`} />

            <div className="flex items-start justify-between py-3 border-b border-gray-50">
              <span className="text-sm text-gray-400 w-40">Price</span>
              <div className="text-right">
                {listing.discountPercent > 0 && (
                  <p className="text-xs text-gray-400 line-through">
                    {listing.price?.toLocaleString() ?? "—"} SAR
                  </p>
                )}
                <p className="text-sm font-semibold text-blue-600">
                  {listing.discountedPrice?.toLocaleString() ?? "—"} SAR
                </p>
                {listing.discountPercent > 0 && (
                  <p className="text-xs text-green-600 font-medium">
                    {listing.discountPercent}% Discount
                  </p>
                )}
              </div>
            </div>
          </Section>

          {/* Property Details */}
          <Section title="Property Details">
            <InfoRow label="Type" value={listing.landTypeName} />
            <InfoRow label="Facing Direction" value={listing.landFacingName} />
            <InfoRow
              label="Ownership Type"
              value={listing.ownershipStatusName}
            />
            <InfoRow label="Deed Type" value={listing.deedTypeName} />
            <InfoRow label="Neighbor Type" value={listing.neighborTypeName} />
          </Section>

          {/* Features */}
          {features.length > 0 && (
            <Section title="Property Features">
              <div className="flex flex-wrap gap-2">
                {features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-sm text-gray-600"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Location */}
          <Section title="Location Details">
            <InfoRow label="City" value={listing.cityName} />
            <InfoRow label="Region" value={listing.regionName} />
            <InfoRow label="Address" value={listing.address} />
            <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-100">
              <iframe
                title="Property Location"
                width="100%"
                height="100%"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${listing.cityName}%20${listing.regionName}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </Section>

          {/* Legal Documents */}
          {documents.length > 0 && (
            <Section title="Legal Documents">
              {documents.map((doc) => (
                <DocumentRow key={doc.id} document={doc} />
              ))}
            </Section>
          )}
          {/* Media */}
          {images.length > 0 && (
            <Section title="Property Media">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Property Images
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((url, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl overflow-hidden bg-gray-100"
                  >
                    <img
                      src={url}
                      alt={`Property ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Administrative */}
          <Section title="Administrative Information">
            <InfoRow label="Agent" value={listing.agentName} />
            <InfoRow
              label="Classification"
              value={listing.classificationName}
            />
            <InfoRow label="Status" value={listing.statusName} />
            <InfoRow
              label="Verified"
              value={listing.isVerified ? "Yes" : "No"}
            />
            <InfoRow label="Views" value={String(listing.viewCount)} />
            <InfoRow label="Offers" value={String(listing.offerCount)} />
            {listing.publishDate && (
              <InfoRow
                label="Published"
                value={new Date(listing.publishDate).toLocaleDateString()}
              />
            )}
            <InfoRow
              label="Created"
              value={new Date(listing.createdAt).toLocaleDateString()}
            />
          </Section>
        </div>

        {/* Right column (1/3) */}
        <div className="flex flex-col gap-6">
          <QuickActions
            listing={listing}
            onEdit={() => {}}
            onClassificationChange={() => setOpenModal("classification")}
            onPriceChange={() => setOpenModal("price")}
            onViewOffers={() => {}}
          />
        </div>
      </div>

      <StatusChangeModal
  isOpen={openModal === "status"}
  onClose={close}
  onConfirm={() => {
    close();
  }}
  listing={{
    title: listing.title,
    city: listing.cityName,
    region: listing.regionName,
    statusId: listing.statusId,
    statusLabel: listing.statusName, 
  }}
/>
      <ClassificationChangeModal
        isOpen={openModal === "classification"}
        onClose={close}
        onConfirm={() => {
          close();
        }}

        listing={{
          id: listing.id,
          title: listing.title,
          city: listing.cityName,
          region: listing.regionName,
          classificationId: listing.classificationId,
          classificationName: listing.classificationName,
      }}
      />

      <PriceChangeModal
        isOpen={openModal === "price"}
        onClose={close}
        onConfirm={() => {
          close();
        }}
        listing={{
          id: listing.id,
          title: listing.title,
          price: listing.price,
          city: listing.cityName,
          region: listing.regionName,
        }}
        />
    </div>
  );
};
