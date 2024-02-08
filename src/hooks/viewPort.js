import { useMediaQuery } from "react-responsive";

export function useViewport() {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ minWidth: 481, maxWidth: 767 });
  const isLaptop = useMediaQuery({ minWidth: 768, maxWidth: 979 });
  const isDesktop = useMediaQuery({ minWidth: 980 });
  return {
    isMobile: !!isMobile,
    isTablet: !!isTablet,
    isLaptop: !!isLaptop,
    isDesktop: !!isDesktop,
  };
}
