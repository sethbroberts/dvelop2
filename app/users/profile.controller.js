angular.module('dvelopioApp')
  .controller('ProfileCtrl', function($state, md5, auth, profile, Auth) {
    var profileCtrl = this;

    profileCtrl.profile = profile;

    profileCtrl.updateProfile = function() {
      profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
      profileCtrl.profile.$save().then(function() {
        $state.go('community');
      });
    };

    profileCtrl.logout = function() {
      profileCtrl.profile.online = null;
      profileCtrl.profile.$save().then(function () {
        Auth.$unauth();
        $state.go('home');
      });
    };    

  });