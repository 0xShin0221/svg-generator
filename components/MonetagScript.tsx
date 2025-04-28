"use client";
import { useEffect } from "react";

export default function MonetagScript() {
  useEffect(() => {
    ((d, z, s) => {
      s.src = `https://${d}/400/${z}`;
      try {
        (document.body || document.documentElement).appendChild(s);
      } catch (e) {}
    })("vemtoutcheeg.com", 9269689, document.createElement("script"));
  }, []);
  return null;
}
