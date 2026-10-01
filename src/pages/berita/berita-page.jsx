import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CalendarDays,
  ImagePlus,
  Newspaper,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, listData, listPagination } from "@/lib/utils";
import {
  useCreateNews,
  useDeleteNews,
  useNews,
  useRestoreNews,
  useTrashedNews,
  useUpdateNews,
} from "@/features/berita/hooks/use-news";

const KATEGORI = ["Pengumuman", "Kegiatan", "Prestasi", "PPDB", "Umum"];

const KOSONG = {
  id: null,
  title: "",
  category: "Pengumuman",
  excerpt: "",
  body: "",
  is_published: true,
  published_at: new Date().toISOString().slice(0, 10),
  cover_url: null,
};

export default function BeritaPage() {
  const [cari, setCari] = useState("");
  const [status, setStatus] = useState("semua");
  const [halaman, setHalaman] = useState(1);
  const [lihatSampah, setLihatSampah] = useState(false);
  const [form, setForm] = useState(null);
  const [berkas, setBerkas] = useState(null);
  const [pratinjau, setPratinjau] = useState(null);

  const daftar = useNews({
    cari: cari || undefined,
    status: status === "semua" ? undefined : status,
    per_page: 10,
    page: halaman,
  });
  const sampah = useTrashedNews();
  const buat = useCreateNews();
  const ubah = useUpdateNews();
  const hapus = useDeleteNews();
  const pulihkan = useRestoreNews();

  const data = listData(lihatSampah ? sampah.data : daftar.data);
  const paginasi = listPagination(lihatSampah ? sampah.data : daftar.data);
  const memuat = lihatSampah ? sampah.isLoading : daftar.isLoading;

  useEffect(() => {
    if (!berkas) {
      setPratinjau(null);
      return;
    }
    const url = URL.createObjectURL(berkas);
    setPratinjau(url);
    return () => URL.revokeObjectURL(url);
  }, [berkas]);

  const kategoriTersedia = useMemo(() => {
    const dariData = data.map((d) => d.category).filter(Boolean);
    return [...new Set([...KATEGORI, ...dariData])];
  }, [data]);

  function bukaForm(berita = null) {
    setBerkas(null);
    setForm(
      berita
        ? {
            id: berita.id,
            title: berita.title ?? "",
            category: berita.category ?? "Pengumuman",
            excerpt: berita.excerpt ?? "",
            body: berita.body ?? "",
            is_published: !!berita.is_published,
            published_at: berita.published_at
              ? String(berita.published_at).slice(0, 10)
              : new Date().toISOString().slice(0, 10),
            cover_url: berita.cover_url ?? null,
          }
        : { ...KOSONG },
    );
  }

  async function simpan(e) {
    e.preventDefault();

    if (!form.title.trim()) return toast.error("Judul berita belum diisi.");
    if (!form.body.trim()) return toast.error("Isi berita belum diisi.");

    const payload = {
      title: form.title.trim(),
      category: form.category,
      excerpt: form.excerpt?.trim() || null,
      body: form.body,
      is_published: form.is_published,
      published_at: form.published_at || null,
    };

    try {
      if (form.id) {
        await ubah.mutateAsync({ id: form.id, payload, cover: berkas });
        toast.success("Berita berhasil diperbarui.");
      } else {
        await buat.mutateAsync({ payload, cover: berkas });
        toast.success("Berita berhasil disimpan dan tampil di halaman depan.");
      }
      setForm(null);
      setBerkas(null);
    } catch (error) {
      const pesan =
        error?.response?.data?.message ?? "Berita gagal disimpan. Coba lagi.";
      toast.error(pesan);
    }
  }

  async function hapusBerita(berita) {
    if (!window.confirm(`Hapus berita "${berita.title}"?`)) return;
    try {
      await hapus.mutateAsync(berita.id);
      toast.success("Berita dihapus. Bisa dipulihkan dari daftar sampah.");
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Berita gagal dihapus.");
    }
  }

  async function pulihkanBerita(berita) {
    try {
      await pulihkan.mutateAsync(berita.id);
      toast.success("Berita berhasil dipulihkan.");
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Berita gagal dipulihkan.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Kepala halaman */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Berita &amp; Pengumuman</h1>
          <p className="text-sm text-muted-foreground">
            Berita yang diterbitkan otomatis tampil di halaman depan pesantren.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setLihatSampah((v) => !v)}>
            {lihatSampah ? <Newspaper className="mr-2 h-4 w-4" /> : <Trash2 className="mr-2 h-4 w-4" />}
            {lihatSampah ? "Daftar Berita" : "Sampah"}
          </Button>
          <Button onClick={() => bukaForm()} disabled={lihatSampah}>
            <Plus className="mr-2 h-4 w-4" />
            Tulis Berita
          </Button>
        </div>
      </div>

      {/* Penyaring */}
      <Card>
        <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari judul atau ringkasan berita…"
              className="pl-9"
              value={cari}
              onChange={(e) => {
                setCari(e.target.value);
                setHalaman(1);
              }}
              disabled={lihatSampah}
            />
          </div>

          <Select
            value={status}
            onValueChange={(v) => {
              setStatus(v);
              setHalaman(1);
            }}
            disabled={lihatSampah}
          >
            <SelectTrigger className="sm:w-44">
              <SelectValue placeholder="Semua status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua status</SelectItem>
              <SelectItem value="terbit">Sudah terbit</SelectItem>
              <SelectItem value="draf">Masih draf</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Daftar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Newspaper className="h-4 w-4 text-primary" />
            {lihatSampah ? "Berita terhapus" : "Daftar berita"}
            <Badge variant="secondary">{paginasi?.total ?? data.length}</Badge>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {memuat ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : data.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              {lihatSampah
                ? "Tidak ada berita terhapus."
                : "Belum ada berita. Klik “Tulis Berita” untuk membuat yang pertama."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Foto</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead className="w-32">Kategori</TableHead>
                    <TableHead className="w-40">Tanggal</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-28 text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((berita) => (
                    <TableRow key={berita.id}>
                      <TableCell>
                        {berita.cover_url ? (
                          <img
                            src={berita.cover_url}
                            alt=""
                            className="h-10 w-14 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-14 items-center justify-center rounded-md bg-muted text-muted-foreground">
                            <ImagePlus className="h-4 w-4" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium leading-snug">{berita.title}</p>
                        {berita.excerpt && (
                          <p className="line-clamp-1 text-xs text-muted-foreground">
                            {berita.excerpt}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{berita.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(berita.published_at ?? berita.created_at)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {berita.is_published ? (
                          <Badge className="bg-green-600 hover:bg-green-600">Terbit</Badge>
                        ) : (
                          <Badge variant="secondary">Draf</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {lihatSampah ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => pulihkanBerita(berita)}
                          >
                            <RotateCcw className="mr-1 h-3.5 w-3.5" />
                            Pulihkan
                          </Button>
                        ) : (
                          <div className="flex justify-end gap-1">
                            <Button size="icon" variant="ghost" onClick={() => bukaForm(berita)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive"
                              onClick={() => hapusBerita(berita)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!lihatSampah && paginasi && paginasi.last_page > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Halaman {paginasi.current_page} dari {paginasi.last_page}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={paginasi.current_page <= 1}
                  onClick={() => setHalaman((p) => Math.max(1, p - 1))}
                >
                  Sebelumnya
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={paginasi.current_page >= paginasi.last_page}
                  onClick={() => setHalaman((p) => p + 1)}
                >
                  Berikutnya
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form tulis/ubah berita */}
      <Dialog open={!!form} onOpenChange={(terbuka) => !terbuka && setForm(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{form?.id ? "Ubah Berita" : "Tulis Berita"}</DialogTitle>
            <DialogDescription>
              Berita yang diterbitkan akan langsung tampil di halaman depan pesantren.
            </DialogDescription>
          </DialogHeader>

          {form && (
            <form onSubmit={simpan} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="judul">Judul berita</Label>
                <Input
                  id="judul"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Penerimaan Santri Baru Dibuka"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => setForm({ ...form, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {kategoriTersedia.map((k) => (
                        <SelectItem key={k} value={k}>
                          {k}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggal">Tanggal terbit</Label>
                  <Input
                    id="tanggal"
                    type="date"
                    value={form.published_at}
                    onChange={(e) => setForm({ ...form, published_at: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ringkasan">Ringkasan singkat (tampil di halaman depan)</Label>
                <Textarea
                  id="ringkasan"
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Satu atau dua kalimat ringkas."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isi">Isi berita</Label>
                <Textarea
                  id="isi"
                  rows={8}
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                  placeholder="Tulis isi berita di sini."
                />
              </div>

              <div className="space-y-2">
                <Label>Foto utama (pilihan)</Label>
                <div className="flex items-center gap-3">
                  {pratinjau || form.cover_url ? (
                    <img
                      src={pratinjau ?? form.cover_url}
                      alt=""
                      className="h-16 w-24 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <ImagePlus className="h-5 w-5" />
                    </div>
                  )}

                  <div className="flex flex-col gap-1">
                    <Input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(e) => setBerkas(e.target.files?.[0] ?? null)}
                      className="max-w-xs"
                    />
                    <span className="text-xs text-muted-foreground">
                      JPG/PNG/WEBP, paling besar 4 MB.
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">Terbitkan sekarang</p>
                  <p className="text-xs text-muted-foreground">
                    Bila dimatikan, berita disimpan sebagai draf (belum tampil).
                  </p>
                </div>
                <Switch
                  checked={form.is_published}
                  onCheckedChange={(v) => setForm({ ...form, is_published: v })}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setForm(null)}>
                  <X className="mr-2 h-4 w-4" />
                  Batal
                </Button>
                <Button type="submit" disabled={buat.isPending || ubah.isPending}>
                  {buat.isPending || ubah.isPending ? "Menyimpan…" : "Simpan Berita"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
