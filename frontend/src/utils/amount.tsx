export const totalAmount = (data) => {
    const totalAmount = data.reduce((total: number, user: any) => total + user.amount, 0);
    return totalAmount;
}