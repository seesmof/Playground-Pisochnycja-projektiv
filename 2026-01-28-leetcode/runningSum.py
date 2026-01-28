from typing import List


def runningSum(nums: List[int]) -> List[int]:
    result: list[int] = list()
    previous_sum: int = 0
    for i, num in enumerate(nums):
        previous_elements = nums[:i]
        previous_sum = sum(previous_elements)
        result.append(num + previous_sum)
    return result


def test():
    assert runningSum([1, 2, 3, 4]) == [1, 3, 6, 10]
    assert runningSum([1, 1, 1, 1, 1]) == [1, 2, 3, 4, 5]
    assert runningSum([3, 1, 2, 10, 1]) == [3, 4, 6, 16, 17]
    print("All tests passed!")


test()
