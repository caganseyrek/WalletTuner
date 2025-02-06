class Formatter {
  public static formatCurrency(value: number): string {
    const formatted: string = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
    return formatted;
  }
}

export default Formatter;
