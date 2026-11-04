int[] data = { 20, 90, 67, 3, 16, 23, 2 };
Console.WriteLine($"Original: {string.Join(", ", data)}");
double mean = data.Average();
Console.WriteLine($"Array mean: {mean}");
Console.WriteLine($"Array length: {data.Length}");

var moreThanMean = data.Where(number => number >= mean);
Console.WriteLine($"More than mean: {string.Join(", ", moreThanMean)}");

var doubledArray = data.Select(n => n * 2);
Console.WriteLine($"Doubled: {string.Join(", ", doubledArray)}");