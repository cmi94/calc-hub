"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CompatibilityRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/name-compatibility");
  }, [router]);
  return null;
}
