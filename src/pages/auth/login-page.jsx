import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Left */}

      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 p-16 text-white lg:flex">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              A
            </div>

            <div>
              <h2 className="text-2xl font-bold">Almuhsin App</h2>

              <p className="text-green-100">ERP Pondok Pesantren</p>
            </div>
          </div>

          <h1 className="mt-16 text-5xl font-black leading-tight">
            Selamat Datang
            <br />
            Kembali
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-green-100">
            Kelola seluruh administrasi pondok pesantren dalam satu platform
            modern, cepat dan mudah digunakan.
          </p>
        </div>

        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
          <p className="text-green-100">
            "Digitalisasi pondok dimulai dari administrasi yang sederhana namun
            terstruktur."
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md rounded-3xl border bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-3xl font-bold">Login</h2>

          <p className="mt-2 text-muted-foreground">
            Masuk ke Dashboard Almuhsin App
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
