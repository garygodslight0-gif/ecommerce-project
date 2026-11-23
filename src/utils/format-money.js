export function formatMoney(amount) {
    if (amount > -1) {
        return `$${(amount / 100).toFixed(2)}`;
    } else {
        return `-$${(Math.abs(amount) / 100).toFixed(2)}`;
    }
}