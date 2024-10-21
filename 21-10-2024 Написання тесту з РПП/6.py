import numpy as np
original_array=np.array([[10,4,1], [2,9,5], [1,2,17]])
resulting_array=[row[0]+row[-1]-row[1] for row in original_array]
print(resulting_array)