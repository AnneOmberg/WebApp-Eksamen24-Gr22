import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="font-bold text-3xl border-b pb-2 mb-4">
          Nytt arrangement
        </h1>
        <Link href="newevent/templates">
          <div className="border rounded bg-green-100 w-full py-2 px-4 mb-4 shadow-sm hover:bg-green-200 cursor-pointer">
            Med mal
          </div>
        </Link>
        <Link href="newevent/fromscratch">
          <div className="border rounded bg-slate-100 w-full py-2 px-4 shadow-sm hover:bg-slate-200 cursor-pointer">
            Fra scratch
          </div>
        </Link>
      </div>
    </div>
  );
}
