import "./App.css";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomButton from "./components/CustomButton";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "./lib/utils";

function App() {
  const { toast } = useToast();
  let [name, setName] = useState<string>("");
  let [bodyClass, setBodyClass] = useState<string>("title_page");
  let [language, setLanguage] = useState<"EN" | "中文">("EN");

  let LANGUAGE_MAP = {
    EN: {
      header: <span>Choose Your Offering</span>,
      input: "Enter Your Name",
      flower: <span>Flowers</span>,
      gold: <span>Gold Ingots</span>,
      light: <span>Candles</span>,
      warning: <span>Please enter name before choosing offering</span>,
    },
    中文: {
      header: <div className="text-[2.6rem] font-bold mt-8">选择您的贡品</div>,
      input: "输入您的名字",
      flower: <span>鲜花</span>,
      gold: <span>金宝</span>,
      light: <span>蜡烛</span>,
      warning: <span>Please enter name before choosing offering</span>,
    },
  };

  function changeState(state: string) {
    if (name.trim().length == 0) {
      return toast({
        title: "Please enter name before choosing offering",
        variant: "destructive",
        duration: 1000,
      });
    }
    setBodyClass(state);
    console.log(name);
  }

  return (
    <div className={cn(bodyClass, "relative", language)}>
      <div className="absolute top-2 right-2">
        <Button
          variant={"outline"}
          onClick={() =>
            setLanguage((prevState) => (prevState == "EN" ? "中文" : "EN"))
          }
          className={cn(language == "EN" ? "中文" : "EN")}
        >
          {language == "EN" ? <span>中文</span> : "EN"}
        </Button>
      </div>
      <div className="flex flex-col min-h-[100dvh] h-full items-center gap-5 mx-auto w-[250px] pt-20">
        <h1 className="text-4xl textOutline textShadow text-[#5e2222] text-center">
          {LANGUAGE_MAP[language]["header"]}
        </h1>
        <Input
          onInput={(e) => {
            setName((e.target as HTMLInputElement).value);
          }}
          type="text"
          id="name"
          placeholder={LANGUAGE_MAP[language]["input"]}
          className={cn(
            "text-center my-6 rounded-none border-4 border-white text-white placeholder:text-white bg-[#374f66] flex h-full w-full px-1 py-3 text-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            language == "中文" ? "text-2xl" : ""
          )}
        />
        <CustomButton
          className={cn(language == "中文" ? "font-semibold" : "", "text-2xl")}
          clickHandler={() => {
            changeState("flowers");
          }}
        >
          {LANGUAGE_MAP[language]["flower"]}
        </CustomButton>
        <CustomButton
          className={cn(language == "中文" ? "font-semibold" : "", "text-2xl")}
          clickHandler={() => {
            changeState("gold");
          }}
        >
          {LANGUAGE_MAP[language]["gold"]}
        </CustomButton>
        <CustomButton
          className={cn(language == "中文" ? "font-semibold" : "", "text-2xl")}
          clickHandler={() => {
            changeState("light");
          }}
        >
          {LANGUAGE_MAP[language]["light"]}
        </CustomButton>
      </div>
    </div>
  );
}

export default App;
