import { APP_LOGO, APP_TITLE } from "@/const";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          {APP_LOGO && (
            <img src={APP_LOGO} alt="Logo" className="h-8 w-8" />
          )}
          <h1 className="text-3xl font-bold">{APP_TITLE}</h1>
        </div>
      </div>
    </header>
  );
}
