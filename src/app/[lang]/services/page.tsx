import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Bike Services & Spare Parts – Hero Velmurugan Motors Madurai",
  description: "Expert Hero bike servicing, spare parts, and maintenance at Hero Velmurugan Motors, Madurai. Book your service today.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
