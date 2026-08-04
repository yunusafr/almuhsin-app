import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  DoorClosed,
  GraduationCap,
  Plus,
  RefreshCw,
  UserCheck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import PageHeader from "@/components/common/page-header";
import StatCard from "@/components/common/stat-card";
import { cn } from "@/lib/utils";

import TableContainer from "@/components/data-table/table-container";
import DataTableHeader from "@/components/data-table/data-table-header";
import DataTableSearch from "@/components/data-table/data-table-search";
import DataTable from "@/components/data-table/data-table";

import { useClasses } from "@/features/kelas/hooks/use-classes";
import { useAcademicYears } from "@/features/academic-year/hooks/use-academic-year";
import { useEnrollments } from "@/features/enrollment/hooks/use-enrollments";

import { classColumns } from "./components/class-columns";
import ClassDialog from "./components/class-dialog";
import ClassDeleteDialog from "./components/class-delete-dialog";

import { enrollmentColumns } from "./components/enrollment-columns";
import EnrollmentDialog from "./components/enrollment-dialog";
import EnrollmentBulkDialog from "./components/enrollment-bulk-dialog";
import EnrollmentDeleteDialog from "./components/enrollment-delete-dialog";

const TABS = [
  { value: "kelas", label: "Data Kelas" },
  { value: "plotting", label: "Plotting Santri" },
];

export default function ClassPage() {
  const [tab, setTab] = useState("kelas");

  // --- Data Kelas ---
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // --- Plotting ---
  const [classFilter, setClassFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [enrollDeleteOpen, setEnrollDeleteOpen] = useState(false);
  const [enrollSelected, setEnrollSelected] = useState(null);

  const { data: classes = [], isLoading, refetch } = useClasses();
  const { data: academicYearResponse } = useAcademicYears();
  const academicYears = academicYearResponse?.data ?? [];

  const enrollmentParams = useMemo(() => {
    const params = {};

    if (classFilter !== "all") params.class_id = classFilter;
    if (yearFilter !== "all") params.academic_year_id = yearFilter;

    return params;
  }, [classFilter, yearFilter]);

  const { data: enrollmentsData } = useEnrollments(enrollmentParams);
  const enrollments = enrollmentsData?.data ?? [];

  const filteredData = useMemo(() => {
    const keyword = search.toLowerCase();

    return classes.filter((item) => {
      return (
        item.name.toLowerCase().includes(keyword) ||
        (item.level ?? "").toLowerCase().includes(keyword)
      );
    });
  }, [classes, search]);

  const enrollmentStats = useMemo(() => {
    return enrollments.reduce(
      (acc, item) => {
        acc.total++;

        const status = item.status;

        if (status) {
          acc[status] = (acc[status] ?? 0) + 1;
        }

        return acc;
      },
      { total: 0, aktif: 0, mutasi: 0, lulus: 0, keluar: 0 },
    );
  }, [enrollments]);

  const columns = useMemo(
    () =>
      classColumns({
        onEdit: (row) => {
          setSelected(row);
          setDialogOpen(true);
        },

        onDelete: (row) => {
          setSelected(row);
          setDeleteOpen(true);
        },
      }),
    [],
  );

  const enrollmentCols = useMemo(
    () =>
      enrollmentColumns({
        onEdit: (row) => {
          setEnrollSelected(row);
          setEnrollOpen(true);
        },

        onDelete: (row) => {
          setEnrollSelected(row);
          setEnrollDeleteOpen(true);
        },
      }),
    [],
  );

  return (
    <>
      <PageHeader
        title="Master Kelas"
        description="Kelola daftar kelas dan plotting santri ke kelas."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={refetch}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            {tab === "kelas" ? (
              <Button
                onClick={() => {
                  setSelected(null);
                  setDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Tambah Kelas
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setBulkOpen(true)}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Plotting Massal
                </Button>

                <Button
                  onClick={() => {
                    setEnrollSelected(null);
                    setEnrollOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Plotting Santri
                </Button>
              </div>
            )}
          </div>
        }
      />

      <div className="space-y-6">
        {tab === "plotting" && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total Plotting"
            value={enrollmentStats.total}
            icon={Users}
          />

          <StatCard
            title="Aktif"
            value={enrollmentStats.aktif ?? 0}
            icon={UserCheck}
          />

          <StatCard
            title="Mutasi"
            value={enrollmentStats.mutasi ?? 0}
            icon={ArrowLeftRight}
          />

          <StatCard
            title="Lulus"
            value={enrollmentStats.lulus ?? 0}
            icon={GraduationCap}
          />

          <StatCard
            title="Keluar"
            value={enrollmentStats.keluar ?? 0}
            icon={DoorClosed}
          />
        </div>
      )}

      <TableContainer>
        {/* Tab navigasi: Data Kelas | Plotting Santri */}
        <div className="flex items-center gap-1 overflow-x-auto border-b px-4">
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                "-mb-px border-b-2 pt-3 pb-3 text-sm font-medium transition-colors",
                tab === t.value
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "kelas" ? (
          <>
            <DataTableHeader
              title="Daftar Master Kelas"
              description={`${filteredData.length} kelas`}
              search={
                <DataTableSearch
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kelas..."
                />
              }
            />

            <DataTable
              data={filteredData}
              columns={columns}
              loading={isLoading}
              emptyMessage="Belum ada data kelas."
            />
          </>
        ) : (
          <>
            <DataTableHeader
              title="Daftar Plotting Santri"
              description={`${enrollments.length} data plotting`}
              search={
                <div className="flex flex-wrap items-center gap-2">
                  <Select
                    value={classFilter}
                    onValueChange={setClassFilter}
                  >
                    <SelectTrigger className="h-10 w-44 rounded-xl">
                      <SelectValue placeholder="Semua Kelas" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="all">Semua Kelas</SelectItem>

                      {classes.map((klass) => (
                        <SelectItem key={klass.id} value={klass.id}>
                          {klass.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger className="h-10 w-44 rounded-xl">
                      <SelectValue placeholder="Semua Tahun Ajaran" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="all">
                        Semua Tahun Ajaran
                      </SelectItem>

                      {academicYears.map((year) => (
                        <SelectItem key={year.id} value={year.id}>
                          {year.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              }
            />

            <DataTable
              data={enrollments}
              columns={enrollmentCols}
              loading={isLoading}
              emptyMessage="Belum ada data plotting santri."
            />
          </>
        )}
      </TableContainer>
      </div>

      <ClassDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selected}
      />

      <ClassDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        data={selected}
      />

      <EnrollmentDialog
        open={enrollOpen}
        onOpenChange={setEnrollOpen}
        data={enrollSelected}
      />

      <EnrollmentBulkDialog
        open={bulkOpen}
        onOpenChange={setBulkOpen}
      />

      <EnrollmentDeleteDialog
        open={enrollDeleteOpen}
        onOpenChange={setEnrollDeleteOpen}
        data={enrollSelected}
      />
    </>
  );
}
