import type { Metadata } from "next";
import CertsContent from "./CertsContent";

export const metadata: Metadata = {
  title: "학력 & 자격증",
  description: "학력 및 보유 자격증",
};

export default function CertificationsPage() {
  return <CertsContent />;
}
