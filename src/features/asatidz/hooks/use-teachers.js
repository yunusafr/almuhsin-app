import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "../api/teachers-api";

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
}

export function useTeacher(id) {
  return useQuery({
    queryKey: ["teachers", id],
    queryFn: () => getTeacher(id),
    enabled: !!id,
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeacher,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
  });
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTeacher,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeacher,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
  });
}
