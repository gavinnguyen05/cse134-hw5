export default function (eleventyConfig) {
    // copy the stylesheet and theme script into the output folder as-is
    eleventyConfig.addPassthroughCopy('src/styles.css');
    eleventyConfig.addPassthroughCopy('src/theme.js');

    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
}
