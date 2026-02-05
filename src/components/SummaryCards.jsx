const Summary = ({ summary }) => {
  const { totalIncome, totalExpense, balance } = summary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

      {/* INCOME */}
      <div className="glass p-6 relative overflow-hidden hover:-translate-y-1 transition">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent pointer-events-none" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70">Income</p>
            <p className="text-3xl font-bold text-green-400 mt-1">
              ₹ {totalIncome}
            </p>
          </div>
          <div className="text-3xl">💰</div>
        </div>
        <p className="text-xs opacity-60 mt-3">
          Total earnings received
        </p>
      </div>

      {/* EXPENSE */}
      <div className="glass p-6 relative overflow-hidden hover:-translate-y-1 transition">
        <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent pointer-events-none" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70">Expense</p>
            <p className="text-3xl font-bold text-red-400 mt-1">
              ₹ {totalExpense}
            </p>
          </div>
          <div className="text-3xl">💸</div>
        </div>
        <p className="text-xs opacity-60 mt-3">
          Total money spent
        </p>
      </div>

      {/* BALANCE */}
      <div className="glass p-6 relative overflow-hidden hover:-translate-y-1 transition">
        <div
          className={`absolute inset-0 pointer-events-none ${
            balance >= 0
              ? "bg-gradient-to-br from-emerald-400/20 to-transparent"
              : "bg-gradient-to-br from-rose-400/20 to-transparent"
          }`}
        />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-70">Balance</p>
            <p
              className={`text-3xl font-bold mt-1 ${
                balance >= 0
                  ? "text-emerald-400"
                  : "text-rose-400"
              }`}
            >
              ₹ {balance}
            </p>
          </div>
          <div className="text-3xl">
            {balance >= 0 ? "📈" : "📉"}
          </div>
        </div>
        <p className="text-xs opacity-60 mt-3">
          {balance >= 0
            ? "You are saving well"
            : "Spending exceeds income"}
        </p>
      </div>

    </div>
  );
};

export default Summary;
