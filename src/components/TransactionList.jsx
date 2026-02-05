import { useState } from "react";
import { deleteTransaction, updateTransaction } from "../services/api";

const TWELVE_HOURS = 12 * 60 * 60 * 1000;

const TransactionList = ({ transactions, refresh }) => {
  const [editTx, setEditTx] = useState(null);
  const [form, setForm] = useState({});

  if (!transactions || transactions.length === 0) {
    return <p style={{ color: "#ccc" }}>No transactions</p>;
  }

  const canEdit = (createdAt) => {
    const now = Date.now();
    const createdTime = new Date(createdAt).getTime();
    return now - createdTime <= TWELVE_HOURS;
  };

  const openEdit = (tx) => {
    setEditTx(tx);
    setForm({
      type: tx.type,
      division: tx.division,
      amount: tx.amount,
      category: tx.category,
      date: tx.date.slice(0, 10),
    });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const update = async () => {
    await updateTransaction(editTx._id, {
      ...form,
      amount: Number(form.amount),
      date: new Date(form.date).toISOString(),
    });

    setEditTx(null);
    refresh();
  };

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <h2 style={{ color: "white", marginBottom: 10 }}>
          Transactions
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            color: "white",
          }}
        >
          <thead>
            <tr>
              {[
                "Date",
                "Type",
                "Category",
                "Division",
                "Amount",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    border: "1px solid #888",
                    padding: "8px",
                    textAlign: h === "Amount" ? "right" : "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => {
              const editable = canEdit(t.createdAt);

              return (
                <tr key={t._id}>
                  <td style={cell}>
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td style={cell}>{t.type}</td>
                  <td style={cell}>{t.category}</td>
                  <td style={cell}>{t.division}</td>
                  <td style={{ ...cell, textAlign: "right" }}>
                    ₹ {t.amount}
                  </td>
                  <td style={cell}>
                    <button
                      style={{
                        ...btnEdit,
                        opacity: editable ? 1 : 0.4,
                        cursor: editable ? "pointer" : "not-allowed",
                      }}
                      disabled={!editable}
                      onClick={() => openEdit(t)}
                      title={
                        editable
                          ? "Edit Transaction"
                          : "Edit disabled after 12 hours"
                      }
                    >
                      Edit
                    </button>

                    <button
                      style={btnDelete}
                      onClick={async () => {
                        await deleteTransaction(t._id);
                        refresh();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editTx && (
        <div style={overlay}>
          <div style={modal}>
            <h3>Edit Transaction</h3>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Amount"
              style={input}
            />

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              style={input}
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={input}
            />

            <div style={{ textAlign: "right" }}>
              <button
                style={btnCancel}
                onClick={() => setEditTx(null)}
              >
                Cancel
              </button>
              <button style={btnSave} onClick={update}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* STYLES */
const cell = { border: "1px solid #888", padding: "8px" };

const btnEdit = {
  marginRight: 6,
  background: "#facc15",
  border: "none",
  padding: "4px 8px",
};

const btnDelete = {
  background: "#ef4444",
  border: "none",
  padding: "4px 8px",
  color: "white",
};

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
  width: 300,
};

const input = {
  width: "100%",
  padding: 6,
  marginBottom: 8,
};

const btnCancel = {
  marginRight: 6,
  padding: "4px 8px",
};

const btnSave = {
  background: "#22c55e",
  padding: "4px 8px",
  border: "none",
};

export default TransactionList;
