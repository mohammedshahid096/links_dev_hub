export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string | null;
  color: string | null;
  isActive: boolean;
  createdBy: string;
  created_at: string;
  updated_at: string;
}
