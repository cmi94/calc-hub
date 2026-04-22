"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SeveranceGuideRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/retirement/guide");
  }, [router]);
  return null;
}
