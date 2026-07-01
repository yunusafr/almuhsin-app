import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
} from "../api/classes-api";

export function useClasses() {
  return useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });
}

export function useClass(id) {
  return useQuery({
    queryKey: ["classes", id],
    queryFn: () => getClass(id),
    enabled: !!id,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClass,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClass,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClass,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["classes"],
      });
    },
  });
}
