import { useState } from "react";
import { addTransaction } from "../services/api";

const TransactionForm = ({ refresh }) => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    division: "personal",
    date: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.category || !form.date) {
      alert("Please fill all fields");
      return;
    }

    await addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      type: "income",
      amount: "",
      category: "",
      division: "personal",
      date: "",
    });

    setOpen(false);
    refresh();
  };

  return (
    <>
      {/* ADD BUTTON */}
      <button
        onClick={() => setOpen(true)}
        style={{
          marginBottom: 20,
          background: "#6366f1",
          color: "white",
          padding: "8px 14px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ➕ Add Transaction
      </button>

      {/* MODAL */}
      {open && (
        <div style={overlay}>
          <div style={modal}>
            <h3 style={{ marginBottom: 10 }}>Add Transaction</h3>

            <form onSubmit={submit}>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                style={input}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                style={input}
              />

              <input
                name="category"
                placeholder="Category (food, fuel, etc)"
                value={form.category}
                onChange={handleChange}
                style={input}
              />

              <select
                name="division"
                value={form.division}
                onChange={handleChange}
                style={input}
              >
                <option value="personal">Personal</option>
                <option value="office">Office</option>
              </select>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                style={input}
              />

              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={btnCancel}
                >
                  Cancel
                </button>
                <button type="submit" style={btnSave}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

/* STYLES */
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  background: "#111",
  padding: 20,
  borderRadius: 6,
  width: 320,
  color: "white",
};

const input = {
  width: "100%",
  padding: 6,
  marginBottom: 8,
};

const btnCancel = {
  marginRight: 6,
  padding: "4px 10px",
};

const btnSave = {
  background: "#22c55e",
  padding: "4px 10px",
  border: "none",
  color: "white",
};

export default TransactionForm;
