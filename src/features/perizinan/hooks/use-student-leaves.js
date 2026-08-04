import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getStudentLeaves,
  createStudentLeave,
  updateStudentLeave,
} from "../api/student-leaves-api";

export const STUDENT_LEAVES_QUERY_KEY = ["student-leaves"];

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export function useStudentLeaves(params = {}) {
  return useQuery({
    queryKey: [STUDENT_LEAVES_QUERY_KEY, params],
    queryFn: () => getStudentLeaves(params),
    placeholderData: (previous) => previous,
  });
}

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export function useCreateStudentLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudentLeave,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDENT_LEAVES_QUERY_KEY,
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export function useUpdateStudentLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }) =>
      updateStudentLeave(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDENT_LEAVES_QUERY_KEY,
      });
    },
  });
}
