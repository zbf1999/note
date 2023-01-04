## Java就业方向

java EE软件工程师：电商、团购、众筹、sns、教育、金融、搜索

jdk=jre+java的开发工具（Java、javac、javadoc）

jre=jvm+Java的核心类库

环境变量的作用是为了在DOS的任意目录使用Java开发工具

第一阶段：基本语法、数组、排序和查找、面向对象编程

第二阶段：枚举和注解、异常、常用类、集合、泛型、线程、io流

第三阶段：网络编程、反射、mysql、jdbc和连接池、正则表达式 


## 数据类型

<kbd>包装类型</kbd>

八个基本类型

- boolean/1
- byte/8/
- char/16
- short/16
- int/32
- float/32
- long/64
- double/64

byte、short不能自动转为char 

byte, short,char三者可以计算，在计算时首先转换为int类型

基本类型都有对应的包装类型，基本类型与其对应的包装类型之间的赋值使用自动装箱与拆箱完成。

``` java
Integer x = 2;     // 装箱
int y = x;         // 拆箱
```

<kbd>缓存池</kbd>

[Java基础篇——缓存池](https://blog.csdn.net/LIKEGAKKI/article/details/118572881)

``` java
Integer x = new Integer(123);
Integer y = new Integer(123);
System.out.println(x == y);    // false
Integer z = Integer.valueOf(123);
Integer k = Integer.valueOf(123);
System.out.println(z == k);   // true
```

---

## String

```java
String s2 = "123";
int n2 = Integer.parseInt(s2);
System.out.println(s2.charAt(0));
取出字符串中的第一个字符
```

<kbd>String.intern()</kbd>

使用String.intern()可以保证相同内容的字符串变量引用同一的内存对象。

下面示例中，s1 和 s2 采用 new String() 的方式新建了两个不同对象，而 s3 是通过 s1.intern() 方法取得一个对象引用。intern() 首先把 s1 引用的对象放到 String Pool(字符串常量池)中，然后返回这个对象引用。因此 s3 和 s1 引用的是同一个字符串常量池的对象。

```java
String s1 = new String("aaa");
String s2 = new String("aaa");
System.out.println(s1 == s2);           // false
String s3 = s1.intern();
System.out.println(s1.intern() == s3);  // true
```

如果是采用 "bbb" 这种使用双引号的形式创建字符串实例，会自动地将新建的对象放入 String Pool 中。

```java
String s4 = "bbb";
String s5 = "bbb";
System.out.println(s4 == s5);  // true
```

- HotSpot中字符串常量池保存在哪里？永久代？方法区还是堆区？

1. 运行时常量池（Runtime Constant Pool)是虚拟机规范中是方法区的一部分，在加载类和结构到虚拟机后，就会创建对应的运行时常量池；而字符串常量池是这个过程中常量字符串的存放位置。所以从这个角度，字符串常量池属于虚拟机规范中的方法区，它是一个逻辑上的概念；而堆区，永久代以及元空间是实际的存放位置。

<kbd>String, StringBuffer and StringBuilder</kbd>

**1. 可变性**

- String 不可变
- StringBuffer 和 StringBuilder 可变

**2. 线程安全**

- String 不可变，因此是线程安全的
- StringBuilder 不是线程安全的
- StringBuffer 是线程安全的，内部使用 synchronized 进行同步

---

## 运算

<kbd>运算符</kbd>

算术、赋值、关系、逻辑、位、三元运算符

1. 除法

```java
System.out.println(10 / 4)->2
10.0 / 4 -> 2.5
```

2. 取模

```java
//在%的本质看一个公式 a % b = a - a / b * b
//-10 % 3 = -1
// 10 % -3 = 1
```

3. 自增加

```java
int i = 1;
//1.temp = i; 2.i = i + 1; 3.i = temp;
i = i++;
System.out.println(i);
```

4. instanceof
5. 运算符优先级
   1. (),{}等
   2. 单目运算
   3. 算术运算
   4. 位移运算
   5. 比较运算
   6. 逻辑
   7. 三元
   8. 赋值

检查是否是某个类的对象

5. && 和& 的区别

   1. &&如果第一个条件为false，则第二个条件不会判断，最终结果为false，效率高
   2. &不管第一个条件是否为false，第二个条件都要判断，效率低
   3. 开发中，我们使用的基本是&&。

6. 原码、反码、补码

   1. 正数的原码、反码、补码都一样
   2. 负数的反码=它的原码符号位不变，其它位取反
   3. 负数的补码=它的反码+1
   4. 在计算机运算的时候，都是以补码的方式来运算的，当我们看运算结果的时候，要看它的原码。 

7. 位运算符

   &按位与， ｜按位或， ^按位异或， ～按位取反， >>, <<, >>>

   所以>>是除2， <<是乘2  

<kbd>参数传递</kbd>

在将一个参数传入一个方法时，本质上是将对象的地址以值的方式传递到形参中。

```java
public class PassByValueExample {
    public static void main(String[] args) {
        Dog dog = new Dog("A");
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        func(dog);
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        System.out.println(dog.getName());          // A
    }

    private static void func(Dog dog) {
        System.out.println(dog.getObjectAddress()); // Dog@4554617c
        dog = new Dog("B");
        System.out.println(dog.getObjectAddress()); // Dog@74a14482
        System.out.println(dog.getName());          // B
    }
}
```



但是如果在方法中改变对象的字段值会改变原对象该字段值，因为改变的是同一个地址指向的内容。

```java
class PassByValueExample {
    public static void main(String[] args) {
        Dog dog = new Dog("A");
        func(dog);
        System.out.println(dog.getName());          // B
    }

    private static void func(Dog dog) {
        dog.setName("B");
    }
}
```

<kbd>控制结构</kbd>

```java
int n = 0;
for (; n < 10; ) {
    System.out.println("h");
    n++;
}
```



---

## 继承

<kbd>访问权限</kbd>

Java成员：

Java的基本单位是类，Java成员即类中的成员，包括以下五个部分：

> 变量、方法、构造器、初始化块、内部类

protected用于修饰成员，表示在继承体系中成员对于子类可见，但是这个访问修饰符对于类没有意义。

[里氏替换原则](https://zhuanlan.zhihu.com/p/268574641)

> 如果子类的方法重写了父类的方法，那么子类中该方法的访问级别不允许低于父类的访问级别。这是为了使用父类实例的地方都可以使用子类实例。

字段决不能是公有的，因为这么做的话就失去了对这个字段修改行为的控制，客户端可以对其随意修改。



<kbd>抽象类与接口</kbd>

1. 抽象类

   ***抽象类和普通类最大的区别是，抽象类不能被实例化，需要继承抽象类才能实例化其子类。***

   ```java
   public class StringTest {
       public static void main(String[] args) {
           AbstractTest a = new AbstractTest() {
               @Override
               public int add(int a, int b) {
                   return 0;
               }
           };
           AbstractTest b = new AbstractTest() {
               @Override
               public int add(int a, int b) {
                   return 0;
               }
           };
           ExtendsTest e = new ExtendsTest();
           Cl c = new Cl();
           System.out.println(b.getClass());
           System.out.println(c.getClass());
           System.out.println(e.getClass());
           System.out.println(a.getClass());
       }
       public static class Cl{
           public static void main(String[] args) {
               System.out.println("hello");
           }
       }
   }
   ---
   class StringTest$2
   class StringTest$Cl
   class ExtendsTest
   class StringTest$1
   ```

   在其他类中实例化抽象类，对象会被当作当前类的内部类。


2. 接口

   接口是抽象类的延伸，在java8之前，它可以看成是一个完全抽象的类，也就是说它不能有任何的方法实现。

   从 Java 8 开始，接口也可以拥有默认的方法实现，这是因为不支持默认方法的接口的维护成本太高了。在 Java 8 之前，如果一个接口想要添加新的方法，那么要修改所有实现了该接口的类。

   > - 接口的成员(字段 + 方法)默认都是 public 的，并且不允许定义为 private 或者 protected。
   >
   > - 接口的字段默认都是 static 和 final 的。

   - 从使用上来看，一个类可以实现多个接口，但是不能继承多个抽象类。

2. 使用选择

   1. 使用接口

   - 需要让不相关的类都实现一个方法，例如不相关的类都可以实现Compareable接口中的compareTo()方法；
   - 需要使用多重继承。

   2. 使用抽象类

   - 需要在几个相关的类中共享代码。
   - 需要能控制继承来的成员的访问权限，而不是都为 public。
   - 需要继承非静态和非常量字段。

   > 在很多情况下，接口优先于抽象类，因为接口没有抽象类严格的类层次结构要求，可以灵活地为一个类添加行为。并且从 Java 8 开始，接口也可以有默认的方法实现，使得修改接口的成本也变的很低

<kbd>[this](http://c.biancheng.net/view/953.html)</kbd>



<kbd>super</kbd>

- 访问父类的构造函数：可以使用super()函数访问父类的构造函数，从而委托父类完成一些初始化的工作。
- 访问父类的成员: 如果子类重写了父类的中某个方法的实现，可以通过使用 super 关键字来引用父类的方法实现。



```java
ExtendsTest e = new SuperExtendExample(1, 2, 3);
```


> 父类 xx = new 子类() 定义的对象只能调用继承来的方法。
>
> 父类 xx = new 子类() 定义的对象调用的是子类的方法。

<kbd>重写与重载</kbd>

1. 重写(Override)

   存在于继承体系中，指子类实现了一个父类在方法声明上完全相同的一个方法。

   为了满足*里式替换原则* ,重写有以下两个限制
   
   - 子类方法的访问权限必须大于等于父类方法；
   - 子类方法的返回类型必须是父类方法返回类型或为其子类型。
   
2. 重载(Overload)

存在于同一个类中，指一个方法与已经存在的方法名称上相同，但是参数类型、个数、顺序至少有一个不同。

> 应该注意的是，返回值不同，其它都相同不算是重载。

---

## 业务分析

![](https://tva1.sinaimg.cn/large/008vxvgGly1h8r0pzbs7fj30x40kyq5k.jpg)

![](https://tva1.sinaimg.cn/large/008vxvgGly1h8r0pzbs7fj30x40kyq5k.jpg)

## 面向对象分析

类和对象

```java
|--Account 账户类（抽象类）
  |--SavingAcount 储蓄账户
  	|--LoanSavingAccount 贷款的存储账户  ---->实现Loanable接口
  |--CreditAccount 信用账户
  	|-- 贷款的信用账户  ---->实现Loanable接口
  
|--Bank 银行类
```

Account类

属性

```java
id				账户号码		long		自动生成，以1000为基数递增1，如第一个开户的ID为1001.
password	账户密码		String
name			真实姓名		String
personID	身份证			 String
email     电子邮箱		String
balance		账户余额		double
```

方法

```java
deposit		存款(不允许子类修改)
withdraw	取款(子类必须根据业务重写)
```



---

## Object通用方法

1. <kbd>equals()</kbd>

   1. 与null的比较

      对任何不是null的对象x调用x.equals(null)结果都为false

   2. equals()与==

      - 对于基本类型，== 判断两个值是否相等，基本类型没有 equals() 方法。
      - 对于引用类型，== 判断两个变量是否引用同一个对象，而 equals() 判断引用的对象是否等价。

      ```java
      Integer x = new Integer(1);
      Integer y = new Integer(1);
      System.out.println(x.equals(y)); // true
      System.out.println(x == y);      // false
      ```

   3. 实现

      - 检查是否为同一个对象的引用，如果是直接返回 true；
      - 检查是否是同一个类型，如果不是，直接返回 false；
      - 将 Object 对象进行转型；
      - 判断每个关键域是否相等。

      ```java
      public class EqualExample {
          private int x;
          private int y;
          private int z;
      
          public EqualExample(int x, int y, int z) {
              this.x = x;
              this.y = y;
              this.z = z;
          }
      
          @Override
          public boolean equals(Object o) {
              if (this == o) return true;
              if (o == null || getClass() != o.getClass()) return false;
      
              EqualExample that = (EqualExample) o;
      
              if (x != that.x) return false;
              if (y != that.y) return false;
              return z == that.z;
          }
      }
      ```

      

1. <kbd>hashCode()</kbd>

   > hashCode()返回散列值，而equals()是用来判断两个对象是否等价。等价的两个对象散列值一定相同，但是散列值相同的两个对象不一定等价。

   <kbd>HashSet</kbd>

   [菜鸟](https://www.runoob.com/java/java-hashset.html)

   [hashSet的作用](https://www.cnblogs.com/runwulingsheng/p/5208762.html)

   [hash散列值/散列函数](https://blog.csdn.net/weixin_40115949/article/details/105682063)

1. <kbd>toString()</kbd>

1. <kbd>clone</kbd>

   1. clone() 是Object的protected方法，它不是public，一个类不显示去重写clone()，其他类就不能直接去调用该实例的clone()方法。

      ![](https://tva1.sinaimg.cn/large/008vxvgGly1h8n9stfo0gj30u00y8djw.jpg)
   
   2. 浅拷贝
   
      拷贝对象和原始对象的引用类型引用同一个对象。
   
      ![](https://tva1.sinaimg.cn/large/008vxvgGly1h8na9mxqcuj30u60u0q62.jpg)
   
   3. 深拷贝
   
      ![](https://tva1.sinaimg.cn/large/008vxvgGly1h8naa91e75j30u00yy427.jpg)
   
   4. **clone() 的替代方案**
   
      使用clone()方法来拷贝一个对象即复杂又有风险，它会抛出异常，并且还需要类型转换。最好不要去使用 clone()，可以使用拷贝构造函数或者拷贝工厂来拷贝一个对象。
   
      ```java
      public class CloneConstructorExample {
          private int[] arr;
      
          public CloneConstructorExample() {
              arr = new int[10];
              for (int i = 0; i < arr.length; i++) {
                  arr[i] = i;
              }
          }
      
          public CloneConstructorExample(CloneConstructorExample original) {
              arr = new int[original.arr.length];
              for (int i = 0; i < original.arr.length; i++) {
                  arr[i] = original.arr[i];
              }
          }
      
          public void set(int index, int value) {
              arr[index] = value;
          }
      
          public int get(int index) {
              return arr[index];
          }
      }
      ```
   
      ```java
      CloneConstructorExample e1 = new CloneConstructorExample();
      CloneConstructorExample e2 = new CloneConstructorExample(e1);
      e1.set(2, 222);
      System.out.println(e2.get(2)); // 2
      ```
   
   
   
## 关键字

<kbd>final</kbd>

1. 数据

   声明数据为常量，可以是编译时常量，也可以是在运行时被初始化后不能被改变的常量。

   - 对于基本类型，final使数值不变；
   - 对于引用类型，final使引用不变，也就不能引用其它对象，但是被引用的对象本身是可以修改的。

2. 方法

   声明方法不能被子类重写

3. 类

   声明不允许被继承

<kbd>static</kbd>

1. 静态变量

   - 静态变量：又称为类变量，也就是说这个变量属于类的，类所有的实例都共享静态变量，可以直接通过类名来访问它；**静态变量在内存中只存在一份**。
   - 实例变量：每创建一个实例就会产生一个实例变量，它与该实例同生共死。

2. 静态方法：

   - 静态方法在**类加载的时候**就存在了，它不依赖于任何实例。所以静态方法必须有实现，也就是说它不能是抽象方法。
   - 只能访问所属类的静态字段和静态方法，方法中不能有this和super关键字。

3. 静态语句块

   静态语句块在类初始化时运行一次。

   ```java
   public class A {
       static {
           System.out.println("123");
       }
   
       public static void main(String[] args) {
           A a1 = new A();
           A a2 = new A();
       }
   }
   
   //123
   ```

4. 静态内部类

   非静态内部类依赖于外部类的实例，而静态内部类不需要。

5. **初始化顺序**

   静态变量和静态语句块优先于实例变量和普通语句块，静态变量和静态语句块的初始化顺序取决于它们在代码中的额顺序。

   ![](https://tva1.sinaimg.cn/large/008vxvgGly1h8nf3dneh4j31540taacn.jpg)

   存在继承的情况下，初始化顺序为：

   - 父类（静态变量、静态语句块）
   - 子类（静态变量、静态语句块）
   - 父类（实例变量、普通语句块）
   - 父类（构造函数）
   - 子类（实例变量、普通语句块）
   - 子类（构造函数）

## 反射

> 反射就是把java类中的各种成分映射成一个个的Java对象

<kbd>Class类</kbd>

- Class类也是类的一种，与class关键字是不一样的。
- 手动编写的类被编译后会产生一个Class对象，其表示的是创建的类的类型信息，而且这个Class对象保存在同名.class的文件中(字节码文件)
- 每个通过关键字class标识的类，在内存中有且只有一个与之对应的Class对象来描述其类型信息，无论创建多少个实例对象，其依据的都是用一个Class对象。
- Class类只存私有构造函数，因此对应Class对象只能有JVM创建和加载
- Class类的对象作用是运行时提供或获得某个对象的类型信息，这点对于反射技术很重要(关于反射稍后分析)。

## 异常

## 泛型

## 注解

## 集合框架



## java 多线程与并发

## io框架

## JVM

## [java代理模式详解](https://javaguide.cn/java/basis/proxy.html#_3-动态代理)

1. 代理模式

   代理模式是一种比较好理解的设计模式。简单来说就是 我们使用代理对象来代替对真实对象的访问，这样就可以在不修改原目标对象的前提下，提供额外的功能操作，扩展目标对象的功能。

   **代理模式的主要作用是扩展目标对象的功能**，比如说在目标对象的某个方法执行前后你可以增加一些自定义的操作。

2. 静态代理

   静态代理中，我们对目标对象的每个方法的增强都是手动完成的，非常不灵活且麻烦。实际应用场景非常非常少，日常开发几乎看不到使用静态代理的场景。

3. 动态代理

   

## [startUML](https://www.jianshu.com/p/37c0202b6da7)

[教程](https://www.cnblogs.com/jimmyai/p/star_uml_class.html)

1. 介绍类与类之间的关系

   类图：类图是面向对象系统建模中最常用和最重要的图，是定义其它图的基础。类图主要是用来显示系统中的类、接口以及它们之间的静态结构和关系的一种静态模型

   类图的3个基本组件：类名、属性、方法

   类的几个主要关系：实现、关联、泛化、聚合、组合、依赖

   ![](https://tva1.sinaimg.cn/large/008vxvgGly1h8psr4925rj30co0kgt9t.jpg)

   ![](https://tva1.sinaimg.cn/large/008vxvgGly1h8pst2ce9vj30u00xdwhf.jpg)

   

2. 
