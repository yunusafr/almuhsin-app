import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAttendances,
  getAttendance,
  createAttendance,
} from "../api/attendances-api";

export const ATTENDANCE_QUERY_KEY = ["attendances"];

/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export function useAttendances(params = {}) {
  return useQuery({
    queryKey: [ATTENDANCE_QUERY_KEY, params],
    queryFn: () => getAttendances(params),
    placeholderData: (previous) => previous,
  });
}

/*
|--------------------------------------------------------------------------
| GET DETAIL
|--------------------------------------------------------------------------
*/

export function useAttendance(id) {
  return useQuery({
    queryKey: [ATTENDANCE_QUERY_KEY, "detail", id],
    queryFn: () => getAttendance(id),
    enabled: !!id,
  });
}

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export function useCreateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAttendance,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ATTENDANCE_QUERY_KEY,
      });
    },
  });
}
