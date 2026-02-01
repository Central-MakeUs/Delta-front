"use client";

import type { ProFeatureCode } from "@/app/pro/constants/pro-features";
import ChartCard from "@/app/pro/components/pro-feature-card/card/cart-card";
import PdfCard from "@/app/pro/components/pro-feature-card/card/pdf-card";
import TutorCard from "@/app/pro/components/pro-feature-card/card/tutor-card";
import ExpansionCard from "@/app/pro/components/pro-feature-card/card/expansion-card";
import AnalyticsCard from "@/app/pro/components/pro-feature-card/card/analytics-card";

type Props = {
  variant: ProFeatureCode;
};

export const ProIllustration = ({ variant }: Props) => {
  if (variant === "pro-01") return <ChartCard />;
  if (variant === "pro-02") return <PdfCard />;
  if (variant === "pro-03") return <TutorCard />;
  if (variant === "pro-04") return <ExpansionCard />;
  return <AnalyticsCard />;
};
