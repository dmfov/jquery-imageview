# JQuery ImageView Plugin

Tiny image viewer for JQuery.

## Example usage

Load plugin:

```html
<link href="css/jquery.imageview.css" rel="stylesheet" type="text/css" />
<script src="js/jquery.imageview.js"></script>
```

Define pictures:

```html
<div class="photos">
	<a href="img/1_big.jpg"><img src="img/1_small.jpg" /></a>
	<a href="img/2_big.jpg"><img src="img/2_small.jpg" /></a>
	<a href="img/3_big.jpg"><img src="img/3_small.jpg" /></a>
</div>
```

Apply plugin:

```javascript
$('.photos').imageview();
```

## Options

- **targetSelector** - pictures selector (default: `a`)
- **srcAttr** - picture attribute containing big image url (default: `href`)
- **titleAttr** - picture attribute containing title (default: `title`)

## License

Apache License Version 2.0