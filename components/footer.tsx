"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");

  return (
    <footer className="mt-20 border-t border-white/5 py-6">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Logo Generator.{" "}
              {t("allRightsReserved")}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href={`/${locale}/terms`}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              {t("termsOfService")}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href={`/${locale}/legal-notice`}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
            >
              {t("commercialTransactionsAct")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
