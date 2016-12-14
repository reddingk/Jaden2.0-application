components.component('home', {
  bindings: {},
	controller: function ($state, jInfo) {
      var vm = this;
      vm.currentUser = jInfo.user.getCurrent();

      var chipsLib = jInfo.chips.library();

      /* Functions */
      vm.getChipTemplate = function(name){
        if(chipsLib[name] != undefined){
          return chipsLib[name].template;
        }
        else {
          return chipsLib.default.template;
        }
      }

      vm.jigsaw = function(chips){
        // Set Chip Settings
        for(var i=0; i < chips.length; i++){
          if(chipsLib[chips[i].name] != undefined){
            chips[i].settings = chipsLib[chips[i].name];
          }
          else {
            chips[i].settings = chipsLib.default;
          }
        }
        // adjust chips
        var tmpChips = chips;
        var jigsawChips = [];
        var rowLength = 0;

        while(tmpChips.length > 0){
          if(jigsawChips.length == 0 || rowLength == 0){
            rowLength += tmpChips[0].settings.size;
            jigsawChips.push(tmpChips[0]);
            tmpChips.splice(0,1);
          }
          else {
            rowLength = (rowLength >= 5 ? 0 : rowLength);
            // find next piece
            // check for piece size
            var pSize = -1;
            for(var j= (5 - rowLength); j > 0; j--){
              var validPieces = $.grep(tmpChips, function(e){ return e.settings.size == j });
              if(validPieces.length > 0){
                pSize = j;
                break;
              }
            }
            if(pSize > 0) {
              //find piece with size
              for(var i =0; i < tmpChips.length; i++){
                if(tmpChips[i].settings.size == pSize){
                  rowLength += tmpChips[i].settings.size;
                  jigsawChips.push(tmpChips[i]);
                  tmpChips.splice(i,1);
                  break;
                }
              }
            }
            else {
              rowLength = 0;
            }

          }
        }
        return jigsawChips;
      }

      vm.userChips = vm.jigsaw(vm.currentUser.chips);

   },
   templateUrl: 'views/home.html'
});
