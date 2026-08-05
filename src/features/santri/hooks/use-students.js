import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  syncStudents,
  searchExternalStudents,
  pullExternalStudents,
} from "../api/students.api";

/*
|--------------------------------------------------------------------------
| Students
|--------------------------------------------------------------------------
*/

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
}

export function useStudent(id) {
  return useQuery({
    queryKey: ["students", id],
    queryFn: () => getStudent(id),
    enabled: !!id,
  });
}

/*
|--------------------------------------------------------------------------
| CRUD
|--------------------------------------------------------------------------
*/

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
}

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
}

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStudent,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| External Search
|--------------------------------------------------------------------------
*/

export function useExternalStudents(keyword, tingkat = "") {
  return useQuery({
    queryKey: ["external-students", keyword, tingkat],

    queryFn: () =>
      searchExternalStudents(keyword, tingkat),

    enabled: keyword.trim().length >= 2,

    // Data santri jarang berubah — cache 1 jam agar pencarian
    // keyword yang sama tidak memanggil sistem pusat lagi.
    staleTime: 1000 * 60 * 60,
  });
}

/*
|--------------------------------------------------------------------------
| External Pull
|--------------------------------------------------------------------------
*/

export function usePullExternalStudents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: pullExternalStudents,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
}

/*
|--------------------------------------------------------------------------
| External Sync
|--------------------------------------------------------------------------
*/

export function useSyncStudents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: syncStudents,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
  });
}