import { useState } from "react";
import { updateTransaction } from "../services/api";

const EditTransactionModal = ({ tx, onClose, refresh }) => {
  const [form, setForm] = useState({
    amount: tx.amount,
    category: tx.category,
    date: tx.date.slice(0, 10),
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    await updateTransaction(tx._id, {
      ...form,
      amount: Number(form.amount),
    });
    refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* MODAL CARD */}
      <div className="glass w-[380px] p-6 relative">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold">
              ✏️ Edit Transaction
            </h2>
            <p className="text-xs opacity-70">
              Update amount, category or date
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-lg opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-4">

          {/* AMOUNT */}
          <div className="relative">
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="peer w-full bg-transparent border border-white/20 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-indigo-400"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-xs opacity-70 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs transition-all">
              Amount
            </label>
          </div>

          {/* CATEGORY */}
          <div className="relative">
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="peer w-full bg-transparent border border-white/20 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:border-indigo-400"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-xs opacity-70 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs transition-all">
              Category
            </label>
          </div>

          {/* DATE */}
          <div className="relative">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full bg-transparent border border-white/20 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-400"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-600/70 hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
