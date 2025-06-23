import Link from "next/link";
import { TrendingUp, BookOpen, Zap, Cloud, Shield, Users, Award } from "lucide-react";

const articles = [
  {
    title: "2025 In-Demand Technology Roles and Hiring Trends",
    url: "https://www.roberthalf.com/us/en/insights/research/data-reveals-which-technology-roles-are-in-highest-demand",
    summary: "Explore the most in-demand tech roles for 2025, including AI/ML engineers, data analysts, DevOps, and more. Learn about hiring trends and salary insights.",
    icon: <TrendingUp className="h-6 w-6 text-blue-500" />
  },
  {
    title: "State of the Tech Workforce 2024",
    url: "https://www.comptia.org/en-us/resources/research/state-of-the-tech-workforce-2024/",
    summary: "CompTIA's annual report on tech workforce growth, job market outlook, and salary trends. Tech jobs are projected to grow twice as fast as the overall workforce.",
    icon: <Users className="h-6 w-6 text-purple-500" />
  },
  {
    title: "Predictions For The Tech Job Market In 2025 (Forbes)",
    url: "https://www.forbes.com/sites/jackkelly/2024/12/17/predictions-for-the-tech-job-market-in-2025/",
    summary: "Forbes' expert analysis on the rebound of the tech job market, the rise of AI roles, and the shift to quality hiring and global talent.",
    icon: <Zap className="h-6 w-6 text-pink-500" />
  },
  {
    title: "Will 2024 Disrupt the IT Industry? Tech Leaders Predict Trends",
    url: "https://content.techgig.com/expert-opinion/will-2024-disrupt-the-it-industry-tech-leaders-predict-cutting-edge-technology-trends/articleshow/106583524.cms",
    summary: "TechGig interviews industry leaders about the impact of AI, cloud, cybersecurity, and automation on the IT industry in 2024 and beyond.",
    icon: <Cloud className="h-6 w-6 text-cyan-500" />
  },
  {
    title: "Best Tech Jobs That Pay $200k to $500k a Year in 2024",
    url: "https://www.nucamp.co/blog/homepage-nucamp-best-tech-jobs-that-pay-200k-to-500k-a-year-in-2024-and-how-to-land-one",
    summary: "Nucamp highlights the highest-paying tech jobs, including software engineers, data scientists, and AI/ML specialists, and how to land them.",
    icon: <Award className="h-6 w-6 text-amber-500" />
  }
];

export default function CareerAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 py-10 px-2 md:px-0">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-10 w-10 text-blue-500" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-tr from-blue-600 to-pink-500 text-transparent bg-clip-text">Career Analytics & Tech Trends</h1>
        </div>
        <p className="mb-8 text-gray-600 text-lg font-medium">
          Explore the latest analysis, trends, and expert articles on tech careers. Stay ahead with insights into the fastest-growing roles, in-demand skills, and future opportunities.
        </p>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Zap className="h-6 w-6 text-pink-500" /> 2025 Tech Career Trends & Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 bg-gradient-to-tr from-blue-100 to-pink-100 rounded-xl shadow">
              <Zap className="h-6 w-6 text-pink-500 mt-1" />
              <span className="text-gray-800 font-semibold">AI, Machine Learning, and Data Science roles are growing fastest.</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-xl shadow">
              <Shield className="h-6 w-6 text-blue-500 mt-1" />
              <span className="text-gray-800 font-semibold">Cloud, DevOps, and Cybersecurity remain in high demand.</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-xl shadow">
              <BookOpen className="h-6 w-6 text-purple-500 mt-1" />
              <span className="text-gray-800 font-semibold">Entry-level software and IT support roles are being automated—upskill for future-proof careers.</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-tr from-blue-100 to-pink-100 rounded-xl shadow">
              <Users className="h-6 w-6 text-cyan-500 mt-1" />
              <span className="text-gray-800 font-semibold">Remote work and global hiring are increasing competition and opportunity.</span>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-xl shadow">
              <Award className="h-6 w-6 text-amber-500 mt-1" />
              <span className="text-gray-800 font-semibold">Certifications and hands-on projects are key to standing out.</span>
            </div>
          </div>
        </section>
        <div className="border-t border-gray-200 my-10" />
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BookOpen className="h-6 w-6 text-blue-500" /> Latest Articles & Resources</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article, idx) => (
              <div key={idx} className="p-5 bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-2xl shadow hover:shadow-lg border transition-all">
                <div className="flex items-center gap-2 mb-2">{article.icon}<a href={article.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-700 hover:underline">{article.title}</a></div>
                <p className="text-gray-600 text-sm mt-1">{article.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}