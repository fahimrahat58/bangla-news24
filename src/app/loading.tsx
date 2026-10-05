export default function Loading() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />

          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#b91c1c] animate-spin" />
        </div>

        <p className="text-sm font-medium text-gray-500">লোড হচ্ছে...</p>
      </div>
    </main>
  );
}
