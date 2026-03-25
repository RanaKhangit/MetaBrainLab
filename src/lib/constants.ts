export const siteConfig = {
  name: "MetaBrain Labs",
  tagline: "Engineering the Future of Human Intelligence",
  description:
    "MetaBrain Labs is building integrated cognitive enhancement infrastructure. Learn faster. Remember better. Focus deeper. Decide clearer.",
  url: "https://metabrainlabs.com",
  ogImage: "/logos/og-image.svg",
  founder: {
    name: "Mr Asif Hussain Rana",
    title: "Founder & Chief Executive Officer",
  },
  emails: {
    general: "contact@metabrainlabs.com",
    investors: "investors@metabrainlabs.com",
    careers: "careers@metabrainlabs.com",
    media: "media@metabrainlabs.com",
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
