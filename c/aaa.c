#include <stdio.h>
int main(){
    int stu[3][50],n,i,j;
    float avg[3] = {0,0,0};

    printf("请输入学生人数：");
    scanf("%d",&n);

    for ( i = 0; i < 3; i++)
    {
        for(j = 0;j<n;j++){
            printf("请输入学生：");
            scanf("%d",&stu[i][j]);
            avg[i] = avg[i] + stu[i][j];
        }
        avg[i] = avg[i]/n;
    }
    printf("a%f,b%f,c%f",avg[0],avg[1],avg[2]);
    return 0;
}