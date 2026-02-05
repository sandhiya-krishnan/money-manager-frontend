import { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";

import Summary from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Dashboard = ({ theme, toggleTheme }) => {
  const [transactions, setTransactions] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const loadData = async () => {
    const res = await fetchTransactions();
    setTransactions(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const txDate = new Date(t.date);
    const now = new Date();

    const fromOk = fromDate ? txDate >= new Date(fromDate) : true;
    const toOk = toDate ? txDate <= new Date(toDate) : true;
    const categoryOk =
      categoryFilter === "all" ? true : t.category === categoryFilter;

    let timeOk = true;
    if (timeFilter === "weekly") {
      const lastWeek = new Date();
      lastWeek.setDate(now.getDate() - 7);
      timeOk = txDate >= lastWeek;
    }
    if (timeFilter === "monthly") {
      timeOk =
        txDate.getMonth() === now.getMonth() &&
        txDate.getFullYear() === now.getFullYear();
    }
    if (timeFilter === "yearly") {
      timeOk = txDate.getFullYear() === now.getFullYear();
    }

    return fromOk && toOk && categoryFilter && timeOk;
  });

  const summary = filteredTransactions.reduce(
    (acc, t) => {
      t.type === "income"
        ? (acc.totalIncome += t.amount)
        : (acc.totalExpense += t.amount);
      acc.balance = acc.totalIncome - acc.totalExpense;
      return acc;
    },
    { totalIncome: 0, totalExpense: 0, balance: 0 }
  );

  return (
    <div className="min-h-screen px-6 pb-20">
      {/* ===== HERO HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            💰 Money Manager
          </h1>
          <p className="text-sm opacity-70 mt-1">
            Track income, expenses & balance smartly
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="glass px-5 py-2 text-sm font-semibold self-start md:self-auto"
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* ===== SUMMARY ===== */}
      <Summary summary={summary} />

      {/* ===== ADD TRANSACTION ===== */}
      <div className="mb-8">
        <TransactionForm refresh={loadData} />
      </div>

      {/* ===== FILTER BAR ===== */}
      <div className="glass p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="food">Food</option>
            <option value="fuel">Fuel</option>
            <option value="medical">Medical</option>
            <option value="travel">Travel</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
              setCategoryFilter("all");
              setTimeFilter("all");
            }}
            className="col-span-1 sm:col-span-2 lg:col-span-1 bg-slate-600/80 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* ===== TRANSACTIONS TABLE ===== */}
      <div className="glass p-4">
        <TransactionList
          transactions={filteredTransactions}
          refresh={loadData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
