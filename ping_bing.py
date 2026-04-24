import json
import os
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
import time

SITEMAP_URL = 'https://calculations.tools/sitemap.xml'
CACHE_FILE = os.path.join(os.path.dirname(__file__), '.sitemap-cache-bing.json')
INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
HOST = 'calculations.tools'
API_KEY = '2095e7971ef44da8bf52b45c356470bc'
KEY_LOCATION = f'https://{HOST}/{API_KEY}.txt'
BATCH_SIZE = 10000


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
            return set(data.get('pinged', []))
    return set()


def save_cache(pinged):
    with open(CACHE_FILE, 'w') as f:
        json.dump({'pinged': sorted(pinged)}, f, indent=2)


def submit_batch(urls):
    payload = json.dumps({
        'host': HOST,
        'key': API_KEY,
        'keyLocation': KEY_LOCATION,
        'urlList': list(urls),
    }).encode()
    req = urllib.request.Request(
        INDEXNOW_ENDPOINT,
        data=payload,
        headers={'Content-Type': 'application/json; charset=utf-8'},
        method='POST',
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status


def main():
    print('Fetching live sitemap...')
    live_urls = fetch_sitemap_urls(SITEMAP_URL)
    print(f'  {len(live_urls)} URLs in sitemap')

    pinged = load_cache()
    new_urls = sorted(live_urls - pinged)

    if not new_urls:
        print('No new URLs to submit.')
        return

    print(f'  {len(new_urls)} new URLs to submit to IndexNow')

    submitted = set()
    for i in range(0, len(new_urls), BATCH_SIZE):
        batch = new_urls[i:i + BATCH_SIZE]
        try:
            status = submit_batch(batch)
            print(f'  Batch {i // BATCH_SIZE + 1}: HTTP {status} ({len(batch)} URLs)')
            submitted.update(batch)
        except urllib.error.HTTPError as e:
            print(f'  Batch {i // BATCH_SIZE + 1}: ERROR HTTP {e.code} - {e.reason}')
        except Exception as e:
            print(f'  Batch {i // BATCH_SIZE + 1}: ERROR {e}')
        if i + BATCH_SIZE < len(new_urls):
            time.sleep(1)

    save_cache(pinged | submitted)
    print(f'\nDone. {len(submitted)} URLs submitted.')


if __name__ == '__main__':
    main()
