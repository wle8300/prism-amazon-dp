"use strict"

var prismUtils = require('prism-utils');

/**
 * prism-amazon-dp
 *
 * @return Array
 */

module.exports = function () {
  return {
      
    /**
     * ASIN
     * Amazon Standard Identification Number
     */
    
    ASIN: [
      //Generic
      function () {
        return prismUtils.fom('input[name^="ASIN"]').value;
      }
    ],
    
    /**
     * The Product Name®
     */
    
    name: [
      //Generic
      function () {
        return prismUtils.only('#productTitle').innerText.trim();
      },
      // Kindle devices
      function () {
        return prismUtils.only('#btAsinTitle').innerText.trim();
      },
      // Downloadable products (aka, "Webstore")
      function () {
        return prismUtils.fom('h1.a-size-large');
      },
      // for wine
      function () {
        return prismUtils.only('#item_name').innerText.trim();
      }
    ],
    price: [
      // Generic
      function () {
        return prismUtils.only('#priceblock_ourprice').innerText.trim();
      },
      // Generic1
      function () {
        return prismUtils.only('#priceblock_saleprice').innerText.trim();
      },
      // Generic2
      function () {
        return prismUtils.only('#miniATF_price').innerText.trim();
      },
      // Amazon GoldBox (Amazon's "deals" subsidiary webstore)
      function () {
        return prismUtils.only('#priceblock_dealprice span').innerText.trim();
      },
      // Music (The non-"Prime" price)
      '[id^="dmusic_digital_buy_button_"] span.a-text-bold',
      // Legacy markup (I think.)
      '#actualPriceContent .priceLarge',
      // Kindle Fire AC130
      '#buyingPriceValue b',
      // Kindle books
      '#priceBlock b[class^="price"]',
      // Cell phone (http://www.amazon.com/dp/B00L9OVC94)
      '#current-price',
      
      // Books (http://www.amazon.com/dp/0544104404/)
      '#tmmSwatches .swatchElement.selected .a-color-price',
      // Books (http://www.amazon.com/dp/0415873843)
      '#buyNewSection .offer-price'
      
      
    ],
    photo: [],
    description: [],
    inventory: [],
    isPrime: []
    
  };
}