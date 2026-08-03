import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import { getStudents } from "@/features/santri/api/students.api";
import { getTeachers } from "@/features/asatidz/api/teachers-api";
import { getAttendances } from "@/features/presensi/api/attendances-api";
import { getInvoices } from "@/features/keuangan/api/invoices-api";
import { getToken } from "@/features/auth/lib/token";

/**
 * Statistik untuk halaman publik (landing).
 *
 * - Jika pengguna sedang login (token tersedia), angka diambil dari API asli.
 * - Jika tidak login (atau API gagal), tampilkan nilai pemasaran default.
 */
export function useLandingStats() {
  const enabled = !!getToken();

  const studentsQuery = useQuery({
    queryKey: ["landing-stats", "students"],
    queryFn: getStudents,
    enabled,
    retry: false,
  });

  const teachersQuery = useQuery({
    queryKey: ["landing-stats", "teachers"],
    queryFn: getTeachers,
    enabled,
    retry: false,
  });

  const attendancesQuery = useQuery({
    queryKey: ["landing-stats", "attendances"],
    queryFn: getAttendances,
    enabled,
    retry: false,
  });

  const invoicesQuery = useQuery({
    queryKey: ["landing-stats", "invoices"],
    queryFn: getInvoices,
    enabled,
    retry: false,
  });

  return useMemo(() => {
    const defaults = {
      students: 1200,
      teachers: 45,
      attendanceRate: 98,
      collected: null,
      isLive: false,
    };

    if (!enabled) return defaults;

    const students = studentsQuery.data?.data ?? studentsQuery.data ?? [];
    const teachers = teachersQuery.data?.data ?? teachersQuery.data ?? [];
    const attendances = attendancesQuery.data?.data ?? attendancesQuery.data ?? [];
    const invoices = invoicesQuery.data?.data ?? invoicesQuery.data ?? [];

    const isLoading =
      studentsQuery.isLoading ||
      teachersQuery.isLoading ||
      attendancesQuery.isLoading ||
      invoicesQuery.isLoading;

    const hasError =
      studentsQuery.isError ||
      teachersQuery.isError ||
      attendancesQuery.isError ||
      invoicesQuery.isError;

    if (isLoading || hasError) return defaults;

    const today = format(new Date(), "yyyy-MM-dd");

    const todayEntries = attendances
      .filter((item) => item.date === today)
      .reduce((acc, item) => {
        const entries = item.students ?? item.details ?? [];
        return acc + entries.length;
      }, 0);

    const collected = invoices.reduce(
      (acc, invoice) => acc + Number(invoice.paid_amount ?? 0),
      0,
    );

    const studentCount = Array.isArray(students) ? students.length : 0;
    const teacherCount = Array.isArray(teachers) ? teachers.length : 0;

    const attendanceRate =
      studentCount > 0 && todayEntries > 0
        ? Math.min(100, Math.round((todayEntries / Math.max(studentCount, 1)) * 100))
        : 0;

    return {
      students: studentCount || defaults.students,
      teachers: teacherCount || defaults.teachers,
      attendanceRate,
      collected,
      isLive: true,
    };
  }, [enabled, studentsQuery, teachersQuery, attendancesQuery, invoicesQuery]);
}
