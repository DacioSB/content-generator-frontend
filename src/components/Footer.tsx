import React from 'react'
//change to simple icons
import { Facebook, Linkedin, Twitter, Mail, Phone } from 'lucide-react'

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className="transition-colors hover:text-orange-1 hover:underline"
  >
    {children}
  </a>
)

const SocialIcon: React.FC<FooterLinkProps> = ({ href, children }) => (
  <FooterLink href={href}>
    <div className="rounded-full bg-white/10 p-2 transition-colors hover:bg-orange-1/20">
      {children}
    </div>
  </FooterLink>
)

export function Footer() {
  return (
    <footer className="bg-[#333333] text-white">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* About Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/company">Company</FooterLink>
              </li>
              <li>
                <FooterLink href="/careers">Careers</FooterLink>
              </li>
              <li>
                <FooterLink href="/blog">Blog</FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>support@contentgen.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+1-234-567-890</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <SocialIcon href="https://linkedin.com">
                <Linkedin className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="https://twitter.com">
                <Twitter className="h-5 w-5" />
              </SocialIcon>
              <SocialIcon href="https://facebook.com">
                <Facebook className="h-5 w-5" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} ContentGen Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

