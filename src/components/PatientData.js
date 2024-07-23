import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LoadData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/getall"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setData(data.forms);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  return (
    <div className="mb-1 d-flex">
      <div className="me-2 col-9">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div class="list-group container w-50">
            {data.map((item, index) => (
              <Link
                className="list-group-item list-group-item-action m-2 rounded-2"
                aria-current="true"
                key={item.id}
                to={`/PatientData?patientId=${item._id}`}
              >
                <div key={index}>
                  <div className=" w-100 justify-content-between mb-3 pb-2">
                    <h3 className="mb-1">
                      {item.firstName} {item.lastName}
                    </h3>
                    <h5>{item.email}</h5>
                    <p className="mb-1">Gender: {item.gender}</p>
                    <small>Date Of Birth: {item.bday}</small>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* <div className="ms-1 col-3 ">
        <Link to={"/AddPatient"}>
          <div
            className="btn btn-primary mb-3 mt-5 align-self-center text-uppercase text-center d-flex justify-content-center align-items-center"
            style={{ width: 150, height: 50 }}
          >
            + add Patient
          </div>
        </Link>
      </div> */}
    </div>
  );
}
