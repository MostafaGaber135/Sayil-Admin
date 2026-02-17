"use client";

import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/shared/lib/rtk/store";
import { queryClient } from "@/shared/lib/react-query/queryClient";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
}
