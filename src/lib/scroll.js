/**
 * Kembalikan posisi scroll ke atas.
 * Dashboard menggulir di dalam <main data-scroll-container>,
 * sedangkan halaman publik menggulir pada window.
 */
export function scrollContainersToTop() {
  window.scrollTo(0, 0);

  document
    .querySelector("[data-scroll-container]")
    ?.scrollTo({ top: 0 });
}
