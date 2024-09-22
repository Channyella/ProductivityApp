export function getTodaysDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // month is 0 indexed
    const day =  String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

export function getDateStringAsLocalDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1 /* month must be 0 indexed */, day);
}