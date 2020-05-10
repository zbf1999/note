def twoSum(nums,target):
    lens = len(nums)
    j = -1
    for i in range(1,lens):
        temp = nums[:1]
        if(target - nums[i]) in temp:
            j = temp.index(target - nums[i])
            break
    if j>=0:
        return [j,i]

nums = [2,7,15,17]
target = 9
print(twoSum(nums,target))