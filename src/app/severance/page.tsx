"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SeveranceRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/retirement");
  }, [router]);
  return null;
}
