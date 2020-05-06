#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>
#include <string.h>

#define MaxSize 50
typedef char ElemType;

typedef struct qnode{
	ElemType data[10];
	struct qnode *next;
}QNode;

typedef struct{
	
	QNode *front;
	QNode *rear;
}LiQueue;

void InitQueue(LiQueue *&q){
	q = (LiQueue *)malloc(sizeof(LiQueue));
	q->front = q->rear = NULL;
}

void enQueue(LiQueue *&q,ElemType e[]){
	
	QNode *p;
	p=(QNode *)malloc(sizeof(QNode));
	strcpy(p->data,e);
	p->next = NULL;
	if(q->rear==NULL)
		q->front = q->rear = p;
	else
	{
		
		q->rear->next = p;
		q->rear = p;
	}
}

bool deQueue(LiQueue *&q,QNode *&P){
	QNode *t;
	if(q->rear==NULL){
		printf("没有客户！！");
		return false;
	}
	t=q->front;
	if(q->front==q->rear)
		q->front = q->rear=NULL;
	else
		q->front = q->front->next;
	p=t;
	return true;
}

void dispList(LiQueue *L){
	QNode *p = L->front;
	printf("\n-----------------次序-------------\n");
	while(p!=NULL){
		printf("%20s\n",p->data);
		p = p->next;
	}
	printf("------------------------------"); 
}

void menu1(){
	printf("----\n");
	printf("1");
	printf("2");
	printf("3");
	printf("4");
	printf("5");
	printf("----------------\n");
}

void main(){
	QNode *p;
	LiQueue *q;
	int i;
	int flag = 1;
	char no[10];
	menu1();
	InitQueue(q);
	while(flag==1){
		printf("\n 选择");
		scanf("%d",&i);
	switch(i){
			case 1:printf("序号");
				scanf("%s",no);
				enQueue(q,no);
			break;
			case 2:deQueue(q,p);
				printf("客户 %-20s\n",p->data);
			break;
			case 3:dispList(q);
				printf("\n");
			break;
			case 5:flag = 0;
				printf("\n	下班\n\n");
		}
	}
}