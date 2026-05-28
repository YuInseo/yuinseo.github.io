import Nav from "../components/Nav";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--t1)]">
      <Nav />
      <main className="mx-auto max-w-2xl px-5 pt-20">
        <h1 className="mb-10 text-3xl font-bold">블로그</h1>
        <p className="text-sm text-[var(--t5)]">아직 작성된 글이 없어요.</p>
      </main>
    </div>
  );
}
