import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  syncStudents,
} from "../api/students.api";

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

export function useCreateStudents() {
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

export function useUpdateStudents() {
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

export function useDeleteStudents() {
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
