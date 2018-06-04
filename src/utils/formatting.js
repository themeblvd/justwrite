/**
 * Strip paragraph tags and breaks from HTML content.
 *
 * This is a helper function to format HTML content
 * in a way that WordPress expects before sending it
 * back to the API.
 *
 * WordPress stores HTML content with no <p> and <br>
 * tags, and then when it renders the content on the
 * frontent, it has a PHP function wpautop() that renders
 * the <p> and <br> tags based on line breaks (more or less).
 *
 * This function is meant to essentially do the opposite.
 * We take some HTML and replace all of the <p> and <br>
 * tags with line breaks.
 *
 * @param  {String} content HTML content to strip from.
 * @return {String}         Formatted content.
 */
export function unautop(content) {
    // Remove existing double line breaks around <p> tags.
    content = content.replace(/\n\n<p>/g, '<p>');
    content = content.replace(/<\/p>\n\n/g, '</p>');

    // Remove existing single line breaks around <p> tags.
    content = content.replace(/\n<p>/g, '<p>');
    content = content.replace(/<\/p>\n/g, '</p>');

    // Remove opening <p> tags.
    content = content.replace(/<p>/g, '');

    // Replace all closing </p> tags with two lines breaks.
    content = content.replace(/<\/p>/g, '\n\n');

    // For the different <br> formats, remove leading and
    // trailing line breaks, and then replace all of then
    // with a single new line character.
    ['<br>', '<br/>', '<br />'].forEach(br => {
        content.split(br + '\n').join(br);
        content.split('\n' + br).join(br);
        content.split(br).join('\n');
    });

    return content;
}
