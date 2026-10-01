import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createNews,
  deleteNews,
  getNews,
  getNewsDetail,
  getPublicNews,
  getPublicNewsDetail,
  getTrashedNews,
  restoreNews,
  updateNews,
} from "../api/news.api";

const KUNCI = "news";

/* Daftar berita untuk pengelolaan */
export function useNews(params = {}) {
  return useQuery({
    queryKey: [KUNCI, params],
    queryFn: () => getNews(params),
    placeholderData: (sebelumnya) => sebelumnya,
  });
}

export function useNewsDetail(id) {
  return useQuery({
    queryKey: [KUNCI, "detail", id],
    queryFn: () => getNewsDetail(id),
    enabled: !!id,
  });
}

export function useTrashedNews() {
  return useQuery({
    queryKey: [KUNCI, "trashed"],
    queryFn: getTrashedNews,
  });
}

function pakaiSegarkan() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: [KUNCI] });
    qc.invalidateQueries({ queryKey: ["public-news"] });
  };
}

export function useCreateNews() {
  const segarkan = pakaiSegarkan();

  return useMutation({
    mutationFn: createNews,
    onSuccess: segarkan,
  });
}

export function useUpdateNews() {
  const segarkan = pakaiSegarkan();

  return useMutation({
    mutationFn: updateNews,
    onSuccess: segarkan,
  });
}

export function useDeleteNews() {
  const segarkan = pakaiSegarkan();

  return useMutation({
    mutationFn: deleteNews,
    onSuccess: segarkan,
  });
}

export function useRestoreNews() {
  const segarkan = pakaiSegarkan();

  return useMutation({
    mutationFn: restoreNews,
    onSuccess: segarkan,
  });
}

/* Halaman depan (publik) */
export function usePublicNews(params = {}) {
  return useQuery({
    queryKey: ["public-news", params],
    queryFn: () => getPublicNews(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePublicNewsDetail(slug) {
  return useQuery({
    queryKey: ["public-news", "detail", slug],
    queryFn: () => getPublicNewsDetail(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
}
