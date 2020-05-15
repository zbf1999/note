import requests
from bs4 import BeautifulSoup
#from  request import get_http_session
import  traceback
import csv

def get_http_session(pool_connections=1, pool_maxsize=10,max_retries=3):
    session = requests.session()
    adapter = requests.adapters.HTTPAdapter(pool_connections=pool_connections,
                                            pool_maxsize=pool_maxsize,
                                            max_retries=pool_maxsize)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return  session

def gen_papers(skip):
    try:
        url = f'http://in.arxiv.org/list/cs/pastweek?skip={skip}&show=100'
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36'
        }
        r = get_http_session().get(url, headers=headers)
        if r.status_code !=200:
            return False

        soup = BeautifulSoup(r.text, 'lxml')
        all_dt = soup.find_all('dt')
        all_dd = soup.find_all('dd')

        for dt,dd in zip(all_dt, all_dd):
            dt.find(class_='list-identifier').find('a').get('href')
            root_url = 'http://in.arxiv.org'
            full_url = root_url + url

            title = dd.find(class_='list-title').contents
            if len(title)>=3:
                title = title[2]
            else:
                title = dd.find(class_='list-title').text


            authors = dd.find(class_='list-authors').text
            authors = authors.split(':')[1].replace('\n', '')

            yield title, full_url, authors

    except Exception as e:
        print(e)
        traceback.print_exc()

def main():
    resl = []
    for i in  range(0,100):
        for title, full_url, authors in gen_papers(i):
            resl.append([title, full_url, authors])
            print(title, 'done!')
        with open('papers.csv', 'w', encoding='utf-8') as f:
            cw = csv.writer(f)
            for i in resl:
                cw.writerow(i)

if __name__ == '__main__':
    main()