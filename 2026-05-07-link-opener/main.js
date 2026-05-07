const openUrl = (url) => {
  window.open(url, "_blank");
};

const url = "https://us02web.zoom.us/j/86437456930";
openUrl(url);

const code = "330748";
navigator.clipboard.writeText(code);
