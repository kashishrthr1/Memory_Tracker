import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <h1>Welcome Everyone Random Stuff</h1>
      <h2>More Random Gibberish Which Will Never End</h2>
      <p>
        Even more gibberish for testing purposes, hello buddy boy how are you i
        am fantastic
      </p>

      <button className="btn-primary" onClick={() => navigate("/login")}>
        Get Started
      </button>
    </section>
  );
};

export default Hero;
