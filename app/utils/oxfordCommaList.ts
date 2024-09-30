export function oxfordCommaList(items: string[]): string {
    const length = items.length;

    if (length === 0) {
        return "unknown";
    } else if (length === 1) {
        return items[0];
    } else if (length === 2) {
        return `${items[0]} and ${items[1]}`;
    } else {
        const lastItem = items[length - 1];
        const otherItems = items.slice(0, length - 1).join(", ");
        return `${otherItems}, and ${lastItem}`;
    }
}
