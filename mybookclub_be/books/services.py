import requests
from django.conf import settings

def fetchbooks(isbn):
    client_id = settings.NAVER_CLIENT_ID
    client_secret = settings.NAVER_CLIENT_SECRET
    url = f"https://openapi.naver.com/v1/search/book_adv.json?d_isbn={isbn}"
    
    headers = {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
    }
    try:
        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            return {
                'isbn': isbn,
                'title': '책 제목',
                'author': '저자',
                'publisher': '출판사',
                'image_url': '이미지 URL',
                'description': '설명',
                'pub_date': '출판일',
            }
    except requests.RequestException as e:
        print(f"API request failed: {e}")
    except (KeyError, IndexError) as e:
        print(f"Failed to parse API response: {e}")
    
    return None