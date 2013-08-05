(function(){
  var _qtd = window._qtd || []; 
  _qtd.push({
    custom: {
        _c_con_ordn: {

            type: "fn",
            key: function () {
                if (window.$ && window.$("#confirmed_order_id").length) {
                    return $("#confirmed_order_id").text();
                } else {
                    return null;
                }
            },
            pattern: ".*OrderOKView.*"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_us_seg: {

            type: "fn",
            key: function () {
                return window.existingcust ? window.existingcust : "UNDEFINED";
            },
            pattern: ".*OrderOKView.*"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_con_ct: {
            type: "fn",
            key: function () {
                if (window.$ && window.$(".shopping_bag_total .summary_price").length) {
                    // return parseFloat($(".shopping_bag_total .summary_price").text().replace(",", ".").replace(/[^0-9\.]./g, ""));
                    return parseFloat($(".shopping_bag_total .summary_price").text().replace(",", ".").replace(/[^0-9\.]*/g, ""));
                } else {
                    return null;
                }
            },
            pattern: ".*OrderOKView.*"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_con_cu: {

            type: "fn",
            key: function () {
                if (window.$ && window.$(".shopping_bag_total .summary_price").length) {
                    var value = $(".shopping_bag_total .summary_price").text();
                    if (!value) {
                        return null;
                    }
                    if (value.indexOf("\u00A3") >= 0) {
                        return "GBP";
                    }
                    if (value.indexOf("\u20AC") >= 0) {
                        return "EUR";
                    }
                    if (value.indexOf("\u0024") >= 0) {
                        return "USD";
                    }
                    return "OTHER:" + value;
                } else {
                    return null;
                }
            },
            pattern: ".*OrderOKView.*"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_con_dc: {

            type: "fn",
            key: function () {
                if (window.$ && window.$(".shopping_bag_delivery .summary_price").length) {
                    // return parseFloat($(".shopping_bag_delivery .summary_price").text().replace(",", ".").replace(/[^0-9\.]./g, ""));
                    return parseFloat($(".shopping_bag_delivery .summary_price").text().replace(",", ".").replace(/[^0-9\.]*/g, ""));
                } else {
                    return null;
                }
            },
            pattern: ".*OrderOKView.*"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_sc_val: {

            type: "fn",
            key: function () {
                if (window.$) {
                    // return parseFloat($(".shopping_bag_total .summary_price").text().replace(",", ".").replace(/[^0-9\.]./g, ""));
                    return parseFloat($(".shopping_bag_total .summary_price").text().replace(",", ".").replace(/[^0-9\.]*/g, ""));
                }
            },
            pattern: "/OrderItemDisplay|/OrderDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_sc_cu: {

            type: "fn",
            key: function () {
                if (window.$) {
                    var value = $(".shopping_bag_total .summary_price").text();
                    if (!value) {
                        return null;
                    }
                    if (value.indexOf("\u00A3") >= 0) {
                        return "GBP";
                    }
                    if (value.indexOf("\u20AC") >= 0) {
                        return "EUR";
                    }
                    if (value.indexOf("\u0024") >= 0) {
                        return "USD";
                    }
                    return "OTHER:" + value;
                }
            },
            pattern: "/OrderItemDisplay|/OrderDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_sc_amnt: {

            type: "fn",
            key: function () {
                if (window.$) {
                    var totalAmount = 0;
                    $(".item_quantity").each(function () {
                        totalAmount += parseFloat($(this).find("select").val());
                    });
                    return totalAmount;
                }
            },
            pattern: "/OrderItemDisplay|/OrderDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_prd_ct: {

            type: "fn",
            key: function () {
                if (window.$) {
                    return parseFloat($(".product_summary .product_price span").text().replace(",", ".").replace(/[^0-9\.]/g, ""));
                }
            },
            pattern: "/ProductDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_prd_cu: {

            type: "fn",
            key: function () {
                if (window.$) {
                    var value = $(".product_summary .product_price span").text();
                    if (!value) {
                        return null;
                    }
                    if (value.indexOf("\u00A3") >= 0) {
                        return "GBP";
                    }
                    if (value.indexOf("\u20AC") >= 0) {
                        return "EUR";
                    }
                    if (value.indexOf("\u0024") >= 0) {
                        return "USD";
                    }
                    return "OTHER:" + value;
                }
            },
            pattern: "/ProductDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_prd_cl: {

            type: "fn",
            key: function () {
                if (window.$) {
                    return $(".product_summary .product_colour span").text();
                }
            },
            pattern: "/ProductDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_prd_sku: {

            type: "fn",
            key: function () {
                if (window.$) {
                    return $(".product_summary .product_code span").text();
                }
            },
            pattern: "/ProductDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_prd_rs: {

            type: "fn",
            key: function () {
                if (window.$) {
                    var reviewCount = $("#BVCustomerRatings .BVRRNumber:not(.BVRRRatingNumber):not(.BVRRRatingRangeNumber)");
                    if (reviewCount.length) {
                        return parseFloat(reviewCount.text());
                    } else {
                        return 0;
                    }
                }
            },
            pattern: "/ProductDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_prd_is: {

            type: "fn",
            key: function () {
                if (window.$) {
                    return $("#product_size_full option[title='In stock']").length + $("#product_size_full option[title='Low stock']").length;
                }
            },
            pattern: "/ProductDisplay"
        }
    }
  });
  _qtd.push({
    custom: {
        _c_prd_oos: {

            type: "fn",
            key: function () {
                if (window.$) {
                    return $("#product_size_full option[title='Out of stock']").length;
                }
            },
            pattern: "/ProductDisplay"
        }
    }
  });

  /* Basket product list */
  _qtd.push({
    custom: {
      _c_prdlist: {
        type: "fn",
        key: function () {
          var productList = [];
          var productsSelector = ".tbl_shopping_bag tbody tr"

          // Not used
          var parseCurrency = function(str) {
            return str.match(/(.) ?\d+/);          
          }

          var parseNum = function(str) {
            return parseFloat(str.match(/(?:\d|\.)+/), 10) || "";
          };

          if (window.$) {
            $(productsSelector).each(function(){
              var productContainer = $(this);
              var name = productContainer.find(".item_title").text().trim();
              var costString = productContainer.find(".product_price").text();
              var discountedCostString = productContainer.find(".item_total").text();
              var amountString = productContainer.find(".item_quantity").text();

              cost = parseNum(costString);
              discountedCost = parseNum(discountedCostString);
              amount = parseNum(amountString);

              productList.push({
                n: name,
                ct: cost,
                dct: discountedCost,
                amnt: amount
              });
            });
            return productList;
          } else {
            return null;
          }
        },
        pattern: "/OrderItemDisplay"
      } 
    }
  });

  /* Voucher code */
  _qtd.push({
    custom: {
      _c_con_vcode: {
        type: "fn",
        key: function () {
          if (window.s && window.s.eVar8) {
            return s.eVar8;
          } else {
            return null;
          } 
        },
        pattern: ".*OrderOKView.*"
      }
    } 
  });

  /* Optimizely Bucket */
  var optimizelyCookieName = "optimizelyBuckets";
  
  var readcookie = function (name) {
    var nameEQ = name + "=",
      ca = document.cookie.split(';'),
      i = 0,
      c;

    for (i = 0; i < ca.length; i = i + 1) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
        if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  };

  var qtracker_doLoad = function () {
    var name = readcookie(optimizelyCookieName);
    _qtd.push({
      data: {
        _c_op_bu: name
      }
    });
  };
  
  var qtracker_load = function () {
    if (window._qtd) {
      qtracker_doLoad();
    } else {
      setTimeout(qtracker_load, 100);
    }
  };

  qtracker_load();
})();