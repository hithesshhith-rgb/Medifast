import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Disease {
  name: string;
  symptoms: string[];
  severity: string;
  cause: string;
  solution: string;
}

interface Reminder {
  medicine: string;
  time: string;
}

interface MedicineInfo {
  name: string;
  use: string;
  warning: string;
}

const diseases: Disease[] = [
  {
    name: "Heart Disease",
    symptoms: [
      "chest pain",
      "heart pain",
      "pain in chest",
      "breathing difficulty",
      "chest tightness",
    ],
    severity: "Critical",
    cause:
      "Heart problems may occur because of blocked blood flow or high cholesterol.",
    solution:
      "Seek emergency medical attention immediately.",
  },

  {
    name: "Stomach Infection",
    symptoms: [
      "stomach pain",
      "pain in stomach",
      "abdomen pain",
      "pain in abdomen",
      "vomiting",
      "nausea",
      "gastric",
      "food poisoning",
    ],
    severity: "Medium",
    cause:
      "Stomach infections occur because of bacteria or unhealthy food.",
    solution:
      "Drink clean water and avoid unhealthy food.",
  },

  {
    name: "Migraine",
    symptoms: [
      "headache",
      "eye pain",
      "pain in eye",
      "eye hurting",
    ],
    severity: "Medium",
    cause:
      "Migraine occurs because of stress or dehydration.",
    solution:
      "Reduce screen time and rest properly.",
  },

  {
    name: "Sinus Infection",
    symptoms: [
      "nose pain",
      "pain in nose",
      "blocked nose",
      "runny nose",
      "sneezing",
    ],
    severity: "Low",
    cause:
      "Sinus infections occur because of allergies or cold.",
    solution:
      "Stay hydrated and avoid dust.",
  },

  {
    name: "Hair Loss",
    symptoms: [
      "hair loss",
      "hair lose",
      "losing hair",
      "hair thinning",
    ],
    severity: "Low",
    cause:
      "Hair loss occurs because of stress or poor nutrition.",
    solution:
      "Maintain healthy diet and reduce stress.",
  },

  {
    name: "Urinary Infection",
    symptoms: [
      "urination problem",
      "pain while urinating",
      "burning urination",
      "frequent urination",
    ],
    severity: "Medium",
    cause:
      "Urinary infections occur because of bacteria or dehydration.",
    solution:
      "Drink more water and maintain hygiene.",
  },

  {
    name: "Lung Problem",
    symptoms: [
      "lungs problem",
      "lung pain",
      "breathing problem",
      "shortness of breath",
    ],
    severity: "High",
    cause:
      "Lung problems may occur because of infection or smoking.",
    solution:
      "Avoid smoking and seek medical evaluation.",
  },
];

const bodyParts = [
  {
    emoji: "🧠",
    name: "Brain",
    about:
      "Controls memory, intelligence, emotions, and body functions.",
  },

  {
    emoji: "❤️",
    name: "Heart",
    about:
      "Pumps oxygen-rich blood throughout the body.",
  },

  {
    emoji: "🫁",
    name: "Lungs",
    about:
      "Help breathing and oxygen exchange.",
  },

  {
    emoji: "👀",
    name: "Eyes",
    about:
      "Allow vision and detect light.",
  },

  {
    emoji: "👂",
    name: "Ears",
    about:
      "Help hearing and balance.",
  },

  {
    emoji: "👃",
    name: "Nose",
    about:
      "Helps smelling and breathing.",
  },

  {
    emoji: "👅",
    name: "Tongue",
    about:
      "Helps tasting and speaking.",
  },

  {
    emoji: "🦷",
    name: "Teeth",
    about:
      "Help chewing food.",
  },

  {
    emoji: "🍔",
    name: "Stomach",
    about:
      "Breaks down food and supports digestion.",
  },

  {
    emoji: "🫀",
    name: "Liver",
    about:
      "Filters toxins and helps digestion.",
  },

  {
    emoji: "🫘",
    name: "Kidneys",
    about:
      "Filter waste and maintain fluids.",
  },

  {
    emoji: "🩸",
    name: "Blood",
    about:
      "Carries oxygen and nutrients.",
  },

  {
    emoji: "🦠",
    name: "White Blood Cells",
    about:
      "Fight infections in the body.",
  },

  {
    emoji: "🩸",
    name: "Red Blood Cells",
    about:
      "Carry oxygen throughout the body.",
  },

  {
    emoji: "🦴",
    name: "Bones",
    about:
      "Provide support and protection.",
  },

  {
    emoji: "💪",
    name: "Muscles",
    about:
      "Help movement and strength.",
  },

  {
    emoji: "🦵",
    name: "Legs",
    about:
      "Support movement and walking.",
  },

  {
    emoji: "✋",
    name: "Hands",
    about:
      "Help performing tasks.",
  },

  {
    emoji: "🧬",
    name: "DNA",
    about:
      "Carries genetic information.",
  },

  {
    emoji: "🦴",
    name: "Ligaments",
    about:
      "Connect bones together.",
  },
];

const medicineInfo: MedicineInfo[] = [
  {
    name: "Paracetamol",
    use: "Used for fever and pain relief.",
    warning:
      "Avoid overdose.",
  },

  {
    name: "Ibuprofen",
    use: "Used for pain and inflammation.",
    warning:
      "May irritate stomach.",
  },

  {
    name: "Amoxicillin",
    use: "Antibiotic for bacterial infections.",
    warning:
      "Use only with doctor guidance.",
  },

  {
    name: "Azithromycin",
    use: "Used for respiratory infections.",
    warning:
      "Avoid unnecessary usage.",
  },

  {
    name: "Pantoprazole",
    use: "Used for acidity problems.",
    warning:
      "Long-term use requires monitoring.",
  },

  {
    name: "Omeprazole",
    use: "Used for acid reflux.",
    warning:
      "Avoid self-medication.",
  },

  {
    name: "Ondansetron",
    use: "Used for nausea and vomiting.",
    warning:
      "Consult healthcare professional.",
  },

  {
    name: "Metformin",
    use: "Used for diabetes management.",
    warning:
      "Requires proper monitoring.",
  },

  {
    name: "Cetirizine",
    use: "Used for allergies and itching.",
    warning:
      "May cause drowsiness.",
  },

  {
    name: "Montelukast",
    use: "Used for allergies and asthma.",
    warning:
      "Use only when prescribed.",
  },

  {
    name: "Amlodipine",
    use: "Used for blood pressure control.",
    warning:
      "Requires monitoring.",
  },

  {
    name: "Crocin",
    use: "Used for fever relief.",
    warning:
      "Avoid excessive dosage.",
  },

  {
    name: "Vitamin C",
    use: "Supports immunity.",
    warning:
      "Use balanced dosage.",
  },

  {
    name: "ORS",
    use: "Used for dehydration recovery.",
    warning:
      "Maintain proper hydration.",
  },

  {
    name: "Diclofenac",
    use: "Used for pain relief.",
    warning:
      "May irritate stomach.",
  },

  {
    name: "Dolo 650",
    use: "Used for fever and pain.",
    warning:
      "Avoid overdose.",
  },

  {
    name: "Aspirin",
    use: "Used for pain and heart care.",
    warning:
      "Not suitable for everyone.",
  },

  {
    name: "Calcium Tablets",
    use: "Support bone strength.",
    warning:
      "Use balanced intake.",
  },

  {
    name: "Iron Tablets",
    use: "Help treat iron deficiency.",
    warning:
      "Avoid excess intake.",
  },

  {
    name: "Zinc Tablets",
    use: "Support immunity.",
    warning:
      "Use proper dosage.",
  },

  {
    name: "Losartan",
    use: "Used for blood pressure.",
    warning:
      "Monitor blood pressure regularly.",
  },

  {
    name: "Telmisartan",
    use: "Used for hypertension.",
    warning:
      "Requires medical guidance.",
  },

  {
    name: "Salbutamol",
    use: "Used for asthma relief.",
    warning:
      "Avoid overuse.",
  },

  {
    name: "Folic Acid",
    use: "Supports blood cell production.",
    warning:
      "Use recommended dosage.",
  },

  {
    name: "Multivitamin",
    use: "Supports overall health.",
    warning:
      "Do not replace healthy diet.",
  },

  {
    name: "Levocetirizine",
    use: "Used for allergies.",
    warning:
      "May cause sleepiness.",
  },

  {
    name: "Ranitidine",
    use: "Used for acidity.",
    warning:
      "Use only when needed.",
  },

  {
    name: "Prednisolone",
    use: "Used for inflammation.",
    warning:
      "Requires doctor supervision.",
  },

  {
    name: "Ciprofloxacin",
    use: "Used for bacterial infections.",
    warning:
      "Use responsibly.",
  },

  {
    name: "Atorvastatin",
    use: "Used for cholesterol control.",
    warning:
      "Requires regular monitoring.",
  },
];

function Home() {
  const navigate = useNavigate();

  const [symptomInput, setSymptomInput] =
    useState("");

  const [results, setResults] =
    useState<Disease[]>([]);

  const [medicine, setMedicine] =
    useState("");

  const [time, setTime] =
    useState("");

  const [reminders, setReminders] =
    useState<Reminder[]>([]);

  const analyzeSymptoms = () => {
    const input =
      symptomInput.toLowerCase();

    const matched: Disease[] = [];

    diseases.forEach((disease) => {
      disease.symptoms.forEach(
        (symptom) => {
          if (
            input.includes(symptom)
          ) {
            matched.push(disease);
          }
        }
      );
    });

    const unique =
      matched.filter(
        (
          value,
          index,
          self
        ) =>
          index ===
          self.findIndex(
            (t) =>
              t.name === value.name
          )
      );

    if (unique.length === 0) {
      setResults([
        {
          name:
            "No Exact Match Found",
          symptoms: [],
          severity: "Low",
          cause:
            "Symptoms are not fully recognized.",
          solution:
            "Consult a healthcare professional.",
        },
      ]);

      return;
    }

    setResults(unique);
  };

  const addReminder = () => {
    if (!medicine || !time)
      return;

    setReminders([
      ...reminders,
      {
        medicine,
        time,
      },
    ]);

    setMedicine("");
    setTime("");
  };

  useEffect(() => {
    const interval =
      setInterval(() => {
        const now =
          new Date();

        const current =
          now.toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute:
                "2-digit",
            }
          );

        reminders.forEach(
          (reminder) => {
            if (
              reminder.time ===
              current
            ) {
              alert(
                `Reminder: ${reminder.medicine}`
              );

              const audio =
                new Audio(
                  "https://www.soundjay.com/buttons/sounds/beep-07.mp3"
                );

              audio.play();
            }
          }
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [reminders]);

  const makeCall = (
    number: string
  ) => {
    navigate("/emergency", {
      state: { number },
    });
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>MediFast</h1>
      </nav>

      <section className="hero">
        <h2>
          AI Symptom Analyzer
        </h2>

        <textarea
          placeholder="Enter symptoms like stomach pain, chest pain, urination problem..."
          value={symptomInput}
          onChange={(e) =>
            setSymptomInput(
              e.target.value
            )
          }
        />

        <button
          onClick={analyzeSymptoms}
        >
          Analyze Symptoms
        </button>
      </section>

      <div className="results">
        {results.map(
          (disease, index) => (
            <div
              key={index}
              className="disease-card"
            >
              <h2>
                {disease.name}
              </h2>

              <p>
                <strong>
                  Severity:
                </strong>{" "}
                {
                  disease.severity
                }
              </p>

              <p>
                <strong>
                  Cause:
                </strong>{" "}
                {
                  disease.cause
                }
              </p>

              <p>
                <strong>
                  Solution:
                </strong>{" "}
                {
                  disease.solution
                }
              </p>

              {disease.severity ===
                "Critical" && (
                <div className="critical">
                  🚨 Emergency Alert
                </div>
              )}
            </div>
          )
        )}
      </div>

      <section className="features">
        <div className="feature-card">
          <h3>
            <section className="doctor-section">
  <h2>
    🌿 Daily Health Tips
  </h2>

  <div className="doctor-grid">
    <div className="doctor-card">
      <h3>
        💧 Drink Water
      </h3>

      <p>
        Drink enough water
        daily to stay
        hydrated.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🥗 Healthy Diet
      </h3>

      <p>
        Eat fruits and
        vegetables regularly.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🏃 Exercise
      </h3>

      <p>
        Exercise daily to
        improve fitness.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        😴 Sleep
      </h3>

      <p>
        Sleep 7-8 hours every
        night.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🚭 Avoid Smoking
      </h3>

      <p>
        Smoking damages lungs
        and heart health.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🍎 Balanced Food
      </h3>

      <p>
        Maintain a balanced
        nutritious diet.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🧘 Reduce Stress
      </h3>

      <p>
        Practice meditation
        and relaxation.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🪥 Brush Teeth
      </h3>

      <p>
        Brush teeth twice
        daily for oral health.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        ☀ Vitamin D
      </h3>

      <p>
        Get sunlight exposure
        for Vitamin D.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🚶 Walking
      </h3>

      <p>
        Walk daily to improve
        blood circulation.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🧼 Hygiene
      </h3>

      <p>
        Maintain cleanliness
        and hygiene.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        📵 Reduce Screen Time
      </h3>

      <p>
        Reduce excessive
        mobile and laptop
        usage.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        ❤️ Heart Care
      </h3>

      <p>
        Avoid junk food and
        oily foods.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🫁 Lung Care
      </h3>

      <p>
        Avoid smoke and dusty
        environments.
      </p>
    </div>

    <div className="doctor-card">
      <h3>
        🩺 Regular Checkups
      </h3>

      <p>
        Consult healthcare
        professionals
        regularly.
      </p>
    </div>
  </div>
</section>
            💊 Smart Medicine Alarm
          </h3>

          <input
            type="text"
            placeholder="Medicine Name"
            value={medicine}
            onChange={(e) =>
              setMedicine(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Time"
            value={time}
            onChange={(e) =>
              setTime(
                e.target.value
              )
            }
          />

          <button
            onClick={addReminder}
          >
            Add Reminder
          </button>
        </div>
      </section>

      <section className="doctor-section">
        <h2>
          🧍 Human Body Parts
        </h2>

        <div className="doctor-grid">
          {bodyParts.map(
            (part, index) => (
              <div
                key={index}
                className="doctor-card"
              >
                <h3>
                  {
                    part.emoji
                  }{" "}
                  {
                    part.name
                  }
                </h3>

                <p>
                  {
                    part.about
                  }
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="doctor-section">
        <h2>
          💉 Medicine Information
        </h2>

        <div className="doctor-grid">
          {medicineInfo.map(
            (
              medicine,
              index
            ) => (
              <div
                key={index}
                className="doctor-card"
              >
                <h3>
                  💊{" "}
                  {
                    medicine.name
                  }
                </h3>

                <p>
                  <strong>
                    Use:
                  </strong>{" "}
                  {
                    medicine.use
                  }
                </p>

                <p>
                  <strong>
                    Warning:
                  </strong>{" "}
                  {
                    medicine.warning
                  }
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="emergency-section">
        <h2>
          🚨 Emergency Services
        </h2>

        <div className="emergency-grid">
          <button
            onClick={() =>
              makeCall("102")
            }
          >
            🚑 Ambulance
          </button>

          <button
            onClick={() =>
              makeCall("108")
            }
          >
            🏥 Emergency
          </button>

          <button
            onClick={() =>
              makeCall("100")
            }
          >
            👮 Police
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;