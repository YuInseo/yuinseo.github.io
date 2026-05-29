import type { Metadata } from "next";
import Nav from "../../../components/Nav";
import DemoApp from "./DemoApp";

export const metadata: Metadata = {
  title: "라이브 데모 – Artisan's Compass",
  description: "Artisan's Compass UI를 목데이터로 브라우저에서 체험해보세요.",
};

export default function DemoPage() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>
      <Nav />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 16px 40px" }}>
        <p style={{
          textAlign: "center",
          color: "#5a5248",
          fontSize: 12,
          marginBottom: 16,
          letterSpacing: "0.04em",
        }}>
          실제 앱 UI를 목데이터로 체험할 수 있어요. 간트 바·투두·퀘스트를 눌러보세요.
        </p>
        <DemoApp />
      </div>
    </div>
  );
}
