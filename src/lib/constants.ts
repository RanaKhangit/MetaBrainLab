export const siteConfig = {
  name: "MetaBrain Lab",
  tagline: "Engineering the Future of Human Intelligence",
  description:
    "MetaBrain Lab is building integrated cognitive enhancement infrastructure. Learn faster. Remember better. Focus deeper. Decide clearer.",
  url: "https://metabrainlab.com",
  ogImage: "/logos/og-image.svg",
  founder: {
    name: "Mr Asif Hussain Rana",
    title: "Founder & Chief Executive Officer",
  },
  emails: {
    general: "contact@metabrainlab.com",
    investors: "investors@metabrainlab.com",
    careers: "careers@metabrainlab.com",
    media: "media@metabrainlab.com",
  },
};

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/science", label: "Science" },
  { href: "/technology", label: "Technology" },
  { href: "/ethics", label: "Ethics" },
  { href: "/news", label: "News" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = [
  ...navLinks,
  { href: "/investor-access", label: "Investor Access" },
] as const;
