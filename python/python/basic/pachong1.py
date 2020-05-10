import re
import json
from datetime import datetime
import pandas as pd
import requests

url = "https://ncov.dxy.cn/ncovh5/view/pneumonia"
page = requests.get(url).content.decode("utf-8")

regexp = "<script id=\"getListByCountryTypeService2true\">([^<]+)"          #正则表达式

res = re.findall(regexp, page)
data = res[0][44:-11]
dicts = json.loads(data)
print(dicts)
for row in dict:
    for key in row:
        if key in ["createTime", "modifyTime"]:
            row[key] = datetime.fromtimestamp(row[key]/1000).strftime("%Y-%m-%d %H:%M:%S")
        print(key,":", row[key], end=" ")

    print("\n")

df = pd.DataFrame(dict)         #pandas
df.to_csv("ncov1.csv", mode="a")            #csv对象