export type Lang = "en" | "ar" | "tr";

export const translations = {
  en: {
    nav: {
      home: "Home",
      solutions: "Solutions",
      vision: "Vision",
      projects: "Projects",
      blog: "Insights",
      contact: "Contact",
      cta: "Get Started →",
    },
    home: {
      eyebrow: "✦ IT Services & Infrastructure",
      h1: ["Engineering", "Reliable Digital", "Infrastructure"],
      sub: "Supportiva delivers enterprise-grade IT solutions that help organizations modernize infrastructure, strengthen security, and scale with confidence.",
      btn1: "Learn More →",
      btn2: "View Projects",
      whoWeAreTitle: "Who We Are",
      whoWeAreText: "Supportiva is a technology partner focused on delivering secure, scalable, and operationally efficient IT solutions. Our engineers bring years of field experience across enterprise infrastructure, cloud, networking, and end-user support.",
      ourServicesTitle: "Our Services",
      ourServicesText: "From cloud transformation and datacenter infrastructure to managed IT operations, Supportiva provides end-to-end technology services tailored to modern business needs.",
      ourServicesBtn: "Learn More →",
      stats: [
        { val: "11+", label: "Years Experience" },
        { val: "300+", label: "Support Hrs/mo" },
        { val: "27+", label: "Projects Done" },
        { val: "9", label: "Locations" },
      ],
      dash: {
        title: "Infrastructure Dashboard",
        live: "Live",
        metrics: [
          { label: "Uptime", val: "99.97%", sub: "Last 90 days", color: "green" },
          { label: "Cloud", val: "Active", sub: "AWS + Azure", color: "cyan" },
          { label: "Tickets", val: "3", sub: "High priority", color: "amber" },
          { label: "Engineers", val: "12", sub: "Available now", color: "blue" },
        ],
        activity: "Weekly Activity",
        statuses: [
          { label: "Datacenter", val: "Operational", color: "green" },
          { label: "IT Support", val: "24/7 Active", color: "green" },
          { label: "Security", val: "Secure", color: "cyan" },
        ],
      },
      trustedBy: "TRUSTED BY",
      clients: ["Dow", "Medtronic", "Mercedes-Benz", "Viatris"],
      servicesLabel: "SERVICES",
      servicesTitle: "Enterprise IT Services",
      servicesAll: "All Solutions →",
      services: [
        { icon: "🖥", title: "Cloud Services", desc: "Our cloud services help you modernize your IT infrastructure and take advantage of the latest technology. We offer cloud upgrade, cloud strategy planning, and cloud security services to ensure your business is always protected.", tag: "Cloud · Upgrade · Security", color: "blue" },
        { icon: "⚡", title: "Staff Augmentation", desc: "Unlock the power of a skilled and dynamic workforce through our resource augmentation services. We align top-tier IT professionals with your unique needs, ensuring seamless collaboration and project success.", tag: "On-demand · Scalable", color: "cyan" },
        { icon: "🏗", title: "Datacenter Infrastructure", desc: "Trust Supportiva to architect, implement, and optimize your data center infrastructure. We bring expertise to every facet, from design to deployment, ensuring a robust foundation for your digital operations.", tag: "Design · Deploy · Optimize", color: "amber" },
        { icon: "🛡", title: "IT Support Services", desc: "We provide comprehensive IT support services that are designed to keep your business running smoothly. Our team of experts is available 24/7 to provide you with the support you need, when you need it.", tag: "24/7 · Enterprise SLA", color: "green" },
      ],
      statsBar: [
        { val: "11+", label: "Years of Experience", sub: "Delivering enterprise IT " },
        { val: "300+", label: "Monthly Supported Hours", sub: "Proactive monitoring & response" },
        { val: "27+", label: "Clients Served", sub: "SMB to Fortune 500" },
        { val: "27+", label: "Projects Completed", sub: "Delivered on time and budget" },
        { val: "9", label: "Locations", sub: "US, Europe & beyond" },
      ],
      whyLabel: "WHY SUPPORTIVA",
      whyUsLabel: "Why Us",
      fieldNote: "Field Note — Nike Turkey Upgrade",
      readCase: "Read the case",
      getInTouchLabel: "Get In Touch",
      responseTime: "Response time — under 24 hrs",
      letsBuild: "Let's build something",
      worthKeeping: "worth keeping.",
      whyTitle: "Your Strategic Partner For Real Digital Transformation.",
      whySub: "At Supportiva, we deliver exceptional IT services that drive business growth. Customized solutions that empower your business.",
      whyBtn: "Our Vision →",
      timeline: [
        { title: "Enterprise-Grade SLAs", desc: "99.9% uptime commitment backed by real support teams.", color: "blue" },
        { title: "Certified Engineers", desc: "AWS, Azure and Cisco certified professionals on staff.", color: "cyan" },
        { title: "Multinational Experience", desc: "Projects delivered across 9 countries and cities worldwide.", color: "green" },
        { title: "Security & Compliance", desc: "Every solution built on zero-trust principles.", color: "amber" },
      ],
      testimonial: {
        quote: "\"Supportiva transformed our entire network infrastructure across 9 Nike Turkey stores in record time. Multinational team, flawless execution.\"",
        name: "Nike Turkey — IT Director",
        role: "Multi-site Upgrade Project",
      },
      ctaTitle: "Ready to Modernize Your IT Operations?",
      ctaSub: "At Supportiva, we are committed to helping businesses succeed. Contact us today to learn more about our IT solutions and how we can help you gain a competitive edge in the market.",
      ctaBtn1: "Get Started",
      ctaBtn2: "Learn More",
    },
solutions: {
  eyebrow: "Our Solutions",

  h1: "Enterprise IT Solutions Built for Modern Infrastructure",

  sub: "Reliable infrastructure, secure networks, and scalable IT services designed to support your business operations.",

  label: "OUR SERVICES",

  ctaFallback: "Contact Us →",

  services: [
    {
      icon: "☁",
      color: "blue",
      title: "Cloud Solutions",
      desc: "We help organizations modernize their infrastructure through cloud adoption, hybrid environments, and performance optimization across AWS and Azure.",
      tag: "AWS · Azure · Hybrid",
      bullets: [
        "Cloud readiness assessment",
        "Hybrid & multi-cloud solutions",
        "Cloud deployment",
        "Cost optimization"
      ]
    },

    {
      icon: "🏗",
      color: "amber",
      title: "Datacenter Infrastructure",
      desc: "We design, deploy, and optimize data center environments that support reliable and scalable operations.",
      tag: "Design · Deploy · Optimize",
      bullets: [
        "Rack & stack services",
        "Power & cooling design",
        "Capacity planning",
        "Testing & handover"
      ]
    },

    {
      icon: "🛡",
      color: "purple",
      title: "Network Security",
      desc: "Protect your infrastructure with enterprise-grade security solutions delivered by certified engineers.",
      tag: "Firewall · IDS/IPS · Zero-Trust",
      bullets: [
        "Firewall deployment",
        "VPN & network segmentation",
        "IDS/IPS monitoring",
        "Access control"
      ]
    },

    {
      icon: "🖥",
      color: "green",
      title: "IT Support",
      desc: "Comprehensive IT support services that help maintain operational continuity and reduce downtime.",
      tag: "24/7 · Help Desk · Maintenance",
      bullets: [
        "24/7 monitoring",
        "L1 / L2 support",
        "Patch management",
        "Hardware maintenance"
      ]
    },

    {
      icon: "🔌",
      color: "cyan",
      title: "Cabling Solutions",
      desc: "Structured cabling services designed to ensure organized, reliable, and scalable connectivity.",
      tag: "Structured · Fiber · Labeled",
      bullets: [
        "Structured cabling",
        "Fiber & copper installation",
        "Patch panel configuration",
        "Documentation"
      ]
    },

    {
      icon: "⚡",
      color: "blue-light",
      title: "Staff Augmentation",
      desc: "We provide skilled IT professionals to support short-term projects and long-term operational needs.",
      tag: "On-demand · Scalable · Certified",
      bullets: [
        "On-demand engineers",
        "Certified professionals",
        "Project-based staffing",
        "On-site or remote support"
      ]
    }
  ],

  whyTitle: "Why Supportiva?",

  whyDesc: "We deliver practical IT solutions that help organizations improve performance, maintain uptime, and scale with confidence.",

  whyPoints: [
    "Solutions tailored to your operational needs",
    "Certified engineers with 11+ years of experience",
    "Project delivery across 9 global locations",
    "24/7 support availability"
  ],

  processLabel: "OUR PROCESS",

  processTitle: "How we work.",

  processSteps: [
    {
      title: "Assessment",
      desc: "We evaluate your infrastructure requirements.",
      color: "blue"
    },
    {
      title: "Planning",
      desc: "We design the right solution and deployment roadmap.",
      color: "cyan"
    },
    {
      title: "Implementation",
      desc: "Our engineers execute deployment efficiently.",
      color: "green"
    },
    {
      title: "Support",
      desc: "Ongoing maintenance and optimization.",
      color: "amber"
    }
  ],

  cta: "Contact Our Team →"
},
    vision: {
      eyebrow: "Our Vision",
      h1: "IT Services for Your Business",
      missionTitle: "Our Story",
      mission1: "At Supportiva, we have a passion for technology and helping businesses succeed. Our company was founded by a team of experienced IT professionals who saw a need for high-quality IT consulting services in the industry. We have since grown into a provider of IT solutions, with a focus on delivering exceptional customer service and support.",
      mission2: "Our mission is to help businesses harness the power of technology to achieve their goals and stay ahead of the competition.",
      watchLabel: "Watch: Our Story",
      valuesLabel: "OUR VALUES",
      stats: [
        { val: "11+", label: "Years in Business" },
        { val: "9", label: "Global Locations" },
        { val: "27+", label: "Projects Delivered" },
        { val: "100%", label: "Client Retention" },
      ],
      values: [
        { icon: "🎯", title: "Precision", desc: "Every deployment planned to the last detail. We never cut corners.", color: "blue" },
        { icon: "🤝", title: "Partnership", desc: "We become an extension of your team, not just another vendor.", color: "cyan" },
        { icon: "🌱", title: "Sustainability", desc: "Eco-friendly IT practices including responsible device recycling and Go Green decommissioning.", color: "green" },
      ],
    },
    projects: {
      eyebrow: "Our Projects",
      h1: ["Our", "Projects"],
      h1Lead: "Real projects,",
      h1Highlight: "real results.",
      sub: "From enterprise infrastructure upgrades to data center deployments — executed by our engineering teams on-site",
      countOne: "Project",
      countMany: "Projects",
      emptyCategory: "No projects in this category.",
      emptyDetail: "Select a project",
      categories: {
        all: "All",
        upgrade: "Upgrade",
        datacenter: "Datacenter",
        support: "Support",
        network: "Network",
        sustainability: "Sustainability",
      },
      caseStudy: "Case Study",
      backToProjects: "Back to Projects",
      overview: "Overview",
      whatWeDid: "What we did",
      atAGlance: "At a Glance",
      location: "Location",
      year: "Year",
      outcome: "Outcome",
      services: "Services",
      similarChallenge: "Facing a Similar Challenge?",
      similarChallengeSub: "Tell us about your project — we typically respond within one business day.",
      startConversation: "Start the Conversation",
      nextStep: "Next Step",
      readyHeadline: "Ready for Results Like These?",
      readySub: "Speak with our engineering team about your upgrade, data center, or network project.",
      readMore: "Read the full case",
      showFullDetails: "Show full details",
      showLess: "Show less",
      cta: "Start Your Project →",
    },
    blog: {
      eyebrow: "The S Blog",
      h1: ["Maximize Your Business", "Potential with Our IT Services"],
      sub: "Expert perspectives on cloud, infrastructure, networking, and enterprise IT — from our engineering teams.",
      author: "Team Supportiva",
      backToBlog: "Back to Blog",
      recentPosts: "Recent Posts",
      seeAll: "See All",
      featured: "FEATURED",
      readArticle: "Read article",
      newsletterTitle: "Stay in the loop",
      newsletterSub: "Get the latest IT insights from our field engineers, straight to your inbox.",
      posts: [
        { cat: "Infrastructure", slug: "unveiling-the-future-with-wifi-7-ruijie-s-rg-rap73hd-leads-the-charge", title: "Unveiling the Future with WiFi 7: Ruijie's RG-RAP73HD Leads the Charge", desc: "WiFi 7 is here and it's changing the game. Explore how Ruijie's latest access point delivers next-gen wireless performance with an innovative SFP+ port for fiber connectivity.", date: "Mar 1, 2024", read: "2 min read",
          body: [
            { type: "p", text: "In the rapidly evolving world of wireless technology, WiFi 7 marks the dawn of a new era. At the forefront of this revolution is Ruijie Networks, whose latest access point, the RG-RAP73HD, is the first to harness the full potential of WiFi 7, featuring an innovative SFP+ port for direct fiber connectivity." },
            { type: "p", text: "WiFi 7, officially known as 802.11be, brings significant improvements over its predecessor, WiFi 6. With higher data rates, increased capacity, and reduced latency, WiFi 7 is designed to handle data-intensive applications in dense public venues and private networks. The real-world benefits are tangible — smoother video streaming, more responsive gaming, and more efficient smart home devices." },
            { type: "p", text: "The RG-RAP73HD is Ruijie's latest access point, built to leverage WiFi 7 capabilities. The standout feature is the SFP+ port — a rarity in wireless access points — enabling direct fiber connections with higher data rates and longer transmission distances." },
            { type: "p", text: "In a data-driven age, the importance of fiber connectivity cannot be overstated. The bandwidth and reliability of fiber means the RG-RAP73HD can handle multiple high-bandwidth applications simultaneously, making it essential for businesses, educational institutions, and large households." },
            { type: "p", text: "The RG-RAP73HD represents a leap forward in wireless access technology. By combining WiFi 7's advanced features with fiber connectivity, it offers organizations looking to upgrade their IT infrastructure a glimpse into the future of networking." },
          ] },
        { cat: "Cloud", slug: "microsoft-s-copilot-the-future-of-productivity-unleashed", title: "Microsoft's Copilot: The Future of Productivity Unleashed", desc: "How Microsoft's AI-powered Copilot is transforming the way businesses work — integrated into Word, Excel, Outlook, and Teams.", date: "Feb 21, 2024", read: "2 min read",
          body: [
            { type: "p", text: "Microsoft's Copilot is a groundbreaking AI-powered assistant designed to transform how we interact with digital productivity tools. It's not just about enhancing efficiency — it's about redefining how we work." },
            { type: "h2", text: "Introducing Microsoft's Copilot" },
            { type: "p", text: "Copilot is integrated into Word, Excel, Outlook, and Teams. Using natural language processing (NLP) to understand and execute commands, it facilitates tasks from drafting emails to complex data analyses. It represents a leap towards intuitive, efficient, personalized computing." },
            { type: "h2", text: "Revolutionizing Productivity" },
            { type: "p", text: "Copilot adapts and learns from user interactions:" },
            { type: "ul", items: ["Word: assists with content creation, suggestions, and rewrites", "Excel: data analysis, turns complex datasets into visuals", "Outlook: drafting and organizing emails", "Teams: summarizing discussions, tracking tasks"] },
            { type: "p", text: "Copilot is a partner in productivity, enabling focus on strategic and creative endeavors." },
            { type: "h2", text: "The Workplace Transformed" },
            { type: "p", text: "Copilot heralds a new era by automating routine tasks, letting professionals dedicate more time to innovation and strategy. AI-human collaboration fosters enhanced efficiency and creativity." },
            { type: "h2", text: "Navigating Challenges" },
            { type: "p", text: "Privacy, security, and unbiased AI decisions are challenges Microsoft is addressing. The company is prioritizing user trust and responsible AI use to ensure productivity is enhanced ethically and securely." },
            { type: "h2", text: "Conclusion" },
            { type: "p", text: "Microsoft's Copilot is setting a new standard for digital productivity. We're invited to reimagine our relationship with technology, leveraging AI for a more efficient, creative work environment." },
          ] },
        { cat: "Infrastructure", slug: "infiniband-vs-ethernet", title: "InfiniBand VS Ethernet", desc: "A deep technical comparison of InfiniBand and Ethernet for data center networking — speed, latency, RDMA, and scalability.", date: "Feb 20, 2024", read: "3 min read",
          body: [
            { type: "p", text: "InfiniBand and Ethernet are two widely recognized networking technologies, each serving distinct purposes. Despite their common goal of facilitating data communication, they differ significantly in architecture, performance, application, and scalability." },
            { type: "h2", text: "Speed and Performance" },
            { type: "p", text: "InfiniBand delivers high throughput and low latency, ideal for HPC and data centers, with speeds up to 600 Gbps. It's best suited for scientific simulations, financial modeling, and large-scale databases. Ethernet, traditionally for general networking, has evolved from 10 Mbps to 400 Gbps but generally has higher latency." },
            { type: "h2", text: "Latency" },
            { type: "p", text: "InfiniBand is designed to minimize latency, featuring Remote Direct Memory Access (RDMA) — transferring data directly between memory of two computers without involving the CPU. Ethernet traditionally has higher latency, though advancements like RDMA over Converged Ethernet (RoCE) are narrowing the gap." },
            { type: "h2", text: "Usage and Application" },
            { type: "p", text: "InfiniBand is found in environments requiring maximum performance — HPC clusters, storage-focused data centers, and complex simulations. Ethernet is the backbone of most LANs, office environments, and internet connectivity, offering broad compatibility and easy integration." },
            { type: "h2", text: "Architecture and Scalability" },
            { type: "p", text: "InfiniBand uses a switched fabric network architecture that delivers consistent low latency and high bandwidth, scaling to thousands of nodes with minimal performance degradation. Ethernet's hierarchical, router-based architecture has been the foundation of networking for decades, supporting everything from small home networks to large enterprise systems." },
            { type: "h2", text: "Conclusion" },
            { type: "p", text: "Choosing between InfiniBand and Ethernet depends on speed, latency, application, and scalability requirements. InfiniBand excels for HPC and data-intensive applications, while Ethernet remains the versatile choice for general networking." },
          ] },
        { cat: "Cloud", slug: "the-evolution-of-cloud-computing-trends-and-predictions-for-the-future", title: "The Evolution of Cloud Computing: Trends and Predictions for the Future", desc: "From hybrid multi-cloud strategies to serverless computing and AI integration — the key trends shaping the future.", date: "Jan 23, 2024", read: "3 min read",
          body: [
            { type: "p", text: "Cloud computing has witnessed remarkable growth over the past decade, evolving from mere storage to a comprehensive platform driving business innovation. Understanding the evolving trends and their implications is crucial." },
            { type: "h2", text: "Hybrid and Multi-Cloud Strategies" },
            { type: "p", text: "Businesses are increasingly adopting hybrid and multi-cloud environments, using a mix of on-premise, public, and private clouds. This enhances flexibility and mitigates vendor lock-in risks, signifying a mature, thoughtful approach to cloud computing." },
            { type: "h2", text: "Cloud-Native Applications" },
            { type: "p", text: "The increasing adoption of cloud-native applications — designed to exploit scalability and elasticity — is a defining trend. These applications are more agile, scalable, and resilient than traditional apps, facilitating continuous delivery and deployment." },
            { type: "h2", text: "Serverless Computing" },
            { type: "p", text: "Serverless computing is reshaping application development. Developers build and run apps without managing infrastructure, with cloud providers handling resource allocation. Benefits include reduced costs, simplified scalability, and faster time-to-market." },
            { type: "h2", text: "AI Integration and Enhanced Security" },
            { type: "p", text: "AI integration into cloud computing will optimize resources, improve security, and offer insights through data analysis. Security is evolving with enhanced protocols, AI for predictive threat analysis, and robust encryption." },
            { type: "h2", text: "Impact on Industries" },
            { type: "p", text: "Cloud's impact extends far beyond IT. Healthcare is leveraging cloud for telemedicine, the financial sector for better customer experience. The widespread impact will only grow." },
            { type: "h2", text: "Conclusion" },
            { type: "p", text: "The cloud landscape is dynamic, and the future is bright with more innovation, efficiency, and growth opportunities. Companies must stay abreast of these trends to thrive in the digital age." },
          ] },
        { cat: "Upgrade", slug: "adopting-agility-in-it-daily-life", title: "Adopting Agility in IT Daily Life", desc: "A 15-step guide to adopting Agile principles and practices to enhance collaboration, flexibility, and responsiveness in IT teams.", date: "Nov 28, 2023", read: "3 min read",
          body: [
            { type: "p", text: "Adopting agility in the daily life of an IT team involves embracing Agile principles and practices to enhance collaboration, flexibility, and responsiveness. Here is a step-by-step guide:" },
            { type: "ol", items: ["Understand Agile Principles: Start by understanding the core principles of the Agile Manifesto — individuals and interactions, working solutions, and customer collaboration over processes and tools.", "Educate the Team: Conduct training sessions or workshops on Agile concepts, Scrum or Kanban frameworks, and the benefits of an Agile mindset.", "Define Clear Objectives: Articulate goals — improving delivery speed, enhancing collaboration, or responding more effectively to changing requirements.", "Select an Agile Framework: Choose Scrum, Kanban, or another framework that aligns with your team's goals.", "Identify Agile Champions: Designate coaches within the team with expertise in Agile methodologies to facilitate adoption.", "Start with a Pilot Project: Begin with a small, well-defined pilot to experiment with Agile practices in a controlled environment.", "Implement Scrum or Kanban Practices: Introduce Sprint Planning, Daily Standups, Sprint Reviews, and Retrospectives (Scrum) or visual boards and WIP limits (Kanban).", "Encourage Cross-Functional Collaboration: Break down silos and promote shared responsibility among team members with diverse skills.", "Prioritize Customer Feedback: Regularly gather input from stakeholders, end-users, and product owners to inform decisions.", "Implement CI/CD: Embrace continuous integration and continuous delivery to automate testing and deployment, reducing errors and enabling faster releases.", "Adapt and Iterate: Regularly review and reflect through retrospectives to identify areas for improvement.", "Provide Agile Tools: Equip the team with tools like Jira, Trello, or Azure DevOps to enhance collaboration and visibility.", "Celebrate Successes and Learn from Failures: Acknowledge achievements and use retrospectives to discuss what worked and what needs improvement.", "Scale Agile Gradually: Once successful in pilot projects, extend Agile practices across the organization.", "Encourage a Growth Mindset: Foster a culture of continuous learning where challenges are opportunities to innovate."] },
            { type: "p", text: "Adopting agility is a transformative journey requiring commitment, collaboration, and willingness to adapt. By following these steps and fostering an Agile mindset, IT teams can enhance delivery, respond to change, and thrive in dynamic environments." },
          ] },
        { cat: "Sustainability", slug: "the-role-of-it-in-ensuring-business-continuity", title: "The Role of IT in Ensuring Business Continuity", desc: "Why a robust IT infrastructure is critical for business continuity — from disaster recovery to remote work enablement.", date: "Nov 21, 2023", read: "2 min read",
          body: [
            { type: "p", text: "Information Technology plays a critical role in ensuring the continuity of business operations, especially during unforeseen events or disruptions. Here are the key areas where IT makes a difference:" },
            { type: "h2", text: "IT Infrastructure Resilience" },
            { type: "p", text: "A resilient IT infrastructure with redundancy, backups, and failover mechanisms minimizes downtime and keeps essential business functions running during disruptions." },
            { type: "h2", text: "Data Backup and Recovery" },
            { type: "p", text: "Regular data backups and robust recovery strategies ensure that critical business data can be restored quickly after any incident — from cyber-attacks to natural disasters." },
            { type: "h2", text: "Cloud-Based Solutions" },
            { type: "p", text: "Cloud computing enhances business continuity with remote access, scalable data storage, disaster recovery services, and remote collaboration tools." },
            { type: "h2", text: "Remote Work Enablement" },
            { type: "p", text: "IT enables remote work capabilities through technologies and tools for seamless collaboration — essential during pandemics and other disruptions that prevent on-site work." },
            { type: "h2", text: "Incident Response and Security" },
            { type: "p", text: "Developing and regularly testing incident response plans, combined with strong cybersecurity measures, protects IT systems during disruptions and guards against cyber threats." },
            { type: "h2", text: "Conclusion" },
            { type: "p", text: "IT is the backbone of business continuity. By investing in resilient infrastructure, cloud solutions, and security measures, businesses can weather any disruption and maintain essential operations." },
          ] },
      ],
    },
    contact: {
      eyebrow: "Contact Us",
      h1: ["Let's Build Something", "Extraordinary"],
      sub: "Ready to transform your IT infrastructure? Our team responds within 24 hours.",
      form: {
        name: "Full Name",
        email: "Work Email",
        company: "Company",
        service: "Service Needed",
        selectService: "Select a service...",
        message: "Message",
        services: ["IT Consulting & Strategy", "Staff Augmentation", "Datacenter Infrastructure", "Managed IT Services"],
        btn: "Send Message →",
      },
      info: [
        { icon: "📞", label: "Phone", val: "+1 724 906 3303" },
        { icon: "✉", label: "Email", val: "info@supportiva.net" },
        { icon: "📍", label: "Address", val: "30 N Gould St Ste 35742\nSheridan, WY 82801, USA" },
        { icon: "🌍", label: "Locations", val: "9 offices — US & Europe" },
      ],
      resp: "We typically respond within 4 business hours.",
    },
    notFound: {
      title: "Page Not Found",
      sub: "The page you're looking for doesn't exist or has been moved. Let's get you back on track.",
      backHome: "Back to Home",
      goBack: "Go Back",
    },
    footer: {
      tagline: "Transforming businesses through expert IT services.",
      cols: [
        { title: "Solutions", links: ["IT Consulting", "Staff Augmentation", "Datacenter Infra", "Managed IT"] },
        { title: "Company", links: ["About Us", "Vision", "Projects", "The S Blog"] },
        { title: "Contact", links: ["+1 724 906 3303", "info@supportiva.net", "Sheridan, WY 82801", "USA"] },
      ],
      copy: "© 2024 Supportiva · All rights reserved.",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية", solutions: "الحلول", vision: "رؤيتنا",
      projects: "المشاريع", blog: "المدونة", contact: "اتصل بنا", cta: "ابدأ الآن →",
    },
    home: {
      eyebrow: "✦ حلول تقنية وبنية تحتية للمؤسسات",
      h1: ["حلول رقمية", "تعزز كفاءة أعمالك", "وتدعم نموك"],
      sub: "تقدم Supportiva حلول تقنية معلومات على مستوى المؤسسات تساعد المنظمات على تحديث البنية التحتية وتعزيز الأمان والتوسع بثقة.",
      btn1: "اعرف المزيد →", btn2: "شاهد المشاريع",
      whoWeAreTitle: "من نحن",
      whoWeAreText: "نقدّم حلول تقنية معلومات متقدمة تساعد الشركات على تطوير بنيتها الرقمية، رفع الكفاءة التشغيلية، وتعزيز جاهزيتها للنمو.",
      ourServicesTitle: "خدماتنا",
      ourServicesText: "في Supportiva، نوفر خدمات تقنية متكاملة تشمل البنية التحتية، الحلول السحابية، الدعم التقني، وأمن الشبكات — مع التركيز على الجودة والاستمرارية والكفاءة التشغيلية.",
      ourServicesBtn: "اعرف المزيد →",
      stats: [
        { val: "11+", label: "سنوات خبرة" }, { val: "300+", label: "ساعة دعم/شهر" },
        { val: "27+", label: "مشاريع منجزة" }, { val: "9", label: "مواقع" },
      ],
      dash: {
        title: "لوحة تحكم البنية التحتية", live: "مباشر",
        metrics: [
          { label: "وقت التشغيل", val: "99.97%", sub: "آخر 90 يومًا", color: "green" },
          { label: "السحابة", val: "نشط", sub: "AWS + Azure", color: "cyan" },
          { label: "التذاكر", val: "3", sub: "أولوية عالية", color: "amber" },
          { label: "مهندسون", val: "12", sub: "متاحون الآن", color: "blue" },
        ],
        activity: "نشاط الأسبوع",
        statuses: [
          { label: "مركز البيانات", val: "يعمل", color: "green" },
          { label: "الدعم التقني", val: "نشط 24/7", color: "green" },
          { label: "الأمن", val: "آمن", color: "cyan" },
        ],
      },
      trustedBy: "يثق بنا",
      clients: ["نايك تركيا", "داو كيميكال", "ميدترونيك", "مرسيدس-بنز", "فياتريس"],
      servicesLabel: "خدماتنا",
      servicesTitle: "خدمات تقنية متكاملة بمعايير مؤسسية",
      servicesAll: "كل الحلول →",
      services: [
        { icon: "🖥", title: "الاستشارات وتخطيط IT", desc: "استشارات تقنية مصممة لتحقيق أهداف أعمالك.", tag: "سحابة · تطوير · تكامل", color: "blue" },
        { icon: "⚡", title: "تعزيز الكوادر", desc: "مهندسون معتمدون من أعلى المستويات بحسب احتياجاتك.", tag: "حسب الطلب · قابل للتوسع", color: "cyan" },
        { icon: "🏗", title: "مراكز البيانات", desc: "تصميم وتنفيذ وتحسين مراكز البيانات من الصفر.", tag: "تصميم · نشر · تحسين", color: "amber" },
        { icon: "🛡", title: "خدمات IT المُدارة", desc: "مراقبة 24/7، دعم مكتب المساعدة، تحديثات وصيانة.", tag: "24/7 · SLA مؤسسي", color: "green" },
      ],
      statsBar: [
        { val: "11+", label: "سنوات الخبرة", sub: "تقديم IT للمؤسسات ذ " },
        { val: "300+", label: "ساعات الدعم الشهرية", sub: "مراقبة استباقية واستجابة" },
        { val: "27+", label: "عملاء موثوقون", sub: "من الشركات الصغيرة إلى Fortune 500" },
        { val: "9", label: "مواقع عالمية", sub: "الولايات المتحدة وأوروبا وأبعد" },
      ],
      whyLabel: "لماذا سبورتيفا",
      whyUsLabel: "لماذا نحن",
      fieldNote: "ملاحظة ميدانية — نايك تركيا",
      readCase: "اقرأ الحالة",
      getInTouchLabel: "تواصل معنا",
      responseTime: "زمن الرد — أقل من 24 ساعة",
      letsBuild: "لنبني شيئًا",
      worthKeeping: "يستحق البقاء.",
      whyTitle: "شريكك التقني للتحول الرقمي المستدام.",
      whySub: "نلتزم بتقديم خدمات IT استثنائية تدفع نمو أعمالك. حلول مخصصة تناسب احتياجاتك الفريدة.",
      whyBtn: "رؤيتنا →",
      timeline: [
        { title: "اتفاقيات خدمة مؤسسية", desc: "ضمان 99.9% وقت تشغيل مع فرق دعم حقيقية.", color: "blue" },
        { title: "مهندسون معتمدون", desc: "متخصصون معتمدون في AWS وAzure وCisco.", color: "cyan" },
        { title: "خبرة متعددة الجنسيات", desc: "مشاريع منجزة عبر 9 دول ومدن حول العالم.", color: "green" },
        { title: "الأمن والامتثال", desc: "كل حل مبني على مبادئ Zero-Trust.", color: "amber" },
      ],
      testimonial: {
        quote: '"سبورتيفا حوّلت بنيتنا التحتية بالكامل عبر 9 متاجر نايك في تركيا بوقت قياسي. فريق دولي، تنفيذ مثالي."',
        name: "مدير تقنية المعلومات · نايك تركيا",
        role: "مشروع ترقية متعدد المواقع",
      },
      ctaTitle: "هل أنت مستعد لتطوير بيئتك التقنية؟",
      ctaSub: "تواصل معنا لاكتشاف كيف يمكن لحلولنا التقنية دعم نمو أعمالك وتحسين كفاءتها التشغيلية.",
      ctaBtn1: "ابدأ اليوم", ctaBtn2: "حدد موعداً",
    },
solutions: {
  eyebrow: "حلولنا",

  h1: "حلول تقنية مؤسسية مصممة للبنية التحتية الحديثة",

  sub: "بنية تحتية موثوقة، وشبكات آمنة، وخدمات تقنية قابلة للتوسع لدعم عمليات أعمالك.",

  label: "خدماتنا",

  ctaFallback: "تواصل معنا →",

  services: [
    {
      icon: "☁",
      color: "blue",
      title: "الحلول السحابية",
      desc: "نساعد المؤسسات على تحديث بنيتها التحتية من خلال تبني الحلول السحابية، والبيئات الهجينة، وتحسين الأداء عبر AWS و Azure.",
      tag: "AWS · Azure · Hybrid",
      bullets: [
        "تقييم الجاهزية السحابية",
        "حلول هجينة ومتعددة السحابات",
        "تنفيذ الحلول السحابية",
        "تحسين التكاليف"
      ]
    },

    {
      icon: "🏗",
      color: "amber",
      title: "البنية التحتية لمراكز البيانات",
      desc: "نقوم بتصميم وتنفيذ وتحسين بيئات مراكز البيانات لدعم عمليات موثوقة وقابلة للتوسع.",
      tag: "تصميم · تنفيذ · تحسين",
      bullets: [
        "خدمات Rack & Stack",
        "تصميم الطاقة والتبريد",
        "تخطيط السعة",
        "الاختبارات والتسليم"
      ]
    },

    {
      icon: "🛡",
      color: "purple",
      title: "أمن الشبكات",
      desc: "احمِ بنيتك التحتية من خلال حلول أمنية متقدمة تُنفذ بواسطة مهندسين معتمدين.",
      tag: "Firewall · IDS/IPS · Zero-Trust",
      bullets: [
        "تنفيذ الجدران النارية",
        "VPN وتقسيم الشبكات",
        "مراقبة IDS/IPS",
        "إدارة الوصول"
      ]
    },

    {
      icon: "🖥",
      color: "green",
      title: "الدعم التقني",
      desc: "خدمات دعم تقني متكاملة تساعدك على ضمان استمرارية العمليات وتقليل فترات التوقف.",
      tag: "24/7 · Help Desk · Maintenance",
      bullets: [
        "مراقبة على مدار الساعة",
        "دعم L1 / L2",
        "إدارة التحديثات",
        "صيانة الأجهزة"
      ]
    },

    {
      icon: "🔌",
      color: "cyan",
      title: "حلول الكابلات",
      desc: "خدمات كابلات منظمة تضمن اتصالًا موثوقًا ومنظمًا وقابلًا للتوسع.",
      tag: "Structured · Fiber · Labeled",
      bullets: [
        "تصميم الكابلات المنظمة",
        "تركيب الألياف والنحاس",
        "تهيئة Patch Panels",
        "التوثيق"
      ]
    },

    {
      icon: "⚡",
      color: "blue-light",
      title: "تعزيز الكوادر التقنية",
      desc: "نوفر كوادر تقنية مؤهلة لدعم المشاريع قصيرة وطويلة المدى حسب احتياجاتك التشغيلية.",
      tag: "عند الطلب · مرن · معتمد",
      bullets: [
        "مهندسون عند الطلب",
        "كوادر معتمدة",
        "دعم المشاريع",
        "دعم ميداني أو عن بُعد"
      ]
    }
  ],

  whyTitle: "لماذا سبورتيفا؟",

  whyDesc: "نقدم حلولًا تقنية عملية تساعد المؤسسات على تحسين الأداء وضمان استمرارية الأعمال والنمو بثقة.",

  whyPoints: [
    "حلول مصممة وفق احتياجاتك التشغيلية",
    "مهندسون معتمدون بخبرة تتجاوز 11 عامًا",
    "تنفيذ مشاريع عبر 9 مواقع حول العالم",
    "دعم متوفر على مدار الساعة"
  ],

  processLabel: "آلية العمل",

  processTitle: "كيف نعمل",

  processSteps: [
    {
      title: "التقييم",
      desc: "نقيّم احتياجات البنية التحتية لديك.",
      color: "blue"
    },
    {
      title: "التخطيط",
      desc: "نصمم الحل المناسب وخطة التنفيذ.",
      color: "cyan"
    },
    {
      title: "التنفيذ",
      desc: "يقوم مهندسونا بتنفيذ المشروع بكفاءة.",
      color: "green"
    },
    {
      title: "الدعم",
      desc: "صيانة وتحسين مستمران.",
      color: "amber"
    }
  ],

  cta: "تواصل مع فريقنا →"
},
    vision: {
      eyebrow: "رؤيتنا", h1: "يجب أن تُمكّن التقنية أعمالك، لا أن تعيقها.",
      missionTitle: "قصتنا",
      mission1: "بدأت Supportiva بهدف تقديم خدمات تقنية احترافية تجمع بين الخبرة الميدانية، سرعة التنفيذ، وجودة التشغيل.",
      mission2: "واليوم نواصل دعم عملائنا بحلول موثوقة تغطي البنية التحتية، مراكز البيانات، الشبكات، والخدمات السحابية.",
      watchLabel: "شاهد: قصتنا", valuesLabel: "قيمنا",
      stats: [
        { val: "11+", label: "سنوات في مجال الأعمال" },
        { val: "9", label: "مواقع عالمية" },
        { val: "27+", label: "مشاريع منجزة" },
        { val: "100%", label: "الاحتفاظ بالعملاء" },
      ],
      values: [
        { icon: "🎯", title: "الدقة", desc: "كل نشر مخطط حتى أدق التفاصيل.", color: "blue" },
        { icon: "🤝", title: "الشراكة", desc: "نصبح امتداداً لفريقك، لا مجرد مزود خدمة.", color: "cyan" },
        { icon: "🌱", title: "الاستدامة", desc: "ممارسات IT صديقة للبيئة بما في ذلك إعادة تدوير الأجهزة.", color: "green" },
      ],
    },
    projects: {
      eyebrow: "مشاريعنا", h1: ["مشاريع حقيقية.", "نتائج حقيقية."],
      h1Lead: "مشاريع حقيقية،",
      h1Highlight: "نتائج حقيقية.",
      sub: "من تنفيذ مشاريع تقنية متعددة المواقع إلى تجهيز مراكز البيانات — تُنفذ على أرض الواقع بواسطة فرقنا الهندسية",
      countOne: "مشروع",
      countMany: "مشاريع",
      emptyCategory: "لا توجد مشاريع في هذه الفئة.",
      emptyDetail: "اختر مشروعًا",
      categories: {
        all: "الكل",
        upgrade: "ترقية",
        datacenter: "مراكز البيانات",
        support: "الدعم",
        network: "الشبكات",
        sustainability: "الاستدامة",
      },
      caseStudy: "دراسة حالة",
      backToProjects: "العودة إلى المشاريع",
      overview: "نظرة عامة",
      whatWeDid: "ما الذي قمنا به",
      atAGlance: "نظرة سريعة",
      location: "الموقع",
      year: "السنة",
      outcome: "النتيجة",
      services: "الخدمات",
      similarChallenge: "هل لديك تحدٍ مماثل؟",
      similarChallengeSub: "أخبرنا عن مشروعك — وعادةً ما نرد خلال يوم عمل واحد.",
      startConversation: "ابدأ التواصل",
      nextStep: "الخطوة التالية",
      readyHeadline: "هل أنت جاهز لنتائج مماثلة؟",
      readySub: "تحدث مع فريقنا الهندسي حول مشروع الترقية أو مركز البيانات أو الشبكات.",
      readMore: "اقرأ الحالة كاملة",
      showFullDetails: "عرض التفاصيل الكاملة",
      showLess: "إخفاء",
      cta: "ابدأ مشروعك →",
    },
    blog: {
      eyebrow: "مدونة سبورتيفا", h1: ["ارتقِ بأعمالك", "بحلول تقنية ذكية"],
      sub: "آراء خبراء في السحابة والبنية التحتية والشبكات من مهندسينا.",
      author: "فريق سبورتيفا",
      backToBlog: "العودة إلى المدونة",
      recentPosts: "أحدث المقالات",
      seeAll: "عرض الكل",
      featured: "مميز",
      readArticle: "اقرأ المقال",
      newsletterTitle: "ابقَ على اطلاع",
      newsletterSub: "احصل على أحدث رؤى تقنية المعلومات من مهندسينا الميدانيين، مباشرة في بريدك الإلكتروني.",
      posts: [
        { cat: "البنية التحتية", title: "استشراف المستقبل مع WiFi 7: Ruijie RG-RAP73HD يقود المسيرة", desc: "WiFi 7 هنا ويغير قواعد اللعبة. اكتشف كيف تقدم نقطة الوصول الأحدث من Ruijie أداءً لاسلكيًا للجيل التالي.", date: "1 مارس 2024", read: "دقيقتان" },
        { cat: "السحابة", title: "Microsoft Copilot: مستقبل الإنتاجية", desc: "كيف يحول المساعد الذكي من Microsoft طريقة عمل الشركات — مدمج في Word وExcel وOutlook وTeams.", date: "21 فبراير 2024", read: "دقيقتان" },
        { cat: "البنية التحتية", title: "InfiniBand مقابل Ethernet", desc: "مقارنة تقنية عميقة بين InfiniBand وEthernet لشبكات مراكز البيانات — السرعة والتأخير وRDMA.", date: "20 فبراير 2024", read: "3 دقائق" },
        { cat: "السحابة", title: "تطور الحوسبة السحابية: اتجاهات وتوقعات المستقبل", desc: "من استراتيجيات السحاب المتعدد إلى الحوسبة بدون خوادم وتكامل الذكاء الاصطناعي.", date: "23 يناير 2024", read: "3 دقائق" },
        { cat: "ترقية", title: "تبني المرونة في حياة IT اليومية", desc: "دليل من 15 خطوة لتبني مبادئ Agile لتعزيز التعاون والمرونة والاستجابة في فرق IT.", date: "28 نوفمبر 2023", read: "3 دقائق" },
        { cat: "الاستدامة", title: "دور IT في ضمان استمرارية الأعمال", desc: "لماذا البنية التحتية القوية لتقنية المعلومات ضرورية لاستمرارية الأعمال.", date: "21 نوفمبر 2023", read: "دقيقتان" },
      ],
    },
    contact: {
      eyebrow: "اتصل بنا", h1: ["لنبني شيئاً", "استثنائياً"],
      sub: "مستعد لتحويل بنيتك التحتية؟ فريقنا يرد خلال 24 ساعة.",
      form: { name: "الاسم الكامل", email: "البريد الإلكتروني للعمل", company: "الشركة", service: "الخدمة المطلوبة", selectService: "اختر خدمة...", message: "الرسالة", services: ["الاستشارات وتخطيط IT", "تعزيز الكوادر", "مراكز البيانات", "خدمات IT المُدارة"], btn: "إرسال الرسالة →" },
      info: [
        { icon: "📞", label: "الهاتف", val: "+1 724 906 3303" },
        { icon: "✉", label: "البريد الإلكتروني", val: "info@supportiva.net" },
        { icon: "📍", label: "العنوان", val: "30 N Gould St Ste 35742\nشيريدان، وايومنغ 82801، الولايات المتحدة" },
        { icon: "🌍", label: "المواقع", val: "9 مكاتب — الولايات المتحدة وأوروبا" },
      ],
      resp: "نرد عادةً خلال 4 ساعات عمل.",
    },
    notFound: {
      title: "الصفحة غير موجودة",
      sub: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. لنعيدك إلى المسار الصحيح.",
      backHome: "العودة إلى الرئيسية",
      goBack: "رجوع",
    },
    footer: {
      tagline: "نحوّل الأعمال من خلال خدمات تقنية المعلومات ",
      cols: [
        { title: "الحلول", links: ["الاستشارات", "تعزيز الكوادر", "مراكز البيانات", "خدمات IT المُدارة"] },
        { title: "الشركة", links: ["من نحن", "الرؤية", "المشاريع", "المدونة"] },
        { title: "تواصل معنا", links: ["+1 724 906 3303", "info@supportiva.net", "شيريدان، وايومنغ", "الولايات المتحدة"] },
      ],
      copy: "© 2024 Supportiva · جميع الحقوق محفوظة.",
    },
  },

  tr: {
    nav: {
      home: "Ana Sayfa", solutions: "Çözümler", vision: "Vizyon",
      projects: "Projeler", blog: "S Blog", contact: "İletişim", cta: "Başlayın →",
    },
    home: {
      eyebrow: "✦ Kurumsal BT Hizmetleri ve Altyapı Çözümleri",
      h1: ["BT Altyapınızı", "Güvenilir ve", "Ölçeklenebilir Hale Getirin"],
      sub: "Kurumsal işletmelere güvenilir, ölçeklenebilir ve modern BT çözümleri sunuyoruz. Uzman mühendis kadromuz farklı sektörlerde uzun yıllara dayanan saha deneyimine sahiptir.",
      btn1: "Daha Fazla Bilgi →", btn2: "Projelere Bakın",
      whoWeAreTitle: "Biz Kimiz",
      whoWeAreText: "Supportiva; altyapı, ağ, bulut ve destek hizmetleri alanlarında uçtan uca çözümler sunan bir teknoloji iş ortağıdır. Güvenli, sürdürülebilir ve yüksek performanslı BT ortamları oluşturmanıza yardımcı oluruz.",
      ourServicesTitle: "Hizmetlerimiz",
      ourServicesText: "Supportiva olarak her büyüklükteki işletmenin başarılı olmasına yardımcı olmak için tasarlanmış geniş bir BT çözümleri yelpazesi sunuyoruz. Bulut hizmetlerinden özel yazılım geliştirmeye kadar. Daha fazla bilgi için bugün bize ulaşın.",
      ourServicesBtn: "Daha Fazla Bilgi →",
      stats: [
        { val: "11+", label: "Yıllık Deneyim" }, { val: "300+", label: "Destek Saati/ay" },
        { val: "27+", label: "Tamamlanan Proje" }, { val: "9", label: "Lokasyon" },
      ],
      dash: {
        title: "Altyapı Panosu", live: "Canlı",
        metrics: [
          { label: "Çalışma Süresi", val: "99.97%", sub: "Son 90 gün", color: "green" },
          { label: "Bulut", val: "Aktif", sub: "AWS + Azure", color: "cyan" },
          { label: "Biletler", val: "3", sub: "Yüksek öncelik", color: "amber" },
          { label: "Mühendisler", val: "12", sub: "Müsait", color: "blue" },
        ],
        activity: "Haftalık Aktivite",
        statuses: [
          { label: "Veri Merkezi", val: "Çalışıyor", color: "green" },
          { label: "BT Desteği", val: "7/24 Aktif", color: "green" },
          { label: "Güvenlik", val: "Güvenli", color: "cyan" },
        ],
      },
      trustedBy: "GÜVENİLEN",
      clients: ["Nike Türkiye", "Dow Chemical", "Medtronic", "Mercedes-Benz", "Viatris"],
      servicesLabel: "HİZMETLER",
      servicesTitle: "Kurumsal BT İhtiyaçları İçin Uçtan Uca Hizmetler",
      servicesAll: "Tüm Çözümler →",
      services: [
        { icon: "🖥", title: "BT Danışmanlığı ve Stratejisi", desc: "Hedeflerinize ulaşmak için özel BT danışmanlığı. Bulut geçişi, uygulama geliştirme ve yazılım entegrasyonu.", tag: "Bulut · Geliştirme · Entegrasyon", color: "blue" },
        { icon: "⚡", title: "Personel Güçlendirme", desc: "Benzersiz ihtiyaçlarınıza uygun üst düzey BT uzmanları.", tag: "Talep üzeri · Ölçeklenebilir", color: "cyan" },
        { icon: "🏗", title: "Veri Merkezi Altyapısı", desc: "Tasarımdan dağıtıma kadar veri merkezinizi mimarlandırın.", tag: "Tasarım · Dağıtım · Optimize", color: "amber" },
        { icon: "🛡", title: "Yönetilen BT Hizmetleri", desc: "7/24 izleme, yardım masası desteği, yazılım güncellemeleri ve donanım bakımı.", tag: "7/24 · Kurumsal SLA", color: "green" },
      ],
      statsBar: [
        { val: "11+", label: "Yıllık Deneyim", sub: "'ten  kurumsal BT" },
        { val: "300+", label: "Aylık Destek Saati", sub: "Proaktif izleme ve müdahale" },
        { val: "27+", label: "Güvenilen Müşteriler", sub: "KOBİ'den Fortune 500'e" },
        { val: "9", label: "Küresel Lokasyonlar", sub: "ABD, Avrupa ve ötesi" },
      ],
      whyLabel: "NEDEN SUPPORTİVA",
      whyUsLabel: "Neden Biz",
      fieldNote: "Saha Notu — Nike Türkiye Yükseltmesi",
      readCase: "Vakayı Oku",
      getInTouchLabel: "İletişime Geçin",
      responseTime: "Yanıt süresi — 24 saatten az",
      letsBuild: "Birlikte bir şey inşa edelim",
      worthKeeping: "kalıcı olacak bir şey.",
      whyTitle: "Dijital dönüşüm yolculuğunuzdaki güvenilir teknoloji ortağınız.",
      whySub: "Supportiva olarak işletme büyümesini destekleyen olağanüstü BT hizmetleri sunmaya kararlıyız.",
      whyBtn: "Vizyonumuz →",
      timeline: [
        { title: "Kurumsal SLA'lar", desc: "Gerçek destek ekipleriyle %99,9 çalışma süresi taahhüdü.", color: "blue" },
        { title: "Sertifikalı Mühendisler", desc: "AWS, Azure ve Cisco sertifikalı uzmanlar kadromuzda.", color: "cyan" },
        { title: "Çok Uluslu Deneyim", desc: "9 ülke ve şehirde teslim edilmiş projeler.", color: "green" },
        { title: "Güvenlik ve Uyumluluk", desc: "Her çözüm sıfır güven ilkeleriyle inşa edilir.", color: "amber" },
      ],
      testimonial: {
        quote: '"Supportiva, 9 Nike Türkiye mağazasının tüm ağ altyapısını rekor sürede dönüştürdü. Çok uluslu ekip, kusursuz uygulama."',
        name: "Nike Türkiye — BT Direktörü",
        role: "Çok Lokasyonlu Yükseltme Projesi",
      },
      ctaTitle: "BT Operasyonlarınızı Güçlendirmeye Hazır Mısınız?",
      ctaSub: "Supportiva'nın ölçülebilir sonuçlar nasıl sağlayabileceğini konuşalım.",
      ctaBtn1: "Bugün Başlayın", ctaBtn2: "Görüşme Ayarlayın",
    },
solutions: {
  eyebrow: "Çözümlerimiz",

  h1: "Modern Altyapılar İçin Kurumsal BT Çözümleri",

  sub: "İş operasyonlarınızı destekleyen güvenilir altyapı, güvenli ağlar ve ölçeklenebilir BT hizmetleri.",

  label: "HİZMETLERİMİZ",

  ctaFallback: "Bizimle İletişime Geçin →",

  services: [
    {
      icon: "☁",
      color: "blue",
      title: "Bulut Çözümleri",
      desc: "Kuruluşların AWS ve Azure üzerinde bulut geçişi, hibrit altyapılar ve performans optimizasyonu süreçlerini destekliyoruz.",
      tag: "AWS · Azure · Hybrid",
      bullets: [
        "Bulut hazırlık analizi",
        "Hibrit ve multi-cloud çözümleri",
        "Bulut kurulum hizmetleri",
        "Maliyet optimizasyonu"
      ]
    },

    {
      icon: "🏗",
      color: "amber",
      title: "Veri Merkezi Altyapısı",
      desc: "Güvenilir ve ölçeklenebilir operasyonlar için veri merkezi altyapıları tasarlıyor, kuruyor ve optimize ediyoruz.",
      tag: "Tasarım · Kurulum · Optimizasyon",
      bullets: [
        "Rack & stack hizmetleri",
        "Güç ve soğutma tasarımı",
        "Kapasite planlaması",
        "Test ve teslim süreçleri"
      ]
    },

    {
      icon: "🛡",
      color: "purple",
      title: "Ağ Güvenliği",
      desc: "Sertifikalı mühendisler tarafından sunulan kurumsal güvenlik çözümleriyle altyapınızı koruyun.",
      tag: "Firewall · IDS/IPS · Zero-Trust",
      bullets: [
        "Firewall kurulumu",
        "VPN ve ağ segmentasyonu",
        "IDS/IPS izleme",
        "Erişim kontrolü"
      ]
    },

    {
      icon: "🖥",
      color: "green",
      title: "BT Destek Hizmetleri",
      desc: "Operasyon sürekliliğini sağlamak ve kesinti sürelerini azaltmak için kapsamlı BT destek hizmetleri sunuyoruz.",
      tag: "7/24 · Help Desk · Bakım",
      bullets: [
        "7/24 izleme",
        "L1 / L2 destek",
        "Patch yönetimi",
        "Donanım bakımı"
      ]
    },

    {
      icon: "🔌",
      color: "cyan",
      title: "Kablolama Çözümleri",
      desc: "Düzenli, güvenilir ve ölçeklenebilir bağlantılar için yapısal kablolama hizmetleri sunuyoruz.",
      tag: "Structured · Fiber · Labeled",
      bullets: [
        "Yapısal kablolama",
        "Fiber ve bakır kurulumları",
        "Patch panel yapılandırması",
        "Dokümantasyon"
      ]
    },

    {
      icon: "⚡",
      color: "blue-light",
      title: "Personel Destek Hizmetleri",
      desc: "Kısa ve uzun vadeli projeler için ihtiyaçlarınıza uygun uzman BT profesyonelleri sağlıyoruz.",
      tag: "İsteğe bağlı · Esnek · Sertifikalı",
      bullets: [
        "Talep üzerine mühendisler",
        "Sertifikalı uzmanlar",
        "Proje bazlı destek",
        "Yerinde veya uzaktan destek"
      ]
    }
  ],

  whyTitle: "Neden Supportiva?",

  whyDesc: "Kuruluşların performansını artırmasına, operasyon sürekliliğini sağlamasına ve güvenle büyümesine yardımcı olan pratik BT çözümleri sunuyoruz.",

  whyPoints: [
    "Operasyonel ihtiyaçlara özel çözümler",
    "11+ yıllık deneyime sahip sertifikalı mühendisler",
    "9 farklı lokasyonda proje teslimi",
    "7/24 destek hizmeti"
  ],

  processLabel: "SÜRECİMİZ",

  processTitle: "Nasıl Çalışıyoruz",

  processSteps: [
    {
      title: "Değerlendirme",
      desc: "Altyapı ihtiyaçlarınızı analiz ediyoruz.",
      color: "blue"
    },
    {
      title: "Planlama",
      desc: "Doğru çözümü ve uygulama planını oluşturuyoruz.",
      color: "cyan"
    },
    {
      title: "Uygulama",
      desc: "Mühendislerimiz projeyi verimli şekilde hayata geçirir.",
      color: "green"
    },
    {
      title: "Destek",
      desc: "Sürekli bakım ve optimizasyon.",
      color: "amber"
    }
  ],

  cta: "Ekibimizle İletişime Geçin →"
},
    vision: {
      eyebrow: "Vizyonumuz", h1: "Teknoloji Sizi Güçlendirmeli, Yavaşlatmamalı.",
      missionTitle: "Misyonumuz",
      mission1: "Son teknoloji ile gerçek iş ihtiyaçları arasındaki boşluğu kapatmak.",
      mission2: "İlaç, otomotiv, üretim ve kimya sektörlerinde 11+ yıllık uygulamalı deneyim.",
      watchLabel: "İzle: Hikayemiz", valuesLabel: "DEĞERLERİMİZ",
      stats: [
        { val: "11+", label: "İş Yılı" },
        { val: "9", label: "Küresel Lokasyon" },
        { val: "27+", label: "Teslim Edilen Proje" },
        { val: "100%", label: "Müşteri Sadakati" },
      ],
      values: [
        { icon: "🎯", title: "Hassasiyet", desc: "Her dağıtım en ince ayrıntısına kadar planlanır.", color: "blue" },
        { icon: "🤝", title: "Ortaklık", desc: "Sadece bir tedarikçi değil, ekibinizin uzantısı oluyoruz.", color: "cyan" },
        { icon: "🌱", title: "Sürdürülebilirlik", desc: "Sorumlu cihaz geri dönüşümü dahil çevre dostu BT uygulamaları.", color: "green" },
      ],
    },
    projects: {
      eyebrow: "Projelerimiz", h1: ["Gerçek Projeler.", "Gerçek Sonuçlar."],
      h1Lead: "Gerçek projeler,",
      h1Highlight: "gerçek sonuçlar.",
      sub: "Çok lokasyonlu BT projelerinden veri merkezi kurulumlarına kadar tüm çalışmalar sahada mühendislik ekiplerimiz tarafından gerçekleştirilir.",
      countOne: "Proje",
      countMany: "Proje",
      emptyCategory: "Bu kategoride proje yok.",
      emptyDetail: "Bir proje seçin",
      categories: {
        all: "Tümü",
        upgrade: "Yükseltme",
        datacenter: "Veri Merkezi",
        support: "Destek",
        network: "Ağ",
        sustainability: "Sürdürülebilirlik",
      },
      caseStudy: "Vaka Çalışması",
      backToProjects: "Projelere Dön",
      overview: "Genel Bakış",
      whatWeDid: "Yaptıklarımız",
      atAGlance: "Bir Bakışta",
      location: "Konum",
      year: "Yıl",
      outcome: "Sonuç",
      services: "Hizmetler",
      similarChallenge: "Benzer Bir Zorluk mu Yaşıyorsunuz?",
      similarChallengeSub: "Projenizi bizimle paylaşın — genellikle bir iş günü içinde yanıt veriyoruz.",
      startConversation: "İletişime Geçin",
      nextStep: "Sonraki Adım",
      readyHeadline: "Buna Benzer Sonuçlara Hazır mısınız?",
      readySub: "Yükseltme, veri merkezi veya ağ projeleriniz için mühendislik ekibimizle iletişime geçin.",
      readMore: "Tam vakayı oku",
      showFullDetails: "Tüm Detayları Göster",
      showLess: "Küçült",
      cta: "Projenizi Başlatın →",
    },
    blog: {
      eyebrow: "S Blog", h1: ["İş Potansiyelinizi", "BT Hizmetlerimizle Artırın"],
      sub: "Bulut, altyapı, ağ ve kurumsal BT üzerine mühendislerimizden uzman görüşleri.",
      author: "Supportiva Ekibi",
      backToBlog: "Bloga Dön",
      recentPosts: "Son Yazılar",
      seeAll: "Tümünü Gör",
      featured: "ÖNE ÇIKAN",
      readArticle: "Makaleyi Oku",
      newsletterTitle: "Güncel Kalın",
      newsletterSub: "Saha mühendislerimizden en güncel BT içgörülerini doğrudan gelen kutunuza alın.",
      posts: [
        { cat: "Altyapı", title: "WiFi 7 ile Geleceğe Bakış: Ruijie RG-RAP73HD Öncülük Ediyor", desc: "WiFi 7 burada ve oyunu değiştiriyor. Ruijie'nin en yeni erişim noktasının fiber bağlantı için SFP+ portuyla nasıl fark yarattığını keşfedin.", date: "1 Mart 2024", read: "2 dk okuma" },
        { cat: "Bulut", title: "Microsoft Copilot: Üretkenliğin Geleceği", desc: "Microsoft'un yapay zeka destekli Copilot'u Word, Excel, Outlook ve Teams'e entegre olarak iş dünyasını nasıl dönüştürüyor.", date: "21 Şubat 2024", read: "2 dk okuma" },
        { cat: "Altyapı", title: "InfiniBand VS Ethernet", desc: "Veri merkezi ağları için InfiniBand ve Ethernet'in derinlemesine teknik karşılaştırması — hız, gecikme, RDMA ve ölçeklenebilirlik.", date: "20 Şubat 2024", read: "3 dk okuma" },
        { cat: "Bulut", title: "Bulut Bilişimin Evrimi: Geleceğin Trendleri ve Öngörüleri", desc: "Hibrit çoklu bulut stratejilerinden sunucusuz bilişime ve yapay zeka entegrasyonuna — geleceği şekillendiren trendler.", date: "23 Ocak 2024", read: "3 dk okuma" },
        { cat: "Yükseltme", title: "BT Günlük Hayatında Çevikliği Benimsemek", desc: "BT ekiplerinde iş birliği, esneklik ve duyarlılığı artırmak için Agile ilkelerini benimseme konusunda 15 adımlık rehber.", date: "28 Kasım 2023", read: "3 dk okuma" },
        { cat: "Sürdürülebilirlik", title: "İş Sürekliliğini Sağlamada BT'nin Rolü", desc: "Felaket kurtarmadan uzaktan çalışma imkânlarına — neden güçlü BT altyapısı iş sürekliliği için kritiktir.", date: "21 Kasım 2023", read: "2 dk okuma" },
      ],
    },
    contact: {
      eyebrow: "İletişim", h1: ["Birlikte Olağanüstü", "Bir Şey İnşa Edelim"],
      sub: "BT altyapınızı dönüştürmeye hazır mısınız? Ekibimiz 24 saat içinde yanıt verir.",
      form: { name: "Ad Soyad", email: "Kurumsal E-posta", company: "Şirket", service: "İhtiyaç Duyulan Hizmet", selectService: "Bir hizmet seçin...", message: "Mesaj", services: ["BT Danışmanlığı ve Stratejisi", "Personel Güçlendirme", "Veri Merkezi Altyapısı", "Yönetilen BT Hizmetleri"], btn: "Mesaj Gönder →" },
      info: [
        { icon: "📞", label: "Telefon", val: "+1 724 906 3303" },
        { icon: "✉", label: "E-posta", val: "info@supportiva.net" },
        { icon: "📍", label: "Merkez Adres", val: "30 N Gould St Ste 35742\nSheridan, WY 82801, ABD" },
        { icon: "🌍", label: "Lokasyonlar", val: "9 ofis — ABD ve Avrupa" },
      ],
      resp: "Genellikle 4 iş saati içinde yanıt veriyoruz.",
    },
    notFound: {
      title: "Sayfa Bulunamadı",
      sub: "Aradığınız sayfa mevcut değil veya taşınmış. Sizi tekrar yola koyalım.",
      backHome: "Ana Sayfaya Dön",
      goBack: "Geri Dön",
    },
    footer: {
      tagline: "İşletmeleri uzman BT hizmetleriyle dönüştürüyoruz.",
      cols: [
        { title: "Çözümler", links: ["BT Danışmanlığı", "Personel Güçlendirme", "Veri Merkezi", "Yönetilen BT"] },
        { title: "Şirket", links: ["Hakkımızda", "Vizyon", "Projeler", "S Blog"] },
        { title: "İletişim", links: ["+1 724 906 3303", "info@supportiva.net", "Sheridan, WY 82801", "ABD"] },
      ],
      copy: "© 2024 Supportiva · Tüm hakları saklıdır.",
    },
  },
} as const;
