import { useQuery } from "@tanstack/react-query";

import { getStudents } from "../api/students.api";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
}