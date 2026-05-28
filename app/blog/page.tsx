import Nav from "../components/Nav";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#e2e2ec]">
      <Nav />
      <main className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="mb-12 text-3xl font-bold">블로그</h1>
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[#252530] py-20 text-center">
          <p className="text-[#6a6a98]">아직 작성된 글이 없어요.</p>
          <p className="text-sm text-[#3a3a58]">곧 업데이트할게요.</p>
        </div>
      </main>
    </div>
  );
}
