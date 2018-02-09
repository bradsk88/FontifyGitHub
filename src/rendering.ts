const injectedContent = `
<div class="injected-content">
    <div class="title-container">
        <div class="vendasta-logo">
            <div class="top-left-sail"></div>
            <div class="bottom-left-sail"></div>
            <div class="right-sail"></div>
        </div>
        <h1 id="vsearch-header">vSearch</h1>
    </div>
    <div class="header-container">
        <a class="selector answerhub-header disabled">Answerhub</a>
        <a class="selector vblog-header disabled">Vendasta Blog</a>
        <a class="selector va-github-header disabled">GitHub</a>
    </div>
    <ul id="results" class="results">
        <li class="thinky-line"></li>
        <li class="thinky-line"></li>
        <li class="thinky-line"></li>
    </ul>
    <div class="link-more"></div>
</div>
`;

let isanswerhubContentLoading = true;
let isvblogContentLoading = true;

let preventScrollingParent = function (newDiv: HTMLElement) {
    newDiv.addEventListener('mousewheel', function (e) {
        if (newDiv.clientHeight + newDiv.scrollTop + e.deltaY >= newDiv.scrollHeight) {
            e.preventDefault();
            newDiv.scrollTop = newDiv.scrollHeight;
        } else if (newDiv.scrollTop + e.deltaY <= 0) {
            e.preventDefault();
            newDiv.scrollTop = 0;
        }
    }, false);
};

function createDiv(): HTMLElement {
    let newDiv: HTMLElement = document.createElement('div');
    newDiv.className = 'injected-stuff';
    preventScrollingParent(newDiv);
    return newDiv;
}

function insertAfter(newNode: HTMLElement, referenceNode: Element) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertBefore(newNode: HTMLElement, referenceNode: Element) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function setDivContent(markup: string): void {
    let div = document.getElementsByClassName('injected-stuff').item(0);
    div.innerHTML = markup;
}

function getResultsDiv(): Element {
    return document.getElementsByClassName('results').item(0);
}

export function addResultsBoxToPage(): void {
    let newDiv = createDiv();
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName('appbar');


    // Attempt to embed *with* search results.  Google may randomize these class names.
    let betterElements = document.getElementsByClassName("srg");
    if (betterElements.length > 0) {
        insertBefore(newDiv, betterElements.item(0));
    // } else if (betterElements.length > 1) {
    //     insertAfter(newDiv, betterElements.item(0));
    } else if (elements !== undefined) {
        insertAfter(newDiv, elements.item(0));
        newDiv.classList.add("fallback-insert")
    } else {
        console.error(`vSearch messed up, couldn't find class "appbar"`);
    }

    setDivContent(injectedContent);

}

function loadContent(contentId: string, htmlContent: Element): void {
    let answerhub = document.getElementsByClassName('answerhub-header').item(0);
    let vblog = document.getElementsByClassName('vblog-header').item(0);
    let github = document.getElementsByClassName('va-github-header').item(0);
    getResultsDiv().innerHTML = '';
    getResultsDiv().appendChild(htmlContent);
    let headerText = '';
    if (contentId === 'answerhub') {
        vblog.classList.remove('selected');
        answerhub.classList.add('selected');
        github.classList.remove('selected');
        headerText = 'vSearch: AnswerHub';
    } else if (contentId === 'vblog') {
        vblog.classList.add('selected');
        answerhub.classList.remove('selected');
        github.classList.remove('selected');
        headerText = 'vSearch: Vendasta Blog';
    } else if (contentId === 'va-github') {
        vblog.classList.remove('selected');
        answerhub.classList.remove('selected');
        github.classList.add('selected');
        headerText = 'vSearch: GitHub';
    }
    // TODO: Remove duplication above
    document.getElementById('vsearch-header').innerHTML = headerText;
}

export function showGitHubPATError() {
    let header = document.getElementsByClassName('va-github-header').item(0);
    header.classList.remove('disabled');
    header.classList.add('error');
    let openOptions = document.createElement('a');

    // TODO: Figure out how to link to this, directly.
    openOptions.innerHTML = '<p>Please configure GitHub keys from "Options" in chrome://extensions</p>';

    header.addEventListener("click", function() {
        loadContent("va-github", openOptions);
    });
}

export function notifyContentLoaded(contentId: string, htmlContent: string): void {
    let nothingLoadedYet = isvblogContentLoading && isanswerhubContentLoading;
    isanswerhubContentLoading = false;
    let header = document.getElementsByClassName(contentId + '-header').item(0);
    header.classList.remove('disabled');
    if (nothingLoadedYet) {
        header.classList.add('selected');
        getResultsDiv().innerHTML = htmlContent;
    }
    header.addEventListener("click", function () {
        let contentElement = document.createElement("div");
        contentElement.innerHTML = htmlContent;
        loadContent(contentId, contentElement)
    }, false)
}
