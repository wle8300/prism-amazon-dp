"use strict"

var countries = require('country-data').countries;

/**
 * prism-amazon-dp

 */

module.exports = {
    
  /**
   * ASIN
   * Amazon Standard Identification Number
   */
  
  ASIN: [
    {
      //Generic
      $select: document.querySelector('input[name^="ASIN"]'),
      refract: function () {
        if (this.$select) return this.$select.value;
        else return undefined;
      }
    }
  ],
  
  /**
   * Product name
   */
  
  name: [
    {
      //Generic
      $select: document.querySelector('#productTitle'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      //Kindle books
      $select: document.querySelector('#btAsinTitle'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Downloadable products (aka, "Amazon Webstore")
      $select: document.querySelectorAll('h1.a-size-large')[0],
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      //for wine
      $select: document.querySelector('#item_name'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    }
  ],
    
  /**
   * Product price
   */
  
  price: [
    {
      // Generic
      $select: document.querySelector('#priceblock_ourprice'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Generic1
      $select: document.querySelector('#priceblock_saleprice'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Generic2
      $select: document.querySelector('#miniATF_price'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Amazon GoldBox (Amazon's "deals" subsidiary webstore)
      $select: document.querySelector('#priceblock_dealprice span'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Music (The non-"Prime" price)
      $select: document.querySelector('[id^="dmusic_digital_buy_button_"] span.a-text-bold'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Legacy dp
      $select: document.querySelector('#actualPriceContent .priceLarge'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Kindle Fire
      $select: document.querySelector('#buyingPriceValue b'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Kindle books
      $select: document.querySelector('#priceBlock b[class^="price"]'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Cell phone (http://www.amazon.com/dp/B00L9OVC94)
      $select: document.querySelector('#current-price'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Books (http://www.amazon.com/dp/0544104404/)
      $select: document.querySelector('#tmmSwatches .swatchElement.selected .a-color-price'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    },
    {
      // Books (http://www.amazon.com/dp/0415873843)
      $select: document.querySelector('#buyNewSection .offer-price'),
      refract: function () {
        if (this.$select) return this.$select.innerText.trim();
        else return undefined;
      }
    }
  ]
  
  /**
   * Currency
   *
   * American Amazon dp has an element "body.en_US"
   * Use the country code to get the currency
   */
  
  currency: [
    {
      $select: document.querySelector('body').classList[1],
      refract: function () {
        var countryCode = this.$select.replace(/.*_/g, '');
        if (this.$select) return countries[countryCode].currencies;
        else return undefined;
      }
    }
  ]
  
  /**
   * Product photo
   */
  
  photo: [
    {
      $select: document.querySelector('#imgTagWrapperId img'),
      refract: function () {
        if (this.$select) return this.$select.src.trim();
        else return undefined;
      }
    },
    {
      $select: document.querySelector('#main-image-widget img'),
      refract: function () {
        if (this.$select) return this.$select.src.trim();
        else return undefined;
      }
    },
    {
      $select: document.querySelector('#imageBlock img'),
      refract: function () {
        if (this.$select) return this.$select.src.trim();
        else return undefined;
      }
    }
  ],
  
  /**
   * Stock
   */
  
  stock: [
    {
      //Generic
      $select: document.querySelector('#availability span'),
      refract: function () {
        if (this.$select) {
          this.$select.innerText.trim()
            .replace(/in stock\.?\s?.*$/i, 'In Stock.')
            .replace(/Only (\d*?) left in stock.*/i, '$1');
        }
        else return undefined;
      }
    },
    {
      //Kindle books
      $select: document.querySelector('#kindle-av-div div.buying span'),
      refract: function () {
        if (this.$select) {
          this.$select.innerText.trim()
            .replace(/in stock\.?\s?.*$/i, 'In Stock.')
            .replace(/Only (\d*?) left in stock.*/i, '$1');
        }
        else return undefined;
      }
    },
    {
      //http://www.amazon.com/dp/B00DYAQI0E/
      $select: document.querySelector('#availability_feature_div span.availGreen'),
      refract: function () {
        if (this.$select) {
          this.$select.innerText.trim()
            .replace(/in stock\.?\s?.*$/i, 'In Stock.')
            .replace(/Only (\d*?) left in stock.*/i, '$1');
        }
        else return undefined;
      }
    }      
  ],
  
  /**
   * Star rating
   */
      
  stars: [
    {
      // Generic
      $select: document.querySelector('#acrReviewStars'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText
            .replace(/(.*?) out of 5 stars/, '$1')
            .trim();
        }
        else return undefined;
      }
    },
    {
      // Generic1
      $select: document.querySelector('#avgRating span'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText
            .replace(/(.*?) out of 5 stars/, '$1')
            .trim();
        }
        else return undefined;
      }
    },
    {
      //http://www.amazon.com/dp/B000Q68XHA
      $select: document.querySelector('#acrPopover'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText
            .replace(/(.*?) out of 5 stars/, '$1')
            .trim();
        }
        else return undefined;
      }
    },
    {
      //Kindle Fire TV
      $select: document.querySelector('#acr div.acrStars span span'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText
            .replace(/(.*?) out of 5 stars/, '$1')
            .trim();
        }
        else return undefined;
      }
    }
  ],
  
  /**
   * Number of reviews
   */

  reviewCount: [
    {
      //Generic
      $select: document.querySelector('#ratingCountText'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText.trim()
            .replace(/(See all\s)?(.*?) customer (rating(s)?|review(s)?)/, '$2')
            .replace(/,/g, '')
            .replace(/[)(]/g, '');
        }
        else return undefined;
      }
    },
    {
      //Generic
      $select: document.querySelector('#acrCustomerReviewText'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText.trim()
            .replace(/(See all\s)?(.*?) customer (rating(s)?|review(s)?)/, '$2')
            .replace(/,/g, '')
            .replace(/[)(]/g, '');
        }
        else return undefined;
      }
    },
    {
      //http://www.amazon.com/dp/B00C481B5O/
      $select: document.querySelector('#summaryStars a.a-text-normal'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText.trim()
            .replace(/(See all\s)?(.*?) customer (rating(s)?|review(s)?)/, '$2')
            .replace(/,/g, '')
            .replace(/[)(]/g, '');
        }
        else return undefined;
      }
    },
    {
      //http://www.amazon.com/dp/B00C481B5O/
      $select: document.querySelector('#revSAR'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText.trim()
            .replace(/(See all\s)?(.*?) customer (rating(s)?|review(s)?)/, '$2')
            .replace(/,/g, '')
            .replace(/[)(]/g, '');
        }
        else return undefined;
      }
    },
    {
      // Amazon Instant Video: http://www.amazon.com/dp/B00NMOGQ2C
      $select: document.querySelector('#reviewLink a'),
      refract: function () {
        if (this.$select) {
          return this.$select.innerText.trim()
            .replace(/(See all\s)?(.*?) customer (rating(s)?|review(s)?)/, '$2')
            .replace(/,/g, '')
            .replace(/[)(]/g, '');
        }
        else return undefined;
      }
    }
  ]
  
};
