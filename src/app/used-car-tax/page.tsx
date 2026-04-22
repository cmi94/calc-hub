"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UsedCarTaxRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/property-acquisition-tax");
  }, [router]);
  return null;
}
