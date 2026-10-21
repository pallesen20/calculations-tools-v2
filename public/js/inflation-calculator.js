document.addEventListener('DOMContentLoaded', () => {

  const CPI = {
    'USD': {
      name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸',
      source: 'BLS CPI-U (1982-84=100)', start: 1913,
      data: [9.9,10.0,10.1,10.9,12.8,15.1,17.3,20.0,17.9,16.8,17.1,17.1,17.5,17.7,17.4,17.1,17.1,16.7,15.2,13.7,13.0,13.4,13.7,13.9,14.4,14.1,13.9,14.0,14.7,16.3,17.3,17.6,18.0,19.5,22.3,24.1,23.8,24.1,26.0,26.5,26.7,26.9,26.8,27.2,28.1,28.9,29.1,29.6,29.9,30.2,30.6,31.0,31.5,32.4,33.4,34.8,36.7,38.8,40.5,41.8,44.4,49.3,53.8,56.9,60.6,65.2,72.6,82.4,90.9,96.5,99.6,103.9,107.6,109.6,113.6,118.3,124.0,130.7,136.2,140.3,144.5,148.2,152.4,156.9,160.5,163.0,166.6,172.2,177.1,179.9,184.0,188.9,195.3,201.6,207.3,215.3,214.5,218.1,224.9,229.6,233.0,236.7,237.0,240.0,245.1,251.1,255.7,258.8,271.0,292.7,304.7,314.2,320.6]
    },
    'GBP': {
      name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧',
      source: 'ONS CPIH (2015=100)', start: 1914,
      data: [1.2,1.3,1.5,1.8,2.0,2.2,2.3,1.9,1.6,1.6,1.6,1.6,1.6,1.6,1.5,1.4,1.3,1.3,1.3,1.4,1.5,1.6,1.6,1.6,1.6,1.6,1.7,1.9,2.0,2.2,2.3,2.5,2.6,2.8,3.0,3.2,3.3,3.3,3.4,3.5,3.7,3.9,4.0,4.1,4.3,4.4,4.5,4.7,4.9,5.1,5.3,5.5,5.8,6.3,6.9,7.5,8.5,10.2,12.5,15.0,18.0,19.5,22.0,27.0,32.8,35.5,37.4,39.3,41.6,43.2,45.0,48.0,52.5,56.5,59.5,61.3,62.5,64.2,66.5,68.5,70.0,71.0,72.0,73.2,74.4,75.5,77.0,78.5,80.0,81.6,83.8,87.5,88.3,90.2,92.9,95.2,97.2,98.3,100.0,98.0,96.5,98.3,99.7,101.0,103.0,113.0,118.5,124.0,129.0,133.5,136.5,139.0]
    },
    'EUR-DE': {
      name: 'Germany', currency: 'EUR', symbol: '€', flag: '🇩🇪',
      source: 'Destatis (2020=100)', start: 1950,
      data: [18.0,19.2,20.1,20.6,21.0,21.6,22.0,22.6,23.1,23.5,23.9,24.3,24.7,25.2,25.7,26.1,26.6,27.1,27.8,28.5,29.6,31.0,32.3,33.5,34.2,35.0,35.8,37.0,38.5,40.3,42.4,44.7,47.0,49.8,52.1,54.1,55.9,57.5,59.1,60.5,61.8,62.9,63.9,64.6,65.2,65.8,66.5,67.3,68.3,69.5,70.9,72.3,73.5,74.6,75.8,77.0,78.5,80.1,81.6,82.8,84.2,85.7,87.5,89.3,91.1,92.8,94.2,95.5,96.5,97.3,97.8,98.5,100.0,103.2,109.1,115.0]
    },
    'EUR-FR': {
      name: 'France', currency: 'EUR', symbol: '€', flag: '🇫🇷',
      source: 'INSEE CPI (2015=100)', start: 1950,
      data: [6.5,7.0,7.8,8.3,8.8,9.2,9.6,9.9,10.2,10.6,10.9,11.2,11.6,12.0,12.5,13.1,13.7,14.4,15.1,15.9,16.8,17.8,19.0,20.4,22.1,24.0,26.2,28.3,30.2,32.2,34.6,37.3,40.3,43.7,47.3,50.8,53.9,56.6,58.9,61.0,62.8,64.4,65.9,67.2,68.5,69.7,70.9,72.3,73.8,75.4,77.0,78.7,80.4,82.2,84.0,85.9,87.7,89.4,91.0,92.4,93.7,95.0,96.1,97.1,97.8,98.5,99.0,99.7,100.0,100.5,102.0,103.6,104.5,105.8,107.0,111.5]
    },
    'EUR-ES': {
      name: 'Spain', currency: 'EUR', symbol: '€', flag: '🇪🇸',
      source: 'INE CPI (2015=100)', start: 1960,
      data: [4.0,4.2,4.5,4.8,5.2,5.7,6.3,6.9,7.7,8.5,9.4,10.4,11.5,12.8,14.3,16.0,18.0,20.5,23.5,27.0,31.0,35.5,40.8,46.5,52.0,57.2,61.8,65.5,68.5,71.0,73.2,75.0,76.8,78.4,79.8,81.0,82.2,83.5,84.8,86.0,87.2,88.3,89.4,90.5,91.6,92.7,93.8,95.0,96.2,97.4,98.4,99.0,100.0,100.0,100.5,101.0,102.0,103.5,106.0,115.0,120.5,124.0,126.5,128.5,130.5,132.0]
    },
    'EUR-IT': {
      name: 'Italy', currency: 'EUR', symbol: '€', flag: '🇮🇹',
      source: 'Istat CPI (2015=100)', start: 1950,
      data: [4.5,5.0,5.5,5.8,6.0,6.2,6.4,6.7,7.0,7.3,7.6,7.9,8.2,8.6,9.0,9.5,10.1,10.8,11.5,12.3,13.2,14.3,15.5,17.0,18.9,21.1,23.8,27.0,30.5,34.5,39.2,44.3,49.8,55.8,62.0,68.2,73.6,78.0,81.8,84.8,87.2,89.2,91.0,92.5,93.8,95.0,96.0,97.0,97.8,98.5,99.0,99.5,100.0,100.2,100.5,100.5,101.5,103.8,108.5,115.5,121.0,126.0,129.5,131.0,132.0,132.5,133.5,135.0,137.0,148.5,156.0,160.5,163.5,166.0,168.0,170.0]
    },
    'EUR-NL': {
      name: 'Netherlands', currency: 'EUR', symbol: '€', flag: '🇳🇱',
      source: 'CBS CPI (2015=100)', start: 1960,
      data: [14.0,14.5,15.0,15.5,16.0,16.7,17.5,18.4,19.5,20.8,22.2,23.8,25.5,27.5,29.7,32.0,34.5,37.5,41.0,45.0,49.0,52.8,56.0,59.0,61.5,63.5,65.5,67.5,69.5,71.2,72.8,74.2,75.5,76.8,77.8,78.8,79.8,80.8,81.8,83.0,84.5,86.0,87.5,89.0,90.5,92.0,93.5,95.0,96.5,98.0,99.2,100.0,100.5,101.0,101.5,102.5,104.5,109.0,115.5,121.5,125.0,127.5,130.0,133.5,136.0,138.0]
    },
    'EUR-BE': {
      name: 'Belgium', currency: 'EUR', symbol: '€', flag: '🇧🇪',
      source: 'Statbel CPI (2013=100)', start: 1960,
      data: [19.0,19.7,20.4,21.2,22.0,22.9,23.9,25.0,26.3,27.7,29.2,30.9,32.7,34.8,37.2,40.0,43.0,46.5,50.5,55.0,59.5,64.0,68.0,71.5,74.5,77.0,79.0,80.8,82.3,83.6,84.8,85.9,86.9,87.9,88.8,89.7,90.6,91.5,92.5,93.5,94.6,95.8,97.1,98.3,99.4,100.0,101.3,102.0,103.0,104.5,107.5,113.0,119.0,123.5,126.0,127.8,129.5,131.0,133.5,135.0,135.5,138.0,150.5,157.0,160.5,162.5]
    },
    'JPY': {
      name: 'Japan', currency: 'JPY', symbol: '¥', flag: '🇯🇵',
      source: 'Statistics Japan CPI (2020=100)', start: 1955,
      data: [18.2,19.1,19.6,20.2,20.8,21.5,22.3,23.3,24.5,26.0,27.6,29.4,31.4,33.6,36.0,38.5,41.2,44.5,48.5,53.5,59.2,65.3,71.5,77.5,82.2,85.5,87.8,89.2,90.0,90.5,90.8,91.0,91.2,91.5,91.8,92.0,92.3,92.8,93.5,94.3,95.0,95.5,96.0,96.2,96.0,95.8,95.5,95.2,95.0,95.3,95.8,96.5,97.2,98.0,99.2,100.0,99.8,100.2,101.5,103.0,105.5,107.8,109.0,110.5,111.5,112.0,112.5,115.0,119.0,122.0,125.0]
    },
    'CAD': {
      name: 'Canada', currency: 'CAD', symbol: 'CA$', flag: '🇨🇦',
      source: 'StatsCan CPI (2002=100)', start: 1960,
      data: [14.0,14.4,14.7,15.0,15.3,15.7,16.1,16.5,17.1,17.8,18.5,19.3,20.2,21.2,22.4,23.8,25.4,27.3,29.5,32.0,34.8,37.7,40.4,43.0,45.4,47.5,49.4,51.3,53.2,55.0,57.0,59.2,61.4,63.4,65.2,67.0,68.6,70.3,72.1,74.0,75.9,77.9,80.1,82.3,84.4,86.4,88.1,89.7,91.1,92.5,93.6,94.6,95.7,97.0,98.3,99.7,100.0,101.6,103.5,106.7,107.8,109.4,111.0,113.6,116.0,119.5]
    },
    'AUD': {
      name: 'Australia', currency: 'AUD', symbol: 'A$', flag: '🇦🇺',
      source: 'ABS CPI (2011-12 base)', start: 1960,
      data: [5.5,5.7,5.9,6.1,6.4,6.7,7.0,7.3,7.7,8.2,8.8,9.5,10.3,11.3,12.5,14.0,15.7,17.5,19.4,21.5,23.7,26.0,28.2,30.3,32.3,34.3,36.0,37.7,39.5,41.5,44.0,46.5,48.9,51.0,52.9,54.7,56.3,57.8,59.3,60.8,62.5,64.3,66.3,68.5,70.8,73.2,75.4,77.3,79.0,80.9,83.3,85.9,88.2,90.6,92.7,94.9,96.7,98.5,100.0,101.9,103.5,106.0,108.8,112.5,117.5,123.5]
    },
    'CHF': {
      name: 'Switzerland', currency: 'CHF', symbol: 'CHF', flag: '🇨🇭',
      source: 'FSO CPI (2015=100)', start: 1960,
      data: [31.5,32.2,32.8,33.3,34.0,34.8,35.6,36.6,37.8,39.2,40.8,42.6,44.6,46.8,49.5,52.7,56.3,60.3,64.5,68.5,72.2,75.5,78.5,81.0,83.0,84.5,85.5,86.5,87.5,88.5,89.5,90.3,91.0,91.8,92.5,93.3,94.2,95.0,95.8,96.5,97.2,97.8,98.5,99.1,99.6,100.0,100.3,100.5,100.8,101.0,101.3,101.5,102.0,103.0,105.0,107.5,109.5,110.5,111.0,111.0,110.5,111.0,114.5,117.0,118.5,119.5]
    },
    'SEK': {
      name: 'Sweden', currency: 'SEK', symbol: 'kr', flag: '🇸🇪',
      source: 'SCB CPI (1980=100)', start: 1960,
      data: [32.0,33.0,34.0,35.0,36.2,37.5,39.0,40.7,42.6,44.8,47.5,50.8,54.5,59.0,64.5,70.5,77.0,84.0,91.5,100.0,108.5,117.0,126.0,136.0,146.0,155.5,163.0,169.0,175.0,181.0,188.0,195.5,203.5,211.0,217.5,222.5,227.0,230.0,233.0,236.5,240.0,244.5,249.5,255.0,260.5,266.0,271.5,278.0,284.5,290.0,295.5,300.0,305.0,311.0,316.5,321.0,324.5,328.0,331.5,336.5,342.0,351.5,363.0,372.5,377.5,379.5]
    },
    'NOK': {
      name: 'Norway', currency: 'NOK', symbol: 'kr', flag: '🇳🇴',
      source: 'SSB CPI (2015=100)', start: 1960,
      data: [12.5,13.0,13.4,13.8,14.3,14.9,15.5,16.2,17.1,18.1,19.3,20.7,22.3,24.1,26.3,29.0,32.2,36.0,40.2,44.5,49.0,53.5,57.8,62.0,66.0,69.5,72.5,75.0,77.2,79.0,80.5,81.8,82.8,83.6,84.3,85.0,85.8,86.7,87.7,88.8,90.0,91.5,93.0,94.5,96.0,97.5,99.0,100.0,101.8,103.5,105.0,106.5,108.0,110.0,112.5,115.5,118.5,121.5,124.0,126.5,129.0,131.5,133.5,136.0,138.5,141.5]
    },
    'DKK': {
      name: 'Denmark', currency: 'DKK', symbol: 'kr', flag: '🇩🇰',
      source: 'DST CPI (2015=100)', start: 1960,
      data: [12.0,12.5,13.0,13.5,14.0,14.6,15.3,16.1,17.1,18.2,19.5,21.0,22.8,24.8,27.2,30.0,33.5,37.5,42.0,46.5,51.5,56.5,61.0,65.5,69.5,72.8,75.5,77.8,79.7,81.2,82.5,83.5,84.5,85.3,86.0,86.8,87.6,88.5,89.5,90.7,91.9,93.1,94.3,95.4,96.4,97.3,98.2,99.1,100.0,100.8,101.7,102.9,104.2,105.5,107.0,109.0,111.5,117.5,121.5,124.5,127.0,129.5,133.0,137.5,140.5,142.5]
    },
    'NZD': {
      name: 'New Zealand', currency: 'NZD', symbol: 'NZ$', flag: '🇳🇿',
      source: 'Stats NZ CPI (2006=1000)', start: 1960,
      data: [165,170,176,181,187,194,201,210,220,232,245,261,280,302,330,365,405,452,505,562,620,682,740,800,855,910,955,995,1030,1060,1090,1120,1155,1190,1225,1258,1290,1325,1360,1395,1428,1462,1498,1535,1570,1605,1640,1675,1715,1758,1800,1840,1880,1920,1965,2010,2060,2115,2175,2250,2335,2420,2490,2550,2605,2665]
    },
    'INR': {
      name: 'India', currency: 'INR', symbol: '₹', flag: '🇮🇳',
      source: 'MoSPI CPI (2012=100)', start: 1960,
      data: [9.0,9.4,9.7,10.1,10.6,11.2,11.9,12.7,13.7,14.8,16.2,17.9,19.8,22.0,24.5,27.2,30.5,34.5,39.0,44.5,50.5,57.0,63.5,70.0,77.0,84.0,91.0,98.5,106.0,114.0,122.0,130.0,138.0,144.5,150.5,156.5,162.5,168.5,174.5,181.5,189.0,198.0,208.5,220.0,232.0,244.5,257.0,268.5,279.0,290.5,302.5,315.5,329.0,343.0,357.5,372.5,387.0,401.5,416.0,430.5,445.5,460.5,475.0,490.0,505.5,521.0]
    },
    'BRL': {
      name: 'Brazil', currency: 'BRL', symbol: 'R$', flag: '🇧🇷',
      source: 'IBGE IPCA (1993=100)', start: 1995,
      data: [100,115,124,131,139,149,158,168,181,195,209,221,235,250,267,284,301,315,327,340,354,370,387,404,421,438,456,476,497,520,545]
    },
    'CNY': {
      name: 'China', currency: 'CNY', symbol: '¥', flag: '🇨🇳',
      source: 'NBS CPI (2015=100)', start: 1985,
      data: [29.5,31.0,33.5,42.5,55.5,65.5,72.5,81.0,100.0,121.0,136.0,150.0,157.5,162.0,162.0,161.5,163.5,167.5,174.0,179.5,183.5,187.5,190.5,193.0,195.5,198.0,200.5,203.0,206.5,211.5,215.0,218.0,222.0,226.0,230.5,235.0,239.5,244.5,250.5,257.5,265.0]
    },
    'ZAR': {
      name: 'South Africa', currency: 'ZAR', symbol: 'R', flag: '🇿🇦',
      source: 'StatsSA CPI (2016=100)', start: 1960,
      data: [3.5,3.6,3.7,3.8,4.0,4.2,4.4,4.7,5.0,5.4,5.8,6.3,6.9,7.6,8.4,9.4,10.7,12.2,14.0,16.2,18.8,22.0,25.5,29.5,34.0,39.5,46.0,54.0,62.5,71.5,80.5,87.5,93.5,98.5,102.5,106.0,109.5,113.0,117.0,121.5,126.5,132.0,138.0,144.5,150.5,155.5,160.0,164.5,169.0,174.5,181.5,189.5,197.5,205.0,211.5,217.0,222.0,227.5,233.5,241.0,249.5,258.5,267.0,275.0,283.5,293.0]
    },
    'KRW': {
      name: 'South Korea', currency: 'KRW', symbol: '₩', flag: '🇰🇷',
      source: 'Statistics Korea CPI (2020=100)', start: 1965,
      data: [2.8,3.1,3.5,4.0,4.7,5.6,6.8,8.2,10.0,12.5,16.0,20.5,26.5,34.0,42.5,52.0,62.0,71.5,78.5,83.5,87.0,89.5,91.5,93.0,94.2,95.3,96.2,97.0,97.8,98.5,99.2,100.0,101.5,103.0,105.5,108.5,111.5,114.5,117.0,119.0,121.0,123.5,126.0,128.5,131.0,133.5,136.0,139.0,143.0,148.5,153.5,157.5,160.5,163.0,165.5,168.0,170.5,173.5,176.5,179.0,181.0]
    },
    'MXN': {
      name: 'Mexico', currency: 'MXN', symbol: '$', flag: '🇲🇽',
      source: 'INEGI CPI (2018=100)', start: 1990,
      data: [1.2,1.6,2.2,2.9,4.0,6.2,10.5,15.2,19.5,24.0,28.5,32.5,36.0,39.5,43.0,47.0,51.5,56.5,62.0,68.0,74.0,80.5,87.5,94.5,100.0,103.5,107.0,111.0,116.5,123.0,131.5,140.5,149.5,158.5,166.0,173.5]
    }
  };

  const TZ_MAP = {
    'America/New_York':'USD','America/Chicago':'USD','America/Denver':'USD',
    'America/Los_Angeles':'USD','America/Phoenix':'USD','America/Anchorage':'USD',
    'Pacific/Honolulu':'USD','America/Detroit':'USD','America/Indiana/Indianapolis':'USD',
    'America/Kentucky/Louisville':'USD','America/Toronto':'CAD','America/Vancouver':'CAD',
    'America/Edmonton':'CAD','America/Winnipeg':'CAD','America/Halifax':'CAD',
    'America/St_Johns':'CAD','America/Sao_Paulo':'BRL','America/Manaus':'BRL',
    'America/Fortaleza':'BRL','America/Recife':'BRL','America/Belem':'BRL',
    'America/Mexico_City':'MXN','America/Monterrey':'MXN','America/Tijuana':'MXN',
    'Europe/London':'GBP','Europe/Dublin':'GBP',
    'Europe/Berlin':'EUR-DE','Europe/Hamburg':'EUR-DE','Europe/Munich':'EUR-DE',
    'Europe/Vienna':'EUR-DE','Europe/Zurich':'CHF','Europe/Geneva':'CHF','Europe/Bern':'CHF',
    'Europe/Paris':'EUR-FR','Europe/Lyon':'EUR-FR',
    'Europe/Madrid':'EUR-ES','Europe/Barcelona':'EUR-ES','Europe/Canary':'EUR-ES',
    'Europe/Rome':'EUR-IT','Europe/Milan':'EUR-IT','Europe/Palermo':'EUR-IT',
    'Europe/Amsterdam':'EUR-NL','Europe/Brussels':'EUR-BE',
    'Europe/Stockholm':'SEK','Europe/Oslo':'NOK','Europe/Copenhagen':'DKK',
    'Europe/Helsinki':'EUR-DE','Europe/Athens':'EUR-DE','Europe/Lisbon':'EUR-ES',
    'Europe/Warsaw':'EUR-DE','Europe/Prague':'EUR-DE','Europe/Budapest':'EUR-DE',
    'Europe/Bucharest':'EUR-DE','Europe/Sofia':'EUR-DE',
    'Asia/Tokyo':'JPY','Asia/Osaka':'JPY',
    'Asia/Kolkata':'INR','Asia/Calcutta':'INR','Asia/Mumbai':'INR',
    'Asia/Shanghai':'CNY','Asia/Beijing':'CNY','Asia/Chongqing':'CNY',
    'Asia/Seoul':'KRW','Asia/Pusan':'KRW',
    'Australia/Sydney':'AUD','Australia/Melbourne':'AUD','Australia/Brisbane':'AUD',
    'Australia/Perth':'AUD','Australia/Adelaide':'AUD','Australia/Darwin':'AUD',
    'Pacific/Auckland':'NZD','Pacific/Chatham':'NZD',
    'Africa/Johannesburg':'ZAR','Africa/Cape_Town':'ZAR','Africa/Pretoria':'ZAR'
  };

  const SHORTCUTS = [
    { label: '5 yrs ago', offset: 5 },
    { label: '10 yrs ago', offset: 10 },
    { label: '25 yrs ago', offset: 25 },
    { label: '50 yrs ago', offset: 50 },
    { label: 'GFC (2008)', year: 2008 },
    { label: 'COVID (2020)', year: 2020 },
    { label: 'Oil shock (1973)', year: 1973 },
    { label: 'Moon landing (1969)', year: 1969 },
  ];

  let currentCountry = null;
  let rateChart = null;
  let powerChart = null;

  function detectCountry() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return TZ_MAP[tz] || 'EUR-DE';
    } catch(e) { return 'EUR-DE'; }
  }

  function getCPI(key, year) {
    const c = CPI[key];
    if (!c) return null;
    const idx = year - c.start;
    if (idx < 0 || idx >= c.data.length) return null;
    return c.data[idx];
  }

  function getEndYear(key) {
    const c = CPI[key];
    if (!c) return 2025;
    return c.start + c.data.length - 1;
  }

  function fmt(n, sym) {
    if (Math.abs(n) >= 1e9) return sym + (n/1e9).toFixed(2) + 'B';
    if (Math.abs(n) >= 1e6) return sym + (n/1e6).toFixed(2) + 'M';
    if (Math.abs(n) >= 1e3) return sym + n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
    return sym + n.toFixed(2);
  }

  function buildYearOptions(selectEl, key, selectedYear) {
    const c = CPI[key];
    const end = getEndYear(key);
    selectEl.innerHTML = '';
    for (let y = end; y >= c.start; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      if (y === selectedYear) opt.selected = true;
      selectEl.appendChild(opt);
    }
  }

  function buildCountrySelect() {
    const sel = document.getElementById('inf-country');
    if (!sel) return;
    sel.innerHTML = '';
    Object.entries(CPI).forEach(([key, c]) => {
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = c.flag + ' ' + c.name + ' (' + c.currency + ')';
      if (key === currentCountry) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function buildShortcuts() {
    const wrap = document.getElementById('inf-shortcuts');
    if (!wrap) return;
    wrap.innerHTML = '';
    const now = new Date().getFullYear();
    SHORTCUTS.forEach(sc => {
      const btn = document.createElement('button');
      btn.className = 'inf-sc-btn';
      btn.textContent = sc.label;
      const yr = sc.year || (now - sc.offset);
      btn.dataset.year = yr;
      btn.addEventListener('click', () => {
        const fromSel = document.getElementById('inf-from-year');
        if (!fromSel) return;
        const c = CPI[currentCountry];
        if (yr < c.start || yr > getEndYear(currentCountry)) return;
        fromSel.value = yr;
        calculate();
        wrap.querySelectorAll('.inf-sc-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
      wrap.appendChild(btn);
    });
  }

  function calculate() {
    const amtEl = document.getElementById('inf-amount');
    const fromEl = document.getElementById('inf-from-year');
    const toEl = document.getElementById('inf-to-year');
    const resEl = document.getElementById('inf-result');
    if (!amtEl || !fromEl || !toEl || !resEl) return;

    const amount = parseFloat(amtEl.value);
    const fromYear = parseInt(fromEl.value);
    const toYear = parseInt(toEl.value);

    if (isNaN(amount) || amount <= 0 || isNaN(fromYear) || isNaN(toYear)) {
      resEl.classList.add('hidden');
      return;
    }

    const cpiFrom = getCPI(currentCountry, fromYear);
    const cpiTo = getCPI(currentCountry, toYear);
    if (!cpiFrom || !cpiTo) { resEl.classList.add('hidden'); return; }

    const c = CPI[currentCountry];
    const adjusted = amount * (cpiTo / cpiFrom);
    const totalInflation = ((cpiTo / cpiFrom) - 1) * 100;
    const years = Math.abs(toYear - fromYear);
    const annualRate = years > 0 ? (Math.pow(cpiTo / cpiFrom, 1 / years) - 1) * 100 : 0;
    const powerRemaining = (cpiFrom / cpiTo) * 100;

    const sym = c.symbol;
    const dir = toYear >= fromYear ? 'later' : 'earlier';

    document.getElementById('inf-result-value').textContent = fmt(adjusted, sym);
    document.getElementById('inf-result-label').textContent =
      fmt(amount, sym) + ' in ' + fromYear + ' equals in ' + toYear + ':';

    document.getElementById('inf-stat-inflation').textContent =
      (totalInflation >= 0 ? '+' : '') + totalInflation.toFixed(1) + '%';
    document.getElementById('inf-stat-annual').textContent =
      (annualRate >= 0 ? '+' : '') + annualRate.toFixed(2) + '% / yr';
    document.getElementById('inf-stat-power').textContent =
      dir === 'later'
        ? (powerRemaining).toFixed(1) + '% purchasing power left'
        : 'Equivalent to ' + (100 / powerRemaining * 100).toFixed(1) + '% more in ' + fromYear;
    document.getElementById('inf-stat-years').textContent = years + ' year' + (years !== 1 ? 's' : '');

    resEl.classList.remove('hidden');
    const powerCanvas = document.getElementById('inf-power-canvas');
    const powerLabel = document.getElementById('inf-power-label');
    if (powerCanvas) powerCanvas.style.display = 'block';
    if (powerLabel) powerLabel.style.display = 'block';
    drawPowerChart(amount, fromYear, toYear);
    drawRateChart(fromYear, toYear);
  }

  function getInflationRates(key) {
    const c = CPI[key];
    const rates = [];
    for (let i = 1; i < c.data.length; i++) {
      rates.push({ year: c.start + i, rate: (c.data[i] / c.data[i-1] - 1) * 100 });
    }
    return rates;
  }

  function drawRateChart(highlightFrom, highlightTo) {
    const canvas = document.getElementById('inf-rate-canvas');
    if (!canvas) return;
    const rates = getInflationRates(currentCountry);
    const c = CPI[currentCountry];
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth || 560;
    const H = 160;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const padL = 38, padR = 10, padT = 12, padB = 28;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const n = rates.length;

    const maxRate = Math.max(...rates.map(r => r.rate), 5);
    const minRate = Math.min(...rates.map(r => r.rate), -2);
    const range = maxRate - minRate;

    const barW = Math.max(1, chartW / n - 1);

    rates.forEach((r, i) => {
      const x = padL + i * (chartW / n);
      const barH = Math.abs(r.rate / range * chartH);
      const isInRange = highlightFrom && highlightTo &&
        r.year >= Math.min(highlightFrom, highlightTo) &&
        r.year <= Math.max(highlightFrom, highlightTo);

      let col;
      if (r.rate > 15) col = '#ef4444';
      else if (r.rate > 8) col = '#f97316';
      else if (r.rate > 4) col = '#eab308';
      else if (r.rate < 0) col = '#60a5fa';
      else col = 'rgba(167,139,250,0.75)';

      if (!isInRange) col = col.replace('0.75', '0.3').replace('#', '#').replace(/^(rgba?\([^)]+\))$/, (m) => m.replace(/[\d.]+\)$/, '0.3)'));
      if (!isInRange && !col.includes('rgba')) col += '55';

      const zeroY = padT + chartH - (-minRate / range * chartH);
      ctx.fillStyle = col;
      if (r.rate >= 0) {
        ctx.fillRect(x, zeroY - barH, barW, barH);
      } else {
        ctx.fillRect(x, zeroY, barW, barH);
      }
    });

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3,3]);
    const zeroY = padT + chartH - (-minRate / range * chartH);
    ctx.beginPath(); ctx.moveTo(padL, zeroY); ctx.lineTo(W - padR, zeroY); ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '9px system-ui';
    ctx.textAlign = 'right';
    [0, Math.round(maxRate/2), Math.round(maxRate)].forEach(v => {
      const y = padT + chartH - ((v - minRate) / range * chartH);
      ctx.fillText(v + '%', padL - 4, y + 3);
    });

    ctx.textAlign = 'center';
    const step = Math.ceil(n / 8);
    rates.forEach((r, i) => {
      if (i % step === 0) {
        const x = padL + i * (chartW / n) + barW / 2;
        ctx.fillText(r.year, x, H - 6);
      }
    });
  }

  function drawPowerChart(amount, fromYear, toYear) {
    const canvas = document.getElementById('inf-power-canvas');
    if (!canvas) return;
    const c = CPI[currentCountry];
    const sym = c.symbol;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth || 560;
    const H = 160;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const padL = 52, padR = 10, padT = 12, padB = 28;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    const startYear = Math.min(fromYear, toYear);
    const endYear = Math.max(fromYear, toYear);
    const cpiBase = getCPI(currentCountry, fromYear);
    const points = [];
    for (let y = startYear; y <= endYear; y++) {
      const cpiY = getCPI(currentCountry, y);
      if (cpiY !== null) {
        points.push({ year: y, value: amount * (cpiY / cpiBase) });
      }
    }
    if (points.length < 2) return;

    const values = points.map(p => p.value);
    const minV = Math.min(...values) * 0.95;
    const maxV = Math.max(...values) * 1.05;
    const vRange = maxV - minV;

    const xOf = (y) => padL + ((y - startYear) / (endYear - startYear)) * chartW;
    const yOf = (v) => padT + chartH - ((v - minV) / vRange * chartH);

    const grad = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    grad.addColorStop(0, 'rgba(167,139,250,0.25)');
    grad.addColorStop(1, 'rgba(167,139,250,0.03)');
    ctx.beginPath();
    ctx.moveTo(xOf(points[0].year), yOf(points[0].value));
    points.forEach(p => ctx.lineTo(xOf(p.year), yOf(p.value)));
    ctx.lineTo(xOf(points[points.length-1].year), padT + chartH);
    ctx.lineTo(xOf(points[0].year), padT + chartH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(167,139,250,0.9)';
    ctx.lineWidth = 2;
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(xOf(p.year), yOf(p.value));
      else ctx.lineTo(xOf(p.year), yOf(p.value));
    });
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '9px system-ui';
    ctx.textAlign = 'right';
    const labelVals = [minV, (minV + maxV) / 2, maxV];
    labelVals.forEach(v => {
      ctx.fillText(sym + Math.round(v).toLocaleString(), padL - 4, yOf(v) + 3);
    });

    ctx.textAlign = 'center';
    const span = endYear - startYear;
    const step = Math.max(1, Math.ceil(span / 8));
    for (let y = startYear; y <= endYear; y += step) {
      ctx.fillText(y, xOf(y), H - 6);
    }
  }

  function onCountryChange() {
    const sel = document.getElementById('inf-country');
    if (!sel) return;
    currentCountry = sel.value;
    const end = getEndYear(currentCountry);
    const nowY = new Date().getFullYear();
    const fromSel = document.getElementById('inf-from-year');
    const toSel = document.getElementById('inf-to-year');
    buildYearOptions(fromSel, currentCountry, Math.max(CPI[currentCountry].start, end - 30));
    buildYearOptions(toSel, currentCountry, end);
    const src = document.getElementById('inf-source');
    if (src) src.textContent = CPI[currentCountry].source;
    buildShortcuts();
    document.getElementById('inf-result')?.classList.add('hidden');
    drawRateChart(null, null);
  }

  function init() {
    currentCountry = detectCountry();
    buildCountrySelect();
    onCountryChange();

    document.getElementById('inf-country')?.addEventListener('change', onCountryChange);
    document.getElementById('inf-amount')?.addEventListener('input', calculate);
    document.getElementById('inf-from-year')?.addEventListener('change', calculate);
    document.getElementById('inf-to-year')?.addEventListener('change', calculate);

    const amtEl = document.getElementById('inf-amount');
    if (amtEl && !amtEl.value) amtEl.value = '100';
    calculate();
  }

  init();
});
