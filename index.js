"use strict"

var scraperjs = require('scraperjs');

scraperjs.DynamicScraper

  // .create({url: 'http://amazon.com/gp/aw/d/' +ASIN+ '/?sp=1&vs=1'})
  .create({url: 'http://amazon.com/gp/aw/d/1449331815/?sp=1&vs=1'})
  .scrape(
    
    /**
     * Execute theMobileScarletPimpernel
     * in Amazon/gp/aw/d/[ASIN]/?sp=1&vs=1
     */
   
    function () {
            
      var jQuery = jQuery || $;

      var pageAsString;
      var scrapedAmazonProduct = {
        timeStamp: new Date(Date.now()).toString(),
        price: 'N/A',
        stock: 'N/A',
      };
      
      /**
       * Get <body> innerText
       * in a {String}
       */
      
      pageAsString = document.getElementsByTagName('body')[0].innerText;
      
      /**
       * Error
       * 
       * Just return a blank scrapedAmazonProduct
       * with "pageAsString" to debug
       */
      
      if (pageAsString.match(/having\strouble/g)) {
        scrapedAmazonProduct.pageAsString = pageAsString.replace(/\s/g, '');
        return scrapedAmazonProduct;
      }
      
      /**
       * theMobileScarletPimpernel
       */
    
      scrapedAmazonProduct.price = (function(pageAsString) {

        var pricesArray;
        var price;
        var mainPattern = /(!!!!)?(List)?(!!!!)?Price?:!!!!\$\d+\.?(\d+)?!!!!/g;
        var usingSalePrice;    //using sale "Price"
        var usingNonSalePrice; //using "List Price"

        //Explode ALL whitespace with "!!!!"
        pageAsString = pageAsString.replace(/\s/g, '!!!!');

        //Execute first regex
        pricesArray = pageAsString.match(mainPattern) ? pageAsString.match(mainPattern) : null;

        //Must match. Length <= 3.
        return pricesArray && pricesArray.length <= 3 ? proceed() : 'N/A';
        
        //Additional heuristics
        function proceed() {

          //De-explode "!!!!"
          jQuery.each(pricesArray, function (i, price) {
            pricesArray[i] = price.replace(/!!!!/g, '')
          });

          /**
           * When both ListPrice and SalePrice
           * are respectively in first
           * and second position
           */

          usingSalePrice = pricesArray[0].indexOf('ListPrice') === 0 && pricesArray[1].indexOf('Price') === 0 ? true : false
          usingNonSalePrice = pricesArray[0].indexOf('Price') === 0;
          
          /**
           * Using sale "Price"
           */
          
          if (usingSalePrice) {
            return pricesArray[1].replace('Price:', '');
          }

          /**
           * Using "List Price"
           */
          
          if (usingNonSalePrice) {
            return pricesArray[0].replace(/(List)?Price:/, '');
          }
          
          /**
           * Unexpected values in {Array} pricesArray...
           */
          
          else return 'N/A';

        }

      }(pageAsString));
      scrapedAmazonProduct.stock = (function(pageAsString) {

        var stock;
        var mainPattern = /####([A-Za-z\s]*?)?(\d+)?( left)?\s?in stock.*?####/gi;

        //Explode newlines using "####"
        pageAsString = pageAsString.replace(/\n/g, '####');

        //Execute first regex
        stock = pageAsString.match(mainPattern) ? pageAsString.match(mainPattern) : null;

        //Must be only 1 match
        return stock && stock.length === 1 ? proceed() : 'N/A';
        
        //Additional heuristics
        function proceed() {

          //De-explode "####"
          stock = stock[0].replace(/####/g, '').trim();

          //Execute finer regexes
          stock = stock.replace(/in stock\.?\s?.*$/i, 'In Stock.')
          stock = stock.replace(/Only (\d*?) left in stock.*/i, '$1');

          //Done.
          return stock;

        }

      }(pageAsString));          

      return scrapedAmazonProduct;
    
    },
  
    /**
     * Prepare to
     * return the results
     */
  
    function(scrapedAmazonProduct) {
      
      deferred.resolve(scrapedAmazonProduct);
  
    }
  
  );
