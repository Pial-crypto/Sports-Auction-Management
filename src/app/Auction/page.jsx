"use client";
import dynamic from 'next/dynamic';

// Use dynamic import to prevent hydration errors with localStorage access
const AuctionMain = dynamic(() => import('@/components/Auction/AuctionMain'), { 
  ssr: false 
});

const AuctionPage = () => {
  return <AuctionMain />;
};

export default AuctionPage;