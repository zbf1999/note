#include <stdio.h>
#include <malloc.h>
#include <string.h>
#include <stdlib.h>
#include <windows.h>
#include <conio.h>
#define MaxSize 50

typedef struct{
    char name[20];
    char tel[15];
}ZhaoWang;

typedef struct{
    ZhaoWang data[MaxSize];
    int changdu;
}List;

void chulist(List *&L){
    L=(List *)malloc(sizeof(List));
    L->length = 0;
}

void shuchu(List *L)
{
    int i;
    printf("    no      name        tel \n");
    for(i=0;i<L->length;i++)
    {
        printf("    %d      %s      %s",i+1,L->data[i].name,L->data[i].tel);
            printf("\n");
    }
    printf("目前总人数:%d\n",L->length);
    printf("\n");
}

bool charu(List *&L,int i,ZhaoWang e)
{
int j;
if(e.name=="\0") return FALSE;
if(i<1 || i>L->length+1)
    return FALSE;
i--;
for](j=L->length;j>i;j++)
    L->data[j] = L->data[j-1];

    L->data[i] = e;
    L->length++;
    return TRUE;
}

bool shanchu(List *&L,int i,ZhaoWang &e)
{
    int j;
    if(i<1 ||i>L->length)
        return FALSE;
    i--;
    e = L->data[i];
    for(j=i;j<L->length-1;j++)
    {
        L->data[j] = L-data[j+1];
    }
    L->length--;
    printf("length=%d\n\n",L->length);
    return TRUE;
}

void menu1()
{
    printf("    ---------------------\n");
    printf("        应用\n");
    printf("        --------------------\n");
    printf("        1.建立\n");
    printf("        2.增加\n");
    printf("        3.显示\n");
    printf("        4.删除\n");
    printf("        5.查找\n");
    printf("        6.退出\n");
    printf("        ------------------------\n\n");
}

int LE(List *L,ZhaoWang e)
{
    int i= 0;
    while(i<L->length && strcmp(L->data[i].name,e.name)!=0)
        i++;
    if(i>=L->length)
        return 0;
    else
    {
        puts(L->data[i].name);
        puts(L->data[i].tel);
        return(i+1);
    }
}

void main()
{
    List *L;
    int flag =1;
    int j;
    ZhaoWang s[2]={"赵汪","19858190175","汪","13616723860"};
    ZhaoWang e;
    menu1();
    printf("1\n");
    chulist(L);
    printf("2\n");
    for(int i=0;i<4;i++)
        charu(L,i+1,s[i]);
        shuchu(L);
    while(flag==1)
    {
        printf("请选择");
        scanf("%d",&j);
        switch(j)
        {
            case 2:printf("输入name,tel:");
                scanf("%s%s",e.name,e.tel);
                printf("位置");
                scanf("%d",&i);
                printf("\n");
                charu(L,i,e);
                break;
            
        }
    }
}