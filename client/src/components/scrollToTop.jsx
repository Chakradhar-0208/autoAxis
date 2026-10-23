import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scroll();
  }, [pathname]);

  return null;
};
const scroll = () => {
//   window.scrollTo({ top: 0, behavior: "smooth" });
};
export { ScrollToTop, scroll };
