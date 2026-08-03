import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getPaymentsByInvoice,
  createPayment,
} from "../api/payments-api";

import { INVOICE_QUERY_KEY } from "./use-invoices";

export const PAYMENT_QUERY_KEY = ["payments"];

export function usePaymentsByInvoice(invoiceId) {
  return useQuery({
    queryKey: [PAYMENT_QUERY_KEY, "invoice", invoiceId],
    queryFn: () => getPaymentsByInvoice(invoiceId),
    enabled: !!invoiceId,
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PAYMENT_QUERY_KEY,
      });

      queryClient.invalidateQueries({
        queryKey: INVOICE_QUERY_KEY,
      });
    },
  });
}
