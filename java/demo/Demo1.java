package java.demo;

import java.util.Arrays;

public class Demo1 {
    static final int a = 2;

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