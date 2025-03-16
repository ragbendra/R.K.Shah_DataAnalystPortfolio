/**
 * Simple SQL syntax highlighter
 * Highlights SQL keywords in code blocks
 */

// SQL keywords to highlight
const SQL_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL',
    'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'UPDATE', 'DELETE',
    'CREATE', 'ALTER', 'DROP', 'TABLE', 'VIEW', 'INDEX', 'TRIGGER', 'PROCEDURE',
    'FUNCTION', 'DATABASE', 'SCHEMA', 'AS', 'ON', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN',
    'LIKE', 'IS NULL', 'IS NOT NULL', 'ASC', 'DESC', 'DISTINCT', 'CASE', 'WHEN', 'THEN',
    'ELSE', 'END', 'WITH', 'UNION', 'ALL', 'INTO', 'VALUES', 'SET'
];

/**
 * Highlight SQL syntax in a code block
 * @param {HTMLElement} codeBlock - The code block to highlight
 */
export function highlightSQL(codeBlock) {
    if (!codeBlock || !codeBlock.textContent) return;
    
    let html = codeBlock.textContent;
    
    // Highlight keywords
    SQL_KEYWORDS.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        html = html.replace(regex, match => `<span class="sql-keyword">${match}</span>`);
    });
    
    // Highlight strings
    html = html.replace(/'([^']*)'/g, '<span class="sql-string">\'$1\'</span>');
    html = html.replace(/"([^"]*)"/g, '<span class="sql-string">"$1"</span>');
    
    // Highlight numbers
    html = html.replace(/\b(\d+)\b/g, '<span class="sql-number">$1</span>');
    
    // Highlight comments
    html = html.replace(/--(.*)$/gm, '<span class="sql-comment">--$1</span>');
    
    codeBlock.innerHTML = html;
}

// Add CSS for syntax highlighting
function addHighlightStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .sql-keyword {
            color: #0000FF;
            font-weight: bold;
        }
        .sql-string {
            color: #A31515;
        }
        .sql-number {
            color: #098658;
        }
        .sql-comment {
            color: #008000;
            font-style: italic;
        }
    `;
    document.head.appendChild(styleElement);
}

// Initialize styles
addHighlightStyles();

// Export the highlight function
export default highlightSQL;
