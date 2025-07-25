import { useContentStore } from "./store";

export default function SearchBar() {
  const { filter, setKeyword } = useContentStore();

  return (
    <div className="bg-[#23262F] rounded-lg p-4 flex items-center">
      <input
        type="text"
        placeholder="Find the items you're looking for"
        className="flex-1 bg-transparent border-none text-white text-lg outline-none placeholder:text-gray-400"
        value={filter.keyword}
        onChange={e => setKeyword(e.target.value)}
        aria-label="Search contents"
      />
      {filter.keyword && (
        <button
          onClick={() => setKeyword("")}
          className="ml-2 text-xl text-[#00E6F6] hover:text-[#1ED760] focus:outline-none focus:ring-2 focus:ring-[#00E6F6] rounded"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      <span className="ml-2 text-2xl text-[#00E6F6] cursor-pointer" aria-hidden="true">🔍</span>
    </div>
  );
} 