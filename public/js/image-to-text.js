var ocrState = { tesseractLoaded: false, pdfJsLoaded: false };

var TESS_WORKER = 'https://cdn.jsdelivr.net/npm/tesseract.js@4.1.1/dist/worker.min.js';
var TESS_LANG   = 'https://tessdata.projectnaptha.com/4.0.0';
var TESS_CORE   = 'https://cdn.jsdelivr.net/npm/tesseract.js-core@4.0.4';

function showToast(msg) {
  var t = document.querySelector('.diff-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2800);
}

function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function errMsg(err) {
  if (!err) return 'unknown error';
  if (typeof err === 'string') return err;
  return err.message || err.name || String(err) || 'unknown error';
}

function loadTesseract(cb) {
  if (ocrState.tesseractLoaded) { cb(); return; }
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@4.1.1/dist/tesseract.min.js';
  s.onload = function() { ocrState.tesseractLoaded = true; cb(); };
  s.onerror = function() { showToast('Failed to load OCR engine'); };
  document.body.appendChild(s);
}

function loadPdfJs(cb) {
  if (ocrState.pdfJsLoaded) { cb(); return; }
  var s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js';
  s.onload = function() {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    ocrState.pdfJsLoaded = true;
    cb();
  };
  s.onerror = function() { showToast('Failed to load PDF library'); };
  document.body.appendChild(s);
}

function setProgress(pct, msg) {
  var bar = document.getElementById('ocr-pb-bar');
  var lbl = document.getElementById('ocr-pb-label');
  if (bar) bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  if (lbl) lbl.textContent = msg || '';
}

function setProgressVisible(v) {
  var el = document.getElementById('ocr-progress-wrap');
  if (el) el.style.display = v ? '' : 'none';
}

function showResult(text) {
  setProgressVisible(false);
  var ta = document.getElementById('ocr-text');
  var out = document.getElementById('ocr-output');
  if (ta) ta.value = text.trim();
  if (out) out.style.display = '';
  if (!text.trim()) showToast('No text found - try a higher-resolution image');
}

function copyOCRText() {
  var ta = document.getElementById('ocr-text');
  if (!ta || !ta.value) { showToast('Nothing to copy'); return; }
  navigator.clipboard.writeText(ta.value).then(function() {
    showToast('Copied to clipboard');
  }).catch(function() {
    ta.select();
    document.execCommand('copy');
    showToast('Copied to clipboard');
  });
}

function downloadOCRText() {
  var ta = document.getElementById('ocr-text');
  if (!ta || !ta.value) { showToast('Nothing to download'); return; }
  var blob = new Blob([ta.value], { type: 'text/plain;charset=utf-8' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'extracted-text.txt';
  a.click();
  setTimeout(function() { URL.revokeObjectURL(a.href); }, 1000);
}

function tessRecognize(dataUrl, onProgress) {
  return Tesseract.recognize(dataUrl, 'eng', {
    workerPath: TESS_WORKER,
    langPath:   TESS_LANG,
    corePath:   TESS_CORE,
    logger:     onProgress,
  });
}

function extractFromImage(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    setProgress(3, 'Loading OCR engine...');
    tessRecognize(e.target.result, function(m) {
      if (m.status === 'recognizing text') {
        setProgress(5 + m.progress * 90, 'Recognizing: ' + Math.round(m.progress * 100) + '%');
      } else if (typeof m.progress === 'number') {
        setProgress(3 + m.progress * 2, m.status || 'Loading...');
      }
    }).then(function(result) {
      setProgress(100, 'Done');
      showResult(result.data.text);
    }).catch(function(err) {
      setProgressVisible(false);
      console.error('OCR error:', err);
      showToast('OCR failed: ' + errMsg(err));
    });
  };
  reader.readAsDataURL(file);
}

function renderPageToDataUrl(page) {
  var vp = page.getViewport({ scale: 2.0 });
  var canvas = document.createElement('canvas');
  canvas.width = vp.width;
  canvas.height = vp.height;
  return page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise.then(function() {
    return canvas.toDataURL('image/png');
  });
}

function extractFromPDF(file) {
  var reader = new FileReader();
  reader.onload = function(e) {
    setProgress(5, 'Loading PDF...');
    var lib = window.pdfjsLib;
    var allText = [];

    lib.getDocument({ data: new Uint8Array(e.target.result.slice(0)) }).promise.then(function(pdf) {
      var numPages = pdf.numPages;

      function doPage(idx) {
        if (idx >= numPages) {
          setProgress(100, 'Done');
          showResult(allText.join('\n\n'));
          return;
        }
        setProgress(10 + (idx / numPages) * 85, 'Rendering page ' + (idx + 1) + '/' + numPages + '...');
        pdf.getPage(idx + 1).then(renderPageToDataUrl).then(function(dataUrl) {
          return tessRecognize(dataUrl, function(m) {
            if (m.status === 'recognizing text') {
              var base = 10 + (idx / numPages) * 85;
              var share = 85 / numPages;
              setProgress(base + m.progress * share,
                'OCR page ' + (idx + 1) + '/' + numPages + ': ' + Math.round(m.progress * 100) + '%');
            }
          });
        }).then(function(result) {
          allText.push(result.data.text);
          doPage(idx + 1);
        }).catch(function(err) {
          setProgressVisible(false);
          console.error('OCR page error:', err);
          showToast('OCR failed on page ' + (idx + 1) + ': ' + errMsg(err));
        });
      }

      doPage(0);

    }).catch(function(err) {
      setProgressVisible(false);
      console.error('PDF load error:', err);
      showToast('Failed to load PDF: ' + errMsg(err));
    });
  };
  reader.readAsArrayBuffer(file);
}

function handleFile(file) {
  if (!file) return;
  if (!/\.(png|jpe?g|webp|bmp|tiff?|pdf)$/i.test(file.name)) {
    showToast('Unsupported file type');
    return;
  }

  var drop = document.getElementById('ocr-drop');
  var info = document.getElementById('ocr-file-info');
  var out  = document.getElementById('ocr-output');
  if (drop) drop.classList.add('has-file');
  if (info) info.innerHTML = '<strong>' + escapeHtml(file.name) + '</strong><br>' + (file.size / 1024).toFixed(0) + ' KB';
  if (out)  out.style.display = 'none';

  setProgressVisible(true);
  setProgress(0, 'Initializing...');

  var isPDF = /\.pdf$/i.test(file.name) || file.type === 'application/pdf';

  loadTesseract(function() {
    if (isPDF) {
      loadPdfJs(function() { extractFromPDF(file); });
    } else {
      extractFromImage(file);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var drop  = document.getElementById('ocr-drop');
  var input = document.getElementById('ocr-file-input');
  if (!drop || !input) return;

  drop.addEventListener('click', function() { input.click(); });
  input.addEventListener('change', function() {
    if (input.files && input.files[0]) handleFile(input.files[0]);
  });
  drop.addEventListener('dragover', function(e) {
    e.preventDefault();
    drop.classList.add('dragover');
  });
  drop.addEventListener('dragleave', function() { drop.classList.remove('dragover'); });
  drop.addEventListener('drop', function(e) {
    e.preventDefault();
    drop.classList.remove('dragover');
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });
});
