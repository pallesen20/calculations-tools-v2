# Google Sheets Sync — One-Time Setup

This sets up the Google Apps Script web app that receives rows from `generate-transcripts.ts`.
No service account, no OAuth. Takes about 5 minutes.

---

## Step 1 — Open your Google Sheet

Create a new Google Sheet (or open an existing one). The sheet will have these columns:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Priority | Category | Tool Name | URL | Video Title | YouTube Description | Tags | Word Count | Full Transcript |

---

## Step 2 — Open Apps Script

In your Google Sheet: **Extensions → Apps Script**

Delete any existing code in `Code.gs` and paste this:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('YouTube Transcripts');
  var data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Priority', 'Category', 'Tool Name', 'URL',
      'Video Title', 'YouTube Description', 'Tags', 'Word Count', 'Full Transcript'
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  var rows = data.rows;
  rows.forEach(function(row) {
    sheet.appendRow(row);
  });

  sheet.autoResizeColumns(1, 8);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', count: rows.length }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Set:
   - **Description**: `Transcript sync`
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`)

---

## Step 4 — Run the generator

```bash
npx tsx scripts/generate-transcripts.ts --sheet <WEB_APP_URL>
```

40 rows will appear in your sheet within a few seconds.

---

## Re-running

The script appends rows — it does not overwrite. If you re-run after adding new tools, clear the sheet rows first (keep row 1 headers), then run again.

To clear data rows only via Apps Script, add this function and run it manually:

```javascript
function clearData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('YouTube Transcripts');
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.deleteRows(2, lastRow - 1);
  }
}
```

---

## Adding a single new tool (after `/new-tool`)

Run with `--slug` to post only one row (requires a small update to the script if needed):

```bash
npx tsx scripts/generate-transcripts.ts --sheet <WEB_APP_URL>
```

Currently the script always posts all rows. To add just one new tool, run the full sync after clearing the sheet — the script is fast enough that re-syncing all 40+ rows takes under 5 seconds.

---

## After recording — add the YouTube ID to the tool page

Once a video is uploaded to YouTube, copy the video ID from the URL
(e.g. `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`)
and add `youtubeId="dQw4w9WgXcQ"` to the tool's Astro page:

```astro
<CalculatorLayout
  title="BMI Calculator"
  youtubeId="dQw4w9WgXcQ"
  ...
>
```

The embed appears automatically below the calculator on the live page.
