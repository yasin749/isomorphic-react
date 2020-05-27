import PropTypes from 'prop-types';

function generateInitialStateString(initialState) {
    return `window.__INITIAL_STATE__ = JSON.stringify(${JSON.stringify(initialState)});`;
}

function conditionalRender(condition, ok, cancel) {
    return condition ? ok : cancel || '';
}

function getInlineScripts(scripts) {
    if (!scripts) {
        return '';
    }

    return scripts.map(script => {
        return `<script>${script}</script>`;
    }).join('');
}

function html(props) {
    const {
        scriptTags,
        linkTags,
        styleTags,
        styles,
        inlineHeadScripts,
        inlineBodyScripts,
        children,
        initialState,
        pageTitleContent,
    } = props;

    const html = `
    <!doctype html>
    <html
      lang='en'>
    <head>
      <title>
        ${conditionalRender(pageTitleContent, pageTitleContent, '')}
      </title>
      <meta
        name='title'
        content="${conditionalRender(pageTitleContent, pageTitleContent, '')}"/>

      <meta charSet='utf-8'/>

      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'/>

      ${conditionalRender(linkTags, linkTags)}
      ${conditionalRender(styleTags, styleTags)}

      ${styles ? styles.map(style => `
        <style id='${style.id}'>
            ${style.cssText}
        </style>
      `) : ''}

      ${conditionalRender(initialState, `
        <script>
          ${generateInitialStateString(initialState)}
        </script>
      `)}

      ${getInlineScripts(inlineHeadScripts)}
    </head>
    <body>
      ${children}

      ${conditionalRender(scriptTags, scriptTags)}

      ${getInlineScripts(inlineBodyScripts)}
    </body>
    </html>
  `.trim();
    return html;
}

html.propTypes = {
    className: PropTypes.string,
    scriptTags: PropTypes.string,
    linkTags: PropTypes.string,
    styleTags: PropTypes.string,
    styles: PropTypes.string,
    inlineHeadScripts: PropTypes.array,
    inlineBodyScripts: PropTypes.array,
    initialState: PropTypes.object,
    children: PropTypes.node.isRequired,
    pageTitleContent: PropTypes.string,
};

export default html;
