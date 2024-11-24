export const totalAmount = (data) => {
    const totalAmount = data.reduce((total: number, user: any) => total + user.amount, 0);
    return totalAmount;
}

export const ownAmount = (transactions) => {
  let totalAmount = 0;

  // Ensure we handle both single transaction (object) and array of transactions
  const transactionArray = Array.isArray(transactions) ? transactions : [transactions];

  transactionArray.forEach((transaction) => {
    if (transaction?.paidBy === "you") {
      const otherUsersAmount = transaction.paidTo
        .filter((payee) => payee.name !== "you")
        .reduce((sum, payee) => sum + payee.amount, 0);

      totalAmount += otherUsersAmount;
    } else {
      // Subtract the amount where "you" is in paidTo
      const youEntry = transaction.paidTo.find((payee) => payee.name === "you");
      if (youEntry) {
        totalAmount -= youEntry.amount;
      }
    }
  });

  return totalAmount;
}