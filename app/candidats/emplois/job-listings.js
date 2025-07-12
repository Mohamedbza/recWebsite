// Define job listing data with support for both languages
const jobListings = {
  "en": {
    "full-stack-developer": {
      id: "1",
      title: "Full Stack Developer",
      slug: "full-stack-developer",
      company: "TechCorp Inc.",
      companyLogo: "/placeholder-logo.svg",
      location: "Montreal, QC",
      type: "Full-time",
      salary: "$75,000 - $95,000 per year",
      department: "Engineering",
      experience: "3+ years",
      education: "Bachelor's degree in Computer Science or equivalent",
      postedDate: "2023-05-15",
      applicationDeadline: "2023-06-15",
      tags: ["React", "Node.js", "TypeScript", "MongoDB"],
      description: {
        overview: "TechCorp Inc. is looking for a Full Stack Developer to join our engineering team. As a Full Stack Developer, you will be responsible for developing and maintaining web applications using React, Node.js, and MongoDB. You will work closely with our product and design teams to implement new features and improve existing ones.",
        responsibilities: [
          "Develop and maintain web applications using React, Node.js, and MongoDB",
          "Collaborate with product managers and designers to implement new features",
          "Write clean, maintainable, and efficient code",
          "Optimize applications for maximum speed and scalability",
          "Implement security and data protection measures",
          "Debug issues reported by users or QA",
          "Stay up-to-date with emerging trends and technologies"
        ],
        requirements: [
          "3+ years of experience in full-stack development",
          "Strong proficiency in JavaScript/TypeScript and modern frameworks",
          "Experience with React, Redux, and related libraries",
          "Experience with Node.js and Express",
          "Experience with MongoDB or similar NoSQL databases",
          "Knowledge of RESTful APIs and GraphQL",
          "Understanding of server-side rendering and its benefits",
          "Familiarity with version control systems like Git",
          "Excellent problem-solving and communication skills"
        ],
        benefits: [
          "Competitive salary and equity package",
          "Health, dental, and vision insurance",
          "Flexible work schedule and remote work options",
          "Professional development budget",
          "Gym membership reimbursement",
          "Unlimited vacation policy",
          "Modern office in downtown Montreal"
        ]
      }
    },
    "clinical-nurse": {
      id: "2",
      title: "Clinical Nurse",
      slug: "clinical-nurse",
      company: "Saint-Laurent Medical Center",
      companyLogo: "/placeholder-logo.svg",
      location: "Quebec City, QC",
      type: "Full-time",
      salary: "$70,000 - $85,000 per year",
      department: "Nursing",
      experience: "2+ years",
      education: "Registered Nurse, Bachelor's degree in Nursing",
      postedDate: "2023-05-10",
      applicationDeadline: "2023-06-10",
      tags: ["Intensive care", "Patient care", "Medical procedures", "Bilingual"],
      description: {
        overview: "Saint-Laurent Medical Center is seeking a dedicated Clinical Nurse to join our intensive care unit. The ideal candidate will have experience in acute care settings and be committed to providing exceptional patient care. As a Clinical Nurse, you will work with our multidisciplinary team to assess, plan, and implement nursing care for patients with complex medical conditions.",
        responsibilities: [
          "Assess patients' health conditions and develop nursing care plans",
          "Administer medications and treatments as prescribed by physicians",
          "Monitor patients' vital signs and respond to changes in their condition",
          "Coordinate with other healthcare professionals to ensure comprehensive care",
          "Document patient information and maintain accurate medical records",
          "Educate patients and their families on health management and preventive care",
          "Participate in quality improvement initiatives",
          "Mentor junior nursing staff and students"
        ],
        requirements: [
          "Valid Registered Nurse license in Quebec",
          "Bachelor's degree in Nursing",
          "2+ years of clinical experience, preferably in an intensive care setting",
          "Strong knowledge of medical procedures and nursing protocols",
          "Excellent assessment and critical thinking skills",
          "Ability to work under pressure in fast-paced environments",
          "Fluency in both English and French",
          "BLS and ACLS certifications"
        ],
        benefits: [
          "Competitive salary and comprehensive benefits package",
          "Healthcare and dental coverage",
          "Generous paid time off and sick leave",
          "Retirement plan with employer matching",
          "Continuing education opportunities and tuition reimbursement",
          "Employee wellness program",
          "Subsidized parking or public transit pass"
        ]
      }
    },
    "senior-accountant": {
      id: "3",
      title: "Senior Accountant",
      slug: "senior-accountant",
      company: "National Financial Group",
      companyLogo: "/placeholder-logo.svg",
      location: "Laval, QC",
      type: "Full-time",
      salary: "$65,000 - $80,000 per year",
      department: "Finance",
      experience: "5+ years",
      education: "Bachelor's degree in Accounting, CPA preferred",
      postedDate: "2023-05-05",
      applicationDeadline: "2023-06-05",
      tags: ["CPA", "Taxation", "Financial statements", "Accounting software"],
      description: {
        overview: "National Financial Group is looking for a Senior Accountant to join our finance team. In this role, you will be responsible for managing complex accounting operations, preparing financial statements, and ensuring compliance with accounting standards and tax regulations. The ideal candidate will have a strong background in accounting, attention to detail, and excellent analytical skills.",
        responsibilities: [
          "Prepare and review financial statements and reports",
          "Manage month-end and year-end close processes",
          "Develop and maintain accounting policies and procedures",
          "Ensure compliance with GAAP, IFRS, and relevant tax regulations",
          "Reconcile accounts and investigate discrepancies",
          "Prepare tax returns and financial forecasts",
          "Supervise junior accounting staff",
          "Implement and improve financial controls and processes",
          "Collaborate with auditors during annual audits"
        ],
        requirements: [
          "Bachelor's degree in Accounting, Finance, or related field",
          "CPA designation preferred",
          "5+ years of accounting experience, including financial statement preparation",
          "Strong knowledge of accounting principles, practices, and standards",
          "Experience with accounting software and ERP systems",
          "Proficiency in Excel and financial modeling",
          "Excellent analytical and problem-solving skills",
          "Strong attention to detail and accuracy",
          "Ability to work independently and meet deadlines"
        ],
        benefits: [
          "Competitive salary based on experience",
          "Comprehensive health and dental benefits",
          "RRSP matching program",
          "Performance-based bonuses",
          "Professional development opportunities",
          "Flexible work arrangements",
          "Employee assistance program",
          "Paid vacation and personal days"
        ]
      }
    },
    "civil-engineer": {
      id: "4",
      title: "Civil Engineer",
      slug: "civil-engineer",
      company: "Modern Constructions Inc.",
      companyLogo: "/placeholder-logo.svg",
      location: "Montreal, QC",
      type: "Contract",
      salary: "$45 - $60 per hour",
      department: "Engineering",
      experience: "3-5 years",
      education: "Bachelor's degree in Civil Engineering",
      postedDate: "2023-05-12",
      applicationDeadline: "2023-06-12",
      tags: ["Civil engineering", "AutoCAD", "Project management", "Infrastructure"],
      description: {
        overview: "Modern Constructions Inc. is seeking a Civil Engineer to join our team on a contractual basis for an initial period of 12 months with potential for extension or conversion to permanent. In this role, you will be responsible for designing, planning, and overseeing construction projects with a focus on municipal infrastructure and commercial developments across Quebec.",
        responsibilities: [
          "Develop detailed engineering designs and specifications for construction projects",
          "Prepare project timelines, cost estimates, and resource requirements",
          "Ensure all designs comply with building codes, regulations, and safety standards",
          "Coordinate with architects, contractors, and other engineering disciplines",
          "Conduct site visits to monitor construction progress and quality",
          "Identify and resolve engineering issues that arise during construction",
          "Prepare technical reports and presentations for clients and stakeholders",
          "Review and approve shop drawings and material submittals",
          "Liaise with municipal authorities for permits and approvals"
        ],
        requirements: [
          "Bachelor's degree in Civil Engineering",
          "Professional Engineer (P.Eng) license or eligible for registration",
          "3-5 years of experience in civil engineering, preferably in municipal infrastructure",
          "Proficiency in AutoCAD, Civil 3D, and other engineering software",
          "Strong knowledge of building codes and construction standards",
          "Experience with project management and construction oversight",
          "Excellent problem-solving and analytical skills",
          "Strong communication skills in English, French is an asset",
          "Willingness to travel to construction sites across Quebec"
        ],
        benefits: [
          "Competitive hourly rate based on experience",
          "Flexible working hours",
          "Remote work options with periodic site visits",
          "Professional development opportunities",
          "Potential for long-term employment",
          "Collaborative and innovative work environment",
          "Opportunity to work on diverse and challenging projects"
        ]
      }
    },
    "sales-representative": {
      id: "5",
      title: "Sales Representative",
      slug: "sales-representative",
      company: "Industrial Solutions",
      companyLogo: "/placeholder-logo.svg",
      location: "Trois-Rivières, QC",
      type: "Full-time",
      salary: "Base + Commission",
      department: "Sales",
      experience: "2+ years",
      education: "Bachelor's degree in Business or related field preferred",
      postedDate: "2023-05-18",
      applicationDeadline: "2023-06-18",
      tags: ["B2B", "Business development", "Bilingual", "CRM"],
      description: {
        overview: "Industrial Solutions is looking for an energetic and results-driven Sales Representative to expand our client base in the industrial sector. As a Sales Representative, you will be responsible for generating leads, building relationships with new clients, and maintaining strong connections with existing customers. The ideal candidate will have a proven track record in B2B sales and excellent communication skills in both English and French.",
        responsibilities: [
          "Develop and implement effective sales strategies to meet and exceed targets",
          "Identify and pursue new business opportunities through prospecting and networking",
          "Conduct product demonstrations and presentations to potential clients",
          "Negotiate contracts and close deals",
          "Maintain accurate records of sales activities in CRM system",
          "Provide regular reports on sales performance and market trends",
          "Stay up-to-date with industry developments and competitor activities",
          "Attend trade shows and industry events to promote company products",
          "Collaborate with marketing team to develop effective sales materials"
        ],
        requirements: [
          "2+ years of experience in B2B sales, preferably in industrial or manufacturing sectors",
          "Bachelor's degree in Business, Marketing, or related field preferred",
          "Proven track record of meeting or exceeding sales targets",
          "Strong negotiation and closing skills",
          "Excellent communication and interpersonal abilities",
          "Fluency in both English and French",
          "Proficiency with CRM software and Microsoft Office suite",
          "Valid driver's license and ability to travel within the region",
          "Self-motivated with a high level of initiative and problem-solving skills"
        ],
        benefits: [
          "Competitive base salary plus uncapped commission structure",
          "Company car or car allowance",
          "Comprehensive health and dental benefits",
          "Mobile phone and laptop provided",
          "Paid vacation and sick days",
          "Regular training and professional development opportunities",
          "RRSP matching program",
          "Performance-based bonuses and incentives",
          "Team building events and company socials"
        ]
      }
    }
  },
  "fr": {
    "full-stack-developer": {
      id: "1",
      title: "Développeur Full Stack",
      slug: "full-stack-developer",
      company: "TechCorp Inc.",
      companyLogo: "/placeholder-logo.svg",
      location: "Montréal, QC",
      type: "Temps plein",
      salary: "75 000 $ - 95 000 $ par année",
      department: "Ingénierie",
      experience: "3+ ans",
      education: "Baccalauréat en informatique ou équivalent",
      postedDate: "2023-05-15",
      applicationDeadline: "2023-06-15",
      tags: ["React", "Node.js", "TypeScript", "MongoDB"],
      description: {
        overview: "TechCorp Inc. recherche un développeur Full Stack pour rejoindre notre équipe d'ingénierie. En tant que développeur Full Stack, vous serez responsable du développement et de la maintenance d'applications web utilisant React, Node.js et MongoDB. Vous travaillerez en étroite collaboration avec nos équipes de produit et de design pour implémenter de nouvelles fonctionnalités et améliorer celles existantes.",
        responsibilities: [
          "Développer et maintenir des applications web utilisant React, Node.js et MongoDB",
          "Collaborer avec les chefs de produit et les designers pour implémenter de nouvelles fonctionnalités",
          "Écrire du code propre, maintenable et efficace",
          "Optimiser les applications pour une vitesse et une évolutivité maximales",
          "Mettre en œuvre des mesures de sécurité et de protection des données",
          "Déboguer les problèmes signalés par les utilisateurs ou l'AQ",
          "Rester à jour avec les tendances et technologies émergentes"
        ],
        requirements: [
          "3+ ans d'expérience en développement full-stack",
          "Forte compétence en JavaScript/TypeScript et frameworks modernes",
          "Expérience avec React, Redux et bibliothèques associées",
          "Expérience avec Node.js et Express",
          "Expérience avec MongoDB ou bases de données NoSQL similaires",
          "Connaissance des API RESTful et GraphQL",
          "Compréhension du rendu côté serveur et de ses avantages",
          "Familiarité avec les systèmes de contrôle de version comme Git",
          "Excellentes compétences en résolution de problèmes et en communication"
        ],
        benefits: [
          "Salaire compétitif et programme d'actions",
          "Assurance santé, dentaire et vision",
          "Horaire de travail flexible et options de travail à distance",
          "Budget de développement professionnel",
          "Remboursement d'adhésion à une salle de sport",
          "Politique de vacances illimitées",
          "Bureau moderne au centre-ville de Montréal"
        ]
      }
    },
    "clinical-nurse": {
      id: "2",
      title: "Infirmier(ère) Clinique",
      slug: "clinical-nurse",
      company: "Centre Médical Saint-Laurent",
      companyLogo: "/placeholder-logo.svg",
      location: "Québec, QC",
      type: "Temps plein",
      salary: "70 000 $ - 85 000 $ par année",
      department: "Soins infirmiers",
      experience: "2+ ans",
      education: "Infirmier(ère) autorisé(e), Baccalauréat en sciences infirmières",
      postedDate: "2023-05-10",
      applicationDeadline: "2023-06-10",
      tags: ["Soins intensifs", "Soins aux patients", "Procédures médicales", "Bilingue"],
      description: {
        overview: "Le Centre Médical Saint-Laurent recherche un(e) infirmier(ère) clinique dévoué(e) pour rejoindre notre unité de soins intensifs. Le candidat idéal aura de l'expérience dans les milieux de soins aigus et sera engagé à fournir des soins exceptionnels aux patients. En tant qu'infirmier(ère) clinique, vous travaillerez avec notre équipe multidisciplinaire pour évaluer, planifier et mettre en œuvre des soins infirmiers pour les patients présentant des conditions médicales complexes.",
        responsibilities: [
          "Évaluer l'état de santé des patients et élaborer des plans de soins infirmiers",
          "Administrer des médicaments et des traitements selon les prescriptions des médecins",
          "Surveiller les signes vitaux des patients et réagir aux changements de leur état",
          "Coordonner avec d'autres professionnels de la santé pour assurer des soins complets",
          "Documenter les informations des patients et maintenir des dossiers médicaux précis",
          "Éduquer les patients et leurs familles sur la gestion de la santé et les soins préventifs",
          "Participer aux initiatives d'amélioration de la qualité",
          "Encadrer le personnel infirmier junior et les étudiants"
        ],
        requirements: [
          "Licence d'infirmier(ère) autorisé(e) valide au Québec",
          "Baccalauréat en sciences infirmières",
          "2+ ans d'expérience clinique, de préférence dans un cadre de soins intensifs",
          "Connaissance approfondie des procédures médicales et des protocoles infirmiers",
          "Excellentes compétences d'évaluation et de réflexion critique",
          "Capacité à travailler sous pression dans des environnements à rythme rapide",
          "Maîtrise de l'anglais et du français",
          "Certifications BLS et ACLS"
        ],
        benefits: [
          "Salaire compétitif et ensemble complet d'avantages sociaux",
          "Couverture médicale et dentaire",
          "Congés payés généreux et congés de maladie",
          "Plan de retraite avec contribution de l'employeur",
          "Opportunités de formation continue et remboursement des frais de scolarité",
          "Programme de bien-être des employés",
          "Stationnement subventionné ou carte de transport en commun"
        ]
      }
    },
    "senior-accountant": {
      id: "3",
      title: "Comptable Senior",
      slug: "senior-accountant",
      company: "Groupe Financier National",
      companyLogo: "/placeholder-logo.svg",
      location: "Laval, QC",
      type: "Temps plein",
      salary: "65 000 $ - 80 000 $ par année",
      department: "Finance",
      experience: "5+ ans",
      education: "Baccalauréat en comptabilité, CPA préféré",
      postedDate: "2023-05-05",
      applicationDeadline: "2023-06-05",
      tags: ["CPA", "Fiscalité", "États financiers", "Logiciels comptables"],
      description: {
        overview: "Le Groupe Financier National recherche un comptable senior pour rejoindre notre équipe financière. Dans ce rôle, vous serez responsable de la gestion des opérations comptables complexes, de la préparation des états financiers et du respect des normes comptables et des réglementations fiscales. Le candidat idéal aura une solide expérience en comptabilité, une attention aux détails et d'excellentes compétences analytiques.",
        responsibilities: [
          "Préparer et examiner les états financiers et les rapports",
          "Gérer les processus de clôture de fin de mois et de fin d'année",
          "Développer et maintenir les politiques et procédures comptables",
          "Assurer la conformité avec les PCGR, les IFRS et les réglementations fiscales pertinentes",
          "Réconcilier les comptes et enquêter sur les écarts",
          "Préparer les déclarations fiscales et les prévisions financières",
          "Superviser le personnel comptable junior",
          "Mettre en œuvre et améliorer les contrôles et processus financiers",
          "Collaborer avec les auditeurs lors des audits annuels"
        ],
        requirements: [
          "Baccalauréat en comptabilité, finance ou domaine connexe",
          "Désignation CPA préférée",
          "5+ ans d'expérience en comptabilité, y compris la préparation d'états financiers",
          "Solide connaissance des principes, pratiques et normes comptables",
          "Expérience avec les logiciels comptables et les systèmes ERP",
          "Maîtrise d'Excel et de la modélisation financière",
          "Excellentes compétences analytiques et de résolution de problèmes",
          "Grande attention aux détails et à la précision",
          "Capacité à travailler de manière indépendante et à respecter les délais"
        ],
        benefits: [
          "Salaire compétitif basé sur l'expérience",
          "Avantages santé et dentaires complets",
          "Programme d'appariement REER",
          "Primes basées sur la performance",
          "Opportunités de développement professionnel",
          "Arrangements de travail flexibles",
          "Programme d'aide aux employés",
          "Vacances payées et jours personnels"
        ]
      }
    },
    "civil-engineer": {
      id: "4",
      title: "Ingénieur Civil",
      slug: "civil-engineer",
      company: "Constructions Modernes Inc.",
      companyLogo: "/placeholder-logo.svg",
      location: "Montréal, QC",
      type: "Contractuel",
      salary: "45 $ - 60 $ de l'heure",
      department: "Ingénierie",
      experience: "3-5 ans",
      education: "Baccalauréat en génie civil",
      postedDate: "2023-05-12",
      applicationDeadline: "2023-06-12",
      tags: ["Génie civil", "AutoCAD", "Gestion de projet", "Infrastructure"],
      description: {
        overview: "Constructions Modernes Inc. recherche un ingénieur civil pour rejoindre notre équipe sur une base contractuelle pour une période initiale de 12 mois avec possibilité de prolongation ou de conversion en poste permanent. Dans ce rôle, vous serez responsable de la conception, de la planification et de la supervision des projets de construction, en mettant l'accent sur les infrastructures municipales et les développements commerciaux à travers le Québec.",
        responsibilities: [
          "Développer des conceptions d'ingénierie détaillées et des spécifications pour les projets de construction",
          "Préparer les calendriers de projet, les estimations de coûts et les besoins en ressources",
          "S'assurer que toutes les conceptions sont conformes aux codes du bâtiment, aux réglementations et aux normes de sécurité",
          "Coordonner avec les architectes, les entrepreneurs et d'autres disciplines d'ingénierie",
          "Effectuer des visites de site pour surveiller l'avancement et la qualité de la construction",
          "Identifier et résoudre les problèmes d'ingénierie qui surviennent pendant la construction",
          "Préparer des rapports techniques et des présentations pour les clients et les parties prenantes",
          "Examiner et approuver les dessins d'atelier et les soumissions de matériaux",
          "Assurer la liaison avec les autorités municipales pour les permis et approbations"
        ],
        requirements: [
          "Baccalauréat en génie civil",
          "Licence d'ingénieur professionnel (P.Eng) ou éligible à l'inscription",
          "3-5 ans d'expérience en génie civil, de préférence dans l'infrastructure municipale",
          "Maîtrise d'AutoCAD, Civil 3D et d'autres logiciels d'ingénierie",
          "Solide connaissance des codes du bâtiment et des normes de construction",
          "Expérience en gestion de projet et en supervision de construction",
          "Excellentes compétences en résolution de problèmes et en analyse",
          "Solides compétences en communication en anglais, le français est un atout",
          "Volonté de voyager sur des chantiers de construction à travers le Québec"
        ],
        benefits: [
          "Taux horaire compétitif basé sur l'expérience",
          "Horaires de travail flexibles",
          "Options de travail à distance avec visites périodiques sur site",
          "Opportunités de développement professionnel",
          "Potentiel d'emploi à long terme",
          "Environnement de travail collaboratif et innovant",
          "Opportunité de travailler sur des projets divers et stimulants"
        ]
      }
    },
    "sales-representative": {
      id: "5",
      title: "Représentant des Ventes",
      slug: "sales-representative",
      company: "Solutions Industrielles",
      companyLogo: "/placeholder-logo.svg",
      location: "Trois-Rivières, QC",
      type: "Temps plein",
      salary: "Base + Commission",
      department: "Ventes",
      experience: "2+ ans",
      education: "Baccalauréat en affaires ou domaine connexe préféré",
      postedDate: "2023-05-18",
      applicationDeadline: "2023-06-18",
      tags: ["B2B", "Développement des affaires", "Bilingue", "CRM"],
      description: {
        overview: "Solutions Industrielles recherche un représentant des ventes énergique et axé sur les résultats pour élargir notre clientèle dans le secteur industriel. En tant que représentant des ventes, vous serez responsable de la génération de leads, de l'établissement de relations avec de nouveaux clients et du maintien de liens solides avec les clients existants. Le candidat idéal aura une expérience prouvée dans les ventes B2B et d'excellentes compétences en communication en anglais et en français.",
        responsibilities: [
          "Développer et mettre en œuvre des stratégies de vente efficaces pour atteindre et dépasser les objectifs",
          "Identifier et poursuivre de nouvelles opportunités commerciales par la prospection et le réseautage",
          "Effectuer des démonstrations et des présentations de produits aux clients potentiels",
          "Négocier des contrats et conclure des accords",
          "Maintenir des registres précis des activités de vente dans le système CRM",
          "Fournir des rapports réguliers sur les performances de vente et les tendances du marché",
          "Rester à jour avec les développements de l'industrie et les activités des concurrents",
          "Assister aux salons professionnels et aux événements de l'industrie pour promouvoir les produits de l'entreprise",
          "Collaborer avec l'équipe marketing pour développer des supports de vente efficaces"
        ],
        requirements: [
          "2+ ans d'expérience dans les ventes B2B, de préférence dans les secteurs industriels ou manufacturiers",
          "Baccalauréat en affaires, marketing ou domaine connexe préféré",
          "Expérience prouvée dans l'atteinte ou le dépassement des objectifs de vente",
          "Solides compétences en négociation et en conclusion",
          "Excellentes aptitudes à la communication et aux relations interpersonnelles",
          "Maîtrise de l'anglais et du français",
          "Compétence avec les logiciels CRM et la suite Microsoft Office",
          "Permis de conduire valide et capacité à voyager dans la région",
          "Motivation personnelle avec un haut niveau d'initiative et de compétences en résolution de problèmes"
        ],
        benefits: [
          "Salaire de base compétitif plus structure de commission non plafonnée",
          "Voiture de fonction ou indemnité de voiture",
          "Avantages santé et dentaires complets",
          "Téléphone portable et ordinateur portable fournis",
          "Vacances payées et jours de maladie",
          "Formation régulière et opportunités de développement professionnel",
          "Programme d'appariement REER",
          "Primes et incitations basées sur la performance",
          "Événements de team building et rencontres sociales d'entreprise"
        ]
      }
    }
  }
};

export default jobListings;