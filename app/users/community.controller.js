angular.module('dvelopioApp')
  .controller('CommunityCtrl', function($state, Auth, Users, profile) {
    var communityCtrl = this;

    communityCtrl.profile = profile;

    communityCtrl.getDisplayName = Users.getDisplayName;
    communityCtrl.getGravatar = Users.getGravatar;

    communityCtrl.users = Users.all;

    Users.setOnline(profile.$id);

    communityCtrl.logout = function() {
      communityCtrl.profile.online = null;
      communityCtrl.profile.$save().then(function () {
        Auth.$unauth();
        $state.go('home');
      });
    };

  })

  .filter("multiWordFilter", function($filter){
    return function(inputArray, searchText){
        var wordArray = searchText ? searchText.toLowerCase().split(/\s+/) : [];
        var wordCount = wordArray.length;
        for(var i=0; i<wordCount; i++){
            inputArray = $filter('filter')(inputArray, wordArray[i]);
        }
        return inputArray;
    };
  })