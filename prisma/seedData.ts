// Realistic Seed Dataset for CollegeIQ (40+ Top Indian Institutions)
export interface SeedCourse {
  name: string;
  degree: string;
  duration: string;
  fees: number;
  seats?: number;
}

export interface SeedReview {
  rating: number;
  comment: string;
  authorName: string;
  authorRole: string;
}

export interface SeedExamCutoff {
  exam: string; // "JEE Main" | "NEET" | "CAT" | "BITSAT" | "GATE"
  branch: string;
  category: string;
  minRank: number;
  maxRank: number;
  year: number;
}

export interface SeedCollege {
  name: string;
  slug: string;
  location: string;
  state: string;
  city: string;
  fees: number; // Annual tuition fee in INR
  rating: number;
  overview: string;
  averagePackage: number;
  highestPackage: number;
  establishedYear: number;
  type: string; // "Government" | "Private" | "Autonomous"
  websiteUrl: string;
  imageUrl?: string;
  courses: SeedCourse[];
  reviews: SeedReview[];
  cutoffs: SeedExamCutoff[];
}

export const SEED_COLLEGES: SeedCollege[] = [
  // 1. IIT Bombay
  {
    name: "Indian Institute of Technology Bombay (IITB)",
    slug: "iit-bombay",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    fees: 225000,
    rating: 4.9,
    overview: "IIT Bombay is recognized worldwide as a leader in the field of engineering education and research. Established in 1958, it is renowned for its prestigious B.Tech programs, outstanding research facilities, distinguished faculty, and exceptional global placement records with leading multinational tech giants and quant firms.",
    averagePackage: 2350000,
    highestPackage: 36700000,
    establishedYear: 1958,
    type: "Government",
    websiteUrl: "https://www.iitb.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 225000, seats: 120 },
      { name: "B.Tech in Electrical Engineering", degree: "B.Tech", duration: "4 Years", fees: 225000, seats: 110 },
      { name: "B.Tech in Mechanical Engineering", degree: "B.Tech", duration: "4 Years", fees: 225000, seats: 140 },
      { name: "M.Tech in Artificial Intelligence & Data Science", degree: "M.Tech", duration: "2 Years", fees: 115000, seats: 60 },
      { name: "Dual Degree (B.Tech + M.Tech) in Electrical Engineering", degree: "Dual Degree", duration: "5 Years", fees: 230000, seats: 45 }
    ],
    reviews: [
      { rating: 5.0, comment: "The coding culture, hackathons, and entrepreneurial ecosystem are unmatched anywhere in the country. World-class faculty and campus life.", authorName: "Aarav Sharma", authorRole: "B.Tech CSE, Class of 2024" },
      { rating: 4.8, comment: "Top tier research labs with immense industry sponsorship. Placements bring top international offers from Wall Street, Silicon Valley, and Tokyo.", authorName: "Pooja Deshmukh", authorRole: "M.Tech AI, Batch of 2023" },
      { rating: 4.9, comment: "Mood Indigo and Techfest provide unparalleled cultural and technical exposure. Hostel life is deeply formative.", authorName: "Rohan Nair", authorRole: "Alumni, Software Architect at Google" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 1, maxRank: 67, year: 2024 },
      { exam: "JEE Main", branch: "Electrical Engineering", category: "General", minRank: 70, maxRank: 420, year: 2024 },
      { exam: "JEE Main", branch: "Mechanical Engineering", category: "General", minRank: 500, maxRank: 1650, year: 2024 },
      { exam: "JEE Main", branch: "Civil Engineering", category: "General", minRank: 1800, maxRank: 4200, year: 2024 }
    ]
  },

  // 2. IIT Delhi
  {
    name: "Indian Institute of Technology Delhi (IITD)",
    slug: "iit-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees: 220000,
    rating: 4.9,
    overview: "IIT Delhi is one of the 23 IITs created to be Centres of Excellence in training, research and development in science, engineering and technology in India. Located in the capital city's heart, it boasts a thriving startup incubator, high-impact research, and stellar placement statistics.",
    averagePackage: 2400000,
    highestPackage: 25000000,
    establishedYear: 1961,
    type: "Government",
    websiteUrl: "https://home.iitd.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 115 },
      { name: "B.Tech in Mathematics and Computing", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 80 },
      { name: "B.Tech in Electrical Engineering", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 120 },
      { name: "M.Tech in VLSI Design Tools and Technology", degree: "M.Tech", duration: "2 Years", fees: 110000, seats: 50 }
    ],
    reviews: [
      { rating: 5.0, comment: "Superb peer group and startup ecosystem. The proximity to Delhi's policy, business, and tech hubs makes networking effortless.", authorName: "Kavya Singhania", authorRole: "B.Tech MnC, Batch of 2024" },
      { rating: 4.8, comment: "Top quant trading firms and global AI companies recruit heavily here. Courses are rigorous but rewarding.", authorName: "Aditya Verma", authorRole: "Alumni, Quant Trader" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 1, maxRank: 115, year: 2024 },
      { exam: "JEE Main", branch: "Mathematics and Computing", category: "General", minRank: 120, maxRank: 350, year: 2024 },
      { exam: "JEE Main", branch: "Electrical Engineering", category: "General", minRank: 360, maxRank: 620, year: 2024 },
      { exam: "JEE Main", branch: "Mechanical Engineering", category: "General", minRank: 700, maxRank: 2100, year: 2024 }
    ]
  },

  // 3. IIT Madras
  {
    name: "Indian Institute of Technology Madras (IITM)",
    slug: "iit-madras",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    fees: 215000,
    rating: 4.9,
    overview: "Ranked #1 in NIRF Engineering for multiple consecutive years, IIT Madras is celebrated for its lush green campus inside the Guindy National Park, India's first university-based Research Park, and groundbreaking patents across deep-tech, EV systems, and aeronautics.",
    averagePackage: 2200000,
    highestPackage: 21400000,
    establishedYear: 1959,
    type: "Government",
    websiteUrl: "https://www.iitm.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 215000, seats: 90 },
      { name: "B.Tech in Aerospace Engineering", degree: "B.Tech", duration: "4 Years", fees: 215000, seats: 60 },
      { name: "B.Tech in Electrical Engineering", degree: "B.Tech", duration: "4 Years", fees: 215000, seats: 110 },
      { name: "Interdisciplinary Dual Degree in Robotics", degree: "Dual Degree", duration: "5 Years", fees: 220000, seats: 30 }
    ],
    reviews: [
      { rating: 4.9, comment: "The IITM Research Park is a marvel. You can literally work on world-class space-tech and robotics startups right next to class.", authorName: "Siddharth Raman", authorRole: "B.Tech Aerospace, 2023" },
      { rating: 4.9, comment: "Consistently ranked No. 1 for a reason. Brilliant professors, deer roaming freely on campus, and strong alumni network.", authorName: "Meenakshi Sundaram", authorRole: "B.Tech CSE, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 1, maxRank: 148, year: 2024 },
      { exam: "JEE Main", branch: "Electrical Engineering", category: "General", minRank: 200, maxRank: 960, year: 2024 },
      { exam: "JEE Main", branch: "Aerospace Engineering", category: "General", minRank: 1200, maxRank: 3100, year: 2024 }
    ]
  },

  // 4. BITS Pilani (Pilani Campus)
  {
    name: "Birla Institute of Technology and Science, Pilani",
    slug: "bits-pilani",
    location: "Pilani, Rajasthan",
    state: "Rajasthan",
    city: "Pilani",
    fees: 545000,
    rating: 4.8,
    overview: "BITS Pilani is an Institute of Eminence known for its progressive 'Zero Attendance' policy, flexible dual-degree systems, and the Practice School (PS-II) industrial internship model which ensures high pre-placement offers (PPOs) with global tech and finance leaders.",
    averagePackage: 1980000,
    highestPackage: 13300000,
    establishedYear: 1964,
    type: "Private",
    websiteUrl: "https://www.bits-pilani.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.E. in Computer Science", degree: "B.E.", duration: "4 Years", fees: 545000, seats: 150 },
      { name: "B.E. in Electronics and Instrumentation", degree: "B.E.", duration: "4 Years", fees: 545000, seats: 120 },
      { name: "M.Sc (Hons) Economics + B.E. Dual Degree", degree: "Dual Degree", duration: "5 Years", fees: 550000, seats: 80 },
      { name: "M.E. in Software Systems", degree: "M.E.", duration: "2 Years", fees: 380000, seats: 40 }
    ],
    reviews: [
      { rating: 5.0, comment: "Zero attendance rule breeds true self-discipline and fosters founders. Incredible alumni network (BITSians everywhere).", authorName: "Nikhil Agarwal", authorRole: "B.E. CS, 2023" },
      { rating: 4.7, comment: "Practice School 2 is a game-changer. 6 months full-time corporate internship that converts into top tier PPOs.", authorName: "Ananya Goyal", authorRole: "B.E. EEE, 2024" }
    ],
    cutoffs: [
      { exam: "BITSAT", branch: "Computer Science", category: "General", minRank: 330, maxRank: 390, year: 2024 },
      { exam: "BITSAT", branch: "Electronics & Communication", category: "General", minRank: 295, maxRank: 330, year: 2024 },
      { exam: "BITSAT", branch: "Mechanical Engineering", category: "General", minRank: 245, maxRank: 280, year: 2024 },
      { exam: "JEE Main", branch: "Computer Science Equivalent", category: "General", minRank: 500, maxRank: 2500, year: 2024 }
    ]
  },

  // 5. IIIT Hyderabad
  {
    name: "International Institute of Information Technology Hyderabad (IIITH)",
    slug: "iiit-hyderabad",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    city: "Hyderabad",
    fees: 360000,
    rating: 4.8,
    overview: "IIIT Hyderabad is an autonomous research university renowned for its unmatched curriculum in Computer Science, Natural Language Processing, Machine Learning, Computer Vision, and Robotics. It consistently tops national competitive programming rankings and research output.",
    averagePackage: 3200000,
    highestPackage: 10200000,
    establishedYear: 1998,
    type: "Autonomous",
    websiteUrl: "https://www.iiit.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 360000, seats: 120 },
      { name: "B.Tech in Electronics and Communication Engineering", degree: "B.Tech", duration: "4 Years", fees: 360000, seats: 90 },
      { name: "Dual Degree (B.Tech + MS by Research in CSE)", degree: "Dual Degree", duration: "5 Years", fees: 360000, seats: 50 },
      { name: "M.Tech in Computer Science and Information Security", degree: "M.Tech", duration: "2 Years", fees: 320000, seats: 40 }
    ],
    reviews: [
      { rating: 5.0, comment: "If your absolute goal is deep CS, AI research, or top product engineering, IIITH is second to none in Asia.", authorName: "Karthik Reddy", authorRole: "B.Tech CSE, 2024" },
      { rating: 4.7, comment: "Heavy coding coursework from semester 1. Very rigorous, but average package of 32+ LPA speaks for itself.", authorName: "Sneha Murthy", authorRole: "Dual Degree CS, 2023" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 200, maxRank: 990, year: 2024 },
      { exam: "JEE Main", branch: "Electronics and Communication", category: "General", minRank: 1050, maxRank: 3200, year: 2024 }
    ]
  },

  // 6. NIT Trichy
  {
    name: "National Institute of Technology Tiruchirappalli (NIT Trichy)",
    slug: "nit-trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Tiruchirappalli",
    fees: 165000,
    rating: 4.7,
    overview: "NIT Trichy is the premier National Institute of Technology in India, ranked #1 among all NITs. With expansive research labs, vibrant student symposiums like Festember and Pragyan, and strong campus placements across tech, consulting, and core manufacturing sectors.",
    averagePackage: 1580000,
    highestPackage: 5200000,
    establishedYear: 1964,
    type: "Government",
    websiteUrl: "https://www.nitt.edu",
    imageUrl: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 165000, seats: 120 },
      { name: "B.Tech in Electrical and Electronics Engineering", degree: "B.Tech", duration: "4 Years", fees: 165000, seats: 110 },
      { name: "B.Tech in Mechanical Engineering", degree: "B.Tech", duration: "4 Years", fees: 165000, seats: 120 },
      { name: "MCA (Master of Computer Applications)", degree: "MCA", duration: "3 Years", fees: 110000, seats: 90 }
    ],
    reviews: [
      { rating: 4.8, comment: "Top NIT with exceptional academic freedom and clubs. Very strong alumni network in silicon valley and Bangalore.", authorName: "Venkatesh Iyer", authorRole: "B.Tech EEE, 2023" },
      { rating: 4.6, comment: "Placements for CS and ECE are at par with top IITs. Pragyan festival is ISO certified.", authorName: "Divya Krishnan", authorRole: "B.Tech CSE, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 800, maxRank: 4200, year: 2024 },
      { exam: "JEE Main", branch: "Electrical and Electronics", category: "General", minRank: 4500, maxRank: 9500, year: 2024 },
      { exam: "JEE Main", branch: "Mechanical Engineering", category: "General", minRank: 10000, maxRank: 17500, year: 2024 }
    ]
  },

  // 7. NIT Surathkal
  {
    name: "National Institute of Technology Karnataka (NITK Surathkal)",
    slug: "nit-surathkal",
    location: "Mangaluru, Karnataka",
    state: "Karnataka",
    city: "Mangaluru",
    fees: 160000,
    rating: 4.7,
    overview: "NITK Surathkal is famous for having its own private beach on the Arabian Sea, top-notch faculty, state-of-the-art computational infrastructure, and immense placement records with leading engineering and finance conglomerates.",
    averagePackage: 1550000,
    highestPackage: 5400000,
    establishedYear: 1960,
    type: "Government",
    websiteUrl: "https://www.nitk.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Information Technology", degree: "B.Tech", duration: "4 Years", fees: 160000, seats: 110 },
      { name: "B.Tech in Artificial Intelligence", degree: "B.Tech", duration: "4 Years", fees: 160000, seats: 60 },
      { name: "B.Tech in Chemical Engineering", degree: "B.Tech", duration: "4 Years", fees: 160000, seats: 80 }
    ],
    reviews: [
      { rating: 4.8, comment: "Living next to the beach with world-class engineering education is a dream. Great coding clubs like Web Club and ACM.", authorName: "Gautam Rao", authorRole: "B.Tech IT, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Information Technology", category: "General", minRank: 1200, maxRank: 4800, year: 2024 },
      { exam: "JEE Main", branch: "Artificial Intelligence", category: "General", minRank: 1500, maxRank: 5200, year: 2024 },
      { exam: "JEE Main", branch: "Mechanical Engineering", category: "General", minRank: 11000, maxRank: 19000, year: 2024 }
    ]
  },

  // 8. Delhi Technological University (DTU)
  {
    name: "Delhi Technological University (DTU)",
    slug: "delhi-technological-university-dtu",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees: 210000,
    rating: 4.6,
    overview: "Formerly known as Delhi College of Engineering (DCE), DTU is one of India's oldest and most prestigious engineering colleges. Situated across a sprawling 164-acre lush green campus in Rohini, DTU is renowned for its automotive supermileage teams, tech societies, and top-tier placements.",
    averagePackage: 1620000,
    highestPackage: 8200000,
    establishedYear: 1941,
    type: "Government",
    websiteUrl: "https://www.dtu.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 210000, seats: 360 },
      { name: "B.Tech in Software Engineering", degree: "B.Tech", duration: "4 Years", fees: 210000, seats: 180 },
      { name: "B.Tech in Mathematics and Computing", degree: "B.Tech", duration: "4 Years", fees: 210000, seats: 180 },
      { name: "B.Tech in Electrical Engineering", degree: "B.Tech", duration: "4 Years", fees: 210000, seats: 240 }
    ],
    reviews: [
      { rating: 4.7, comment: "DCE legacy is massive in corporate India. Almost every Fortune 500 tech firm visits campus for recruitment.", authorName: "Pranav Gupta", authorRole: "B.Tech Software Engg, 2024" },
      { rating: 4.5, comment: "Great campus life, excellent societies (UAS, Defianz Racing), and high placement percentage.", authorName: "Ritu Chawla", authorRole: "B.Tech CSE, 2023" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 2500, maxRank: 11000, year: 2024 },
      { exam: "JEE Main", branch: "Software Engineering", category: "General", minRank: 5000, maxRank: 14500, year: 2024 },
      { exam: "JEE Main", branch: "Mathematics and Computing", category: "General", minRank: 8000, maxRank: 18000, year: 2024 },
      { exam: "JEE Main", branch: "Electrical Engineering", category: "General", minRank: 16000, maxRank: 32000, year: 2024 }
    ]
  },

  // 9. NSUT Delhi
  {
    name: "Netaji Subhas University of Technology (NSUT)",
    slug: "nsut-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees: 215000,
    rating: 4.6,
    overview: "Located in Dwarka, New Delhi, NSUT (formerly NSIT) has established itself as an engineering powerhouse. With its lush 145-acre campus, close proximity to the airport and Gurgaon corporate hub, NSUT produces some of the most sought-after software engineers in India.",
    averagePackage: 1590000,
    highestPackage: 7800000,
    establishedYear: 1983,
    type: "Government",
    websiteUrl: "http://www.nsut.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Engineering", degree: "B.Tech", duration: "4 Years", fees: 215000, seats: 180 },
      { name: "B.Tech in Information Technology", degree: "B.Tech", duration: "4 Years", fees: 215000, seats: 120 },
      { name: "B.Tech in Electronics and Communication Engineering", degree: "B.Tech", duration: "4 Years", fees: 215000, seats: 180 }
    ],
    reviews: [
      { rating: 4.7, comment: "Top placement stats for tech branches. Coding societies like CSI and IEEE are very active.", authorName: "Akash Mehra", authorRole: "B.Tech COE, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Engineering", category: "General", minRank: 2800, maxRank: 12000, year: 2024 },
      { exam: "JEE Main", branch: "Information Technology", category: "General", minRank: 5500, maxRank: 15500, year: 2024 },
      { exam: "JEE Main", branch: "Electronics & Communication", category: "General", minRank: 12000, maxRank: 26000, year: 2024 }
    ]
  },

  // 10. VIT Vellore
  {
    name: "Vellore Institute of Technology (VIT)",
    slug: "vit-vellore",
    location: "Vellore, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Vellore",
    fees: 295000,
    rating: 4.4,
    overview: "VIT Vellore is one of India's largest and most modern private engineering institutions. It features the Fully Flexible Credit System (FFCS), allowing students to choose their courses and professors, alongside a massive campus with modern research labs.",
    averagePackage: 920000,
    highestPackage: 10200000,
    establishedYear: 1984,
    type: "Private",
    websiteUrl: "https://vit.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 295000, seats: 900 },
      { name: "B.Tech in CSE with Specialization in Data Science", degree: "B.Tech", duration: "4 Years", fees: 295000, seats: 300 },
      { name: "B.Tech in Mechanical Engineering", degree: "B.Tech", duration: "4 Years", fees: 245000, seats: 240 }
    ],
    reviews: [
      { rating: 4.3, comment: "Massive campus with great infrastructure. Placements for dream and super dream companies are very plentiful if you have good CGPA.", authorName: "Kunal Jain", authorRole: "B.Tech CSE, 2023" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science (Equivalent)", category: "General", minRank: 15000, maxRank: 45000, year: 2024 },
      { exam: "JEE Main", branch: "Data Science Specialization", category: "General", minRank: 22000, maxRank: 55000, year: 2024 },
      { exam: "JEE Main", branch: "Electronics & Communication", category: "General", minRank: 35000, maxRank: 75000, year: 2024 }
    ]
  },

  // 11. Manipal Institute of Technology (MIT Manipal)
  {
    name: "Manipal Institute of Technology (MIT Manipal)",
    slug: "mit-manipal",
    location: "Manipal, Karnataka",
    state: "Karnataka",
    city: "Manipal",
    fees: 435000,
    rating: 4.5,
    overview: "MIT Manipal, the flagship engineering college of the Manipal Academy of Higher Education (MAHE), is known for its world-class student town culture, top student projects like Formula Manipal and SolarMobile, and prominent alumni including Satya Nadella (CEO of Microsoft).",
    averagePackage: 1250000,
    highestPackage: 5475000,
    establishedYear: 1957,
    type: "Private",
    websiteUrl: "https://manipal.edu/mit.html",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 435000, seats: 240 },
      { name: "B.Tech in Data Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 435000, seats: 120 },
      { name: "B.Tech in Aeronautical Engineering", degree: "B.Tech", duration: "4 Years", fees: 385000, seats: 60 }
    ],
    reviews: [
      { rating: 4.6, comment: "Unbeatable university town vibe. Top alumni in Silicon Valley and Fortune 100 leadership.", authorName: "Tanmay Bhatia", authorRole: "B.Tech CS, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science", category: "General", minRank: 12000, maxRank: 38000, year: 2024 },
      { exam: "JEE Main", branch: "Data Science", category: "General", minRank: 18000, maxRank: 48000, year: 2024 }
    ]
  },

  // 12. Thapar University (Patiala)
  {
    name: "Thapar Institute of Engineering and Technology (TIET)",
    slug: "thapar-university-patiala",
    location: "Patiala, Punjab",
    state: "Punjab",
    city: "Patiala",
    fees: 395000,
    rating: 4.4,
    overview: "TIET Patiala is a premier deemed-to-be university recognized for its strong engineering legacy, modern learning centers, international collaborations with Trinity College Dublin, and robust corporate campus placements.",
    averagePackage: 1180000,
    highestPackage: 4500000,
    establishedYear: 1956,
    type: "Private",
    websiteUrl: "https://www.thapar.edu",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Engineering", degree: "B.Tech", duration: "4 Years", fees: 395000, seats: 480 },
      { name: "B.Tech in Electronics and Computer Engineering", degree: "B.Tech", duration: "4 Years", fees: 395000, seats: 240 }
    ],
    reviews: [
      { rating: 4.5, comment: "The Nava Nalanda library and sports complex are state of the art. Great corporate recruitment from Microsoft, DE Shaw, Amazon.", authorName: "Harpreet Singh", authorRole: "B.Tech COE, 2023" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Engineering", category: "General", minRank: 18000, maxRank: 45000, year: 2024 },
      { exam: "JEE Main", branch: "Electronics & Computer", category: "General", minRank: 32000, maxRank: 68000, year: 2024 }
    ]
  },

  // 13. RV College of Engineering (Bengaluru)
  {
    name: "RV College of Engineering (RVCE)",
    slug: "rvce-bengaluru",
    location: "Bengaluru, Karnataka",
    state: "Karnataka",
    city: "Bengaluru",
    fees: 260000,
    rating: 4.6,
    overview: "Located on Mysore Road in Bengaluru, RVCE is widely recognized as Karnataka's top private engineering institution. Its strategic location in India's Silicon Valley offers unmatched tech placement opportunities, product internships, and tech competition victories.",
    averagePackage: 1450000,
    highestPackage: 6200000,
    establishedYear: 1963,
    type: "Autonomous",
    websiteUrl: "https://www.rvce.edu.in",
    imageUrl: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.E. in Computer Science and Engineering", degree: "B.E.", duration: "4 Years", fees: 260000, seats: 180 },
      { name: "B.E. in Information Science and Engineering", degree: "B.E.", duration: "4 Years", fees: 260000, seats: 120 },
      { name: "B.E. in Electronics and Communication", degree: "B.E.", duration: "4 Years", fees: 260000, seats: 180 }
    ],
    reviews: [
      { rating: 4.7, comment: "Being in Bangalore gives you a monumental placement advantage. Direct visits from all tier-1 tech and fin-tech companies.", authorName: "Shashank Hegde", authorRole: "B.E. CSE, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science", category: "General", minRank: 4000, maxRank: 16000, year: 2024 },
      { exam: "JEE Main", branch: "Information Science", category: "General", minRank: 7000, maxRank: 22000, year: 2024 }
    ]
  },

  // 14. COEP Technological University (Pune)
  {
    name: "COEP Technological University",
    slug: "coep-pune",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    fees: 115000,
    rating: 4.6,
    overview: "Established in 1854, COEP is the third oldest engineering college in Asia. A prestigious public university with glorious heritage, it boasts top automotive, mechanical, and IT placements, along with historic campus architecture along the Mula river.",
    averagePackage: 1120000,
    highestPackage: 5050000,
    establishedYear: 1854,
    type: "Government",
    websiteUrl: "https://www.coep.org.in",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Engineering", degree: "B.Tech", duration: "4 Years", fees: 115000, seats: 120 },
      { name: "B.Tech in Mechanical Engineering", degree: "B.Tech", duration: "4 Years", fees: 115000, seats: 120 },
      { name: "B.Tech in Metallurgy and Material Science", degree: "B.Tech", duration: "4 Years", fees: 115000, seats: 60 }
    ],
    reviews: [
      { rating: 4.7, comment: "Exceptional legacy and value for money with sub-1.5L annual fees. The Boat Club is historic.", authorName: "Omkar Joshi", authorRole: "B.Tech Comp, 2023" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Engineering", category: "General", minRank: 5000, maxRank: 18500, year: 2024 },
      { exam: "JEE Main", branch: "Mechanical Engineering", category: "General", minRank: 19000, maxRank: 42000, year: 2024 }
    ]
  },

  // 15. IIM Ahmedabad
  {
    name: "Indian Institute of Management Ahmedabad (IIMA)",
    slug: "iim-ahmedabad",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    city: "Ahmedabad",
    fees: 1250000,
    rating: 5.0,
    overview: "IIM Ahmedabad is India's premier management institute, globally renowned for its pioneering case study method, iconic Louis Kahn-designed brick campus, and producing top global CEOs, policy makers, and venture capitalists.",
    averagePackage: 3430000,
    highestPackage: 11500000,
    establishedYear: 1961,
    type: "Government",
    websiteUrl: "https://www.iima.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Program in Management (PGP / MBA)", degree: "MBA", duration: "2 Years", fees: 1250000, seats: 395 },
      { name: "PGP in Food and Agri-Business Management (PGP-FABM)", degree: "MBA", duration: "2 Years", fees: 1150000, seats: 45 },
      { name: "MBA for Executives (PGPX)", degree: "Executive MBA", duration: "1 Year", fees: 3150000, seats: 140 }
    ],
    reviews: [
      { rating: 5.0, comment: "The gold standard of business education in Asia. The WAC (Written Analysis of Cases) classes transform how you think under extreme pressure.", authorName: "Varun Khandelwal", authorRole: "PGP Class of 2023, McKinsey Associate" },
      { rating: 5.0, comment: "Unparalleled leadership pedigree. 100% placement with top global consulting, PE/VC, and investment banks within days.", authorName: "Priyanka Sen", authorRole: "PGP Class of 2024" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "PGP (General Management)", category: "General", minRank: 99, maxRank: 100, year: 2024 },
      { exam: "CAT", branch: "PGP-FABM", category: "General", minRank: 96, maxRank: 99, year: 2024 }
    ]
  },

  // 16. IIM Bangalore
  {
    name: "Indian Institute of Management Bangalore (IIMB)",
    slug: "iim-bangalore",
    location: "Bengaluru, Karnataka",
    state: "Karnataka",
    city: "Bengaluru",
    fees: 1225000,
    rating: 4.9,
    overview: "Nestled on Bannerghatta Road, IIM Bangalore is famous for its stunning stone architecture designed by B.V. Doshi, deep integration with Bengaluru's startup and tech ecosystem, and top-ranked MBA programs with elite global recruiters.",
    averagePackage: 3530000,
    highestPackage: 10500000,
    establishedYear: 1973,
    type: "Government",
    websiteUrl: "https://www.iimb.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Program in Management (PGP)", degree: "MBA", duration: "2 Years", fees: 1225000, seats: 480 },
      { name: "Post Graduate Program in Business Analytics (PGP-BA)", degree: "MBA", duration: "2 Years", fees: 1225000, seats: 75 }
    ],
    reviews: [
      { rating: 5.0, comment: "Incredible campus ambiance with stone corridors and lush greenery. Top product management and consulting roles in India.", authorName: "Devika Menon", authorRole: "PGP, 2024" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "PGP (MBA)", category: "General", minRank: 99, maxRank: 100, year: 2024 },
      { exam: "CAT", branch: "PGP Business Analytics", category: "General", minRank: 98, maxRank: 100, year: 2024 }
    ]
  },

  // 17. IIM Calcutta
  {
    name: "Indian Institute of Management Calcutta (IIMC)",
    slug: "iim-calcutta",
    location: "Kolkata, West Bengal",
    state: "West Bengal",
    city: "Kolkata",
    fees: 1200000,
    rating: 4.9,
    overview: "Known as the 'Finance Campus of India', IIM Calcutta was the first IIM established. With its famous seven lakes on campus and unmatched strength in quantitative finance, economics, and analytics, Joka is legendary.",
    averagePackage: 3500000,
    highestPackage: 11500000,
    establishedYear: 1961,
    type: "Government",
    websiteUrl: "https://www.iimcal.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Diploma in Management (PGDM / MBA)", degree: "MBA", duration: "2 Years", fees: 1200000, seats: 460 },
      { name: "Post Graduate Diploma in Business Analytics (PGDBA)", degree: "MBA", duration: "2 Years", fees: 1300000, seats: 60 }
    ],
    reviews: [
      { rating: 4.9, comment: "The quantitative rigor and finance culture at Joka are unmatched. Front-end investment banks and private equity recruit heavily.", authorName: "Siddhant Mukherjee", authorRole: "MBA 2023, Investment Banker" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "PGDM (Finance & Strategy)", category: "General", minRank: 99, maxRank: 100, year: 2024 }
    ]
  },

  // 18. FMS Delhi
  {
    name: "Faculty of Management Studies, University of Delhi (FMS)",
    slug: "fms-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees: 100000,
    rating: 4.8,
    overview: "FMS Delhi is renowned as the highest Return on Investment (ROI) business school in the world, charging only ~Rs 2 Lakhs for its entire 2-year full-time MBA program while delivering average salaries exceeding 34 LPA.",
    averagePackage: 3410000,
    highestPackage: 12300000,
    establishedYear: 1954,
    type: "Government",
    websiteUrl: "http://fms.edu",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Master of Business Administration (Full Time MBA)", degree: "MBA", duration: "2 Years", fees: 100000, seats: 250 },
      { name: "MBA Executive (Evening)", degree: "Executive MBA", duration: "2 Years", fees: 120000, seats: 180 }
    ],
    reviews: [
      { rating: 5.0, comment: "Insane ROI. You pay around 2 Lakhs total tuition and walk away with a 34 LPA salary offer in marketing or consulting.", authorName: "Naman Kapoor", authorRole: "FMS MBA, 2024" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "Full Time MBA", category: "General", minRank: 99, maxRank: 100, year: 2024 }
    ]
  },

  // 19. XLRI Jamshedpur
  {
    name: "XLRI Xavier School of Management",
    slug: "xlri-jamshedpur",
    location: "Jamshedpur, Jharkhand",
    state: "Jharkhand",
    city: "Jamshedpur",
    fees: 1350000,
    rating: 4.8,
    overview: "India's oldest management institute founded in 1949, XLRI is globally recognized as the top school for Human Resource Management (HRM) and Business Management (BM), delivering ethical and value-based business leaders.",
    averagePackage: 3270000,
    highestPackage: 11000000,
    establishedYear: 1949,
    type: "Private",
    websiteUrl: "https://www.xlri.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Diploma in Management (Human Resource)", degree: "MBA", duration: "2 Years", fees: 1350000, seats: 180 },
      { name: "Post Graduate Diploma in Management (Business Management)", degree: "MBA", duration: "2 Years", fees: 1350000, seats: 180 }
    ],
    reviews: [
      { rating: 4.9, comment: "The XLRI culture and brotherhood (Xlers for life) is real. The undisputed king of HR in Asia.", authorName: "Ananya Roy", authorRole: "PGDM-HRM, 2023" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "Business Management (BM)", category: "General", minRank: 98, maxRank: 100, year: 2024 },
      { exam: "CAT", branch: "Human Resource Management (HRM)", category: "General", minRank: 96, maxRank: 99, year: 2024 }
    ]
  },

  // 20. SPJIMR Mumbai
  {
    name: "S.P. Jain Institute of Management and Research (SPJIMR)",
    slug: "spjimr-mumbai",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    fees: 1100000,
    rating: 4.7,
    overview: "Located in Andheri West, SPJIMR is recognized for its unique profile-based admissions, non-classroom experiential learning (DOCC and Abhyudaya initiatives), and strong placement records in FMCG, consulting, and tech.",
    averagePackage: 3300000,
    highestPackage: 7780000,
    establishedYear: 1981,
    type: "Private",
    websiteUrl: "https://www.spjimr.org",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Diploma in Management (PGDM)", degree: "MBA", duration: "2 Years", fees: 1100000, seats: 240 },
      { name: "Post Graduate Management Programme for Women (PGMPW)", degree: "MBA", duration: "11 Months", fees: 950000, seats: 60 }
    ],
    reviews: [
      { rating: 4.8, comment: "Amazing focus on value-based growth. FMCG brand management placements are amongst the best in India.", authorName: "Kunal Shah", authorRole: "PGDM Marketing, 2024" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "PGDM (Finance/Marketing/Ops/Info)", category: "General", minRank: 95, maxRank: 99, year: 2024 }
    ]
  },

  // 21. AIIMS New Delhi
  {
    name: "All India Institute of Medical Sciences (AIIMS New Delhi)",
    slug: "aiims-new-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees: 1650,
    rating: 5.0,
    overview: "AIIMS New Delhi is the most prestigious medical institute and hospital in India, established as an institution of national importance. Offering virtually free world-class medical education, massive clinical exposure, and pioneer biomedical research.",
    averagePackage: 1800000,
    highestPackage: 4500000,
    establishedYear: 1956,
    type: "Government",
    websiteUrl: "https://www.aiims.edu",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)", degree: "MBBS", duration: "5.5 Years", fees: 1650, seats: 125 },
      { name: "Doctor of Medicine (MD) in Internal Medicine", degree: "MD", duration: "3 Years", fees: 2000, seats: 30 },
      { name: "Master of Surgery (MS) in General Surgery", degree: "MS", duration: "3 Years", fees: 2000, seats: 25 }
    ],
    reviews: [
      { rating: 5.0, comment: "The pinnacle of medical science in South Asia. The clinical exposure you get handling rare diseases is unmatched on Earth.", authorName: "Dr. Alok Sen", authorRole: "MBBS, Resident Doctor" },
      { rating: 5.0, comment: "Nominal fees of under Rs 2000 per year with top stipend during internship. The ultimate dream for every NEET aspirant.", authorName: "Dr. Sneha Paul", authorRole: "MBBS Batch of 2023" }
    ],
    cutoffs: [
      { exam: "NEET", branch: "MBBS", category: "General", minRank: 1, maxRank: 55, year: 2024 }
    ]
  },

  // 22. CMC Vellore
  {
    name: "Christian Medical College (CMC Vellore)",
    slug: "cmc-vellore",
    location: "Vellore, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Vellore",
    fees: 52000,
    rating: 4.9,
    overview: "CMC Vellore is an internationally acclaimed medical college and tertiary care hospital, celebrated for patient-centric care, exceptional clinical training, pioneering surgical breakthroughs, and community health services.",
    averagePackage: 1500000,
    highestPackage: 3800000,
    establishedYear: 1900,
    type: "Private",
    websiteUrl: "https://www.cmch-vellore.edu",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "MBBS (Bachelor of Medicine and Bachelor of Surgery)", degree: "MBBS", duration: "5.5 Years", fees: 52000, seats: 100 },
      { name: "B.Sc Nursing", degree: "B.Sc", duration: "4 Years", fees: 38000, seats: 100 }
    ],
    reviews: [
      { rating: 5.0, comment: "The culture of compassion, ethics, and hands-on doctor-patient mentorship is gold standard.", authorName: "Dr. Rachel Thomas", authorRole: "MBBS, 2023" }
    ],
    cutoffs: [
      { exam: "NEET", branch: "MBBS", category: "General", minRank: 50, maxRank: 350, year: 2024 }
    ]
  },

  // 23. JIPMER Puducherry
  {
    name: "Jawaharlal Institute of Postgraduate Medical Education & Research (JIPMER)",
    slug: "jipmer-puducherry",
    location: "Puducherry, Puducherry",
    state: "Puducherry",
    city: "Puducherry",
    fees: 14000,
    rating: 4.8,
    overview: "JIPMER Puducherry is an Institution of National Importance under the Ministry of Health and Family Welfare. It is a premier center of medical education, advanced clinical diagnostics, and public healthcare research in South India.",
    averagePackage: 1600000,
    highestPackage: 4200000,
    establishedYear: 1823,
    type: "Government",
    websiteUrl: "https://jipmer.edu.in",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "MBBS", degree: "MBBS", duration: "5.5 Years", fees: 14000, seats: 200 },
      { name: "MD in Pediatrics", degree: "MD", duration: "3 Years", fees: 16000, seats: 20 }
    ],
    reviews: [
      { rating: 4.9, comment: "French colonial vibe in Pondicherry combined with high-intensity medical education. State-of-the-art super specialty wing.", authorName: "Dr. K. Vignesh", authorRole: "MBBS, 2024" }
    ],
    cutoffs: [
      { exam: "NEET", branch: "MBBS", category: "General", minRank: 80, maxRank: 400, year: 2024 }
    ]
  },

  // 24. KGMU Lucknow
  {
    name: "King George's Medical University (KGMU)",
    slug: "kgmu-lucknow",
    location: "Lucknow, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Lucknow",
    fees: 54000,
    rating: 4.7,
    overview: "One of the most historic and largest medical schools in Northern India, KGMU boasts over 4,500 hospital beds and immense clinical exposure across every medical and surgical sub-specialty.",
    averagePackage: 1400000,
    highestPackage: 3500000,
    establishedYear: 1905,
    type: "Government",
    websiteUrl: "https://www.kgmu.org",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "MBBS", degree: "MBBS", duration: "5.5 Years", fees: 54000, seats: 250 },
      { name: "BDS (Bachelor of Dental Surgery)", degree: "BDS", duration: "5 Years", fees: 48000, seats: 70 }
    ],
    reviews: [
      { rating: 4.8, comment: "Massive patient inflow gives students unmatched hands-on procedural experience from 3rd year itself.", authorName: "Dr. Amit Mishra", authorRole: "MBBS, 2023" }
    ],
    cutoffs: [
      { exam: "NEET", branch: "MBBS", category: "General", minRank: 450, maxRank: 1800, year: 2024 }
    ]
  },

  // 25. Kasturba Medical College (KMC Manipal)
  {
    name: "Kasturba Medical College (KMC Manipal)",
    slug: "kmc-manipal",
    location: "Manipal, Karnataka",
    state: "Karnataka",
    city: "Manipal",
    fees: 1780000,
    rating: 4.7,
    overview: "KMC Manipal was the first self-financing medical college in India and ranks consistently among the top 10 medical colleges nationwide. It has world-class simulation labs, anatomy museums, and global residency match rates in the US (USMLE) and UK (PLAB).",
    averagePackage: 1550000,
    highestPackage: 4000000,
    establishedYear: 1953,
    type: "Private",
    websiteUrl: "https://manipal.edu/kmc-manipal.html",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "MBBS", degree: "MBBS", duration: "5.5 Years", fees: 1780000, seats: 250 },
      { name: "MD in Radiodiagnosis", degree: "MD", duration: "3 Years", fees: 2800000, seats: 12 }
    ],
    reviews: [
      { rating: 4.8, comment: "World-class simulation center and library. Incredible international recognition if you plan for USMLE.", authorName: "Dr. Neil D'Souza", authorRole: "MBBS, 2024" }
    ],
    cutoffs: [
      { exam: "NEET", branch: "MBBS", category: "General", minRank: 5000, maxRank: 48000, year: 2024 }
    ]
  },

  // 26. IIT Kharagpur
  {
    name: "Indian Institute of Technology Kharagpur (IIT KGP)",
    slug: "iit-kharagpur",
    location: "Kharagpur, West Bengal",
    state: "West Bengal",
    city: "Kharagpur",
    fees: 220000,
    rating: 4.8,
    overview: "The first IIT to be established (1951), IIT Kharagpur has the largest campus (2,100 acres), the most departments, and the largest student body among all IITs, featuring pioneering courses in AI, Law, and Medicine.",
    averagePackage: 2150000,
    highestPackage: 26000000,
    establishedYear: 1951,
    type: "Government",
    websiteUrl: "http://www.iitkgp.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 130 },
      { name: "B.Tech in Electronics and Electrical Communication", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 120 },
      { name: "B.Tech in Ocean Engineering and Naval Architecture", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 45 }
    ],
    reviews: [
      { rating: 4.9, comment: "Illumination festival, Spring Fest, and hall culture are pure magic. Huge alumni base across every global industry.", authorName: "Anirban Bhattacharya", authorRole: "B.Tech CSE, 2023" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 150, maxRank: 410, year: 2024 },
      { exam: "JEE Main", branch: "Electronics & Electrical Communication", category: "General", minRank: 450, maxRank: 1200, year: 2024 },
      { exam: "JEE Main", branch: "Mechanical Engineering", category: "General", minRank: 1400, maxRank: 3800, year: 2024 }
    ]
  },

  // 27. IIT Kanpur
  {
    name: "Indian Institute of Technology Kanpur (IITK)",
    slug: "iit-kanpur",
    location: "Kanpur, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Kanpur",
    fees: 220000,
    rating: 4.8,
    overview: "IIT Kanpur is renowned for introducing Computer Science education to India in 1963. With its own flight airstrip, world-class cybersecurity centers (C3iHub), and strong theoretical sciences culture, IITK is a technical titan.",
    averagePackage: 2250000,
    highestPackage: 23000000,
    establishedYear: 1959,
    type: "Government",
    websiteUrl: "https://www.iitk.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 120 },
      { name: "B.Tech in Aerospace Engineering", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 60 }
    ],
    reviews: [
      { rating: 4.9, comment: "Academic freedom is unbelievable. You can take any minor you want. Best cybersecurity and AI research labs.", authorName: "Utkarsh Pandey", authorRole: "B.Tech CSE, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 80, maxRank: 230, year: 2024 },
      { exam: "JEE Main", branch: "Electrical Engineering", category: "General", minRank: 400, maxRank: 1300, year: 2024 }
    ]
  },

  // 28. IIT Roorkee
  {
    name: "Indian Institute of Technology Roorkee (IITR)",
    slug: "iit-roorkee",
    location: "Roorkee, Uttarakhand",
    state: "Uttarakhand",
    city: "Roorkee",
    fees: 220000,
    rating: 4.8,
    overview: "Founded in 1847 as the Thomason College of Civil Engineering, IIT Roorkee is the oldest technical institution in Asia. Situated near the Himalayas, it blends historical grandeur with ultra-modern computing, hydro-engineering, and robotics.",
    averagePackage: 1980000,
    highestPackage: 20500000,
    establishedYear: 1847,
    type: "Government",
    websiteUrl: "https://www.iitr.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Data Science and Artificial Intelligence", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 50 },
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 220000, seats: 110 }
    ],
    reviews: [
      { rating: 4.8, comment: "Iconic James Thomason building and serene Himalayan foothills backdrop. Placements are top notch.", authorName: "Simran Kaur", authorRole: "B.Tech DSAI, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 200, maxRank: 450, year: 2024 },
      { exam: "JEE Main", branch: "Data Science and AI", category: "General", minRank: 350, maxRank: 780, year: 2024 }
    ]
  },

  // 29. BITS Pilani (Goa Campus)
  {
    name: "BITS Pilani, K.K. Birla Goa Campus",
    slug: "bits-goa",
    location: "Goa, Goa",
    state: "Goa",
    city: "Goa",
    fees: 545000,
    rating: 4.7,
    overview: "Nestled along the scenic Zuari river in Goa, this BITS campus provides identical degree credentials, the famed zero attendance policy, high-powered coding culture, and stellar placements on par with Pilani campus.",
    averagePackage: 1850000,
    highestPackage: 6050000,
    establishedYear: 2004,
    type: "Private",
    websiteUrl: "https://www.bits-pilani.ac.in/goa/",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.E. in Computer Science", degree: "B.E.", duration: "4 Years", fees: 545000, seats: 160 },
      { name: "B.E. in Electronics and Communication", degree: "B.E.", duration: "4 Years", fees: 545000, seats: 130 }
    ],
    reviews: [
      { rating: 4.8, comment: "Beautiful campus, vibrant tech fests like Quark and Waves, zero attendance freedom.", authorName: "Aman Tandon", authorRole: "B.E. CS, 2023" }
    ],
    cutoffs: [
      { exam: "BITSAT", branch: "Computer Science", category: "General", minRank: 300, maxRank: 350, year: 2024 },
      { exam: "JEE Main", branch: "Computer Science Equivalent", category: "General", minRank: 2000, maxRank: 7500, year: 2024 }
    ]
  },

  // 30. NIT Warangal
  {
    name: "National Institute of Technology Warangal (NITW)",
    slug: "nit-warangal",
    location: "Warangal, Telangana",
    state: "Telangana",
    city: "Warangal",
    fees: 165000,
    rating: 4.7,
    overview: "The first Regional Engineering College (REC) founded in 1959 by Pandit Jawaharlal Nehru, NIT Warangal is one of India's elite engineering schools, known for strong coding culture and top campus recruitments.",
    averagePackage: 1520000,
    highestPackage: 8800000,
    establishedYear: 1959,
    type: "Government",
    websiteUrl: "https://www.nitw.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Engineering", degree: "B.Tech", duration: "4 Years", fees: 165000, seats: 130 },
      { name: "B.Tech in Electronics and Communication", degree: "B.Tech", duration: "4 Years", fees: 165000, seats: 120 }
    ],
    reviews: [
      { rating: 4.7, comment: "Strong academic culture and massive placements across Google, Amazon, Microsoft, and Qualcomm.", authorName: "Srikanth V", authorRole: "B.Tech CSE, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and Engineering", category: "General", minRank: 900, maxRank: 3200, year: 2024 },
      { exam: "JEE Main", branch: "Electronics & Communication", category: "General", minRank: 3500, maxRank: 7800, year: 2024 }
    ]
  },

  // 31. IIIT Delhi
  {
    name: "Indraprastha Institute of Information Technology Delhi (IIIT-D)",
    slug: "iiit-delhi",
    location: "New Delhi, Delhi",
    state: "Delhi",
    city: "New Delhi",
    fees: 420000,
    rating: 4.7,
    overview: "IIIT-Delhi is a research-led state university in Okhla, New Delhi. Renowned for its cutting-edge specializations combining Computer Science with AI, Biosciences, Design, and Social Sciences.",
    averagePackage: 2050000,
    highestPackage: 5130000,
    establishedYear: 2008,
    type: "Autonomous",
    websiteUrl: "https://www.iiitd.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "B.Tech in Computer Science and Applied Mathematics (CSAM)", degree: "B.Tech", duration: "4 Years", fees: 420000, seats: 75 },
      { name: "B.Tech in Computer Science and Artificial Intelligence (CSAI)", degree: "B.Tech", duration: "4 Years", fees: 420000, seats: 75 },
      { name: "B.Tech in Computer Science and Design (CSD)", degree: "B.Tech", duration: "4 Years", fees: 420000, seats: 75 }
    ],
    reviews: [
      { rating: 4.8, comment: "Unparalleled research focus. If you love Machine Learning or HCI design, IIIT Delhi offers world-class faculty.", authorName: "Tanya Aggarwal", authorRole: "B.Tech CSAI, 2024" }
    ],
    cutoffs: [
      { exam: "JEE Main", branch: "Computer Science and AI", category: "General", minRank: 2500, maxRank: 8500, year: 2024 },
      { exam: "JEE Main", branch: "Computer Science & Applied Math", category: "General", minRank: 4000, maxRank: 12500, year: 2024 }
    ]
  },

  // 32. IIM Lucknow
  {
    name: "Indian Institute of Management Lucknow (IIML)",
    slug: "iim-lucknow",
    location: "Lucknow, Uttar Pradesh",
    state: "Uttar Pradesh",
    city: "Lucknow",
    fees: 1100000,
    rating: 4.8,
    overview: "Established in 1984 as the fourth IIM, Hel(L) is famous for its intense, transformative curriculum, world-class agribusiness management, and dominant placement records in consulting, FMCG, and BFSI.",
    averagePackage: 3000000,
    highestPackage: 10000000,
    establishedYear: 1984,
    type: "Government",
    websiteUrl: "https://www.iiml.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Programme in Management (PGP)", degree: "MBA", duration: "2 Years", fees: 1100000, seats: 480 },
      { name: "Post Graduate Programme in Agribusiness Management (PGP-ABM)", degree: "MBA", duration: "2 Years", fees: 1050000, seats: 55 }
    ],
    reviews: [
      { rating: 4.9, comment: "Rigorous academic schedule that truly prepares you for C-suite corporate life. Top consulting recruiters flock here.", authorName: "Kunal Bansal", authorRole: "PGP, 2023" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "PGP (MBA)", category: "General", minRank: 98, maxRank: 100, year: 2024 }
    ]
  },

  // 33. IIM Kozhikode
  {
    name: "Indian Institute of Management Kozhikode (IIMK)",
    slug: "iim-kozhikode",
    location: "Kozhikode, Kerala",
    state: "Kerala",
    city: "Kozhikode",
    fees: 1075000,
    rating: 4.8,
    overview: "Perched on two picturesque hillocks in God's Own Country, IIM Kozhikode is an institute of national importance famous for pioneering gender diversity, liberal studies, and stellar corporate placement seasons.",
    averagePackage: 2950000,
    highestPackage: 7200000,
    establishedYear: 1996,
    type: "Government",
    websiteUrl: "https://www.iimk.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Programme (PGP)", degree: "MBA", duration: "2 Years", fees: 1075000, seats: 480 },
      { name: "Post Graduate Programme in Liberal Studies & Management", degree: "MBA", duration: "2 Years", fees: 1075000, seats: 50 }
    ],
    reviews: [
      { rating: 4.8, comment: "Breathtaking hilltop campus. Outstanding professors and strong focus on holistic management.", authorName: "Arunima Nair", authorRole: "PGP, 2024" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "PGP (MBA)", category: "General", minRank: 97, maxRank: 100, year: 2024 }
    ]
  },

  // 34. IIM Indore
  {
    name: "Indian Institute of Management Indore (IIMI)",
    slug: "iim-indore",
    location: "Indore, Madhya Pradesh",
    state: "Madhya Pradesh",
    city: "Indore",
    fees: 1050000,
    rating: 4.7,
    overview: "Situated on Prabandh Shikhar hill in Indore, IIM Indore holds the rare Triple Crown accreditation (AACSB, AMBA, EQUIS). It pioneered the 5-year Integrated Programme in Management (IPM).",
    averagePackage: 2560000,
    highestPackage: 10000000,
    establishedYear: 1996,
    type: "Government",
    websiteUrl: "https://www.iimidr.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Programme in Management (PGP)", degree: "MBA", duration: "2 Years", fees: 1050000, seats: 480 },
      { name: "Integrated Programme in Management (IPM)", degree: "Integrated MBA", duration: "5 Years", fees: 850000, seats: 150 }
    ],
    reviews: [
      { rating: 4.7, comment: "Triple Crown accreditation gives enormous global value. Indore city offers clean environment and rich culture.", authorName: "Manish Solanki", authorRole: "PGP, 2023" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "PGP (MBA)", category: "General", minRank: 97, maxRank: 100, year: 2024 }
    ]
  },

  // 35. MDI Gurgaon
  {
    name: "Management Development Institute (MDI Gurgaon)",
    slug: "mdi-gurgaon",
    location: "Gurugram, Haryana",
    state: "Haryana",
    city: "Gurugram",
    fees: 1180000,
    rating: 4.7,
    overview: "Located in the heart of Millennium City Gurugram, MDI Gurgaon offers unrivaled industry interface with corporate headquarters, Fortune 500 tech firms, and consulting leaders situated next door.",
    averagePackage: 2760000,
    highestPackage: 6300000,
    establishedYear: 1973,
    type: "Private",
    websiteUrl: "https://www.mdi.ac.in",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "Post Graduate Diploma in Management (PGDM)", degree: "MBA", duration: "2 Years", fees: 1180000, seats: 240 },
      { name: "PGDM in Human Resource Management (PGDM-HRM)", degree: "MBA", duration: "2 Years", fees: 1180000, seats: 60 },
      { name: "PGDM in International Business (PGDM-IB)", degree: "MBA", duration: "2 Years", fees: 1400000, seats: 60 }
    ],
    reviews: [
      { rating: 4.8, comment: "Being in Gurgaon means guest lectures from top CXOs every single week. Placements are super rapid.", authorName: "Rishabh Sethi", authorRole: "PGDM, 2024" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "PGDM", category: "General", minRank: 95, maxRank: 99, year: 2024 }
    ]
  },

  // 36. Madras Medical College (MMC Chennai)
  {
    name: "Madras Medical College (MMC Chennai)",
    slug: "mmc-chennai",
    location: "Chennai, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Chennai",
    fees: 18000,
    rating: 4.8,
    overview: "Established in 1835, Madras Medical College is the third oldest medical college in India and one of the most revered medical teaching institutions in the Commonwealth, associated with the historic Rajiv Gandhi Government General Hospital.",
    averagePackage: 1480000,
    highestPackage: 3600000,
    establishedYear: 1835,
    type: "Government",
    websiteUrl: "http://www.mmc.tn.gov.in",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "MBBS", degree: "MBBS", duration: "5.5 Years", fees: 18000, seats: 250 },
      { name: "MD in General Medicine", degree: "MD", duration: "3 Years", fees: 25000, seats: 35 }
    ],
    reviews: [
      { rating: 4.9, comment: "Incredible legacy. You see thousands of clinical pathology cases daily at RGGGH.", authorName: "Dr. K. Saravanan", authorRole: "MBBS, 2023" }
    ],
    cutoffs: [
      { exam: "NEET", branch: "MBBS", category: "General", minRank: 200, maxRank: 1200, year: 2024 }
    ]
  },

  // 37. Grant Government Medical College (Mumbai)
  {
    name: "Grant Government Medical College and Sir JJ Group of Hospitals",
    slug: "grant-medical-college-mumbai",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    fees: 115000,
    rating: 4.7,
    overview: "Founded in 1845, Grant Medical College is a premier medical institution in Mumbai affiliated with the Maharashtra University of Health Sciences. Its attached Sir JJ Group of Hospitals has a 2,800+ bed capacity.",
    averagePackage: 1500000,
    highestPackage: 3500000,
    establishedYear: 1845,
    type: "Government",
    websiteUrl: "https://ggmcjjh.com",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "MBBS", degree: "MBBS", duration: "5.5 Years", fees: 115000, seats: 250 },
      { name: "MS in Orthopaedics", degree: "MS", duration: "3 Years", fees: 95000, seats: 18 }
    ],
    reviews: [
      { rating: 4.8, comment: "Sir JJ Hospital handles some of the most critical trauma cases in western India. Unrivaled surgical training.", authorName: "Dr. Pratik Shinde", authorRole: "MBBS, 2024" }
    ],
    cutoffs: [
      { exam: "NEET", branch: "MBBS", category: "General", minRank: 300, maxRank: 1900, year: 2024 }
    ]
  },

  // 38. SIBM Pune (Symbiosis)
  {
    name: "Symbiosis Institute of Business Management (SIBM Pune)",
    slug: "sibm-pune",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    city: "Pune",
    fees: 1280000,
    rating: 4.6,
    overview: "SIBM Pune, the flagship business school of Symbiosis International University, is perched atop the scenic Lavale hills. Celebrated for strong student-driven leadership, high marketing and HR placements, and state-of-the-art campus.",
    averagePackage: 2810000,
    highestPackage: 4900000,
    establishedYear: 1978,
    type: "Private",
    websiteUrl: "https://www.sibm.edu",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
    courses: [
      { name: "MBA (Master of Business Administration)", degree: "MBA", duration: "2 Years", fees: 1280000, seats: 180 },
      { name: "MBA in Innovation and Entrepreneurship", degree: "MBA", duration: "2 Years", fees: 1100000, seats: 60 }
    ],
    reviews: [
      { rating: 4.7, comment: "The hilltop Lavale campus is one of the most picturesque in India. Stellar marketing brands recruit here every year.", authorName: "Ritika Sen", authorRole: "MBA Marketing, 2024" }
    ],
    cutoffs: [
      { exam: "CAT", branch: "MBA", category: "General", minRank: 92, maxRank: 98, year: 2024 }
    ]
  }
];
