# Prism for Amazon products

A prism that gets you an amazon product's: `ASIN`, `name`, `price`, `currency`, `photo`, `stock`, `stars`, `reviewCount`

Only works on this path: http://amazon.com/dp/[ASIN]?psc=1

Note: "dp" stands for "detail page"

# Installation

```
npm install prism-amazon-dp
```

# Usage

```javascript
var prismViewer   = require('prism-viewer');
var prismAmazonDp = require('prism-amazon-dp');

var url  = 'http://amazon.com/dp/1449331815?psc=1';

prismViewer(url, prismAmazonDp)

//  OUTPUT
//  $  {
//  $    ASIN: "1449331815",
//  $    name: "Learning JavaScript Design Patterns",
//  $    price: "27.68",
//  $    currency: "USD"
//  $    photo: "..."
//  $    stock: "..."
//  $    stars: "..."
//  $    reviewCount: "..."
//  $  }

```