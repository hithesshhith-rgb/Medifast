import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [showTerms, setShowTerms] =
    useState(false);

  const [showAbout, setShowAbout] =
    useState(false);

  const [
    showDisclaimer,
    setShowDisclaimer,
  ] = useState(false);

  const handleLogin = () => {
    if (!name || !email) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    const checkbox =
      document.getElementById(
        "agree"
      ) as HTMLInputElement;

    if (!checkbox.checked) {
      alert(
        "Please accept all conditions before entering MediFast."
      );

      return;
    }

    localStorage.setItem(
      "medifastUser",
      JSON.stringify({
        name,
        email,
      })
    );

    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>MediFast</h1>

        <p className="login-subtitle">
          AI Assisted Wellness &
          Health Management
          Platform
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        {/* INFO BUTTONS */}

        <div className="info-buttons">
          <button
            onClick={() =>
              setShowTerms(
                !showTerms
              )
            }
          >
            📋 Terms & Policies
          </button>

          <button
            onClick={() =>
              setShowAbout(
                !showAbout
              )
            }
          >
            🌐 About Website
          </button>

          <button
            onClick={() =>
              setShowDisclaimer(
                !showDisclaimer
              )
            }
          >
            ⚠ Disclaimer
          </button>
        </div>

        {/* TERMS */}

        {showTerms && (
          <div className="info-box">
            <h3>
              📋 Terms &
              Policies
            </h3>

            <p>
              • It only shows
              possible conditions.
            </p>

            <p>
              • It does not
              prescribe medicines
              to use.
            </p>

            <p>
              • It does not claim
              to be a doctor.
            </p>

            <p>
              • It encourages
              users to consult
              healthcare
              professionals.
            </p>

            <p>
              • Helps users learn
              health awareness
              and wellness tips.
            </p>
          </div>
        )}

        {/* ABOUT WEBSITE */}

        {showAbout && (
          <div className="info-box">
            <h3>
              🌐 About
              MediFast
            </h3>

            <p>
              MediFast is an AI
              assisted wellness
              and health
              management platform
              designed to help
              users organize
              health information
              and receive general
              educational
              insights.
            </p>

            <p>
              It is not a medical
              provider and does
              not replace
              professional
              healthcare
              services.
            </p>
          </div>
        )}

        {/* DISCLAIMER */}

        {showDisclaimer && (
          <div className="info-box warning-box">
            <h3>
              ⚠ Disclaimer
            </h3>

            <p>
              MediFast does not
              provide medical
              diagnosis,
              treatment, or
              professional
              medical advice.
            </p>

            <p>
              Always consult a
              qualified
              healthcare
              professional before
              making medical
              decisions.
            </p>
          </div>
        )}

        {/* CONDITIONS */}

        <div className="agree-box">
          <input
            type="checkbox"
            id="agree"
          />

          <label htmlFor="agree">
            I have read and
            accepted the Terms &
            Policies, About
            Website, and
            Disclaimer conditions
            before entering
            MediFast.
          </label>
        </div>

        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
        >
          Enter MediFast
        </button>
      </div>
    </div>
  );
}

export default Login;