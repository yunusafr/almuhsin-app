import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getPhoneCollections,
  createBulkPhoneCollection,
  createPhoneCollection,
  returnPhoneCollection,
  deletePhoneCollection,
} from "../api/phone-collections-api";

export const PHONE_COLLECTION_QUERY_KEY = ["phone-collections"];

/*
||--------------------------------------------------------------------------
|| GET ALL
||--------------------------------------------------------------------------
*/

export function usePhoneCollections(params = {}) {
  return useQuery({
    queryKey: [...PHONE_COLLECTION_QUERY_KEY, params],
    queryFn: () => getPhoneCollections(params),
  });
}

/*
||--------------------------------------------------------------------------
|| CREATE (bulk)
||--------------------------------------------------------------------------
*/

export function useCreateBulkPhoneCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBulkPhoneCollection,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PHONE_COLLECTION_QUERY_KEY,
      });
    },
  });
}

/*
||--------------------------------------------------------------------------
|| CREATE (single)
||--------------------------------------------------------------------------
*/

export function useCreatePhoneCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPhoneCollection,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PHONE_COLLECTION_QUERY_KEY,
      });
    },
  });
}

/*
||--------------------------------------------------------------------------
|| UPDATE (pengembalian)
||--------------------------------------------------------------------------
*/

export function useReturnPhoneCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnPhoneCollection,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PHONE_COLLECTION_QUERY_KEY,
      });
    },
  });
}

/*
||--------------------------------------------------------------------------
|| DELETE
||--------------------------------------------------------------------------
*/

export function useDeletePhoneCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePhoneCollection,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PHONE_COLLECTION_QUERY_KEY,
      });
    },
  });
}
