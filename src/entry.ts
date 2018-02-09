import './style.scss';

function changeFont() {
    const topLevelComments : HTMLCollectionOf<Element> = document.getElementsByClassName('comment');
    for (let i = 0; i < topLevelComments.length; i++) {
        let div = topLevelComments[i];
        if (div instanceof HTMLElement) {
            formatTopLevel(div);
        }
    }

    const deepComments : HTMLCollectionOf<Element> = document.getElementsByClassName('review-comment');
    for (let i = 0; i < deepComments.length; i++) {
        let div = deepComments[i];
        if (div instanceof HTMLElement) {
            formatDeep(div);
        }
    }
}

function formatTopLevel(div: HTMLElement) {
    if (isAuthorBrent(div)) {
        div.style.fontFamily = 'Comic Sans MS';
        formatCommentBody(div);
    }
}

function formatDeep(div: HTMLElement) {
    if (isAuthorBrent(div)) {
        div.style.fontFamily = 'Comic Sans MS';
        formatCommentBody(div);
    }
}

function formatCommentBody(div: HTMLElement) {
    const bodyDiv = div.getElementsByClassName('comment-body');
    if (bodyDiv.length > 0) {
        const bd = bodyDiv[0];
        if (bd instanceof HTMLElement) {
            bd.style.fontFamily = 'Comic Sans MS'
        }
    }
}

function isAuthorBrent(div: HTMLElement) {
    let authorDivs = div.getElementsByClassName('author');
    if (authorDivs.length === 0) {
        return;
    }
    let authorDiv = authorDivs[0];
    console.log(authorDiv.textContent);
    return authorDiv.textContent == 'byates-va';
}

changeFont();