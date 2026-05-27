import { useState, useEffect } from "react";

import {
  useNavigate,
} from "react-router-dom";

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
const diseases: Disease[] = [
  {
    name: "Stomach Infection",
    symptoms: [
      "stomach pain",
      "stomach ache",
      "abdomen pain",
      "gastric",
      "vomiting",
      "nausea",
      "diarrhea",
      "food poisoning",
    ],
    severity: "Medium",
    cause:
      "Stomach infections occur because of contaminated food, bacteria, or viruses.",
    solution:
      "Drink clean water and maintain proper hygiene.",
  },

  {
    name: "Sinus Infection",
    symptoms: [
      "nose pain",
      "blocked nose",
      "runny nose",
      "sinus pain",
      "nose irritation",
      "sneezing",
    ],
    severity: "Low",
    cause:
      "Sinus infections occur because of allergies or viral infection.",
    solution:
      "Stay hydrated and avoid dust exposure.",
  },

  {
    name: "Throat Infection",
    symptoms: [
      "throat pain",
      "sore throat",
      "swallowing pain",
      "throat irritation",
      "cough",
    ],
    severity: "Medium",
    cause:
      "Throat infections occur because of bacteria or viruses.",
    solution:
      "Drink warm fluids and avoid cold foods.",
  },

  {
    name: "Migraine",
    symptoms: [
      "headache",
      "eye pain",
      "head pain",
      "light sensitivity",
      "nausea",
    ],
    severity: "Medium",
    cause:
      "Migraine occurs because of stress, dehydration, or excessive screen usage.",
    solution:
      "Reduce screen time and stay hydrated.",
  },

  {
    name: "Stress Disorder",
    symptoms: [
      "stress",
      "depressed",
      "anxiety",
      "mental stress",
      "tiredness",
      "headache",
    ],
    severity: "Medium",
    cause:
      "Stress occurs because of emotional pressure or overthinking.",
    solution:
      "Practice meditation and proper sleep.",
  },

  {
    name: "Heart Disease",
    symptoms: [
      "heart pain",
      "chest pain",
      "chest tightness",
      "breathing difficulty",
      "fatigue",
    ],
    severity: "Critical",
    cause:
      "Heart disease occurs because of blocked blood flow or high cholesterol.",
    solution:
      "Seek emergency medical attention immediately.",
  },

  {
    name: "Hair Loss",
    symptoms: [
      "hair loss",
      "hair lose",
      "hair thinning",
      "losing hair",
      "bald spots",
    ],
    severity: "Low",
    cause:
      "Hair loss occurs because of stress or poor nutrition.",
    solution:
      "Maintain proper nutrition and reduce stress.",
  },

  {
    name: "Skin Allergy",
    symptoms: [
      "itching",
      "rash",
      "skin redness",
      "skin irritation",
      "swelling",
    ],
    severity: "Low",
    cause:
      "Skin allergies occur because of allergens or chemicals.",
    solution:
      "Avoid allergens and maintain cleanliness.",
  },

  {
    name: "Ear Infection",
    symptoms: [
      "ear pain",
      "ear itching",
      "hearing loss",
      "ear discharge",
    ],
    severity: "Medium",
    cause:
      "Ear infections occur because of bacteria or viruses.",
    solution:
      "Maintain ear hygiene.",
  },

  {
    name: "Acne / Pimples",
    symptoms: [
      "pimples",
      "acne",
      "face redness",
      "oily skin",
    ],
    severity: "Low",
    cause:
      "Pimples occur because of hormones or bacteria.",
    solution:
      "Maintain face hygiene.",
  },

  {
    name: "Back Pain",
    symptoms: [
      "back pain",
      "lower back pain",
      "spine pain",
      "muscle stiffness",
    ],
    severity: "Low",
    cause:
      "Back pain occurs because of poor posture or muscle strain.",
    solution:
      "Maintain posture and perform stretching exercises.",
  },

  {
    name: "Neck Pain",
    symptoms: [
      "neck pain",
      "neck stiffness",
      "shoulder pain",
    ],
    severity: "Low",
    cause:
      "Neck pain occurs because of muscle tension.",
    solution:
      "Perform stretching exercises.",
  },

  {
    name: "Joint Pain",
    symptoms: [
      "knee pain",
      "leg pain",
      "hand pain",
      "joint pain",
      "joint stiffness",
    ],
    severity: "Medium",
    cause:
      "Joint pain occurs because of inflammation or arthritis.",
    solution:
      "Take proper rest and perform light exercise.",
  },

  {
    name: "Lung Infection",
    symptoms: [
      "cough",
      "breathing difficulty",
      "chest tightness",
      "fever",
    ],
    severity: "High",
    cause:
      "Lung infections occur because of bacteria or smoking.",
    solution:
      "Avoid smoking and seek medical evaluation.",
  },

  {
    name: "Diabetes",
    symptoms: [
      "frequent urination",
      "fatigue",
      "blurred vision",
      "thirst",
      "weight loss",
    ],
    severity: "High",
    cause:
      "Diabetes occurs because of improper blood sugar regulation.",
    solution:
      "Maintain healthy diet and regular exercise.",
  },

  {
    name: "Fever",
    symptoms: [
      "fever",
      "body pain",
      "weakness",
      "high temperature",
    ],
    severity: "Medium",
    cause:
      "Fever occurs because of infection or immune response.",
    solution:
      "Take rest and stay hydrated.",
  },

  {
    name: "Common Cold",
    symptoms: [
      "cold",
      "runny nose",
      "cough",
      "sneezing",
    ],
    severity: "Low",
    cause:
      "Common cold occurs because of viral infection.",
    solution:
      "Rest properly and drink warm fluids.",
  },
];
 


const bodyParts = [
  {
    emoji: "🧠",
    name: "Brain",
    about:
      "Controls memory, thoughts, emotions, and body functions.",
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
    emoji: "🦴",
    name: "Bones",
    about:
      "Support and protect the body.",
  },

  {
    emoji: "🩸",
    name: "Blood",
    about:
      "Carries oxygen and nutrients.",
  },

  {
    emoji: "🫀",
    name: "Liver",
    about:
      "Filters toxins and helps digestion.",
  },

  {
    emoji: "🦷",
    name: "Teeth",
    about:
      "Help chewing and speaking.",
  },

  {
    emoji: "👅",
    name: "Tongue",
    about:
      "Helps tasting and speaking.",
  },
];

const medicineInfo = [
  {
    name: "Paracetamol",
    about:
      "Used for fever and pain relief.",
  },

  {
    name: "Ibuprofen",
    about:
      "Used for pain and inflammation relief.",
  },

  {
    name: "Diclofenac Sodium",
    about:
      "Used for joint pain and inflammation.",
  },

  {
    name: "Amoxicillin",
    about:
      "Antibiotic used for bacterial infections.",
  },

  {
    name: "Azithromycin",
    about:
      "Used for respiratory bacterial infections.",
  },

  {
    name: "Ciprofloxacin",
    about:
      "Used for bacterial infections.",
  },

  {
    name: "Pantoprazole",
    about:
      "Used for acidity and stomach ulcers.",
  },

  {
    name: "Omeprazole",
    about:
      "Used for acid reflux problems.",
  },

  {
    name: "Ondansetron",
    about:
      "Used for nausea and vomiting control.",
  },

  {
    name: "Metformin",
    about:
      "Used for diabetes management.",
  },

  {
    name: "Atorvastatin",
    about:
      "Used for cholesterol control.",
  },

  {
    name: "Amlodipine",
    about:
      "Used for blood pressure control.",
  },

  {
    name: "Cetirizine",
    about:
      "Used for allergies and itching.",
  },

  {
    name: "Montelukast",
    about:
      "Used for asthma and allergies.",
  },

  {
    name: "Albuterol",
    about:
      "Used for breathing difficulty and asthma.",
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
    const userSymptoms =
      symptomInput
        .toLowerCase()
        .split(",")
        .map((s) => s.trim());

    const matched =
      diseases.filter((disease) =>
        disease.symptoms.some(
          (symptom) =>
            userSymptoms.includes(
              symptom
            )
        )
      );

    setResults(matched);
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
      state: {
        number,
      },
    });
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>MediFast</h1>
      </nav>

      <section className="hero">
        <h2>
          AI Health Analyzer
        </h2>

        <textarea
          placeholder="Enter symptoms..."
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
                Severity:
                {" "}
                {
                  disease.severity
                }
              </p>

              <p>
                <strong>
                  Cause:
                </strong>
                {" "}
                {
                  disease.cause
                }
              </p>

              <p>
                <strong>
                  Solution:
                </strong>
                {" "}
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
            💊 Smart Reminder
          </h3>

          <input
            type="text"
            placeholder="Medicine"
            value={medicine}
            onChange={(e) =>
              setMedicine(
                e.target.value
              )
            }
            className="medicine-input"
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
            className="medicine-input"
          />

          <button
            onClick={addReminder}
          >
            Add Reminder
          </button>
        </div>

        <div className="feature-card">
          <h3>
            🩺 Daily Health Tips
          </h3>

          <div className="tip-item">
            💧 Drink water daily
          </div>

          <div className="tip-item">
            🏃 Exercise regularly
          </div>

          <div className="tip-item">
            😴 Sleep 8 hours
          </div>

          <div className="tip-item">
            🥗 Eat healthy food
          </div>

          <div className="tip-item">
            🚭 Avoid smoking
          </div>
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
                  {
                    medicine.about
                  }
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <section className="emergency-section">
        <h2>
          🚨 Emergency
          Services
        </h2>

        <div className="emergency-grid">
          <div className="emergency-card">
            <h3>
              🚑 Ambulance
            </h3>

            <p>102</p>

            <button
              onClick={() =>
                makeCall("102")
              }
            >
              📞 Call Ambulance
            </button>
          </div>

          <div className="emergency-card">
            <h3>
              🏥 Emergency
            </h3>

            <p>108</p>

            <button
              onClick={() =>
                makeCall("108")
              }
            >
              📞 Call Emergency
            </button>
          </div>

          <div className="emergency-card">
            <h3>
              ❤️ Heart Emergency
            </h3>

            <p>911</p>

            <button
              onClick={() =>
                makeCall("911")
              }
            >
              🚨 Critical Call
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;