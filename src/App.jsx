import { useState } from "react";
import "./App.css";
import { Button, Spinner } from "@nextui-org/react";
import { StlViewer } from "react-stl-viewer";
// import { StlViewer } from "react-stl-file-viewer";
import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const url = "http://localhost:5000/large";
const url1 =
  "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl";
//bg-[#151b2b]
function App() {
  const [dis, setDis] = useState(true);
  const [status, setStatus] = useState("1"); // "" | "1" | "2" | "3" | "4"
  const [stdlUrl, setStdlUrl] = useState("http://localhost:5000/first");
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["start"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/start");

      return data;
    },
  });
  const [volume, setvolume] = useState(0);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function setStdlUrlf(witch) {
    if (witch === "1") {
      setStatus("1");
      setStdlUrl("http://localhost:5000/first");
    } else if (witch === "2") {
      setStatus("2");
      setStdlUrl("http://localhost:5000/second");
    } else if (witch === "3") {
      setStatus("3");
      setStdlUrl("http://localhost:5000/third");
    } else {
      setStatus("4");
      setStdlUrl("http://localhost:5000/large");
    }
  }
  useEffect(() => {
    if (!dis) {
      setDis(true);
    }
  }, [status]);

  function logg() {
    console.log(stdlUrl);
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-row gap-x-3">
          <h1 className="underline font-bold text-xl ">Waiting...</h1>
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex ">
      {/* <button onClick={logg}>logg</button> */}
      {/* Side Bar */}
      <div className="w-[17%] justify-center border-r-2 border-black h-screen py-5 px-2 flex flex-col ">
        <div className="flex items-center justify-center flex-col 2xl:gap-y-16 xl:gap-y-14 md:gap-10 gap-7">
          <Button
            color="warning"
            variant="shadow"
            className="w-[35%] text-white text-lg font-semibold"
            onClick={() => {
              if (status !== "1") {
                setStdlUrlf("1");
              } else {
                toast.error("you courently seeing first file");
              }
            }}
          >
            First
          </Button>
          <Button
            color="success"
            variant="shadow"
            className="w-[35%] text-white text-lg font-semibold"
            onClick={() => {
              if (status !== "2") {
                setStdlUrlf("2");
              } else {
                toast.error("you courently seeing second file");
              }
            }}
          >
            Seconed
          </Button>
          <Button
            color="secondary"
            variant="shadow"
            className="w-[35%] text-lg font-semibold"
            onClick={() => {
              if (status !== "3") {
                setStdlUrlf("3");
              } else {
                toast.error("you courently seeing mesh file");
              }
            }}
          >
            Mesh
          </Button>
          <Button
            color="danger"
            variant="shadow"
            className="w-[35%] text-lg font-semibold"
            onClick={() => {
              if (status !== "4") {
                setStdlUrlf("4");
              } else {
                toast.error("you courently seeing Large file");
              }
            }}
          >
            Large
          </Button>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 flex relative flex-col items-center">
        <div className="w-full flex justify-center">
          <p
            className="font-bold text-2xl mt-5 text-slate-800 z-30"
            onClick={() => {
              console.log(dis);
              setDis((prev) => !prev);
            }}
          >
            {status == "1"
              ? "First"
              : status == "2"
              ? "second"
              : status == "3"
              ? "mesh"
              : "Large"}{" "}
            file
          </p>
        </div>
        {/* <div>
          <StlViewer
            width={900}
            height={700}
            url={stdlUrl}
            // url={file}
            groundColor="rgb(255, 255, 255)"
            objectColor="rgb(137, 137, 137)"
            skyboxColor="rgb(255, 255, 255)"
            gridLineColor="rgb(0, 0, 0)"
            lightColor="rgb(255, 255, 255)"
            volume={setvolume}
          />
          {`Volume: ${volume}`}
        </div> */}
        <div className="w-[60%] flex items-center justify-center  relative h-screen">
          {/* Wrapper */}
          <div
            className="w-[50rem] h-[20rem]  absolute z-20"
            style={{
              display: !dis ? "none" : "block",
            }}
          >
            <div className="flex flex-row gap-x-3 justify-center items-center">
              <h1 className="underline font-bold text-xl ">Waiting...</h1>
              <Spinner />
            </div>
          </div>
          <StlViewer
            style={{
              top: 0,
              left: 0,
              width: "60vw",
              height: "90vh",
              right: 0,
              bottom: 0,
              opacity: !dis ? "1" : "0",
            }}
            orbitControls
            shadows
            canvasId={stdlUrl}
            url={stdlUrl}
            onFinishLoading={async () => {
              toast.success("lodede");
              console.log("eee");
              await delay(1000);
              setDis(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
