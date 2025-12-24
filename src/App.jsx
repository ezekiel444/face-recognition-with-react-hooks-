import React, { useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Navigation from "./components/Navigations/Navigation.jsx";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import SignIn from "./Sign/SignIn.jsx";
import Register from "./components/Register/Register.jsx";
import "./App.css";

const CLARIFAI_API_KEY = import.meta.env.VITE_CLARIFAI_API_KEY;
const FACE_MODEL = "a403429f2ddf4b49b307e318f00e528b"; // FACE_DETECT_MODEL

const particlesOptions = {
  particles: { number: { value: 100 }, size: { value: 3 } },
};

const initialState = { id: "", name: "", email: "", entries: 0, password: "", joined: "" };

export default function App() {
  const [inputValue, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [signInRoute, setSignInRoute] = useState("signin");
  const [isSignIn, setIsSignIn] = useState(false);
  const [updateUser, setUpdateUser] = useState(initialState);

  const handleUserUpdate = (data) => setUpdateUser({ ...data });

  const onChangeRoute = (route) => {
    if (route === "home") setIsSignIn(true);
    else if (route === "signout") {
      setUpdateUser(initialState);
      setIsSignIn(false);
      setInput("");
      setImageUrl("");
      setBox({});
    }
    setSignInRoute(route);
  };

  const imageCalculation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - clarifaiFace.right_col * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (calculatedImage) => setBox(calculatedImage);

  const onChangeHandle = (e) => setInput(e.target.value);

  const onSubmitPicture = async () => {
    setImageUrl(inputValue);
    try {
      const response = await fetch(`https://api.clarifai.com/v2/models/${FACE_MODEL}/outputs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${CLARIFAI_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: [{ data: { image: { url: inputValue } } }],
        }),
      });
      const data = await response.json();
      if (data) {
        const backendResponse = await fetch("https://limitless-fortress-98511.herokuapp.com/findface", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: updateUser.id }),
        });
        const entries = await backendResponse.json();
        setUpdateUser((prev) => ({ ...prev, entries }));
      }
      displayFaceBox(imageCalculation(data));
    } catch (err) {
      console.error("Error detecting face:", err);
    }
  };

  return (
    <div className="App">
      <Particles className="particles" options={particlesOptions} init={loadSlim} />
      <Navigation onChangeRoute={onChangeRoute} isSignedIn={isSignIn} />
      {signInRoute === "home" ? (
        <>
          <Logo />
          <Rank updateUser={updateUser} />
          <ImageLinkForm onChangeHandle={onChangeHandle} onSubmitPicture={onSubmitPicture} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </>
      ) : signInRoute === "signin" ? (
        <SignIn handleUserUpdate={handleUserUpdate} onChangeRoute={onChangeRoute} />
      ) : (
        <Register handleUserUpdate={handleUserUpdate} onChangeRoute={onChangeRoute} />
      )}
    </div>
  );
}
