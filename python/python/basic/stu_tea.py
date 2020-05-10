class Student:
    def __init__(self, name, grade, subject):
        self.name = name
        self.garde = grade
        self.subject = subject
    def do_work(self, time):
        if self.garde > 3 and time > 2:
            return True
        elif self.garde <3 and time > 0.5:
            return True
        else:
            return False

class Teacher:
    def __init__(self, name, subject):
        self.name = name
        self.subject = subject
    def evaluate(self, result = True):
        if result:
            return "You are great"
        else:
            return "You should work hard"

stu_zhang = Student('zhang', 5, 'math')
stu_zhao = Student('zhao', 8, 'math')
tea_wang = Teacher('wang', 'math')
teacher_said = tea_wang.evaluate(stu_zhang.do_work(1))
teacher_said1 = tea_wang.evaluate(stu_zhang.do_work(9))
print("Teacher {0} said: {1}. {2}".format(tea_wang.name, stu_zhang.name, teacher_said))
print("Teacher {0} said: {1}, {2}".format(tea_wang.name, stu_zhao.name, teacher_said1))