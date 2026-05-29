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

  const [accepted, setAccepted] =
    useState(false);

  const [showTerms, setShowTerms] =
    useState(false);

  const [showAbout, setShowAbout] =
    useState(false);

  const [showDisclaimer, setShowDisclaimer] =
    useState(false);

  const handleLogin = () => {
    if (!name || !email) {
      alert(
        "Please fill all fields"
      );

      return;
    }

    if (!accepted) {
      alert(
        "Please accept terms and policies"
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

        {/* TERMS BUTTON */}
        <button
          className="info-btn"
          onClick={() =>
            setShowTerms(
              !showTerms
            )
          }
        >
          📜 Terms & Policies
        </button>

        {showTerms && (
          <div className="info-box">
            <p>
              1. It only shows
              possible conditions.
            </p>

            <p>
              2. It does not
              prescribe medicines
              to use.
            </p>

            <p>
              3. It does not claim
              to be a doctor.
            </p>

            <p>
              4. It encourages
              users to consult
              healthcare
              professionals.
            </p>

            <p>
              5. Helps users learn
              health awareness and
              health tips.
            </p>
          </div>
        )}

        {/* ABOUT BUTTON */}
        <button
          className="info-btn"
          onClick={() =>
            setShowAbout(
              !showAbout
            )
          }
        >
          ℹ About MediFast
        </button>

        {showAbout && (
          <div className="info-box">
            <p>
              MediFast is an AI
              assisted wellness and
              health management
              platform designed to
              help users organize
              health information
              and receive general
              educational insights.
            </p>

            <br />

            <p>
              It is not a medical
              provider and does not
              replace professional
              healthcare services.
            </p>
          </div>
        )}

        {/* DISCLAIMER */}
        <button
          className="info-btn"
          onClick={() =>
            setShowDisclaimer(
              !showDisclaimer
            )
          }
        >
          ⚠ Main Disclaimer
        </button>

        {showDisclaimer && (
          <div className="info-box warning-box">
            <p>
              MediFast does not
              provide medical
              diagnosis, treatment,
              or professional
              medical advice.
            </p>

            <br />

            <p>
              Always consult a
              qualified healthcare
              professional before
              making medical
              decisions.
            </p>
          </div>
        )}

        {/* SPECIAL THANKS */}
        <div className="credits-box">
          <h3>
            🌟 Special Thanks
          </h3>

          <p>
            ❤️ Jegan bro for
            supporting me to create
            my first website.
          </p>

          <p>
            👨‍⚕ Dr. Rajesh Kumar
            for appreciating and
            giving feedback for my
            website.
          </p>

          <p>
            👨‍🏫 Science Teacher
            Selvaraj Master for
            giving ideas and
            support.
          </p>

          <p>
            🚀 And thanks to myself
            for believing and
            creating my first
            website.
          </p>
        </div>

        {/* ACCEPT */}
        <div className="checkbox-area">
          <input
            type="checkbox"
            checked={accepted}
            onChange={() =>
              setAccepted(
                !accepted
              )
            }
          />

          <p>
            I accept the Terms,
            Policies & Disclaimer
          </p>
        </div>

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