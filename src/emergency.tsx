import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function Emergency() {
  const location = useLocation();

  const navigate = useNavigate();

  const number =
    location.state?.number;

  return (
    <div className="calling-page">
      <div className="calling-box">
        <h1>📞 Calling...</h1>

        <h2>{number}</h2>

        <button
          onClick={() =>
            navigate("/home")
          }
        >
          End Call
        </button>
      </div>
    </div>
  );
}

export default Emergency;