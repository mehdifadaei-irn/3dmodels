import { useState } from "react";
import "./App.css";
import { Button, Spinner } from "@nextui-org/react";
import { StlViewer } from "react-stl-viewer";
import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

const url = "http://localhost:5000/large";
const url1 =
  "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl";
//bg-[#151b2b]
function App() {
  const [status, setStatus] = useState(""); // "" | "1" | "2" | "3" | "4"
  const [stdlUrl, setStdlUrl] = useState("http://localhost:5000/first");
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["start"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:5000/start");

      return data;
    },
  });

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
      <button onClick={logg}>logg</button>
      {/* Side Bar */}
      <div className="w-[17%] justify-center border-r-2 border-black h-screen py-5 px-2 flex flex-col ">
        <div className="flex items-center justify-center flex-col 2xl:gap-y-16 xl:gap-y-14 md:gap-10 gap-7">
          <Button
            color="warning"
            variant="shadow"
            className="w-[35%] text-white text-lg font-semibold"
            onClick={() => {
              setStdlUrlf("1");
            }}
          >
            First
          </Button>
          <Button
            color="success"
            variant="shadow"
            className="w-[35%] text-white text-lg font-semibold"
          >
            Seconed
          </Button>
          <Button
            color="secondary"
            variant="shadow"
            className="w-[35%] text-lg font-semibold"
          >
            Mesh
          </Button>
          <Button
            color="danger"
            variant="shadow"
            className="w-[35%] text-lg font-semibold"
            onClick={() => {
              setStdlUrlf("4");
            }}
          >
            Large
          </Button>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 flex">
        {/* <p>{stdlUrl}</p> */}
        {status == 1 ? (
          <StlViewer
            style={{
              top: 0,
              left: 0,
              width: "83vw",
              height: "100vh",
            }}
            orbitControls
            shadows
            canvasId={stdlUrl}
            url={stdlUrl}
          />
        ) : (
          <StlViewer
            style={{
              top: 0,
              left: 0,
              width: "83vw",
              height: "100vh",
            }}
            orbitControls
            shadows
            url={stdlUrl}
          />
        )}
      </div>
    </div>
  );
}

export default App;