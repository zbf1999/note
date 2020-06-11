import requests
import base64

from AIP import AipImageProcess

""" 你的 APPID AK SK """
APP_ID = '19813096'
API_KEY = 'IxlE1Feb3BejRIk0x1H2tH56'
SECRET_KEY = 'BAYSdTkodnDNHfGdLB3ohpj3CbmDC82o'

client = AipImageProcess(APP_ID, API_KEY, SECRET_KEY)



'''
人像动漫化
'''

def get_access_token():
# 获取token的API
    url = 'https://aip.baidubce.com/oauth/2.0/token'
# 获取access_token需要的参数
    params = {
    # 固定参数
        'grant_type':'client_credentials',
    # 必选参数，传入你的API Key
        'client_id':'IxlE1Feb3BejRIk0x1H2tH56',
    # 必选参数，传入你的Secret Key
        'client_secret':'BAYSdTkodnDNHfGdLB3ohpj3CbmDC82o'
    }
# 发送请求，获取响应数据
    response = requests.post(url, params)
# 将响应的数据转成字典类型，然后取出access_token
    access_token = eval(response.text)['access_token']
# 将access_token返回
    return access_token

def img2Cartoon(img):
    url = "https://aip.baidubce.com/rest/2.0/image-process/v1/selfie_anime"
    origin_im = open('D:/Desktop/1.jpg', 'rb')
    img = base64.b64encode(origin_im .read())
    origin_im.close()
    headers = {'content-type':'application/x-www-form-urlencoded'}
    params = {
    # 开始获取的access_token
    'access_token':get_access_token(),
    # 图片的base64编码
    'image':img,
    }
    response = requests.post(url, data=params, headers=headers)

    if response:
    # 打开一个文件
        f = open('result.jpg', 'wb')
        # 获取动漫头像
        anime = response.json()['image']
        # 对返回的头像进行解码
        anime = base64.b64decode(anime)
        # 将头像写入文件当中
        f.write(anime)
        f.close()

if __name__ == '__main__':
    img2Cartoon('origin.jpg')

