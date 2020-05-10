from aip import AipSpeech

""" 你的 APPID AK SK """
APP_ID = '19812664'
API_KEY = '63PLAVtDBowNUi36OytSnrkB'
SECRET_KEY = 'EOxIS1twaGPvOxPm6eoGLxrFXy6i98pf'

client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)

s = '你好袁媛， 我叫赵汪， 这是我的第一个语言调试。'
speak = client.synthesis(s, 'zh', 1, {
    'vol' : 5,   #音量   取值0-15
    'per': 3,
    'spd' : 6,  #语速，取值0-9
    'pit': 3,   #音调， 取值0-9
})

with open('myspeech.mp3', 'wb') as f:
    f.write(speak)