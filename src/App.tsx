import { BrowserRouter, useSearchParams } from "react-router-dom";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import ContentGrid from "./ContentGrid";
import { useEffect, useState } from "react";
import { useContentStore, type PricingOption } from "./store";
import Header from "./layout/Header";

function AppContent() {
  const fetchContents = useContentStore((s) => s.fetchContents);
  const filter = useContentStore((s) => s.filter);
  const setPricingOptions = useContentStore((s) => s.setPricingOptions);
  const setKeyword = useContentStore((s) => s.setKeyword);
  const resetFilters = useContentStore((s) => s.resetFilters);
  const error = useContentStore((s) => s.error);
  const clearError = useContentStore((s) => s.clearError);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // On mount: fetch data and initialize filter/search from URL
  useEffect(() => {
    fetchContents().finally(() => setLoading(false));
    // Initialize filter/search from URL
    const pricing = searchParams.get("pricing");
    const keyword = searchParams.get("search") || "";
    if (pricing) {
      const options = pricing.split(",").filter(Boolean) as PricingOption[];
      setPricingOptions(options);
    }
    if (keyword) setKeyword(keyword);
    if (!pricing && !keyword) resetFilters();
    // eslint-disable-next-line
  }, []);

  // On filter/search change: update URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filter.pricingOptions.length > 0)
      params.pricing = filter.pricingOptions.join(",");
    if (filter.keyword) params.search = filter.keyword;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line
  }, [filter.pricingOptions, filter.keyword]);

  const handleRetry = () => {
    setLoading(true);
    clearError();
    fetchContents().finally(() => setLoading(false));
  };

  return (
    <div className="bg-[#181A20] min-h-screen text-white">
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto p-4 md:p-8">
        {/* Search Bar */}
        <section className="mb-6">
          <SearchBar />
        </section>
        {/* Filter Bar */}
        <section className="mb-8">
          <FilterBar />
        </section>
        {/* Content List */}
        <section>
          <div className="font-semibold text-[#00E6F6] text-lg mb-3">
            Contents List
          </div>
          {error ? (
            <div className="text-center text-red-400 py-12 flex flex-col items-center gap-4">
              <span role="alert">{error}</span>
              <button
                className="bg-[#1ED760] text-[#181A20] px-6 py-2 rounded font-semibold hover:bg-[#00E6F6] hover:text-[#181A20] transition"
                onClick={handleRetry}
                aria-label="Retry loading contents"
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : (
            <ContentGrid />
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
