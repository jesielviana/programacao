Reveal.initialize({
  hash: true,
  slideNumber: true,
  dependencies: [
    { src: 'plugin/markdown/marked.js' },
    { src: 'plugin/markdown/markdown.js' },
    { src: 'plugin/highlight/highlight.js' },
    { src: 'plugin/notes/notes.js', async: true }
  ]
});
Reveal.configure({ slideNumber: 'c/t' });

let theme = 'light';
function changeTheme(){
  if(theme === 'light'){
    document.getElementById('theme').setAttribute('href','css/theme/black.css');
    document.getElementById('code-theme').setAttribute('href','lib/css/atom-one-dark.css');
    theme = 'dark'
  }else{
    document.getElementById('theme').setAttribute('href','css/theme/white.css');
    document.getElementById('code-theme').setAttribute('href','lib/css/atom-one-light.css');
    theme = 'light';
  }
}