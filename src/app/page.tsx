import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "24px" }}>
      Fleet Control — scaffold.{" "}
      <Link href="/styleguide" style={{ textDecoration: "underline" }}>
        /styleguide
      </Link>
    </main>
  );
}
