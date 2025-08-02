'use client'

import { useCallback, useState } from "react";
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
import { completeSubscription } from "@/app/action/user";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();
  const onSubscribe = useCallback(async () => {
    try {
      setIsProcessing(true);

      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const { payment_session_id, order_id } = await res.json();

      if (!payment_session_id) {
        throw new Error("No payment session ID received");
      }

      const cashfree = await load({ mode: "sandbox" });

      const result = await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal",
      });

      if (result.error) throw new Error(result.error.message);

      const verifyResponse = await fetch(
        `/api/payment/verify?order_id=${order_id}`
      );
      const verifyData = await verifyResponse;
      if (verifyData.status === 200) {
        const customer = await completeSubscription();
        if (customer.status !== 200) {
          toast.error("Error in subscription");
        } else {
          await queryClient.invalidateQueries({ queryKey: ["user-workspaces"] });
          toast("Payment verified successfully!");
        }
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { onSubscribe, isProcessing };
};
