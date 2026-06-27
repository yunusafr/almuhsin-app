import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAcademicYears,
  getAcademicYear,
  getActiveAcademicYear,
  createAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} from "../api/academic-year-api";

const QUERY_KEY = ["academic-years"];

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export function useAcademicYears() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getAcademicYears,
  });
}

/*
|--------------------------------------------------------------------------
| GET DETAIL
|--------------------------------------------------------------------------
*/

export function useAcademicYear(id) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => getAcademicYear(id),
    enabled: !!id,
  });
}

/*
|--------------------------------------------------------------------------
| GET ACTIVE
|--------------------------------------------------------------------------
*/

export function useActiveAcademicYear() {
  return useQuery({
    queryKey: ["active-academic-year"],
    queryFn: getActiveAcademicYear,
  });
}

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export function useCreateAcademicYear() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createAcademicYear,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      qc.invalidateQueries({
        queryKey: ["active-academic-year"],
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export function useUpdateAcademicYear() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateAcademicYear,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      qc.invalidateQueries({
        queryKey: ["active-academic-year"],
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export function useDeleteAcademicYear() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteAcademicYear,

    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: QUERY_KEY,
      });

      qc.invalidateQueries({
        queryKey: ["active-academic-year"],
      });
    },
  });
}