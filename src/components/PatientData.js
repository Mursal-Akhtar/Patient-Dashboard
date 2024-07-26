import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LoadData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tkn = localStorage.getItem("jwtToken");

  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    jwt_token: tkn,
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/form/getall",
        {
          headers,
        }
      );
      setData(response.data.forms);
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
                to={`/user/PatientData?patientId=${item._id}`}
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
    </div>
  );
}
