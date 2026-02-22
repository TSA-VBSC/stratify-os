export interface Job {
  id: string;
  title: string;
  location: string;
  salary: string;
  salaryNum: number;
  description: string;
  company: string;
  applyUrl?: string;
}

export const presetJobs: Job[] = [
  { id: "1", title: "AI Engineer", location: "San Francisco, CA", salary: "$165,000", salaryNum: 165000, description: "Build and deploy large language model pipelines for enterprise products.", company: "NeuralForge" },
  { id: "2", title: "Data Scientist", location: "New York, NY", salary: "$145,000", salaryNum: 145000, description: "Analyze complex datasets and build predictive models for finance sector.", company: "QuantEdge" },
  { id: "3", title: "Full Stack Developer", location: "Austin, TX", salary: "$130,000", salaryNum: 130000, description: "Develop scalable web applications using React, Node.js, and cloud infrastructure.", company: "CloudStack" },
  { id: "4", title: "ML Operations Engineer", location: "Seattle, WA", salary: "$155,000", salaryNum: 155000, description: "Design and manage ML pipelines, model deployment, and monitoring systems.", company: "DataFlow" },
  { id: "5", title: "Product Manager", location: "Chicago, IL", salary: "$140,000", salaryNum: 140000, description: "Lead product strategy for AI-powered analytics platform.", company: "InsightAI" },
  { id: "6", title: "UX Designer", location: "San Francisco, CA", salary: "$125,000", salaryNum: 125000, description: "Design intuitive interfaces for complex AI tools and dashboards.", company: "DesignLab" },
  { id: "7", title: "Backend Engineer", location: "Austin, TX", salary: "$142,000", salaryNum: 142000, description: "Build high-performance APIs and microservices with Go and PostgreSQL.", company: "ScaleCore" },
  { id: "8", title: "DevOps Engineer", location: "Seattle, WA", salary: "$148,000", salaryNum: 148000, description: "Manage cloud infrastructure, CI/CD pipelines, and Kubernetes clusters.", company: "InfraOps" },
  { id: "9", title: "Cybersecurity Analyst", location: "New York, NY", salary: "$135,000", salaryNum: 135000, description: "Monitor threats, conduct penetration testing, and strengthen security posture.", company: "CyberShield" },
  { id: "10", title: "Cloud Architect", location: "San Francisco, CA", salary: "$175,000", salaryNum: 175000, description: "Design multi-cloud architectures for enterprise-scale applications.", company: "CloudPeak" },
  { id: "11", title: "Mobile Developer", location: "Austin, TX", salary: "$128,000", salaryNum: 128000, description: "Build cross-platform mobile apps with React Native and Flutter.", company: "AppForge" },
  { id: "12", title: "Technical Writer", location: "Remote", salary: "$95,000", salaryNum: 95000, description: "Create documentation for APIs, SDKs, and developer tools.", company: "DocuTech" },
  { id: "13", title: "Blockchain Developer", location: "New York, NY", salary: "$160,000", salaryNum: 160000, description: "Build decentralized applications and smart contracts on Ethereum.", company: "ChainLabs" },
  { id: "14", title: "QA Engineer", location: "Chicago, IL", salary: "$110,000", salaryNum: 110000, description: "Develop automated testing frameworks for web and mobile applications.", company: "TestPilot" },
  { id: "15", title: "Data Engineer", location: "Seattle, WA", salary: "$150,000", salaryNum: 150000, description: "Build ETL pipelines and data warehouses for real-time analytics.", company: "PipelineIO" },
  { id: "16", title: "AI Research Scientist", location: "San Francisco, CA", salary: "$190,000", salaryNum: 190000, description: "Conduct cutting-edge research in natural language processing and computer vision.", company: "DeepMind Labs" },
  { id: "17", title: "Solutions Architect", location: "Chicago, IL", salary: "$155,000", salaryNum: 155000, description: "Design and implement technical solutions for enterprise clients.", company: "SolveTech" },
  { id: "18", title: "Frontend Developer", location: "Remote", salary: "$120,000", salaryNum: 120000, description: "Build responsive, accessible web interfaces with React and TypeScript.", company: "PixelCraft" },
  { id: "19", title: "Systems Engineer", location: "Austin, TX", salary: "$138,000", salaryNum: 138000, description: "Design and maintain large-scale distributed systems and databases.", company: "SysCore" },
  { id: "20", title: "Growth Marketer", location: "New York, NY", salary: "$115,000", salaryNum: 115000, description: "Drive user acquisition and retention with data-driven marketing strategies.", company: "GrowthEngine" },
  { id: "21", title: "Computer Vision Engineer", location: "Seattle, WA", salary: "$170,000", salaryNum: 170000, description: "Develop image recognition and video analysis algorithms.", company: "VisionAI" },
  { id: "22", title: "Platform Engineer", location: "San Francisco, CA", salary: "$158,000", salaryNum: 158000, description: "Build internal developer platforms and tooling for engineering teams.", company: "PlatformX" },
];

export const scannerJobsYoung: Job[] = [
  { id: "s1", title: "AI Research Intern", location: "San Francisco, CA", salary: "$45/hr", salaryNum: 93600, description: "Assist in NLP research and model fine-tuning.", company: "NeuralForge", applyUrl: "https://linkedin.com" },
  { id: "s2", title: "Data Analytics Intern", location: "New York, NY", salary: "$40/hr", salaryNum: 83200, description: "Support data analysis for business intelligence projects.", company: "QuantEdge", applyUrl: "https://linkedin.com" },
  { id: "s3", title: "Software Engineering Intern", location: "Austin, TX", salary: "$42/hr", salaryNum: 87360, description: "Build features for cloud-based developer tools.", company: "CloudStack", applyUrl: "https://linkedin.com" },
];

export const scannerJobsSenior: Job[] = [
  { id: "s4", title: "Senior AI Engineer", location: "San Francisco, CA", salary: "$195,000", salaryNum: 195000, description: "Lead AI infrastructure and model deployment at scale.", company: "NeuralForge", applyUrl: "https://linkedin.com" },
  { id: "s5", title: "Lead Data Scientist", location: "Seattle, WA", salary: "$180,000", salaryNum: 180000, description: "Drive data science strategy and mentor junior team members.", company: "DataFlow", applyUrl: "https://linkedin.com" },
  { id: "s6", title: "Principal Engineer", location: "New York, NY", salary: "$210,000", salaryNum: 210000, description: "Architect and lead development of enterprise-scale platforms.", company: "CloudPeak", applyUrl: "https://linkedin.com" },
];

export const podcastEpisodes = [
  { id: "p1", title: "The Future of AI in Hiring", description: "Exploring how artificial intelligence is transforming recruitment, from resume screening to interview analysis.", duration: "32 min" },
  { id: "p2", title: "Building a Career in Tech 2026", description: "Industry experts discuss emerging roles, essential skills, and the evolving tech landscape.", duration: "28 min" },
  { id: "p3", title: "From Intern to CTO", description: "Inspiring stories of tech leaders who climbed from entry-level positions to executive roles.", duration: "45 min" },
];
