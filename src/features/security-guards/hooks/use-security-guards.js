import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { listData } from "@/lib/utils";

import {
  getSecurityGuards,
  createSecurityGuard,
  updateSecurityGuard,
  deleteSecurityGuard,
} from "../api/security-guards-api";

export const SECURITY_GUARD_QUERY_KEY = ["security-guards"];

/*
||--------------------------------------------------------------------------
|| GET ALL
||--------------------------------------------------------------------------
*/

export function useSecurityGuards() {
  return useQuery({
    queryKey: SECURITY_GUARD_QUERY_KEY,

    queryFn: async () => listData(await getSecurityGuards()),
  });
}

/*
||--------------------------------------------------------------------------
|| CREATE
||--------------------------------------------------------------------------
*/

export function useCreateSecurityGuard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSecurityGuard,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SECURITY_GUARD_QUERY_KEY,
      });
    },
  });
}

/*
||--------------------------------------------------------------------------
|| UPDATE
||--------------------------------------------------------------------------
*/

export function useUpdateSecurityGuard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSecurityGuard,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SECURITY_GUARD_QUERY_KEY,
      });
    },
  });
}

/*
||--------------------------------------------------------------------------
|| DELETE
||--------------------------------------------------------------------------
*/

export function useDeleteSecurityGuard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSecurityGuard,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SECURITY_GUARD_QUERY_KEY,
      });
    },
  });
}
