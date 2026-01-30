from typing import List, Optional


def maxAscendingSum(nums: List[int]) -> int:
    max_sum: int = 0
    current_sum: int = 0

    for i, current_element in enumerate(nums):
        previous_element = nums[i - 1] if i > 0 else 0

        if previous_element < current_element:
            current_sum += current_element
        else:
            current_sum = current_element

        max_sum = current_sum if current_sum > max_sum else max_sum

    return max_sum


def test():
    assert maxAscendingSum([10, 20, 30, 5, 10, 50]) == 65
    assert maxAscendingSum([10, 20, 30, 40, 50]) == 150
    assert maxAscendingSum([12, 17, 15, 13, 10, 11, 12]) == 33
    print("All tests passed!")


test()
