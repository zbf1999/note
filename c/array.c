#include <stdio.h>
int main()
{
    int score [3][50];
    int count = 0;
    double ave [3] = {0},sum[3] = {0};
    int i,j;
    scanf("%d",&count);
    for ( i = 0; i < 3; i++)
    {
        for(j = 0;j <count;j++){
            scanf("%d",&score[i][j]);
            sum[i]+=score[i][j];
        }
        ave[i] = sum[i]/count;
    }
    printf("三门课的平均成绩分别为");
    for(i = 0;i<2;i++){
        printf("%6.2lf",ave[i]);
    }
    printf("\n");
    
}