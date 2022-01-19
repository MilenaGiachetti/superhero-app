import { useParams, useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  return (
    <>
      <button onClick={() => navigate(-1)}>go back</button>
      <p>{id}</p>
    </>
  )
}

export default Hero;