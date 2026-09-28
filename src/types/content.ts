export interface SeoMetadata {
  title?: string;
  description?: string;
  image?: string;
  canonicalPath?: string;
}

export interface Media {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Attachment {
  id: string;
  url: string;
  label: string;
  alt: string;
  type?: string;
}

export interface Announcement {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  content: string;
  attachments: Attachment[];
  seo: SeoMetadata;
}

export interface ParishEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  image?: Media;
  seo: SeoMetadata;
}

export interface MassIntention {
  id: string;
  date: string;
  time: string;
  intention: string;
  celebrant?: string;
}

export interface GalleryImage extends Media {
  caption?: string;
}

export interface Gallery {
  id: string;
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  images: GalleryImage[];
  seo: SeoMetadata;
}

export interface Priest {
  id: string;
  name: string;
  role: string;
  yearStarted?: number;
  yearEnded?: number;
  biography?: string;
  email?: string;
  phone?: string;
  image?: Media;
}

export interface ParishGroup {
  id: string;
  name: string;
  description: string;
  meetingSchedule?: string;
  contactPerson?: string;
  image?: Media;
}

export interface HomepageContent {
  introduction?: string;
  massSchedule?: string;
  confessionSchedule?: string;
  officeHours?: string;
  adorationSchedule?: string;
  featuredAnnouncementIds: string[];
  featuredEventIds: string[];
  featuredGalleryIds: string[];
}

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: string;
}

export interface WeeklyIntention {
 id: string;
 weekStart: string;
 weekEnd: string;
 content: string;
}
