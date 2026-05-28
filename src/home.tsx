import {
  useEffect,
  useState,
} from "react";

import "./Home.css";

// ==========================================
// TYPES
// ==========================================

interface Disease {
  name: string;
  severity: string;
  cause: string;
  solution: string;
  doctor: string;
}

interface Reminder {
  medicine: string;
  time: string;
}

interface Medicine {
  name: string;
  use: string;
  warning: string;
}

// ==========================================
// COMPONENT
// ==========================================

const Home = () => {
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

  // ==========================================
  // ADVANCED AI SYMPTOM DATABASE
  // ==========================================

  const symptomDatabase = [
    {
      keywords: [
        "chest pain",
        "heart pain",
        "tight chest",
        "difficulty breathing",
        "breathing problem",
        "lungs pain",
      ],

      disease: {
        name:
          "Heart or Lung Emergency",

        severity: "Critical",

        cause:
          "Possible heart attack, asthma or lung issue.",

        solution:
          "Seek emergency medical help immediately.",

        doctor:
          "Cardiologist ❤️ / Pulmonologist 🫁",
      },
    },

    {
      keywords: [
        "eye pain",
        "eyes hurting",
        "red eyes",
        "itchy eyes",
        "blurred vision",
      ],

      disease: {
        name:
          "Eye Infection",

        severity: "Moderate",

        cause:
          "Possible eye infection or allergy.",

        solution:
          "Consult eye specialist.",

        doctor:
          "Ophthalmologist 👁️",
      },
    },

    {
      keywords: [
        "ear pain",
        "ear infection",
        "hearing issue",
      ],

      disease: {
        name:
          "Ear Infection",

        severity: "Moderate",

        cause:
          "Possible ear infection.",

        solution:
          "Consult ENT specialist.",

        doctor:
          "ENT Specialist 👂",
      },
    },

    {
      keywords: [
        "nose pain",
        "blocked nose",
        "runny nose",
        "sinus pain",
      ],

      disease: {
        name:
          "Sinus Infection",

        severity: "Mild",

        cause:
          "Cold or sinus infection.",

        solution:
          "Take rest and stay hydrated.",

        doctor:
          "ENT Specialist 👃",
      },
    },

    {
      keywords: [
        "throat pain",
        "sore throat",
        "difficulty swallowing",
      ],

      disease: {
        name:
          "Throat Infection",

        severity: "Moderate",

        cause:
          "Viral or bacterial infection.",

        solution:
          "Drink warm fluids and consult doctor.",

        doctor:
          "ENT Specialist 🗣️",
      },
    },

    {
      keywords: [
        "stomach pain",
        "abdomen pain",
        "gastric",
        "vomiting",
        "nausea",
      ],

      disease: {
        name:
          "Digestive Problem",

        severity: "Moderate",

        cause:
          "Acidity or stomach infection.",

        solution:
          "Drink clean water and avoid unhealthy food.",

        doctor:
          "Gastroenterologist 🍽️",
      },
    },

    {
      keywords: [
        "pain while urinating",
        "burning urine",
        "urination pain",
        "pee pain",
      ],

      disease: {
        name:
          "Urinary Tract Infection",

        severity: "Moderate",

        cause:
          "Bacterial infection in urinary tract.",

        solution:
          "Drink more water and maintain hygiene.",

        doctor:
          "Urologist 🚽",
      },
    },

    {
      keywords: [
        "hair loss",
        "hair lose",
        "losing hair",
      ],

      disease: {
        name: "Hair Loss",

        severity: "Mild",

        cause:
          "Stress or nutrition deficiency.",

        solution:
          "Maintain healthy diet.",

        doctor:
          "Dermatologist 💇",
      },
    },

    {
      keywords: [
        "pimples",
        "acne",
        "skin problem",
      ],

      disease: {
        name:
          "Acne / Skin Problem",

        severity: "Mild",

        cause:
          "Hormonal changes or oily skin.",

        solution:
          "Maintain hygiene.",

        doctor:
          "Dermatologist 🧴",
      },
    },

    {
      keywords: [
        "headache",
        "migraine",
        "dizziness",
      ],

      disease: {
        name: "Migraine",

        severity: "Moderate",

        cause:
          "Stress or dehydration.",

        solution:
          "Take proper rest.",

        doctor:
          "Neurologist 🧠",
      },
    },
  ];

  // ==========================================
  // AI ANALYZER
  // ==========================================

  const analyzeSymptoms = () => {
    const input =
      symptomInput.toLowerCase();

    const smartInput = input
      .replace("paining", "pain")
      .replace("hurting", "pain")
      .replace("while", "")
      .replace("my", "");

    let detectedDiseases: Disease[] =
      [];

    symptomDatabase.forEach(
      (item) => {
        const matched =
          item.keywords.some(
            (keyword) =>
              smartInput.includes(
                keyword
              )
          );

        if (matched) {
          detectedDiseases.push(
            item.disease
          );
        }
      }
    );

    const uniqueDiseases =
      detectedDiseases.filter(
        (
          value,
          index,
          self
        ) =>
          index ===
          self.findIndex(
            (t) =>
              t.name ===
              value.name
          )
      );

    // EMERGENCY SOUND

    const critical =
      uniqueDiseases.some(
        (disease) =>
          disease.severity ===
          "Critical"
      );

    if (critical) {
      const emergencySound =
        new Audio(
          "https://www.soundjay.com/misc/sounds/emergency-alarm-with-reverb-1.mp3"
        );

      emergencySound.play();

      alert(
        "🚨 EMERGENCY ALERT!\nSeek immediate medical attention."
      );
    }

    if (
      uniqueDiseases.length ===
      0
    ) {
      uniqueDiseases.push({
        name:
          "Unknown Symptom Pattern",

        severity: "Unknown",

        cause:
          "Symptoms unclear.",

        solution:
          "Consult medical professional.",

        doctor:
          "General Physician 🩺",
      });
    }

    setResults(uniqueDiseases);
  };

  // ==========================================
  // SMART REMINDER
  // ==========================================

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

    alert(
      `💊 Reminder added for ${medicine} at ${time}`
    );

    setMedicine("");
    setTime("");
  };

  // ==========================================
  // REMINDER SOUND
  // ==========================================

  useEffect(() => {
    const interval =
      setInterval(() => {
        const now =
          new Date();

        const currentTime = `${now
          .getHours()
          .toString()
          .padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        reminders.forEach(
          (reminder) => {
            if (
              reminder.time ===
              currentTime
            ) {
              const audio =
                new Audio(
                  "https://www.soundjay.com/buttons/sounds/beep-01a.mp3"
                );

              audio.play();

              alert(
                `💊 Time to take ${reminder.medicine}`
              );
            }
          }
        );
      }, 1000);

    return () =>
      clearInterval(interval);
  }, [reminders]);

  // ==========================================
  // HEALTH TIPS
  // ==========================================

  const healthTips = [
    "💧 Drink plenty of water daily.",
    "🏃 Exercise regularly.",
    "😴 Sleep 7-8 hours daily.",
    "🥗 Eat healthy food.",
    "🍎 Eat fruits regularly.",
    "🥦 Eat vegetables daily.",
    "🚭 Avoid smoking.",
    "🍺 Avoid alcohol.",
    "🧘 Practice meditation.",
    "🚶 Walk daily.",
    "🧼 Maintain hygiene.",
    "📱 Reduce screen time.",
    "🦷 Brush teeth twice daily.",
    "☀️ Get enough sunlight.",
    "💪 Maintain posture.",
  ];

  // ==========================================
  // BODY PARTS
  // ==========================================

  const bodyParts = [
    {
      emoji: "🧠",
      name: "Brain",
      about:
        "Controls thoughts and body functions.",
    },

    {
      emoji: "❤️",
      name: "Heart",
      about:
        "Pumps blood throughout body.",
    },

    {
      emoji: "🫁",
      name: "Lungs",
      about:
        "Helps breathing.",
    },

    {
      emoji: "👁️",
      name: "Eyes",
      about:
        "Used for vision.",
    },

    {
      emoji: "👂",
      name: "Ears",
      about:
        "Helps hearing.",
    },

    {
      emoji: "👃",
      name: "Nose",
      about:
        "Used for smelling.",
    },

    {
      emoji: "👅",
      name: "Tongue",
      about:
        "Helps taste food.",
    },

    {
      emoji: "🦷",
      name: "Teeth",
      about:
        "Helps chew food.",
    },

    {
      emoji: "💪",
      name: "Muscles",
      about:
        "Helps movement.",
    },

    {
      emoji: "🦴",
      name: "Bones",
      about:
        "Supports body structure.",
    },

    {
      emoji: "✋",
      name: "Hands",
      about:
        "Used for holding objects.",
    },

    {
      emoji: "🦵",
      name: "Legs",
      about:
        "Helps walking.",
    },

    {
      emoji: "🍽️",
      name: "Stomach",
      about:
        "Digests food.",
    },

    {
      emoji: "🩸",
      name: "Blood",
      about:
        "Carries oxygen.",
    },

    {
      emoji: "🧬",
      name: "Skin",
      about:
        "Protects body.",
    },

    {
      emoji: "🧠",
      name: "Nerves",
      about:
        "Transfers signals.",
    },

    {
      emoji: "🦵",
      name: "Knees",
      about:
        "Supports movement.",
    },

    {
      emoji: "🦴",
      name: "Joints",
      about:
        "Connect bones.",
    },

    {
      emoji: "🫘",
      name: "Kidneys",
      about:
        "Filter waste.",
    },

    {
      emoji: "🫀",
      name: "Liver",
      about:
        "Detoxifies body.",
    },
  ];

  // ==========================================
  // 30+ MEDICINES
  // ==========================================

  const medicineInfo: Medicine[] =
    [
      {
        name: "Paracetamol",
        use:
          "Used for fever and pain.",
        warning:
          "Avoid overdose.",
      },

      {
        name: "Ibuprofen",
        use:
          "Used for pain relief.",
        warning:
          "Avoid empty stomach.",
      },

      {
        name: "Cetirizine",
        use:
          "Used for allergies.",
        warning:
          "May cause sleepiness.",
      },

      {
        name: "Aspirin",
        use:
          "Used for pain relief.",
        warning:
          "Avoid for children.",
      },

      {
        name: "Amoxicillin",
        use:
          "Treats bacterial infections.",
        warning:
          "Use only if prescribed.",
      },

      {
        name: "Metformin",
        use:
          "Used for diabetes.",
        warning:
          "Monitor sugar levels.",
      },

      {
        name: "Vitamin C",
        use:
          "Boosts immunity.",
        warning:
          "Avoid excess dosage.",
      },

      {
        name: "ORS",
        use:
          "Prevents dehydration.",
        warning:
          "Use clean water.",
      },

      {
        name: "Crocin",
        use:
          "Used for fever.",
        warning:
          "Avoid overdose.",
      },

      {
        name: "Pantoprazole",
        use:
          "Used for acidity.",
        warning:
          "Avoid overuse.",
      },
    ];

  // ==========================================
  // EMERGENCY CALL
  // ==========================================

  const makeCall = (
    number: string
  ) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🏥 MediFast</h1>
      </nav>

      <div className="disclaimer">
        ⚠️ This AI analyzer is
        for educational purposes
        only and not a
        replacement for
        professional medical
        advice.
      </div>

      {/* ANALYZER */}

      <section className="hero">
        <h2>
          🤖 AI Symptom Analyzer
        </h2>

        <textarea
          placeholder="Describe your symptoms naturally..."
          value={symptomInput}
          onChange={(e) =>
            setSymptomInput(
              e.target.value
            )
          }
        />

        <button
          onClick={
            analyzeSymptoms
          }
        >
          Analyze Symptoms
        </button>
      </section>

      {/* RESULTS */}

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

              <p>
                <strong>
                  Doctor:
                </strong>{" "}
                {
                  disease.doctor
                }
              </p>
            </div>
          )
        )}
      </div>

      {/* SMART REMINDER */}

      <section className="doctor-section">
        <h2>
          💊 Smart Medicine Alarm
        </h2>

        <div className="doctor-card">
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
            type="time"
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

      {/* HEALTH TIPS */}

      <section className="doctor-section">
        <h2>
          🌿 Daily Health Tips
        </h2>

        <div className="doctor-grid">
          {healthTips.map(
            (tip, index) => (
              <div
                key={index}
                className="doctor-card"
              >
                <h3>
                  🌱 Health Tip
                </h3>

                <p>{tip}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* BODY PARTS */}

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

      {/* MEDICINES */}

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

      {/* EMERGENCY */}

      <section className="doctor-section">
        <h2>
          🚨 Emergency Services
        </h2>

        <div className="doctor-grid">
          <div className="doctor-card">
            <h3>
              🚑 Ambulance
            </h3>

            <button
              onClick={() =>
                makeCall("102")
              }
            >
              Call 102
            </button>
          </div>

          <div className="doctor-card">
            <h3>
              🏥 Emergency
            </h3>

            <button
              onClick={() =>
                makeCall("108")
              }
            >
              Call 108
            </button>
          </div>

          <div className="doctor-card">
            <h3>
              👮 Police
            </h3>

            <button
              onClick={() =>
                makeCall("100")
              }
            >
              Call 100
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;