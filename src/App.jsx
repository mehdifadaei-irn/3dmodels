import { useState } from "react";
import "./App.css";
import { Button, Spinner, Input } from "@nextui-org/react";
import { StlViewer } from "react-stl-viewer";
import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import * as yup from "yup";
import { useFormik } from "formik";
import { inputNames } from "./configs/site";
//number().positive().integer().required()

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

  const { mutate } = useMutation({
    mutationFn: async (values) => {
      try {
        const response = await fetch("http://16.16.183.78/new-stator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.blob();

        const stlURL = URL.createObjectURL(data);

        setStdlUrl(stlURL);
        // Log the raw response content
        console.log("Raw response content:", data);

        return data;
      } catch (error) {
        // Handle any errors here
        console.error(error);
        throw new Error("Something went wrong");
      }
    },
    onSuccess: (data) => {
      toast("hray");
      console.log(data, "daaaaaaaaaaaaaaaaaaaa2");
    },
  });

  const formik = useFormik({
    initialValues: {
      out_dia: "",
      bore_dia: "",
      stack_height: "",
      slot_depth: "",
      slot_width: "",
      slot_opening: "",
      tooth_depth: "",
      tooth_tipe_angle: "",
      number_of_slots: "",
      sfr1: "",
      sfr2: "",
      sfr3: "",
      sfr4: "",
    },
    validationSchema: yup.object({
      out_dia: yup.number().required(),
      bore_dia: yup.number().required(),
      stack_height: yup.number().required(),
      slot_depth: yup.number().required(),
      slot_width: yup.number().required(),
      slot_opening: yup.number().required(),
      tooth_depth: yup.number().required(),
      tooth_tipe_angle: yup.number().required(),
      number_of_slots: yup.number().required(),
      sfr1: yup.number().required(),
      sfr2: yup.number().required(),
      sfr3: yup.number().required(),
      sfr4: yup.number().required(),
    }),
    onSubmit: (values) => {
      toast("submited");
      // console.log(values);
      mutate(values);
    },
  });

  function logg() {}

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
      <div className="xl:w-[27%] w-1/3 justify-between pr-5 border-r-2 border-black items-center h-screen py-5 flex flex-row  ">
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
        {/* INputs */}
        <div>
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-2 gap-x-6  gap-y-3 h-[60%]"
          >
            {inputNames.map((item, i) => (
              <div key={i}>
                <Input
                  type="text"
                  color={"success"}
                  label={item}
                  name={item}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[item]}
                  // placeholder={item}
                  // defaultValue="junior@nextui.org"
                  // className="max-w-[220px]"
                />
                {formik.touched[item] && formik.errors[item] ? (
                  <span className="text-red-600 text-sm font-noraml">
                    {formik.errors[item]}
                  </span>
                ) : null}
              </div>
            ))}
            <Button type="submit" color="success">
              Success
            </Button>
          </form>
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

// fetch('http://16.16.183.78/new-stator', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     out_dia: 265,
//     bore_dia: 192,
//     stack_height: 300,
//     slot_depth: 18.15,
//     slot_width: 3.6,
//     slot_opening: 1.5,
//     tooth_depth: 0.78,
//     tooth_tipe_angle: 36.83,
//     number_of_slots: 6,
//     sfr1: 0.6,
//     sfr2: 0.5,
//     sfr3: 0.5,
//     sfr4: 0.2
//   })
// })
//   .then(response => response.blob())
//   .then(blob => {
//     // Create a URL for the blob data
//     const url = URL.createObjectURL(blob);

//     // Create a link element
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'stl_file.stl';

//     // Add the link element to the document body
//     document.body.appendChild(link);

//     // Programmatically click the link to trigger the download
//     link.click();

//     // Remove the link element
//     document.body.removeChild(link);

//     // Revoke the URL
//     URL.revokeObjectURL(url);
//   })
//   .catch(error => {
//     // Handle any errors here
//     console.error(error);
//   });
