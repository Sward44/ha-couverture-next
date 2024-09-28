import { useMediaQuery } from "react-responsive";

export function useViewport() {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 768 });
  const isLaptop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025, maxWidth: 1280 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1536 });

  return {
    isMobile: !!isMobile,
    isTablet: !!isTablet,
    isLaptop: !!isLaptop,
    isDesktop: !!isDesktop,
    isLargeDesktop: !!isLargeDesktop,
  };
}
