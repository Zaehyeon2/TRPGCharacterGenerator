export function isNumber(value: string) {
    const numberedValue = Number(value);
    return !Number.isNaN(numberedValue) || numberedValue >= 0;
}