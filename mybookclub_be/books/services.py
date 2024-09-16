import requests
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def fetchbooks(request):
    if request.method == "POST":
        query = request.POST.get("query", "")
        url = "https://openapi.naver.com/v1/search/book.json"

        headers = {
            "X-Naver-Client-Id": settings.NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": settings.NAVER_CLIENT_SECRET,
        }

        params = {
            "query": query,
            "display": 10,  # 결과 개수
        }

        try:
            response = requests.get(url, headers=headers, params=params)

            if response.status_code == 200:
                data = response.json()
                books = data.get("items", [])

                formatted_books = []
                for book in books:
                    formatted_book = {
                        "title": book.get("title", ""),
                        "author": book.get("author", ""),
                        "publisher": book.get("publisher", ""),
                        "image_url": book.get("image", ""),
                        "description": book.get("description", ""),
                        "pub_date": book.get("pubdate", ""),
                    }
                    formatted_books.append(formatted_book)

                return JsonResponse({"books": formatted_books})
            else:
                return JsonResponse(
                    {"error": "API request failed"}, status=response.status_code
                )

        except requests.RequestException as e:
            print(f"API request failed: {e}")
            return JsonResponse({"error": "API request failed"}, status=500)
        except (KeyError, IndexError) as e:
            print(f"Failed to parse API response: {e}")
            return JsonResponse({"error": "Failed to parse API response"}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
