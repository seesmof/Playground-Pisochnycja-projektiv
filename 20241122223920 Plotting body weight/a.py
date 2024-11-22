import matplotlib.pyplot as plt

input_string='''
14-10-2024 59
15-10-2024 59
20-10-2024 60
21-10-2024 58.1
23-10-2024 58.3
27-10-2024 58.1
06-11-2024 60
07-11-2024 61.1
10-11-2024 62.8 
11-11-2024 64.3
12-11-2024 64.8~
14-11-2024 66.3
15-11-2024 68.2
16-11-2024 66.4
18-11-2024 64.8
19-11-2024 66.8
20-11-2024 65.5
21-11-2024 65.8
22-11-2024 68.0
'''.strip()

def parse_input(input_string):
    dates = []
    weights = []
    for line in input_string.splitlines():
        date, weight = line.split()
        dates.append(date.replace('-2024', ''))
        weights.append(float(weight.replace('~', '')))
    return dates, weights

dates, weights = parse_input(input_string)

plt.plot(dates, weights)
plt.title('Weight Over Time')
plt.xlabel('Date')
plt.ylabel('Weight')
plt.show()
