import json
import os
from urllib.request import Request, urlopen
from urllib.error import HTTPError

BASE = os.getenv("BASE_URL", "http://127.0.0.1:8001")
print(f"Using API base URL: {BASE}")

def post(path, data, token=None):
    url = BASE + path
    body = json.dumps(data).encode()
    req = Request(url, data=body, method='POST')
    req.add_header('Content-Type', 'application/json')
    if token:
        req.add_header('Authorization', f'Bearer {token}')
    try:
        resp = urlopen(req)
        return json.load(resp)
    except HTTPError as e:
        body = e.read().decode()
        print('HTTPError', e.code, body)
        raise

def get(path, token=None):
    url = BASE + path
    req = Request(url, method='GET')
    if token:
        req.add_header('Authorization', f'Bearer {token}')
    try:
        resp = urlopen(req)
        return json.load(resp)
    except HTTPError as e:
        body = e.read().decode()
        print('HTTPError', e.code, body)
        raise

def delete(path, token=None):
    url = BASE + path
    req = Request(url, method='DELETE')
    if token:
        req.add_header('Authorization', f'Bearer {token}')
    try:
        resp = urlopen(req)
        try:
            return json.load(resp)
        except Exception:
            return resp.read().decode()
    except HTTPError as e:
        body = e.read().decode()
        print('HTTPError', e.code, body)
        raise


def run():
    print('Registering user...')
    try:
        r = post('/register', {'username':'apitest','email':'a@b.com','password':'pass'})
        print('register:', r)
    except Exception as e:
        print('register error', e)

    print('Logging in...')
    try:
        r = post('/login', {'username':'apitest','password':'pass'})
        print('login:', r)
        token = r.get('access_token')
    except Exception as e:
        print('login error', e)
        return

    print('Creating task...')
    try:
        r = post('/tasks/', {'title':'Hello','description':'desc'}, token)
        print('create:', r)
    except Exception as e:
        print('create error', e)

    print('Listing tasks...')
    try:
        r = get('/tasks/', token)
        print('list:', r)
    except Exception as e:
        print('list error', e)

    if r:
        tid = r[0]['id']
        print('Deleting task', tid)
        try:
            d = delete(f'/tasks/{tid}', token)
            print('delete:', d)
        except Exception as e:
            print('delete error', e)

if __name__ == '__main__':
    run()
