int[] data = { 20, 90, 67, 3, 16, 23, 2 };
double mean = data.Average();
Console.WriteLine($"Array mean: {mean}");
Console.WriteLine($"Array length: {data.Length}");

var result = data.Where(number => number >= mean);
Console.WriteLine(string.Join(", ", result));