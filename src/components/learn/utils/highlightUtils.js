// src/components/learn/utils/highlightUtils.js
export function highlightText(range, id, category) {
    const span = document.createElement('span');
    span.className = `highlight highlight-${category}`;
    span.dataset.id = id;
    range.surroundContents(span);
}

export function removeHighlights(id) {
    const highlights = document.querySelectorAll(`.highlight[data-id="${id}"]`);
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        while (highlight.firstChild) {
            parent.insertBefore(highlight.firstChild, highlight);
        }
        parent.removeChild(highlight);
    });
}
