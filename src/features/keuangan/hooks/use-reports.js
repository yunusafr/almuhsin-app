import { useQuery } from "@tanstack/react-query";

import { getAgingReport, getCashFlowReport } from "../api/reports-api";

export function useAgingReport() {
  return useQuery({
    queryKey: ["reports", "aging"],
    queryFn: getAgingReport,
  });
}

export function useCashFlowReport() {
  return useQuery({
    queryKey: ["reports", "cash-flow"],
    queryFn: getCashFlowReport,
  });
}
