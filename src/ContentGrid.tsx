import { useContentStore, ContentItem } from "./store";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

function ContentCard({ item }: { item: ContentItem }) {
  return (
    <div className="bg-[#23262F] rounded-lg p-4 min-h-[320px] flex flex-col justify-end relative">
      <div className="h-44 bg-[#181A20] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {item.photoUrl ? (
          <img
            src={item.photoUrl}
            alt={item.title}
            className="object-contain h-full w-full"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>
      <div className="font-semibold text-base mb-1 truncate">{item.title}</div>
      <div className="text-sm text-gray-400 mb-2 truncate">{item.userName}</div>
      <div className="flex items-center gap-2">
        {item.pricing === "paid" ? (
          <span className="bg-[#23262F] text-[#1ED760] border border-[#1ED760] rounded px-2 py-0.5 font-bold text-xs">
            ${item.price?.toFixed(2)}
          </span>
        ) : item.pricing === "free" ? (
          <span className="bg-[#1ED760] text-[#181A20] rounded px-2 py-0.5 font-bold text-xs">
            FREE
          </span>
        ) : (
          <span className="bg-[#181A20] text-white border border-[#fff2] rounded px-2 py-0.5 font-bold text-xs">
            VIEW ONLY
          </span>
        )}
      </div>
    </div>
  );
}

const PAGE_SIZE = 16;

export default function ContentGrid() {
  const { filteredContents } = useContentStore();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filteredContents]);

  const hasMore = visibleCount < filteredContents.length;
  const itemsToShow = filteredContents.slice(0, visibleCount);

  const fetchMoreData = () => {
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + PAGE_SIZE, filteredContents.length)
      );
    }, 500);
  };

  return (
    <InfiniteScroll
      dataLength={itemsToShow.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="text-center text-gray-400 py-4">Loading more...</div>
      }
      scrollThreshold={0.95}
      style={{ overflow: "visible" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 bg-secondary">
        {itemsToShow.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12 flex flex-col items-center gap-2">
            <span className="text-5xl" aria-hidden="true">📭</span>
            <span>No content found.</span>
          </div>
        ) : (
          itemsToShow.map((item) => <ContentCard key={item.id} item={item} />)
        )}
      </div>
    </InfiniteScroll>
  );
}
