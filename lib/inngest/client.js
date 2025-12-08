import { Inngest } from "inngest";

export const inngest = new Inngest({id: 'smart_spend', name: 'SmartSpend', retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000,
    maxAttempts:2
}) })