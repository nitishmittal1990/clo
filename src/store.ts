import { create } from 'zustand';
import { API_URL } from './constant';
import type { IProductItem, FilterState, PricingOption } from './interface';
import { filterAndSearch, mapPricingOption } from './utils';
import { validateApiResponse } from './schemas';

interface IProductStore {
  items: IProductItem[];
  filteredItems: IProductItem[];
  filter: FilterState;
  error: string | null;
  setPricingOptions: (options: PricingOption[]) => void;
  setSearchKeyword: (keyword: string) => void;
  resetFilters: () => void;
  fetchProducts: () => Promise<void>;
  clearError: () => void;
}

export const useProductStore = create<IProductStore>((set, get) => ({
  items: [],
  filteredItems: [],
  filter: {
    pricingOptions: [],
    searchKeyword: '',
  },
  error: null,
  setPricingOptions: (options) => {
    set((state) => {
      const newFilter = { ...state.filter, pricingOptions: options };
      return {
        filter: newFilter,
        filteredItems: filterAndSearch(state.items, newFilter),
      };
    });
  },
  setSearchKeyword: (searchKeyword) => {
    set((state) => {
      const newFilter = { ...state.filter, searchKeyword };
      return {
        filter: newFilter,
        filteredItems: filterAndSearch(state.items, newFilter),
      };
    });
  },
  resetFilters: () => {
    set((state) => ({
      filter: { pricingOptions: [], searchKeyword: '' },
      filteredItems: state.items,
    }));
  },
  fetchProducts: async () => {
    try {
      set({ error: null });
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      // Strict validation using Zod
      const validatedData = validateApiResponse(data);

      const mapped: IProductItem[] = validatedData.map((item) => ({
        id: item.id,
        title: item.title,
        userName: item.creator,
        photoUrl: item.imagePath,
        pricing: mapPricingOption(item.pricingOption),
        price: item.price,
      }));
      const currentFilter = get().filter;
      set({
        items: mapped,
        filteredItems: filterAndSearch(mapped, currentFilter),
      });
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error occurred';
      set({ error: errorMessage });
    }
  },
  clearError: () => set({ error: null }),
}));
