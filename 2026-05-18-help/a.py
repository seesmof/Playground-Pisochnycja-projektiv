OldValue = 86
OldMin = 0
OldMax = 100
NewMin = 0
NewMax = 5

NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin
print(NewValue)
