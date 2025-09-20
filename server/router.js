
const express = require("express");
const sqlDbconnect = require("./dbconnect");
const Router = express.Router();

Router.post("/adduser", (req, res) => {
  const { Ammount, AnnualInterest, MonthlyEMI, EMIDate } = req.body;

  if (!Ammount || !AnnualInterest || !MonthlyEMI || !EMIDate) {
    return res.status(400).send("All fields are required");
  }

  let principal = parseFloat(Ammount);
  let annualRate = parseFloat(AnnualInterest);
  let months = parseInt(MonthlyEMI);
  let startDate = new Date(EMIDate);

  let rate = annualRate / 12 / 100;

  let emiAmount =
    (principal * rate * Math.pow(1 + rate, months)) /
    (Math.pow(1 + rate, months) - 1);
  emiAmount = Math.round(emiAmount);

  let balance = principal;

  sqlDbconnect.query("DELETE FROM emi_schedule", (err) => {
    if (err) console.error(err);
  });

  for (let i = 1; i <= months; i++) {
    let interest = balance * rate;
    let principalPaid = emiAmount - interest;
    balance -= principalPaid;

    interest = Math.round(interest);
    principalPaid = Math.round(principalPaid);
    balance = Math.round(balance < 0 ? 0 : balance);

    let emiDate = new Date(startDate);
    emiDate.setMonth(startDate.getMonth() + (i - 1));

    sqlDbconnect.query(
      "INSERT INTO emi_schedule (srNo, emi_date, emiAmount, balanceAmount) VALUES (?, ?, ?, ?)",
      [i, emiDate, emiAmount, balance],
      (err) => {
        if (err) console.error(err);
      }
    );
  }

  res.send("EMI Schedule Saved Successfully!");
});

Router.get("/users", (req, res) => {
  sqlDbconnect.query(
    "SELECT srNo, DATE_FORMAT(emi_date,'%d-%m-%Y') as emi_date, emiAmount, balanceAmount FROM emi_schedule ORDER BY srNo ASC",
    (err, result) => {
      if (err) return res.status(500).send(err);
res.json({
  data: result,     
    emiAmount: result.length > 0 ? result[0].emiAmount : 0

});
    }
  );
});

module.exports = Router;
