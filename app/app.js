var commonmark = require('commonmark');

document.addEventListener("DOMContentLoaded", function (event) {
    var mediumEditor = new MediumEditor('.medium-editor'),
        mediumEditorElement = mediumEditor.elements[0],
        markdownEditor = document.getElementsByClassName('markdown-editor').item(0),
        btnMarkdown = document.getElementsByClassName('switch-markdown').item(0),
        btnMedium = document.getElementsByClassName('switch-medium').item(0),
        mediumIsActive = true,
        htmlRenderer = new commonmark.HtmlRenderer(),
        markdownParser = new commonmark.Parser(),
        converter = new html2commonmark.BrowserConverter(),
        markdownRenderer = new html2commonmark.Renderer();

    function setActive(tabBtn, isActive) {
        var theClassList = tabBtn.parentElement.classList;
        if (isActive) {
            theClassList.add('active');
        } else {
            theClassList.remove('active');
        }
    }

    function switchEditor(toMedium) {
        if (toMedium !== mediumIsActive) {
            mediumIsActive = toMedium;
            setActive(btnMedium, toMedium);
            setActive(btnMarkdown, !toMedium);
            mediumEditorElement.hidden = !toMedium;
            markdownEditor.hidden = toMedium;
            if (toMedium) {
                var html = htmlRenderer.render(markdownParser.parse(markdownEditor.value));
                mediumEditorElement.innerHTML = html;
            } else {
                var md = markdownRenderer.render(converter.convert(mediumEditorElement.innerHTML));
                markdownEditor.value = md;
            }
        }
    }
    
    btnMarkdown.addEventListener('click', function (e) {
        e.preventDefault();
        switchEditor(false);
    });
    btnMedium.addEventListener('click', function (e) {
        e.preventDefault();
        switchEditor(true);
    });
});
