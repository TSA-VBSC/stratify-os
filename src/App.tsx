import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import DashboardPage from "./pages/DashboardPage";
import ResumePage from "./pages/ResumePage";
import ScannerPage from "./pages/ScannerPage";
import JobSearchPage from "./pages/JobSearchPage";
import InterviewPage from "./pages/InterviewPage";
import SkillsGapPage from "./pages/SkillsGapPage";
import CoverLetterPage from "./pages/CoverLetterPage";
import CareerPathPage from "./pages/CareerPathPage";
import ArticlesPage from "./pages/ArticlesPage";
import PodcastPage from "./pages/PodcastPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/jobs" element={<JobSearchPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/skills-gap" element={<SkillsGapPage />} />
            <Route path="/cover-letter" element={<CoverLetterPage />} />
            <Route path="/career-path" element={<CareerPathPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/podcast" element={<PodcastPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
