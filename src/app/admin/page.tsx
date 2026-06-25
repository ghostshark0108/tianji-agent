"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Check, X, Shield, Loader2, RefreshCw } from "lucide-react";

interface Payment {
  id: string;
  email: string;
  plan: string;
  amount: number;
  txHint: string;
  createdAt: number;
}

const planNames: Record<string, string> = {
  single: "单次分析",
  monthly: "月度会员",
  yearly: "年度会员",
};

export default function AdminPage() {
  const { email } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [grantTokens, setGrantTokens] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();
      setPayments(data.payments || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    setProcessing(id);
    try {
      const res = await fetch("/api/admin/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (action === "approve" && data.grantToken) {
        setGrantTokens((prev) => ({ ...prev, [id]: data.grantToken }));
      }
      fetchPayments();
    } catch {
    } finally {
      setProcessing(null);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-[#d4a574] mx-auto mb-4" />
          <p className="text-white/50">请先登录</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">支付审核</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPayments}
            className="border-white/10 text-white/50 hover:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            刷新
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 text-[#d4a574] animate-spin mx-auto" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-white/10 bg-[#111118]">
            <Check className="w-12 h-12 text-[#d4a574] mx-auto mb-4" />
            <p className="text-white/50">暂无待审核支付</p>
          </div>
        ) : (
          <div className="space-y-4">
            {payments.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-white/10 bg-[#111118] p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-medium">{p.email}</p>
                    <p className="text-sm text-white/40">
                      {planNames[p.plan] || p.plan} · ¥{p.amount}
                    </p>
                  </div>
                  <span className="text-xs text-white/30">
                    {new Date(p.createdAt).toLocaleString("zh-CN")}
                  </span>
                </div>
                <p className="text-sm text-white/60 mb-4">
                  交易单号后4位：<span className="font-mono text-[#d4a574]">{p.txHint}</span>
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAction(p.id, "approve")}
                    disabled={processing === p.id}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {processing === p.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Check className="w-4 h-4 mr-1" />
                    )}
                    确认
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAction(p.id, "reject")}
                    disabled={processing === p.id}
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <X className="w-4 h-4 mr-1" />
                    拒绝
                  </Button>
                </div>

                {/* 显示grant token */}
                {grantTokens[p.id] && (
                  <div className="mt-3 p-3 rounded-lg bg-[#d4a574]/10 border border-[#d4a574]/20">
                    <p className="text-xs text-[#d4a574] mb-1">兑换码（发给用户）：</p>
                    <p className="font-mono text-xs text-white break-all">
                      {grantTokens[p.id]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
