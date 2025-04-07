"use client";
import { useEffect, type ReactNode } from "react";
import * as amplitude from "@amplitude/analytics-browser";

interface AmplitudeProviderProps {
  children: ReactNode;
}

export default function AmplitudeProvider({
  children,
}: AmplitudeProviderProps) {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!apiKey) {
      console.warn("Amplitude API key is not defined");
      return;
    }

    amplitude.init(apiKey, undefined, {
      defaultTracking: {
        sessions: true,
      },
    });
  }, []);

  return children;
}
