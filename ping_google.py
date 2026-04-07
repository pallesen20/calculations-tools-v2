import json
import os
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
import time
import google.auth
import google.auth.transport.requests
from google.oauth2 import service_account

KEY_FILE = os.path.expanduser('~/indexing-bot.json')
SITEMAP_URL = 'https://calculations.tools/sitemap.xml'
CACHE_FILE = os.path.join(os.path.dirname(__file__), '.sitemap-cache.json')
SCOPES = ['https://www.googleapis.com/auth/indexing']
INDEXING_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish'
BATCH_DELAY = 1.0
DAILY_LIMIT = 200

def get_access_token():
    creds = service_account.Credentials.from_service_account_file(KEY_FILE, scopes=SCOPES)
    creds.refresh(google.auth.transport.requests.Request())
    return creds.token

def fetch_sitemap_urls(sitemap_url):
    with urllib.request.urlopen(sitemap_url, timeout=15) as r:
        tree = ET.parse(r)
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    urls = set()
    for loc in tree.getroot().findall('.//sm:loc', ns):
        urls.add(loc.text.strip())
    return urls

def load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE) as f:
            data = json.load(f)
            return set(data.get('pinged', [])), set(data.get('pending', []))
    return set(), set()

def save_cache(all_live_urls, pinged, pending):
    with open(CACHE_FILE, 'w') as f:
        json.dump({'pinged': sorted(pinged), 'pending': sorted(pending)}, f, indent=2)

def ping_url(token, url, retries=2):
    payload = json.dumps({'url': url, 'type': 'URL_UPDATED'}).encode()
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(
                INDEXING_ENDPOINT,
                data=payload,
                headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
                method='POST'
            )
            with urllib.request.urlopen(req, timeout=10) as r:
                return r.status, None
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < retries:
                time.sleep(5 * (attempt + 1))
                continue
            return None, f'HTTP {e.code}'
        except Exception as e:
            return None, str(e)
    return None, 'Max retries exceeded'

def main():
    print('Fetching live sitemap...')
    live_urls = fetch_sitemap_urls(SITEMAP_URL)
    print(f'  {len(live_urls)} URLs in sitemap')

    pinged, pending = load_cache()
    new_urls = live_urls - pinged - pending
    queue = sorted(pending) + sorted(new_urls)

    if not queue:
        print('No new URLs to ping.')
        save_cache(live_urls, pinged, pending)
        return

    batch = queue[:DAILY_LIMIT]
    remaining = queue[DAILY_LIMIT:]
    print(f'  {len(queue)} URLs to ping ({len(batch)} today, {len(remaining)} queued for next run)')
    if len(queue) > DAILY_LIMIT:
        print(f'  Note: Google Indexing API limit is {DAILY_LIMIT}/day. Run again tomorrow for the rest.')

    token = get_access_token()
    ok = 0
    failed = []

    for i, url in enumerate(batch, 1):
        status, err = ping_url(token, url)
        if status:
            print(f'  [{i}/{len(batch)}] {status} {url}')
            pinged.add(url)
            ok += 1
        else:
            print(f'  [{i}/{len(batch)}] ERROR {url} - {err}')
            failed.append(url)
        time.sleep(BATCH_DELAY)

    pending_next = set(failed) | set(remaining)
    save_cache(live_urls, pinged, pending_next)

    print(f'\nDone. {ok} pinged, {len(failed)} failed (will retry next run), {len(remaining)} queued.')

if __name__ == '__main__':
    main()
