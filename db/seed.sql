-- Seed data for vincent-mugondora-db
-- Run with: npx wrangler d1 execute vincent-mugondora-db --remote --file=db/seed.sql

-- Work History
INSERT INTO work_history (title, company, location, start_date, end_date, description, is_current, "order") VALUES
('Software Developer & AI Builder', 'Zimnovate', 'Harare, Zimbabwe', '2024-01', NULL, 'Building technology products for Zimbabwe and Africa. AI-powered solutions, automation systems, and digital products.', 1, 1),
('Software Development Educator', 'Independent', 'Harare, Zimbabwe', '2024-01', NULL, 'Teaching software development to young developers in Zimbabwe. Creating educational content and mentoring students.', 1, 2);

-- Education
INSERT INTO education (title, institution, description, category, "order") VALUES
('Software Engineering', 'Self-Taught & Online Resources', 'Full-stack development, backend systems, databases, architecture, and AI/ML.', 'engineering', 1),
('AI & Machine Learning', 'Self-Taught & Online Resources', 'Large language models, AI agents, RAG systems, automation, and multi-agent architectures.', 'ai', 2);

-- Projects
INSERT INTO projects (title, slug, description, problem, role, category, technologies, image, image_alt, featured, status, published_at) VALUES
('AI Opportunity Intelligence', 'ai-opportunity-intelligence', 'A platform designed to identify emerging business and technology opportunities from information and real-world signals.', 'Entrepreneurs and investors miss emerging opportunities because signal is buried in noise - scattered across news, social media, government data, and market reports.', 'Founder / Engineer', 'AI / Product', '["Python", "FastAPI", "PostgreSQL", "AI"]', 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&h=525&fit=crop&auto=format&q=75', 'AI neural network visualization representing intelligent opportunity discovery', 1, 'active', '2024-11-15'),
('School Management Platform', 'school-management-platform', 'A role-based platform for managing students, teachers, parents, classes and academic operations.', 'Schools in Zimbabwe need digital tools for managing operations but existing solutions are expensive and not built for local context.', 'Full-Stack Engineer', 'SaaS / Education', '["Next.js", "TypeScript", "PostgreSQL", "Prisma"]', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&h=525&fit=crop&auto=format&q=75', 'School classroom environment representing education management software', 1, 'completed', '2024-09-01'),
('AI WhatsApp Assistant', 'ai-whatsapp-assistant', 'Making useful AI accessible through a communication platform people already use.', 'Most AI tools require users to visit a website or download an app. In Zimbabwe and much of Africa, WhatsApp is where people already communicate.', 'Engineer', 'AI / Automation', '["Python", "FastAPI", "WhatsApp API", "AI"]', 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=700&h=525&fit=crop&auto=format&q=75', 'Mobile phone with messaging app representing WhatsApp AI integration', 1, 'active', '2025-01-10');

-- Experiments
INSERT INTO experiments (title, slug, description, content, problem, hypothesis, technologies, status, published_at) VALUES
('AI Opportunity Intelligence', 'ai-opportunity-intelligence', 'An experimental system exploring how AI can identify emerging business opportunities from news, market signals and local problems.', 'Exploring whether artificial intelligence can reliably identify emerging business and technology opportunities before they become obvious.', 'Entrepreneurs and investors miss emerging opportunities because signal is buried in noise - scattered across news, social media, government data, and market reports. Manually tracking all of this is impossible.', 'An AI system can ingest diverse information sources, identify patterns humans miss, and surface actionable opportunity signals ranked by relevance, timing, and market potential.', '["Python", "FastAPI", "LLM", "PostgreSQL", "RAG"]', 'active', '2024-11-15'),
('AI Engineering Copilot', 'ai-engineering-copilot', 'Exploring whether AI can help workers without traditional engineering degrees solve practical engineering problems.', 'A domain-specific AI assistant trained on engineering knowledge and guided by structured reasoning to help non-engineers solve practical problems.', 'Workers in fields like construction, manufacturing, and maintenance face engineering problems daily but lack access to engineering expertise. Hiring consultants is expensive and slow.', 'A domain-specific AI assistant - trained on engineering knowledge and guided by structured reasoning - can help non-engineers solve practical problems safely and correctly.', '["Python", "LLM", "RAG", "FastAPI"]', 'active', '2024-12-01'),
('WhatsApp AI Assistant', 'whatsapp-ai-assistant', 'Exploring how AI-powered services can be delivered through WhatsApp rather than requiring users to learn a new application.', 'Exploring what happens when you deliver AI capabilities through the communication platform people already use every day.', 'Most AI tools require users to visit a website or download an app. In Zimbabwe and much of Africa, WhatsApp is where people already communicate - making AI accessible means meeting people where they already are.', 'AI services delivered through WhatsApp will have higher adoption and engagement than equivalent web or app-based tools, because they eliminate the friction of learning a new interface.', '["Python", "WhatsApp API", "LLM", "Node.js", "FastAPI"]', 'active', '2025-01-10');

-- Services
INSERT INTO services (title, slug, description, technologies, icon, "order") VALUES
('Software Development', 'software-development', 'Custom software solutions built with modern technologies. Full-stack web applications, APIs, and systems designed to solve real business problems.', '["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL"]', 'code', 1),
('Web Development', 'web-development', 'Fast, accessible, and SEO-optimized websites and web applications. From marketing sites to complex web platforms.', '["Astro", "React", "Tailwind CSS", "TypeScript", "Cloudflare"]', 'globe', 2),
('AI Solutions', 'ai-solutions', 'AI-powered tools and systems for businesses. Chatbots, automation, document processing, and intelligent workflows.', '["Python", "LLMs", "RAG", "FastAPI", "AI Agents"]', 'brain', 3),
('AI Automation', 'ai-automation', 'Automate repetitive business processes with AI. From customer support to data processing, reduce manual work and increase efficiency.', '["Python", "AI Agents", "WhatsApp API", "Automation", "LLMs"]', 'zap', 4);

-- Now Entries
INSERT INTO now_entries (category, title, description, status, "order") VALUES
('building', 'vincentmugondora.com', 'This portfolio - building my personal brand and digital presence.', 'active', 1),
('building', 'Zimnovate Projects', 'Building technology products for Zimbabwe and Africa.', 'active', 2),
('learning', 'Advanced AI Agent Architectures', 'Multi-agent systems, tool use, and autonomous reasoning.', 'active', 1),
('learning', 'Edge Computing', 'Cloudflare Workers, edge functions, and distributed systems.', 'active', 2),
('focus', 'AI Products', 'AI-powered products for African businesses.', 'active', 1),
('focus', 'Teaching', 'Software development to the next generation.', 'active', 2),
('focus', 'Exploring', 'Technology opportunities in Zimbabwe.', 'active', 3);

-- Site Config
INSERT INTO site_config (key, value) VALUES
('site_name', 'Vincent Mugondora'),
('site_description', 'Software Developer, AI Builder & Educator from Zimbabwe'),
('site_url', 'https://vincentmugondora.com'),
('location', 'Harare, Zimbabwe'),
('timezone', 'GMT+2'),
('available_for_work', 'true'),
('now_page_updated', '2026-08-24');
