// Types for content items and filter/search state
export type PricingOption = 'paid' | 'free' | 'viewOnly';

export interface IProductItem {
  id: string;
  title: string;
  userName: string;
  photoUrl: string;
  pricing: PricingOption;
  price?: number;
}

export interface FilterState {
  pricingOptions: PricingOption[];
  searchKeyword: string;
}
