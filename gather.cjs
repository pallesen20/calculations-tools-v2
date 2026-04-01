const fs = require('fs');
const path = require('path');

const dirToScan = './src/pages'; 
const outputFile = 'results.csv';

const extractProp = (content, key) => {
    // This regex now accounts for potential newlines and multiple spaces
    // It looks for key="value", key='value', or key={value}
    const regex = new RegExp(`${key}\\s*=\\s*["'{]([\\s\\S]*?)["'}]`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
};

function getFiles(dir, allFiles = []) {
    if (!fs.existsSync(dir)) return allFiles;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const name = path.join(dir, file);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, allFiles);
        } else if (file.endsWith('.astro')) {
            allFiles.push(name);
        }
    });
    return allFiles;
}

const rows = [['Title', 'ogFormula', 'ogExample']];
const files = getFiles(dirToScan);

files.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    
    const formula = extractProp(content, 'ogFormula');
    
    // REQUIREMENT: Only pull files that have ogFormula set
    if (formula) {
        const title = extractProp(content, 'title');
        const example = extractProp(content, 'ogExample');
        rows.push([title, formula, example]);
    }
});

// Formatting logic to handle quotes and special characters safely
const csvData = rows.map(r => 
    r.map(field => `"${field.replace(/"/g, '""').replace(/\r?\n|\r/g, ' ')}"`).join(',')
).join('\n');

// This will overwrite the existing results.csv every time it runs
fs.writeFileSync(outputFile, csvData);

console.log(`Update complete! ${rows.length - 1} pages with ogFormula extracted to ${outputFile}`);