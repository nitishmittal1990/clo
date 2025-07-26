import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { PricingOption } from '../interface';

interface IUseUrlSyncProps {
  filter: {
    pricingOptions: PricingOption[];
    searchKeyword: string;
  };
  setPricingOptions: (options: PricingOption[]) => void;
  setSearchKeyword: (keyword: string) => void;
}

export function useUrlSync({ filter, setPricingOptions, setSearchKeyword }: IUseUrlSyncProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  // Initialize filter/search from URL immediately on mount
  useEffect(() => {
    const pricing = searchParams.get('pricing');
    const keyword = searchParams.get('search') || '';

    if (pricing) {
      const options = pricing.split(',').filter(Boolean) as PricingOption[];
      setPricingOptions(options);
    }
    if (keyword) {
      setSearchKeyword(keyword);
    }
    isFirstRender.current = false;
  }, [searchParams, setPricingOptions, setSearchKeyword]);

  // On filter/search change: update URL only if different (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) return;

    const params: Record<string, string> = {};
    if (filter.pricingOptions.length > 0) params.pricing = filter.pricingOptions.join(',');
    if (filter.searchKeyword) params.search = filter.searchKeyword;

    const currentPricing = searchParams.get('pricing') || '';
    const currentSearch = searchParams.get('search') || '';
    const paramsPricing = params.pricing || '';
    const paramsSearch = params.search || '';

    if (currentPricing !== paramsPricing || currentSearch !== paramsSearch) {
      setSearchParams(params, { replace: true });
    }
  }, [filter.pricingOptions, filter.searchKeyword, searchParams, setSearchParams]);
}
