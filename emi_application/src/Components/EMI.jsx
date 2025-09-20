import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./EMI.css";

export const EMI = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [Message, setMessage] = useState("");

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/adduser", data)
      .then((res) => {
        setMessage(res.data);
        navigate("/user_list");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="px-4 pt-4  text-center ">
        <h1 className="display-6 fw-bold text-body-emphasis fs-2">
          Calculate Your Loan EMI
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Enter your loan details below to calculate your Equated Monthly
            Installment (EMI) and view a comprehensive payment schedule.
          </p>
        </div>
      </div>

      <div className="container mt-3 emi-form">
        <div className="card shadow p-4">
          <h2 className="text-left mb-4 fw-bold text-body-emphasis fs-3"> EMI Calculator </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="row mt-2">
            <div className="col-md-6 mb-3">
              <label className="form-label">Loan Amount</label>
              <input type="number" className={`form-control ${errors.Ammount ? "is-invalid" : ""}`} placeholder="Enter Loan Amount"
                {...register("Ammount", {
                  required: "Loan Amount is required",
                  min: { value: 1, message: "Amount must be greater than 0" },
                })} />
              {errors.Ammount && (
                <div className="invalid-feedback">
                  {errors.Ammount.message}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Rate of Interest (Annual %)</label>
              <input type="number" step="0.01" className={`form-control ${errors.AnnualInterest ? "is-invalid" : ""}`}
                placeholder="Enter Annual Interest" {...register("AnnualInterest", {
                  required: "Interest rate is required",
                  min: { value: 0.1, message: "Must be at least 0.1%" },
                  max: { value: 50, message: "Must be less than 50%" },
                })} />
              {errors.AnnualInterest && (
                <div className="invalid-feedback">
                  {errors.AnnualInterest.message}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Number of EMI (Months)</label>
              <input type="number" step="0.01" className={`form-control ${errors.MonthlyEMI ? "is-invalid" : ""}`} placeholder="Enter EMI Months"
                {...register("MonthlyEMI", {
                  required: "Number of EMIs is required",
                  min: { value: 1, message: "Must be at least 1 month" },
                  max: { value: 360, message: "Maximum 30 years (360 months)" },
                })}
              />
              {errors.MonthlyEMI && (
                <div className="invalid-feedback">
                  {errors.MonthlyEMI.message}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Starting Date of EMI</label>
              <input type="date" className={`form-control ${errors.EMIDate ? "is-invalid" : ""}`}
                {...register("EMIDate", {
                  required: "Start date is required",
                })}
                min={new Date().toISOString().split("T")[0]} />
              {errors.EMIDate && (
                <div className="invalid-feedback">{errors.EMIDate.message}</div>
              )}
            </div>

            <div className="col-12 mt-3">
              <button type="submit" className="site-btn btn btn-primary w-100 py-3 px-4 fw-semibold shadow-lg rounded-3 transition position-relative"> Calculate EMI & Save </button>
            </div>
          </form>

          {Message && (
            <p className="mt-3 text-success text-center fw-bold">{Message}</p>
          )}
        </div>
      </div>
    </>
  );
};
