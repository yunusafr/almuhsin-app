import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getEnrollments,
  createEnrollment,
  createBulkEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../api/enrollments-api";

export const ENROLLMENT_QUERY_KEY = ["enrollments"];

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export function useEnrollments(params = {}) {
  return useQuery({
    queryKey: [...ENROLLMENT_QUERY_KEY, params],
    queryFn: () => getEnrollments(params),
  });
}

/*
|--------------------------------------------------------------------------
| CREATE (single)
|--------------------------------------------------------------------------
*/

export function useCreateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEnrollment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ENROLLMENT_QUERY_KEY,
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| CREATE (bulk)
|--------------------------------------------------------------------------
*/

export function useCreateBulkEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBulkEnrollment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ENROLLMENT_QUERY_KEY,
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export function useUpdateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEnrollment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ENROLLMENT_QUERY_KEY,
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export function useDeleteEnrollment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEnrollment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ENROLLMENT_QUERY_KEY,
      });
    },
  });
}
