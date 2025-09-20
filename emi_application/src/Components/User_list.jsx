import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./User_list.css";

export const User_list = () => {
    const componentRef = useRef();
    const [data, setData] = useState([]);
    const [emiAmount, setEmiAmount] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:3000/users")
            .then((res) => {
                const emiData = res.data.data;
                setData(emiData);

                if (emiData.length > 0) {
                    const fixedEmi = res.data.emiAmount;
                    setEmiAmount(fixedEmi);

                    const months = emiData.length;
                    const principal = Number(fixedEmi) + Number(emiData[0].balanceAmount); 

                    const totalPay = fixedEmi * months;
                    const totalInt = totalPay - principal;

                    setTotalPayment(totalPay);
                    setTotalInterest(totalInt);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    // PDF download function
    const generatePDF = () => {
        if (!componentRef.current) return;

        html2canvas(componentRef.current, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "pt", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("EMI_Schedule.pdf");
        });
    };

    return (
        <div className="container ul-container my-5 shadow-lg rounded-3 p-5">
            <div className="d-flex justify-content-between align-items-center mb-4 px-3">
                <h2 className="fw-bold text-black d-flex align-items-center gap-2">
                    <i className="bi bi-journal-text"></i> EMI Schedule
                </h2>
                <button
                    className="btn btn-danger"
                    onClick={generatePDF}
                    disabled={data.length === 0}
                >
                    <i className="bi bi-file-earmark-pdf"></i> PDF
                </button>
            </div>

            <div ref={componentRef} className="p-3">
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <div className="card summary-card bg-lightblue text-center p-3">
                            <h6>Monthly EMI</h6>
                            <h4 className="fw-bold fs-3 text-primary">
                                ₹{emiAmount.toLocaleString("en-IN")}
                            </h4>            </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card summary-card bg-lightgreen text-center p-3">
                            <h6>Total Payment</h6>
                            <h4 className="fw-bold fs-3 text-success">₹{totalPayment.toLocaleString("en-IN")}</h4>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card summary-card bg-lightorange text-center p-3">
                            <h6>Total Interest</h6>
                            <h4 className="fw-bold fs-3 text-danger">₹{totalInterest.toLocaleString("en-IN")}</h4>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <table className="table table-hover mb-0 text-center">
                        <thead className="table-light">
                            <tr>
                                <th>Sr.</th>
                                <th>Date</th>
                                <th>EMI Amount</th>
                                <th>Balance Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row) => (
                                    <tr key={row.srNo}>
                                        <td>{row.srNo}</td>
                                        <td>{row.emi_date}</td>
                                        <td>₹{Number(row.emiAmount).toLocaleString("en-IN")}</td>
                                        <td>₹{Number(row.balanceAmount).toLocaleString("en-IN")}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-muted">
                                        No EMI Records Found
                                    </td>
                                </tr>
                            )}
                            {data.length > 0 && (

                                <tr className="table-primary fw-bold fs-6 mt-4">
                                    <td></td>
                                    <td className="text-center">Total</td>
                                    <td className="text-success">₹{totalPayment.toLocaleString("en-IN")}</td>
                                    <td className="text-danger">₹{totalInterest.toLocaleString("en-IN")}</td>
                                </tr>
                            )}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
