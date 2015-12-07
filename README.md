# multitest-widget-new
Multitest widget new

```
<script type="text/javascript" charset="UTF-8">
    var code = 'YOUR_CODE'; // required: replace YOUR_CODE with actual code
    var design = '2'; // required: choose from 1 to 2
    (function() {
	    var mlt_widget = document.createElement('script');
	    mlt_widget.charset = "UTF-8";
	    mlt_widget.type = 'text/javascript';
	    mlt_widget.async = true;
	    mlt_widget.setAttribute('data-code', code);
	    mlt_widget.setAttribute('data-design', design); 
	    mlt_widget.src = 'coverage.js';
	    mlt_widget.id = 'widget-multitest';
	    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(mlt_widget);
    })();
</script>
<div id="widget-multitest-inner"></div>
```
