Console.Write($"Please write the first number: ");
string? firstNumberInput = Console.ReadLine();

Console.Write($"Please enter the second number: ");
string? secondNumberInput = Console.ReadLine();

bool firstSuccess = int.TryParse(firstNumberInput, out int firstNumber);
bool secondSuccess = int.TryParse(secondNumberInput, out int secondNumber);

if (!firstSuccess || !secondSuccess)
{
  Console.WriteLine("ERROR: Some of the two numbers was not a real number. Please try again.");
}
else if (firstSuccess && secondSuccess)
{
  long sum = (long)firstNumber + (long)secondNumber;
  Console.WriteLine($"The sum of the two numbers is {sum}.");
}