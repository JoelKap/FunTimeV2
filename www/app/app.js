var app = angular.module('FT', ["ionic", "ngCordova", "firebase", "ngStorage"])
app.constant('firebaseUrl', 'https://fun-time-9c827.firebaseio.com');
app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.keyboard) {
            cordova.plugins.keyboard.hideKeyboardAccessoryBar(true)
            alert('inside plugings')
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})



app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    var viewBase = 'app/components/'
    var viewBaseOwner = 'app/components/owner/'
    var viewBaseUser = 'app/components/User/'
    $ionicConfigProvider.tabs.position('bottom');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        // setup an abstract state for the tabs directive
        .state('tab', {
            abstract: true,
            url: '/tab',
            templateUrl: 'app/tabs/tab.html'
        })

        .state('tab.home', {
            url: '/home',
            views: {
                "tab-home": {
                    templateUrl: viewBase + 'home/home.html'
                },
            }
        })

        .state('tab.special', {
            url: '/special',
            views: {
                "tab-special": {
                    templateUrl: viewBase + 'special/special.html'
                }
            }
        })
        .state('tab.event', {
            url: '/event',
            views: {
                'tab-event': {
                    templateUrl: viewBase + 'event/event.html',
                }
            }
        })
        .state('tab.registration', {
            url: '/registration',
            views: {
                "tab-registration": {
                    templateUrl: viewBase + 'registration/registration.html'
                }
            }
        })
        .state('tab.login', {
            url: '/login',
            views: {
                "tab-login": {
                    templateUrl: viewBase + 'login/login.html'
                }
            }
        })
        .state('app', {
            cache: false,
            abstract: true,
            url: '/app',
            templateUrl: 'app/sideMenuLayout/layout.html'
        })
        .state('app.owernerBusiness', {
            url: '/owernerBusiness',
            views: {
                'menuContent': {
                    templateUrl: viewBaseOwner + 'business/business.html'
                }
            }
        })
        .state('app.businessDetails', {
            url: '/businessDetails',
            views: {
                'menuContent': {
                    templateUrl: viewBaseOwner + 'business/businessDetails/businessDetail.html'
                }
            }
        })
        .state('app.businessAddEdit', {
            url: '/addEdit',
            views: {
                'menuContent': {
                    templateUrl: viewBaseOwner + 'business/businessAddEdit/businessAddEdit.html'
                }
            }
        })
        .state('app.account', {
            url: '/account',
            views: {
                'menuContent': {
                    templateUrl: viewBaseOwner + 'account/account.html'
                }
            }
        })
        .state('app.employee', {
            url: '/employee',
            views: {
                'menuContent': {
                    templateUrl: viewBaseOwner + 'employee/employee.html'
                }
            }
        })
        .state('app.special', {
            url: '/special',
            views: {
                "menuContent": {
                    templateUrl: viewBaseOwner + 'special/special.html'
                }
            }
        })
        .state('app.specialAddEdit', {
            url: '/specialAddEdit',
            views: {
                "menuContent": {
                    templateUrl: viewBaseOwner + 'special/specialAddEdit/specialAddEdit.html'
                }
            }
        })
        .state('app.specialDetails', {
            url: '/specialDetails',
            views: {
                "menuContent": {
                    templateUrl: viewBaseOwner + 'special/specialDetails/specialDetails.html'
                }
            }
        })
        .state('app.item', {
            url: '/item',
            views: {
                "menuContent": {
                    templateUrl: viewBaseOwner + 'item/item.html'
                }
            }
        })
        .state('app.event', {
            url: '/event',
            views: {
                'menuContent': {
                    templateUrl: viewBaseOwner + 'event/event.html'
                }
            }
        })
        .state('app.eventDetails', {
            url: '/eventDetails',
            views: {
                'menuContent': {
                    templateUrl: viewBaseOwner + 'event/eventDetails/eventDetails.html'
                }
            }
        })
        .state('app.eventAddEdit', {
            url: '/eventAddEdit',
            views: {
                'menuContent': {
                    templateUrl: viewBaseOwner + 'event/eventAddEdit/eventAddEdit.html'
                }
            }
        })
        .state('loc', {
            cache: false,
            abstract: true,
            url: '/loc',
            templateUrl: 'app/locTabs/locTab.html'
        })
        .state('loc.details', {
            url: '/details',
            views: {
                'loc-details': {
                    templateUrl: viewBase + 'locationDetails/locationDetails.html'
                }
            }
        })
        .state('loc.map', {
            url: '/map',
            views: {
                'loc-map': {
                    templateUrl: viewBase + 'location/location.html',
                }
            }
        })
        .state('user', {
            abstract: true,
            cache: false,
            url: '/user',
            templateUrl: 'app/userSideMenuLayout/userSideMenu.html'
        })
        .state('user.event', {
            url: '/event',
            views: {
                'menuContent': {
                    templateUrl: viewBaseUser + 'UserEvent/userEvent.html'
                }
            }
        })
        .state('user.item', {
            url: '/item',
            views: {
                'menuContent': {
                    templateUrl: viewBaseUser + 'Purchase/purchase.html'
                }
            }
        })
        .state('user.eventDetails', {
            url: '/eventDetails',
            views: {
                'menuContent': {
                    templateUrl: viewBaseUser + 'UserEvent/EventDetails/EventDetails.html'
                }
            }
        })
        .state('user.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: viewBaseUser + 'UserProfile/userProfile.html'
                }
            }
        })
        .state('user.account', {
            url: '/account',
            views: {
                'menuContent': {
                    templateUrl: viewBaseUser + 'UserAccount/userAccount.html'
                }
            }
        })

    // Each tab has its own nav history stack:

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');
    //$urlRouterProvider.otherwise('/app/owernerBusiness');

});