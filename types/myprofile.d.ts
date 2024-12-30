type MY_REVIEWS_DATA = {
  id: string;
  rating: number;
  content: string;
  updatedAt: string;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  wine: {
    id: string;
    name: string;
    image: string;
  }
}

type MY_WINES_DATA = {
  id: number;
  image: string;
  name: string;
  price: number;
  region: string;
  reviewCount: number;
  type: string;
  userId: number;
  avgRating: number;
}