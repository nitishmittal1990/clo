import { create } from 'zustand';

// Types for content items and filter/search state
export type PricingOption = 'paid' | 'free' | 'viewOnly';

export interface ContentItem {
  id: string;
  title: string;
  userName: string;
  photoUrl: string;
  pricing: PricingOption;
  price?: number;
}

export interface FilterState {
  pricingOptions: PricingOption[];
  keyword: string;
}

interface ContentStore {
  contents: ContentItem[];
  filteredContents: ContentItem[];
  filter: FilterState;
  error: string | null;
  setPricingOptions: (options: PricingOption[]) => void;
  setKeyword: (keyword: string) => void;
  resetFilters: () => void;
  fetchContents: () => Promise<void>;
  clearError: () => void;
  // Placeholder for syncing with URL query params
  syncWithUrl: (params: URLSearchParams) => void;
}

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

function mapPricingOption(option: number): PricingOption {
  if (option === 0) return 'paid';
  if (option === 1) return 'free';
  return 'viewOnly';
}

function filterAndSearch(contents: ContentItem[], filter: FilterState) {
  let filtered = contents;
  if (filter.pricingOptions.length > 0) {
    filtered = filtered.filter(item => filter.pricingOptions.includes(item.pricing));
  }
  if (filter.keyword.trim()) {
    const keyword = filter.keyword.trim().toLowerCase();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.userName.toLowerCase().includes(keyword)
    );
  }
  return filtered;
}

export const useContentStore = create<ContentStore>((set, get) => ({
  contents: [],
  filteredContents: [],
  filter: {
    pricingOptions: [],
    keyword: '',
  },
  error: null,
  setPricingOptions: (options) => {
    set((state) => {
      const newFilter = { ...state.filter, pricingOptions: options };
      return {
        filter: newFilter,
        filteredContents: filterAndSearch(state.contents, newFilter),
      };
    });
  },
  setKeyword: (keyword) => {
    set((state) => {
      const newFilter = { ...state.filter, keyword };
      return {
        filter: newFilter,
        filteredContents: filterAndSearch(state.contents, newFilter),
      };
    });
  },
  resetFilters: () => {
    set((state) => ({
      filter: { pricingOptions: [], keyword: '' },
      filteredContents: state.contents,
    }));
  },
  fetchContents: async () => {
    try {
      set({ error: null });
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      const mapped: ContentItem[] = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        userName: item.creator,
        photoUrl: item.imagePath,
        pricing: mapPricingOption(item.pricingOption),
        price: item.price,
      }));
      set({ contents: mapped, filteredContents: mapped });
    } catch (e: any) {
      set({ error: e.message || 'Unknown error occurred' });
    }
  },
  clearError: () => set({ error: null }),
  syncWithUrl: (params) => {
    // Placeholder for syncing state with URL query params
  },
})); 