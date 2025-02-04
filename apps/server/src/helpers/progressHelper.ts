interface CalculateProgressParams {
  accountBalance: number;
  targetAmount: number;
}

class ProgressHelper {
  public static calculateProgress(params: CalculateProgressParams): number {
    return (100 * params.accountBalance) / params.targetAmount;
  }
}

export default ProgressHelper;
