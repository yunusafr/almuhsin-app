import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTeacherAttendances,
  createTeacherAttendance,
  updateTeacherAttendance,
} from "../api/teacher-attendances-api";

export const TEACHER_ATTENDANCE_QUERY_KEY = ["teacher-attendances"];

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export function useTeacherAttendances(params = {}) {
  return useQuery({
    queryKey: [TEACHER_ATTENDANCE_QUERY_KEY, params],
    queryFn: () => getTeacherAttendances(params),
    placeholderData: (previous) => previous,
  });
}

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export function useCreateTeacherAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeacherAttendance,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TEACHER_ATTENDANCE_QUERY_KEY,
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export function useUpdateTeacherAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...payload }) =>
      updateTeacherAttendance(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TEACHER_ATTENDANCE_QUERY_KEY,
      });
    },
  });
}
