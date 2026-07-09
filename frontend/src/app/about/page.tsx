import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us — Nova Kicks",
  description: "Learn about Nova Kicks' mission to redefine premium footwear through innovative design and uncompromising quality.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
