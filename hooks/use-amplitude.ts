"use client";

import { useCallback } from "react";
import * as amplitude from "@amplitude/analytics-browser";

interface EventProperties {
  [key: string]: string | number | boolean;
}

export default function useAmplitude() {
  const logEvent = useCallback(
    (eventName: string, eventProperties: EventProperties = {}) => {
      if (typeof window !== "undefined") {
        amplitude.logEvent(eventName, eventProperties);
      }
    },
    []
  );

  return { logEvent };
}
