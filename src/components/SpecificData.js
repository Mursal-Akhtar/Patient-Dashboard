import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SpecificData() {
  let [searchParams] = useSearchParams();
  const [d, setData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    bday: "",
    language: "",
    hft: 0,
    hinch: 0,
    weight: 0,
    smoking: "",
    surgeries: "",
    medication: "",
    occupation: "",
    hobbies: "",
    email: "",
    telno: 0,
  });
  const patientId = searchParams.get("patientId");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/form/getone/${patientId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const de = await response.json();
      for (const key in de.forms) {
        if (key in d) {
          // Corrected condition
          setData((prevData) => ({
            ...prevData,
            [key]: de.forms[key],
          }));
        }
      }
      console.log(d);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  const handleChange = (event) => {
    // console.log(event.target, "===");
    const { value, id } = event.target;
    setData({
      ...d,
      [id]: value,
    });
  };
  const tkn = localStorage.getItem("jwtToken");

  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    jwt_token: tkn,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/form/update/${patientId}`,
        d,
        {
          headers: headers,
        }
      );

      if (res.status === 200) {
        navigate("/user");
      } else if (res.status >= 400 || res.status < 500) {
        alert("There seems to be an error please try again");
      } else {
        alert("Loading");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container justify-content-start mt-5 d-flex flex-column">
          <div className="col-12 d-flex border-top" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">First Name:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                required="True"
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder="First Name"
                name="firstName"
                id="firstName"
                value={d.firstName}
              />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Last Name:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                required="True"
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder="Last Name"
                name="lastName"
                id="lastName"
                value={d.lastName}
              />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Gender:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <select
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                id="gender"
                onChange={(e) => handleChange(e)}
                value={d.gender}
              >
                <option value={0}>Choose Gender</option>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Prefer not to say"}>Prefer not to say</option>
              </select>
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Birthday:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="date"
                required="True"
                className="ms-3 w-25 h-75 rounded-3 border-1 ps-3 form-control"
                id="bday"
                value={d.bday}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Language:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-center align-items-center p-2 ps-4">
              <select
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                id="language"
                value={d.language}
                onChange={(e) => handleChange(e)}
              >
                <option value={0}></option>
                <option>English</option>
                <option>Dutch</option>
                <option>French</option>
              </select>
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Height:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center ps-5 pt-2 pb-2">
              <div
                className="border h-75  d-flex align-items-center border-3 rounded-3 me-3"
                style={{ width: 100 }}
              >
                <input
                  type="number"
                  min={0}
                  max={10}
                  className="border-0 ps-2 h-100 me-1 form-control"
                  style={{ width: 78 }}
                  id="hft"
                  value={d.hft}
                  onChange={(e) => handleChange(e)}
                ></input>
                <span className="h5 m-0 pe-2">ft</span>
              </div>
              <div
                className="border h-75  d-flex align-items-center border-3 rounded-3"
                style={{ width: 100 }}
              >
                <input
                  type="number"
                  min={0}
                  max={11}
                  className="border-0 ps-2 h-100 me-1 form-control"
                  style={{ width: 78 }}
                  id="hinch"
                  value={d.hinch}
                  onChange={(e) => handleChange(e)}
                ></input>
                <span className="h5 m-0 pe-2">in</span>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Weight:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="number"
                min={0}
                className="ms-3 w-25 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder="Weight"
                id="weight"
                value={d.weight}
                onChange={(e) => handleChange(e)}
              />
              <span className="h5 m-0 pe-2 ms-2">lbs</span>
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Smoking #:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <select
                className="ms-3 w-25 h-75 rounded-3 border-1 ps-3 form-control"
                id="smoking"
                value={d.smoking}
                onChange={(e) => handleChange(e)}
              >
                <option value={0}></option>
                <option value={1}>Yes</option>
                <option value={2}>No</option>
                <option value={3}>Used to</option>
              </select>
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Surgeries #:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="text"
                required="True"
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder="Disclose any major surgeries before"
                id="surgeries"
                value={d.surgeries}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Medication #:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="text"
                required="True"
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder="Any long term medications?"
                id="medication"
                value={d.medication}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Occupation #:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="text"
                required="True"
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder="Occupation #"
                id="occupation"
                value={d.occupation}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Hobbies #:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="text"
                required="True"
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder="Hobbies #"
                id="hobbies"
                value={d.hobbies}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-12 d-flex" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Email #:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="email"
                required="True"
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder="Email #"
                id="email"
                value={d.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="col-12 d-flex border-bottom" style={{ height: 50 }}>
            <div className="col-2 h-100 d-flex justify-content-center align-items-center border-end">
              <h4 className="text-center m-0">Cell Phone #:</h4>
            </div>
            <div className="col-10 h-100 d-flex justify-content-start align-items-center p-2 ps-4">
              <input
                type="tel"
                required="True"
                className="ms-3 w-100 h-75 rounded-3 border-1 ps-3 form-control"
                placeholder=""
                id="telno"
                value={d.telno}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-3 ms-5 mt-4 align-self-center"
            style={{ width: 100 }}
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
