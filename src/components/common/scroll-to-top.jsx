import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { scrollContainersToTop } from "@/lib/scroll";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollContainersToTop();
  }, [pathname]);

  return null;
}
