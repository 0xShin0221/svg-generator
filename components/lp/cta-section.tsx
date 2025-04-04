"use client";

import { Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CTASection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mb-24">
      <Card className="border-2 border-blue-400 bg-gradient-to-br from-blue-950 to-purple-950 shadow-xl shadow-blue-900/30">
        <CardContent className="p-10 text-center">
          <h2 className="text-3xl font-bold text-blue-200 mb-4">
            今すぐロゴを作成しましょう
          </h2>
          <p className="text-blue-50 max-w-2xl mx-auto mb-8 leading-relaxed">
            登録不要、完全無料で、プロフェッショナルなロゴを数分で作成できます。
            あなたのブランドにぴったりのロゴを、今すぐデザインしましょう。
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-300 hover:to-purple-300 text-blue-950 font-semibold border-0 shadow-lg shadow-blue-500/40 transition-all duration-300"
              onClick={() => scrollToSection("start")}
            >
              無料でロゴを作成 <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CTASection;
