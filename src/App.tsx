import "./App.css";
import { useState, useEffect, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomButton from "./components/CustomButton";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Webcam from "react-webcam";
import { cn } from "./lib/utils";

type bodyClassType = "title_page" | "end_page" | "flowers" | "gold" | "light";

function App() {
  const { toast } = useToast();
  let [name, setName] = useState<string>("");
  let [bodyClass, setBodyClass] = useState<bodyClassType>("title_page");
  // let [bodyClass, setBodyClass] = useState<bodyClassType>("end_page");
  let [language, setLanguage] = useState<"EN" | "中文">("EN");
  let [randomLucky, setRandomLucky] = useState<string>("");

  type LUCKY_TYPE = {
    [key: string]: number;
  };

  let LUCKY: LUCKY_TYPE[] = [
    {
      福: 0.1,
      大福: 0.6,
      超级福: 0.3,
    },
    {
      兴: 0.1,
      大兴: 0.6,
      超级兴: 0.3,
    },
    {
      旺: 0.1,
      大旺: 0.6,
      超级旺: 0.3,
    },
    {
      发: 0.1,
      大发: 0.6,
      超级发: 0.3,
    },
    {
      吉祥: 0.1,
      大吉祥: 0.6,
      超级吉祥: 0.3,
    },
  ];
  let videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "environment",
    autoFocus: "continuous",
    flashMode: "off",
    whiteBalance: "continuous",
    zoom: 0,
    focusDepth: 0,
    aspectRatio: 0.5625,
  };

  type LANGUAGE_TYPE = {
    header: ReactNode;
    input: string;
    flower: ReactNode;
    gold: ReactNode;
    light: ReactNode;
    warning: string;
    congrats: string;
    offer: string;
  };

  type LANGUAGE_MAP_TYPE = {
    EN: LANGUAGE_TYPE;
    中文: LANGUAGE_TYPE;
  };

  let LANGUAGE_MAP: LANGUAGE_MAP_TYPE = {
    EN: {
      header: <span>Choose Your Offering</span>,
      input: "Enter Your Name",
      flower: <span>Flowers</span>,
      gold: <span>Gold Ingots</span>,
      light: <span>Candles</span>,
      warning: "Please enter name before choosing offering",
      congrats: "CONGRATULATIONS",
      offer: "Offer Item",
    },
    中文: {
      header: <div className="text-[2.6rem] font-bold mt-8">选择您的贡品</div>,
      input: "输入您的名字",
      flower: <span>鲜花</span>,
      gold: <span>金宝</span>,
      light: <span>蜡烛</span>,
      warning: "请输入您的名字才选择您的贡品",
      congrats: "恭喜",
      offer: "供养贡品",
    },
  };

  function changeState(state: bodyClassType) {
    if (name.trim().length == 0) {
      return toast({
        title: LANGUAGE_MAP[language]["warning"],
        variant: "destructive",
        duration: 2500,
      });
    }
    setBodyClass(state);
    console.log(name);
  }

  useEffect(() => {
    if (bodyClass == "flowers" || bodyClass == "gold" || bodyClass == "light") {
      // setTimeout(() => {
      //   setBodyClass("end_page");
      // }, 10000);
    } else if (bodyClass == "end_page") {
      let randomWord = Math.floor(Math.random() * LUCKY.length);
      const randNum = Math.random();
      let cumulativeProb = 0;
      for (const letter in LUCKY[randomWord]) {
        cumulativeProb += LUCKY[randomWord][letter];
        if (randNum <= cumulativeProb) {
          setRandomLucky(letter);
          break;
        }
      }
    }
  }, [bodyClass]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then(function (stream) {
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.stop();
        }
      })
      .catch(function (error) {
        console.error("Error accessing video stream:", error);
      });
  }, []);

  return (
    <div className={cn(bodyClass, "relative min-h-[100dvh] h-full", language)}>
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant={"outline"}
          onClick={() =>
            setLanguage((prevState) => (prevState == "EN" ? "中文" : "EN"))
          }
          className={cn(language == "EN" ? "中文" : "EN")}
        >
          {language == "EN" ? <span className="font-bold">中文</span> : "EN"}
        </Button>
      </div>
      {bodyClass == "title_page" ? (
        <div className="flex flex-col min-h-[100dvh] h-full items-center gap-5 mx-auto w-[250px] pt-20">
          <h1 className="text-4xl textOutline textShadow text-[#5e2222] text-center">
            {LANGUAGE_MAP[language]["header"]}
          </h1>
          <Input
            onInput={(e) => {
              setName((e.target as HTMLInputElement).value);
            }}
            value={name}
            type="text"
            id="name"
            placeholder={LANGUAGE_MAP[language]["input"]}
            className={cn(
              "text-center my-6 rounded-none border-4 border-white text-white placeholder:text-white bg-[#374f66] flex h-full w-full px-1 py-3 text-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              language == "中文" ? "text-2xl" : ""
            )}
          />
          <CustomButton
            className={cn(
              language == "中文" ? "font-semibold" : "",
              "text-2xl"
            )}
            clickHandler={() => {
              changeState("flowers");
            }}
          >
            {LANGUAGE_MAP[language]["flower"]}
          </CustomButton>
          <CustomButton
            className={cn(
              language == "中文" ? "font-semibold" : "",
              "text-2xl"
            )}
            clickHandler={() => {
              changeState("gold");
            }}
          >
            {LANGUAGE_MAP[language]["gold"]}
          </CustomButton>
          <CustomButton
            className={cn(
              language == "中文" ? "font-semibold" : "",
              "text-2xl"
            )}
            clickHandler={() => {
              changeState("light");
            }}
          >
            {LANGUAGE_MAP[language]["light"]}
          </CustomButton>
        </div>
      ) : bodyClass == "end_page" ? (
        <div className="flex flex-col min-h-[100dvh] h-full justify-center items-center mx-auto p-1 text-[#e3e04b] min-w-[300px] max-w-[360px]">
          <div
            className={cn(
              "text-2xl text-center endPageText flex flex-col",
              language == "中文" ? "font-semibold text-[2.1rem]" : ""
            )}
          >
            <span
              className={
                language == "中文" ? "font-semibold leading-[0.6]" : ""
              }
            >
              {LANGUAGE_MAP[language]["congrats"]}
            </span>
            <span>{name}</span>
          </div>
          <div
            id="scroll"
            className="flex items-center justify-center mt-12 relative"
          >
            <div className="text-6xl font-extrabold glowTextRed 中文 mb-10 text-[#E62911]">
              {randomLucky}
            </div>
            <div className="absolute z-10 w-full h-full">
              <img
                src="/img/Ingot_01.png"
                className="absolute w-14 aspect-square z-10 -bottom-14 left-10"
              />
              <img
                src="/img/Ingot_02.png"
                className="absolute w-14 aspect-square z-10 -bottom-8 right-20"
              />
              <img
                src="/img/Coin_01.png"
                className="absolute w-14 aspect-square z-10 -top-9 right-6"
              />
              <img
                src="/img/Coin_02.png"
                className="absolute w-10 aspect-square z-10 top-5 right-14"
              />
              <img
                src="/img/Coin_01.png"
                className="absolute w-12 aspect-square z-10 -top-10 -scale-x-100"
              />
              <img
                src="/img/Coin_02.png"
                className="absolute w-12 aspect-square z-10 top-5 -scale-x-100 left-4"
              />
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        <div className="max-h-[100dvh] overflow-hidden relative">
          <Webcam
            audio={false}
            width={720}
            height={1280}
            videoConstraints={videoConstraints}
            className="w-full h-[100dvh] object-cover"
            autoFocus={true}
          ></Webcam>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30">
            <CustomButton
              className={cn(
                language == "中文" ? "font-semibold text-lg" : "text-base",
                "redLinearBackground py-2 px-6"
              )}
              clickHandler={() => {
                setBodyClass("end_page");
              }}
            >
              {LANGUAGE_MAP[language]["offer"]}
            </CustomButton>
          </div>
          <div
            className={cn(
              "absolute left-0 right-0 z-10",
              bodyClass == "flowers"
                ? "bottom-[-10%]"
                : bodyClass == "light"
                ? "bottom-[-15%] translate-x-[10px]"
                : "bottom-[-20%]"
            )}
          >
            <img src={`/img/${bodyClass}.png`} />
          </div>
        </div>
      )}
      <Toaster
        className={cn(language == "中文" ? "text-2xl font-normal" : "")}
      />
    </div>
  );
}

export default App;
