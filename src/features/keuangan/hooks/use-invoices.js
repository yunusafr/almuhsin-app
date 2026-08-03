import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getInvoices,
  getInvoice,
  createInvoices,
} from "../api/invoices-api";

export const INVOICE_QUERY_KEY = ["invoices"];

export function useInvoices(params = {}) {
  return useQuery({
    queryKey: [INVOICE_QUERY_KEY, params],
    queryFn: () => getInvoices(params),
    placeholderData: (previous) => previous,
  });
}

export function useInvoice(id) {
  return useQuery({
    queryKey: [INVOICE_QUERY_KEY, "detail", id],
    queryFn: () => getInvoice(id),
    enabled: !!id,
  });
}

export function useCreateInvoices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvoices,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: INVOICE_QUERY_KEY,
      });
    },
  });
}
