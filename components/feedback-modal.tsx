"use client";
import React, { useState, useEffect, type FC, type FormEvent } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, MessageCircle, Loader2 } from "lucide-react";

const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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";

const FeedbackModal: FC = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Bug");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const site =
    typeof window !== "undefined" ? window.location.hostname : "unknown";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        category,
        message,
        email,
        site,
      };
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send feedback");
      setSent(true);
      setMessage("");
      setEmail("");
    } catch (err) {
      setError("Failed to send. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // openがfalseになったら送信状態もリセット
  useEffect(() => {
    if (!open) {
      setSent(false);
      setMessage("");
      setEmail("");
      setError("");
      setCategory("Bug");
    }
  }, [open]);

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:scale-105 transition-all"
        aria-label="Send Feedback"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-semibold hidden sm:inline">Feedback</span>
      </button>
      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            tabIndex={-1}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
              }}
            >
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-3xl mb-4">🎉</div>
                  <div className="text-xl font-bold mb-2">
                    Thank you for your feedback!
                  </div>
                  <div className="text-gray-500 mb-6">
                    We appreciate your input and will review it soon.
                  </div>
                  <Button onClick={() => setOpen(false)} className="w-full">
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-2xl font-bold text-center mb-2">
                    Send Feedback
                  </div>
                  <div className="flex gap-2 justify-center mb-2">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg font-semibold border ${
                        category === "Bug"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setCategory("Bug")}
                    >
                      Bug
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded-lg font-semibold border ${
                        category === "Feedback"
                          ? "bg-purple-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                      onClick={() => setCategory("Feedback")}
                    >
                      Feedback
                    </button>
                  </div>
                  <textarea
                    className="w-full rounded-lg border border-gray-300 p-3 min-h-[100px] focus:ring-2 focus:ring-blue-400"
                    placeholder="Describe the bug or your suggestion in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={1000}
                  />
                  <input
                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400"
                    type="email"
                    placeholder="Your email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="text-xs text-gray-400 mb-2 text-center">
                    Site: {site}
                  </div>
                  {error && (
                    <div className="text-red-500 text-center">{error}</div>
                  )}
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Send
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default FeedbackModal;
