import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us — Nova Kicks",
  description: "Get in touch with the Nova Kicks team. We'd love to hear from you.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
