import React from "react";
import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Products", href: "/products" },
    { name: "Running", href: "/products?category=running" },
    { name: "Lifestyle", href: "/products?category=lifestyle" },
    { name: "Sports", href: "/products?category=sports" },
    { name: "New Arrivals", href: "/products?sort=newest" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns & Exchanges", href: "#" },
    { name: "Size Guide", href: "#" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">NK</span>
              </div>
              <span className="font-semibold text-lg text-primary-foreground">Nova Kicks</span>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6 max-w-xs">
              Premium sneakers engineered for performance, designed for life. Step into the future of footwear.
            </p>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span>D48/1253 Molarband Extension, Badarpur, New Delhi - 110044</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span>winsatyam05@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span>+91 8527765735</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/40">
            &copy; {new Date().getFullYear()} Nova Kicks. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-primary-foreground/40">
            Made by <Heart className="w-3.5 h-3.5 text-accent fill-accent mx-1" /> Satyam Chaudhary
          </div>
        </div>
      </div>
    </footer>
  );
}
