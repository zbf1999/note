import os
from tkinter import Tk, Menu, Label, Button
from tkinter.filedialog import askopenfilenames
from tkinter.messagebox import showinfo

from note.python.python.basic.remove_background import rmbg

IMGPATH = ''

class GUI(object):

    def __init__(self, window):
        self.window = window
        self.window.title('去除图片背景')
        self.window.geometry('300x200')
        menubar = Menu(self.window)

        filemenu = Menu(menubar, tearoff = 0)
        filemenu.add_command(Label = '帮助', command = self.helpme)
        filemenu.add_separator()

        self.l = Label(window, text = '')
        self.l.pack(padx = 5, pady = 10)

        btn1 = Button(window, text = '选择照片', width=15,
        height=2, command=self.get_img)
        btn1.pack()

        self.send_btn = Button(window, text = '去除背景',
        width=15, height=2, command=self.get_img)
        self.send_btn.pack()

    


if __name__ == '__main__':
    window = Tk()
    GUI(window)
    window.mainloop()