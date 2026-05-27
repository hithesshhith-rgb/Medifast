import React, {
  useEffect,
  useState,
} from "react";

import "./App.css";

interface Disease {
  name: string;
  severity: string;
  cause: string;
  solution: string;
  doctor: string;
}

function App() {
  const [symptomInput, setSymptomInput] =
    useState("");

  const [results, setResults] =
    useState<Disease[]>([]);

  const [medicine, setMedicine] =
    useState("");

  const [time, setTime] =
    useState("");

  const [reminders, setReminders] =
    useState<any[]>([]);

  // ==========================================
  // ADVANCED NLP SYMPTOM DATABASE
  // ==========================================

  const symptomDatabase = [
    // CRITICAL

    {
      keywords: [
        "chest pain",
        "heart pain",
        "tight chest",
        "cannot breathe",
        "breathing problem",
        "shortness of breath",
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

    // EYE

    {
      keywords: [
        "eye pain",
        "eyes hurting",
        "red eyes",
        "itchy eyes",
        "blurred vision",
        "watering eyes",
        "eye irritation",
      ],

      disease: {
        name:
          "Eye Infection",

        severity: "Moderate",

        cause:
          "Eye infection or allergy.",

        solution:
          "Avoid rubbing eyes and consult eye specialist.",

        doctor:
          "Ophthalmologist 👁️",
      },
    },

    // EAR

    {
      keywords: [
        "ear pain",
        "ear infection",
        "blocked ear",
        "ear ringing",
        "hearing problem",
      ],

      disease: {
        name:
          "Ear Infection",

        severity: "Moderate",

        cause:
          "Wax blockage or infection.",

        solution:
          "Consult ENT specialist.",

        doctor:
          "ENT Specialist 👂",
      },
    },

    // NOSE

    {
      keywords: [
        "blocked nose",
        "runny nose",
        "nose pain",
        "sinus pain",
        "nose bleeding",
        "sneezing",
      ],

      disease: {
        name:
          "Sinus / Nasal Infection",

        severity: "Mild",

        cause:
          "Cold, allergy or sinus issue.",

        solution:
          "Stay hydrated and take proper rest.",

        doctor:
          "ENT Specialist 👃",
      },
    },

    // THROAT

    {
      keywords: [
        "throat pain",
        "sore throat",
        "difficulty swallowing",
        "throat infection",
      ],

      disease: {
        name:
          "Throat Infection",

        severity: "Moderate",

        cause:
          "Viral or bacterial infection.",

        solution:
          "Avoid cold foods and consult doctor.",

        doctor:
          "ENT Specialist 🗣️",
      },
    },

    // FACE PIMPLES

    {
      keywords: [
        "pimple",
        "pimples",
        "acne",
        "face pimples",
        "skin problem",
        "face redness",
      ],

      disease: {
        name:
          "Acne / Skin Problem",

        severity: "Mild",

        cause:
          "Hormonal changes or oily skin.",

        solution:
          "Maintain hygiene and consult dermatologist.",

        doctor:
          "Dermatologist 🧴",
      },
    },

    // LEG

    {
      keywords: [
        "leg pain",
        "pain in leg",
        "legs hurting",
      ],

      disease: {
        name:
          "Leg Muscle Strain",

        severity: "Moderate",

        cause:
          "Muscle strain or injury.",

        solution:
          "Take proper rest.",

        doctor:
          "Orthopedic 🦵",
      },
    },

    // HAND

    {
      keywords: [
        "hand pain",
        "pain in hand",
        "wrist pain",
      ],

      disease: {
        name:
          "Hand Joint Pain",

        severity: "Moderate",

        cause:
          "Joint inflammation.",

        solution:
          "Avoid strain and consult doctor.",

        doctor:
          "Orthopedic ✋",
      },
    },

    // NECK

    {
      keywords: [
        "neck pain",
        "pain in neck",
        "stiff neck",
      ],

      disease: {
        name:
          "Neck Muscle Strain",

        severity: "Moderate",

        cause:
          "Poor posture or tension.",

        solution:
          "Maintain posture and take rest.",

        doctor:
          "Orthopedic 🧍",
      },
    },

    // KNEE

    {
      keywords: [
        "knee pain",
        "pain in knee",
      ],

      disease: {
        name:
          "Knee Joint Problem",

        severity: "Moderate",

        cause:
          "Joint inflammation.",

        solution:
          "Avoid pressure on knees.",

        doctor:
          "Orthopedic 🦴",
      },
    },

    // URINE

    {
      keywords: [
        "pain while urinating",
        "burning urine",
        "pee pain",
      ],

      disease: {
        name:
          "Urinary Tract Infection",

        severity: "Moderate",

        cause:
          "Bacterial infection in urinary tract.",

        solution:
          "Drink more water and consult doctor.",

        doctor:
          "Urologist 🚽",
      },
    },

    // STOMACH

    {
      keywords: [
        "stomach pain",
        "abdomen pain",
        "vomiting",
        "gastric",
      ],

      disease: {
        name:
          "Digestive Problem",

        severity: "Moderate",

        cause:
          "Acidity or stomach infection.",

        solution:
          "Eat light food and stay hydrated.",

        doctor:
          "Gastroenterologist 🍽️",
      },
    },

    // HEAD

    {
      keywords: [
        "headache",
        "migraine",
        "dizziness",
      ],

      disease: {
        name: "Migraine",

        severity: "Mild",

        cause:
          "Stress or dehydration.",

        solution:
          "Take proper rest.",

        doctor:
          "Neurologist 🧠",
      },
    },

    // STRESS

    {
      keywords: [
        "stress",
        "sad",
        "depression",
        "anxiety",
      ],

      disease: {
        name:
          "Mental Health Concern",

        severity: "Moderate",

        cause:
          "Emotional stress or anxiety.",

        solution:
          "Consult mental health expert.",

        doctor:
          "Psychologist 🧠",
      },
    },
  ];

  // ==========================================
  // NLP ANALYZER
  // ==========================================

  const analyzeSymptoms = () => {
    const input =
      symptomInput.toLowerCase();

    let detectedDiseases: Disease[] =
      [];

    symptomDatabase.forEach(
      (item) => {
        const matched =
          item.keywords.some(
            (keyword) =>
              input.includes(
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

    // EMERGENCY ALERT

    const hasCriticalCondition =
      uniqueDiseases.some(
        (disease) =>
          disease.severity ===
          "Critical"
      );

    if (
      hasCriticalCondition
    ) {
      const emergencySound =
        new Audio(
          "https://www.soundjay.com/misc/sounds/emergency-alarm-with-reverb-1.mp3"
        );

      emergencySound.play();

      alert(
        "🚨 EMERGENCY ALERT!\n\nCritical symptoms detected.\nPlease seek emergency medical help immediately."
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
          "Please consult a medical professional.",

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

    const newReminder = {
      medicine,
      time,
    };

    setReminders([
      ...reminders,
      newReminder,
    ]);

    alert(
      `Reminder added for ${medicine} at ${time}`
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
  // EMERGENCY CALL
  // ==========================================

  const makeCall = (
    number: string
  ) => {
    window.location.href = `tel:${number}`;
  };

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
    "🍔 Avoid junk food.",
    "🩺 Regular health checkups.",
    "😌 Reduce stress.",
    "🫀 Monitor blood pressure.",
    "🧠 Take care of mental health.",
  ];

  // ==========================================
  // BODY PARTS
  // ==========================================

  const bodyParts = [
    {
      emoji: "🧠",
      name: "Brain",
      about:
        "Controls memory and body functions.",
    },

    {
      emoji: "❤️",
      name: "Heart",
      about:
        "Pumps blood through body.",
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
        "Used for smell and breathing.",
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
      emoji: "🧍",
      name: "Neck",
      about:
        "Supports head movement.",
    },

    {
      emoji: "💪",
      name: "Muscles",
      about:
        "Helps body movement.",
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
        "Used for holding things.",
    },

    {
      emoji: "🦵",
      name: "Legs",
      about:
        "Helps walking.",
    },

    {
      emoji: "🦶",
      name: "Feet",
      about:
        "Maintains balance.",
    },

    {
      emoji: "🍽️",
      name: "Stomach",
      about:
        "Digests food.",
    },

    {
      emoji: "🫃",
      name: "Abdomen",
      about:
        "Contains digestive organs.",
    },

    {
      emoji: "🩸",
      name: "Blood",
      about:
        "Carries oxygen.",
    },

    {
      emoji: "🫀",
      name: "Veins",
      about:
        "Carries blood in body.",
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
        "Transfers body signals.",
    },
  ];

  // ==========================================
  // MEDICINES
  // ==========================================

  const medicineInfo = [
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
      name: "Vitamin D",
      use:
        "Supports bone health.",

      warning:
        "Use proper dosage.",
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
      name: "Dolo 650",
      use:
        "Used for fever and pain.",

      warning:
        "Use correct dosage.",
    },

    {
      name: "Pantoprazole",
      use:
        "Used for acidity.",

      warning:
        "Avoid long-term use.",
    },

    {
      name: "Antacid",
      use:
        "Relieves acidity.",

      warning:
        "Avoid overuse.",
    },

    {
      name: "Insulin",
      use:
        "Controls blood sugar.",

      warning:
        "Use under supervision.",
    },

    {
      name: "Azithromycin",
      use:
        "Treats infections.",

      warning:
        "Use only if prescribed.",
    },

    {
      name: "Iron Tablets",
      use:
        "Treats iron deficiency.",

      warning:
        "May cause constipation.",
    },

    {
      name: "Calcium Tablets",
      use:
        "Strengthens bones.",

      warning:
        "Use proper dosage.",
    },

    {
      name: "Multivitamins",
      use:
        "Supports health.",

      warning:
        "Avoid overdose.",
    },

    {
      name: "Eye Drops",
      use:
        "Relieves eye irritation.",

      warning:
        "Use clean applicator.",
    },

    {
      name: "Cough Syrup",
      use:
        "Relieves cough.",

      warning:
        "May cause drowsiness.",
    },
  ];

  return (
    <div className="app">
      <nav className="navbar">
        <h1>🏥 MediFast</h1>
      </nav>

      <div className="disclaimer">
        ⚠️ This AI analyzer is only
        for educational purposes and
        not a replacement for
        professional medical advice.
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

              {disease.severity ===
                "Critical" && (
                <div
                  style={{
                    background:
                      "red",
                    color:
                      "white",
                    padding:
                      "15px",
                    marginTop:
                      "15px",
                    borderRadius:
                      "12px",
                    fontWeight:
                      "bold",
                    textAlign:
                      "center",
                  }}
                >
                  🚨 EMERGENCY
                  ALERT 🚨
                  <br />
                  Seek Immediate
                  Medical Help
                </div>
              )}
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

          <div className="doctor-card">
            <h3>
              🔥 Fire Force
            </h3>

            <button
              onClick={() =>
                makeCall("101")
              }
            >
              Call 101
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;