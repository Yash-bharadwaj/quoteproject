/** Paths under public/dpeipics — filenames may contain spaces */
function img(folder: string, file: string): string {
  return `/dpeipics/${folder}/` + encodeURIComponent(file);
}

export type PortfolioCategory = "Hotel" | "Restaurant" | "Interior";

export interface PortfolioProject {
  id: string;
  title: string;
  subtitle: string;
  category: PortfolioCategory;
  /** 0-based index in images[] for card thumbnail */
  coverIndex: number;
  images: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "monastery",
    title: "Monastery",
    subtitle: "Restaurant & hospitality · Hyderabad",
    category: "Restaurant",
    coverIndex: 0,
    images: [
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.35.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.36 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.36.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.37 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.37 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.37.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.38 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.38 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.38.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.39 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.39 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.39.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.40 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.40.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.41 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.41 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.41.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.42 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.42 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.42.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.57.43.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.24.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.25.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.30.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.31 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.31.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.32 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.32 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.32.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.33 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.33 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.33.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.34 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.34 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.34.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.35 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.35 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 11.58.35.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 12.00.03.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 12.00.04 (1).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 12.00.04 (2).jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 12.00.04.jpeg"),
      img("monastery", "WhatsApp Image 2026-02-23 at 12.00.05.jpeg"),
    ],
  },
  {
    id: "deccankitchen",
    title: "Deccan Kitchen",
    subtitle: "Hyderabadi dining · Jubilee Hills",
    category: "Restaurant",
    coverIndex: 0,
    images: [
      img("deccankitchen", "WhatsApp Image 2026-03-20 at 14.23.03 (1).jpeg"),
      img("deccankitchen", "WhatsApp Image 2026-03-20 at 14.23.03.jpeg"),
      img("deccankitchen", "WhatsApp Image 2026-03-20 at 14.23.04 (1).jpeg"),
      img("deccankitchen", "WhatsApp Image 2026-03-20 at 14.23.04 (2).jpeg"),
      img("deccankitchen", "WhatsApp Image 2026-03-20 at 14.23.04.jpeg"),
    ],
  },
  {
    id: "interiorworks",
    title: "Interior Works",
    subtitle: "Homes & commercial spaces across Hyderabad",
    category: "Interior",
    coverIndex: 0,
    images: [
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.10 (1).jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.10.jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.11 (1).jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.11 (2).jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.11.jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.12 (1).jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.12 (2).jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.12 (3).jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.12.jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.13 (1).jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.13 (2).jpeg"),
      img("interiorworks", "WhatsApp Image 2026-03-20 at 14.15.13.jpeg"),
    ],
  },
  {
    id: "mondaypremium",
    title: "Monday Premium",
    subtitle: "Business hotel · Madhapur, HITEC City",
    category: "Hotel",
    coverIndex: 0,
    images: [
      img("mondaypremium", "mondayprmeium1.jpg"),
      img("mondaypremium", "mondaypremium2.jpg"),
      img("mondaypremium", "mondaypremium3.jpg"),
      img("mondaypremium", "mondaypremium4.jpg"),
      img("mondaypremium", "mondaypremium5.jpg"),
      img("mondaypremium", "mondaypremium6.jpg"),
      img("mondaypremium", "mondaypremium7.jpg"),
      img("mondaypremium", "mondaypremium8.jpg"),
      img("mondaypremium", "mondaypremium9.jpg"),
      img("mondaypremium", "mondaypremium10.jpg"),
      img("mondaypremium", "mondaypremium11.jpg"),
      img("mondaypremium", "mondaypremium12.jpg"),
    ],
  },
  {
    id: "overthemoon",
    title: "Over The Moon",
    subtitle: "Microbrewery & dining · Gachibowli",
    category: "Restaurant",
    coverIndex: 0,
    images: [
      img("overthemoon", "overthemoon1.jpg"),
      img("overthemoon", "overthemoon2.jpg"),
      img("overthemoon", "overthemoon3.jpg"),
      img("overthemoon", "overthemoon4.jpg"),
      img("overthemoon", "overthemoon5.jpg"),
      img("overthemoon", "overthemoon6.jpg"),
      img("overthemoon", "overthemoon7.jpg"),
      img("overthemoon", "overthemoon8.jpg"),
      img("overthemoon", "overthemoon9.jpg"),
      img("overthemoon", "overthemoon10.jpg"),
    ],
  },
  {
    id: "sunrise",
    title: "Sunrise",
    subtitle: "Boutique hotel · Kondapur",
    category: "Hotel",
    coverIndex: 0,
    images: [
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.41 (1).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.41.jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.42 (1).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.42 (2).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.42.jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.43 (1).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.43 (2).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.43 (3).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.43.jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.44 (1).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.44 (2).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.44 (3).jpeg"),
      img("sunrise", "WhatsApp Image 2026-03-20 at 14.17.44.jpeg"),
    ],
  },
  {
    id: "tulipgrand",
    title: "Hotel Tulips Grand",
    subtitle: "4-star stay · Hyderabad",
    category: "Hotel",
    coverIndex: 0,
    images: [
      img("tulipgrand", "tupligrand1.jpg"),
      img("tulipgrand", "tulipgrand2.jpg"),
      img("tulipgrand", "tulipgrand3.jpg"),
      img("tulipgrand", "tulipgrand4.jpg"),
      img("tulipgrand", "tulipgrand5.jpg"),
      img("tulipgrand", "tulipgrand6.jpg"),
      img("tulipgrand", "mondaypremium1.jpg"),
      img("tulipgrand", "tupligrand7.webp"),
    ],
  },
];

export const totalPortfolioPhotos = portfolioProjects.reduce((n, p) => n + p.images.length, 0);

const monasteryProject = portfolioProjects.find((p) => p.id === "monastery");
/** All Monastery gallery URLs (single source of truth) */
export const monasteryGalleryImages = monasteryProject?.images ?? [];
/** Hero carousel — wide shots from Monastery set */
export const heroMonasterySlides =
  monasteryProject && monasteryProject.images.length > 37
    ? [
        monasteryProject.images[22],
        monasteryProject.images[24],
        monasteryProject.images[37],
      ]
    : [];
