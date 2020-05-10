import requests
from lxml import html

url = "http://itdiffer.com/"

page = requests.get(url).content.decode('utf-8')

sel = html.fromstring(page)
title = sel.xpath('//article/h2/a/text()')
print(title)