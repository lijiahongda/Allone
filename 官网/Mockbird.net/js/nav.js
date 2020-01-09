(function () {
     var nav = _$('#nav li()', 'n').end();
     var as = _$('#nav a()').end();
     for (var i = 0; i < as.length; i++) {
          if (as[i].href == window.location.href) _$('[n]').eq(i).clas('add', 'hac')
     }

})();