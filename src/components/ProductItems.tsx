import { useContentStore } from '../store';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import type { IProductItem } from '../interface';

interface IProductCardProps {
  item: IProductItem;
}

const ProductCard: React.FC<IProductCardProps> = ({ item }): React.ReactElement => {
  return (
    <div className="relative flex min-h-[320px] flex-col justify-end rounded-lg bg-[#23262F] p-4">
      <div className="mb-4 flex h-44 items-center justify-center overflow-hidden rounded-lg bg-[#181A20]">
        {item.photoUrl ? (
          <img src={item.photoUrl} alt={item.title} className="h-full w-full object-contain" />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>
      <div className="mb-1 truncate text-base font-semibold">{item.title}</div>
      <div className="mb-2 truncate text-sm text-gray-400">{item.userName}</div>
      <div className="flex items-center gap-2">
        {item.pricing === 'paid' ? (
          <span className="rounded border border-[#1ED760] bg-[#23262F] px-2 py-0.5 text-xs font-bold text-[#1ED760]">
            ${item.price?.toFixed(2)}
          </span>
        ) : item.pricing === 'free' ? (
          <span className="rounded bg-[#1ED760] px-2 py-0.5 text-xs font-bold text-[#181A20]">
            FREE
          </span>
        ) : (
          <span className="rounded border border-[#fff2] bg-[#181A20] px-2 py-0.5 text-xs font-bold text-white">
            VIEW ONLY
          </span>
        )}
      </div>
    </div>
  );
};

const PAGE_SIZE = 16;

export default function ProductItems() {
  const { filteredItems: filteredContents } = useContentStore();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filteredContents]);

  const hasMore = visibleCount < filteredContents.length;
  const itemsToShow = filteredContents.slice(0, visibleCount);

  const fetchMoreData = () => {
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredContents.length));
    }, 500);
  };

  return (
    <InfiniteScroll
      dataLength={itemsToShow.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<div className="py-4 text-center text-gray-400">Loading more...</div>}
      scrollThreshold={0.95}
      style={{ overflow: 'visible' }}
    >
      <div className="grid grid-cols-1 gap-6 bg-secondary sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {itemsToShow.length === 0 ? (
          <div className="col-span-full flex flex-col items-center gap-2 py-12 text-center text-gray-400">
            <span className="text-5xl" aria-hidden="true">
              📭
            </span>
            <span>No content found.</span>
          </div>
        ) : (
          itemsToShow.map((item) => <ProductCard key={item.id} item={item} />)
        )}
      </div>
    </InfiniteScroll>
  );
}
