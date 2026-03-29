import Link from "next/link"
import Image from "next/image"
import { Heart, Mail, Phone } from "lucide-react"

const footerLinks = {
  product: [
    { href: "/services", label: "Services" },
    { href: "/assessments", label: "Assessments" },
    { href: "/journal", label: "Journal" },
    { href: "/chat", label: "AI Support" },
  ],
  support: [
    { href: "/support", label: "Get Help" },
    { href: "/book-session", label: "Book Session" },
    { href: "/campus", label: "Campus Wellness" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/about#team", label: "Our Team" },
    { href: "/about#mission", label: "Mission" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <Image src="/logo.png" alt="EIRA Logo" width={40} height={40} className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="text-lg font-bold text-primary">EIRA</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your mental wellness journey starts here. Safe, supportive, and student-friendly.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="mailto:support@eira.app" className="hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+1800123456" className="hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EIRA. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-primary" /> for student wellness
          </p>
        </div>
      </div>
    </footer>
  )
}
