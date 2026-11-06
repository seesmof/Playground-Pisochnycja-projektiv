public class Expense
{
  public required string Name { get; set; }
  public required long Amount { get; set; }
  public required ExpenseCategory ExpenseCategory { get; set; }
}