import logging
from backend.database import get_db

logger = logging.getLogger("nexora_seed")

PERSONA_PRESETS = [
    {
        "id": "persona-aarav",
        "name": "Aarav Sharma",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "college": "St. Stephen's College, Delhi University",
        "degree": "B.A. (Hons) Economics & Public Policy",
        "year": "3rd Year (Final Year)",
        "academicGpa": "8.8 / 10",
        "bio": "Passionate about economic policy, developmental economics, and public administration. Aiming to bridge quantitative data with governance.",
        "availableHours": 10,
        "preferredLocation": "Delhi NCR / Remote",
        "remoteOnly": False,
        "timeline": "Next 6-12 Months (Graduation 2027)",
        "skills": [
            {"name": "Policy Analysis", "level": "Advanced", "score": 90},
            {"name": "Economic Research", "level": "Advanced", "score": 88},
            {"name": "Excel & Data Modeling", "level": "Intermediate", "score": 78},
            {"name": "Academic Writing", "level": "Advanced", "score": 92},
            {"name": "Stata / Econometrics", "level": "Beginner", "score": 45},
            {"name": "Public Speaking", "level": "Intermediate", "score": 75}
        ],
        "experience": [
            {
                "title": "Research Intern",
                "organization": "NITI Aayog (DMEO)",
                "period": "May 2025 - Jul 2025",
                "type": "Internship",
                "description": "Assisted in state-level health index policy briefs and cross-sectional data synthesis."
            },
            {
                "title": "President, Economics Society",
                "organization": "St. Stephen's College",
                "period": "Aug 2024 - Present",
                "type": "Leadership",
                "description": "Organized annual policy summit hosting 40+ colleges and published the bi-annual journal."
            }
        ],
        "targetCareers": ["policy-analyst", "rbi-grade-b", "upsc-civil-services"],
        "preferences": {
            "income": 75,
            "stability": 85,
            "impact": 95,
            "flexibility": 60,
            "learning": 90,
            "entrepreneurship": 40,
            "workLifeBalance": 70
        },
        "financialGoals": {
            "enabled": True,
            "monthlyIncome": 12000,
            "monthlyExpenses": 7000,
            "monthlySavings": 5000,
            "primaryGoal": {
                "title": "Higher Education / Master's Prep Fund",
                "targetAmount": 150000,
                "currentAmount": 42000,
                "monthlyContribution": 4000,
                "targetDate": "2027-06-30"
            },
            "emergencyFund": {
                "targetAmount": 30000,
                "currentAmount": 18000
            }
        }
    },
    {
        "id": "persona-priya",
        "name": "Priya Patel",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
        "college": "BITS Pilani",
        "degree": "B.Tech Computer Science & Artificial Intelligence",
        "year": "4th Year",
        "academicGpa": "9.2 / 10",
        "bio": "Deep learning enthusiast working on LLM reasoning and multimodal neural networks. Looking for high-impact AI research labs & venture-backed tech startups.",
        "availableHours": 15,
        "preferredLocation": "Bengaluru / Hyderabad / Remote",
        "remoteOnly": False,
        "timeline": "Immediate (Graduation 2026)",
        "skills": [
            {"name": "Python", "level": "Advanced", "score": 95},
            {"name": "PyTorch & Deep Learning", "level": "Advanced", "score": 90},
            {"name": "LLM Fine-tuning & RAG", "level": "Intermediate", "score": 80},
            {"name": "React & TypeScript", "level": "Intermediate", "score": 72},
            {"name": "Data Structures & Algorithms", "level": "Advanced", "score": 88},
            {"name": "Distributed Systems", "level": "Beginner", "score": 50}
        ],
        "experience": [
            {
                "title": "AI Research Fellow",
                "organization": "Indian Institute of Science (IISc)",
                "period": "Jan 2025 - Jun 2025",
                "type": "Research",
                "description": "Co-authored a paper on lightweight transformer pruning accepted at NeurIPS workshop."
            },
            {
                "title": "Backend Engineering Intern",
                "organization": "Postman",
                "period": "May 2024 - Jul 2024",
                "type": "Internship",
                "description": "Built telemetry pipelines processing 200M+ API requests per day."
            }
        ],
        "targetCareers": ["ai-research-scientist", "product-management"],
        "preferences": {
            "income": 90,
            "stability": 60,
            "impact": 90,
            "flexibility": 85,
            "learning": 95,
            "entrepreneurship": 80,
            "workLifeBalance": 65
        },
        "financialGoals": {
            "enabled": True,
            "monthlyIncome": 35000,
            "monthlyExpenses": 15000,
            "monthlySavings": 20000,
            "primaryGoal": {
                "title": "Seed Capital & Tech Equipment Fund",
                "targetAmount": 300000,
                "currentAmount": 110000,
                "monthlyContribution": 15000,
                "targetDate": "2026-12-31"
            },
            "emergencyFund": {
                "targetAmount": 60000,
                "currentAmount": 45000
            }
        }
    },
    {
        "id": "persona-rohan",
        "name": "Rohan Mehta",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        "college": "Shri Ram College of Commerce (SRCC)",
        "degree": "B.Com (Hons) & Financial Markets",
        "year": "2nd Year",
        "academicGpa": "8.5 / 10",
        "bio": "Focusing on corporate valuation, venture capital deal flow, and quantitative finance. Preparing for CFA Level 1.",
        "availableHours": 8,
        "preferredLocation": "Mumbai / Bengaluru / Remote",
        "remoteOnly": False,
        "timeline": "Next 12-18 Months",
        "skills": [
            {"name": "Financial Modeling", "level": "Advanced", "score": 85},
            {"name": "Valuation & DCF", "level": "Intermediate", "score": 75},
            {"name": "Excel & VBA", "level": "Advanced", "score": 90},
            {"name": "Accounting & IFRS", "level": "Intermediate", "score": 80},
            {"name": "SQL & Data Extraction", "level": "Beginner", "score": 40},
            {"name": "Pitch Deck Creation", "level": "Intermediate", "score": 70}
        ],
        "experience": [
            {
                "title": "Junior Equity Research Analyst",
                "organization": "College Investment Fund",
                "period": "Oct 2024 - Present",
                "type": "Leadership",
                "description": "Covering Indian Banking and IT sectors; managed virtual ₹10L portfolio."
            }
        ],
        "targetCareers": ["investment-banking", "product-management", "rbi-grade-b"],
        "preferences": {
            "income": 95,
            "stability": 75,
            "impact": 70,
            "flexibility": 50,
            "learning": 85,
            "entrepreneurship": 70,
            "workLifeBalance": 45
        },
        "financialGoals": {
            "enabled": True,
            "monthlyIncome": 8000,
            "monthlyExpenses": 4500,
            "monthlySavings": 3500,
            "primaryGoal": {
                "title": "CFA Level 1 Exam & Prep Registration",
                "targetAmount": 110000,
                "currentAmount": 35000,
                "monthlyContribution": 3000,
                "targetDate": "2026-11-30"
            },
            "emergencyFund": {
                "targetAmount": 25000,
                "currentAmount": 12000
            }
        }
    }
]

CAREER_PATHS = [
    {
        "id": "policy-analyst",
        "title": "Policy Analyst & Think Tank Consultant",
        "category": "Public Policy & Governance",
        "icon": "landmark",
        "tagline": "Shape public legislation, socio-economic reforms, and developmental policies.",
        "fitScore": 94,
        "eligibility": "Bachelor's / Master's in Economics, Law, Public Policy, Political Science, or Quantitative discipline.",
        "skillsRequired": ["Policy Analysis", "Economic Research", "Data Interpretation", "Academic Writing", "Stakeholder Engagement"],
        "prepEffort": "400 - 600 Hours (Research papers, policy briefs & case studies)",
        "timeline": "6 - 12 Months",
        "startingSalary": "₹7.5L - ₹14.0L / yr",
        "careerCeiling": "Partner / Senior Fellow / Chief Policy Officer (₹35L - ₹75L+ / yr)",
        "cost": "Low (Self-learning, open research papers, fellowship stipends)",
        "opportunityCost": "Low to Medium",
        "stability": 4,
        "flexibility": 4,
        "trajectory": "Research Associate → Policy Analyst → Senior Consultant → Director of Research / IAS Policy Advisor.",
        "whyAligned": "Matches deep academic writing and economic research background. Allows rapid publication of high-impact briefs.",
        "skillGap": ["Stata / Advanced Econometrics", "Public Briefing Delivery"],
        "recommendedExperiments": [
            {
                "title": "Draft a 1,200-word Policy Memo",
                "description": "Analyze state budget allocation for EV infrastructure and submit to an open youth policy journal.",
                "timeNeeded": "4 Hours",
                "impact": "High portfolio proof"
            },
            {
                "title": "Review 3 CPR Policy Working Papers",
                "description": "Extract methodology sections and identify recurring empirical econometric models used.",
                "timeNeeded": "2 Hours",
                "impact": "Domain mastery"
            }
        ]
    },
    {
        "id": "rbi-grade-b",
        "title": "Reserve Bank of India (RBI) Grade B Officer",
        "category": "Central Banking & Financial Governance",
        "icon": "badge-cent",
        "tagline": "Manage India's monetary policy, banking regulation, and currency operations.",
        "fitScore": 89,
        "eligibility": "Graduation with minimum 60% marks (50% for SC/ST/PwBD). Age 21-30.",
        "skillsRequired": ["Economic & Social Issues", "Finance & Management", "Quantitative Aptitude", "Reasoning & English", "Monetary Economics"],
        "prepEffort": "800 - 1,200 Hours dedicated competitive preparation",
        "timeline": "10 - 18 Months",
        "startingSalary": "₹18.0L - ₹24.0L CTC (including perks, housing in prime metros)",
        "careerCeiling": "Executive Director / Deputy Governor (High administrative prestige)",
        "cost": "Low to Moderate (Standard books, mock test series ₹5K - ₹15K)",
        "opportunityCost": "Medium (Requires strict exam focus, but high syllabus overlap with NABARD/SEBI)",
        "stability": 5,
        "flexibility": 3,
        "trajectory": "Assistant Manager (Grade B) → Manager (Grade C) → Assistant General Manager (Grade D) → General Manager → Chief General Manager → Executive Director.",
        "whyAligned": "Strong synergy with economics curriculum. Offers unmatched job stability, prestigious public impact, and competitive pay.",
        "skillGap": ["Financial Management Principles", "Timed Speed Arithmetic & Reasoning"],
        "recommendedExperiments": [
            {
                "title": "Solve RBI Grade B Phase 2 2024 ESI Paper",
                "description": "Attempt the descriptive questions under a 90-minute timed timer to gauge answer structure.",
                "timeNeeded": "2.5 Hours",
                "impact": "Reality check on syllabus fit"
            },
            {
                "title": "Read RBI Annual Monetary Policy Report",
                "description": "Summarize the MPC's inflation projections and liquidity management framework.",
                "timeNeeded": "3 Hours",
                "impact": "Direct interview & phase 2 value"
            }
        ]
    },
    {
        "id": "upsc-civil-services",
        "title": "UPSC Civil Services (IAS / IFS / IPS / IRS)",
        "category": "Civil Administration & Diplomacy",
        "icon": "shield",
        "tagline": "Lead district administration, foreign diplomacy, national security, or revenue policy.",
        "fitScore": 82,
        "eligibility": "Bachelor's degree in any discipline from a recognized university. Age 21-32.",
        "skillsRequired": ["Broad General Studies", "Essay & Analytical Writing", "Optional Subject Mastery (Economics/PolSci)", "Ethics & Decision Making", "Crisis Management"],
        "prepEffort": "2,000 - 3,500 Hours over 1.5 - 3 years",
        "timeline": "18 - 36 Months",
        "startingSalary": "₹12.0L - ₹16.0L + Official Bungalow, Security, Medical & Transport",
        "careerCeiling": "Cabinet Secretary / Foreign Secretary / Chief Secretary (Pinnacle of executive power)",
        "cost": "Moderate (₹25K - ₹1.5L for coaching/test series, though open materials abound)",
        "opportunityCost": "Very High (Success rate < 0.2%, multi-year commitment with high variance)",
        "stability": 5,
        "flexibility": 1,
        "trajectory": "SDM / Under Secretary → District Magistrate / Deputy Secretary → Joint Secretary → Additional Secretary → Secretary to Government of India.",
        "whyAligned": "Matches public impact ambition and strong writing ability.",
        "skillGap": ["Ancient/Medieval History & Geography Breadth", "High-Speed Answer Writing Discipline"],
        "recommendedExperiments": [
            {
                "title": "Write 1 GS-2 Governance Answer (150 words)",
                "description": "Answer a previous year question on federalism and evaluate against the official marking criteria.",
                "timeNeeded": "1 Hour",
                "impact": "Assess daily writing stamina"
            }
        ]
    },
    {
        "id": "ai-research-scientist",
        "title": "AI / ML Research Scientist",
        "category": "Technology & Frontier AI",
        "icon": "brain-circuit",
        "tagline": "Invent new neural architectures, LLM reasoning algorithms, and generative AI systems.",
        "fitScore": 92,
        "eligibility": "B.Tech/M.S./Ph.D. in Computer Science, Mathematics, Physics or related fields with strong mathematical foundation.",
        "skillsRequired": ["PyTorch / JAX", "Linear Algebra & Calculus", "Distributed Training", "Paper Implementation", "Transformer Architectures"],
        "prepEffort": "1,000 - 1,800 Hours (Code implementations, open-source models, paper reproductions)",
        "timeline": "12 - 24 Months",
        "startingSalary": "₹18.0L - ₹45.0L+ / yr (Domestic) | $150K+ (Global)",
        "careerCeiling": "Distinguished Scientist / VP of AI / AI Startup Founder ($300K - $1M+)",
        "cost": "Low to Moderate (GPU compute credits ₹5K - ₹20K, open-source literature)",
        "opportunityCost": "Low (High demand for AI talent globally)",
        "stability": 3,
        "flexibility": 5,
        "trajectory": "Research Fellow → Applied Scientist → Research Scientist → Staff AI Scientist → VP of AI Research.",
        "whyAligned": "Explosive industry growth, massive global liquidity, and allows immediate translation of code into scientific breakthroughs.",
        "skillGap": ["CUDA Kernel Optimization", "Distributed Gradient Synchronization"],
        "recommendedExperiments": [
            {
                "title": "Re-implement Attention Layer from Scratch in PyTorch",
                "description": "Write multi-head self-attention with tensor operations without using torch.nn.MultiheadAttention.",
                "timeNeeded": "3 Hours",
                "impact": "Core fundamentals mastery"
            }
        ]
    },
    {
        "id": "product-management",
        "title": "Product Manager (Associate PM → Group PM)",
        "category": "Technology & Business Strategy",
        "icon": "layers",
        "tagline": "Define the product vision, roadmap, and user experience at the intersection of business, tech, and UX.",
        "fitScore": 86,
        "eligibility": "Any undergraduate degree. Strong analytical, communication, and technical empathy required.",
        "skillsRequired": ["Product Strategy", "User Research & PRDs", "Data Analytics (SQL/Mixpanel)", "A/B Testing", "Cross-functional Leadership"],
        "prepEffort": "300 - 500 Hours (Product teardowns, mock interviews, side projects)",
        "timeline": "4 - 8 Months",
        "startingSalary": "₹14.0L - ₹28.0L / yr",
        "careerCeiling": "Chief Product Officer (CPO) / Founder (₹50L - ₹1.5Cr+)",
        "cost": "Low (Case studies, teardowns, books like Inspired & Cracking the PM Interview)",
        "opportunityCost": "Low",
        "stability": 3,
        "flexibility": 4,
        "trajectory": "APM → Product Manager → Senior PM → Lead PM → Director of Product → Chief Product Officer.",
        "whyAligned": "Balances analytical problem solving, user psychology, and commercial execution.",
        "skillGap": ["SQL Query Writing", "System Architecture & API concepts"],
        "recommendedExperiments": [
            {
                "title": "Conduct a 1-Page Product Teardown",
                "description": "Analyze a friction point in Spotify or Zepto and write a PRD propose feature specs.",
                "timeNeeded": "2 Hours",
                "impact": "Portfolio artifact"
            }
        ]
    },
    {
        "id": "investment-banking",
        "title": "Investment Banking / FinTech Analyst",
        "category": "Finance & Deal Advisory",
        "icon": "trending-up",
        "tagline": "Advise on high-stakes M&A transactions, capital raises, and tech-driven financial structures.",
        "fitScore": 88,
        "eligibility": "Commerce, Finance, Economics, or Engineering degrees with strong numerical modeling skills.",
        "skillsRequired": ["Financial Modeling (DCF/LBO)", "Company Valuation", "M&A Analysis", "Pitch Deck Design", "Capital Markets Regulations"],
        "prepEffort": "500 - 800 Hours (Financial modeling bootcamps, CFA Level 1)",
        "timeline": "6 - 12 Months",
        "startingSalary": "₹15.0L - ₹32.0L / yr + performance bonus (30-100%)",
        "careerCeiling": "Managing Director / Partner / Private Equity Fund Manager (₹1Cr - ₹5Cr+)",
        "cost": "Moderate (CFA registration ₹1L, modeling courses ₹10K)",
        "opportunityCost": "Medium (Demanding 70-80 hr work weeks during peak deals)",
        "stability": 3,
        "flexibility": 2,
        "trajectory": "Analyst → Associate → VP → Director → Managing Director.",
        "whyAligned": "High financial compensation, accelerated business acumen, and strong pedigree for venture capital.",
        "skillGap": ["LBO Modeling Speed", "Bloomberg Terminal Navigation"],
        "recommendedExperiments": [
            {
                "title": "Build a 3-Statement Financial Model",
                "description": "Link Income Statement, Balance Sheet, and Cash Flow for a listed Indian retail company in Excel.",
                "timeNeeded": "4 Hours",
                "impact": "Proof of technical capability"
            }
        ]
    }
]

PRIMARY_OPPORTUNITIES = [
    {
        "id": "opp-001",
        "title": "Policy Research Fellowship (Development Economics)",
        "organization": "Centre for Policy Research (CPR)",
        "category": "Internships",
        "type": "Internship",
        "matchScore": 94,
        "deadline": "2026-08-28",
        "daysLeft": 4,
        "location": "New Delhi (Hybrid)",
        "isRemote": True,
        "stipend": "₹35,000 / month",
        "verifiedSource": True,
        "sourceUrl": "https://cprindia.org/careers",
        "tags": ["Economics", "Public Policy", "Research", "Priority Match"],
        "targetCareerIds": ["policy-analyst", "upsc-civil-services", "rbi-grade-b"],
        "eligibility": "Enrolled in 3rd/4th year UG or PG in Economics, Public Policy, or Statistics with min 65% aggregate.",
        "description": "Work alongside senior fellows on empirical analysis of agricultural credit subsidies and rural livelihood welfare outcomes. You will clean household survey datasets and draft policy briefs for ministry review.",
        "requiredSkills": ["Policy Analysis", "Economic Research", "Excel & Data Modeling", "Academic Writing"],
        "documentsRequired": ["Updated Resume (PDF)", "Statement of Purpose (500 words)", "Recent Writing Sample on Economic Policy"],
        "estimatedTimeMinutes": 25,
        "whyRecommended": "This opportunity directly aligns with your policy analyst goal and closes your current practical empirical research gap.",
        "expectedValue": "Publication credit in a CPR Working Paper, direct mentorship from ex-Chief Economic Advisor researchers, and strong recommendation letters for Master's programs.",
        "skillMatchPercent": 92,
        "careerAlignmentPercent": 96,
        "eligibilityPercent": 100,
        "timeFeasibilityPercent": 90,
        "opportunityQualityPercent": 98
    },
    {
        "id": "opp-002",
        "title": "RBI Young Professional (Monetary Policy & Data Analysis)",
        "organization": "Reserve Bank of India (RBI)",
        "category": "Government Programs",
        "type": "Government Program",
        "matchScore": 91,
        "deadline": "2026-09-05",
        "daysLeft": 18,
        "location": "Mumbai (On-site)",
        "isRemote": False,
        "stipend": "₹60,000 / month",
        "verifiedSource": True,
        "sourceUrl": "https://opportunities.rbi.org.in",
        "tags": ["Central Banking", "Monetary Economics", "Government", "Finance"],
        "targetCareerIds": ["rbi-grade-b", "policy-analyst", "investment-banking"],
        "eligibility": "Post-graduate degree or 4-year integrated degree in Economics, Econometrics, Quantitative Finance, or MBA Finance.",
        "description": "Assist the Monetary Policy Department in high-frequency financial indicators tracking, inflation modeling, and inter-bank liquidity flow assessments.",
        "requiredSkills": ["Economic Research", "Excel & Data Modeling", "Stata / Econometrics", "Academic Writing"],
        "documentsRequired": ["Resume", "Transcripts", "Letter of Recommendation", "NOC from University"],
        "estimatedTimeMinutes": 40,
        "whyRecommended": "Unrivalled institutional prestige directly relevant to your RBI Grade B ambitions and macro-finance interest.",
        "expectedValue": "Official RBI certificate of completion, immersive understanding of central banking mechanics, and direct exposure to MPC working papers.",
        "skillMatchPercent": 88,
        "careerAlignmentPercent": 95,
        "eligibilityPercent": 90,
        "timeFeasibilityPercent": 85,
        "opportunityQualityPercent": 100
    },
    {
        "id": "opp-003",
        "title": "NITI Aayog Internship Scheme (Governance & Policy)",
        "organization": "NITI Aayog (Govt. of India)",
        "category": "Government Programs",
        "type": "Internship",
        "matchScore": 89,
        "deadline": "2026-09-10",
        "daysLeft": 23,
        "location": "New Delhi",
        "isRemote": False,
        "stipend": "Unpaid / Official Gov Certificate",
        "verifiedSource": True,
        "sourceUrl": "https://niti.gov.in/internship",
        "tags": ["Governance", "NITI Aayog", "Public Policy", "Government"],
        "targetCareerIds": ["policy-analyst", "upsc-civil-services"],
        "eligibility": "UG/PG students studying in recognized universities with min 85% in Class 12 or 75% in UG.",
        "description": "Support vertical divisions (Education, Health, Aspirational Districts, Circular Economy) in monitoring state-level KPI progress and policy frameworks.",
        "requiredSkills": ["Policy Analysis", "Academic Writing", "Excel & Data Modeling"],
        "documentsRequired": ["College Endorsement Form", "Resume", "ID Proof"],
        "estimatedTimeMinutes": 20,
        "whyRecommended": "Prime government exposure, networking with IAS officers and national policy advisors.",
        "expectedValue": "Official NITI Aayog experience credential, direct understanding of national state schemes.",
        "skillMatchPercent": 90,
        "careerAlignmentPercent": 92,
        "eligibilityPercent": 95,
        "timeFeasibilityPercent": 88,
        "opportunityQualityPercent": 94
    },
    {
        "id": "opp-004",
        "title": "Reliance Foundation Undergraduate & PG Scholarship",
        "organization": "Reliance Foundation",
        "category": "Scholarships",
        "type": "Scholarship",
        "matchScore": 88,
        "deadline": "2026-09-15",
        "daysLeft": 28,
        "location": "Pan-India",
        "isRemote": True,
        "stipend": "Up to ₹2,00,000 grant",
        "verifiedSource": True,
        "sourceUrl": "https://scholarships.reliancefoundation.org",
        "tags": ["Grant", "Merit-cum-Means", "Higher Education", "Financial Support"],
        "targetCareerIds": ["policy-analyst", "rbi-grade-b", "ai-research-scientist", "investment-banking"],
        "eligibility": "Resident Indian citizen enrolled in 1st/2nd/3rd year full-time UG/PG degree. Family income < ₹15 Lakhs/yr.",
        "description": "Merit-cum-means scholarship supporting ambitious students across STEM, Economics, Commerce, and Humanities with financial grants and leadership development programs.",
        "requiredSkills": ["Academic Writing", "Public Speaking"],
        "documentsRequired": ["Income Certificate", "Marksheets 10th/12th/College", "College ID", "Bank Account Details"],
        "estimatedTimeMinutes": 35,
        "whyRecommended": "Directly solves your Higher Education savings milestone by covering up to ₹2,00,000 in tuition and prep fees.",
        "expectedValue": "Non-repayable direct financial grant + access to Reliance Foundation alumni network and mentorship summits.",
        "skillMatchPercent": 85,
        "careerAlignmentPercent": 88,
        "eligibilityPercent": 100,
        "timeFeasibilityPercent": 92,
        "opportunityQualityPercent": 96
    },
    {
        "id": "opp-005",
        "title": "Google AI Research Mentorship Program",
        "organization": "Google Research India",
        "category": "Research",
        "type": "Research Mentorship",
        "matchScore": 93,
        "deadline": "2026-09-01",
        "daysLeft": 14,
        "location": "Bengaluru (Hybrid / Remote)",
        "isRemote": True,
        "stipend": "₹50,000 / month + Compute Credits",
        "verifiedSource": True,
        "sourceUrl": "https://research.google/locations/india",
        "tags": ["AI", "Machine Learning", "PyTorch", "Research"],
        "targetCareerIds": ["ai-research-scientist", "product-management"],
        "eligibility": "Final year UG or MS/PhD students with demonstrable deep learning background and open GitHub repositories.",
        "description": "Pair with Google Research scientists on novel neural networks, multilingual NLP models for Indic languages, or responsible AI frameworks.",
        "requiredSkills": ["Python", "PyTorch & Deep Learning", "Data Structures & Algorithms"],
        "documentsRequired": ["GitHub Profile", "Resume", "Research Statement (1 Page)", "Coding Samples"],
        "estimatedTimeMinutes": 30,
        "whyRecommended": "Premier tier-1 research environment, unlocks fast-track interviews for full-time Research Scientist roles.",
        "expectedValue": "Co-authorship potential at ACL / EMNLP / CVPR conferences and direct letter of recommendation from Google Research Directors.",
        "skillMatchPercent": 94,
        "careerAlignmentPercent": 98,
        "eligibilityPercent": 95,
        "timeFeasibilityPercent": 90,
        "opportunityQualityPercent": 100
    },
    {
        "id": "opp-006",
        "title": "Goldman Sachs Global Investment Research Internship",
        "organization": "Goldman Sachs",
        "category": "Internships",
        "type": "Internship",
        "matchScore": 90,
        "deadline": "2026-09-20",
        "daysLeft": 33,
        "location": "Bengaluru / Mumbai",
        "isRemote": False,
        "stipend": "₹1,00,000 / month",
        "verifiedSource": True,
        "sourceUrl": "https://www.goldmansachs.com/careers",
        "tags": ["Investment Banking", "Equity Research", "Financial Modeling", "Valuation"],
        "targetCareerIds": ["investment-banking", "rbi-grade-b", "product-management"],
        "eligibility": "Penultimate or final year undergraduate students in Economics, Finance, Engineering, or Commerce.",
        "description": "Provide fundamental analysis on publicly listed companies, build detailed discounted cash flow (DCF) models, and write thematic sector notes.",
        "requiredSkills": ["Financial Modeling", "Valuation & DCF", "Excel & VBA", "Accounting & IFRS"],
        "documentsRequired": ["Resume (Single Page)", "Academic Transcripts", "Cover Letter"],
        "estimatedTimeMinutes": 30,
        "whyRecommended": "High brand equity, fast-track pre-placement offer (PPO) potential, and immersive financial training.",
        "expectedValue": "Exceptional compensation, high-prestige stamp on resume, and direct transition into full-time Investment Banking Analyst.",
        "skillMatchPercent": 88,
        "careerAlignmentPercent": 94,
        "eligibilityPercent": 92,
        "timeFeasibilityPercent": 85,
        "opportunityQualityPercent": 99
    },
    {
        "id": "opp-007",
        "title": "Ashoka Young India Fellowship (YIF) 2026-27",
        "organization": "Ashoka University",
        "category": "Fellowships",
        "type": "Fellowship",
        "matchScore": 87,
        "deadline": "2026-10-15",
        "daysLeft": 58,
        "location": "Sonipat, NCR",
        "isRemote": False,
        "stipend": "Full / Partial Tuition & Hostel Waivers",
        "verifiedSource": True,
        "sourceUrl": "https://www.ashoka.edu.in/yif",
        "tags": ["Liberal Arts", "Leadership", "Public Policy", "Fellowship"],
        "targetCareerIds": ["policy-analyst", "product-management"],
        "eligibility": "Recognized UG degree in any discipline completed by July 2027. Maximum age 26 years.",
        "description": "A prestigious 1-year multidisciplinary postgraduate diploma in Liberal Studies and leadership, bringing together scholars from across India.",
        "requiredSkills": ["Academic Writing", "Public Speaking", "Policy Analysis"],
        "documentsRequired": ["Online Application", "Essays (3 Questions)", "Transcripts", "Letters of Reference"],
        "estimatedTimeMinutes": 45,
        "whyRecommended": "Transforms undergraduate background into a distinguished multidisciplinary policy/strategy leadership profile.",
        "expectedValue": "Postgraduate Diploma from Ashoka, massive alumni network across venture capital, McKinsey, and policy institutes.",
        "skillMatchPercent": 84,
        "careerAlignmentPercent": 89,
        "eligibilityPercent": 100,
        "timeFeasibilityPercent": 82,
        "opportunityQualityPercent": 95
    },
    {
        "id": "opp-008",
        "title": "Smart India Hackathon (SIH) 2026 - Central Ministry Track",
        "organization": "Ministry of Education & AICTE",
        "category": "Hackathons",
        "type": "Hackathon / Competition",
        "matchScore": 86,
        "deadline": "2026-09-12",
        "daysLeft": 25,
        "location": "Pan-India / Designated Nodal Centers",
        "isRemote": False,
        "stipend": "₹1,00,000 Grand Cash Prize per problem statement",
        "verifiedSource": True,
        "sourceUrl": "https://sih.gov.in",
        "tags": ["Hackathon", "AI", "Government Solutions", "Engineering"],
        "targetCareerIds": ["ai-research-scientist", "product-management"],
        "eligibility": "Teams of 6 regular college students (with at least 1 female member) endorsed by college SPOC.",
        "description": "Nationwide competition to solve pressing problem statements posted by 50+ Central Ministries, State Governments, and PSUs.",
        "requiredSkills": ["Python", "React & TypeScript", "Data Structures & Algorithms"],
        "documentsRequired": ["PPT Proposal Submission", "College SPOC Verification Letter"],
        "estimatedTimeMinutes": 25,
        "whyRecommended": "Build real deployed solutions for government departments and win national recognition.",
        "expectedValue": "Cash prizes, direct recruitment interviews from sponsoring tech giants, and ministerial calculated impact.",
        "skillMatchPercent": 85,
        "careerAlignmentPercent": 86,
        "eligibilityPercent": 100,
        "timeFeasibilityPercent": 88,
        "opportunityQualityPercent": 92
    },
    {
        "id": "opp-009",
        "title": "Econometric Modeling with Stata & R (Masterclass)",
        "organization": "Indian Statistical Institute (ISI Delhi)",
        "category": "Courses",
        "type": "Certified Course",
        "matchScore": 92,
        "deadline": "2026-08-30",
        "daysLeft": 12,
        "location": "Online / Weekend Live",
        "isRemote": True,
        "stipend": "Subsidized Fee: ₹2,500 (Free for Merit Scholars)",
        "verifiedSource": True,
        "sourceUrl": "https://www.isid.ac.in",
        "tags": ["Econometrics", "Stata", "R", "Course", "Data Analysis"],
        "targetCareerIds": ["policy-analyst", "rbi-grade-b"],
        "eligibility": "Basic familiarity with undergraduate statistics and probability.",
        "description": "4-week intensive sprint covering Panel Data regressions, Difference-in-Differences (DiD), Instrumental Variables, and Time Series Forecasting.",
        "requiredSkills": ["Excel & Data Modeling", "Economic Research"],
        "documentsRequired": ["Brief Registration Form", "Student ID"],
        "estimatedTimeMinutes": 15,
        "whyRecommended": "Directly solves your #1 identified skill gap in Stata / Econometrics needed for top think tanks and RBI Phase 2.",
        "expectedValue": "ISI Certificate of Competency + working code repository of 6 real-world empirical policy papers.",
        "skillMatchPercent": 95,
        "careerAlignmentPercent": 94,
        "eligibilityPercent": 100,
        "timeFeasibilityPercent": 95,
        "opportunityQualityPercent": 96
    },
    {
        "id": "opp-010",
        "title": "Tata Trusts Social Development Leadership Internship",
        "organization": "Tata Trusts",
        "category": "Volunteering",
        "type": "Volunteering & Social Impact",
        "matchScore": 84,
        "deadline": "2026-09-25",
        "daysLeft": 38,
        "location": "Ranchi / Bhubaneswar / Hybrid",
        "isRemote": True,
        "stipend": "₹20,000 / month stipend + field travel allowances",
        "verifiedSource": True,
        "sourceUrl": "https://www.tatatrusts.org",
        "tags": ["Social Impact", "Rural Development", "Field Research", "Policy"],
        "targetCareerIds": ["policy-analyst", "upsc-civil-services"],
        "eligibility": "UG/PG students passionate about grassroots public health, water conservation, or education delivery.",
        "description": "Participate in baseline household surveys, program evaluations, and impact assessment reports for Tata Trusts rural initiatives.",
        "requiredSkills": ["Academic Writing", "Public Speaking", "Policy Analysis"],
        "documentsRequired": ["Resume", "Personal Statement on Rural Challenges"],
        "estimatedTimeMinutes": 20,
        "whyRecommended": "Provides hands-on field validation of theoretical policy concepts.",
        "expectedValue": "Field research experience, Tata Trusts fellowship recommendation, and profound personal narrative for UPSC or master's essays.",
        "skillMatchPercent": 82,
        "careerAlignmentPercent": 85,
        "eligibilityPercent": 100,
        "timeFeasibilityPercent": 80,
        "opportunityQualityPercent": 91
    },
    {
        "id": "opp-011",
        "title": "McKinsey Forward Leadership & Digital Program",
        "organization": "McKinsey & Company",
        "category": "Certifications",
        "type": "Executive Certification",
        "matchScore": 87,
        "deadline": "2026-09-18",
        "daysLeft": 31,
        "location": "Online (Self-paced + Live interactive sprints)",
        "isRemote": True,
        "stipend": "Fully Funded / Free Program",
        "verifiedSource": True,
        "sourceUrl": "https://www.mckinsey.com/forward",
        "tags": ["Strategy", "Problem Solving", "Management", "Certification"],
        "targetCareerIds": ["product-management", "investment-banking", "policy-analyst"],
        "eligibility": "Early career professionals and students in final 2 years of higher education with < 5 years work experience.",
        "description": "6-month flagship digital learning journey teaching McKinsey's core frameworks: structured problem solving, digital fluency, and collaborative agility.",
        "requiredSkills": ["Public Speaking", "Excel & Data Modeling"],
        "documentsRequired": ["Online Profile Registration"],
        "estimatedTimeMinutes": 15,
        "whyRecommended": "Globally recognized corporate credentials validating structured thinking and communication.",
        "expectedValue": "McKinsey Forward Digital Badge on LinkedIn + access to exclusive McKinsey global webinar series.",
        "skillMatchPercent": 88,
        "careerAlignmentPercent": 86,
        "eligibilityPercent": 100,
        "timeFeasibilityPercent": 94,
        "opportunityQualityPercent": 97
    },
    {
        "id": "opp-012",
        "title": "Atal Innovation Mission Youth Entrepreneurship Grant",
        "organization": "NITI Aayog & Startup India",
        "category": "Entrepreneurship",
        "type": "Incentive Grant & Incubation",
        "matchScore": 83,
        "deadline": "2026-10-05",
        "daysLeft": 48,
        "location": "Hybrid / Pan-India AICs",
        "isRemote": True,
        "stipend": "Up to ₹10,00,000 non-dilutive prototype grant",
        "verifiedSource": True,
        "sourceUrl": "https://aim.gov.in",
        "tags": ["Startup", "Grant", "Incubation", "Innovation", "Govt"],
        "targetCareerIds": ["product-management", "ai-research-scientist"],
        "eligibility": "Student-led teams with working software/hardware prototype addressing national priorities (HealthTech, EdTech, AgriTech, FinTech).",
        "description": "Access state-of-the-art Atal Incubation Centers (AICs), prototyping labs, legal patenting assistance, and milestone-linked grant funds.",
        "requiredSkills": ["React & TypeScript", "Pitch Deck Creation", "Product Strategy"],
        "documentsRequired": ["5-Slide Pitch Deck", "Demo Video Link", "College Endorsement"],
        "estimatedTimeMinutes": 35,
        "whyRecommended": "Turn your tech or policy thesis project into a venture-backed enterprise.",
        "expectedValue": "Non-dilutive funding, government mentoring, and direct pipeline into institutional angel networks.",
        "skillMatchPercent": 80,
        "careerAlignmentPercent": 82,
        "eligibilityPercent": 100,
        "timeFeasibilityPercent": 85,
        "opportunityQualityPercent": 95
    }
]

def generate_full_opportunities():
    categories = [
        "Internships", "Jobs", "Scholarships", "Fellowships",
        "Competitions", "Hackathons", "Research", "Government Programs",
        "Courses", "Certifications", "Volunteering", "Entrepreneurship"
    ]
    orgs = [
        {"name": "Centre for Policy Research", "cat": "Internships", "loc": "New Delhi", "remote": True},
        {"name": "Reserve Bank of India", "cat": "Government Programs", "loc": "Mumbai", "remote": False},
        {"name": "NITI Aayog", "cat": "Government Programs", "loc": "New Delhi", "remote": False},
        {"name": "Reliance Foundation", "cat": "Scholarships", "loc": "Pan-India", "remote": True},
        {"name": "Google Research India", "cat": "Research", "loc": "Bengaluru", "remote": True},
        {"name": "Goldman Sachs", "cat": "Internships", "loc": "Bengaluru", "remote": False},
        {"name": "Ashoka University", "cat": "Fellowships", "loc": "Sonipat", "remote": False},
        {"name": "Ministry of Education", "cat": "Hackathons", "loc": "Pan-India", "remote": False},
        {"name": "Indian Statistical Institute", "cat": "Courses", "loc": "Online", "remote": True},
        {"name": "Tata Trusts", "cat": "Volunteering", "loc": "Ranchi", "remote": True},
        {"name": "McKinsey & Company", "cat": "Certifications", "loc": "Online", "remote": True},
        {"name": "Startup India", "cat": "Entrepreneurship", "loc": "Hybrid", "remote": True},
        {"name": "ISRO Space Applications Centre", "cat": "Research", "loc": "Ahmedabad", "remote": False},
        {"name": "Microsoft Research India", "cat": "Research", "loc": "Bengaluru", "remote": True},
        {"name": "Boston Consulting Group (BCG)", "cat": "Internships", "loc": "Mumbai", "remote": False},
        {"name": "PM Research Fellowship (PMRF)", "cat": "Fellowships", "loc": "IITs / IISc", "remote": False},
        {"name": "Aditya Birla Group Scholarship", "cat": "Scholarships", "loc": "Pan-India", "remote": True},
        {"name": "SEBI (Securities and Exchange Board)", "cat": "Government Programs", "loc": "Mumbai", "remote": False},
        {"name": "Kaggle Grandmaster League", "cat": "Competitions", "loc": "Online", "remote": True},
        {"name": "JP Morgan Chase", "cat": "Internships", "loc": "Mumbai", "remote": False}
    ]

    full_list = list(PRIMARY_OPPORTUNITIES)
    id_counter = 13
    for i in range(40):
        org = orgs[i % len(orgs)]
        cat = categories[i % len(categories)]
        month = (i % 3) + 9
        day = (i * 3 % 27) + 1
        deadline_str = f"2026-{str(month).zfill(2)}-{str(day).zfill(2)}"
        match_score = 70 + ((i * 7 + 13) % 28)
        stipend_val = f"₹{(20 + (i % 5) * 15)},000 / mo" if i % 3 == 0 else (f"₹{(50 + (i % 10) * 10)},000 grant" if i % 3 == 1 else "Fully Funded")

        full_list.append({
            "id": f"opp-{str(id_counter).zfill(3)}",
            "title": f"{'Mastering ' if cat == 'Courses' else ''}{org['name']} {cat[:-1] if cat.endswith('s') else cat} Initiative {2026 + (i % 2)}",
            "organization": org["name"],
            "category": cat,
            "type": cat[:-1] if cat.endswith('s') else cat,
            "matchScore": match_score,
            "deadline": deadline_str,
            "daysLeft": max(3, 10 + i * 2),
            "location": org["loc"],
            "isRemote": org.get("remote", False) or (i % 2 == 0),
            "stipend": stipend_val,
            "verifiedSource": True,
            "sourceUrl": f"https://{org['name'].lower().replace(' ', '').replace('(', '').replace(')', '')}.org/apply",
            "tags": [org["cat"], "Verified", "Priority", "2026"],
            "targetCareerIds": ["policy-analyst", "rbi-grade-b", "ai-research-scientist", "product-management", "investment-banking"],
            "eligibility": "Open to eligible university students in enrolled undergraduate or postgraduate programs.",
            "description": f"Structured high-impact engagement provided by {org['name']} for career development, analytical capability building, and institutional networking.",
            "requiredSkills": ["Academic Writing", "Excel & Data Modeling", "Public Speaking"],
            "documentsRequired": ["Resume", "Statement of Purpose", "Academic Records"],
            "estimatedTimeMinutes": 20 + (i % 25),
            "whyRecommended": f"Demonstrates strong relevance for analytical career paths and expands your portfolio in {org['loc']}.",
            "expectedValue": "Institutional accreditation, mentorship, and high-impact resume enhancement.",
            "skillMatchPercent": match_score - 2,
            "careerAlignmentPercent": match_score + 1,
            "eligibilityPercent": 95,
            "timeFeasibilityPercent": 90,
            "opportunityQualityPercent": 94
        })
        id_counter += 1

    return full_list

INITIAL_APPLICATIONS = [
    {
        "id": "app-001",
        "opportunityId": "opp-001",
        "organization": "Centre for Policy Research",
        "position": "Policy Research Fellowship",
        "stage": "Considering",
        "deadline": "2026-08-28",
        "appliedDate": None,
        "notes": "Drafted SOP; need to review economic analysis writing sample on rural credit.",
        "matchScore": 94,
        "documents": ["CPR_SOP_Draft.pdf", "Aarav_CV_Policy.pdf"]
    },
    {
        "id": "app-002",
        "opportunityId": "opp-003",
        "organization": "NITI Aayog",
        "position": "Governance Internship - DMEO",
        "stage": "Applied",
        "deadline": "2026-09-10",
        "appliedDate": "2026-08-15",
        "notes": "Submitted through official portal. Awaiting divisional allocation confirmation.",
        "matchScore": 89,
        "documents": ["NITI_NOC_College.pdf", "Resume_V3.pdf"]
    },
    {
        "id": "app-003",
        "opportunityId": "opp-004",
        "organization": "Reliance Foundation",
        "position": "Undergraduate Excellence Scholarship",
        "stage": "Saved",
        "deadline": "2026-09-15",
        "appliedDate": None,
        "notes": "Need father's ITR acknowledgement form for income verification.",
        "matchScore": 88,
        "documents": []
    },
    {
        "id": "app-004",
        "opportunityId": "opp-009",
        "organization": "Indian Statistical Institute",
        "position": "Econometric Modeling Masterclass",
        "stage": "Selected",
        "deadline": "2026-08-30",
        "appliedDate": "2026-08-10",
        "notes": "Offer letter received with merit scholarship fee waiver. Sessions start Saturday.",
        "matchScore": 92,
        "documents": ["ISI_Offer_Letter.pdf"]
    },
    {
        "id": "app-005",
        "opportunityId": "opp-007",
        "organization": "Ashoka University",
        "position": "Young India Fellowship (YIF)",
        "stage": "Interview",
        "deadline": "2026-10-15",
        "appliedDate": "2026-08-01",
        "notes": "Telephonic round cleared. Panel interview scheduled for Sept 8 at 4:00 PM.",
        "interviewDate": "2026-09-08 16:00",
        "matchScore": 87,
        "documents": ["YIF_Application_Copy.pdf", "Ref_Letter_ProfSen.pdf"]
    }
]

INITIAL_WEEKLY_PLAN = [
    {
        "id": "task-w1",
        "type": "TOP PRIORITY",
        "categoryBadge": "Application",
        "title": "Apply for CPR Policy Research Fellowship",
        "deadline": "28 Aug (4 days left)",
        "estimatedHours": 1.5,
        "completed": False,
        "opportunityId": "opp-001",
        "tagline": "Submit tailored SOP + 1 writing sample",
        "priorityRank": 1
    },
    {
        "id": "task-w2",
        "type": "SKILL",
        "categoryBadge": "2-Hour Sprint",
        "title": "Complete ISI Stata Econometrics Module 1",
        "deadline": "30 Aug",
        "estimatedHours": 2.0,
        "completed": False,
        "opportunityId": "opp-009",
        "tagline": "Finish regression diagnostics exercises",
        "priorityRank": 2
    },
    {
        "id": "task-w3",
        "type": "CAREER",
        "categoryBadge": "Career Decision",
        "title": "Conduct 30-min Informational Chat with RBI Grade B Officer",
        "deadline": "01 Sep",
        "estimatedHours": 1.0,
        "completed": True,
        "tagline": "Ask about Phase 2 prep balancing with college",
        "priorityRank": 3
    },
    {
        "id": "task-w4",
        "type": "FINANCE",
        "categoryBadge": "Savings Milestone",
        "title": "Transfer ₹1,000 to Higher Ed SIP Goal",
        "deadline": "31 Aug",
        "estimatedHours": 0.5,
        "completed": True,
        "tagline": "Keep education emergency reserve funded",
        "priorityRank": 4
    },
    {
        "id": "task-w5",
        "type": "DEADLINE",
        "categoryBadge": "Scholarship",
        "title": "Verify Reliance Foundation Income Certificate with College",
        "deadline": "05 Sep",
        "estimatedHours": 1.0,
        "completed": False,
        "opportunityId": "opp-004",
        "tagline": "Obtain administrative seal on family declaration",
        "priorityRank": 5
    }
]

INITIAL_NOTIFICATIONS = [
    {
        "id": "notif-1",
        "title": "Deadline Alert: CPR Fellowship",
        "message": "Application deadline for Centre for Policy Research closes in 4 days.",
        "timestamp": "10 mins ago",
        "read": False,
        "type": "urgent",
        "actionTarget": "opportunities",
        "targetId": "opp-001"
    },
    {
        "id": "notif-2",
        "title": "Recommendation Updated",
        "message": "Nexora AI re-ranked 7 strong matches based on your updated Stata skill proficiency.",
        "timestamp": "2 hours ago",
        "read": False,
        "type": "info",
        "actionTarget": "dashboard"
    },
    {
        "id": "notif-3",
        "title": "Weekly Milestone Streak 🔥",
        "message": "You have completed 2 of 5 actions for this week. 4 hours remaining.",
        "timestamp": "Yesterday",
        "read": True,
        "type": "success",
        "actionTarget": "weekly"
    }
]

BILLING_INVOICES = [
    {
        "id": "INV-2026-0801",
        "date": "01 Aug 2026",
        "plan": "Nexora Pro (Annual)",
        "amount": "₹3,999",
        "status": "Paid",
        "downloadUrl": "#invoice-pdf"
    },
    {
        "id": "INV-2025-0801",
        "date": "01 Aug 2025",
        "plan": "Nexora Pro (Annual)",
        "amount": "₹3,499",
        "status": "Paid",
        "downloadUrl": "#invoice-pdf"
    }
]

async def seed_database_if_empty():
    """Seed MongoDB collections if they are empty."""
    db = get_db()
    if db is None:
        logger.warning("MongoDB not connected, skipping seed.")
        return

    try:
        # 1. Personas
        personas_col = db["personas"]
        if await personas_col.count_documents({}) == 0:
            logger.info("Seeding personas collection...")
            for p in PERSONA_PRESETS:
                await personas_col.update_one({"id": p["id"]}, {"$set": p}, upsert=True)
            logger.info(f"Seeded {len(PERSONA_PRESETS)} personas.")

        # 2. Opportunities
        opps_col = db["opportunities"]
        if await opps_col.count_documents({}) == 0:
            logger.info("Seeding opportunities database...")
            all_opps = generate_full_opportunities()
            for opp in all_opps:
                await opps_col.update_one({"id": opp["id"]}, {"$set": opp}, upsert=True)
            logger.info(f"Seeded {len(all_opps)} opportunities.")

        # 3. Career Paths
        careers_col = db["careers"]
        if await careers_col.count_documents({}) == 0:
            logger.info("Seeding career paths...")
            for c in CAREER_PATHS:
                await careers_col.update_one({"id": c["id"]}, {"$set": c}, upsert=True)
            logger.info(f"Seeded {len(CAREER_PATHS)} career paths.")

        # 4. Applications
        apps_col = db["applications"]
        if await apps_col.count_documents({}) == 0:
            logger.info("Seeding applications...")
            for a in INITIAL_APPLICATIONS:
                await apps_col.update_one({"id": a["id"]}, {"$set": a}, upsert=True)
            logger.info(f"Seeded {len(INITIAL_APPLICATIONS)} applications.")

        # 5. Weekly Plan
        weekly_col = db["weekly_plan"]
        if await weekly_col.count_documents({}) == 0:
            logger.info("Seeding weekly plan...")
            for w in INITIAL_WEEKLY_PLAN:
                await weekly_col.update_one({"id": w["id"]}, {"$set": w}, upsert=True)
            logger.info(f"Seeded {len(INITIAL_WEEKLY_PLAN)} weekly tasks.")

        # 6. Notifications
        notifs_col = db["notifications"]
        if await notifs_col.count_documents({}) == 0:
            logger.info("Seeding notifications...")
            for n in INITIAL_NOTIFICATIONS:
                await notifs_col.update_one({"id": n["id"]}, {"$set": n}, upsert=True)
            logger.info(f"Seeded {len(INITIAL_NOTIFICATIONS)} notifications.")

        # 7. Invoices
        invoices_col = db["invoices"]
        if await invoices_col.count_documents({}) == 0:
            logger.info("Seeding billing invoices...")
            for inv in BILLING_INVOICES:
                await invoices_col.update_one({"id": inv["id"]}, {"$set": inv}, upsert=True)
            logger.info(f"Seeded {len(BILLING_INVOICES)} invoices.")

        logger.info("[SUCCESS] Database seeding check completed successfully.")
    except Exception as e:
        logger.error(f"Error during database seeding: {e}")
