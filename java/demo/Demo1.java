package java.demo;

import java.util.Arrays;

public abstract class Demo1 {
    static final int a = 2;
    //常量没有初始值
    //被final修饰的方法，不能被重写
    //被final修饰的类，不能被继承
    //final类中的所有方法都默认为final方法
    static final int c;

    //抽象方法
    public abstract int sum();

    //接口中的属性，默认被public static final修饰
    //interface中只有常量和抽象方法

    /*
    API
    @auther/date/version/see/param/
    执行javadoc Bank.java
    */
    

    static{
        c = 2;
    }

    public static void main(String[] args) {
        int[] ran = {1, 2, 3, 4};

        for(int num : ran) {
            System.out.println(num);
        }

        //修改数组大小
        //int[] newran = Arrays.copyOf(ran, 4);

        ran = Arrays.copyOf(ran, 4);

        //不定长参数
        //public static void m2(int n, String... args){}
    }
}