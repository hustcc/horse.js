!function (root, factory) {
  if (typeof module === 'object' && module.exports)
    module.exports = factory(root);
  else
    root.horse = factory(root);
} (typeof window !== 'undefined' ? window : this, function () {

  function horse (el, options) {
    // var KEY_BACKSPACE = 8;
    var KEY_ENTER = 13;
    var KEY_ESC = 27;
    var KEY_UP = 38;
    var KEY_DOWN = 40;

    var o = options || {};
    var limit = typeof o.limit === 'number' ? o.limit : Infinity;
    var suggestions = o.suggestions;
    var onSelected = o.onselect ? function(li, suggestion) {defaultSelectEvent(li, suggestion); o.onselect(li, suggestion);} : defaultSelectEvent;

    var ul = tag('ul', 'sey-list');

    // position
    ul.style.top = eleY(el) + eleHeight(el) + el.style.marginBottom + 'px';
    ul.style.left = eleX(el) + 'px';

    var lis = []; // all the li
    var selection = null; // the selected li
    var firstShowLi = null; // the first show li
    var showCounter = 0; // show counter

    document.body.appendChild(ul);
    el.setAttribute('autocomplete', 'off');

    // load the ul element
    if (Array.isArray(suggestions)) {
      loadUl(suggestions);
    }

    bindEvent(); // input event

    function bindEvent() {
      el.onkeydown = onkeydown; // left, right enter, preventDefault, 
      el.onkeyup = onkeyup; // esc, delete
      el.onpaste = filter;
      document.onclick = function() {hide();};
    }

    function filteSuggest(q, suggestion) {
      var text = getText(suggestion) || '';
      var value = getValue(suggestion) || '';
      var needle = q.toLowerCase();
      return fuzzysearch(needle, text.toLowerCase()) || fuzzysearch(needle, value.toLowerCase());
    }

    function doFilter(li) {
      // search success, show it
      if (filteSuggest(el.value, suggestions[li.i])) {
        showItem(li.li);

        // first
        if (firstShowLi == null || li.i < firstShowLi.i) {
          firstShowLi = li;
        }
      }
      else {
        hideItem(li.li);
        // no first
        if (firstShowLi && li.i == firstShowLi.i) {
          firstShowLi = null;
        }
      }
    }
    function filter() {
      lis.forEach(doFilter);

      if (!visible()) {
        show();
      }
      if ((!selection) || hidden(selection)) {
        selectFirst();
      }
    }
    function loadUl (suggestions) {
      clear();
      // loop add
      for (var i = 0; i < suggestions.length; i ++) {
        lis.push({'i': i, 'li': add(suggestions[i])});
      }
    }

    function getValue (suggestion) {
      return defaultGet('value', suggestion);
    }

    function getText (suggestion) {
      return defaultGet('text', suggestion);
    }

    function defaultGet (type, value) {
      return value && value[type] !== void 0 ? value[type] : value;
    }

    function visible () { return ul.className.indexOf('sey-show') !== -1; }
    function hidden (li) { return li.className.indexOf('sey-hide') !== -1; }
    
    function showItem(li) {
      if (hidden(li) && limit > showCounter) {
        li.className = li.className.replace(/ sey-hide/g, '');
        showCounter ++;
      }
    }

    function hideItem(li) {
      if (!hidden(li)) {
        li.className += ' sey-hide';
        showCounter --;
        if (selection === li) {
          selectFirst();
        }
      }
    }

    // show ul
    function show () {
      if (! visible()) {
        ul.className += ' sey-show';
      }
    }

    function hide () {
      ul.className = ul.className.replace(/ sey-show/g, '');
      lis.forEach(function(li) {
        hideItem(li.li);
      });
      
      selection = null;
      showCounter = 0;
      firstShowLi = null;
    }

    function add (suggestion) {
      var li = tag('li', 'sey-item sey-hide');
      li.innerText = li.textContent = getText(suggestion);
      ul.appendChild(li);
      li.onclick = function() { // add select event
        onSelected(li, suggestion);
        hide();
      };
      return li;
    }
    function clear () {
      while (ul.lastChild) {
        ul.removeChild(ul.lastChild);
      }
    }

    function selectFirst() {
      if (firstShowLi) {
        select(firstShowLi.li);
      }
    }

    // select one li
    function select (li) {
      unselect();
      if (li) {
        selection = li;
        selection.className += ' sey-selected';
      }
    }

    function unselect () {
      if (selection) {
        selection.className = selection.className.replace(/ sey-selected/g, '');
        selection = null;
      }
    }

    function selectNext() {
      if (selection) {
        var next = selection.nextSibling;
        while (next) {
          if (next) {
            if (! hidden(next)) {
              select(next);
              break;
            }
            else {
              next = next.nextSibling;
            }
          }
          else {
            break;
          }
        }
      }
      else {
        selectFirst();
      }
    }

    function selectPrev() {
      if (selection) {
        var next = selection.previousSibling;
        while (next) {
          if (next) {
            if (! hidden(next)) {
              select(next);
              break;
            }
            else {
              next = next.previousSibling;
            }
          }
          else {
            break;
          }
        }
      }
      else {
        selectFirst();
      }
    }

    function tag (type, className) {
      var el = document.createElement(type);
      el.className = className;
      return el;
    }

    function onkeydown(e) {
      var which = e.which || e.keyCode;
      if (which === KEY_DOWN) {
        stop(e);
      } 
      else if (which === KEY_UP) {
        stop(e);
      }
      else if (which === KEY_ENTER) {
        stop(e);
      }
    }
    function onkeyup (e) {
      var shown = visible();
      var which = e.which || e.keyCode;
      if (shown && which === KEY_DOWN) {
        selectNext();
        stop(e);
      } 
      else if (shown && which === KEY_UP) {
        selectPrev();
        stop(e);
      }
      else if (shown && which === KEY_ESC) {
        hide();
        stop(e);
      }
      else if (shown && which === KEY_ENTER) {
        if (selection) {
          selection.click();
          hide();
        }
        stop(e);
      }
      else {
        filter();
      }
    }

    function stop (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    function defaultSelectEvent(li, suggestion) {
      el.value = getValue(suggestion);
    }
    // https://github.com/bevacqua/fuzzysearch/blob/master/index.js
    function fuzzysearch (needle, haystack) {
      var hlen = haystack.length;
      var nlen = needle.length;
      if (nlen > hlen) {
        return false;
      }
      if (nlen === hlen) {
        return needle === haystack;
      }
      outer: for (var i = 0, j = 0; i < nlen; i++) {
        var nch = needle.charCodeAt(i);
        while (j < hlen) {
          if (haystack.charCodeAt(j++) === nch) {
            continue outer;
          }
        }
        return false;
      }
      return true;
    }
    function eleX(elem) {
     return elem.offsetParent ? elem.offsetLeft + eleX(elem.offsetParent) : elem.offsetLeft;
    }

    function eleY(elem) {
       return elem.offsetParent ? elem.offsetTop + eleY(elem.offsetParent) : elem.offsetTop;
    }

    function eleHeight(elem) {
      return elem.clientHeight || elem.offsetHeight;
    }
  }
  return horse;
});