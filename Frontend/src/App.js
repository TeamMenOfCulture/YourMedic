import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Loader,
  Environment,
  useFBX,
  useAnimations,
  OrthographicCamera,
} from "@react-three/drei";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { MeshStandardMaterial } from "three/src/materials/MeshStandardMaterial";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css"; // Import the CSS file
import { transliterate } from "https://cdn.jsdelivr.net/npm/transliteration@2.1.8/dist/browser/bundle.esm.min.js";
import { LinearEncoding, sRGBEncoding } from "three/src/constants";
import { LineBasicMaterial, MeshPhysicalMaterial, Vector2 } from "three";
import ReactAudioPlayer from "react-audio-player";
import firebaseConfig from "./db";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import createAnimation from "./converter";
import blinkData from "./blendDataBlink.json";
import SpeechRecognitionComponent from "./SpeechToTextComponent";
import * as THREE from "three";
import axios from "axios";

const _ = require("lodash");
const { Configuration, OpenAIApi } = require("openai");

const host = "http://localhost:5000";

function Avatar({
  avatar_url,
  speak,
  setSpeak,
  text,
  setAudioSource,
  playing,
  user,
}) {
  let gltf = useGLTF(avatar_url);
  let morphTargetDictionaryBody = null;
  let morphTargetDictionaryLowerTeeth = null;

  const [
    bodyTexture,
    eyesTexture,
    teethTexture,
    bodySpecularTexture,
    bodyRoughnessTexture,
    bodyNormalTexture,
    teethNormalTexture,
    // teethSpecularTexture,
    hairTexture,
    tshirtDiffuseTexture,
    tshirtNormalTexture,
    tshirtRoughnessTexture,
    hairAlphaTexture,
    hairNormalTexture,
    hairRoughnessTexture,
  ] = useTexture([
    "/images/body.webp",
    "/images/eyes.webp",
    "/images/teeth_diffuse.webp",
    "/images/body_specular.webp",
    "/images/body_roughness.webp",
    "/images/body_normal.webp",
    "/images/teeth_normal.webp",
    // "/images/teeth_specular.webp",
    "/images/h_color.webp",
    "/images/tshirt_diffuse.webp",
    "/images/tshirt_normal.webp",
    "/images/tshirt_roughness.webp",
    "/images/h_alpha.webp",
    "/images/h_normal.webp",
    "/images/h_roughness.webp",
  ]);

  _.each(
    [
      bodyTexture,
      eyesTexture,
      teethTexture,
      teethNormalTexture,
      bodySpecularTexture,
      bodyRoughnessTexture,
      bodyNormalTexture,
      tshirtDiffuseTexture,
      tshirtNormalTexture,
      tshirtRoughnessTexture,
      hairAlphaTexture,
      hairNormalTexture,
      hairRoughnessTexture,
    ],
    (t) => {
      t.encoding = sRGBEncoding;
      t.flipY = false;
    }
  );

  bodyNormalTexture.encoding = LinearEncoding;
  tshirtNormalTexture.encoding = LinearEncoding;
  teethNormalTexture.encoding = LinearEncoding;
  hairNormalTexture.encoding = LinearEncoding;

  gltf.scene.traverse((node) => {
    if (
      node.type === "Mesh" ||
      node.type === "LineSegments" ||
      node.type === "SkinnedMesh"
    ) {
      node.castShadow = true;
      node.receiveShadow = true;
      node.frustumCulled = false;

      if (node.name.includes("Body")) {
        node.castShadow = true;
        node.receiveShadow = true;

        node.material = new MeshPhysicalMaterial();
        node.material.map = bodyTexture;
        // node.material.shininess = 60;
        node.material.roughness = 1.7;

        // node.material.specularMap = bodySpecularTexture;
        node.material.roughnessMap = bodyRoughnessTexture;
        node.material.normalMap = bodyNormalTexture;
        node.material.normalScale = new Vector2(0.6, 0.6);

        morphTargetDictionaryBody = node.morphTargetDictionary;

        node.material.envMapIntensity = 0.8;
        // node.material.visible = false;
      }

      if (node.name.includes("Eyes")) {
        node.material = new MeshStandardMaterial();
        node.material.map = eyesTexture;
        // node.material.shininess = 100;
        node.material.roughness = 0.1;
        node.material.envMapIntensity = 0.5;
      }

      if (node.name.includes("Brows")) {
        node.material = new LineBasicMaterial({ color: 0x000000 });
        node.material.linewidth = 1;
        node.material.opacity = 0.5;
        node.material.transparent = true;
        node.visible = false;
      }

      if (node.name.includes("Teeth")) {
        node.receiveShadow = true;
        node.castShadow = true;
        node.material = new MeshStandardMaterial();
        node.material.roughness = 0.1;
        node.material.map = teethTexture;
        node.material.normalMap = teethNormalTexture;

        node.material.envMapIntensity = 0.7;
      }

      if (node.name.includes("Hair")) {
        node.material = new MeshStandardMaterial();
        node.material.map = hairTexture;
        node.material.alphaMap = hairAlphaTexture;
        node.material.normalMap = hairNormalTexture;
        node.material.roughnessMap = hairRoughnessTexture;

        node.material.transparent = true;
        node.material.depthWrite = false;
        node.material.side = 2;
        node.material.color.setHex(0x000000);

        node.material.envMapIntensity = 0.3;
      }

      if (node.name.includes("TSHIRT")) {
        node.material = new MeshStandardMaterial();

        node.material.map = tshirtDiffuseTexture;
        node.material.roughnessMap = tshirtRoughnessTexture;
        node.material.normalMap = tshirtNormalTexture;
        node.material.color.setHex(0xffffff);

        node.material.envMapIntensity = 0.5;
      }

      if (node.name.includes("TeethLower")) {
        morphTargetDictionaryLowerTeeth = node.morphTargetDictionary;
      }
    }
  });

  const [clips, setClips] = useState([]);
  const mixer = useMemo(() => new THREE.AnimationMixer(gltf.scene), []);

  useEffect(() => {
    if (speak === false) return;
    // --------------------------------------------------------------------------------------------------------------------------------
    //   async function runCompletion () {
    //     const completion = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: text,
    //     });
    //     text  = completion.data.choices[0].text;
    //     console.log(text)
    // }

    // runCompletion();

    makeSpeech(text, user)
      .then((response) => {
        let { blendData, filename } = response.data;

        let newClips = [
          createAnimation(blendData, morphTargetDictionaryBody, "HG_Body"),
          createAnimation(
            blendData,
            morphTargetDictionaryLowerTeeth,
            "HG_TeethLower"
          ),
        ];

        filename = host + filename;

        setClips(newClips);
        setAudioSource(filename);
      })
      .catch((err) => {
        console.error(err);
        setSpeak(false);
      });
  }, [speak]);

  let idleFbx = useFBX("/idle.fbx");
  let { clips: idleClips } = useAnimations(idleFbx.animations);

  idleClips[0].tracks = _.filter(idleClips[0].tracks, (track) => {
    return (
      track.name.includes("Head") ||
      track.name.includes("Neck") ||
      track.name.includes("Spine2")
    );
  });

  idleClips[0].tracks = _.map(idleClips[0].tracks, (track) => {
    if (track.name.includes("Head")) {
      track.name = "head.quaternion";
    }

    if (track.name.includes("Neck")) {
      track.name = "neck.quaternion";
    }

    if (track.name.includes("Spine")) {
      track.name = "spine2.quaternion";
    }

    return track;
  });

  useEffect(() => {
    let idleClipAction = mixer.clipAction(idleClips[0]);
    idleClipAction.play();

    let blinkClip = createAnimation(
      blinkData,
      morphTargetDictionaryBody,
      "HG_Body"
    );
    let blinkAction = mixer.clipAction(blinkClip);
    blinkAction.play();
  }, []);

  // Play animation clips when available
  useEffect(() => {
    if (playing === false) return;

    _.each(clips, (clip) => {
      let clipAction = mixer.clipAction(clip);
      clipAction.setLoop(THREE.LoopOnce);
      clipAction.play();
    });
  }, [playing]);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return (
    <group name="avatar">
      <primitive object={gltf.scene} dispose={null} />
    </group>
  );
}

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//---------------------------------------------------------------------------------------------------------------------------------
async function makeSpeech(text, user) {
  console.log(text);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const userEmail = user.email;
  const userDocRef = doc(db, "PatientData", userEmail);
  let initiateText =
    "MISSION:You are a patient intake chatbot focusing on symptoms. Your mission is to ask questions to help a patient fully articulate their symptoms in a clear manner. Your chat transcript will ultimately be translated into chart notes.,RULES:Ask only one question at a time. Provide some context or clarification around the follow-up questions you ask. Do not converse with the patient. Try to avoid saying things like Thanks for confirming and those things. Also, Don't say all our symtoms at once. Try to avoid long sentences. Do not repeat my symtoms to me. CHARACTER:Try to be helpful and sympathetic to the patient. Your name is Disha.";
  let message = [{ role: "system", content: initiateText }];
  message.push({ role: "user", content: "Name: " + user.given_name });
  message.push({ role: "user", content: text });
  try {
    const docSnap = await getDoc(userDocRef);

    if (!docSnap.exists()) {
      // If the document doesn't exist, create it with the initial array

      await setDoc(userDocRef, {
        ChatHistory: message,
      });
    } else {
      // If the document exists, append the new object to the 'ChatHistory' array
      const chatHistory = docSnap.data().ChatHistory || [];
      chatHistory.push({ role: "user", content: text });

      await updateDoc(userDocRef, { ChatHistory: chatHistory });

      console.log("Document successfully updated! ", chatHistory);
    }
  } catch (error) {
    console.error("Error updating/creating document:", error);
  }

  console.log(transliterate(text));

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
      temperature: 0.2,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    text = completion.data.choices[0].message.content;
    console.log(text);
    const docSnap = await getDoc(userDocRef);
    const chatHistory = docSnap.data().ChatHistory || [];
    chatHistory.push({ role: "system", content: text });
    await updateDoc(userDocRef, { ChatHistory: chatHistory });
    // const completionText = completion.data.choices[0].message.content;
    message.push({ role: "system", content: text });
    return axios.post(host + "/talk", { text });
  } catch (error) {
    console.error("An error occurred:", error);
    return error;
  }
}

const STYLES = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {},
  loginButton: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  logoutButton: {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  area: { position: "absolute", bottom: "10px", left: "10px", zIndex: 500 },
  text: {
    margin: "0px",
    width: "300px",
    padding: "5px",
    background: "none",
    color: "#ffffff",
    fontSize: "1.2em",
    border: "none",
  },
  speak: {
    padding: "10px",
    marginTop: "5px",
    display: "block",
    color: "#FFFFFF",
    background: "#222222",
    border: "None",
  },
  area2: { position: "absolute", top: "5px", right: "15px", zIndex: 500 },
  label: { color: "#777777", fontSize: "0.8em" },
  a1: { position: "sticky" },
  loginSection: {
    backgroundColor: "#222",
    padding: "40px",

    borderRadius: "15px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "1100px",
    margin: "auto",
    color: "#fff",
  },
  mainbg: {
    backgroundColor: "#222",
  },
};

function App() {
  const [isListening, setIsListening] = useState(false);
  const [transcript1, setTranscript] = useState("");
  const [recognizer, setRecognizer] = useState(null);

  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();
  const audioPlayer = useRef();

  const [speak, setSpeak] = useState(false);
  const [text, setText] = useState(transcript1);
  const [audioSource, setAudioSource] = useState(null);
  const [playing, setPlaying] = useState(false);

  // End of play
  function playerEnded(e) {
    setAudioSource(null);
    setSpeak(false);
    setPlaying(false);
  }

  // Player is read
  function playerReady(e) {
    audioPlayer.current.audioEl.current.play();
    setPlaying(true);
  }
  console.log();
  if (isAuthenticated) {
    console.log(user);
    return (
      <div className="full">
        <div style={STYLES.area}>
          <div style={STYLES.a1}>
            <nav style={STYLES.navbar}>
              <div style={STYLES.leftContent}>Hey, {user.given_name}!</div>
              <div style={STYLES.rightContent}>
                {isAuthenticated && (
                  <button style={STYLES.logoutButton} onClick={logout}>
                    Logout
                  </button>
                )}
              </div>
            </nav>
          </div>
          <SpeechRecognitionComponent
            isListening={isListening}
            transcript={transcript1}
            recognizer={recognizer}
            setIsListening={setIsListening}
            setTranscript={setTranscript}
            setRecognizer={setRecognizer}
            STYLES={STYLES}
            setText={setText}
            setSpeak={setSpeak}
          />
          {/* <button onClick={resetTranscript}>Reset</button> */}
          {/* <button onClick={() => setSpeak(true)} style={STYLES.speak}> */}
          {/*  */}
          {/* {speak ? "Running..." : "Speak"} */}
          {/* </button> */}
        </div>

        <ReactAudioPlayer
          src={audioSource}
          ref={audioPlayer}
          onEnded={playerEnded}
          onCanPlayThrough={playerReady}
        />

        {/* <Stats /> */}
        <Canvas
          dpr={2}
          onCreated={(ctx) => {
            ctx.gl.physicallyCorrectLights = true;
          }}
        >
          <OrthographicCamera makeDefault zoom={1500} position={[0, 1.66, 1]} />

          {/* <OrbitControls
        target={[0, 1.65, 0]}
      /> */}

          <Suspense fallback={null}>
            <Environment
              background={false}
              files="/images/photo_studio_loft_hall_1k.hdr"
            />
          </Suspense>

          <Suspense fallback={null}></Suspense>

          <Suspense fallback={null}>
            <Avatar
              avatar_url="/model.glb"
              speak={speak}
              setSpeak={setSpeak}
              text={transcript1}
              setAudioSource={setAudioSource}
              playing={playing}
              user={user}
            />
          </Suspense>
        </Canvas>
        <Loader dataInterpolation={(p) => `Loading... please wait`} />
      </div>
    );
  } else {
    return (
      <body class="loginBG">
        <div style={STYLES.loginSection} className="loginSection">
          <h1 class="Headline">
            Your<span class="medic">Medic</span>
          </h1>
          <h2 class="Tagline">
            Hi, I am Sophia. Sign Up to get me as your own AI Medic
          </h2>
          <button
            style={STYLES.loginButton}
            className="loginButton"
            onClick={loginWithPopup}
          >
            Get Started
          </button>
        </div>
      </body>
    );
  }
}

function Bg() {
  const texture = useTexture("/images/bg.webp");

  return (
    <mesh position={[0, 1.55, -2]} scale={[1, 1, 1]}>
      <planeBufferGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export default App;
