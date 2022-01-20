# scrollarea
A vanilla JS scrollarea that supports touch, mouse and scrollwheel

# Usage

```js
let area = document.getElementById("scrollarea");
let sa = new ScrollArea(area);

```

# CSS
Make the container fixed height, overflow hidden. And the scrollable container as big as needed.
To show a scrollbar add some styles to 

```css
.sa-scrollbar {
    width: 1em;
    background-color: lightblue;
}

.sa-bar {
    width: 1em;
    background-color: antiquewhite;
}
```