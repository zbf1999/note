class Solution(object):
    def singleNumber(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """

        aa = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        for i in nums:
            aa[i] = aa[i] + 1
        for j in aa:
            if j == 1 and j!=0:
                return aa.index(j)-12

bb = Solution()

cc = [-1]

dd = bb.singleNumber(cc)
print(dd)