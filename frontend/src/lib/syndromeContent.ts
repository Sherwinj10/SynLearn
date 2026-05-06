// ─── Schema ───────────────────────────────────────────────────────────────────
export type SyndromeContent = {
  slug: string;
  name: string;
  subtitle: string;
  image: string;
  images?: string[];
  color: string;
  sections: {
    definition: string;
    etiology: string;
    incidence: string;
    classification: string;
    pathophysiology: string;
    facial_features: string[];
    physical_characteristics: string[];
    associated_features: string[];
    speech_language: string;
    recommendations: string[];
    references: string[];
  };
};

export const SYNDROME_CONTENT: SyndromeContent[] = [
  {
    slug: "trisomy-13",
    name: "Trisomy 13 (Patau Syndrome)",
    subtitle: "Patau Syndrome — severe chromosomal condition with multiple congenital anomalies.",
    image: "/syndromes/placeholder.png",
    images: [
      "/syndromes/placeholder.png",
      "/syndromes/placeholder.png",
      "/syndromes/placeholder.png"
    ],
    color: "#7c3aed",
    sections: {
      definition: `A severe chromosomal disorder caused by an extra copy of chromosome 13, leading to multiple congenital anomalies.`,
      etiology: `Nondisjunction → Trisomy 13 (47 chromosomes)
Rare: mosaicism or translocation`,
      incidence: `~1 in 10,000–16,000 live births
High mortality in infancy
Incidence: ~1 in 10,000–16,000 live births
Reference: GeneReviews; NIH`,
      classification: `Full trisomy
Mosaic trisomy
Translocation trisomy`,
      pathophysiology: `Extra genetic material disrupts normal embryonic development → affects brain, heart, and midline structures.`,
      facial_features: [
        "Midline cleft lip/palate",
        "Microphthalmia",
        "Sloping forehead",
      ],
      physical_characteristics: [
        "Polydactyly",
        "Congenital heart defects",
        "Holoprosencephaly",
      ],
      associated_features: [
        "Severe intellectual disability",
        "Seizures",
        "Growth failure",
      ],
      speech_language: `Severely impaired due to cognitive deficits and structural anomalies`,
      recommendations: [
        "Multidisciplinary care",
        "Feeding and respiratory support",
        "Genetic counseling",
      ],
      references: [
        "OMIM",
        "NIH Genetics Home Reference",
      ],
    },
  },
  {
    slug: "wolf-hirschhorn",
    name: "Wolf-Hirschhorn Syndrome",
    subtitle: "4p deletion syndrome causing 'Greek warrior helmet' facies and intellectual disability.",
    image: "/syndromes/placeholder.png",
    color: "#f97316",
    sections: {
      definition: `A genetic disorder caused by deletion of the short arm of chromosome 4.`,
      etiology: `4p deletion (partial monosomy)`,
      incidence: `~1 in 50,000 births
Prevalence: ~1 in 20,000–50,000 births
Recent registry: ~1 in 46,000 total births
Reference: Orphanet; UK registry studies`,
      classification: `Based on size of deletion (mild to severe)`,
      pathophysiology: `Loss of critical genes affects growth, brain development, and craniofacial formation.`,
      facial_features: [
        "“Greek warrior helmet” appearance",
        "Broad nasal bridge",
        "Hypertelorism",
      ],
      physical_characteristics: [
        "Microcephaly",
        "Growth retardation",
      ],
      associated_features: [
        "Seizures",
        "Heart defects",
      ],
      speech_language: `Severe delay
Limited expressive language`,
      recommendations: [
        "Early intervention",
        "Seizure management",
        "Speech therapy",
      ],
      references: [
        "OMIM",
        "NIH",
      ],
    },
  },
  {
    slug: "opitz-syndrome",
    name: "Opitz Syndrome",
    subtitle: "Midline defects including hypertelorism, cleft palate, and genital abnormalities.",
    image: "/syndromes/placeholder.png",
    color: "#84cc16",
    sections: {
      definition: `A genetic disorder affecting midline structures of the body.`,
      etiology: `X-linked or autosomal dominant mutation (MID1 gene)`,
      incidence: `Rare (exact prevalence unknown)
Prevalence: <1 in 100,000 (estimated)
Reference: GARD; Orphanet`,
      classification: `Type I (X-linked)
Type II (autosomal dominant)`,
      pathophysiology: `Defective midline development → airway, genital, and facial anomalies.`,
      facial_features: [
        "Hypertelorism",
      ],
      physical_characteristics: [
        "Laryngeal cleft",
        "Hypospadias",
      ],
      associated_features: [
        "Swallowing difficulty",
        "Aspiration pneumonia",
      ],
      speech_language: `Voice disorders
Resonance issues`,
      recommendations: [
        "Airway management",
        "Feeding therapy",
        "Speech therapy",
      ],
      references: [
        "OMIM",
        "Genetic and Rare Diseases Information Center",
      ],
    },
  },
  {
    slug: "van-der-woude",
    name: "Van der Woude Syndrome",
    subtitle: "IRF6-linked cleft lip/palate with characteristic lower lip pits.",
    image: "/syndromes/placeholder.png",
    color: "#84cc16",
    sections: {
      definition: `A genetic syndrome characterized by cleft lip/palate and lower lip pits.`,
      etiology: `Mutation in IRF6 gene
Autosomal dominant`,
      incidence: `~1 in 35,000–100,000
Prevalence: ~1 in 35,000–100,000
Reference: GeneReviews`,
      classification: `Classic
With variable expression`,
      pathophysiology: `Abnormal orofacial development due to disrupted epithelial differentiation.`,
      facial_features: [
        "Lower lip pits",
      ],
      physical_characteristics: [
        "Missing teeth",
        "Cleft lip/palate",
      ],
      associated_features: [
        "Dental anomalies",
      ],
      speech_language: `Articulation issues (due to cleft)`,
      recommendations: [
        "Surgical repair",
        "Speech therapy",
        "Orthodontic care",
      ],
      references: [
        "OMIM",
        "Cleft Palate Foundation",
      ],
    },
  },
  {
    slug: "orofacial-digital-syndrome",
    name: "Orofacial Digital Syndrome (OFD)",
    subtitle: "X-linked ciliopathy with midline oral clefts, lobulated tongue, and digital anomalies.",
    image: "/syndromes/placeholder.png",
    color: "#f97316",
    sections: {
      definition: `A group of disorders affecting oral cavity, face, and digits.`,
      etiology: `X-linked dominant (Type I most common)`,
      incidence: `Rare (~1 in 50,000–250,000)
Prevalence: ~1 in 50,000–250,000
Reference: Orphanet`,
      classification: `OFD Type I (most common)
Multiple subtypes (I–XIII)`,
      pathophysiology: `Defects in cilia function → abnormal embryonic signaling.`,
      facial_features: [
        "Midline cleft",
        "Lobulated tongue",
      ],
      physical_characteristics: [
        "Syndactyly",
        "Clinodactyly",
        "Multiple frenula",
      ],
      associated_features: [
        "Renal anomalies",
        "Hydrocephalus",
        "Corpus callosum defects",
      ],
      speech_language: `Delay due to structural anomalies`,
      recommendations: [
        "Surgical correction",
        "Speech therapy",
        "Renal monitoring",
      ],
      references: [
        "OMIM",
        "NIH",
      ],
    },
  },
  {
    slug: "pierre-robin",
    name: "Pierre Robin Sequence",
    subtitle: "Triad of micrognathia, glossoptosis, and airway obstruction.",
    image: "/syndromes/placeholder.png",
    images: [
      "/syndromes/placeholder.png",
      "/syndromes/placeholder.png",
      "/syndromes/placeholder.png"
    ],
    color: "#2563eb",
    sections: {
      definition: `A developmental sequence characterized by micrognathia, glossoptosis, and airway obstruction, often associated with cleft palate.`,
      etiology: `Multifactorial
Can be isolated or syndromic (commonly associated with Stickler Syndrome)
Mechanical constraint during fetal development`,
      incidence: `~1 in 8,500–14,000 live births
Recent meta-analysis: 9.5 per 100,000 births
European registry (EUROCAT): ~12 per 100,000
Incidence: ~1 in 8,500–14,000
Meta-analysis: ~9.5 per 100,000
Reference: Recent PubMed meta-analysis; Orphanet`,
      classification: `Isolated PRS
Syndromic PRS
Associated PRS`,
      pathophysiology: `Mandibular hypoplasia → posterior displacement of tongue → prevents palatal fusion → airway obstruction`,
      facial_features: [
        "Micrognathia",
        "Retrognathia",
        "Glossoptosis",
      ],
      physical_characteristics: [
        "Cleft palate",
        "Feeding difficulty",
        "Respiratory distress",
      ],
      associated_features: [
        "Hearing loss (due to OME)",
        "Failure to thrive",
      ],
      speech_language: `Hypernasality
Articulation errors
Delayed speech due to hearing loss`,
      recommendations: [
        "Airway management (prone positioning / surgery)",
        "Feeding intervention",
        "Early speech therapy",
        "Audiological monitoring",
      ],
      references: [
        "GeneReviews (2023)",
        "EUROCAT registry data",
        "PubMed meta-analysis (2022–2024)",
      ],
    },
  },
  {
    slug: "stickler-syndrome",
    name: "Stickler Syndrome",
    subtitle: "Hereditary collagen disorder with myopia, cleft palate, and hearing loss.",
    image: "/syndromes/placeholder.png",
    color: "#6366f1",
    sections: {
      definition: `A hereditary connective tissue disorder affecting collagen, involving craniofacial, ocular, and auditory systems.`,
      etiology: `Autosomal dominant
Mutations in COL2A1, COL11A1`,
      incidence: `~1 in 7,500–9,000 live births
Likely underdiagnosed due to mild phenotypes
  Prevalence: ~1 in 7,500–9,000
  Reference: GeneReviews`,
      classification: `Type I (COL2A1)
Type II (COL11A1)
Type III (non-ocular)`,
      pathophysiology: `Defective collagen → abnormal development of cartilage, vitreous humor, and craniofacial structures`,
      facial_features: [
        "Flat midface",
        "Micrognathia",
        "Depressed nasal bridge",
      ],
      physical_characteristics: [
        "Cleft palate",
        "High myopia",
        "Retinal detachment",
      ],
      associated_features: [
        "Hearing loss (conductive → SNHL)",
        "Early osteoarthritis",
      ],
      speech_language: `Hypernasality
Articulation errors
Delay due to hearing loss`,
      recommendations: [
        "Ophthalmologic care (urgent)",
        "Audiological monitoring",
        "Speech therapy",
        "Genetic counseling",
      ],
      references: [
        "GeneReviews",
        "Orphanet (2024 update)",
      ],
    },
  },
  {
    slug: "velocardio-facial",
    name: "Velocardiofacial Syndrome (22q11.2 Deletion)",
    subtitle: "22q11.2 deletion causing VPI, cardiac defects, and language delay.",
    image: "/syndromes/placeholder.png",
    color: "#0ea5e9",
    sections: {
      definition: `A multisystem genetic disorder involving cleft palate, cardiac defects, and cognitive impairment.`,
      etiology: `Microdeletion of chromosome 22q11.2`,
      incidence: `~1 in 3,000–4,000 live births
One of the most common microdeletion syndromes
  Prevalence: ~1 in 3,000–4,000
  Reference: GeneReviews`,
      classification: `Includes DiGeorge Syndrome spectrum`,
      pathophysiology: `Failure of neural crest cell migration → affects heart, palate, thymus`,
      facial_features: [
        "Long face",
        "Bulbous nasal tip",
        "Narrow palpebral fissures",
      ],
      physical_characteristics: [
        "Velopharyngeal insufficiency",
        "Congenital heart defects",
      ],
      associated_features: [
        "Learning disability",
        "Psychiatric disorders (schizophrenia risk ↑)",
      ],
      speech_language: `Hypernasality
Apraxia of speech
Language delay`,
      recommendations: [
        "VPI management",
        "Speech therapy",
        "Cardiac care",
        "Psychological support",
      ],
      references: [
        "GeneReviews (2023 update)",
        "NIH / OMIM",
      ],
    },
  },
  {
    slug: "fetal-alcohol-syndrome",
    name: "Fetal Alcohol Syndrome (FAS)",
    subtitle: "Prenatal alcohol exposure causing facial and neurodevelopmental abnormalities.",
    image: "/syndromes/placeholder.png",
    color: "#f97316",
    sections: {
      definition: `A condition resulting from prenatal alcohol exposure, causing growth, facial, and neurodevelopmental abnormalities.`,
      etiology: `Maternal alcohol consumption during pregnancy`,
      incidence: `Global: ~0.77% of live births
India: ~1–9 per 1,000 (likely underreported)
Higher in high-risk populations
  Prevalence: ~0.77% globally (~7.7 per 1,000 births)
  Reference: WHO`,
      classification: `FAS
Partial FAS
Alcohol-related neurodevelopmental disorder`,
      pathophysiology: `Alcohol → teratogenic → disrupts CNS development, neural crest migration`,
      facial_features: [
        "Smooth philtrum",
        "Thin upper lip",
        "Short palpebral fissures",
      ],
      physical_characteristics: [
        "Growth deficiency",
        "Microcephaly",
      ],
      associated_features: [
        "Behavioral issues",
        "ADHD-like symptoms",
      ],
      speech_language: `Language delay
Pragmatic deficits`,
      recommendations: [
        "Early intervention",
        "Behavioral therapy",
        "Speech therapy",
      ],
      references: [
        "World Health Organization",
        "CDC / PubMed reviews",
      ],
    },
  },
  {
    slug: "crouzon-syndrome",
    name: "Crouzon Syndrome",
    subtitle: "FGFR2 craniosynostosis with exophthalmos and midface hypoplasia.",
    image: "/syndromes/placeholder.png",
    color: "#ef4444",
    sections: {
      definition: `A craniosynostosis syndrome causing premature fusion of skull sutures.`,
      etiology: `Mutation in FGFR2 gene (autosomal dominant)`,
      incidence: `~1 in 25,000 births
  Incidence: ~1 in 25,000
  Reference: Orphanet`,
      classification: `Classic
Severe craniofacial form`,
      pathophysiology: `Premature suture fusion → abnormal skull and facial growth`,
      facial_features: [
        "Exophthalmos",
        "Midface hypoplasia",
      ],
      physical_characteristics: [
        "Hydrocephalus",
        "Strabismus",
      ],
      associated_features: [
        "Hearing loss",
        "Increased ICP",
      ],
      speech_language: `Articulation errors
Resonance issues`,
      recommendations: [
        "Craniofacial surgery",
        "Audiology + speech therapy",
      ],
      references: [
        "GeneReviews",
        "Orphanet",
      ],
    },
  },
  {
    slug: "apert-syndrome",
    name: "Apert Syndrome",
    subtitle: "Craniosynostosis with syndactyly of hands and feet.",
    image: "/syndromes/apert_syndrome.png",
    color: "#6366f1",
    sections: {
      definition: `A craniosynostosis syndrome with syndactyly.`,
      etiology: `FGFR2 mutation`,
      incidence: `~1 in 65,000–88,000
  Incidence: ~1 in 65,000–88,000
  Reference: GeneReviews`,
      classification: `Classic
Severe`,
      pathophysiology: `Early skull fusion + limb malformation`,
      facial_features: [
        "Beaked nose",
        "Midface hypoplasia",
      ],
      physical_characteristics: [
        "Syndactyly (mitten hands)",
      ],
      associated_features: [
        "Mild–moderate ID",
      ],
      speech_language: `Hyponasality
Articulation issues`,
      recommendations: [
        "Surgical correction",
        "Speech therapy",
      ],
      references: [
        "GeneReviews",
      ],
    },
  },
  {
    slug: "saethre-chotzen",
    name: "Saethre–Chotzen Syndrome",
    subtitle: "TWIST1-linked craniosynostosis with facial asymmetry and mild limb anomalies.",
    image: "/syndromes/apert_syndrome.png",
    color: "#10b981",
    sections: {
      definition: `A rare autosomal dominant craniosynostosis syndrome characterized by premature fusion of cranial sutures, facial asymmetry, and mild limb anomalies.`,
      etiology: `Mutation in TWIST1 gene located on chromosome 7p21
Autosomal dominant inheritance
~50% cases are de novo mutations`,
      incidence: `Estimated 1 in 25,000–50,000 live births
Considered one of the more common craniosynostosis syndromes after Crouzon and Apert
Likely underdiagnosed due to mild phenotypes (especially without genetic testing)
  Incidence: ~1 in 25,000–50,000
  Reference: GeneReviews`,
      classification: `Classic Saethre–Chotzen
Severe phenotype (large deletions involving TWIST1)
Mild/atypical presentations`,
      pathophysiology: `TWIST1 gene regulates mesenchymal cell differentiation
Mutation → premature coronal suture fusion
Leads to abnormal skull growth and facial asymmetry`,
      facial_features: [
        "Facial asymmetry",
        "Ptosis (drooping eyelids)",
        "Hypertelorism",
        "Low frontal hairline",
        "Small ears",
      ],
      physical_characteristics: [
        "Syndactyly (2nd–3rd fingers)",
        "Brachydactyly",
        "Short stature (occasionally)",
      ],
      associated_features: [
        "Hearing loss (conductive)",
        "Increased intracranial pressure",
        "Mild developmental delay (rare)",
      ],
      speech_language: `Usually normal speech development
Mild articulation issues if:
Cleft palate present
Hearing loss present`,
      recommendations: [
        "Early cranial vault surgery",
        "Audiological evaluation",
        "Speech therapy if needed",
        "Genetic counseling",
      ],
      references: [
        "GeneReviews",
        "Orphanet",
      ],
    },
  },
  {
    slug: "pfeiffer-syndrome",
    name: "Pfeiffer Syndrome",
    subtitle: "FGFR1/2 craniosynostosis with broad thumbs and big toes.",
    image: "/syndromes/apert_syndrome.png",
    color: "#8b5cf6",
    sections: {
      definition: `A genetic craniosynostosis disorder characterized by premature skull fusion and broad thumbs/toes.`,
      etiology: `Mutation in FGFR1 or FGFR2 genes
Autosomal dominant`,
      incidence: `Approximately 1 in 100,000 live births
Rare but well-documented craniosynostosis syndrome
  Incidence: ~1 in 100,000
  Reference: Orphanet`,
      classification: `Type I (classic, mild)
Type II (cloverleaf skull, severe)
Type III (severe without cloverleaf skull)`,
      pathophysiology: `FGFR mutations → abnormal osteoblast activity
Leads to premature fusion of multiple sutures`,
      facial_features: [
        "Midface hypoplasia",
        "Proptosis (bulging eyes)",
        "Hypertelorism",
      ],
      physical_characteristics: [
        "Broad thumbs and great toes",
        "Syndactyly (partial)",
        "Airway obstruction",
      ],
      associated_features: [
        "Hearing loss",
        "Hydrocephalus",
        "Developmental delay (especially Type II & III)",
      ],
      speech_language: `Delayed speech development
Articulation and resonance disorders
Impact due to:
Hearing loss
Structural anomalies`,
      recommendations: [
        "Multidisciplinary craniofacial care",
        "Airway management",
        "Hearing assessment",
        "Speech therapy",
      ],
      references: [
        "GeneReviews",
        "Orphanet",
      ],
    },
  },
  {
    slug: "goldenhar-syndrome",
    name: "Goldenhar Syndrome (OAV Spectrum)",
    subtitle: "Oculo-auriculo-vertebral spectrum with unilateral facial anomalies.",
    image: "/syndromes/apert_syndrome.png",
    color: "#0ea5e9",
    sections: {
      definition: `A congenital condition involving abnormal development of the face, ears, and vertebrae.`,
      etiology: `Multifactorial
Defect in first and second branchial arches`,
      incidence: `~1 in 3,000–5,000 live births
Male > Female
Right side more commonly affected
  Incidence: ~1 in 3,000–5,000
  Reference: Orphanet; epidemiological registries`,
      classification: `Mild
Moderate
Severe (bilateral involvement)`,
      pathophysiology: `Disruption in neural crest cell migration
Leads to craniofacial asymmetry`,
      facial_features: [
        "Facial asymmetry",
        "Mandibular hypoplasia",
        "Malar hypoplasia",
      ],
      physical_characteristics: [
        "Microtia / anotia",
        "Vertebral anomalies",
        "Eye anomalies (epibulbar dermoids)",
      ],
      associated_features: [
        "Hearing loss",
        "Cardiac defects",
        "Renal anomalies",
      ],
      speech_language: `Articulation disorders
Delay due to hearing loss
Resonance issues (if cleft present)`,
      recommendations: [
        "Audiological management",
        "Speech therapy",
        "Surgical correction",
        "Multidisciplinary care",
      ],
      references: [
        "Orphanet",
        "PubMed clinical reviews",
      ],
    },
  },
  {
    slug: "charge-association",
    name: "CHARGE Syndrome",
    subtitle: "Coloboma, Heart defects, choanal Atresia, Retardation, Genital and Ear anomalies.",
    image: "/syndromes/apert_syndrome.png",
    color: "#f59e0b",
    sections: {
      definition: `A complex genetic syndrome involving multiple congenital anomalies, classically described by the acronym CHARGE (Coloboma, Heart defects, Atresia of choanae, Retardation of growth/development, Genital anomalies, Ear anomalies).`,
      etiology: `Mutation in CHD7 gene
Usually de novo, autosomal dominant pattern`,
      incidence: `Approximately 1 in 8,500–15,000 live births
Recent registry data suggest improved detection due to genetic testing
Considered a rare but well-recognized syndrome
  Incidence: ~1 in 8,500–15,000
  Reference: GeneReviews`,
      classification: `Typical CHARGE
Atypical/partial CHARGE`,
      pathophysiology: `CHD7 gene mutation → abnormal chromatin remodeling → disrupted embryological development affecting multiple organ systems`,
      facial_features: [
        "Asymmetric facial appearance",
        "Square face",
        "Facial nerve palsy",
      ],
      physical_characteristics: [
        "Choanal atresia",
        "Ear anomalies (external + middle ear)",
        "Cranial nerve dysfunction",
      ],
      associated_features: [
        "Visual impairment (coloboma)",
        "Congenital heart defects",
        "Genital hypoplasia",
        "Growth retardation",
      ],
      speech_language: `Severe delay
Feeding and swallowing difficulties (cranial nerve involvement)
Voice abnormalities
Often multimodal communication required`,
      recommendations: [
        "Early multidisciplinary intervention",
        "Feeding and swallowing therapy",
        "Hearing and vision rehabilitation",
        "Augmentative communication (AAC) if needed",
      ],
      references: [
        "GeneReviews",
        "Orphanet",
      ],
    },
  },
  {
    slug: "treacher-collins",
    name: "Treacher Collins Syndrome",
    subtitle: "TCOF1-linked mandibulofacial dysostosis affecting cheekbones, jaw, and ears.",
    image: "/syndromes/apert_syndrome.png",
    color: "#ef4444",
    sections: {
      definition: `A genetic disorder affecting craniofacial development, especially structures derived from the first branchial arch.`,
      etiology: `Mutation in TCOF1 gene (most common)
Autosomal dominant`,
      incidence: `~1 in 50,000 live births
Consistent across populations
  Incidence: ~1 in 50,000
  Reference: GeneReviews`,
      classification: `Classic
Severe craniofacial involvement`,
      pathophysiology: `Defective neural crest cell development → underdevelopment of facial bones and ear structures`,
      facial_features: [
        "Downward slanting palpebral fissures",
        "Micrognathia",
        "Malar hypoplasia",
      ],
      physical_characteristics: [
        "Microtia",
        "External and middle ear anomalies",
        "Airway obstruction",
      ],
      associated_features: [
        "Conductive hearing loss",
        "Feeding difficulties",
      ],
      speech_language: `Delayed speech due to hearing impairment
Articulation errors
Resonance issues`,
      recommendations: [
        "Early hearing amplification",
        "Speech therapy",
        "Craniofacial surgery",
        "Airway management",
      ],
      references: [
        "GeneReviews",
      ],
    },
  },
  {
    slug: "beckwith-wiedemann",
    name: "Beckwith–Wiedemann Syndrome",
    subtitle: "Overgrowth syndrome with macroglossia and organomegaly.",
    image: "/syndromes/apert_syndrome.png",
    color: "#0ea5e9",
    sections: {
      definition: `An overgrowth disorder characterized by macroglossia, macrosomia, and increased tumor risk.`,
      etiology: `Abnormal imprinting on chromosome 11p15.5
Sporadic or inherited`,
      incidence: `~1 in 13,700 live births
Increased in assisted reproductive technologies
  Incidence: ~1 in 13,700
  Reference: GeneReviews`,
      classification: `Classic BWS
Mosaic BWS`,
      pathophysiology: `Dysregulation of growth-controlling genes → overgrowth and tumor predisposition`,
      facial_features: [
        "Macroglossia",
        "Ear creases/pits",
      ],
      physical_characteristics: [
        "Hemihyperplasia",
        "Omphalocele",
        "Organomegaly",
      ],
      associated_features: [
        "Hypoglycemia in neonates",
        "Increased risk of tumors (Wilms tumor, hepatoblastoma)",
      ],
      speech_language: `Articulation difficulties (due to macroglossia)
Resonance issues
Possible delay secondary to structural issues`,
      recommendations: [
        "Tumor surveillance (regular screening)",
        "Surgical tongue reduction if required",
        "Speech therapy",
      ],
      references: [
        "GeneReviews",
      ],
    },
  },
  {
    slug: "nager-syndrome",
    name: "Nager Syndrome",
    subtitle: "Acrofacial dysostosis with mandibular hypoplasia and preaxial limb defects.",
    image: "/syndromes/apert_syndrome.png",
    color: "#14b8a6",
    sections: {
      definition: `A rare craniofacial syndrome with mandibulofacial dysostosis and limb anomalies.`,
      etiology: `Mutation in SF3B4 gene
Autosomal dominant or sporadic`,
      incidence: `Extremely rare: <1 in 1,000,000 live births
Limited epidemiological data
  Prevalence: <1 in 1,000,000
  Reference: Orphanet`,
      classification: `Classic Nager
Variable phenotypic expression`,
      pathophysiology: `Abnormal first branchial arch development → craniofacial and limb anomalies`,
      facial_features: [
        "Micrognathia",
        "Malar hypoplasia",
        "Downward slanting eyes",
      ],
      physical_characteristics: [
        "Limb defects (thumb anomalies)",
        "Ear anomalies",
      ],
      associated_features: [
        "Hearing loss",
        "Airway obstruction",
        "Feeding difficulties",
      ],
      speech_language: `Delayed speech
Articulation errors
Language delay secondary to hearing loss`,
      recommendations: [
        "Airway management",
        "Hearing rehabilitation",
        "Speech therapy",
        "Feeding intervention",
      ],
      references: [
        "Orphanet",
      ],
    },
  },
  {
    slug: "edwards-syndrome",
    name: "Edwards Syndrome (Trisomy 18)",
    subtitle: "Trisomy 18 — severe multi-organ malformations with limited survival.",
    image: "/syndromes/apert_syndrome.png",
    color: "#14b8a6",
    sections: {
      definition: `A severe chromosomal disorder caused by an extra copy of chromosome 18.`,
      etiology: `Nondisjunction → Trisomy 18
Rare mosaic/translocation forms`,
      incidence: `~1 in 5,000 live births
Higher prenatal prevalence due to fetal loss
  Incidence: ~1 in 5,000 live births
  Reference: NIH`,
      classification: `Full trisomy
Mosaic
Translocation`,
      pathophysiology: `Extra chromosome → widespread developmental abnormalities affecting multiple systems`,
      facial_features: [
        "Micrognathia",
        "Low-set ears",
      ],
      physical_characteristics: [
        "Clenched fists",
        "Rocker-bottom feet",
        "Congenital heart defects",
      ],
      associated_features: [
        "Severe intellectual disability",
        "Growth retardation",
      ],
      speech_language: `Severely impaired
Minimal communicative ability`,
      recommendations: [
        "Supportive care",
        "Feeding support",
        "Family counseling",
      ],
      references: [
        "National Institutes of Health",
        "OMIM",
      ],
    },
  },
  {
    slug: "digeorge-syndrome",
    name: "DiGeorge Syndrome (22q11.2 Deletion Syndrome)",
    subtitle: "22q11.2 deletion with cardiac defects, immune deficiency, and palatal anomalies.",
    image: "/syndromes/apert_syndrome.png",
    color: "#6366f1",
    sections: {
      definition: `A genetic disorder caused by deletion of chromosome 22q11.2, affecting cardiac, immune, and craniofacial systems.`,
      etiology: `Microdeletion at 22q11.2
Mostly de novo`,
      incidence: `~1 in 4,000 live births
One of the most common microdeletion syndromes
  Prevalence: ~1 in 4,000
  Reference: GeneReviews`,
      classification: `Part of 22q11.2 deletion spectrum (includes VCFS)`,
      pathophysiology: `Defective neural crest migration → affects heart, thymus, palate`,
      facial_features: [
        "Long face",
        "Hooded eyelids",
        "Bulbous nasal tip",
      ],
      physical_characteristics: [
        "Cleft palate / VPI",
        "Cardiac defects",
        "Hypocalcemia",
      ],
      associated_features: [
        "Immune deficiency",
        "Psychiatric disorders (anxiety, schizophrenia risk)",
      ],
      speech_language: `Hypernasality (VPI)
Apraxia of speech
Language delay`,
      recommendations: [
        "Speech therapy (especially resonance + apraxia)",
        "Cardiac management",
        "Immune monitoring",
        "Psychological support",
      ],
      references: [
        "GeneReviews",
        "National Institutes of Health",
      ],
    },
  },
  {
    slug: "miller-syndrome",
    name: "Miller Syndrome",
    subtitle: "Postaxial acrofacial dysostosis with craniofacial and limb defects.",
    image: "/syndromes/apert_syndrome.png",
    color: "#f59e0b",
    sections: {
      definition: `A rare genetic disorder characterized by craniofacial abnormalities and limb defects (postaxial acrofacial dysostosis).`,
      etiology: `Mutation in DHODH gene
Autosomal recessive inheritance`,
      incidence: `Extremely rare: <1 in 1,000,000 live births
Only a limited number of cases reported worldwide
  Prevalence: <1 in 1,000,000
  Reference: Orphanet`,
      classification: `No major subtypes; variable severity`,
      pathophysiology: `Defective pyrimidine synthesis → impaired cell proliferation → abnormal craniofacial and limb development`,
      facial_features: [
        "Micrognathia",
        "Malar hypoplasia",
        "Downward slanting palpebral fissures",
      ],
      physical_characteristics: [
        "Limb anomalies (absence/hypoplasia of digits)",
        "Cleft palate",
      ],
      associated_features: [
        "Hearing loss",
        "Feeding and breathing difficulties",
      ],
      speech_language: `Delayed speech development
Articulation errors
Delay secondary to hearing loss and structural anomalies`,
      recommendations: [
        "Multidisciplinary management",
        "Hearing rehabilitation",
        "Speech therapy",
        "Surgical correction",
      ],
      references: [
        "Orphanet",
        "GeneReviews",
      ],
    },
  },
  {
    slug: "hemifacial-microsomia",
    name: "Hemifacial Microsomia",
    subtitle: "Unilateral underdevelopment of the ear, mandible, and soft tissue.",
    image: "/syndromes/apert_syndrome.png",
    color: "#8b5cf6",
    sections: {
      definition: `A congenital condition involving underdevelopment of one side of the face, especially ear and mandible.`,
      etiology: `Multifactorial
Neural crest cell disruption`,
      incidence: `~1 in 3,500–5,600 live births
Second most common craniofacial anomaly after cleft lip/palate
  Incidence: ~1 in 3,500–5,600
  Reference: Orphanet`,
      classification: `Mild
Moderate
Severe (bilateral cases)`,
      pathophysiology: `Impaired development of first and second branchial arches`,
      facial_features: [
        "Facial asymmetry",
        "Mandibular hypoplasia",
      ],
      physical_characteristics: [
        "Ear anomalies (microtia)",
        "Vertebral anomalies",
      ],
      associated_features: [
        "Hearing loss",
        "Cardiac and renal anomalies",
      ],
      speech_language: `Articulation disorders
Delay due to hearing impairment
Resonance issues (if cleft present)`,
      recommendations: [
        "Audiological evaluation",
        "Speech therapy",
        "Orthognathic surgery",
      ],
      references: [
        "Orphanet",
      ],
    },
  },
  {
    slug: "kabuki-syndrome",
    name: "Kabuki Syndrome",
    subtitle: "KMT2D/KDM6A mutation causing distinctive facial features and intellectual disability.",
    image: "/syndromes/apert_syndrome.png",
    color: "#ec4899",
    sections: {
      definition: `A genetic syndrome characterized by distinct facial features, intellectual disability, and skeletal anomalies.`,
      etiology: `Mutation in KMT2D (MLL2) or KDM6A genes`,
      incidence: `~1 in 32,000 births (Japan data; globally underdiagnosed)
  Incidence: ~1 in 32,000
  Reference: GeneReviews`,
      classification: `Type 1 (KMT2D)
Type 2 (KDM6A)`,
      pathophysiology: `Epigenetic regulation defect → abnormal gene expression during development`,
      facial_features: [
        "Long palpebral fissures",
        "Arched eyebrows",
        "Prominent ears",
      ],
      physical_characteristics: [
        "Short stature",
        "Skeletal anomalies",
      ],
      associated_features: [
        "Congenital heart defects",
        "Immune deficiency",
      ],
      speech_language: `Delayed expressive language
Mild–moderate intellectual disability
Articulation errors`,
      recommendations: [
        "Early intervention",
        "Speech therapy",
        "Medical management",
      ],
      references: [
        "GeneReviews",
      ],
    },
  },
  {
    slug: "smith-lemli-opitz",
    name: "Smith–Lemli–Opitz Syndrome",
    subtitle: "Cholesterol synthesis defect causing multi-system anomalies.",
    image: "/syndromes/apert_syndrome.png",
    color: "#14b8a6",
    sections: {
      definition: `A metabolic disorder affecting cholesterol synthesis, leading to multiple congenital anomalies.`,
      etiology: `Mutation in DHCR7 gene
Autosomal recessive`,
      incidence: `~1 in 20,000–60,000 live births
  Incidence: ~1 in 20,000–60,000
  Reference: GeneReviews`,
      classification: `Mild
Severe`,
      pathophysiology: `Defective cholesterol synthesis → abnormal embryonic development`,
      facial_features: [
        "Microcephaly",
        "Ptosis",
        "Small nose",
      ],
      physical_characteristics: [
        "Syndactyly (2nd–3rd toes)",
        "Genital anomalies",
      ],
      associated_features: [
        "Intellectual disability",
        "Behavioral issues",
      ],
      speech_language: `Delayed speech
Poor expressive language`,
      recommendations: [
        "Dietary cholesterol supplementation",
        "Speech therapy",
        "Behavioral management",
      ],
      references: [
        "GeneReviews",
      ],
    },
  },
  {
    slug: "cri-du-chat",
    name: "Cri-du-chat Syndrome",
    subtitle: "5p deletion causing high-pitched cry, intellectual disability, and facial features.",
    image: "/syndromes/apert_syndrome.png",
    color: "#ec4899",
    sections: {
      definition: `A chromosomal disorder caused by deletion of the short arm of chromosome 5.`,
      etiology: `5p deletion`,
      incidence: `~1 in 15,000–50,000 live births
  Incidence: ~1 in 15,000–50,000
  Reference: NIH`,
      classification: `Based on size of deletion`,
      pathophysiology: `Loss of genetic material → abnormal brain development`,
      facial_features: [
        "Round face",
        "Micrognathia",
        "Hypertelorism",
      ],
      physical_characteristics: [
        "Cat-like cry (infancy)",
        "Hypotonia",
      ],
      associated_features: [
        "Intellectual disability",
        "Behavioral problems",
      ],
      speech_language: `Severe delay
Limited expressive language`,
      recommendations: [
        "Early intervention",
        "Speech therapy",
        "Behavioral therapy",
      ],
      references: [
        "National Institutes of Health",
      ],
    },
  },
  {
    slug: "ehlers-danlos",
    name: "Ehlers–Danlos Syndrome",
    subtitle: "Connective tissue disorder with joint hypermobility and skin fragility.",
    image: "/syndromes/apert_syndrome.png",
    color: "#84cc16",
    sections: {
      definition: `A group of connective tissue disorders characterized by joint hypermobility and skin elasticity.`,
      etiology: `Collagen gene mutations`,
      incidence: `~1 in 5,000 individuals (combined types)
  Prevalence: ~1 in 5,000 (combined types)
  Reference: GeneReviews`,
      classification: `Hypermobile
Classical
Vascular`,
      pathophysiology: `Defective collagen → weak connective tissue`,
      facial_features: [
        "High-arched palate",
      ],
      physical_characteristics: [
        "Joint hypermobility",
        "Skin hyperextensibility",
      ],
      associated_features: [
        "Chronic pain",
        "Fatigue",
      ],
      speech_language: `Mild articulation issues
Voice fatigue`,
      recommendations: [
        "Speech therapy (if needed)",
        "Physiotherapy",
      ],
      references: [
        "GeneReviews",
      ],
    },
  },
  {
    slug: "marfan-syndrome",
    name: "Marfan Syndrome",
    subtitle: "FBN1-linked connective tissue disorder with tall stature and aortic risk.",
    image: "/syndromes/apert_syndrome.png",
    color: "#10b981",
    sections: {
      definition: `A genetic connective tissue disorder affecting the skeletal, cardiovascular, and ocular systems, often associated with tall stature and long limbs.`,
      etiology: `Mutation in FBN1 gene (fibrillin-1)
Autosomal dominant inheritance
~25% cases are de novo`,
      incidence: `Approximately 1 in 5,000 live births worldwide
No sex or ethnic predilection
Consistent prevalence across populations (GeneReviews, recent epidemiological data)
  Prevalence: ~1 in 5,000
  Reference: GeneReviews`,
      classification: `Classic Marfan syndrome
Neonatal Marfan (severe form)`,
      pathophysiology: `Defective fibrillin → abnormal connective tissue → excessive TGF-β signaling → affects aorta, ligaments, and eyes`,
      facial_features: [
        "Long, narrow face",
        "High-arched palate",
        "Retrognathia (sometimes)",
      ],
      physical_characteristics: [
        "Tall stature",
        "Long limbs (arachnodactyly)",
        "Aortic dilation",
        "Lens dislocation",
      ],
      associated_features: [
        "Cardiovascular complications (aortic aneurysm)",
        "Myopia",
        "Joint laxity",
      ],
      speech_language: `Generally normal language development
Possible articulation issues due to:
High-arched palate
Voice issues (rare)`,
      recommendations: [
        "Regular cardiac monitoring",
        "Orthodontic and dental care",
        "Speech therapy if articulation affected",
        "Genetic counselling",
      ],
      references: [
        "GeneReviews",
        "National Institutes of Health",
      ],
    },
  },
  {
    slug: "loeys-dietz",
    name: "Loeys–Dietz Syndrome",
    subtitle: "TGF-β pathway disorder with arterial aneurysms and craniofacial anomalies.",
    image: "/syndromes/apert_syndrome.png",
    color: "#6366f1",
    sections: {
      definition: `A connective tissue disorder characterized by arterial aneurysms and craniofacial abnormalities.`,
      etiology: `Mutation in TGFBR1, TGFBR2, SMAD2, SMAD3 genes
Autosomal dominant`,
      incidence: `Rare; estimated around 1 in 100,000 live births
Increasing detection with genetic screening
  Prevalence: <1 in 100,000
  Reference: Orphanet`,
      classification: `Type I–V (based on gene mutation)`,
      pathophysiology: `Abnormal TGF-β signaling → vascular fragility + craniofacial anomalies`,
      facial_features: [
        "Hypertelorism",
        "Bifid uvula or cleft palate",
        "Broad nasal bridge",
      ],
      physical_characteristics: [
        "Arterial aneurysms",
        "Skeletal deformities (scoliosis)",
      ],
      associated_features: [
        "Risk of aortic dissection",
        "Anxiety (psychological impact)",
      ],
      speech_language: `Hypernasality (due to cleft/bifid uvula)
Articulation issues
Possible delay if structural anomalies present`,
      recommendations: [
        "Lifelong cardiovascular monitoring",
        "Surgical management",
        "Speech therapy (resonance disorders)",
      ],
      references: [
        "GeneReviews",
        "Orphanet",
      ],
    },
  },
  {
    slug: "cornelia-de-lange",
    name: "Cornelia de Lange Syndrome",
    subtitle: "NIPBL-linked developmental disorder with limb anomalies and intellectual disability.",
    image: "/syndromes/apert_syndrome.png",
    color: "#8b5cf6",
    sections: {
      definition: `A developmental disorder with distinct facial features, limb anomalies, and intellectual disability.`,
      etiology: `Mutation in NIPBL, SMC1A, SMC3 genes`,
      incidence: `Approximately 1 in 10,000–30,000 live births
Likely underdiagnosed in mild cases
Incidence: ~1 in 10,000–30,000
Reference: GeneReviews`,
      classification: `Classic (severe)
Mild/attenuated form`,
      pathophysiology: `Defect in cohesin complex → abnormal gene regulation during development`,
      facial_features: [
        "Arched eyebrows (synophrys)",
        "Long eyelashes",
        "Small nose",
      ],
      physical_characteristics: [
        "Limb abnormalities",
        "Growth retardation",
      ],
      associated_features: [
        "Intellectual disability",
        "Autistic-like behaviors",
      ],
      speech_language: `Severe speech delay
Limited expressive language
Possible apraxia`,
      recommendations: [
        "Early intervention",
        "Speech therapy",
        "Behavioral therapy",
      ],
      references: [
        "GeneReviews",
      ],
    },
  },
  {
    slug: "meckel-gruber",
    name: "Meckel–Gruber Syndrome",
    subtitle: "Lethal ciliopathy with encephalocele, polycystic kidneys, and polydactyly.",
    image: "/syndromes/apert_syndrome.png",
    color: "#ef4444",
    sections: {
      definition: `A lethal autosomal recessive disorder characterized by multiple congenital anomalies.`,
      etiology: `Mutations in genes affecting cilia function`,
      incidence: `~1 in 13,000–140,000 live births
Higher prevalence in certain populations (e.g., Finland)
  Incidence: ~1 in 13,000–140,000
  Reference: Orphanet`,
      classification: `Genetic subtypes (based on gene mutations)`,
      pathophysiology: `Ciliopathy → abnormal organ development`,
      facial_features: [
        "Micrognathia",
        "Cleft lip/palate",
      ],
      physical_characteristics: [
        "Encephalocele",
        "Polycystic kidneys",
        "Polydactyly",
      ],
      associated_features: [
        "Perinatal death",
      ],
      speech_language: `Not applicable (lethal condition)`,
      recommendations: [
        "Prenatal diagnosis",
        "Genetic counseling",
      ],
      references: [
        "Orphanet",
      ],
    },
  },
  {
    slug: "popliteal-pterygium",
    name: "Popliteal Pterygium Syndrome",
    subtitle: "IRF6 syndrome with cleft lip/palate and popliteal webbing.",
    image: "/syndromes/apert_syndrome.png",
    color: "#ec4899",
    sections: {
      definition: `A genetic syndrome involving cleft lip/palate and webbing behind the knees (pterygium).`,
      etiology: `Mutation in IRF6 gene
Autosomal dominant`,
      incidence: `Extremely rare: <1 in 300,000 live births
  Incidence: <1 in 300,000
  Reference: Orphanet`,
      classification: `Variable expression`,
      pathophysiology: `Disruption of epithelial development`,
      facial_features: [
        "Lower lip pits",
        "Cleft lip/palate",
      ],
      physical_characteristics: [
        "Popliteal webbing",
        "Syndactyly",
      ],
      associated_features: [
        "Genital anomalies",
      ],
      speech_language: `Mild to moderate articulation disorders
Hypernasality`,
      recommendations: [
        "Surgical repair",
        "Speech therapy",
        "Orthodontic care",
      ],
      references: [
        "Orphanet",
      ],
    },
  },
  {
    slug: "pallister-hall",
    name: "Pallister–Hall Syndrome",
    subtitle: "GLI3-linked disorder with hypothalamic hamartoma and polydactyly.",
    image: "/syndromes/apert_syndrome.png",
    color: "#6366f1",
    sections: {
      definition: `A rare genetic disorder characterized by hypothalamic hamartoma, polydactyly, and multiple congenital anomalies.`,
      etiology: `Mutation in GLI3 gene
Autosomal dominant inheritance`,
      incidence: `Extremely rare: <1 in 1,000,000 live births
Likely underdiagnosed due to variable expression
  Extremely rare; ~100 cases reported globally
  Prevalence unknown
  Reference: GARD / literature reports`,
      classification: `Classic Pallister–Hall
Mild/attenuated forms`,
      pathophysiology: `GLI3 mutation → abnormal Sonic Hedgehog signaling → affects midline and limb development`,
      facial_features: [
        "Flat nasal bridge",
        "Low-set ears",
      ],
      physical_characteristics: [
        "Polydactyly",
        "Bifid epiglottis",
        "Hypothalamic hamartoma",
      ],
      associated_features: [
        "Endocrine abnormalities (pituitary dysfunction)",
        "Seizures",
        "Developmental delay (variable)",
      ],
      speech_language: `Variable speech delay
May have feeding and swallowing difficulties
Language affected depending on cognitive level`,
      recommendations: [
        "Endocrine evaluation",
        "Neurological monitoring",
        "Speech and feeding therapy",
        "Genetic counseling",
      ],
      references: [
        "GeneReviews",
        "Orphanet",
      ],
    },
  },
  {
    slug: "branchio-oto-renal",
    name: "Branchio–Oto–Renal Syndrome (BOR Syndrome)",
    subtitle: "EYA1-linked branchial arch, ear, and renal anomalies.",
    image: "/syndromes/apert_syndrome.png",
    color: "#10b981",
    sections: {
      definition: `A genetic disorder involving branchial arch anomalies, ear malformations, and renal abnormalities.`,
      etiology: `Mutation in EYA1, SIX1, or SIX5 genes
Autosomal dominant`,
      incidence: `Approximately 1 in 40,000 live births
One of the more common syndromes associated with hereditary hearing loss
  Incidence: ~1 in 40,000
  Reference: GeneReviews`,
      classification: `Classic BOR syndrome
Branchio-otic syndrome (without renal involvement)`,
      pathophysiology: `Abnormal development of branchial arches and renal system`,
      facial_features: [
        "Preauricular pits",
        "Ear anomalies",
      ],
      physical_characteristics: [
        "Hearing loss (conductive, SNHL, or mixed)",
        "Renal anomalies",
      ],
      associated_features: [
        "Branchial cysts or fistulas",
        "Structural ear defects",
      ],
      speech_language: `Speech delay due to hearing loss
Articulation errors
Possible language delay`,
      recommendations: [
        "Early hearing assessment and amplification",
        "Speech therapy",
        "Renal evaluation",
        "Genetic counseling",
      ],
      references: [
        "GeneReviews",
      ],
    },
  },
  {
    slug: "shprintzen-goldberg",
    name: "Shprintzen–Goldberg Syndrome",
    subtitle: "SKI-gene craniosynostosis with marfanoid habitus and intellectual disability.",
    image: "/syndromes/apert_syndrome.png",
    color: "#f59e0b",
    sections: {
      definition: `A rare connective tissue disorder with craniosynostosis, marfanoid habitus, and intellectual disability.`,
      etiology: `Mutation in SKI gene
Autosomal dominant`,
      incidence: `Extremely rare: <1 in 1,000,000 live births
Very few cases reported globally
  Extremely rare (<1 in 1,000,000)
  Reference: Orphanet`,
      classification: `No major subtypes; variable severity`,
      pathophysiology: `Disruption of TGF-β signaling → affects connective tissue and craniofacial development`,
      facial_features: [
        "Long narrow face",
        "Hypertelorism",
        "Proptosis",
      ],
      physical_characteristics: [
        "Craniosynostosis",
        "Skeletal abnormalities",
        "Joint laxity",
      ],
      associated_features: [
        "Intellectual disability",
        "Cardiovascular anomalies",
      ],
      speech_language: `Delayed speech and language development
Articulation issues
Possible cognitive-linguistic deficits`,
      recommendations: [
        "Multidisciplinary management",
        "Speech therapy",
        "Cardiac monitoring",
        "Genetic counseling",
      ],
      references: [
        "Orphanet",
        "GeneReviews",
      ],
    },
  },
];

export function getSyndromeBySlug(slug: string): SyndromeContent | undefined {
  return SYNDROME_CONTENT.find((s) => s.slug === slug);
}