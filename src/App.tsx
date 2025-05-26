
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MarketShare from "./pages/MarketShare";
import TransactionAnalysis from "./pages/TransactionAnalysis";
import ProductInsights from "./pages/ProductInsights";
import ChurnAnalysis from "./pages/ChurnAnalysis";
import TrendAnalysis from "./pages/TrendAnalysis";
import CustomerSegmentation from "./pages/CustomerSegmentation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/market-share" element={<MarketShare />} />
          <Route path="/transaction-analysis" element={<TransactionAnalysis />} />
          <Route path="/product-insights" element={<ProductInsights />} />
          <Route path="/churn-analysis" element={<ChurnAnalysis />} />
          <Route path="/trend-analysis" element={<TrendAnalysis />} />
          <Route path="/customer-segmentation" element={<CustomerSegmentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
