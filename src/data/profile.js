// ---------------------------------------------------------------------------
// All site content lives here. Edit this file to update the portfolio.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'K M Mohith',
  role: 'Electronics & Communication Engineer',
  headline:
    'Electronics and communication engineer working across digital design, wireless systems and machine learning.',
  intro:
    'B.Tech ECE student at VIT Chennai, graduating in 2027. I’m interested in the whole path a signal takes, from RTL and silicon to the radio link and the models that interpret it. I’m looking for research internships and core engineering roles in VLSI, semiconductors and communications.',
  location: 'Thrissur, Kerala',
  resumeUrl: 'resume.pdf',
  resumeFileName: 'KM_Mohith_Resume.pdf',
  email: 'mohithkmadhu@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohith-km',
  github: 'https://github.com/Kmmohith',
}

export const about = {
  paragraphs: [
    'I study Electronics and Communication Engineering at Vellore Institute of Technology, Chennai. My work sits where hardware meets communication: digital logic in Verilog taken through RTL design and synthesis, and physical-layer models of wireless systems in MATLAB and Python, from OFDM channel estimation to a 5G NR downlink chain.',
    'More and more of it brings machine learning into that picture: learned channel estimators for OFDM, multi-radio localisation for low-power IoT devices, and real-time device detection and resolution at Samsung PRISM. I want to keep building at that boundary, in semiconductor and communication systems that are efficient, measurable and grounded in first principles.',
  ],
  interests: [
    'VLSI & semiconductor technology',
    'Digital & ASIC design',
    'Wireless communication',
    'Signal processing',
    'Applied machine learning',
  ],
}

export const experience = [
  {
    org: 'Samsung PRISM',
    orgDetail: 'Samsung R&D Institute India, Bangalore',
    role: 'Research Intern',
    period: 'Jul 2025 – Nov 2025',
    summary:
      'Built an end-to-end smart-home device resolution system that identifies devices from a multimedia feed, classifies their state and drives automated control.',
    points: [
      'YOLOv8n object detection reaching 99% mAP@50 across seven device classes',
      'Implemented a multimodal retrieval (RAG) pipeline with OpenCLIP (ViT-B-32) embeddings in a ChromaDB vector database',
      'Served it through a FastAPI backend integrated with Gemini 2.0 Flash for real-time device-state classification and control',
      'Evaluated with precision, recall and mAP, and benchmarked competing approaches during integration and testing',
    ],
    highlights: ['Recognised in the “Excellent Work” category'],
    areas: ['YOLOv8', 'OpenCLIP', 'ChromaDB', 'FastAPI', 'Gemini 2.0 Flash'],
  },
  {
    org: 'NSPCL',
    orgDetail: 'NTPC–SAIL Power Company Limited, Bhilai',
    role: 'Summer Intern, Control & Instrumentation',
    period: 'May 2025 – Jun 2025',
    summary:
      'Industrial internship in the C&I department of a 2×250 MW thermal power plant.',
    points: [
      'Studied the plant’s maxDNA distributed control system (DCS), tracing data from field sensors through remote I/O and controllers to the historian, alarms and operator HMI',
      'Learned calibration of RTDs, thermocouples, pressure and level transmitters and 4–20 mA signal loops',
      'Documented plant sections and interlock logic in a structured technical report',
    ],
    highlights: [],
    areas: ['DCS', 'Instrumentation', 'Control Systems', 'Power Plant Operations'],
  },
]

export const projects = [
  {
    title: 'Real-time downlink alert messaging over 5G NR',
    summary:
      'A MATLAB simulation of a 5G NR downlink that carries a text alert from transmitter to receiver and checks how reliably it is recovered as channel conditions change.',
    points: [
      'Transmit chain: binary mapping, 16-QAM modulation, 64-point OFDM and cyclic-prefix insertion over an AWGN channel',
      'Receive chain: FFT-based OFDM demodulation, QAM demapping and message recovery',
      'Analysed bit error rate and message recovery across SNR to validate the end-to-end link',
    ],
    tags: ['MATLAB', '5G NR', 'OFDM', '16-QAM'],
    github: 'https://github.com/Kmmohith/Real-Time-Downlink-Alert-Messaging-System-using-5G-NR',
    demo: null,
  },
  {
    title: 'OFDM channel estimation: classical and learned',
    summary:
      'A channel estimation framework for OFDM that benchmarks classical estimators against neural ones, with an interactive dashboard to train models and compare them live.',
    points: [
      'Monte Carlo simulation (120 frames × 12 symbols per point, 0–24 dB SNR) comparing LS, DFT-LS, MMSE, LMS and RLS against an ideal baseline on BER, NMSE and EVM',
      'MMSE reached a BER of 2.4×10⁻³ with about 12 dB lower NMSE than LS',
      'Extended in Python with CNN and MLP estimators built in PyTorch',
      'Streamlit dashboard for model training, visualisation and real-time estimator comparison',
    ],
    tags: ['Python', 'PyTorch', 'Streamlit', 'MATLAB', 'OFDM'],
    github: 'https://github.com/Kmmohith/ofdm-channel-estimator',
    demo: 'https://ofdm-channel-estimator.streamlit.app/',
  },
  {
    title: 'Hybrid multi-radio localisation for low-power IoT tracking',
    summary:
      'A GPS-free approach to tracking low-power IoT devices that estimates position by combining signals from several radios instead of relying on satellite positioning.',
    points: [
      'Fuses LoRa, Wi-Fi and BLE measurements in one localisation pipeline',
      'Developed and evaluated on a dataset collected by the project team',
    ],
    tags: ['IoT', 'LoRa', 'Wi-Fi', 'BLE', 'Machine Learning'],
    note: 'Team project',
    github: null,
    demo: null,
  },
]

export const otherProjects = [
  {
    title: 'TCP congestion control: comparative analysis',
    summary:
      'Six controlled ns-3 experiments (5–20 Mbps, 20–200 ms RTT, 0.5–10× BDP queues, 2–8 flows) comparing NewReno, Cubic, Vegas and BBR, each over five seeds with 95% confidence intervals. BBR cut delay by about 20% (68 vs 85 ms) at 97.8% link utilisation with fairness of at least 0.97.',
    tags: ['ns-3', 'FlowMonitor', 'Networking'],
  },
  {
    title: 'ECG arrhythmia classification',
    summary:
      '99,754 heartbeats from the MIT-BIH Arrhythmia database processed through wavelet denoising, normalisation and R-peak segmentation, then classified into five categories by a 1-D CNN at about 88–90% validation accuracy.',
    tags: ['MATLAB', 'CNN', 'Signal Processing'],
  },
]

export const skills = [
  { group: 'Languages', items: ['C', 'C++', 'Python', 'Java', 'MATLAB', 'Verilog', 'SQL'] },
  {
    group: 'Hardware & RTL',
    items: [
      'Digital Design',
      'ASIC Design',
      'RTL Design',
      'RTL Synthesis',
      'Static Timing Analysis',
      'FPGA',
      'VLSI',
    ],
  },
  {
    group: 'Tools',
    items: ['MATLAB', 'Simulink', 'ModelSim', 'Vivado', 'Yosys', 'LTspice', 'ns-3', 'Git'],
  },
  {
    group: 'ML & software',
    items: ['PyTorch', 'YOLOv8', 'OpenCV', 'RAG', 'ChromaDB', 'FastAPI', 'Streamlit'],
  },
  {
    group: 'Domains',
    items: [
      'Digital Signal Processing',
      'Wireless Communication',
      'Machine Learning',
      'Embedded Systems',
    ],
  },
]

export const education = {
  institution: 'Vellore Institute of Technology (VIT), Chennai',
  degree: 'B.Tech, Electronics and Communication Engineering',
  period: '2023 – 2027',
  cgpa: '9.02',
  cgpaScale: '10',
  credits: '138',
  coursework: [
    'Digital Communication',
    'Signal Processing',
    'Computer Networks',
    'Data Structures and Algorithms',
    'Object-Oriented Programming',
  ],
  school: {
    name: 'Marygiri CMI Public School (CBSE), Ernakulam',
    detail: 'Class XII, 94.8%',
    year: '2023',
  },
}

export const achievements = [
  {
    title: 'Excellent Work recognition, Samsung PRISM',
    detail: 'For the smart-home device resolution project at Samsung R&D Institute India.',
  },
  {
    title: 'Selected for the Samsung PRISM research internship',
    detail: 'Samsung R&D Institute India’s industry–academia research program.',
  },
  {
    title: 'CGPA of 9.02 / 10 at VIT Chennai',
    detail: 'Across 138 credits of B.Tech ECE coursework.',
  },
]

export const activities = [
  {
    title: 'Technical Team Member, IEEE Photonics Society, VIT Chennai',
    detail:
      'Organising committee member for multiple ideathons and chapter events, covering planning, logistics and participant engagement.',
  },
]

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]
