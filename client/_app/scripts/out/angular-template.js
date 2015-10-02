angular.module('GiftStarterApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/views/home/home.html',
    "We will be moving all views out of scripts and into views. In due time."
  );


  $templateCache.put('/views/is/is.html',
    ""
  );


  $templateCache.put('/views/join/join-form.html',
    "<div class=\"userlogin__form\">\n" +
    "    <h4>Create account with email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doCreateEmail()\" class=\"create_action\">\n" +
    "        <input class=\"userlogin__name\" type=\"text\" name=\"name\" ng-model=\"$parent.name\" placeholder=\"First Name\" required /><br/>\n" +
    "        <input class=\"userlogin__surname\" type=\"text\" name=\"surname\" ng-model=\"$parent.surname\" placeholder=\"Last Name\" required /><br/>\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Email Address\" required /><br/>\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red create_action\" ng-disabled=\"$parent.working\">Create account</button>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('/views/join/join.html',
    "<div class=\"userlogin\" ng-controller=\"LoginOrCreateController\">\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-show=\"showCreate\">\n" +
    "        <ng-include src=\"'/views/join/join-form.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Already have an account? </span>\n" +
    "            <span><a ng-href=\"/login\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"vertical-line-block\">\n" +
    "        <div class=\"vertical-line\" ng-show=\"showSocials\"/>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__sociallogin login-block\" ng-show=\"showSocials\">\n" +
    "        <h4>Or {{showCreate?\"create account\":\"login\"}} with social media:</h4>\n" +
    "        <div class=\"social\">\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\"><img class=\"social__icons\" src=\"/assets/login/facebook.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\"><img class=\"social__icons\" src=\"/assets/login/twitter.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\"><img class=\"social__icons\" src=\"/assets/login/linkedin.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\"><img class=\"social__icons\" src=\"/assets/login/google.png\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showCreate\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<script>\n" +
    "    function handlePopupClosed() {\n" +
    "        angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "    }\n" +
    "</script>"
  );


  $templateCache.put('/views/join/onboard.html',
    "<!--\n" +
    "To change this template use Tools | Templates.\n" +
    "-->\n" +
    "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\n" +
    "<html>\n" +
    "<head>\n" +
    "    <title></title>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "</body>\n" +
    "</html>"
  );


  $templateCache.put('/views/login/login-form.html',
    "<div class=\"userlogin__form\" ng-hide=\"$parent.showForgot || $parent.showReset\">\n" +
    "    <h4>Login with your email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doLoginEmail()\" class=\"login_action\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter your password\" required></div>\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=true\">Forgot password</a>\n" +
    "        <div class=\"userlogin__wrapper\">\n" +
    "            <!--<input class=\"userlogin__remember\" type=\"checkbox\" name=\"remember\" id=\"remember\">-->\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "\t\t<button class=\"userlogin__loginbtn ui right labeled icon button\" ng-class=\"$parent.working ? 'loading' : 'secondary'\" ng-disabled=\"$parent.working\">\n" +
    "  \t\t<i class=\"right arrow icon\"></i>\n" +
    "  \t\tLogin\n" +
    "\t\t</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showForgot\">\n" +
    "    <form ng-submit=\"$parent.doForgotPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn\" ng-disabled=\"$parent.working\">Get Password</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showReset\">\n" +
    "    <h4>Reset Your Password:</h4>\n" +
    "    <form ng-submit=\"$parent.doResetPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"hidden\" name=\"resetcode\" ng-model=\"$parent.resetCode\" placeholder=\"Enter the reset code\" required />\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter a New Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <!--<input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.reenterpassword\" placeholder=\"Re-enter the Password\" required>-->\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showReset=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red\" ng-disabled=\"$parent.working\">Change Password</button>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('/views/login/login.html',
    "<div class=\"userlogin\" ng-controller=\"LoginOrCreateController\">\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-show=\"showCreate\">\n" +
    "        <ng-include src=\"'/views/login/login-form.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"vertical-line-block\">\n" +
    "        <div class=\"vertical-line\" ng-show=\"showSocials\"/>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__sociallogin login-block\" ng-show=\"showSocials\">\n" +
    "        <h4>Or {{showCreate?\"create account\":\"login\"}} with social media:</h4>\n" +
    "        <div class=\"social\">\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\"><img class=\"social__icons\" src=\"/assets/login/facebook.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\"><img class=\"social__icons\" src=\"/assets/login/twitter.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\"><img class=\"social__icons\" src=\"/assets/login/linkedin.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\"><img class=\"social__icons\" src=\"/assets/login/google.png\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showCreate\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-href=\"/join\" class=\"userlogin__createacclink linky\">Join</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<script>\n" +
    "    function handlePopupClosed() {\n" +
    "        angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "    }\n" +
    "</script>"
  );


  $templateCache.put('/scripts/brandbar/brandbar.ng.html',
    "<div id=\"brandbar\">\n" +
    "    <div class=\"brandbox\"><a href=\"/search/sturtevants\"><img src=\"/assets/brandbar/sturtevants.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/butter+london\"><img src=\"/assets/brandbar/butterLondon.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/rei\"><img src=\"/assets/brandbar/rei.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/bhphoto\"><img src=\"/assets/brandbar/bhphoto.png\"></a></div>\n" +
    "    <div class=\"brandbox\"><a href=\"/search/amazon\"><img src=\"/assets/brandbar/amazon.png\"></a></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/button/giftstart-it-button.ng.html',
    "<div class=\"giftstart-it-button\">\n" +
    "    <a><h4>GiftStart It!</h4></a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/four-oh-four.ng.html',
    "<style>\n" +
    "    #four-oh-four {\n" +
    "        margin: 6em auto;\n" +
    "        text-align: center;\n" +
    "    }\n" +
    "    #four-oh-four h1.super {\n" +
    "        font-size: 4em;\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div id=\"four-oh-four\">\n" +
    "    <h1 class=\"super\">404</h1>\n" +
    "    <h2>Woops!  This page doesn't exist.</h2>\n" +
    "    <p><a href=\"/\">Here's a link to the home page!</a></p>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/scripts/giftideas/giftideas.ng.html',
    "<div id=\"giftideas\">\n" +
    "\n" +
    "    <div ng-show=\"product\" class=\"singleproduct\">\n" +
    "        <div class=\"head\">\n" +
    "            <div class=\"hero\">\n" +
    "                <img src=\"/assets/giftideas/category{{product.productImage}}\" alt=\"{{product.imageAltText}}\">\n" +
    "            </div>\n" +
    "            <div class=\"titles\">\n" +
    "                <div class=\"scrollbox\">\n" +
    "                    <h2 class=\"textleft\"><span ng-bind-html=\"product.productName\"></span></h2>\n" +
    "                    <h3 class=\"textleft\">${{product.productPrice}}</h3>\n" +
    "                    <p class=\"textleft\"><span ng-bind-html=\"product.productDescription\"></span></p>\n" +
    "                </div>\n" +
    "                <div class=\"gsbuttons\">\n" +
    "                    <button ng-click=\"goToLink(product.giftStartLink)\" target=\"_self\" class=\"primary gsbutton\" ng-show=\"product.hasPrice\">GIFTSTART IT!</button>\n" +
    "                    <button onclick=\"olark('api.box.expand')\" class=\"primary gsbutton\" ng-show=\"!product.hasPrice\">CONTACT THE GIFT CONCIERGE</button>\n" +
    "                    <div ng-show=\"product.hasPrice\" class=\"saveforlater\">\n" +
    "                        <button ng-click=\"saveGiftIdeaForLater(product);\" class=\"primary gsbutton\" ng-show=\"product.hasPrice\">Save for Later <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "                        <div class=\"product-message\" ng-bind-html=\"productMessage\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"category\" class=\"products\">\n" +
    "        <div class=\"head\" ng-show=\"!product\">\n" +
    "            <div class=\"hero\">\n" +
    "                <img src=\"/assets/giftideas/category/{{category.categorySlug}}.jpg\" alt=\"{{category.categorySlug}}\">\n" +
    "            </div>\n" +
    "            <div class=\"titles\">\n" +
    "                <h1><span ng-bind-html=\"category.categoryName\"></span></h1>\n" +
    "                <h4>Our Favorite Gifts & Most Popular GiftStarts</h4>\n" +
    "                <div><span ng-bind-html=\"category.categoryBlurb\"></span></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "        <div class=\"grid\">\n" +
    "            <div ng-repeat=\"group in groups\" class=\"group\" ng-class-odd=\"'left'\" ng-class-even=\"'right'\">\n" +
    "                <div ng-repeat=\"product in group\" ng-class=\"{'last':product==lastProduct&&group.length==1}\" class='tile' title=\"{{product.productNameStripped}}\"><a href=\"{{categoryPath}}/{{product.productSlug}}\"><img src=\"/assets/giftideas/category{{product.productThumb}}\" alt=\"{{product.imageAltText}}\" /><div class=\"tilelabel\"><span ng-bind-html=\"product.productNameShort\"></span><br/><span class=\"price\">${{product.productPrice}}</span></div></a></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <h1>Top Categories for Group Gifting</h1>\n" +
    "    <div class=\"grid categories\">\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/music\"><img src=\"/assets/giftideas/category/music.jpg\" alt=\"Music\"/><div class=\"tilelabel\">Music</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/luma\"><img src=\"/assets/giftideas/category/luma.png\" alt=\"Luma Diamonds\"/><div class=\"tilelabel\">Luma Diamonds</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/kids\"><img src=\"/assets/giftideas/category/kids.jpg\" alt=\"Kids\"/><div class=\"tilelabel\">Kids</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/home\"><img src=\"/assets/giftideas/category/home.jpg\" alt=\"Home\"/><div class=\"tilelabel\">Home</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/cute\"><img src=\"/assets/giftideas/category/cute.jpg\" alt=\"Cute\"/><div class=\"tilelabel\">Cute</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/baby\"><img src=\"/assets/giftideas/category/Baby.jpg\" alt=\"Baby\"/><div class=\"tilelabel\">Baby</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/forher\"><img src=\"/assets/giftideas/category/forHer.jpg\" alt=\"For Her\"/><div class=\"tilelabel\">For Her</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/forhim\"><img src=\"/assets/giftideas/category/forHim.jpg\" alt=\"For Him\"/><div class=\"tilelabel\">For Him</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/cool\"><img src=\"/assets/giftideas/category/cool.jpg\" alt=\"Cool\"/><div class=\"tilelabel\">Cool</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/office\"><img src=\"/assets/giftideas/category/office.jpg\" alt=\"Office\"/><div class=\"tilelabel\">Office</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/farewell\"><img src=\"/assets/giftideas/category/Farewell.jpg\" alt=\"Farewell\"/><div class=\"tilelabel\">Farewell</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/sympathy\"><img src=\"/assets/giftideas/category/sympathy.jpg\" alt=\"Sympathy\"/><div class=\"tilelabel\">Sympathy</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/beauty\"><img src=\"/assets/giftideas/category/beauty.jpg\" alt=\"Beauty\"/><div class=\"tilelabel\">Beauty</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/wine\"><img src=\"/assets/giftideas/category/wine.jpg\" alt=\"Wine\"/><div class=\"tilelabel\">Wine</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/butterlondon\"><img src=\"/assets/giftideas/category/butterLONDON.jpg\" alt=\"butter LONDON\"/><div class=\"tilelabel\">butter LONDON</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/petlovers\"><img src=\"/assets/giftideas/category/pet-lovers.jpg\" alt=\"Pet Lovers\"/><div class=\"tilelabel\">Pet Lovers</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/wedding\"><img src=\"/assets/giftideas/category/Wedding.jpg\" alt=\"Wedding\"/><div class=\"tilelabel\">Wedding</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/graduation\"><img src=\"/assets/giftideas/category/graduation.jpg\" alt=\"Graduation\"/><div class=\"tilelabel\">Graduation</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/red\"><img src=\"/assets/giftideas/category/red.jpg\" alt=\"Wear Red\"/><div class=\"tilelabel\">Wear Red</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/pisces\"><img src=\"/assets/giftideas/category/pisces.jpg\" alt=\"Pisces\"/><div class=\"tilelabel\">Pisces</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/patriots\"><img src=\"/assets/giftideas/category/Patriots.jpg\" alt=\"Patriots\"/><div class=\"tilelabel\">Patriots</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/seahawks\"><img src=\"/assets/giftideas/category/Seahawks.jpg\" alt=\"Seahawks\"/><div class=\"tilelabel\">Seahawks</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/employee\"><img src=\"/assets/giftideas/category/employee.jpg\" alt=\"Employee Appreciation\"/><div class=\"tilelabel\">Employee Appreciation</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/boss\"><img src=\"/assets/giftideas/category/Boss.jpg\" alt=\"Boss\"/><div class=\"tilelabel\">Boss</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/teacher\"><img src=\"/assets/giftideas/category/teacher.jpg\" alt=\"Teacher\"/><div class=\"tilelabel\">Teacher</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/electronics\"><img src=\"/assets/giftideas/category/electronics.jpg\" alt=\"Electronics\"/><div class=\"tilelabel\">Electronics</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group right\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/outdoors\"><img src=\"/assets/giftideas/category/outdoors.jpg\" alt=\"Outdoors\"/><div class=\"tilelabel\">Outdoors</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/green\"><img src=\"/assets/giftideas/category/green.jpg\" alt=\"Green and Organic\"/><div class=\"tilelabel\">Green and Organic</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"group left\">\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/military\"><img src=\"/assets/giftideas/category/Military.jpg\" alt=\"Military\"/><div class=\"tilelabel\">Military</div></a></div>\n" +
    "             <div class=\"tile\"><a target=\"_top\" href=\"/giftideas/giftcard\"><img src=\"/assets/giftideas/category/giftcard.jpg\" alt=\"Gift Cards\"/><div class=\"tilelabel\">Gift Cards</div></a></div>\n" +
    "        </div>\n" +
    "        <div class=\"clear\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftsgivenbar/giftsgivenbar.ng.html',
    "<div id=\"giftsgivenbar\" ng-controller=\"GiftsGivenBarController\">\n" +
    "    <h2>Gifts given through GiftStarter</h2>\n" +
    "    <span ng-repeat=\"campaign in campaigns\">\n" +
    "        <div ng-if=\"$index%6==0\"></div><div ng-class-even=\"'hidephone'\" class=\"giftbox\"><a ng-href=\"{{campaign.url}}\"><img ng-src=\"{{campaign.img}}\" title=\"{{campaign.title}}\"></a></div>\n" +
    "    </span>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow-new.ng.html',
    "<div class=\"static-pages\">\n" +
    "  <div id=\"new-pillow\" class=\"headerwrap\">\n" +
    "\n" +
    "    <h1>GIVE AN AMAZING GIFT</h1>\n" +
    "    <img src=\"/assets/welcome.png\" class=\"welcome\"><h1 id=\"welcome-gters\">{{referredFrom}}</h1>\n" +
    "    <p>Give amazing gifts you're proud to give, and they're happy to get. From a group or from yourself, we'll help make it happen.</p>\n" +
    "\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow-video.html',
    "<div class=\"gsintro-2\" ng-show=\"showIntroCopy\">\n" +
    "    <div id=\"pillow-wrapper\">\n" +
    "        <div id=\"pillow-header-copy\">\n" +
    "            <header class=\"welcome\">\n" +
    "                <img id=\"pillow-header-img\" src=\"/assets/welcomeBanner.png\">\n" +
    "            </header>\n" +
    "            <p id=\"pillow-copy\">GiftStarter helps friends and family come together to pitch in on bigger, better gifts!  You've already found a product to giftstart, well done!  All you need now is a compelling story, and you're ready to share this giftstart with your friends and family!</p>\n" +
    "        </div>\n" +
    "        <div id=\"pillow-video-div\">\n" +
    "            <iframe id=\"pillow-iframe\" src=\"//www.youtube.com/embed/tA2gcLIJYBU\" frameborder=\"0\" allowfullscreen></iframe>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<style>\n" +
    "    div.gsintro-2 {\n" +
    "        width: 120%;\n" +
    "        background-color: #f0f0f0;\n" +
    "        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);\n" +
    "        padding: 2em 15%;\n" +
    "        margin: 0 -10%;\n" +
    "        text-align: left;\n" +
    "    }\n" +
    "    #pillow-header-copy {vertical-align: top;}\n" +
    "    #pillow-header-img {width: 100%;}\n" +
    "    #pillow-copy {margin-bottom: 2em;}\n" +
    "    #pillow-iframe {width: 100%;}\n" +
    "\n" +
    "    @media screen and (min-width: 33em) {\n" +
    "        #pillow-header-img {width: 80%;}\n" +
    "        #pillow-wrapper {\n" +
    "            width: 30em;\n" +
    "            margin: 0 auto;\n" +
    "        }\n" +
    "        #pillow-iframe {height: 16.875em;}\n" +
    "    }\n" +
    "    @media screen and (min-width: 66em) {\n" +
    "        #pillow-wrapper {width: 62em;}\n" +
    "        #pillow-header-copy {\n" +
    "            display: inline-block;\n" +
    "            width: 30em;\n" +
    "            margin-right: 1.5em;\n" +
    "        }\n" +
    "        #pillow-video-div {\n" +
    "            display: inline-block;\n" +
    "            width: 30em;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "</style>"
  );


  $templateCache.put('/scripts/giftstart/brand-pillow/brand-pillow.html',
    "<div class=\"gsintro\" ng-show=\"showIntroCopy\">\n" +
    "    <h2>Hey There!</h2>\n" +
    "    <p>GiftStarter helps you and your friends/family get bigger, better gifts by getting everyone to pitch in.</p>\n" +
    "    <p class=\"copy\">By creating this GiftStart, you're on the way to delivering an awesome gift!  Just add a compelling story, create the GiftStart, and share with your loved ones!  Easy as pie. (Even easier, actually)</p>\n" +
    "    <p class=\"cancel-button\" ng-click=\"showIntroCopy = false\">Close</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/create/giftstart-create.html',
    "\n" +
    "<div class=\"create wrapper shipping\" id=\"giftstart-contact-wrapper\" ng-controller=\"GiftStartCreateController\">\n" +
    "\n" +
    "    <ng-include ng-show=\"fromReferral\" src=\"'/scripts/giftstart/brand-pillow/brand-pillow-video.html'\"></ng-include>\n" +
    "\n" +
    "    <div ng-hide=\"showLoginBox\">\n" +
    "        <div ng-show=\"isCreateStepTiles()\"><h2 class=\"state-title\">How many pitch-in pieces do you want?</h2><div class=\"state-subtitle\">Create Your Gifting Event: step 2 of 4</div></div>\n" +
    "        <div ng-show=\"isCreateStepStory()\"><h2 class=\"state-title\">Your Gifting Event</h2><div class=\"state-subtitle\">Create Your Gifting Event: step 3 of 4</div></div>\n" +
    "        <div ng-show=\"isCreateStepShipping()\"><h2 class=\"state-title\">Shipping Details</h2><div class=\"state-subtitle\">Create Your Gifting Event: step 4 of 4</div></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"block image\">\n" +
    "        <div class=\"image-container\">\n" +
    "            <gs-overlay giftstart=\"giftStart\" ng-class=\"{initialized: pitchInsInitialized}\" ng-click=\"selectionUpdated();\"></gs-overlay>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"block details\" ng-class=\"{submitting:isSubmittingData}\" id=\"giftstart-create-controls\">\n" +
    "\n" +
    "        <form name=\"campaignForm\" ng-hide=\"showLoginBox\" novalidate>\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepTiles()\" id=\"num-part-selection\">\n" +
    "                <div class=\"desc\"><strong>Things to consider:</strong><br />How many people do you think will pitch-in on the gift? How much do you think each person will pitch-in?<br />We recommend picking the smallest amount per piece because remember, a person can always buy more than one piece.</div>\n" +
    "                <div class=\"more-parts\">Add Pieces<br/><img class=\"linky\" ng-click=\"moreParts($event)\" src=\"/assets/circle_red_plus.png\"></div>\n" +
    "                <div class=\"fewer-parts-mobile\">Remove Pieces<br/><img class=\"linky\" ng-click=\"fewerParts($event)\" src=\"/assets/circle_red_minus.png\"></div>\n" +
    "                <span class=\"parts-control\"><span class=\"numtiles\"> {{x*y}} Pieces</span>\n" +
    "                <span class=\"money\" ng-hide=\"fetchingTaxRate\"> ${{ totalPrice/100/x/y | number : 2 }} <img class=\"loading\"  src=\"/assets/loading.gif\" ng-show=\"fetchingTaxRate\"/> each* <span class=\"tax-note\">(+tax)</span></span></span>\n" +
    "                <div class=\"fewer-parts\"><img class=\"linky\" ng-click=\"fewerParts($event)\" src=\"/assets/circle_red_minus.png\"><br/>Remove Pieces</div>\n" +
    "                <!-- button class=\"help float-right\" ng-click=\"help()\">Help</button -->\n" +
    "                <span class=\"disclaimer\">* Shipping is included.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepStory()\">\n" +
    "                <h2>1. What's the gifting event?</h2>\n" +
    "                <input type=\"text\"\n" +
    "                       id=\"campaign-title\"\n" +
    "                       name=\"title\"\n" +
    "                       placeholder=\"What's the occasion?\"\n" +
    "                       maxlength=\"140\"\n" +
    "                       ng-model=\"title\"\n" +
    "                       ng-focus=\"hideValidationError.title = true\"\n" +
    "                       ng-blur=\"hideValidationError.title = false\"\n" +
    "                       onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                       required=\"\"/>\n" +
    "                <label for=\"campaign-title\">140 character maximum.</label>\n" +
    "                <div ng-show=\"(campaignForm.$submitted || campaignForm.title.$touched || validationTrigger.createButtonClicked) && !hideValidationError.title\" class=\"errorWrapper\">\n" +
    "                    <div ng-show=\"campaignForm.title.$error.required\">\n" +
    "                        <div class=\"arrowUp\"></div>\n" +
    "                        <div class=\"errorMessage\">\n" +
    "                            Don't forget to name the gifting event!\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <h2>2. Describe your gifting event.</h2>\n" +
    "                <textarea id=\"campaign-description\"\n" +
    "                          name=\"description\"\n" +
    "                          placeholder=\"Who's the gift for? What's your relationship? Why this gift?\"\n" +
    "                          maxlength=\"500\"\n" +
    "                          ng-focus=\"hideValidationError.description = true\"\n" +
    "                          ng-blur=\"hideValidationError.description = false\"\n" +
    "                          ng-model=\"description\"\n" +
    "                          ng-blur=\"onDescriptionBlur()\"\n" +
    "                          required=\"\"></textarea>\n" +
    "                <label for=\"campaign-description\">500 character maximum (3-5 sentences)</label>\n" +
    "                <div ng-show=\"(campaignForm.$submitted || campaignForm.description.$touched || validationTrigger.createButtonClicked) && !hideValidationError.description\" class=\"errorWrapper\">\n" +
    "                    <div ng-show=\"campaignForm.description.$error.required\">\n" +
    "                        <div class=\"arrowUp\"></div>\n" +
    "                        <div class=\"errorMessage\">\n" +
    "                            Don't forget to describe it!\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"not-long-enough\" ng-hide=\"descriptionLongEnough\">\n" +
    "                    <p>Woah there! Looks like your GiftStart description is a bit short.  We know, brevity is the soul of wit - but how about we add to the story to get people more involved?  Here are a few questions for inspiration:</p>\n" +
    "                    <ul>\n" +
    "                        <li>Why does the recipient deserve this gift?</li>\n" +
    "                        <li>Is there a story behind the gift or why the recipient might need/want it?</li>\n" +
    "                        <li>What is special/awesome/interesting/unique about this product?</li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"email\">\n" +
    "                    <h2>3. Your Email Address</h2>\n" +
    "                    <input type=\"email\"\n" +
    "                           id=\"contact-email\"\n" +
    "                           placeholder=\"username@mail.com\"\n" +
    "                           name=\"gcEmail\"\n" +
    "                           ng-model=\"gcEmail\"\n" +
    "                           ng-focus=\"hideValidationError.gcEmail = true\"\n" +
    "                           ng-blur=\"hideValidationError.gcEmail = false\"\n" +
    "                           onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                           required=\"\">\n" +
    "                    <div ng-show=\"(campaignForm.$submitted || campaignForm.gcEmail.$touched || validationTrigger.createButtonClicked) && !hideValidationError.gcEmail\" class=\"errorWrapper\">\n" +
    "                        <div ng-show=\"campaignForm.gcEmail.$error.required\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Don't forget your email address!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"campaignForm.gcEmail.$error.email\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Your email address is invalid!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-show=\"isCreateStepShipping()\">\n" +
    "                <h2>1. Who is the Gift for?</h2>\n" +
    "                <!-- label>All prices include taxes, shipping, and handling, based on destination.</label -->\n" +
    "                <div class=\"shipping-details\">\n" +
    "                    <span class=\"name\">\n" +
    "                        <input type=\"text\"\n" +
    "                               placeholder=\"First and Last Name\"\n" +
    "                               ng-model=\"shippingName\"\n" +
    "                               name=\"shippingName\"\n" +
    "                               ng-focus=\"hideValidationError.shippingName = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingName = false\"\n" +
    "                               onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                               required=\"\" />\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingName.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingName \" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingName.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget recipient's name!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                    <span class=\"email\">\n" +
    "                        <input type=\"email\"\n" +
    "                               ng-model=\"shippingEmail\"\n" +
    "                               name=\"shippingEmail\"\n" +
    "                               placeholder=\"Email Address*\"\n" +
    "                               ng-focus=\"hideValidationError.shippingEmail = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingEmail = false\"\n" +
    "                               onkeypress=\"return event.keyCode!=13\"\n" +
    "                               required=\"\" />\n" +
    "                        <label>* Email will only be sent after the gift is received</label>\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingEmail.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingEmail\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingEmail.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget recipient's email address!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div ng-show=\"campaignForm.shippingEmail.$error.email\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Recipient's email address is invalid!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                    <h2>2. Where should the Gift be shipped?</h2>\n" +
    "                    <span class=\"state\">\n" +
    "                        <select class=\"state\"\n" +
    "                                ng-model=\"shippingState\"\n" +
    "                                name=\"shippingState\"\n" +
    "                                required=\"\"\n" +
    "                                ng-change=\"shippingChanged()\"\n" +
    "                                ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } }\"\n" +
    "                                ng-focus=\"hideValidationError.shippingState = true\"\n" +
    "                                ng-blur=\"hideValidationError.shippingState = false\"\n" +
    "                                onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                                >\n" +
    "                            <option value=\"\">State</option>\n" +
    "                            <option value=\"AK\">AK</option>\n" +
    "                            <option value=\"AL\">AL</option>\n" +
    "                            <option value=\"AR\">AR</option>\n" +
    "                            <option value=\"AZ\">AZ</option>\n" +
    "                            <option value=\"CA\">CA</option>\n" +
    "                            <option value=\"CO\">CO</option>\n" +
    "                            <option value=\"CT\">CT</option>\n" +
    "                            <option value=\"DC\">DC</option>\n" +
    "                            <option value=\"DE\">DE</option>\n" +
    "                            <option value=\"FL\">FL</option>\n" +
    "                            <option value=\"GA\">GA</option>\n" +
    "                            <option value=\"IA\">IA</option>\n" +
    "                            <option value=\"ID\">ID</option>\n" +
    "                            <option value=\"IL\">IL</option>\n" +
    "                            <option value=\"IN\">IN</option>\n" +
    "                            <option value=\"KS\">KS</option>\n" +
    "                            <option value=\"KY\">KY</option>\n" +
    "                            <option value=\"LA\">LA</option>\n" +
    "                            <option value=\"MA\">MA</option>\n" +
    "                            <option value=\"MD\">MD</option>\n" +
    "                            <option value=\"ME\">ME</option>\n" +
    "                            <option value=\"MI\">MI</option>\n" +
    "                            <option value=\"MN\">MN</option>\n" +
    "                            <option value=\"MO\">MO</option>\n" +
    "                            <option value=\"MS\">MS</option>\n" +
    "                            <option value=\"MT\">MT</option>\n" +
    "                            <option value=\"NC\">NC</option>\n" +
    "                            <option value=\"ND\">ND</option>\n" +
    "                            <option value=\"NE\">NE</option>\n" +
    "                            <option value=\"NH\">NH</option>\n" +
    "                            <option value=\"NJ\">NJ</option>\n" +
    "                            <option value=\"NM\">NM</option>\n" +
    "                            <option value=\"NV\">NV</option>\n" +
    "                            <option value=\"NY\">NY</option>\n" +
    "                            <option value=\"OH\">OH</option>\n" +
    "                            <option value=\"OK\">OK</option>\n" +
    "                            <option value=\"OR\">OR</option>\n" +
    "                            <option value=\"PA\">PA</option>\n" +
    "                            <option value=\"RI\">RI</option>\n" +
    "                            <option value=\"SC\">SC</option>\n" +
    "                            <option value=\"SD\">SD</option>\n" +
    "                            <option value=\"TN\">TN</option>\n" +
    "                            <option value=\"TX\">TX</option>\n" +
    "                            <option value=\"UT\">UT</option>\n" +
    "                            <option value=\"VA\">VA</option>\n" +
    "                            <option value=\"VT\">VT</option>\n" +
    "                            <option value=\"WA\">WA</option>\n" +
    "                            <option value=\"WI\">WI</option>\n" +
    "                            <option value=\"WV\">WV</option>\n" +
    "                            <option value=\"WY\">WY</option>\n" +
    "                        </select>\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingState.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingState\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingState.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget to add the state!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                    <span class=\"zip\">\n" +
    "                        <input type=\"text\"\n" +
    "                               class=\"zip\"\n" +
    "                               name=\"shippingZip\"\n" +
    "                               placeholder=\"Zip Code\"\n" +
    "                               minlength=\"5\" maxlength=\"5\"\n" +
    "                               ng-model=\"shippingZip\"\n" +
    "                               required=\"\"\n" +
    "                               ng-change=\"shippingChanged()\"\n" +
    "                               ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } }\"\n" +
    "                               ng-focus=\"hideValidationError.shippingZip = true\"\n" +
    "                               ng-blur=\"hideValidationError.shippingZip = false\"\n" +
    "                               onkeypress=\"return event.keyCode==13?false:true\" />\n" +
    "                        <div ng-show=\"(campaignForm.$submitted || campaignForm.shippingZip.$touched || validationTrigger.createButtonClicked) && !hideValidationError.shippingZip\" class=\"errorWrapper\">\n" +
    "                            <div ng-show=\"campaignForm.shippingZip.$error.required\">\n" +
    "                                <div class=\"arrowUp\"></div>\n" +
    "                                <div class=\"errorMessage\">\n" +
    "                                    Don't forget to add the zip!\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <div class=\"campaign-length\">\n" +
    "                    <h2>3. When do you need the gift to be delivered?</h2>\n" +
    "                    <label>Currently we only allow delivery dates less than 34 days away.</label>\n" +
    "                    <h4>Delivery Date <a class=\"button\" ng-click=\"changeDeliveryDate()\">CHANGE</a></h4>\n" +
    "                    <input ui-date\n" +
    "                           type=\"text\"\n" +
    "                           class=\"endDate\"\n" +
    "                           ng-model=\"deliveryDate\"\n" +
    "                           name=\"deliveryDate\"\n" +
    "                           placeholder=\"mm/dd/yyyy\"\n" +
    "                           ng-focus=\"hideValidationError.deliveryDate = true\"\n" +
    "                           ng-blur=\"hideValidationError.deliveryDate = false; deliveryDateChanged()\"\n" +
    "                           required=\"\">\n" +
    "                    <div ng-show=\"(campaignForm.$submitted || campaignForm.deliveryDate.$touched || validationTrigger.createButtonClicked) && !hideValidationError.deliveryDate\" class=\"errorWrapper\">\n" +
    "                        <div ng-show=\"campaignForm.deliveryDate.$error.required\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Please select a date!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"!dateChosenValid()\">\n" +
    "                            <div class=\"arrowUp\"></div>\n" +
    "                            <div class=\"errorMessage\">\n" +
    "                                Please select a date!\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <h4 ng-hide=\"dueDateEmpty()\">Campaign End Date <!--a class=\"button\" ng-click=\"changeDueDate = !changeDueDate\">CHANGE</a--></h4>\n" +
    "                    <p class=\"endDate-text\" ng-hide=\"dueDateEmpty()\">Your campaign will end on </p><h2 class=\"endDate-date\" ng-hide=\"dueDateEmpty()\">{{campaignEndDate.toDateString()}}</h2><p class=\"endDate-text\" ng-hide=\"dueDateEmpty()\">.</p>\n" +
    "                    <p id=\"endDate-comment\" ng-hide=\"dueDateEmpty()\">Your campaign needs to end at least 5 days before your delivery date.</p>\n" +
    "                    <div ng-show=\"changeDueDate\" class=\"endRange\" ng-class=\"{opaque: dueDateEmpty()}\" ui-date></div>\n" +
    "                </div>\n" +
    "                <div class=\"coupon-code\">\n" +
    "                    <h2>5. Do you have a promo code?</h2>\n" +
    "                    <input type=\"text\"\n" +
    "                           id=\"coupon\"\n" +
    "                           name=\"coupon\"\n" +
    "                           placeholder=\"Enter your code\"\n" +
    "                           maxlength=\"20\"\n" +
    "                           ng-model=\"coupon\"\n" +
    "                           ng-focus=\"hideValidationError.code = true\"\n" +
    "                           ng-blur=\"hideValidationError.code = false;\"\n" +
    "                           onkeypress=\"return event.keyCode==13?false:true\"\n" +
    "                           ng-change=\"priceChanged()\"/>\n" +
    "                </div>\n" +
    "                <div class=\"price-block\">\n" +
    "                    <h2>Price</h2>\n" +
    "                    <label>\n" +
    "                        Base price of the gift.\n" +
    "                        <input type=\"checkbox\" id=\"tooltip-checkbox\"/>\n" +
    "                        <label for=\"tooltip-checkbox\">\n" +
    "                            <span class=\"tooltip-icon\">\n" +
    "                                ?\n" +
    "                                <span class=\"tooltip\">\n" +
    "                                    The price of the gift at the time of creation will be used to determine the gift \"base price.\"\n" +
    "                                </span>\n" +
    "                            </span>\n" +
    "                        </label>\n" +
    "                    </label>\n" +
    "                    <div class=\"money\" id=\"price\">${{inputPrice}}</div>\n" +
    "                </div>\n" +
    "                <div class=\"total-price-block\">\n" +
    "                    <h2>Total Price</h2>\n" +
    "                    <label>Including all fees and taxes. Shipping is free!</label>\n" +
    "                    <div class=\"money\" ng-hide=\"fetchingTaxRate || !shippingDetailsSubmitted\">${{ totalPrice/100 | number : 2 }}</div><div class=\"money\" ng-hide=\"shippingDetailsSubmitted\">...</div><img class=\"loading\" src=\"/assets/loading.gif\" ng-show=\"fetchingTaxRate\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "        <div ng-show=\"showLoginBox\" class=\"login-box\">\n" +
    "            <h2>Log in or create an account:</h2>\n" +
    "            <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"progress-nav\" ng-hide=\"showLoginBox\">\n" +
    "        <div class=\"back-indicator\" ng-class=\"{'invisible': isCreateStepTiles()}\"><img id=\"giftstart-create-prev\" class=\"linky prev\" ng-click=\"prevStep()\" src=\"/assets/circle_black_lt.png\"><br/>PREVIOUS<br/>STEP</div>\n" +
    "        <div class=\"step-indicator\"><img src=\"/assets/circle_green_check.png\" alt=\"Find a gift\"/><br/>FIND<br/>A GIFT</div><img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" /><div class=\"step-indicator\"><img ng-hide=\"isCreateStepStory()||isCreateStepShipping()\" src=\"/assets/circle_black.png\" alt=\"Adjust the tiles\"/><img ng-show=\"isCreateStepStory()||isCreateStepShipping()\" src=\"/assets/circle_green_check.png\" class=\"linky\" ng-click=\"goToStep(1)\" alt=\"Adjust the pieces\" /><br/>Adjust<br/>the pieces</div><img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" /><div class=\"step-indicator\"><img ng-hide=\"isCreateStepShipping()\" src=\"/assets/circle_black.png\" alt=\"Tell the story\"/><img ng-show=\"isCreateStepShipping()\" src=\"/assets/circle_green_check.png\" class=\"linky\" ng-click=\"goToStep(2)\" alt=\"Tell the story\" /><br/>Tell the<br/>story</div><img class=\"step-indicator-divider\" src=\"/assets/hbar_black.png\" alt=\"Shipping datails\"/><div class=\"step-indicator\"><img src=\"/assets/circle_black.png\" /><br/>Shipping<br/>details</div>\n" +
    "        <button id=\"giftstart-create-next\" class=\"next primary\" ng-hide=\"isCreateStepShipping()\" ng-click=\"nextStep()\">NEXT STEP</button>\n" +
    "        <button id=\"giftstart-create-submit\" class=\"next primary create-campaign\" ng-show=\"isCreateStepShipping()\" ng-click=\"next()\">NEXT STEP</button><img ng-show=\"isSubmittingData\" class=\"loader\" src=\"/assets/loading_transparent.gif\">\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/funding-bar/funding-bar.html',
    "<div class=\"funding-bar wrapper\">\n" +
    "    <div class=\"bar-bg\"></div><div ng-style=\"{'width': pitchinBarProgress()}\" class=\"pi-bar\"></div><div ng-style=\"{'width': fundingBarProgress()}\" class=\"bar\"></div><div class=\"mask\"><img src=\"/assets/giftstart/mask.png\"/></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/giftstart.html',
    "<div class=\"giftstart wrapper\" ng-controller=\"GiftStartController\" >\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "        <div class=\"title\">\n" +
    "            <h1 class=\"title campaign-title\" ng-hide=\"editMode\">{{giftStart.title}}</h1>\n" +
    "            <input class=\"title\" ng-model=\"newTitle\" ng-show=\"editMode\"/>\n" +
    "            <span class=\"title edit\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "\n" +
    "        <div class=\"col2 block\" ng-hide=\"showLoginBox||showPayBox||showSignBox||showShareBox\">\n" +
    "            <div class=\"prodtitle\">\n" +
    "                <a ng-href=\"{{giftStart.product_url}}\" rel=\"nofollow\" class=\"title\" target=\"_blank\" ng-click=\"productLinkClicked();\" ng-mouseover=\"hideOverlay();\" ng-mouseleave=\"showOverlay();\" ng-show=\"giftStart.product_title\">{{giftStart.product_title}}</a>\n" +
    "            </div>\n" +
    "            <div class=\"description\">\n" +
    "                <span class=\"description edit\"><textarea class=\"description\" ng-model=\"newDescription\" ng-show=\"editMode\"></textarea></span>\n" +
    "                <span class=\"description makelinks\" ng-hide=\"editMode\" style=\"white-space: pre-line;\">{{giftStart.description}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"signature\">\n" +
    "                <p class=\"name\" ng-show=\"!editMode\">\n" +
    "                    <span class=\"signature__title\" ng-show=\" giftStart.gc_name \"> {{ giftStart.gc_name }} </span>\n" +
    "                </p>\n" +
    "                    <input class=\"gc-name\" ng-model=\"newGcName\" ng-show=\"editMode\"/>\n" +
    "                <a class=\"edit button linky\" ng-show=\"campaignEditable && !editMode && secondsLeft > 0 && !campaignComplete()\" ng-click=\"editMode=true;\">EDIT</a>\n" +
    "                <div class=\"save\"><button class=\"save\" ng-click=\"updateCampaign();\" ng-show=\"editMode\">Save</button><button class=\"save\" ng-click=\"editMode=false;\" ng-show=\"editMode\">X</button></div>\n" +
    "                <p ng-show=\"giftStart.gc_name.length > 0 || editMode\" class=\"gift-champion\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gift Champion</p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"overlay block\" Xng-class=\"{shrunk: showPayBox}\">\n" +
    "            <div class=\"image-upload\" ng-show=\"editMode\"><label>Upload New Image:  </label><input id=\"campaign-image-input\" type=\"file\" capture=\"camera\" accept=\"image/*\"/></div>\n" +
    "            <gs-overlay ng-class=\"{initialized: pitchInsInitialized}\" giftstart=\"giftStart\" ng-click=\"selectionUpdated();\"></gs-overlay>\n" +
    "            <div class=\"receipt-wrap\" ng-show=\"showPayBox\">\n" +
    "                <div class=\"receipt\">\n" +
    "                    <div class=\"receipt-tiles\">\n" +
    "                        <div class=\"img-wrap\" style=\"background-image:url('{{giftStart.product_img_url}}')\"></div>\n" +
    "                        <div class=\"info-tiles\">\n" +
    "                            <h2 class=\"num-tiles\">{{giftStart.nSelected}} PIECES</h2>\n" +
    "                            <h4 class=\"cost-tiles\">AT ${{getTileCost() / 100 | number : 2}} EACH</h4>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"receipt-total\">\n" +
    "                        <h4 class=\"purchase-total\">PURCHASE TOTAL: <h2 class=\"total-price\">${{giftStart.totalSelection / 100 | number : 2}}</h2></h4>\n" +
    "                        <p class=\"purchase-note\">Includes our gift concierge service, taxes, shipping, handling, and handmade card.</p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"login-box\" ng-show=\"showLoginBox\">\n" +
    "            <h2>Log in or create an account:</h2>\n" +
    "            <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"pay-box\" ng-show=\"showPayBox\">\n" +
    "            <h2>Payment Information:</h2>\n" +
    "            <p>We accept payment by Visa, MasterCard, Amex, or Discover.  Our payments are secure and processed by PayPal.</p>\n" +
    "            <ng-include src=\"'/scripts/pay/pay.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"sign-box\" ng-show=\"showSignBox\">\n" +
    "            <h2>Sign the Card:</h2>\n" +
    "            <p>Write a message to the recipient and we'll include it on the group card so they'll know part of this gift came from you. You know, giving credit where credit is due. We’re all about that.</p>\n" +
    "            <ng-include src=\"'/scripts/popover/note/note-popover.html'\"></ng-include>\n" +
    "        </div>\n" +
    "        <div class=\"share-box\" ng-show=\"showShareBox\">\n" +
    "            <h2>Share with Friends:</h2>\n" +
    "            <p>Your payment was successful! Thank you. You will receive an email shorty. In the meantime, you can invite friends to pitch in just like you did.</p>\n" +
    "            <a href=\"#share-panel\"><button class=\"pitch-in button green\" ng-click=\"showSharePanel(true)\" ng-hide=\"showShare\"><span>INVITE FRIENDS TO PITCH IN</span></button></a>\n" +
    "            <a href=\"\" ng-click=\"shareBox(false)\">SKIP THIS STEP</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--ng-include src=\"'/scripts/share/invite-pitchin.html'\"></ng-include-->\n" +
    "\n" +
    "        <div class=\"col2 block\" ng-hide=\"showLoginBox||showPayBox||showSignBox||showShareBox\">\n" +
    "            <div class=\"pitch-instructions\" ng-show=\"secondsLeft > 0 && !campaignComplete()\">\n" +
    "                <div class=\"ordinal_circle\"><span class=\"ordinal\">1</span></div><h4> CLICK ON THE PIECES YOU WANT TO PURCHASE</h4><br/>\n" +
    "                <div class=\"ordinal_circle\"><span class=\"ordinal\">2</span></div><h4> PITCH IN!</h4>\n" +
    "            </div>\n" +
    "            <button class=\"pitch-in button red\" ng-show=\"secondsLeft > 0 && !campaignComplete()\" ng-class=\"{disabled: giftStart.totalSelection == 0}\" ng-click=\"pitchIn()\" ng-mouseover=\"pitchInHoverCallback()\" title=\"{{pitchinButtonHoverMessage}}\">PAY ${{giftStart.totalSelection / 100 | number : 2}} NOW</button>\n" +
    "\n" +
    "            <div class=\"giftstart-this\" ng-show=\"secondsLeft <= 0 || campaignComplete()\">\n" +
    "                Would you like to give this gift to someone you know?  Click the button below to start your own campaign for this gift.<br/>\n" +
    "                <a class=\"giftstart-this-link\" target=\"_self\" href=\"{{giftstartThisUrl()}}\"><button class=\"pitch-in button primary\">GIFTSTART IT</button></a>\n" +
    "                <div class=\"saveforlater\">\n" +
    "                    <button class=\"pitch-in button green\" ng-click=\"saveProdForLater();\">SAVE FOR LATER <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "                    <div class=\"product-message\" ng-bind-html=\"productMessage\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <a href=\"#share-panel\"><button class=\"pitch-in button green\" ng-click=\"showSharePanel(true)\" ng-hide=\"showShare\"><span ng-hide=\"secondsLeft <= 0 || campaignComplete()\">INVITE FRIENDS TO PITCH IN</span><span ng-show=\"secondsLeft <= 0 || campaignComplete()\">SHARE THIS CAMPAIGN</span></button></a>\n" +
    "            <!--div class=\"invite block\">\n" +
    "                <h3 class=\"black invite-friends\">Share This Campaign With Friends!</h3>\n" +
    "                <img class=\"share\" src=\"/assets/envelope.png\" ng-click=\"emailShare();\" />\n" +
    "                <img class=\"share\" src=\"/assets/facebookicon.png\" ng-click=\"facebookShare();\"/>\n" +
    "                <img class=\"share\" src=\"/assets/twittericon.png\" ng-click=\"twitterShare();\" />\n" +
    "                <img class=\"share\" src=\"/assets/googleicon.png\" ng-click=\"googlePlusShare();\" /><br/>\n" +
    "                Or share this link:\n" +
    "                <input id=\"share-url\" type=\"text\" value=\"{{campaignUrl()}}\" gs-copy-url readonly/>\n" +
    "            </div-->\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"fullwidth block fullwidth--last\">\n" +
    "        <div class=\"prices block\">\n" +
    "            <gs-funding-bar></gs-funding-bar>\n" +
    "            <div class=\"price funded\">\n" +
    "                <h2><span class=\"giftstart product contribution\">{{giftStart.nBought}}</span> Pieces</h2>\n" +
    "                <h4>Gifted</h4>\n" +
    "            </div>\n" +
    "            <div class=\"price remaining\">\n" +
    "                <h2><span class=\"giftstart product remaining\">{{giftStart.nTotal-giftStart.nBought}}</span> Pieces</h2>\n" +
    "                <h4>Remaining</h4>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"completion block\">\n" +
    "            <p>This campaign ends {{giftStart.deadline*1000 | date:\"MMMM d 'at' ha PST\" : 'PST'}}</p>\n" +
    "            <div><h2 class=\"countdown\" ng-class=\"{danger: (secondsLeft < 86400) && (secondsLeft <= 0)}\">{{countdown}}</h2><h4 ng-hide=\"secondsLeft <= 0 || campaignComplete()\">Left for Pitch-ins</h4></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"share-panel\">\n" +
    "        <a id=\"closebtn\" href=\"\" ng-show=\"showShare\" ng-click=\"showSharePanel(false)\">CLOSE</a>\n" +
    "        <ng-include src=\"'/scripts/share/invite-pitchin.html'\" ng-show=\"showShare\"></ng-include>\n" +
    "    </div>\n" +
    "\n" +
    "    <hr />\n" +
    "\n" +
    "    <gs-thanks></gs-thanks>\n" +
    "    <div class=\"groupcard\">\n" +
    "        <div class=\"title title--groupcard\">\n" +
    "            <h2 class=\"title__name\">Group Card</h2>\n" +
    "            <span class=\"title__catchline\">To sign the card, first pitch-in by purchasing some pieces above</span>\n" +
    "        </div>\n" +
    "        <div ng-repeat-start=\"pitchIn in pitchIns | orderBy:'-timestamp' track by $index\" class=\"h--hide\"></div>\n" +
    "        <div class=\"contributors {{randomColor($index)}}\">\n" +
    "            <div class=\"contributors__titleblock {{randomColor($index)}}\"></div>\n" +
    "            <div class=\"contributors__figure\">\n" +
    "                <a class=\"contributors__link\" ng-href=\"/users/{{pitchIn.uid}}\" ng-hide=\"isEditing(pitchIn) && picEdit\">\n" +
    "                    <img class=\"contributors__img\" ng-src=\"{{pitchIn.img}}\" />\n" +
    "                </a>\n" +
    "                <a class=\"userprofile__imageedit button\" ng-show=\"isEditing(pitchIn) && !picEdit\" ng-click=\"setPicEdit(true)\">Change photo</a>\n" +
    "                <gs-image-upload ng-show=\"isEditing(pitchIn) && picEdit\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <a class=\"userprofile__imagesave button\" ng-click=\"picSubmit()\" ng-show=\"isEditing(pitchIn) && picEdit\">Save</a>\n" +
    "            </div>\n" +
    "            <div class=\"contributors__info\">\n" +
    "                <h4 class=\"contributors__name\" ng-show=\"!isEditing(pitchIn)\">{{pitchIn.name}}</h4>\n" +
    "                <input type=\"text\" ng-model=\"pitchIn.name\" ng-show=\"isEditing(pitchIn)\" placeholder=\"Name\"/>\n" +
    "                <p class=\"contributors__info\" ng-show=\"!isEditing(pitchIn)\">{{pitchIn.note}}</p>\n" +
    "                <textarea ng-model=\"pitchIn.note\" ng-show=\"isEditing(pitchIn)\" placeholder=\"Comment\"/>\n" +
    "                <p id=\"textcount\" ng-show=\"isEditing(pitchIn)\">{{230 - pitchIn.note.length}}</p>\n" +
    "            </div>\n" +
    "            <div class=\"contributors__edit\">\n" +
    "                <a class=\"contributors__edit__button button\" ng-show=\"pitchIn.uid == userId && !isEditing(pitchIn) && commentEditing.length == 0\" ng-click=\"editingComment(pitchIn, true)\">EDIT</a>\n" +
    "                <a class=\"contributors__edit__button button\" ng-show=\"isEditing(pitchIn)\" ng-click=\"cancelEditComment(pitchIn)\">CANCEL</a>\n" +
    "                <button class=\"contributors__edit__button savebtn red\" ng-show=\"isEditing(pitchIn)\" ng-disabled=\"picUploading || pitchIn.note.length > 230 || pitchIn.name.length > 38 || pitchIn.name.length < 1\" ng-click=\"editingComment(pitchIn, false)\">SAVE</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-repeat-end class=\"h--hide\"></div>\n" +
    "        <p class=\"nocontributors\" ng-hide=\"pitchIns.length > 0\">No contributors yet - be the first one on the card!</p>\n" +
    "    </div>\n" +
    "    <div ng-show=\"secondsLeft <= 0 || campaignComplete()\" class=\"btn btn--pdf\">\n" +
    "        <a href=\"\" ng-click=\"toPDFPage()\" class=\"btn__link\">\n" +
    "            View Card PDF\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/giftstart/overlay/overlay.html',
    "<div class=\"overlay\" style=\"background-image: url({{giftstart.product_img_url}})\">\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/print/print.html',
    "<div class=\"giftstart wrapper\" ng-controller=\"GiftStartController\">\n" +
    "\n" +
    "    <div class=\"fullwidth block\">\n" +
    "        <div class=\"title\">\n" +
    "            <h2 class=\"title\" ng-hide=\"editMode\">{{giftStart.title}}</h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"fullwidth\">\n" +
    "\n" +
    "        <div class=\"col2 block\">\n" +
    "            <h3 class=\"title\" target=\"_blank\">\n" +
    "                {{giftStart.product_title}}</h3>\n" +
    "\n" +
    "            <div class=\"desc\">\n" +
    "                GiftStarter is a Gifting Experience Service. Our mission is to focus on the gifting experience, using\n" +
    "                technology as an enabler. We enable the experience that captures giving between the recipient and those\n" +
    "                that give.<br/><br/>\n" +
    "\n" +
    "                Search for and select a product using the search bar on the homepage, fill out the GiftStart information\n" +
    "                to share your story on why this is important to you or your gift recipient, and bring others along on\n" +
    "                the giving journey. We let your family and friends choose their pieces of the gift to give, we send an\n" +
    "                awesome hand-crafted group card to remember the experience, and the gift too. <br/>\n" +
    "            </div>\n" +
    "            <div id=\"header-logo\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"overlay col2 block\">\n" +
    "            <div class=\"overlay\" style=\"background-image: url({{giftStart.product_img_url}})\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"groupcard\">\n" +
    "        <div class=\"contributor__description\">\n" +
    "            <p class=\"contributor__text\">\n" +
    "                {{giftStart.description}}\n" +
    "            </p>\n" +
    "\n" +
    "            <p class=\"name\">\n" +
    "                <span>\n" +
    "                   &mdash;&mdash;{{giftStart.gc_name}}\n" +
    "                </span>\n" +
    "            </p>\n" +
    "\n" +
    "            <p class=\"gift-champion\">\n" +
    "                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gift Champion\n" +
    "            </p>\n" +
    "        </div>\n" +
    "        <div class=\"contributor__link\">\n" +
    "            <p class=\"contributor__campaign\">\n" +
    "                View the Campaign\n" +
    "            </p>\n" +
    "            <gs-print-url class=\"contributor__href\"></gs-print-url>\n" +
    "        </div>\n" +
    "        <div class=\"groupcard__wrapper\">\n" +
    "            <div ng-repeat-start=\"pitchIn in pitchIns\"\n" +
    "                 ng-class=\"{true: 'contributors--row'}[$index % 3 == 0 && !$first]\"\n" +
    "                 class=\"contributors--pre h--hide\"></div>\n" +
    "            <div class=\"contributors {{randomColor($index)}}\" ng-class=\"{true: 'contributors--only'}[pitchIns.length == 1]\">\n" +
    "                <div class=\"contributors__titleblock {{randomColor($index)}}\"></div>\n" +
    "                <div class=\"contributors__figure\">\n" +
    "                    <!--<div class=\"img-border\">-->\n" +
    "                        <img class=\"contributors__img\" ng-src=\"{{pitchIn.img}}\"/>\n" +
    "                    <!--</div>-->\n" +
    "                </div>\n" +
    "                <div class=\"contributors__info\">\n" +
    "                    <h3 class=\"contributors__name\">{{pitchIn.name}}</h3>\n" +
    "\n" +
    "                    <p class=\"contributors__info\">{{pitchIn.note}}</p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div ng-repeat-end class=\"h--hide\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<style>\n" +
    "    html {\n" +
    "        background: #fff;\n" +
    "    }\n" +
    "\n" +
    "    * {\n" +
    "        font-family: Roboto, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    * a {\n" +
    "        font-size: 1em;\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Gotham;\n" +
    "        src: url('/assets/fonts/Gotham-Book.woff'), url('/assets/fonts/Gotham-Book.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Gotham;\n" +
    "        font-style: italic;\n" +
    "        src: url('/assets/fonts/Gotham-BookItalic.woff'), url('/assets/fonts/Gotham-BookItalic.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: \"Roboto Slab\";\n" +
    "        src: url('/assets/fonts/RobotoSlab-Thin-webfont.woff');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: \"Roboto Bold\";\n" +
    "        src: url('/assets/fonts/Roboto-Bold.woff'), url('/assets/fonts/Roboto-Bold.ttf');\n" +
    "    }\n" +
    "\n" +
    "    @font-face {\n" +
    "        font-family: Roboto;\n" +
    "        src: url('/assets/fonts/Roboto-Regular.woff');\n" +
    "    }\n" +
    "\n" +
    "    h3 {\n" +
    "        font: 400 1.25em \"Roboto\", sans-serif;\n" +
    "        color: #000;\n" +
    "    }\n" +
    "\n" +
    "    #habla_oplink_a,\n" +
    "    footer,\n" +
    "    .headerNav,\n" +
    "    .search,\n" +
    "    #header,\n" +
    "    .toast-wrapper,\n" +
    "    .h--hide,\n" +
    "    body > :last-child {\n" +
    "        display: none;\n" +
    "    }\n" +
    "\n" +
    "    #header-logo {\n" +
    "        background-image: url(/assets/GSlogo_web_large_reg.png);\n" +
    "        background-repeat: no-repeat;\n" +
    "        background-size: 238px 98px;\n" +
    "        width: 238px;\n" +
    "        height: 98px;\n" +
    "        position: relative;\n" +
    "        top: 0;\n" +
    "        left: 20px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard {\n" +
    "        width: 100% !important;\n" +
    "        margin: 0 !important;\n" +
    "        border-top: 1px solid #ccc;\n" +
    "    }\n" +
    "\n" +
    "    .overlay {\n" +
    "        display: block;\n" +
    "        margin-left: auto !important;\n" +
    "        margin-right: auto !important;\n" +
    "        height: 400px;\n" +
    "        background-size: 350px 400px;\n" +
    "        background-repeat: no-repeat;\n" +
    "    }\n" +
    "\n" +
    "    #angular-view {\n" +
    "        margin: 0;\n" +
    "    }\n" +
    "\n" +
    "    .col2 {\n" +
    "        margin-right: 0 !important;\n" +
    "        width: 50% !important;\n" +
    "        margin-right: 3%;\n" +
    "        float: right !important;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__link,\n" +
    "    .contributors__img,\n" +
    "    .contributor__description {\n" +
    "        display: inline-block;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__campaign {\n" +
    "        font-size: 21px;\n" +
    "        color: #ffffff;\n" +
    "        margin: 0 0 15px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard__wrapper {\n" +
    "        float: left;\n" +
    "        width: 96%;\n" +
    "        margin: 10px 2%;\n" +
    "    }\n" +
    "\n" +
    "    .desc {\n" +
    "        font-family: Roboto, sans-serif;\n" +
    "    }\n" +
    "\n" +
    "    /*.contributors__img {*/\n" +
    "        /*width: 47% !important;*/\n" +
    "        /*margin: 5% 25% !important*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    .contributor__description {\n" +
    "        width: 60%;\n" +
    "        margin-left: 3%;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__link {\n" +
    "        background: #238471;\n" +
    "        width: 32%;\n" +
    "        float: right;\n" +
    "        padding: 6% 0 7%;\n" +
    "        margin: 10px 2% 0 2%\n" +
    "    }\n" +
    "\n" +
    "    .contributor__href {\n" +
    "        color: #ffffff;\n" +
    "        text-decoration: none;\n" +
    "    }\n" +
    "\n" +
    "    .gift-champion {\n" +
    "        padding-left: 10px;\n" +
    "    }\n" +
    "\n" +
    "    .contributor__text,\n" +
    "    .name,\n" +
    "    .gift-champion {\n" +
    "        text-align: left !important;\n" +
    "    }\n" +
    "\n" +
    "    .fullwidth > .groupcard {\n" +
    "        display: block !important;\n" +
    "        border-top: 1px solid #ccc;\n" +
    "    }\n" +
    "\n" +
    "    .title--groupcard .title {\n" +
    "        margin-top: 25px;\n" +
    "    }\n" +
    "\n" +
    "    .title {\n" +
    "        color: black;\n" +
    "        text-align: center;\n" +
    "        border-radius: 25px;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard {\n" +
    "        clear: both;\n" +
    "        padding: 0;\n" +
    "        text-align: center;\n" +
    "        display: block;\n" +
    "        width: 92%;\n" +
    "        margin: 0 4% 5rem 4%;\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 667px) {\n" +
    "        .groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 375px) and (orientation: portrait) {\n" +
    "        .groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .title--groupcard {\n" +
    "        margin: 0 auto 5rem;\n" +
    "        /*display: table-caption;*/\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 667px) {\n" +
    "        .groupcard .title--groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (max-width: 375px) and (orientation: portrait) {\n" +
    "        .groupcard .title--groupcard {\n" +
    "            display: block;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .title__name {\n" +
    "        font-size: 3.2rem;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors {\n" +
    "        display: inline-block;\n" +
    "        width: 26% !important;\n" +
    "        vertical-align: top;\n" +
    "    }\n" +
    "\n" +
    "    @media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {\n" +
    "        .groupcard .contributors--row {\n" +
    "            display: none;\n" +
    "        }\n" +
    "    }\n" +
    "\n" +
    "    /*@media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--pre:nth-child(2n) {*/\n" +
    "            /*display: table-row;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (min-width: 376px) and (max-width: 768px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 50%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (max-width: 667px) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 100%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    /*@media only screen and (max-width: 375px) and (orientation: portrait) {*/\n" +
    "        /*.groupcard .contributors--only {*/\n" +
    "            /*width: 100%;*/\n" +
    "        /*}*/\n" +
    "    /*}*/\n" +
    "\n" +
    "    .groupcard .contributors__info {\n" +
    "        padding: 0 10% 3%;\n" +
    "        -webkit-hyphens: auto;\n" +
    "        -moz-hyphens: auto;\n" +
    "        -ms-hyphens: auto;\n" +
    "        hyphens: auto;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors__name {\n" +
    "        text-align: center;\n" +
    "    }\n" +
    "\n" +
    "    .groupcard .contributors__img {\n" +
    "        width: 100%;\n" +
    "        margin: 8% 0 1%;\n" +
    "        -webkit-border-radius: 50%;\n" +
    "        -moz-border-radius: 50%;\n" +
    "        -ms-border-radius: 50%;\n" +
    "        border: 6px solid #d6d6d6;\n" +
    "        border-radius: 50%;\n" +
    "        vertical-align: top;\n" +
    "    }\n" +
    "\n" +
    "    /*.img-border {*/\n" +
    "        /*border: 6px solid #d6d6d6;*/\n" +
    "        /*border-radius: 50%;*/\n" +
    "        /*width: 80%*/\n" +
    "    /*}*/\n" +
    "</style>\n"
  );


  $templateCache.put('/scripts/giftstart/thanks/thanked-campaigns.ng.html',
    "<div class=\"thanked-campaigns wrapper\" ng-repeat=\"campaign in campaigns\">\n" +
    "    <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\">\n" +
    "        <img class=\"thanks-image\" ng-src=\"{{campaign.thanks_img_url}}\"/>\n" +
    "    </a>\n" +
    "    <div class=\"description-container\">\n" +
    "        <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\">\n" +
    "            <h4 class=\"accent\">{{campaign.title}}</h4>\n" +
    "        </a>\n" +
    "        <p class=\"campaign-description\">{{campaign.thanks_message}}</p>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/giftstart/thanks/thanks.html',
    "<div class=\"thank-you block\" ng-show=\"thanks.editable || thanks.edit || thanks.message\">\n" +
    "    <!--<div class=\"thank-you block\">-->\n" +
    "    <div class=\"message\">\n" +
    "        <div class=\"show-message\" ng-hide=\"thanks.edit\">\n" +
    "            <h1>GiftStart Success!</h1>\n" +
    "            <h4>A Thank You From the Recipient:</h4>\n" +
    "            <p>{{thanks.message}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"edit-message\" ng-show=\"thanks.edit\">\n" +
    "            <h1>Say Thank You!</h1>\n" +
    "            <p>Say a few words of thanks to those who pitched in, we'll send them a link when you're finished, and you can share it on your favorite social sites:</p>\n" +
    "            <textarea ng-model=\"thanks.newMessage\"></textarea>\n" +
    "            <div class=\"profile-img\" ng-show=\"thanks.profileImageUrl\">\n" +
    "                <p>Logged in as:</p>\n" +
    "                <img ng-src=\"{{thanks.profileImageUrl}}\"/>\n" +
    "            </div>\n" +
    "            <div class=\"login-for-pic\" ng-hide=\"loggedIn\">\n" +
    "                <p>Login to add a profile picture!</p><button class=\"white-fill\" ng-click=\"thanks.showLogin()\">Login</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"image\">\n" +
    "        <img ng-src=\"{{thanks.imgUrl}}\" ng-show=\"thanks.imgUrl && !thanks.edit\"/>\n" +
    "        <gs-image-upload class=\"white-buttons\" ng-show=\"thanks.edit\" on-image-updated=\"thanks.imageUpdated\"></gs-image-upload>\n" +
    "    </div>\n" +
    "    <div class=\"buttons\">\n" +
    "        <button class=\"white-fill submit\" ng-show=\"thanks.edit\" ng-click=\"thanks.update();\">Say Thanks!</button><button class=\"edit white-border\" ng-show=\"thanks.editable && !thanks.edit\" ng-click=\"thanks.edit=true;\"><img class=\"edit\" src=\"/assets/edit_button_white.png\"/></button>\n" +
    "    </div>\n" +
    "    <button class=\"cancel\" ng-show=\"thanks.edit\" ng-click=\"thanks.edit=false;\">X</button>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/header/giftstart-it-header.ng.html',
    "<div class=\"giftstart-it-header\" ng-class=\"{shown: shown}\">\n" +
    "    <span>\n" +
    "        <p>Want to give this gift to someone you know?</p>\n" +
    "        <gs-it-button ng-click=\"linkClicked()\"></gs-it-button>\n" +
    "        <p class=\"cancel\" ng-click=\"hideButtonHeader()\">X</p>\n" +
    "    </span>\n" +
    "</div>\n" +
    "<div class=\"giftstart-it-header-padding\" ng-class=\"{shown: shown}\"></div>\n"
  );


  $templateCache.put('/scripts/header/subscribe-header.ng.html',
    "<div class=\"subscribe-header\">\n" +
    "    <span>\n" +
    "        <p>Hey! Join our email newsletter for <b>group gifting ideas and updates</b>!</p>\n" +
    "        <form action=\"//giftstarter.us8.list-manage.com/subscribe/post?u=9d503578c402cdc6d3fa96dd7&amp;id=c2e64310be\" method=\"post\" id=\"mc-embedded-subscribe-form-hdr\" name=\"mc-embedded-subscribe-form\" class=\"validate ng-pristine ng-valid\" target=\"_blank\" novalidate=\"\">\n" +
    "            <input type=\"email\" value=\"\" name=\"EMAIL\" class=\"email\" id=\"mce-EMAIL\" placeholder=\"Enter Email Address\" required=\"\">\n" +
    "            <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n" +
    "            <div style=\"position: absolute; left: -5000px;\"><input type=\"text\" name=\"b_9d503578c402cdc6d3fa96dd7_fdc0096ceb\" tabindex=\"-1\" value=\"\"></div>\n" +
    "            <button type=\"submit\" class=\"button\">Subscribe</button>\n" +
    "        </form>\n" +
    "    </span>\n" +
    "</div>\n" +
    "<div class=\"subscribe-header-padding\" ng-class=\"{shown: subscribeShow}\"></div>\n"
  );


  $templateCache.put('/scripts/home/giftstart-squares.ng.html',
    "<div id=\"giftstart-squares\">\n" +
    "    <div class=\"column one\"><a href=\"https://www.giftstarter.com/giftstart/Agnes-Christmas-gift\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/158.jpeg');\"><p>Agnes Christmas gift</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Dae-Needs-a-Manly-Grill-for-his-Birthday\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/23.jpg');\"><p>Dae Needs a Manly Grill for his Birthday</p></div></div></a></div><div class=\"column two\"><a href=\"https://www.giftstarter.com/giftstart/A-fantastic-bag-for-a-fantastic-lady\"><div class=\"giftstart-square big\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/58.jpeg');\"><p>A fantastic bag for a fantastic lady</p></div></div></a></div><div class=\"column three\"><a href=\"https://www.giftstarter.com/giftstart/Rocky-is-just-a-baby\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/115.jpeg');\"><p>Rocky Baby</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Just-when-you-thought-Quinn-and-Silas-pictures-couldnt-get-any-more-amazing\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/125.jpeg');\"><p>Just when you thought Quinn and Silas' pictures couldn't get any more amazing...</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Geekwire-Community-Feeding-Over-400-in-Seattle\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/Union_Gospel_Mission___Human_str.jpg');\"><p>Geekwire Feeds the Homeless</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/Lets-get-Dale-a-FitBit\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/31.com/skuimage/857717');\"><p>Let's get Dale a FitBit!</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/My-inner-nerd\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/37.jpeg');\"><p>My inner nerd.,</p></div></div></a><a href=\"https://www.giftstarter.com/giftstart/2-bottles-of-scotch-for-Matt-to-send-him-off-to-his-journey-at-Porchcom\"><div class=\"giftstart-square\"><div class=\"square-overlay\" style=\" background-image: url('https://storage.googleapis.com/giftstarter-pictures/p/132.jpeg');\"><p>2 Bottles of Scotch</p></div></div></a></div>\n" +
    "    <div style=\"clear: both;\"></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/home/home.html',
    "<div class=\"landing-page\" ng-controller=\"HomeController\">\n" +
    "\t<!--div class=\"headerwrap\">\n" +
    "        <h1>Welcome to GiftStarter!</h1>\n" +
    "        <p>We are putting the emotion back into gifting. With GiftStarter you can give gifts you're proud to give, and\n" +
    "            they're happy to get. Make your lists. Find your community. Give better gifts.</p>\n" +
    "        <a name=\"productsearch\"></a>\n" +
    "        <gs-product-search></gs-product-search>\n" +
    "    </div-->\n" +
    "    <!--ng-include src=\"'/scripts/product/search-results.ng.html'\"></ng-include-->\n" +
    "    <ng-include src=\"'/scripts/home/whatisgiftstarter/why-giftstarter.ng.html'\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/home/whatisgiftstarter/how-it-works.ng.html'\"></ng-include>\n" +
    "\t<!--ng-include src=\"'/scripts/staffpicks/staffpicks.ng.html'\"></ng-include-->\n" +
    "    <!--ng-include src=\"'/scripts/giftsgivenbar/giftsgivenbar.ng.html'\"></ng-include-->\n" +
    "    <div class=\"userlogin\" id=\"loginpanel\">\n" +
    "        <div class=\"userlogin__logo\"></div>\n" +
    "        <h2 class=\"userlogin__title\">\n" +
    "            Join the giving movement\n" +
    "        </h2>\n" +
    "    </div>\n" +
    "    <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/brandbar/brandbar.ng.html'\"></ng-include>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/home/top-campaign.html',
    "<div class=\"campaign-preview wrapper\">\n" +
    "    <a ng-href=\"/giftstart/{{campaign.giftstart_url_title}}\"><div class=\"campaign-title\"><h1>{{campaign.title}}</h1></div><p class=\"product-name\">{{campaign.product.title}}</p><img class=\"product-image\" ng-src=\"{{campaign.product_img_url}}\"/></a>\n" +
    "    <div class=\"comment-container\" ng-class=\"{fadedIn: fadeIn}\">\n" +
    "        <img class=\"contrib-img\" ng-src=\"{{pitchins[index % pitchins.length].img}}\"/>\n" +
    "        <div class=\"comment-wrapper\">\n" +
    "            <p class=\"contrib-message\">{{pitchins[index % pitchins.length].note}}</p>\n" +
    "            <p class=\"contrib-name\">{{pitchins[index % pitchins.length].name}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/home/whatisgiftstarter/how-it-works.ng.html',
    "<div class=\"whatisgiftstarter how-it-works\">\n" +
    "    <h2>How it works</h2>\n" +
    "    <img src=\"/assets/whatisgiftstarter/howitworks1.png\" />\n" +
    "    <img src=\"/assets/whatisgiftstarter/howitworks2.png\" />\n" +
    "    <p><span class=\"title\">IF YOU CAN BUY IT ONLINE, YOU CAN GIFT IT WITH GIFTSTARTER.</span> <span id=\"howitworks-paragraph\">When you set up your gift\n" +
    "    campaign, you can <strong>choose how many pieces</strong> will be in your grid. We <strong>break up the price of\n" +
    "    the product into pieces</strong>, so the more pieces you have, the cheaper each piece is! Once your gift\n" +
    "    campaign is set up, you <strong>invite your friends to buy pieces</strong> -- and your part is finished! Each\n" +
    "    contributor can <strong>purchase as many or as few pieces as they wish</strong>, then leave a message for the group\n" +
    "    card when they check out. <strong>We take care of everything else</strong> -- from ensuring the gift is\n" +
    "    ordered and shipped to making and sending the homemade group card, we've got you covered!</span></p>\n" +
    "    <button class=\"red\" ng-click=\"goToLink('howitworks')\">LEARN MORE</button>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/home/whatisgiftstarter/why-giftstarter.ng.html',
    "<div class=\"whatisgiftstarter why-giftstarter\">\n" +
    "    <h2>Why GiftStarter?</h2>\n" +
    "    <div>\n" +
    "        <div class=\"item one\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">GET AND GIVE GIFTS YOU WANT</h4>\n" +
    "                <p>\n" +
    "                    <strong>We remove the barrier of large price tags.</strong>\n" +
    "                    The gifts most people want are more expensive than the average giver is\n" +
    "                    able to gift alone, but with GiftStarter, <strong>many people can give\n" +
    "                    a little and together give gifts people actually want.</strong> Imagine\n" +
    "                    a world where birthdays aren't just an assortment of gift cards and\n" +
    "                    $20 checks from grandma.\n" +
    "            </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"item two\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">HAVE MEANINGFUL INTERACTIONS</h4>\n" +
    "                <p>\n" +
    "                    We didn't invent group gifting, but we did make sure the recipient will\n" +
    "                    know exactly who was involved in the gift. Each participant can <strong>\n" +
    "                    add a picture and personal message to the handcrafted group card. </strong>\n" +
    "                    Once the gift is received, the recipient can <strong>post a thank you note\n" +
    "                    </strong> and picture on the gift campaign page for all the contributors\n" +
    "                    to see.\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"item three\">\n" +
    "            <div class=\"ghost\"></div>\n" +
    "            <div class=\"content\">\n" +
    "                <h4 class=\"title\">PAIN-FREE GROUP GIFTING</h4>\n" +
    "                <p>\n" +
    "                    Whether it's your coworkers in your office or buddies spread across the nation,\n" +
    "                    it's never been so easy to start a group gift. We don't just <strong>take care\n" +
    "                    of the money collection</strong>, but also <strong>ensure the gift is ordered and\n" +
    "                    shipped, along with the group card</strong>. And as always, <strong>shipping\n" +
    "                    is free</strong> for all GiftStarter gifts!\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\t\t\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/inspirationalexamples/inspirationalexamples.ng.html',
    "<div class=\"inspirationalexamples\" ng-controller=\"InspirationalExamplesController\">\n" +
    "  <div id=\"outer\">\n" +
    "  <div class=\"rotate\">\n" +
    "    <div class=\"product-item first\">\n" +
    "      <a ng-href=\"{{firstProduct.link}}\"><img class=\"left-col\" ng-src=\"{{firstProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{firstProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "    <div class=\"product-item second\">\n" +
    "      <a ng-href=\"{{secondProduct.link}}\"><img class=\"left-col\" ng-src=\"{{secondProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{secondProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "    <div class=\"product-item third\">\n" +
    "      <a ng-href=\"{{thirdProduct.link}}\"><img class=\"left-col\" ng-src=\"{{thirdProduct.image}}\"/></a>\n" +
    "      <img class=\"right-col\" ng-src=\"{{thirdProduct.desc}}\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "    </div>\n" +
    "  <div id=\"clear\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/login/create-account.html',
    "<div class=\"userlogin__form\">\n" +
    "    <h4>Create account with email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doCreateEmail()\" class=\"create_action\">\n" +
    "        <input class=\"userlogin__name\" type=\"text\" name=\"name\" ng-model=\"$parent.name\" placeholder=\"First Name\" required /><br/>\n" +
    "        <input class=\"userlogin__surname\" type=\"text\" name=\"surname\" ng-model=\"$parent.surname\" placeholder=\"Last Name\" required /><br/>\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Email Address\" required /><br/>\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red create_action\" ng-disabled=\"$parent.working\">Create account</button>\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/login/login-or-create.html',
    "<div class=\"userlogin\" ng-controller=\"LoginOrCreateController\">\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-hide=\"showCreate\">\n" +
    "        <ng-include src=\"'/scripts/login/login.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__emaillogin login-block\" ng-show=\"showCreate\">\n" +
    "        <ng-include src=\"'/scripts/login/create-account.html'\"></ng-include>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showSocials\">\n" +
    "            <span>Already have an account? </span>\n" +
    "            <span><a ng-click=\"showCreate=false; resetForm();\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"vertical-line-block\">\n" +
    "        <div class=\"vertical-line\" ng-show=\"showSocials\"/>\n" +
    "    </div>\n" +
    "    <div class=\"userlogin__sociallogin login-block\" ng-show=\"showSocials\">\n" +
    "        <h4>Or {{showCreate?\"create account\":\"login\"}} with social media:</h4>\n" +
    "        <div class=\"social\">\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginFacebook()\"><img class=\"social__icons\" src=\"/assets/login/facebook.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginTwitter()\"><img class=\"social__icons\" src=\"/assets/login/twitter.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginLinkedin()\"><img class=\"social__icons\" src=\"/assets/login/linkedin.png\"></a><br/>\n" +
    "            <a class=\"social__link linky\" ng-click=\"doLoginGoogleplus()\"><img class=\"social__icons\" src=\"/assets/login/google.png\"></a>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-show=\"showCreate\">\n" +
    "            <span>Already have an account? </span>\n" +
    "            <span><a ng-click=\"showCreate=false; resetForm();\" class=\"userlogin__createacclink linky\">Login</a></span>\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__createacc switchtxt\" ng-hide=\"showCreate\">\n" +
    "            <span>Don't have an account? </span>\n" +
    "           <span><a ng-click=\"showCreate=true; resetForm();\" class=\"userlogin__createacclink linky\">Create</a></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"showSocials\">\n" +
    "        <br/><br/>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<script>\n" +
    "    function handlePopupClosed() {\n" +
    "        angular.element(document.getElementById('shareControllerWrapper')).scope().refreshPermissionsStatus();\n" +
    "    }\n" +
    "</script>"
  );


  $templateCache.put('/scripts/login/login.html',
    "<div class=\"userlogin__form\" ng-hide=\"$parent.showForgot || $parent.showReset\">\n" +
    "    <h4>Login with an email address:</h4>\n" +
    "    <form ng-submit=\"$parent.doLoginEmail()\" class=\"login_action\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter your password\" required></div>\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=true\">Forgot password</a>\n" +
    "        <div class=\"userlogin__wrapper\">\n" +
    "            <!--<input class=\"userlogin__remember\" type=\"checkbox\" name=\"remember\" id=\"remember\">-->\n" +
    "        </div>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red login_action\" ng-disabled=\"$parent.working\">Log In</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showForgot\">\n" +
    "    <form ng-submit=\"$parent.doForgotPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showForgot=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn\" ng-disabled=\"$parent.working\">Get Password</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"userlogin__form\" ng-show=\"$parent.showReset\">\n" +
    "    <h4>Reset Your Password:</h4>\n" +
    "    <form ng-submit=\"$parent.doResetPassword()\">\n" +
    "        <input class=\"userlogin__email\" type=\"hidden\" name=\"resetcode\" ng-model=\"$parent.resetCode\" placeholder=\"Enter the reset code\" required />\n" +
    "        <input class=\"userlogin__email\" type=\"email\" name=\"email\" ng-model=\"$parent.email\" placeholder=\"Enter your email address\" required />\n" +
    "        <div class=\"userlogin__passwordwrap\"><input ng-hide=\"$parent.showPassword\" class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Enter a New Password\" required /><input ng-show=\"$parent.showPassword\" class=\"userlogin__password\" type=\"text\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.password\" placeholder=\"Password\" required /><div class=\"userlogin__eye\" ng-click=\"$parent.showPassword=!$parent.showPassword\"></div></div>\n" +
    "        <!--<input class=\"userlogin__password\" type=\"password\" autocomplete=\"off\" name=\"password\" ng-model=\"$parent.reenterpassword\" placeholder=\"Re-enter the Password\" required>-->\n" +
    "        <a class=\"userlogin__forgot linky\" ng-click=\"$parent.showReset=false\">Cancel</a>\n" +
    "        <div class=\"userlogin__message\">{{$parent.message}}</div>\n" +
    "        <button class=\"userlogin__loginbtn red\" ng-disabled=\"$parent.working\">Change Password</button>\n" +
    "    </form>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/marketingbanner/marketingbanner.ng.html',
    "<div id=\"marketingbanner\">\n" +
    "    <div class=\"marketingbox\"><a href=\"/giftideas\"><img src=\"/assets/marketingbanner/buyPieces.png\"></a></div>\n" +
    "    <div class=\"marketingbox\"><a href=\"/giftideas\"><img src=\"/assets/marketingbanner/freeShipping.png\"></a></div>\n" +
    "    <div class=\"marketingbox\"><a href=\"/search/butter+london\"><img src=\"/assets/marketingbanner/featuredBL.png\"></a></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/menu/menu.ng.html',
    "<div class=\"menu-wrapper\" ng-class=\"{expanded: expanded}\">\n" +
    "    <button class=\"cancel\" ng-click=\"close()\">X</button>\n" +
    "    <ul class=\"menu\">\n" +
    "        <li class=\"menu-item\"><a href=\"http://www.giftstarter.com/blog\" target=\"_blank\">Blog</a></li>\n" +
    "        <li class=\"menu-item\"><a href=\"/faq\">FAQ</a></li>\n" +
    "        <li class=\"menu-item\" ng-show=\"loggedIn\" ng-click=\"logout()\"><a>Logout</a></li>\n" +
    "        <li class=\"menu-item\" ng-hide=\"loggedIn\" ng-click=\"login()\"><a>Login</a></li>\n" +
    "    </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/partnerportal/partnerportal.html',
    "<div class=\"partnerportal static-pages\" ng-controller=\"PartnerportalController\" >\n" +
    "    <div class=\"headerwrap\">\n" +
    "        <h1>PARTNER PORTAL</h1>\n" +
    "        <br />\n" +
    "        <p>Thanks for joining the gifting revolution!  GiftStarter is a great platform to help you increase average order size, turn your users into brand advocates endorsing your brand to their family and friends.  Let's reinvent gifting.  #GiftsMatter when we #GiftTogether.</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"login\">\n" +
    "        <div class=\"login-title\" ng-show=\"!loggedIn()\">Welcome, partner!  Please log in:</div>\n" +
    "        <span ng-repeat=\"showCreate in [false]\"><ng-include ng-repeat=\"showSocials in [false]\" src=\"'/scripts/login/login-or-create.html'\"></ng-include></span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"core-info\" ng-show=\"loggedIn()\">\n" +
    "        <h1>1. {{coreDataComplete?'Verify':'Enter'}} your company info:</h1>\n" +
    "        <form class=\"core-form\"><a name=\"core-form\"></a>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"companyName\">Company Name:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.company_name}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"companyName\" ng-model=\"partner.company_name\"/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"companyUrl\">Website:</span><span class=\"value\"  ng-hide=\"editMode\">{{partner.company_url}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"companyUrl\" ng-model=\"partner.company_url\"/><br/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"phone\">Phone:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.phone_number}}</span><span ng-show=\"editMode\" class=\"input\"><input type=\"text\" name=\"phone\" ng-model=\"partner.phone_number\"/><br/></span></span>\n" +
    "            <span class=\"row\"><span class=\"label\" for=\"phone\">API Key:</span><span class=\"value\" ng-hide=\"editMode\">{{partner.api_key}}</span></span>\n" +
    "            <span class=\"row\"><span class=\"error\" ng-show=\"coreError!=''\">{{coreError}}</span></span>\n" +
    "            <span class=\"row buttons\"><span class=\"buttons\"><button ng-hide=\"editMode\" ng-click=\"editCore()\" ng-disabled=\"loading\">Edit</button><span ng-show=\"editMode\"><button ng-show=\"coreDataComplete\" ng-click=\"cancelCore()\" ng-disabled=\"loading\">Cancel</button> <button ng-click=\"saveCore()\" ng-disabled=\"loading\">Save</button></span></span></span>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div ng-show=\"coreDataComplete\">\n" +
    "        <section id=\"add-the-button\">\n" +
    "            <h1>2. Add the GiftStart It button to your website:</h1>\n" +
    "            <p>Adding the GiftStart It button is easy.  Pick your platform:</p>\n" +
    "            <ul class=\"toggle-button\">\n" +
    "                <li ng-class=\"{'selected': shopifyInstructions}\"><a ng-click=\"showShopifyInstructions()\">Shopify</a></li>\n" +
    "                <li ng-class=\"{'selected': htmlInstructions}\"><a ng-click=\"showHtmlInstructions()\">All Others</a></li>\n" +
    "            </ul>\n" +
    "            <div class=\"add-instructions\" ng-show=\"shopifyInstructions\">\n" +
    "                <p>To add the button to your Shopify store, you can either add it site-wide (for all products), or to individual products.</p>\n" +
    "                <p>&bull; To add the button to <b>all</b> products, click \"Online Store\", then \"Themes\", then \"Edit HTML/CSS\" under the \"...\".\n" +
    "                    Next, click \"product.liquid\" under your Templates, and add the following code on a new line after \"{% include 'product' %}\":</p>\n" +
    "                <p>&bull; or, to add the button to a <b>single</b> product, click the \"&lt;&rt;\" symbol in the editing bar for the Description of your product,\n" +
    "                    then paste the following code (and click \"Save\"):</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                &lt;gs-button id=\"gsbutton\" class=\"gsbutton\"&gt;&lt;/gs-button&gt;\n" +
    "                &lt;script&gt;\n" +
    "                    window.giftStartButton = {\n" +
    "                        publicKey: '{{partner.api_key}}'\n" +
    "                    };\n" +
    "                &lt;/script&gt;\n" +
    "                &lt;script src=\"https://www.giftstarter.com/scripts/shopify/button.js\"&gt;&lt;/script&gt;\n" +
    "                &lt;style&gt;\n" +
    "                #gsbutton {\n" +
    "                    height: 36px;\n" +
    "                    border: 2px solid white;\n" +
    "                    border-radius: 4px;\n" +
    "                }\n" +
    "                &lt;/style&gt;\n" +
    "                </pre>\n" +
    "                <p>You can modify the styling if you like, but be sure to only adjust the height or the width - doing both will likely distort the button!</p>\n" +
    "                <p>If you have any questions at all, please email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>!</p>\n" +
    "            </div>\n" +
    "            <div class=\"add-instructions\" ng-show=\"htmlInstructions\">\n" +
    "                <p>To add the button to a site, simply insert the following snippet next to your \"Add to Cart\" button:</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                &lt;gs-button id=\"gsbutton\" class=\"gsbutton\" style=\"display: none;\"&gt;&lt;/gs-button&gt;\n" +
    "                &lt;script&gt;\n" +
    "                    window.giftStartButton = {\n" +
    "                        productUrl: 'http://example.com/product/12345',\n" +
    "                        title: 'Example title',\n" +
    "                        price: 85.00,\n" +
    "                        imgUrl: 'http://example.com/images/12345.jpg',\n" +
    "                        publicKey: '{{partner.api_key}}'\n" +
    "                    };\n" +
    "                &lt;/script&gt;\n" +
    "                &lt;script src=\"https://www.giftstarter.com/scripts/button/general.js\"&gt;&lt;/script&gt;\n" +
    "                </pre>\n" +
    "                <p>You'll need to replace the example product info in the first script tag with your actual product data.  On most platforms this can be done in the template for your product details page.</p>\n" +
    "                <p>You should style the button to match your existing buttons height and corner rounding, but a good starting point for the buttons CSS is:</p>\n" +
    "                <pre ng-click=\"convertToTextarea($event)\">\n" +
    "                #gsbutton {\n" +
    "                    height: 36px;\n" +
    "                    border: 2px solid white;\n" +
    "                    border-radius: 4px;\n" +
    "                }\n" +
    "                </pre>\n" +
    "                <p>Be sure to only adjust the height or the width - doing both will likely distort the button!</p>\n" +
    "                <p>If you have any questions at all, please email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>!</p>\n" +
    "            </div>\n" +
    "        </section>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/pay/pay.html',
    "<div class=\"payment\" ng-controller=\"PayPopoverController\">\n" +
    "\n" +
    "    <div class=\"saved-cards\" ng-show=\"cards.length > 0\" ng-class=\"{hidden: putNew}\">\n" +
    "        <span ng-repeat=\"card in cards\" class=\"card\">\n" +
    "            <input ng-attr-id=\"{{card.fingerprint}}\" type=\"checkbox\" ng-checked=\"card.selected\" value=\"{{card.fingerprint}}\" ng-click=\"selectCard()\"/>\n" +
    "            <label ng-attr-for=\"{{card.fingerprint}}\">\n" +
    "                <div class=\"selected\"><img ng-show=\"card.selected\" src=\"/assets/green_check.png\"/></div>\n" +
    "                <img class=\"brand\" ng-src=\"{{card.brandImage}}\">\n" +
    "                <span class=\"last-four\">{{card.last_four}}</span>\n" +
    "            </label>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"cardsLoading\"><img src=\"../../../assets/loading_transparent.gif\" width=\"14px\" height=\"14px\"> Loading saved cards</div>\n" +
    "\n" +
    "    <form xstripe-form=\"stripeSubmit\" name=\"stripeForm\" ng-class=\"{submitted: submitted}\" Xng-submit=\"pitchingIn = stripeForm.$valid;\">\n" +
    "\n" +
    "        <input id=\"new-credit-card-cb\" type=\"checkbox\" ng-model=\"putNew\" ng-change=\"deselectCards()\"><label for=\"new-credit-card-cb\"><span class=\"arrow\" ng-class=\"{down: putNew && !cardsLoading}\">&#x25BC;</span><span>Enter New Card</span></label>\n" +
    "\n" +
    "        <div class=\"card-entry\" ng-class=\"{'put-new': putNew && !cardsLoading}\">\n" +
    "            <div id=\"card-imgs\">\n" +
    "                <img src=\"/assets/mastercard_card.png\" />\n" +
    "                <img src=\"/assets/visa_card.png\" />\n" +
    "                <img src=\"/assets/discover_card.png\" />\n" +
    "                <img src=\"/assets/amex_card.png\" />\n" +
    "            </div>\n" +
    "            <div class=\"firstname\">\n" +
    "                <input type=\"text\" id=\"card-firstname\" ng-disabled=\"!putNew\" ng-model=\"firstname\" placeholder=\"First Name\" ng-change=\"updateFormValidity()\" name=\"firstname\"/>\n" +
    "            </div><div class=\"lastname\">\n" +
    "                <input type=\"text\" id=\"card-lastname\" ng-disabled=\"!putNew\" ng-model=\"lastname\" placeholder=\"Last Name\" ng-change=\"updateFormValidity()\" name=\"lastname\"/>\n" +
    "            </div><div class=\"number\">\n" +
    "                <input type=\"text\" id=\"card-number\" ng-disabled=\"!putNew\" ng-model=\"number\" payments-validate=\"card\" payments-type-model=\"type\" payments-format=\"card\" ng-class=\"type\" placeholder=\"Card Number\" ng-change=\"updateFormValidity()\" name=\"cc-number\"/>\n" +
    "            </div><div class=\"cvc\">\n" +
    "                <input type=\"text\" id=\"card-cvc\" ng-disabled=\"!putNew\" ng-model=\"cvc\" payments-validate=\"cvc\" payments-type-model=\"type\" payments-format=\"cvc\" placeholder=\"CVC\" ng-change=\"updateFormValidity()\" name=\"cvc\"/>\n" +
    "            </div><br/><div class=\"expiry\">\n" +
    "                <input type=\"text\" id=\"card-expiry\" ng-disabled=\"!putNew\" ng-model=\"expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" placeholder=\"Expires MM/YY\" ng-change=\"updateFormValidity()\" name=\"expiry\"/>\n" +
    "            </div><div class=\"zip\" ng-class=\"{invalidzip: (addressZip.length < 5)}\">\n" +
    "                <input type=\"text\" id=\"card-zip\" ng-disabled=\"!putNew\" ng-model=\"addressZip\" maxlength=\"5\" placeholder=\"Billing ZIP\" ng-change=\"updateFormValidity()\" name=\"zip\"/>\n" +
    "            </div><br/><div class=\"email\">\n" +
    "                <input type=\"email\" id=\"card-email\" ng-disabled=\"!putNew\" ng-model=\"email\" placeholder=\"Email Address*\" ng-change=\"updateFormValidity()\" name=\"email\"/>\n" +
    "            </div><span class=\"email-note\">\n" +
    "                * Receipt will be emailed\n" +
    "            </span><span class=\"save-card\">\n" +
    "                <input type=\"checkbox\" id=\"save-credit-card\" ng-disabled=\"!putNew\" ng-model=\"saveCreditCard\"/><label for=\"save-credit-card\">Remember my card</label><input type=\"checkbox\" id=\"tooltip-checkbox\"/>\n" +
    "            </span><span class=\"subscribe\" ng-hide=\"userOnMailingList\">\n" +
    "                <input type=\"checkbox\" id=\"subscribe-checkbox\" ng-model=\"emailSubscribe\"/><label for=\"subscribe-checkbox\">Want to hear about new features?</label>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <span ng-show=\"selectedCard\"><input id=\"delete-credit-card-toggle\" type=\"checkbox\" ng-model=\"showDeleteCardDialogue\"><label for=\"delete-credit-card-toggle\"><span class=\"arrow\" ng-class=\"{down: showDeleteCardDialogue && selectedCard}\">&#x25BC;</span><span>Delete Selected Card</span></label></span>\n" +
    "        <div class=\"delete-credit-card-confirm\" ng-show=\"showDeleteCardDialogue && selectedCard\">\n" +
    "            <button class=\"delete-card\" ng-click=\"deleteSelectedCard()\">Delete card #{{selectedLastFour}}</button> <button class=\"delete-cancel\" ng-click=\"showDeleteCardDialogue = false\">Cancel</button>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <span class=\"error\" ng-show=\"errorMessage.length > 0\">{{errorMessage}}</span>\n" +
    "\n" +
    "        <button class=\"large pay primary\" ng-click=\"paypalSubmit()\" ng-class=\"{disabled: pitchingIn}\">Pay ${{currentCharge / 100 | number : 2}} <img ng-show=\"pitchingIn\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "    </form>\n" +
    "    <div class=\"cancel-button\"><a class=\"cancel-button button linky\" ng-click=\"hidePopover()\">Cancel</a></div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/email-share/email-share-popover.html',
    "<div class=\"email-share-popover\" ng-controller=\"EmailSharePopoverController\">\n" +
    "    <h1 class=\"white\">Email Share!</h1>\n" +
    "    <div id=\"open-with-email-client\">\n" +
    "        <a href=\"{{emailUrl}}\" target=\"_blank\" ng-click=\"trackEmailClientClick()\">\n" +
    "            <span class=\"share\">Open in email client</span>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <label for=\"toEmails\">To:</label>\n" +
    "        <textarea id=\"toEmails\" ng-model=\"toEmails\" placeholder=\"friend@email.com; family@email.com\"></textarea>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <label for=\"fromEmail\">From:</label>\n" +
    "        <input id=\"fromEmail\" type=\"email\" ng-model=\"fromEmail\" placeholder=\"you@email.com\" name=\"email\"/>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <textarea class=\"message\" ng-model=\"message\" placeholder=\"\">\n" +
    "        </textarea>\n" +
    "        <div class=\"message-sub\">\n" +
    "        {{gsName}}<br/>\n" +
    "        - {{userSvcName}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <span class=\"error\" ng-hide=\"formValid\">Invalid email!</span>\n" +
    "    <button class=\"large white-border\" ng-click=\"submit()\">Send!</button>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/popover/login/login-popover.html',
    "<div class=\"login-popover\" ng-controller=\"LoginPopoverController\">\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isLogin\">Log In</h1>\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isLoginCreate\">Create Account</h1>\n" +
    "    <h1 class=\"white\" ng-show=\"emailFormModel.isForgotPassword || emailFormModel.isReset\">Reset Password</h1>\n" +
    "    <div class=\"block\">\n" +
    "        <div class=\"login-button facebook\" ng-click=\"facebookLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_facebook2.png\" /></div>\n" +
    "        <div class=\"login-button twitter\" ng-click=\"twitterLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_twitter2.png\" /></div>\n" +
    "        <div class=\"login-button googleplus\" ng-click=\"googleLogin()\" ng-show=\"!emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_google2.png\" /></div>\n" +
    "        <div class=\"login-button\" ng-click=\"emailFormModel.isEmailLogin = !emailFormModel.isEmailLogin\" ng-hide=\"emailFormModel.isEmailLogin\"><img class=\"login-button\" src=\"/assets/login_email.png\" /></div>\n" +
    "        <form name=\"emailLoginForm\" ng-show=\"emailFormModel.isEmailLogin\" class=\"emailLogin\" ng-submit=\"emailFormActions.submit()\" novalidate>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"text\" name=\"emailname\" placeholder=\"Enter your name\" ng-model=\"emailFormModel.emailname\" ng-required=\"emailFormModel.isLoginCreate\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailname.$error.required\">Name required.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"email\" name=\"email\" placeholder=\"Enter your email\" ng-model=\"emailFormModel.email\" required/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.email.$error.required\">Email required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.email.$error.email\">Invalid email.</span>\n" +
    "            </div>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"email\" name=\"emailConfirm\" placeholder=\"Confirm your email\" ng-model=\"emailFormModel.emailConfirm\" ng-required=\"emailFormModel.isLoginCreate\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailConfirm.$error.required\">Confirm email required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.emailConfirm.$error.email\">Invalid email.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && ((emailFormModel.email|lowercase) !== (emailFormModel.emailConfirm|lowercase))\">Emails do not match.</span>\n" +
    "            </div>\n" +
    "            <div ng-hide=\"emailFormModel.isForgotPassword\">\n" +
    "                <input type=\"password\" name=\"password\" placeholder=\"Enter your password\" ng-model=\"emailFormModel.password\" ng-required=\"emailFormModel.isLogin || emailFormModel.isLoginCreate || emailFormModel.isReset\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.password.$error.required\">Password required.</span>\n" +
    "            </div>\n" +
    "            <div ng-show=\"emailFormModel.isLoginCreate || emailFormModel.isReset\">\n" +
    "                <input type=\"password\" name=\"passwordConfirm\" placeholder=\"Confirm your password\" ng-model=\"emailFormModel.passwordConfirm\" ng-required=\"emailFormModel.isLoginCreate || emailFormModel.isReset\"/>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && emailLoginForm.passwordConfirm.$error.required\">Confirm password required.</span>\n" +
    "                <span ng-show=\"emailLoginForm.$submitted && (emailFormModel.password !== emailFormModel.passwordConfirm)\">Passwords do not match.</span>\n" +
    "            </div>\n" +
    "            <div class=\"loginButton\">\n" +
    "                <input type=\"submit\" value=\"Login\" ng-class=\"{loading: emailFormModel.loginInProgress}\" ng-click=\"emailFormActions.login()\" ng-show=\"emailFormModel.isLogin\">\n" +
    "                <input type=\"submit\" value=\"Create\"  ng-class=\"{loading: emailFormModel.createInProgress}\" ng-click=\"emailFormActions.createLogin()\" ng-show=\"emailFormModel.isLoginCreate\">\n" +
    "                <input type=\"submit\" value=\"Get password\" class=\"getPw\" ng-class=\"{loading: emailFormModel.getPwInProgress}\" ng-click=\"emailFormActions.forgotPassword()\" ng-show=\"emailFormModel.isForgotPassword && !emailFormModel.showOk\">\n" +
    "                <input type=\"submit\" value=\"Reset\" ng-class=\"{loading: emailFormModel.resetInProgress}\" ng-click=\"emailFormActions.reset()\" ng-show=\"emailFormModel.isReset\">\n" +
    "                <input type=\"button\" value=\"Ok\" ng-click=\"hidePopover()\" ng-show=\"emailFormModel.showOk\">\n" +
    "\n" +
    "            </div>\n" +
    "            <div ng-show=\"!emailFormModel.isLoginCreate && !emailFormModel.isForgotPassword && !emailFormModel.isReset\">\n" +
    "                <span class=\"or\">or</span>\n" +
    "                <input type=\"button\" class=\"createLogin\" ng-click=\"emailFormActions.createLoginMode($event)\" value=\"Create login\" />\n" +
    "            </div>\n" +
    "            <div ng-show=\"!emailFormModel.isLoginCreate && !emailFormModel.isForgotPassword && !emailFormModel.isReset\">\n" +
    "                <a ng-click=\"emailFormActions.forgotPasswordMode($event)\" class=\"forgotPwdLink linky\">Forgot password.</a>\n" +
    "                <div style=\"clear: both\"></div>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                {{emailFormModel.message}}\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/note/note-popover.html',
    "<div class=\"note-popover\" ng-init=\"stateClass = ''\" ng-controller=\"NotePopoverController\" >\n" +
    "    <div class=\"note-wrapper\">\n" +
    "        <div class=\"profile-picture-wrapper\">\n" +
    "            <img class=\"profile-picture\" ng-src=\"{{profilePicture}}\">\n" +
    "            <a class=\"edit-picture-button button\" ng-click=\"editPhoto()\">Edit Photo</a>\n" +
    "        </div>\n" +
    "        <div class=\"note\">\n" +
    "            <input id=\"name-box\" type=\"text\" ng-model=\"name\" placeholder=\"Name\" />\n" +
    "            <textarea class=\"note\" ng-model=\"noteText\" ng-disabled=\"skipNote\" placeholder=\"Comment\"></textarea>\n" +
    "            <p class=\"chars-left\" ng-show=\"noteText.length > 0\" ng-class=\"{warning: (noteText.length > 214)}\">{{230 - noteText.length}}</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"note-skipbox\">\n" +
    "        <input id=\"skipNote\" type=\"checkbox\" ng-model=\"skipNote\">\n" +
    "        <label for=\"skipNote\">No thanks, just put my name on the card.</label>\n" +
    "    </div>\n" +
    "    <button class=\"large primary\" ng-click=\"action.submit()\" ng-disabled=\"!skipNote && !noteText || noteText.length > 250 \" ng-class=\"{disabled: !skipNote && !noteText}\">Sign it!</button>\n" +
    "    <!-- div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div -->\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/pay/pay-popover.html',
    "<div class=\"pay-popover\" ng-controller=\"PayPopoverController\">\n" +
    "    <h1 class=\"white\">Pitch In!</h1>\n" +
    "     <div class=\"powered\">Powered by <img src=\"/assets/powered_by_paypal.png\"></div>\n" +
    "\n" +
    "    <div class=\"saved-cards\" ng-show=\"cards.length > 0\" ng-class=\"{hidden: putNew}\">\n" +
    "        <span ng-repeat=\"card in cards\" class=\"card\">\n" +
    "            <input ng-attr-id=\"{{card.fingerprint}}\" type=\"checkbox\" ng-checked=\"card.selected\" value=\"{{card.fingerprint}}\" ng-click=\"selectCard()\"/>\n" +
    "            <label ng-attr-for=\"{{card.fingerprint}}\">\n" +
    "                <img class=\"brand\" ng-src=\"{{card.brandImage}}\">\n" +
    "                <span class=\"last-four\">{{card.last_four}}</span>\n" +
    "            </label>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"cardsLoading\"><img src=\"../../../assets/loading_transparent.gif\" width=\"14px\" height=\"14px\"> Loading saved cards</div>\n" +
    "\n" +
    "    <form xstripe-form=\"stripeSubmit\" name=\"stripeForm\" ng-class=\"{submitted: submitted}\" ng-submit=\"pitchingIn = stripeForm.$valid;\">\n" +
    "\n" +
    "        <input id=\"new-credit-card-cb\" type=\"checkbox\" ng-model=\"putNew\" ng-change=\"deselectCards()\"><label for=\"new-credit-card-cb\"><span class=\"arrow\" ng-class=\"{down: putNew && !cardsLoading}\">&#x25BC;</span><span>Use New Card</span></label>\n" +
    "\n" +
    "        <div class=\"card-entry\" ng-class=\"{'put-new': putNew && !cardsLoading}\">\n" +
    "            <div class=\"number\">\n" +
    "                <img ng-src=\"{{numberImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-number\" ng-disabled=\"!putNew\" ng-model=\"number\" payments-validate=\"card\" payments-type-model=\"type\" payments-format=\"card\" ng-class=\"type\" placeholder=\"Card Number\" ng-change=\"updateFormValidity()\" name=\"cc-number\"/>\n" +
    "            </div><div class=\"cvc\">\n" +
    "                <img ng-src=\"{{cvcImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-cvc\" ng-disabled=\"!putNew\" ng-model=\"cvc\" payments-validate=\"cvc\" payments-type-model=\"type\" payments-format=\"cvc\" placeholder=\"CVC\" ng-change=\"updateFormValidity()\" name=\"cvc\"/>\n" +
    "            </div><div class=\"expiry\">\n" +
    "                <img ng-src=\"{{expiryImgUrl}}\"/>\n" +
    "                <input type=\"text\" id=\"card-expiry\" ng-disabled=\"!putNew\" ng-model=\"expiry\" payments-validate=\"expiry\" payments-format=\"expiry\" placeholder=\"MM / YY\" ng-change=\"updateFormValidity()\" name=\"expiry\"/>\n" +
    "            </div><div class=\"zip\" ng-class=\"{invalidzip: (addressZip.length < 5)}\">\n" +
    "                <img ng-src=\"{{zipImgUrl}}\">\n" +
    "                <input type=\"text\" id=\"card-zip\" ng-disabled=\"!putNew\" ng-model=\"addressZip\" maxlength=\"5\" placeholder=\"ZIP\" ng-change=\"updateFormValidity()\" name=\"zip\"/>\n" +
    "            </div><div class=\"email\">\n" +
    "                <img src=\"{{emailImgUrl}}\"/>\n" +
    "                <input type=\"email\" id=\"card-email\" ng-disabled=\"!putNew\" ng-model=\"email\" placeholder=\"Email Address\" ng-change=\"updateFormValidity()\" name=\"email\"/>\n" +
    "            </div><span class=\"save-card\">\n" +
    "                <input type=\"checkbox\" id=\"save-credit-card\" ng-disabled=\"!putNew\" ng-model=\"saveCreditCard\"/><label class=\"small\" for=\"save-credit-card\">Save my card</label><input type=\"checkbox\" id=\"tooltip-checkbox\"/><label for=\"tooltip-checkbox\"><span class=\"tooltip-icon\"><img id=\"save-credit-card-lock\" src=\"/assets/cc_icon_cvc_white.png\"/><span class=\"tooltip\">Transactions are processed via secure 128-bit SSL encryption.</span></span></label>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <span class=\"subscribe\" ng-hide=\"userOnMailingList\">\n" +
    "            <input type=\"checkbox\" id=\"subscribe-checkbox\" ng-model=\"emailSubscribe\"/><label class=\"small\" for=\"subscribe-checkbox\">Want to hear about new features?</label>\n" +
    "        </span>\n" +
    "\n" +
    "        <span class=\"error\" ng-show=\"errorMessage.length > 0\">{{errorMessage}}</span>\n" +
    "\n" +
    "        <button class=\"large pay\" ng-click=\"paypalSubmit()\" ng-class=\"{disabled: pitchingIn}\">Pay ${{currentCharge / 100 | number : 2}} <img ng-show=\"pitchingIn\" src=\"/assets/loading_transparent.gif\" height=\"28px\" width=\"28px\"></button>\n" +
    "    </form>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Cancel</p></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/popover/popover.html',
    "<div class=\"popover-wrapper\" ng-class=\"{shown: popoverShown}\" ng-style=\"{top: topPosition}\">\n" +
    "    <div class=\"popover-container\"></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/profile/profile-popover.html',
    "<div class=\"profile-popover\" ng-controller=\"ProfilePopoverController\" >\n" +
    "    <div class=\"leftcol\">\n" +
    "        <h1 class=\"white\">Upload your Photo!</h1>\n" +
    "        <p>Your picture will show up on the pieces you purchased and next to your message on the group card that will be hand-made and mailed to the recipient.</p>\n" +
    "        <img src=\"/assets/cardExample.png\"><img src=\"/assets/gridExample.png\">\n" +
    "    </div>\n" +
    "    <div class=\"rightcol\">\n" +
    "        <div class=\"profile-wrapper\">\n" +
    "            <div id=\"profile-image-container\" ng-class=\"{edit: editMode}\">\n" +
    "                <img id=\"profile-image\" ng-src=\"{{profilePicture}}\" ng-hide=\"editMode\" src=\"\"/>\n" +
    "                <gs-image-upload ng-show=\"editMode\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <button class=\"cancel\" ng-show=\"editMode\" ng-click=\"editMode = false;\">X</button>\n" +
    "                <a class=\"edit button\" ng-show=\"!editMode\" ng-click=\"editMode=true;\" onclick=\"$('#profile-image-container gs-image-upload div div button.image').click()\">EDIT</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <input id=\"useAsProfilePicture\" ng-hide=\"userHasDefaultProfileImage\" type=\"checkbox\" ng-model=\"useAsProfilePicture\">\n" +
    "            <label for=\"useAsProfilePicture\" ng-hide=\"userHasDefaultProfileImage\">Use this as my default profile picture</label>\n" +
    "            <label for=\"useAsProfilePicture\" ng-show=\"userHasDefaultProfileImage\">Since you've never added an image before, this will become your profile picture.</label>\n" +
    "        </div>\n" +
    "        <button class=\"large white-border\" ng-click=\"action.submit()\" ng-class=\"{disabled: !imageSet}\">Submit Photo</button>\n" +
    "        <div class=\"cancel-button\"><a class=\"cancel-button button\" ng-click=\"cancel()\">Cancel</a></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/sweepstakes/sweepstakes-popover.html',
    "<div class=\"sweeps-popover\">\n" +
    "    <div class=\"close\" style=\"opacity:0.8\" ng-click=\"close()\">X</div>\n" +
    "    <div class=\"logoArea\"></div>\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"arrow-down\"></div>\n" +
    "        <h1>Enter to Win - Our Gift to You</h1>\n" +
    "        <p class=\"intro\">\n" +
    "            Experience GiftStarter yourself! Simply provide your name and email address below and you'll be\n" +
    "            entered to win your choice of an icPooch - Internet Pet Treat Dispenser with 6oz of icPooch\n" +
    "            Cookies ($130 value), or a Keurig&reg; K45 Elite Brewing System ($120 value).<sup>*</sup>\n" +
    "        </p>\n" +
    "        <div class=\"prizes\">\n" +
    "            <div class=\"sweepsBL\"></div>\n" +
    "            <div class=\"sweepsGP\"></div>\n" +
    "            <div style=\"clear: both; height: 0;\"></div>\n" +
    "        </div>\n" +
    "        <form name=\"sweepForm\" ng-submit=\"submit()\" novalidate>\n" +
    "            <div>\n" +
    "                <input type=\"text\" name=\"first\" class=\"name\" ng-model=\"model.first\" placeholder=\"First Name\" required/>\n" +
    "                <input type=\"text\" name=\"last\" class=\"name\" ng-model=\"model.last\" placeholder=\"Last Name\" required/>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.first.$error.required\">First name is required.</span>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.last.$error.required\">Last name is required.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"email\" name=\"email\" class=\"email\" ng-model=\"model.email\" placeholder=\"Email Address\" required/>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.email.$error.required\">Email is required.</span>\n" +
    "                <span ng-show=\"sweepForm.$submitted && sweepForm.email.$error.email\">Invalid email.</span>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <input type=\"submit\" value=\"Submit\" />\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <a ng-click=\"close()\">{{model.message}}</a>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        <p class=\"disclaimer\">\n" +
    "            * All entries must be received by 11:59pm PT on Tuesday, March 31, 2015. By entering,\n" +
    "            you are agreeing to receive email communication from GiftStarter. Employees of GiftStarter\n" +
    "            and their families are not eligible to participate.<a style=\"float: right; opacity: .8\" ng-click=\"close()\">cancel</a>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/popover/thanks/thanks-popover.html',
    "<div class=\"thanks-popover\" ng-controller=\"ThanksPopoverController\">\n" +
    "    <h1 class=\"white\">Success!</h1>\n" +
    "    <p>Ah, that warm fuzzy feeling is the best, isn't it? Thank you for using GiftStarter as the new way to give! Seriously-we think you're just phenomenal.</p>\n" +
    "    <p>Give some friends the opportunity to get some warm fuzzies from this GiftStart, too.</p>\n" +
    "    <div class=\"buttons\">\n" +
    "        <!--<button class=\"share\" ng-click=\"socialShare()\">Facebook</button>-->\n" +
    "        <!--<a href=\"mailto:?subject={{mailSubject}}&body={{mailBody}}\" target=\"_blank\" ng-click=\"mixpanel.track('Email share in thanks clicked');\"><button class=\"share\">Email</button></a>-->\n" +
    "        <!--<button class=\"large white-border\" ng-click=\"close()\">Close</button>-->\n" +
    "        <div class=\"share-button\" ng-click=\"emailShare()\"><img class=\"share-button\" src=\"/assets/login_email.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"facebookShare()\"><img class=\"share-button\" src=\"/assets/login_facebook2.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"twitterShare()\"><img class=\"share-button\" src=\"/assets/login_twitter2.png\" /></div>\n" +
    "        <div class=\"share-button\" ng-click=\"googlePlusShare()\"><img class=\"share-button\" src=\"/assets/login_google2.png\" /></div>\n" +
    "    </div>\n" +
    "    <p>Want to start your own GiftStart?<br>It's easy – start <a href=\"/\" ng-click=\"hidePopover()\">here.</a></p>\n" +
    "    <div class=\"cancel-button\"><p class=\"cancel-button\" ng-click=\"hidePopover()\">Close</p></div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/product/product-search.html',
    "<!--<div class=\"product-link wrapper\" ng-controller=\"ProductLinkController\">-->\n" +
    "<div id=\"product-search-anchor\" class=\"product-link\">\n" +
    "    <div class=\"search wrapper\">\n" +
    "        <div class=\"inputs\">\n" +
    "            <input id=\"product-search-input\" class=\"text-input\" type=\"text\" name=\"product-link\" placeholder=\"SEARCH HERE FOR THE PERFECT GIFT...\" ng-model=\"product_url\" ng-keyup=\"$event.keyCode == 13 ? submit() : null\"/><button id=\"product-search-button\" class=\"submit searchbtn\" ng-click=\"submit()\">SEARCH</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"categories-container\">\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>BRANDS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/apple\">Apple</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/bose\">Bose</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/butter+london\">butter LONDON</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/cuisinart\">Cuisinart</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/dyson+vacuum\">Dyson</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/fat+cork\">Fat Cork</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/frends\">Frends</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/icpooch\">iCPooch</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/samsung\">Samsung</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/sturtevants\">Sturtevant's Sports</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>BABY GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/baby+crib\">Baby Crib</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/bassinet\">Bassinet</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/cradle\">Cradle</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/crib+bedding\">Crib Bedding</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/diaper+bag\">Diaper Bag</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/high+chair\">High Chair</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/playard\">Playard</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/rocking+chair\">Rocking Chair</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/stroller\">Stroller</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>ELECTRONIC GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/camera\">Camera</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/home+theater\">Home Theater</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/ipad\">iPad</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/iphone\">iPhone</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/ipod\">iPod</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/macbook\">Macbook</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/playstation\">Playstation</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/television\">Television</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/wireless+speaker\">Wireless Speakers</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/xbox\">Xbox</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "      <div class=\"categories\">\n" +
    "        <p><strong>HOME + WEDDING GIFTS:</strong></p>\n" +
    "        <ul>\n" +
    "          <li><a target=\"_top\" href=\"/search/barbecue+grill\">Barbecue Grill</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/dog+bed\">Dog Bed</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/duvet\">Duvet</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/fish+tank\">Fish Tank</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/keurig\">Keurig</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/lawn+mower\">Lawn Mower</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/rug\">Rugs</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/Vitamix\">Vitamix</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/sofa\">Sofa</a></li>\n" +
    "          <li><a target=\"_top\" href=\"/search/toaster+oven\">Toaster Oven</a></li>\n" +
    "        </ul>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"loading\" ng-show=\"loading\">\n" +
    "        <img src=\"/assets/loading.gif\"/>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"failed\" ng-show=\"failed\">\n" +
    "        <img src=\"/assets/failed.png\"/>\n" +
    "        <div>\n" +
    "            <p>Looks like that search term didn’t find any results.</p><p>Please try a more specific term, or email our gift concierge at <a href=\"mailto:giftconcierge@giftstarter.com\" ng-click=\"giftConciergeClicked()\">giftconcierge@giftstarter.com</a> for help finding the perfect gift!</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"failed\" ng-show=\"results_empty\">\n" +
    "        <img src=\"/assets/failed.png\"/>\n" +
    "        <div>\n" +
    "            <p>Looks like that search term didn’t find any results.</p><p>Please try a more specific term, or email our gift concierge at <a href=\"mailto:giftconcierge@giftstarter.com\" ng-click=\"giftConciergeClicked()\">giftconcierge@giftstarter.com</a> for help finding the perfect gift!</p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <section id=\"search-products-section\" class=\"products\" ng-class=\"{hidden: products.length == 0}\">\n" +
    "        <div class=\"product-container\" ng-class=\"{selected: product.selected}\" ng-repeat=\"product in selectedProducts\" ng-hide=\"!product.imgUrl\" ng-click=\"showProductDetails({{$index}})\">\n" +
    "            <div class=\"product\">\n" +
    "                <div class=\"image-container\">\n" +
    "                    <span class=\"vert-align-helper\"></span>\n" +
    "                    <img ng-click=\"goToProduct($index);\" ng-src=\"{{product.imgUrl}}\" onerror=\"angular.element($(this)).scope().fixImage(this);\" index=\"{{$index}}\" />\n" +
    "                </div>\n" +
    "                <div class=\"product-details\">\n" +
    "                    <h4 class=\"title\" ng-click=\"goToProduct($index, $event);\">{{product.title}}</h4>\n" +
    "                    <p class=\"description\" ng-bind-html=\"product.description\"></p>\n" +
    "                    <p class=\"price block\">${{product.price / 100 | number : 2}}</p>\n" +
    "                    <div class=\"buttons\">\n" +
    "                        <button class=\"giftstart primary\" ng-click=\"startCampaignFrom($index);$event.stopPropagation();\">GiftStart it</button>\n" +
    "                        <button class=\"giftstart green\" ng-click=\"saveForLater($index);$event.stopPropagation();\">Save for Later <img ng-show=\"isSavingForLater\" class=\"loader\" src=\"/assets/loading_transparent.gif\"></button>\n" +
    "                        <div class=\"product-message\" ng-show=\"product.selected\" ng-bind-html=\"productMessage\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <button class=\"cancel\" ng-click=\"hideProductDetails();$event.stopPropagation();\">X</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"page-buttons\" ng-show=\"products.length > 10\" >\n" +
    "            <a class=\"button linky\" ng-click=\"decrementPage()\">Previous</a><span class=\"page-number\" ng-class=\"{selected: pageNumber == selectedPage}\" ng-repeat=\"pageNumber in pageNumbers\" ng-click=\"selectPage(pageNumber)\">{{pageNumber}}</span><a class=\"button linky\" ng-click=\"incrementPage()\">Next</a>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    <!--p class=\"need-help-concierge\">Can't find the gift you want? Simply contact our <a href=\"/concierge\" ng-click=\"giftConciergeClicked()\">Gift Concierge</a> and we'll find it for you. Or visit our <a href=\"/giftideas\">Gift Ideas</a> page for more ideas.</p-->\n" +
    "</div>"
  );


  $templateCache.put('/scripts/share/invite-pitchin.html',
    "<div id=\"shareControllerWrapper\" class=\"share pitchin\" ng-controller=\"ShareController\">\n" +
    "    <div id=\"title\">\n" +
    "        <h1>Invite Friends to Pitch-in</h1>\n" +
    "        <!--p>Your GiftStarter campaign is successfully set up! Invite friends to help pitch-in\n" +
    "        and increase your chances of fully funding the gift!</p-->\n" +
    "    </div>\n" +
    "\n" +
    "    <ng-include src=\"'/scripts/login/login-or-create.html'\"></ng-include>\n" +
    "\n" +
    "    <div ng-show=\"loggedIn()\" id=\"share-block\">\n" +
    "        <div id=\"content\">\n" +
    "            <div class=\"block message\">\n" +
    "            <h4>YOUR MESSAGE</h4>\n" +
    "            <textarea id=\"shareMessage\" ng-model=\"message\"></textarea>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"share-where block\">\n" +
    "                <div class=\"share-where-social\">\n" +
    "                    <h4>SHARE ON SOCIAL MEDIA</h4>\n" +
    "                    <p>Select which networks you would like to post on:</p>\n" +
    "                    <div id=\"social-icons-container\">\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['facebook']=false\"><img class=\"social__icons\" src=\"/assets/share/facebook.png\" ng-show=\"selectedSocials['facebook']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/facebook-share-unselected.png ng-hide=\"selectedSocials['facebook']\" ng-click=\"selectSocial('facebook')\"/>\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['twitter']=false\"><img class=\"social__icons\" src=\"/assets/share/twitter.png\" ng-show=\"selectedSocials['twitter']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/twitter-share-unselected.png ng-hide=\"selectedSocials['twitter']\" ng-click=\"selectSocial('twitter')\"/>\n" +
    "                        <a class=\"social__link linky\" ng-click=\"selectedSocials['linkedin']=false\"><img class=\"social__icons\" src=\"/assets/share/linkedin.png\" ng-show=\"selectedSocials['linkedin']\"></a>\n" +
    "                        <img class=\"social__icons linky\" src=/assets/share/linkedin-share-unselected.png ng-hide=\"selectedSocials['linkedin']\" ng-click=\"selectSocial('linkedin')\"/>\n" +
    "                        <!--<a class=\"social__link linky\" ng-click=\"selectedSocials['google']=false\"><img class=\"social__icons\" src=\"/assets/share/google.png\" ng-hide=\"!sharePermission['google'] || !selectedSocials['google']\"></a>-->\n" +
    "                        <!--<img class=\"social__icons linky\" src=/assets/share/google-share-unselected.png ng-show=\"!selectedSocials['google']\" ng-click=\"selectSocial('google')\"/>-->\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"share-where-email\">\n" +
    "                    <h4>SEND AN EMAIL</h4>\n" +
    "                    <p>Enter email addresses separated by a comma<!--, or import gmail contacts to select email addresses-->:</p>\n" +
    "                    <!--a href=\"\"><h4>IMPORT GMAIL CONTACTS</h4></a-->\n" +
    "                    <textarea ng-model=\"emailRecipients\" placeholder=\"Enter email addresses, separated by commas\"></textarea>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"share-buttons\">\n" +
    "            <p ng-show=\"shareSuccess\">YOUR SHARE SUCCESSFULLY POSTED!</p>\n" +
    "            <p class=\"twitter-note\" ng-show=\"selectedSocials['twitter'] && message.length>118\">Note: For Twitter, only the first 118 characters of your message and a link to this campaign will be posted.</p>\n" +
    "            <button class=\"red\" ng-hide=\"shareSuccess\" ng-disabled=\"!selectedSocials['facebook']&&!selectedSocials['twitter']&&!selectedSocials['linkedin']&&!selectedSocials['google']&&emailRecipients.length==0\" ng-click=\"shareClick()\">SHARE</button>\n" +
    "            <button ng-show=\"shareSuccess\" ng-click=\"shareReset()\">SHARE AGAIN</button>\n" +
    "            <button ng-show=\"shareSuccess\" ng-click=\"$parent.showSharePanel(false); shareReset()\">FINISH</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"share-where-link\">\n" +
    "            <h4>SHARE A LINK!</h4>\n" +
    "            <p>Use this link to invite friends and family to GiftStarter through any means you'd like:</p>\n" +
    "            <input value=\"{{campaignUrl()}}\" gs-copy-url readonly/>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--a href=\"\"><h4>SKIP AND SHARE LATER</h4></a>\n" +
    "        <p>You can share your campaign at any time from your profile page or the campaign page!</p-->\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/staffpicks/staffpicks.ng.html',
    "<div class=\"staffpicks\" ng-controller=\"StaffPicksController\">\n" +
    "  <div id=\"outer\">\n" +
    "    <div id=\"titlexo\">\n" +
    "      <img src=\"/assets/staffpicks/staff-picks-title-image.png\" />\n" +
    "    </div>\n" +
    "    <div class=\"rotate\">\n" +
    "      <div class=\"product-item first\">\n" +
    "        <a ng-href=\"{{firstProduct.link}}\"><img class=\"left-col\" ng-src=\"{{firstProduct.image}}\"/></a>\n" +
    "        <div class=\"corner-box\"></div>\n" +
    "        <div>\n" +
    "          <img class=\"avatar\" ng-src=\"{{firstProduct.avatar}}\"/>\n" +
    "          <p>{{firstProduct.desc}}</p>\n" +
    "        </div>\n" +
    "        <div class=\"bottom\">\n" +
    "          <hr />\n" +
    "          <p class=\"title\">{{firstProduct.title}}</p>\n" +
    "          <p>{{firstProduct.price}}</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"product-item second\">\n" +
    "        <a ng-href=\"{{secondProduct.link}}\"><img class=\"left-col\" ng-src=\"{{secondProduct.image}}\"/></a>\n" +
    "        <div class=\"corner-box\"></div>\n" +
    "        <img class=\"avatar\" ng-src=\"{{secondProduct.avatar}}\"/>\n" +
    "        <p>{{secondProduct.desc}}</p>\n" +
    "        <div class=\"bottom\">\n" +
    "          <hr />\n" +
    "          <p class=\"title\">{{secondProduct.title}}</p>\n" +
    "          <p>{{secondProduct.price}}</p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div id=\"clear\"></div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/about/about.html',
    "<div class=\"about body static-pages\" ng-controller=\"AboutController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>WHAT IS GIFTSTARTER?</h1>\n" +
    "    <p>Our mission is to reinvent gifting by putting our hearts back into the giving experience. Give amazing gifts you're proud of, and your friends and loved ones are delighted to get. From a group or from yourself, we'll make it happen. It's that easy.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main threeup\">\n" +
    "    <h2>The Team</h2>\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/arry.png\" alt=\"\" />\n" +
    "      <h3><b>Arry Yu</b></h3>\n" +
    "      <h4>CEO/Cofounder</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/christie.png\" alt=\"\" />\n" +
    "      <h3><b>Christie Gettler</b></h3>\n" +
    "      <h4>Design/Cofounder</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/sharon.png\" alt=\"\" />\n" +
    "      <h3><b>Sharon Kuo</b></h3>\n" +
    "      <h4>Web Engineering</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/joel.png\" alt=\"\" />\n" +
    "      <h3><b>Joel Serino</b></h3>\n" +
    "      <h4>Product Growth</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/tyler.png\" alt=\"\" />\n" +
    "      <h3><b>Tyler Goelz</b></h3>\n" +
    "      <h4>UX Engineer</h4>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"mission\">\n" +
    "    <hr />\n" +
    "    <h2>Our Mission</h2>\n" +
    "    <p class=\"font\">To enable people to make meaningful connections with others using the power of gifts.<br />\n" +
    "      <b>Want to send a gift to someone?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "      <b>Want to send a group gift to someone?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "      <b>Want to save up piece by piece for a gift?</b><br /><a href=\"/giftideas\">You can with GiftStarter</a><br />\n" +
    "    Your time is valuable. Don't waste another second -- use GiftStarter for all of your gifting needs.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"milestones\">\n" +
    "    <hr />\n" +
    "    <h2>Our Milestones</h2>\n" +
    "    <table>\n" +
    "      <tr>\n" +
    "        <td><b>March 2014</b></td>\n" +
    "        <td>1<sup>st</sup> place win at Startup Weekend ReDesign Seattle</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>July 2014</b></td>\n" +
    "        <td>Launched with products from Amazon.com, REI, Nordstrom, Filson, and Costco</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>August 2014</b></td>\n" +
    "        <td>Accepted into 9Mile Labs (a B2B Technology Startup Accelerator) in Seattle</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>September 2014</b></td>\n" +
    "        <td>Added over 3,000,000 products from retailers like 1-800-Flowers, B&H Photo, Best Buy, BackCountry, Sur La Table, and Kohl's</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>October 2014</b></td>\n" +
    "        <td>Launched partnership with butter LONDON&reg;</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>November 2014</b></td>\n" +
    "        <td>Launched partnerships with Sturtevant's Sports, FatCork, and iCPooch</td>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <td><b>Janurary 2015</b></td>\n" +
    "        <td>Our first angel investor, Gary Rubens, joins the GiftStarter team</td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"advisors threeup\">\n" +
    "    <hr />\n" +
    "    <h2>Our Advisors</h2>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/barbary-brunner.png\" alt=\"\" />\n" +
    "      <h3><b>Barbary Brunner</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/jonathan-sposato-advisor.png\" alt=\"\" />\n" +
    "      <h3><b>Jonathan Sposato</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/gina.png\" alt=\"\" />\n" +
    "      <h3><b>Gina Cuff</b></h3>\n" +
    "      <h4>Ecommerce Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rob-adams.png\" alt=\"\" />\n" +
    "      <h3><b>Rob Adams</b></h3>\n" +
    "      <h4>Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/hoon.png\" alt=\"\" />\n" +
    "      <h3><b>Hoon Kong</b></h3>\n" +
    "      <h4>Engineering Advisor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"investors\">\n" +
    "    <hr />\n" +
    "    <h2>Our Investors</h2>\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/9mile-labs.png\" alt=\"\" />\n" +
    "      <h3><b>9Mile Labs</b></h3>\n" +
    "      <h4>Accelerator/Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/gary-rubens.png\" alt=\"\" />\n" +
    "      <h3><b>Gary Rubens</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/arry-investor.png\" alt=\"\" />\n" +
    "      <h3><b>Arry Yu</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rao-investor.png\" alt=\"\" />\n" +
    "      <h3><b>Rao Remala</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rob-adams.png\" alt=\"\" />\n" +
    "      <h3><b>Rob Adams</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/rudy-gadre.png\" alt=\"\" />\n" +
    "      <h3><b>Rudy Gadre</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/jonathan-sposato-advisor.png\" alt=\"\" />\n" +
    "      <h3><b>Jonathan Sposato</b></h3>\n" +
    "      <h4>Investor</h4>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"member-item\">\n" +
    "      <img src=\"assets/about/img/500startups.png\" alt=\"\" />\n" +
    "      <h3><b>500 Startups</b></h3>\n" +
    "      <h4>Accelerator/Investor</h4>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div id=\"contactus\" class=\"Contact\">\n" +
    "    <hr />\n" +
    "    <h2>Contact Us</h2>\n" +
    "    <p class=\"font\">\n" +
    "      <b>For Help:</b> email our Gift Concierge at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a><br /><b>For Press and Partners:</b> email <a href=\"mailto:partner@giftstarter.com\">partner@giftstarter.com</a><br/><br/>\n" +
    "      Also, feel free to call us at 206-486-4849!<br/><br/>\n" +
    "      GIFTSTARTER (also known as Emotiv Labs, Inc.)<br/>\n" +
    "      3727 S. Alaska Street<br/>\n" +
    "      Suite #18284<br/>\n" +
    "      Seattle, WA 98118\n" +
    "    </p>\n" +
    "    <a href=\"/giftideas\" alt=\"\" class=\"button\">START GIFTING</a>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/card/card.html',
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head lang=\"en\">\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title></title>\n" +
    "    <link rel=\"stylesheet\" href=\"/stylesheets/compiled.css\"/>\n" +
    "    <link href='https://fonts.googleapis.com/css?family=Roboto:300,600' rel='stylesheet' type='text/css'>\n" +
    "</head>\n" +
    "<body>\n" +
    "\n" +
    "    <section class=\"bow card\">\n" +
    "        <div class=\"product\">\n" +
    "            <img src=\"{{product_img_url}}\"/>\n" +
    "        </div>\n" +
    "        <img class=\"bow image\" src=\"/assets/card_bow.png\"/>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"whats-giftstarter card\">\n" +
    "        <div class=\"wrapper\">\n" +
    "            <img class=\"logo\" src=\"/assets/Logo-01.png\">\n" +
    "            <p class=\"copy\"><b>Congratulations!</b></p>\n" +
    "            <p class=\"copy\">This {{product_name}} gift was group gifted for you using GiftStarter, so that your family and friends could pitch in to give you this amazing gift. Your Gift Champion, {{gc.name}}, rallied the troops and helped make this happen. This is the handmade card with all of their personal messages to you. And... YES, the actual gift is on its way to you. Watch your mailbox!</p>\n" +
    "            <p class=\"copy\">Happy gifting!</p>\n" +
    "            <!--<p class=\"signoff\">Love,</p>-->\n" +
    "            <!--<p class=\"signature\">THE GIFTSTARTER TEAM</p>-->\n" +
    "        </div>\n" +
    "        <footer>\n" +
    "            <p>SAY THANK YOU HERE!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"{{giftstart_url}}\">{{giftstart_url}}</a></p>\n" +
    "        </footer>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"gift-champion giver card\">\n" +
    "        <img src=\"{{gc.img_url}}\">\n" +
    "        <div>\n" +
    "            <p class=\"comment\">{{gc.comment}}</p>\n" +
    "            <p class=\"name\">{{gc.name}}</p>\n" +
    "            <p class=\"the-giftstarter\">Gift Champion</p>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "\n" +
    "    <section class=\"grid card\">\n" +
    "        <div class=\"wrapper\">\n" +
    "            <div class=\"grid\"><img class=\"product\" src=\"{{product_img_url}}\"/><div class=\"overlay\">{% for part_img_url in parts -%}<div class=\"part\" style=\"width: {{part_width}}; height: {{part_height}};\">{% if part_img_url %}\n" +
    "                <img class=\"part-image\" src=\"{{part_img_url}}\" style=\"max-height: {{max_img_height}};\"/>\n" +
    "                {% endif %}\n" +
    "            </div>{%- endfor %}</div></div>\n" +
    "        </div>\n" +
    "        <!--<p>TO VIEW THE WHOLE ONLINE GIFT, VISIT</p>-->\n" +
    "        <a href=\"{{giftstart_url}}\">{{giftstart_url}}</a>\n" +
    "    </section>\n" +
    "\n" +
    "    {% for giver in givers %}\n" +
    "    <section class=\"giver card\">\n" +
    "        <img src=\"{{giver.img_url}}\">\n" +
    "        <div>\n" +
    "            <p class=\"comment\">{% if giver.comment %}{{giver.comment}}{% endif %}</p>\n" +
    "            <p class=\"name\">{{giver.name}}</p>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    {% endfor %}\n" +
    "\n" +
    "</body>\n" +
    "</html>"
  );


  $templateCache.put('/scripts/static-pages/concierge/concierge.html',
    "<div class=\"concierge static-pages\" ng-controller=\"ConciergeController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>GIFT CONCIERGE IS STANDING BY</h1>\n" +
    "    <p>Need help coming up with ideas, finding a specific gift, or setting up your gift? Send any gift request and we can help.</p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">CONTACT NOW</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <h2>Give an Amazing Gift</h2>\n" +
    "    <div class=\"concierge-item intro\">\n" +
    "      <p>Give them a gift you're proud to give - and they're happy to get. By bringing people together with GiftStarter, you can give the gift they won't be able to stop talking about.<br /></p><blockquote>\"The best thing about the Gift Concierge is that someone will go out of their way to help you find the perfect gift and to craft the perfect experience. It is like recruiting a super hero that will make the impossible possible.\" - Thibault L.</blockquote><p>The Gift Concierge is here to help you make it happen. See all the ways the Gift Concierge can assist you.</p>\n" +
    "      <a class=\"button\" href=\"/howitworks\">HOW IT WORKS</a>\n" +
    "    </div>\n" +
    "    <div class=\"concierge-item form\">\n" +
    "      <p>Fill out the form below and we'll get back to you the same day (if possible) or within 24 hours guaranteed.</p>\n" +
    "      <div id=\"concierge-form\">\n" +
    "        <form ng-submit=\"sendMsg()\">\n" +
    "          <input type=\"text\" name=\"title\" ng-model=\"title\" placeholder=\"What event is the gift for?\" /><br/>\n" +
    "          <input type=\"text\" name=\"budget\" ng-model=\"budget\" placeholder=\"Is there a budget you want to stay within?\" /><br/>\n" +
    "          <input type=\"text\" name=\"url\" ng-model=\"url\" placeholder=\"URL to the gift you're thinking of\" /><br/>\n" +
    "          <input type=\"email\" name=\"email\" ng-model=\"email\" placeholder=\"Your email address (required)\" /><br/>\n" +
    "          <input type=\"text\" name=\"comments\" ng-model=\"comments\" placeholder=\"Additional comments\" /><br/>\n" +
    "          <button type=\"submit\" class=\"button red\">SUBMIT</button>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "      <p>{{msg}}</p>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Give the perfect group gift, every time.</h2>\n" +
    "    <div class=\"info\">\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/clock-icon-2x.png\" alt=\"We'll help you find the perfect gift\">\n" +
    "        <br/>\n" +
    "        <h4>Timely, Personalized Service</h4>\n" +
    "        <p>Our Gift Concierge can provide fast and friendly guidance on how to make your gift campaign a success. We can also help you \"quick start\" your GiftStart campaign by setting it up exactly to your needs then sending you the link.</p>\n" +
    "      </div>\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/gift-icon-2x.png\" alt=\"Custom help in finding the right gift\">\n" +
    "        <br/>\n" +
    "        <h4>Personal Gifter</h4>\n" +
    "        <p>Fun, Fast and No Pressure Gift Ideas - we provide recommendations without the feeling of obligation to take our advice. Once you settle on the perfect gift and the campaign is set up, we take care of the rest through the GiftStarter platform (collecting payments and personal messages, making the card, shipping). We've seen hundreds of group gifts, let us help you find yours!</p>\n" +
    "      </div>\n" +
    "      <div class=\"info-item\">\n" +
    "        <img src=\"/assets/concierge/img/bulb-icon-2x.png\" alt=\"Group Gift any gift you can imagine\">\n" +
    "        <br/>\n" +
    "        <h4>If You Can Dream It, You Can Gift It</h4>\n" +
    "        <p>Can't find it on our site? We can make that perfect Group Gift Campaign a reality. No matter what the gift, whether it's horseback riding lessons with a local provider or an airline ticket to a beautiful beach, we can make it happen! For ideas and inspiration, check our <a href=\"http://www.pinterest.com/Giftstarter/\">2014 Gift Guides on Pinterest.</a></p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/faq/faq.html',
    "<div class=\"faq static-pages\" ng-controller=\"FaqController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>FREQUENTLY ASKED QUESTIONS</h1>\n" +
    "    <p>We are here to help in any way we can. If you need help coming up with ideas, finding a gift or setting up your gift, send any request to us. We respond within 1 business day (9AM-7PM PST). Email <a href=\"mailto: giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>, call 206-486-4849, or use the chat option in the bottom right corner of your window.</p>\n" +
    "  </div>\n" +
    "    <div class=\"main\">\n" +
    "      <h2 ng-click=\"toggleAll()\"><img src=\"/assets/plus1.png\" class=\"expand\" ng-hide=\"openQuestions.length == questionCount\"/><img src=\"/assets/minus.png\" class=\"contract\" ng-show=\"openQuestions.length == questionCount\"/><span ng-hide=\"openQuestions.length == questionCount\">Expand All</span><span ng-show=\"openQuestions.length == questionCount\">Close All</span></h2>\n" +
    "      <div ng-repeat=\"section in items\" class=\"sections\">\n" +
    "        <h1>{{section.name}}</h1>\n" +
    "        <div ng-repeat=\"question in section.questions\">\n" +
    "          <h2 ng-click=\"toggleQuestion(question)\" ng-class=\"{open: isOpenQuestion(question)}\"><img src=\"/assets/plus1.png\" class=\"expand\" ng-hide=\"isOpenQuestion(question)\"/><img src=\"/assets/minus.png\" class=\"contract\" ng-show=\"isOpenQuestion(question)\"/>{{question.question}}</h2>\n" +
    "          <p ng-show=\"isOpenQuestion(question)\" ng-bind-html=\"question.answer\"></p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/giftideas/giftideas.html',
    "<div class=\"giftideas wrapper static-pages\" ng-controller=\"GiftideasController\">\n" +
    "    <!-- ==== HEADERWRAP ==== -->\n" +
    "    <div class=\"headerwrap\" name=\"home\" title=\"GiftStarter Team\" ng-show=\"!category\">\n" +
    "        <h1>FIND THE PERFECT GIFT</h1>\n" +
    "        <p>It's that easy.  Weddings, baby showers, birthdays, any occasion - simply find the perfect gift, share it with friends & family so they can pitch in, and we'll take care of shipping it... including a handmade card.</p>\n" +
    "    </div><!-- /headerwrap -->\n" +
    "\n" +
    "    <ng-include src=\"'/scripts/giftideas/giftideas.ng.html'\"></ng-include>\n" +
    "\n" +
    "    <div class=\"clear\">\n" +
    "        <p>&nbsp;</p>\n" +
    "        <h4 class=\"centered\">Looking for something else?</h4>\n" +
    "        <gs-product-search></gs-product-search>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"category || product\" id=\"disclaimer\">\n" +
    "        If the item you GiftStart has color, size or other options, please contact the Gift Concierge to ensure you get the item that best meets your specifications or if you have any other questions regarding your product selection.\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/howitworks/howitworks.html',
    "<div class=\"howitworks static-pages\" ng-controller=\"HowItWorksController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>HOW IT WORKS</h1>\n" +
    "    <p>Let us tell you a bit more about how it works.<br />GiftStarter is the place to give and get meaningful gifts. Gift and pay for ANY product or service TO anyone WITH anyone.</p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"/concierge\">ASK A QUESTION</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <div class=\"menu\">\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'welcome'\" ng-class=\"{selected: sectionShown == 'welcome'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          WELCOME\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'group-gifting'\" ng-class=\"{selected: sectionShown == 'group-gifting'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GROUP GIFTING\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'concierge'\" ng-class=\"{selected: sectionShown == 'concierge'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GIFT CONCIERGE\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'search'\" ng-class=\"{selected: sectionShown == 'search'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          FIND A GIFT\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"menu-wrapper\" ng-click=\"sectionShown = 'glossary'\" ng-class=\"{selected: sectionShown == 'glossary'}\">\n" +
    "        <div class=\"menu-item\">\n" +
    "          GLOSSARY\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"selector-bar\"></div>\n" +
    "\n" +
    "    <div class=\"content\">\n" +
    "      <div id=\"welcome\" ng-show=\"sectionShown == 'welcome'\">\n" +
    "        <h2>Welcome to GiftStarter!</h2>\n" +
    "        <h4>Start amazing gifts here -- ones you are proud to give, and they're happy to get.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          GiftStarter is the best way to bring family and friends together to give an amazing gift. You start it -- and we help you with the rest. When you use GiftStarter, you don't have to collect the money or chase people down for cash.<br />It only takes a couple minutes to launch a campaign for your gift.\n" +
    "          <br />Start an amazing gift today! Once it is complete, we handle ensuring the card with everyone's messages and the gift is shipped!\n" +
    "        </p>\n" +
    "      </div>\n" +
    "      <div id=\"glossary\" ng-show=\"sectionShown == 'glossary'\">\n" +
    "        <h2>Giftstarter Glossary</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement bringing people committed to giving amazing gifts.</h4>\n" +
    "        <p class=\"sub\">\n" +
    "          Here's a glossary of gifting words to help you in our gifting community:\n" +
    "        </p>\n" +
    "        <table>\n" +
    "          <tr>\n" +
    "            <td>GiftStarter - n.</td>\n" +
    "            <td>That's us! We are here to help you give amazing gifts you are proud to give, and they are happy to get.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Champion - n.</td>\n" +
    "            <td>This is a person (you!) that starts an amazing gift, and invites family and friends to pitch in.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Contributor - n.</td>\n" +
    "            <td>The people invited in by the Gift Champion to pitch in on the amazing gift and sign the card.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Recipient - n.</td>\n" +
    "            <td>The person(s) that receive the amazing gift!</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Gift Concierge - n.</td>\n" +
    "            <td>Our Gift Concierge is like your personal shopper who will help you find and give that amazing gift.</td>\n" +
    "          </tr>\n" +
    "          <tr>\n" +
    "            <td>Nudge - n, v.</td>\n" +
    "            <td>These are the gentle friendly reminders (nudges) we make in order to help ensure your gifting event is amazing.</td>\n" +
    "          </tr>\n" +
    "        </table>\n" +
    "      </div>\n" +
    "      <div id=\"search\" ng-show=\"sectionShown == 'search'\">\n" +
    "        <h2>Find an Amazing Gift</h2>\n" +
    "        <h4>GiftStarter helps you give amazing gifts you are proud to give and they are happy to get.</h4>\n" +
    "        <p class=\"sub\">GiftStarter has the tools to help you find those gifts you’re proud to give, and they’re happy to get.</p>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>SEARCH</p>\n" +
    "            <p>Use our search bar located at the top of the page and on the home page to search for products by name or brand. We source our gifts from reliable stores such as:</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-1.png\" />\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT CONCIERGE</p>\n" +
    "            <p>Our Gift Concierge is like you personal shopping assistant who will help you find the perfect gift for the occassion - even if it’s not on our site!</p>\n" +
    "          </div>\n" +
    "          <div id=\"search-item-concierge\">\n" +
    "            <p>You can <a href=\"mailto:giftconcierge@giftstarter.com\">email</a> (giftconcierge@giftstarter.com), contact via <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">chat</a>, or call  206.486.4849</p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"search-item\">\n" +
    "          <div class=\"desc\">\n" +
    "            <p>GIFT IDEAS</p>\n" +
    "            <p>More of a browser when you shop? Our carefully curated gift ideas are a great place to see what new and exciting products there are to gift.</p>\n" +
    "          </div>\n" +
    "          <img src=\"/assets/howitworks/how-it-works-findagift-2.png\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div id=\"concierge\" ng-show=\"sectionShown == 'concierge'\">\n" +
    "        <h2>Gift Concierge</h2>\n" +
    "        <h4>Fast, fun, and no pressure personal shopper to help you find that perfect gift. Can't find it? We can help. Can't think of an idea? We can help.</h4>\n" +
    "        <p class=\"sub\">We'll get back to you same day if possible -- definitely within 24 hours.</p>\n" +
    "        <div class=\"concierge-table\">\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>EMAIL<br/><br/>\n" +
    "              Send us an email at any time. The more information you include about your need, the more we can help!<br/><br/><br/>\n" +
    "              <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>LIVE CHAT<br/><br/>\n" +
    "              You can access our live chat program in the bottom right corner of your browser.<br/><br/>\n" +
    "              <a href=\"javascript:void(0);\" onclick=\"olark('api.box.expand')\">Don't see it?</a><br/><br/>\n" +
    "              *Live chat available during business hours (PST)\n" +
    "            </p>\n" +
    "          </div>\n" +
    "          <div class=\"concierge-item\">\n" +
    "            <p>ONLINE FORM<br/><br/>\n" +
    "              Fill out the quick form about your gifting need and we'll get on it ASAP!<br/><br/><br/>\n" +
    "              <a href=\"/concierge\" class=\"button\">ONLINE FORM</a>\n" +
    "            </p>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <p>Or you can just plain call us: 206-486-4849.</p>\n" +
    "      </div>\n" +
    "      <div id=\"group-gifting\" ng-show=\"sectionShown == 'group-gifting'\">\n" +
    "        <h2>Group Gifting Starts Here</h2>\n" +
    "        <h4>GiftStarter is a new gifting movement focused on bringing people together in a community that loves giving amazing gifts.<br/></h4>\n" +
    "        <p class=\"sub\">Our patent-pending technology divides the price of the gift into perfect pieces, giving family and friends the ability to purchases as many or as few pieces as they wish! Any product available online can be gifted with GiftStarter, and we’re here to help every step of the way. From collecting the money to shipping the gift - and even creating a special card with your personal messages - we’ve got you covered!<br/></p>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-1.png\" />\n" +
    "          <p class=\"center\"><strong>1</strong><br/>FIND A GIFT</p><p>Search from over 3 million products on our site. You can also discover our favorite gifts on our Gift Ideas page or contact our Gift Concierge for custom gifts.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-2.png\" />\n" +
    "          <p class=\"center\"><strong>2</strong><br/>SELECT A GIFT</p><p>From the search results or Gift Ideas page, you can click on product images to view product information and details, and the “GiftStart it” button. Click this button to start your group gift!</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-3.png\" />\n" +
    "          <p class=\"center\"><strong>3</strong><br/>ADJUST THE PIECES</p><p>Click the “+” to add pieces, thus lowering the price of each piece. Click the “-” button to remove pieces, and increase the price of each piece. Consider the size of the group you’ll invite; some people will buy 1 piece, some may buy more.</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-4.png\" />\n" +
    "          <p class=\"center\"><strong>4</strong><br/>YOUR GIFTING EVENT</p><p>Describe the reason for this gift. What’s the event? Who is it for? Why is this a good gift for this person and/or event?</p>\n" +
    "        </div>\n" +
    "        <div class=\"group-item\">\n" +
    "          <img src=\"/assets/howitworks/how-it-works-groupgift-5.png\" />\n" +
    "          <p class=\"center\"><strong>5</strong><br/>THE GIFT</p><p>Tell us where this gift needs to go and when you want it there and we’ll make it happen! <br />*Note standard shipping is always free with GiftStarter</p>\n" +
    "        </div>\n" +
    "        <p class=\"clear sub\">That’s all there is to it. Share and invite friends and family to purchase pieces and give a gift that shows how much you care. We’re here to help you at any time and to ensure the gift and personal card are delivered. <br /><br />Give a remarkable gift today.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"clear\">\n" +
    "      <a href=\"/giftideas\" alt=\"\" class=\"button\" id=\"gifting-button\">START GIFTING</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <hr />\n" +
    "\n" +
    "    <h2>Inspiring Examples</h2>\n" +
    "    <ng-include src=\"'/scripts/inspirationalexamples/inspirationalexamples.ng.html'\"></ng-include>\n" +
    "  </div>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/oldbrowser/oldbrowser.html',
    "<div class=\"oldbrowser wrapper\" ng-controller=\"OldbrowserController\">\n" +
    "    <p>Whoops! Your browser is not supported.  Please use a different browser.</p>\n" +
    "    <p>If you don't have a different browser, you can download one of these for free:</p>\n" +
    "    <p><span><a href=\"https://www.google.com/chrome/browser/\"><img src=\"/assets/chrome-logo.png\"><br/>Google Chrome</a></span><span><a href=\"https://www.mozilla.org/en-US/firefox/new/\"><img src=\"/assets/firefox-logo.png\"><br/>Mozilla Firefox</a></span></p>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/partners/partners.html',
    "<div class=\"partners static-pages\" ng-controller=\"PartnersController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>PARTNER WITH US</h1>\n" +
    "    <p>We love our brand partners. Let your customers be your advocates to their family and friends through gifting. Partner with us today, setup is fast and easy.</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <div id=\"love\">\n" +
    "    <h2>Why do Brands Love GiftStarter?</h2>\n" +
    "    <p class=\"sub\">GiftStarter is the best group gifting service for brands. We enable seamless social commerce with our patent-pending technology. We ship a handmade card and the gift with every GiftStart. Using social, we connect family and friends to gift-pportunities. GiftStarters love our partner products and services. In fact, they are gifted 4:1 over others. Join us and give your customers a better way to gift, together.</p>\n" +
    "      <div class=\"love-item\">\n" +
    "        <img src=\"assets/partners/img/money-icon-2x.png\" alt=\"Increase Sales Opportunities\">\n" +
    "        <br>\n" +
    "        <h4>Increase Sales Opportunities</h4>\n" +
    "        <p>Broaden the reach of your target audience and increase brand exposure with GiftStarter. Group gifts expand your reach and sell additional products and services to audiences who may not have previously been exposed to your brand. Additionally, our Gift Concierge service promotes our brand partners by providing users with group gift ideas, helping to gain new customers.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "        <img src=\"assets/partners/img/truck-icon-2x.png\" alt=\"We Take Care of Delivery\">\n" +
    "        <br>\n" +
    "        <h4>We Take Care of Delivery</h4>\n" +
    "        <p>No hassling with special shipment inputs. GiftStarter works directly with the initiators of GiftStarts to collect recipient shipping information and directly inputs this into your current e-commerce flow.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "          <img src=\"assets/partners/img/no-fee-icon-2x.png\" alt=\"No Setup Fee\">\n" +
    "          <br>\n" +
    "          <h4>No Setup Fee (Early Partners Only)</h4>\n" +
    "          <p>Using our seamless integration of the GiftStarter button, we work directly with partners to ensure end-to-end integration of the group gifting experience into your e-commerce platform. This complimentary service is provided through our technical and partner teams. Setup typically takes less then 20 minutes.</p>\n" +
    "      </div>\n" +
    "      <div class=\"love-item\">\n" +
    "          <img src=\"assets/partners/img/thumb-2x.png\" alt=\"Our Users, Your Brand Ambassadors\">\n" +
    "          <br>\n" +
    "          <h4>Our Users, Your Brand Ambassadors</h4>\n" +
    "          <p>Partnering with GiftStarter brings the added benefit of engaging directly with ambassadors of your brands, as group gifting allows users to easily promote your products and services through their circle of family and friends. GiftStarter delivers a higher level of perceived value  providing more reasons to purchase including social media integration and handcrafted cards.</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Featured Partners</h2>\n" +
    "    <div>\n" +
    "      <div class=\"partner-item\">\n" +
    "        <img src=\"assets/partners/img/butter-logo-square.png\" alt=\"butterLondon - Partner\">\n" +
    "\n" +
    "        <p>“With the growing importance of social influence\n" +
    "        and mobile shopping to our customers, we needed to explore a solution that allows our Bezzie Mates to shop and give socially this holiday season. GiftStarter was the perfect partner to celebrate this customer experience and support group giftting across social and digital platforms.”</p>\n" +
    "        <h4><b>Leslie Freitag</b></h4>\n" +
    "        <h5>President & CEO</h5>\n" +
    "      </div>\n" +
    "      <div class=\"partner-item\">\n" +
    "        <img src=\"assets/partners/img/bh-logo.png\" alt=\"B&H Photo - Partner\">\n" +
    "\n" +
    "        <p>“I just love Giftstarter! I think it creates an easy platform for us to present large order items as gifts for photographers, providing a great benefit to B&H customers you can't find anywhere else!”</p>\n" +
    "        <h4><b>Menashe Wodinksy</b></h4>\n" +
    "        <h5>Online Marketing Strategist</h5>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <hr />\n" +
    "    <h2>Start Delighting Customers Now</h2>\n" +
    "    <p>Expand your brand and better connect with audiences through group gifting.</p>\n" +
    "    <a href=\"mailto:partner@giftstarter.com\" class=\"button\">PARTNER WITH US</a>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/press/press.html',
    "<div class=\"static-pages presspage\" ng-controller=\"PressController\">\n" +
    "  <div class=\"headerwrap\">\n" +
    "    <h1>IN THE NEWS</h1>\n" +
    "    <p>We've been fortunate enough to be featured by some of the most prestigious media outlets in the world. <span class=\"wrap-on-desktop\">See what all of the buzz is about.</span></p>\n" +
    "    <a class=\"button red\" target=\"_blank\" href=\"/blog\">READ MORE</a>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"main\">\n" +
    "    <h2>Who's talking about GiftStarter?</h2>\n" +
    "    <div class=\"press-item\" ng-repeat=\"item in items\">\n" +
    "      <a href=\"{{item.link}}\" target=\"_blank\">\n" +
    "      <img src=\"assets/press/{{item.img}}\" />\n" +
    "      </a>\n" +
    "      <p ng-bind-html=\"item.quote\"></p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"bottom\">\n" +
    "    <hr />\n" +
    "    <h2>Try it yourself!</h2>\n" +
    "    <a class=\"button\" href=\"/giftideas\">START GIFTING</a>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/static-pages/privacy/privacy.html',
    "<div class=\"faq wrapper privacyandterms\">\n" +
    "<h1>Privacy Policy</h1>\n" +
    "<p>The Site is operated by GiftStarter, Inc. (\"GiftStarter\" or the \"Company\"). This page sets forth the Privacy Policy (the \"Policy\") for the website at GiftStarter.com, all other sites owned and operated by GiftStarter that redirect to www.GiftStarter.com, and all subdomains (collectively, the “Site”), and the service owned and operated by the Company (together with the Site, the “Service”)</p>\n" +
    "<p>We take the responsibility of having your personal information very seriously. We use your personal information only for providing and improving the Service. We treat your personal information as we would and do treat our own.</p>\n" +
    "<p>By using the Service, you consent to the collection and use of information in accordance with this Policy.</p>\n" +
    "<p>The Company reserves the right, at its sole discretion, to modify or replace this Policy by posting the updated version on the Site. It is your responsibility to check this Policy periodically for changes. Your continued use of the Service following the posting of any changes to this Policy constitutes your acceptance of those changes.</p>\n" +
    "<h2>Collection of Information</h2>\n" +
    "<p>We may collect and process the following information about you:</p>\n" +
    "<ul>\n" +
    "<li>Information (such as your name, email and postal address, telephone number, sex, and country of residence) that you provide by completing forms on the Site, including if you register as a user of the Service, subscribe to our newsletter, upload or submit any material through the Site, or request any information;</li>\n" +
    "<li>Your log-in and password details in connection with the account sign-in process;</li>\n" +
    "<li>Details of any requests or transactions made by you through the Service;</li>\n" +
    "<li>Communications you send to us, for example to report a problem or to submit queries, concerns, or comments regarding the Service or its content;</li>\n" +
    "<li>Information that you post to the Site in the form of comments or contributions to discussions; and</li>\n" +
    "<li>IP addresses.</li>\n" +
    "</ul>\n" +
    "<h2>Uses of Your Personal Information</h2>\n" +
    "<p>We will use the personal information you provide to:</p>\n" +
    "<ul>\n" +
    "<li>Identify you when you sign-in to your account;</li>\n" +
    "<li>Enable us to provide you with the Services;</li>\n" +
    "<li>Send you information we think you may find useful or which you have requested from us;</li>\n" +
    "<li>Present projects to you when you use the Service which we believe will be of interest based on your geographic location and previous use of the Service;</li>\n" +
    "<li>Administer your account with us;</li>\n" +
    "<li>Enable us to contact you regarding any question you make through the Service;</li>\n" +
    "<li>Analyze the use of the Service and the people visiting to improve our content and Services; and</li>\n" +
    "<li>Use for other purposes that we may disclose to you when we request your information.</li>\n" +
    "</ul>\n" +
    "<p>Campaign creators (GiftStarters) receive the names of the Gift Givers during the GiftStart process.</p>\n" +
    "<p>GiftStarters never receive Gift Givers' credit card information.</p>\n" +
    "<p>We provide the verified personal or legal entity name to Gift Givers in their receipt emails. In the future, we may provide these names to Gift Givers or other users on the project page or other areas.</p>\n" +
    "<p>Personal information is collected via Secure Socket Layer (SSL) protocol (https) to ensure security and safety.</p>\n" +
    "<h2>Email</h2>\n" +
    "<p>We want to communicate with you only if you want to hear from us. We try to keep emails to a minimum and give you the ability to opt out when we can.</p>\n" +
    "<p>We will send you email relating to your personal transactions. We will keep these emails to a minimum.\n" +
    "You will also receive certain email notifications, for which you may opt-out.</p>\n" +
    "<p>We may send you service-related announcements on rare occasions when it is necessary to do so.</p>\n" +
    "<h2>Third-Party Services</h2>\n" +
    "<p>We never post anything to your accounts with Facebook, Twitter, or any other third-party sites without your permission.</p>\n" +
    "<p>Except for the purposes of providing the Services, we will not give your name or personal information to third parties.</p>\n" +
    "<h2>Technology</h2>\n" +
    "<p>Cookies are small pieces of information which are issued to your computer when you visit a website and which store and sometimes track information about your use of the Service. GiftStarter uses cookies to help recognize you as a repeat visitor, to improve the quality of our Service, and to try and make your browsing experience meaningful. When you enter our Site, our web server sends a cookie to your computer which allows us to recognize your computer but not specifically who is using it. By associating the identification numbers in the cookies with other customer information when, for example, you log-in to the Service, then we know that the cookie information relates to you. Some of the code and cookies used by our Service are served by us, and some are served by third parties who are delivering services on our behalf.</p>\n" +
    "<p>Most web browsers automatically accept cookies but, if you prefer, you can change your browser to prevent that or to notify you each time a cookie is set. You can also learn more about cookies by visiting <a href=\"http://www.allaboutcookies.org\">www.allaboutcookies.org</a> which includes additional useful information on cookies and how to block cookies using different browsers. By blocking or deleting cookies used on our Service, you may not be able to take full advantage of our Service.</p>\n" +
    "<h2>Voluntary Disclosure</h2>\n" +
    "<p>Any personal information or content that you voluntarily disclose in public areas of the Site becomes publicly available and can be collected and used by other users. You should exercise caution before disclosing your personal information through these public venues.</p>\n" +
    "<p>GiftStarters never receive users' credit card information.</p>\n" +
    "<h2>Wrap-up</h2>\n" +
    "<p>GiftStarter reserves the right to disclose your personally identifiable information as required by law and when we believe that disclosure is necessary to protect our rights, or in the good-faith belief that it is necessary to comply with the law.</p>\n" +
    "<p>On request, we will give you a copy of all the personal information about you that we hold. This information is subject to a fee not exceeding the prescribed fee permitted by law.</p>\n" +
    "<p>People under 18 (or the legal age in your jurisdiction) are not permitted to use GiftStarter on their own, and so this privacy policy makes no provision for their use of the site.</p>\n" +
    "<p>Information that you submit through the Service may be transferred to countries outside the European Economic Area (“EEA”) to provide the Service to you. For example, our servers are in the United States. If we transfer your information outside the EEA in this way, we will take steps to ensure that your privacy rights continue to be protected.</p>\n" +
    "<p>Your privacy is very important to us, but due to the existing legal regulatory and security environment, we cannot fully ensure that your private communications and other personally identifiable information will not be disclosed to third parties. Under certain circumstances, the government or third parties may lawfully or unlawfully intercept or access transmissions or private communications. Additionally, in the unlikely event we need to investigate or resolve possible problems or inquiries, we may disclose information about you to private entities, law enforcement, or other government officials as we, in our sole discretion, believe necessary or appropriate.</p>\n" +
    "<p>GiftStarter encourages you to learn as much as you can about your privacy on the Internet. To find out more, visit <a href=\"http://www.bbbonline.org\">www.bbbonline.org</a> or <a href=\"http://www.TRUSTe.com\">www.TRUSTe.com</a>.</p>\n" +
    "<h2>Questions</h2>\n" +
    "<p>If you have questions or suggestions, please contact our primary Privacy Agent at <a href=\"mailto:arry@giftstarter.com\">arry@giftstarter.com</a>.</p>\n" +
    "<p>Updated: July 2014</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/terms/terms.html',
    "<div class=\"wrapper faq privacyandterms\">\n" +
    "<h1>Terms of Use</h1>\n" +
    "<p>GiftStarter.com’s goal is to provide the #1 online gifting experience service.  The GiftStarter.com websites exist for the purpose of providing a personal gifting experience with one or more people together.  Any use outside of this purpose is prohibited.  These terms of use apply exclusively to your access and use of the GiftStarter.com website, and any parts or sections thereof including, but not limited to GiftStarter.com web content, member-personalized GiftStarter.com GiftStart information, user information, photos, and graphics (hereinafter referred to as the “site.)</p>\n" +
    "<h2>Summary of Service</h2>\n" +
    "<p>GiftStarter is a platform where certain users (\"GiftStarters\") run GiftStarts to fund gifts from one or more gifters (Gift Givers).  Through the Site, email, websites, and other media, the Service makes accessible various content, including, but not limited to, videos, photographs, images, artwork, graphics, audio clips, comments, data, text, software, scripts, projects, other material and information, and associated trademarks and copyrightable works (collectively, “Content”). Gift GiftStarters, Gift Givers, and other visitors to and users of the Service (collectively, “Users”) may have the ability to contribute, add, create, upload, submit, distribute, facilitate the distribution of, collect, post, or otherwise make accessible (\"Submit\") Content. “User Submissions” means any Content Submitted by Users.</p>\n" +
    "<h2>Acceptance of Terms</h2>\n" +
    "<p>If you do not agree with any of these terms, do not access or otherwise use the Site or any information or materials contained on the Site.  Your use of the Site shall be deemed to be your agreement to abide by each of the terms set below.\n" +
    "Please read these Terms of Use (the \"Agreement\" or \"Terms of Use\") carefully before using the services offered by Emotiv Labs, Inc. or Emotive Labs, Inc. (together “GiftStarter” or the “Company”). This Agreement sets forth the legally binding terms and conditions for your use of the website at www.GiftStarter.com, all other sites owned and operated by GiftStarter that redirect to www.GiftStarter.com, and all subdomains (collectively, the “Site”), and the service owned and operated by the Company (together with the Site, the “Service”). By using the Service in any manner, including, but not limited to, visiting or browsing the Site or contributing content, information, or other materials or services to the Site, you agree to be bound by this Agreement.</p>\n" +
    "<p>The Service is offered subject to acceptance of all of the terms and conditions contained in these Terms of Use, including the Privacy Policy and all other operating rules, policies, and procedures that may be published on the Site by the Company, which are incorporated by reference. These Terms of Use apply to every user of the Service. In addition, some services offered through the Service may be subject to additional terms and conditions adopted by the Company. Your use of those services is subject to those additional terms and conditions, which are incorporated into these Terms of Use by this reference.</p>\n" +
    "<p>The Company reserves the right, at its sole discretion, to modify or replace these Terms of Use by posting the updated terms on the Site. It is your responsibility to check the Terms of Use periodically for changes. Your continued use of the Service following the posting of any changes to the Terms of Use constitutes acceptance of those changes.</p>\n" +
    "<p>The Company reserves the right to change, suspend, or discontinue the Service (including, but not limited to, the availability of any feature, database, or Content) at any time for any reason. The Company may also impose limits on certain features and services or restrict your access to parts or all of the Service without notice or liability.</p>\n" +
    "<p>The Service is available only to individuals who are at least 18 years old (and at least the legal age in your jurisdiction). You represent and warrant that if you are an individual, you are at least 18 years old and of legal age in your jurisdiction to form a binding contract, and that all registration information you submit is accurate and truthful. The Company reserves the right to ask for proof of age from you and your account may be suspended until satisfactory proof of age is provided. The Company may, in its sole discretion, refuse to offer the Service to any person or entity and change its eligibility criteria at any time. This provision is void where prohibited by law and the right to access the Service is revoked in those jurisdictions.</p>\n" +
    "<h2>Rules and Conduct</h2>\n" +
    "<p>As a condition of use, you promise not to use the Service for any purpose that is prohibited by the Terms of Use or law. The Service is provided only for your own personal, non-commercial use (except as allowed by the terms set forth in the section of these Terms of Use titled, \"Gifts: Fundraising and Commerce\"). You are responsible for all of your activity in connection with the Service. You shall not, and shall not permit any third party using your account to, take any action, or Submit Content, that:</p>\n" +
    "<ul>\n" +
    "<li>Infringes any patent, trademark, trade secret, copyright, right of publicity, or other right of any other person or entity, or violates any law or contract;</li>\n" +
    "<li>You know is false, misleading, or inaccurate;</li>\n" +
    "<li>Is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, tortious, obscene, offensive, profane, or invasive of another's privacy;</li>\n" +
    "<li>Contains software viruses or any other computer codes, files, or programs that are designed or intended to disrupt, damage, limit, or interfere with the proper function of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any system, data, password, or other information of the Company or any third party;</li>\n" +
    "<li>Is made in breach of any legal duty owed to a third party, such as a contractual duty or a duty of confidence; or\n" +
    "impersonates any person or entity, including any employee or representative of the Company.</li>\n" +
    "</ul>\n" +
    "<p>Additionally, you shall not: (i) take any action that imposes or may impose (as determined by the Company in its sole discretion) an unreasonable or disproportionately large load on the Company’s or its third-party providers’ infrastructure; (ii) interfere or attempt to interfere with the proper working of the Service or any activities conducted on the Service; (iii) bypass any measures the Company may use to prevent or restrict access to the Service (or other accounts, computer systems, or networks connected to the Service); (iv) run Maillist, Listserv, or any form of auto-responder or \"spam\" on the Service; or (v) use manual or automated software, devices, or other processes to \"crawl\" or \"spider\" any page of the Site.</p>\n" +
    "<p>You shall not directly or indirectly: (i) decipher, decompile, disassemble, reverse engineer, or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Service, except to the extent applicable laws specifically prohibit such restriction; (ii) modify, translate, or otherwise create derivative works of any part of the Service; or (iii) copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive hereunder. You shall abide by all applicable local, state, national, and international laws and regulations.</p>\n" +
    "<p>Users agree to not abuse other users' personal information. Abuse is defined as using personal information for any purpose other than those explicitly specified in the GiftStarter’s GiftStart, or is not related to fulfilling delivery of a product or service explicitly specified in the GiftStarters’s GiftStart.</p>\n" +
    "<h2>Registration</h2>\n" +
    "<p>You may view Content on the Site without registering, but as a condition of using certain aspects of the Service, you may be required to register with the Company and select a screen name (\"User ID\") and password. You shall provide accurate, complete, and updated registration information. Failure to do so shall constitute a breach of the Terms of Use, which may result in immediate termination of your account. You shall not use as a User ID, domain name, or project name any name or term that (i) is the name of another person, with the intent to impersonate that person; (ii) is subject to any rights of another person, without appropriate authorization; or (iii) is offensive, vulgar, or obscene. The Company reserves the right in its sole discretion to refuse registration of or cancel a User ID, domain name, and project name. You are solely responsible for activity that occurs on your account and shall be responsible for maintaining the confidentiality of your password for the Site. You shall never use another User account without the other User’s express permission. You will immediately notify the Company in writing of any unauthorized use of your account, or other known account-related security breach.</p>\n" +
    "<h2>Hyperlinks to this Site</h2>\n" +
    "<p>You are granted a limited, nonexclusive right to create a \"hypertext\" link to the Site provided that such link is to the entry page of the Site (or your GiftStart page within the Site) and does not portray GiftStarter. or any of its other products or services in a false, misleading, derogatory, or otherwise defamatory manner. This limited right may be revoked at any time for any reason whatsoever. You may not use, frame, or utilize framing techniques to enclose any GiftStarter trademark, logo or trade name or other proprietary information including the images found at the Site, the content of any text or the layout/design of any page or any form contained on a page without the express written consent of GiftStarter (or Emotiv Labs, Inc.)</p>\n" +
    "<h2>Gifts: Fundraising and Commerce</h2>\n" +
    "<p>GiftStarter is a platform where GiftStarters run campaigns to fund gifts. By creating a campaign (GiftStart) on GiftStarter, you as the GiftStarter are offering the public the opportunity to enter into a contract with you. By backing a GiftStart on GiftStarter, you as the Gift Giver(s) accept that offer and the contract between Gift Giver(s) and GiftStarter is formed. GiftStarter is not a party to that agreement between the Gift Giver(s) and GiftStarter. All dealings are solely between Users.</p>\n" +
    "<p>By backing or creating a GiftStart on GiftStarter, you agree to be bound by this entire Agreement, including the following terms:</p>\n" +
    "<ul>\n" +
    "<li>Gift Givers agree to provide their payment information at the time they contribution to a GiftStart. The payment will be collected at the moment of gifting.  The gift or gift amount requested will be gifted to the User designated as the “Gift Recipient” in the GiftStart setup process. The amount Gift Givers contribution is the amount they will be charged.</li>\n" +
    "<li>Gift Givers consent to GiftStarter and its payments partners authorizing or reserving a charge on their payment card or other payment method for any amount up to the full contribution at any time between the contribution and collection of the funds.</li>\n" +
    "<li>Gift Givers agree to have sufficient funds or credit available at the GiftStart deadline to ensure that the contribution will be collectible.</li>\n" +
    "<li>Gift Givers may not cancel or reduce their contribution once the GiftStart has been funded and/or the GiftStart deadline has been passed (10 days).</li>\n" +
    "<li>The Estimated gift delivery date for each gift is not a promise to fulfill by that date, but is merely an estimate of when GiftStarter aims to deliver the gift by.</li>\n" +
    "<li>For some gifts, the GiftStarter needs further information from Gift Givers, such as a mailing address or t-shirt size, to enable the GiftStarter to deliver the gifts. GiftStarter shall request the information directly from GiftStarter or Gift Givers at some point during or after the GiftStart.</li>\n" +
    "<li>GiftStarter does not offer refunds.</li>\n" +
    "<li>Because of occasional failures of payments from Gift Givers, GiftStarter cannot guarantee the receipt by Gift Recipient of the amount contributed minus fees.</li>\n" +
    "<li>GiftStarter and its payments partners will remove their fees before transmitting proceeds of a GiftStart. Fees may vary depending on region and other factors (e.g. taxes, shipping).</li>\n" +
    "<li>GiftStarter reserves the right to cancel a contribution at any time and for any reason.</li>\n" +
    "<li>GiftStarter reserves the right to reject, cancel, interrupt, remove, or suspend a GiftStart at any time and for any reason. GiftStarter is not liable for any damages as a result of any of those actions. GiftStarter’s policy is not to comment on the reasons for any of those actions.</li>\n" +
    "<li>Users should not take any action in reliance on having their project posted on the Site or having any of the money contributed until they have the ability to withdraw and spend the money. There may be a delay between the end of a successful GiftStart and access to the funds.</li>\n" +
    "</ul>\n" +
    "<p>GiftStarter is not liable for any damages or loss incurred related to gifts or any other use of the Service. GiftStarter is under no obligation to become involved in disputes between any Users, or between Users and any third party arising in connection with the use of the Service. This includes, but is not limited to, delivery of goods and services, and any other terms, conditions, warranties, or representations associated with GiftStarts on the Site. GiftStarter does not oversee the performance or punctuality of projects. The Company does not endorse any User Submissions. You release GiftStarter, its officers, employees, agents, and successors in rights from claims, damages, and demands of every kind, known or unknown, suspected or unsuspected, disclosed or undisclosed, arising out of or in any way related to such disputes and the Service.</p>\n" +
    "<h2>Fees and Payments</h2>\n" +
    "<p>Joining GiftStarter is free. However, we do charge fees for certain services. When you use a service that has a fee you have an opportunity to review and accept the fees that you will be charged. Changes to fees are effective after we provide you with notice by posting the changes on the Site. You are responsible for paying all fees and taxes associated with your use of the Service.</p>\n" +
    "<p>Funds contributed by Gift Givers are collected by PayPal. GiftStarter is not responsible for the performance of PayPal.\n" +
    "Third Party Payment Services.</p>\n" +
    "<p>GiftStarter provides links and interfaces to third party payment services, such as PayPal, which permit gift givers to send funds to purchase gifts on behalf of the GiftStarter(s) and Gift Giver(s) for the Gift Recipient(s). You acknowledge that while GiftStarter. provides links to these third party payment services, GiftStarter. does not control and is not responsible for payments made or received through these services. Any use of third party payment services by you will be subject to the fees, terms and conditions of such third party payment services, and at your own risk.</p>\n" +
    "<p>In some circumstances and in order to reduce transactions fees, GiftStarter may collect and pay PayPal payment fees on behalf of the user. You acknowledge these fees will automatically be paid to GiftStarter via PayPal.</p>\n" +
    "<p>Gift givers acknowledge that they are submitting payment via PayPal, and therefore, GiftStarter cannot be responsible for lost payments, identity theft, fraud or refunds.</p>\n" +
    "<h2>Third-Party Sites</h2>\n" +
    "<p>The Service may permit you to link to other websites or resources on the internet, and other websites or resources may contain links to the Site. When you access third-party websites, you do so at your own risk. Those other websites are not under the Company's control, and you acknowledge that the Company is not liable for the content, functions, accuracy, legality, appropriateness, or any other aspect of those other websites or resources. The inclusion on another website of any link to the Site does not imply endorsement by or affiliation with the Company. You further acknowledge and agree that the Company shall not be liable for any damage related to the use of any content, goods, or services available through any third-party website or resource.</p>\n" +
    "<h2>Content and License</h2>\n" +
    "<p>You agree that the Service contains Content provided by the Company and its partners and Users and that the Content may be protected by copyrights, trademarks, service marks, patents, trade secrets, or other rights and laws. You shall abide by and maintain all copyright and other legal notices, information, and restrictions contained in any Content accessed through the Service.</p>\n" +
    "<p>The Company grants to each User of the Service a worldwide, non-exclusive, non-sublicensable and non-transferable license to use and reproduce the Content, solely for personal, non-commercial use. Use, reproduction, modification, distribution, or storage of any Content for other than personal, non-commercial use is prohibited without prior written permission from the Company, or from the copyright holder. You shall not sell, license, rent, or otherwise use or exploit any Content for commercial use or in any way that violates any third-party right.</p>\n" +
    "<h2>Changes to the Site</h2>\n" +
    "<p>The Company reserves the right from time to time to make modifications and changes to the Site. These modifications and changes may include, but are not limited to, discontinuing, temporarily or permanently, any service offered by, or through the Company. (or any part thereof) with or without notice. You agree that the Company shall not be liable to you or to any other party for any changes and modifications to the Site.</p>\n" +
    "<h2>Intellectual Property</h2>\n" +
    "<p>By Submitting User Submissions on the Site or otherwise through the Service, you agree to the following terms:</p>\n" +
    "<ul>\n" +
    "<li>GiftStarter’s Service is patent pending, under both United States and International intellectual property laws and agreements. You shall not directly or indirectly: (i) decipher, decompile, disassemble, reverse engineer, or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Service, except to the extent applicable laws specifically prohibit such restriction; (ii) modify, translate, or otherwise create derivative works of any part of the Service; or (iii) copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive hereunder. You shall abide by all applicable local, state, national, and international laws and regulations.</li>\n" +
    "<li>You are publishing your User Submission, and you may be identified publicly by your name or User ID in association with your User Submission.</li>\n" +
    "<li>You grant to GiftStarter a non-exclusive license to access your User Submissions through the Service, and to use, edit, modify, reproduce, distribute, prepare derivative works of, display and perform such User Submissions solely for commercial use.</li>\n" +
    "<li>You further agree that your User Submissions will not contain third-party copyrighted material, or material that is subject to other third-party proprietary rights, unless you have permission from the rightful owner of the material or you are otherwise legally entitled to post the material and to grant GiftStarter all of the license rights granted herein.</li>\n" +
    "<li>You will pay all royalties and other amounts owed to any person or entity based on your Submitting User Submissions to the Service or the Company’s publishing or hosting of the User Submissions as contemplated by these Terms of Use.</li>\n" +
    "<li>The use or other exploitation of User Submissions by the Company and Users as contemplated by this Agreement will not infringe or violate the rights of any third party, including without limitation any privacy rights, publicity rights, copyrights, contract rights, or any other intellectual property or proprietary rights.</li>\n" +
    "<li>The Company shall have the right to delete, edit, modify, reformat, excerpt, or translate any of your User Submissions.</li>\n" +
    "<li>All information publicly posted or privately transmitted through the Site is the sole responsibility of the person from which that content originated.</li>\n" +
    "<li>The Company will not be liable for any errors or omissions in any Content.</li>\n" +
    "<li>The Company cannot guarantee the identity of any other Users with whom you may interact while using the Service.</li>\n" +
    "<li>All Content you access through the Service is at your own risk and you will be solely responsible for any resulting damage or loss to any party.</li>\n" +
    "</ul>\n" +
    "<p>In accordance with the Digital Millennium Copyright Act, GiftStarter has adopted a policy of, in appropriate circumstances, terminating User accounts that are repeat infringers of the intellectual property rights of others. GiftStarter also may terminate User accounts even based on a single infringement.</p>\n" +
    "<h2>Copyright Notifications</h2>\n" +
    "<p>Any materials on the Site, including without limitation any documentation, content, text, data, graphics, images, interfaces or other material or works of authorship (the \"Materials\") are copyrighted material owned by or licensed to GiftStarter. All rights are reserved. The Materials contain trademarks, service marks and trade names which are owned by Honeyfund.com, Inc. and its affiliates, and may also contain brand and product names which are trademarks, service marks or trade names of third parties which are owned by their respective owners.</p>\n" +
    "<p>GiftStarter will remove infringing materials in accordance with the DMCA if properly notified that Content infringes copyright. If you believe that your work has been copied in a way that constitutes copyright infringement, please notify GiftStarter's Copyright Agent by emailing Arry at arry@giftstarter.com. Your email must contain the following information (please confirm these requirements with your legal counsel, or see the U.S. Copyright Act, 17 U.S.C. §512(c)(3), for more information):</p>\n" +
    "<ul>\n" +
    "<li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;</li>\n" +
    "<li>A description of the copyrighted work that you claim has been infringed;</li>\n" +
    "<li>A description of where the material that you claim is infringing is located on the Site, sufficient for GiftStarter to locate the material;</li>\n" +
    "<li>Your address, telephone number, and email address;</li>\n" +
    "<li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and</li>\n" +
    "<li>A statement by you that the information in your notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>\n" +
    "</ul>\n" +
    "<p>If you believe that your work has been removed or disabled by mistake or misidentification, please notify GiftStarter’s Copyright Agent in writing by emailing Arry at arry@giftstarter.com. Your counter-notice must contain the following information (please confirm these requirements with your legal counsel or see the U.S. Copyright Act, 17 U.S.C. §512(g)(3), for more information):</p>\n" +
    "<ul>\n" +
    "<li>A physical or electronic signature of the user of the Services;</li>\n" +
    "<li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled;</li>\n" +
    "<li>A statement made under penalty of perjury that the subscriber has a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material; and</li>\n" +
    "<li>The subscriber's name, address, telephone number, and a statement that the subscriber consents to the jurisdiction of the Federal District Court for the judicial district in which the address is located, or if the subscriber's address is outside of the United States, for any judicial district in which the service provider may be found, and that the user will accept service of process from the person who provided notification under subscriber (c)(1)(C) or an agent of such person.</li>\n" +
    "</ul>\n" +
    "<p>Under the Copyright Act, any person who knowingly materially misrepresents that material is infringing or was removed or disabled by mistake or misidentification may be subject to liability.</p>\n" +
    "<p>If you fail to comply with these notice requirements, your notification or counter-notification may not be valid.</p>\n" +
    "<p>Our designated copyright agent for notice of alleged copyright infringement can be reached at:</p>\n" +
    "<p>Emotiv Labs, Inc. <br>\n" +
    "Attn: Copyright Agent <br>\n" +
    "PO Box 18284 <br>\n" +
    "Seattle, WA 98118 <br>\n" +
    "Email: arry@giftstarter.com</p>\n" +
    "<h2>Termination</h2>\n" +
    "<p>The Company may terminate your access to the Service, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account. If you wish to terminate your account, you may do so by following the instructions on the Site. Any fees paid to the Company are non-refundable. All provisions of the Terms of Use that by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>\n" +
    "<h2>Warranty Disclaimer</h2>\n" +
    "<p>The Company has no special relationship with or fiduciary duty to you. You acknowledge that the Company has no duty to take any action regarding any of the following: which Users gain access to the Site; what Content Users access through the Site; what effects the Content may have on Users; how Users may interpret or use the Content; or what actions Users may take as a result of having been exposed to the Content. The Company cannot guarantee the authenticity of any data or information that Users provide about themselves or their GiftStarts and projects. You release the Company from all liability for your having acquired or not acquired Content through the Site. The Site may contain, or direct you to websites containing, information that some people may find offensive or inappropriate. The Company makes no representations concerning any Content on the Site, and the Company is not liable for the accuracy, copyright compliance, legality, or decency of material contained on the Service.</p>\n" +
    "<p>The Company does not guarantee that any Content will be made available through the Service. The Company has no obligation to monitor the Service or Content. The Company reserves the right to, at any time, for any reason, and without notice: (i) cancel, reject, interrupt, remove, or suspend a GiftStart or project; (ii) remove, edit, or modify any Content, including, but not limited to, any User Submission; and (iii) remove or block any User or User Submission. GiftStarter reserves the right not to comment on the reasons for any of these actions.</p>\n" +
    "<p>The Service is provided “as is” and “as available” and is without warranty of any kind, express or implied, including, but not limited to, the implied warranties of title, non-infringement, merchantability, and fitness for a particular purpose, and any warranties implied by any course of performance or usage of trade, all of which are expressly disclaimed. The Company, and its directors, employees, agents, suppliers, partners, and content providers do not warrant that: (a) the Service will be secure or available at any particular time or location; (b) any defects or errors will be corrected; (c) any content or software available at or through the Service is free of viruses or other harmful components; or (d) the results of using the Service will meet your requirements. Your use of the Service is solely at your own risk. Some states or countries do not allow limitations on how long an implied warranty lasts, so the above limitations may not apply to you.</p>\n" +
    "<p>The Company makes no guaranty of confidentiality or privacy of any communication or information transmitted on the Site or any website linked to the Site. The Company will not be liable for the privacy of email addresses, registration and identification information, disk space, communications, confidential or trade-secret information, or any other Content stored on the Company’s equipment, transmitted over networks accessed by the Site, or otherwise connected with your use of the Service.</p>\n" +
    "<p>Electronic Communications Privacy Act Notice (18 USC §2701-2711): THE COMPANY MAKES NO GUARANTY OF CONFIDENTIALITY OR PRIVACY OF ANY COMMUNICATION OR INFORMATION TRANSMITTED ON THE SITE OR ANY WEBSITE LINKED TO THE SITE. The Company will not be liable for the privacy of email addresses, registration and identification information, disk space, communications, confidential or trade-secret information, or any other Content stored on the Company’s equipment, transmitted over networks accessed by the Site, or otherwise connected with your use of the Service.</p>\n" +
    "<h2>Indemnification</h2>\n" +
    "<p>You shall defend, indemnify, and hold harmless the Company, its affiliates, and each of its and its affiliates’ employees, contractors, directors, suppliers, and representatives from all liabilities, claims, and expenses, including reasonable attorneys' fees and other legal costs, that arise from or relate to your use or misuse of, or access to, the Service and Content, or otherwise from your User Submissions, violation of the Terms of Use, or infringement by you, or any third party using your account, of any intellectual property or other right of any person or entity. The Company reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will assist and cooperate with the Company in asserting any available defenses.</p>\n" +
    "<h2>Limitation of Liability</h2>\n" +
    "<p>In no event shall the Company, nor its directors, employees, agents, partners, suppliers, or content providers, be liable under contract, tort, strict liability, negligence, or any other legal or equitable theory with respect to the service (i) for any lost profits, data loss, cost of procurement of substitute goods or services, or special, indirect, incidental, punitive, or consequential damages of any kind whatsoever, substitute goods or services (however arising), (ii) for any bugs, viruses, trojan horses, or the like (regardless of the source of origination), or (iii) for any direct damages in excess of (in the aggregate) one hundred U.S. dollars ($100.00). some states or countries do not allow the exclusion or limitation of incidental or consequential damages, so the above limitations and exclusions may not apply to you.</p>\n" +
    "<h2>International</h2>\n" +
    "<p>Accessing the Service is prohibited from territories where the Content is illegal. If you access the Service from other locations, you do so at your own initiative and are responsible for compliance with local laws.</p>\n" +
    "<h2>Electronic Delivery, Notice Policy, and Your Consent</h2>\n" +
    "<p>By using the Services, you consent to receive from GiftStarter all communications including notices, agreements, legally required disclosures, or other information in connection with the Services (collectively, \"Contract Notices\") electronically. GiftStarter may provide the electronic Contract Notices by posting them on the Site. If you desire to withdraw your consent to receive Contract Notices electronically, you must discontinue your use of the Services.</p>\n" +
    "<h2>Governing Law</h2>\n" +
    "<p>These Terms of Service (and any further rules, policies, or guidelines incorporated by reference) shall be governed by and construed in accordance with the laws of the United States, without giving effect to any principles of conflicts of law, and without application of the Uniform Computer Information Transaction Act or the United Nations Convention of Controls for International Sale of Goods. You agree that the Company and its Services are deemed a passive website that does not give rise to personal jurisdiction over GiftStarter or its parents, subsidiaries, affiliates, successors, assigns, employees, agents, directors, officers or shareholders, either specific or general, in any jurisdiction other than the State of Washington. You agree that any action at law or in equity arising out of or relating to these terms, or your use or non-use of the Services, shall be filed only in the state or federal courts located in Washington County in the State of Washington and you hereby consent and submit to the personal jurisdiction of such courts for the purposes of litigating any such action. You hereby irrevocably waive any right you may have to trial by jury in any dispute, action, or proceeding.</p>\n" +
    "<h2>Integration and Severability</h2>\n" +
    "<p>These Terms of Use and other referenced material are the entire agreement between you and the Company with respect to the Service, and supersede all prior or contemporaneous communications and proposals (whether oral, written or electronic) between you and the Company with respect to the Service and govern the future relationship. If any provision of the Terms of Use is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms of Use will otherwise remain in full force and effect and enforceable. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder.</p>\n" +
    "<h2>Miscellaneous</h2>\n" +
    "<p>The Company shall not be liable for any failure to perform its obligations hereunder where the failure results from any cause beyond the Company’s reasonable control, including, without limitation, mechanical, electronic, or communications failure or degradation. The Terms of Use are personal to you, and are not assignable, transferable, or sublicensable by you except with the Company's prior written consent. The Company may assign, transfer, or delegate any of its rights and obligations hereunder without consent. No agency, partnership, joint venture, or employment relationship is created as a result of the Terms of Use and neither party has any authority of any kind to bind the other in any respect. In any action or proceeding to enforce rights under the Terms of Use, the prevailing party will be entitled to recover costs and attorneys' fees. All notices under the Terms of Use will be in writing and will be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or the day after it is sent, if sent for next day delivery by recognized overnight delivery service.</p>\n" +
    "<p>Updated: July 2014</p>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/static-pages/what-is-it/what-is-it.html',
    "<section class=\"what-is-it wrapper\" ng-controller=\"whatIsItController\">\n" +
    "    <header>\n" +
    "        <h1> GiftStarter makes giving <span>awesome</span> gifts <span>fun</span> and <span>easy</span>.</h1>\n" +
    "    </header>\n" +
    "    <div class=\"copy\">\n" +
    "        <p>Giving an awesome gift is hard - what your friends really want is usually too expensive.  With GiftStarter, you can bring your friends and family together to get a bigger, better gift.</p>\n" +
    "        <p>All you have to do is create a campaign on GiftStarter and invite your friends!  It's easy for everyone to pitch in, and leave their own special message.  Once it's all bought, GiftStart ships the recipient a beautiful hand-crafted card with everyone's well-wishes, and ships them the gift too!</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"video\" ng-hide=\"hideVideo\">\n" +
    "        <div id=\"player\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"email\">\n" +
    "        <p>Give us your email, and we'll remind you for your next big event!</p>\n" +
    "        <input type=\"email\" placeholder=\"email@example.com\" ng-model=\"email\"/><button ng-click=\"remindMe();\">Remind Me!</button>\n" +
    "    </div>\n" +
    "</section>"
  );


  $templateCache.put('/scripts/user/profile.html',
    "<div class=\"user-wrapper\" ng-controller=\"ProfileController\">\n" +
    "    <header>\n" +
    "        <div id=\"profile-image-container\" ng-class=\"{edit: editMode}\">\n" +
    "            <img id=\"profile-image\" ng-src=\"{{user.img_url}}\" ng-hide=\"editMode\" src=\"\"/>\n" +
    "            <gs-image-upload ng-show=\"editMode\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "            <button class=\"cancel\" ng-show=\"editMode\" ng-click=\"editMode = false;\">X</button>\n" +
    "            <button class=\"edit\" ng-show=\"editable && !editMode\" ng-click=\"editMode=true;\">EDIT</button>\n" +
    "            <button class=\"upload\" ng-click=\"submit()\" ng-show=\"editMode\" ng-class=\"{disabled: !imageSet}\">SAVE</button>\n" +
    "        </div>\n" +
    "        <h1>{{user.name}}</h1>\n" +
    "    </header>\n" +
    "    <section>\n" +
    "        <article class=\"giftstarts\">\n" +
    "            <div><img src=\"/assets/giftstartRibbon.png\"></div>\n" +
    "            <div class=\"ribbontext\">{{user.giftstarts.length}}</div>\n" +
    "            <div class=\"giftstarts\">\n" +
    "                <div class=\"giftstart\" ng-repeat=\"gs in user.giftstarts\">\n" +
    "                    <a ng-href=\"/giftstart/{{gs.giftstart_url_title}}\">\n" +
    "                        <p class=\"title\">{{gs.title}}</p><p class=\"description\">{{gs.description}}</p>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "        <article class=\"pitchins\">\n" +
    "            <div><img src=\"/assets/pitchinRibbon.png\"></div>\n" +
    "            <div class=\"ribbontext\">{{user.pitchins.length}}</div>\n" +
    "            <div class=\"pitchins\">\n" +
    "                <div class=\"pitchin\" ng-repeat=\"pi in user.pitchins\">\n" +
    "                    <a ng-href=\"/giftstart/{{pi.giftstart_url_title}}\">\n" +
    "                        <p class=\"title\">{{pi.gs_title}}</p><p class=\"description\">{{pi.note}}</p>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </section>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/user/user_profile.html',
    "<div class=\"userprofile\" ng-controller=\"UserprofileController\" >\n" +
    "    <ng-include src=\"'/scripts/user/user_profile_info.html'\"></ng-include>\n" +
    "    <ng-include src=\"'/scripts/user/user_profile_fields.html'\"></ng-include>\n" +
    "    <h2 class=\"userprofile__header\">\n" +
    "        GiftStarter Campaigns\n" +
    "    </h2>\n" +
    "    <a name=\"mycampaigns\"></a><ng-include src=\"'/scripts/user/user_profile_campaign.html'\"></ng-include>\n" +
    "    <a name=\"savedgiftideas\"></a><ng-include src=\"'/scripts/user/user_profile_giftidea.html'\"></ng-include>\n" +
    "    <a name=\"savedgiftideas\"></a><ng-include src=\"'/scripts/user/user_profile_friendconnections.html'\"></ng-include>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/user/user_profile_campaign.html',
    "<div class=\"userprofile__campaigns\">\n" +
    "    <div class=\"usercampaign\">\n" +
    "        <ng-include src=\"'/scripts/user/user_profile_pitchins.html'\"></ng-include>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign\">\n" +
    "        <ng-include src=\"'/scripts/user/user_profile_champion.html'\"></ng-include>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_champion.html',
    "<h3 class=\"usercampaign__header\">\n" +
    "    Championed\n" +
    "</h3>\n" +
    "<div class=\"usercampaign__list\">\n" +
    "    <div ng-show=\"userCampaings.giftstarts.length === 0\">\n" +
    "        <p ng-show=\"editable\">You haven't been a Gift Champion yet. Start a gift today! <br />\n" +
    "            <a href=\"/giftideas\" class=\"usercampaign__link\">Browse Gift Ideas</a>\n" +
    "            <a href=\"/search\" class=\"usercampaign__link\">Search</a>\n" +
    "        </p>\n" +
    "        <p ng-hide=\"editable\" >{{ user.name }} hasn't started any gifts yet</p>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign__items\" ng-repeat-start=\"giftstart in userCampaings.giftstarts | limitTo:campaingquantity track by $index\" ng-class=\"{true: 'usercampaign__items--row'}[$index % 3 == 0 && !$first]\" ></div>\n" +
    "    <div class=\"usercampaign__productlistitem\">\n" +
    "        <a ng-href=\"/giftstart/{{ giftstart.giftstart_url_title }}\">\n" +
    "            <div class=\"usercampaign__productimgwrap\">\n" +
    "                <img class=\"usercampaign__itemsimages\" ng-src=\"{{ giftstart.product_img_url }}\" alt=\"Championed image\"/>\n" +
    "            </div>\n" +
    "            <h4 clamp=\"2\"  class=\"usercampaign__itemstitle\">\n" +
    "                {{ giftstart.title }}\n" +
    "            </h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "</div>\n" +
    "<div class=\"usercampaign__viewmore\" ng-show=\"showMoreCampaign\" >\n" +
    "    <a class=\"usercampaign__viewmorelink linky\" ng-show=\" userCampaings.giftstarts.length > 3\"  ng-click=\"campaingquantity=userCampaings.giftstarts.length; showMoreCampaign = false\">\n" +
    "        <span class=\"usercampaign__viewmoretext\" >View More</span> <span class=\"usercampaign__viewmoreicon\"></span>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_edit.ng.html',
    "<div class=\"userprofile__loading\" ng-show=\"loading\">\n" +
    "    <img class=\"userprofile__loadingimg\" src=\"/assets/loading.gif\" alt=\"preloader\" title=\"preloader\">\n" +
    "</div>\n" +
    "<a ng-show=\"canEdit\" class=\"editlink__edit button linky\" ng-click=\"editUserFields();\">\n" +
    "    Edit\n" +
    "</a>\n" +
    "<a ng-hide=\"canEdit\" class=\"editlink__save button linky\"  ng-click=\"saveInput()\">\n" +
    "    Save\n" +
    "</a>\n" +
    "<a ng-hide=\"canEdit\" class=\"editlink__cancel button linky\" ng-click=\"cancelEdit();\">\n" +
    "    Cancel\n" +
    "</a>\n"
  );


  $templateCache.put('/scripts/user/user_profile_fields.html',
    "\n" +
    "        <div class=\"userprofile__fields\" ng-hide=\"loading\">\n" +
    "            <p class=\"userprofile__text\" ng-show=\"editable\">\n" +
    "                <span class=\"userprofile__emnote\">The information below will not be visible to anyone but you.</span> Adding this information now ensures you'll always know what's happening with gifts you're a part of, and we will know where to ship gifts for you! (Unless specified otherwise)\n" +
    "            </p>\n" +
    "            <form class=\"userprofileform\" name=\"userProfileform\" ng-show=\"editable\">\n" +
    "                <div class=\"userprofileform__firstcol\">\n" +
    "                    <div class=\"userprofileform__email\">\n" +
    "                    <span class=\"invalid invalid--email\" ng-show=\"userProfileform.userEmail.$error.required\">\n" +
    "                        Please fill in your email\n" +
    "                    </span>\n" +
    "                    <span class=\"invalid invalid--email\" ng-show=\"userProfileform.userEmail.$error.email\">\n" +
    "                        Please fill in valid email\n" +
    "                    </span>\n" +
    "                    <p class=\"userprofileform__labelmail\">Email</p>\n" +
    "                    <input type=\"email\" class=\"userprofileform__usermail\" ng-disabled=\"fieldisable\" ng-model=\"user.email\"  placeholder=\"{{ user.email }} Your e-mail\" name=\"userEmail\" ng-required=\"!fieldisable\" />\n" +
    "                </div>\n" +
    "                    <div class=\"userprofileform__phone\">\n" +
    "                    <p class=\"userprofileform__labelphone\">Phone</p>\n" +
    "                    <input type=\"text\"  class=\"userprofileform__userphone\" ng-disabled=\"fieldisable\" ng-model=\"user.phone\" placeholder=\"{{user.phone}} Phone number\" name=\"phone\" required />\n" +
    "                </div>\n" +
    "                </div>\n" +
    "                <div class=\"userprofileform__secondcol\">\n" +
    "                    <div class=\"userprofileform__shipping\">\n" +
    "                        <div>\n" +
    "                            <div class=\"userprofileform__labelshipping\">\n" +
    "                                Shipping Address\n" +
    "                            </div>\n" +
    "                            <div class=\"userprofileform__usershippinginfo\" ng-show=\"fieldisable\">\n" +
    "                                <span class=\"userprofileform__useraddress\">{{ user.shipping_address }} </span><br/>\n" +
    "                                <span class=\"userprofileform__useraddressfull\"> {{ user.shipping_city }} {{ user.shipping_state }} {{ user.shipping_zip }}</span>\n" +
    "                            </div>\n" +
    "                            <input type=\"text\" ng-hide=\"fieldisable\" class=\"userprofileform__usershipping\" ng-disabled=\"fieldisable\" ng-model=\"user.shipping_address\" placeholder=\"{{ user.shipping_address }} Shipping address\" name=\"shippingaddress\" required  />\n" +
    "                        </div>\n" +
    "                        <div>\n" +
    "                            <input type=\"text\" class=\"userprofileform__usercity\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_city\" placeholder=\"{{ user.shipping_city }} Shipping city\"  name=\"shippingcity\" required  />\n" +
    "                            <input type=\"text\" class=\"userprofileform__userstate\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_state\" placeholder=\"{{ user.shipping_state }} State\" name=\"shippingstate\" required  />\n" +
    "                            <input type=\"text\" class=\"userprofileform__userzip\" ng-disabled=\"fieldisable\" ng-hide=\"fieldisable\" ng-model=\"user.shipping_zip\" placeholder=\"{{ user.shipping_zip }} ZIP code\" name=\"shippingzip\" required  />\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-show=\"editable\" class=\"editlink\">\n" +
    "                    <gs-user-edit fieldisable=\"fieldisable\" blocked=\"blocked\" user=\"user\" loading=\"loading\"></gs-user-edit>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>"
  );


  $templateCache.put('/scripts/user/user_profile_friendconnections.html',
    "<div class=\"friendconnections\">\n" +
    "    <div class=\"friendconnections__wrap\">\n" +
    "        <h2 class=\"friendconnections__title\">Friend Connections</h2>\n" +
    "        <p class=\"friendconnections__info\">\n" +
    "            Soon you'll be able to connect with your friends and family on GiftStarter. Make sure you never miss a birthday, anniversary, or important event, and finding people to pitch-in will be a breeze. Please check back soon!\n" +
    "        </p>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_giftidea.html',
    "<div class=\"useridea\">\n" +
    "    <div class=\"useridea__wrap\">\n" +
    "        <h2 class=\"useridea__title\">Saved Gift Ideas</h2>\n" +
    "        <div class=\"useridea__filter\" ng-hide=\"userIdea.length == 0\">\n" +
    "            <span class=\"useridea__filterby\">\n" +
    "                Filter by\n" +
    "            </span>\n" +
    "            <!-- span class=\"useridea__filtertags\">\n" +
    "                My tags\n" +
    "            </span -->\n" +
    "            <span class=\"useridea__filterdate\">\n" +
    "                Date added\n" +
    "            </span>\n" +
    "            <span class=\"useridea__filtertprice\" ng-click=\"userOrder = '-price' \">\n" +
    "                Product price\n" +
    "            </span>\n" +
    "        </div>\n" +
    "        <p class=\"useridea__innfonone\" ng-show=\"userIdea.length == 0\">\n" +
    "            Did you know you can save products you like to your Saved Gift Idea Board? Just click the \"Save It For Later\" button!\n" +
    "        </p>\n" +
    "        <div class=\"useridea__productlist\">\n" +
    "            <div ng-repeat-start=\"idea in userIdea | limitTo:quantity | orderBy:userOrder track by $index\" class=\"h--hide\"></div>\n" +
    "            <div class=\"useridea__productlistitem\">\n" +
    "                    <div class=\"useridea__productdesc\">\n" +
    "                        <a class=\"useridea__productlink\" href=\"{{ giftstartThisUrl(idea.title, idea.price, idea.img, idea.url) }}\">\n" +
    "                            <div class=\"useridea__productimgwrap\">\n" +
    "                                <img class=\"useridea__productimg\" ng-src=\"{{ idea.img }}\" alt=\"Gift Idea Image\"/>\n" +
    "                                <a class=\"useridea__close linky\" ng-show=\"editable\" ng-click=\"DeleteSavedItem(idea)\" ng-disabled=\"idea.loading\">\n" +
    "                                    X <span class=\"useridea__deletetext\">remove</span> <img src=\"/assets/loading_transparent.gif\" class=\"loader\" ng-show=\"idea.loading\">\n" +
    "                                </a>\n" +
    "                            </div>\n" +
    "                        </a>\n" +
    "                        <a class=\"useridea__productlink\" href=\"{{ giftstartThisUrl(idea.title, idea.price, idea.img, idea.url) }}\">\n" +
    "                            <div clamp=\"2\"  class=\"useridea__producttitle\">\n" +
    "                                {{ idea.title }}\n" +
    "                            </div>\n" +
    "                            <div class=\"useridea__productprice\">{{ idea.price / 100 | currency }}</div>\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "        </div>\n" +
    "        <div class=\"useridea__findbtn\">\n" +
    "            <button href=\"search/\" ng-click=\"goToLink('giftideas')\" class=\"useridea__findlink primary-green\">Find more gift ideas</button>\n" +
    "        </div>\n" +
    "        <div ng-show=\"showMore\">\n" +
    "            <a class=\"useridea__viewmorelink linky\" ng-show=\" userIdea.length>10\"  ng-click=\"quantity=userIdea.length; showMore=false\">\n" +
    "                View more\n" +
    "            </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/user/user_profile_info.html',
    "       <form class=\"userprofile__info\" name=\"userprofileInfo\">\n" +
    "            <div class=\"userprofile__image\" ng-class=\"{true: 'userprofile__image--edit'}[editMode]\">\n" +
    "                <button class=\"userprofile__imagecancel tooltip--right\" data-tooltip=\"Close\" ng-show=\"editMode && !blocked\" ng-click=\"editMode = false;\">x</button>\n" +
    "                <img class=\"userprofile__userimage\" ng-src=\"{{user.img_url}}\" ng-hide=\"editMode && !blocked\" />\n" +
    "                <gs-image-upload ng-show=\"editMode && !blocked\" ng-class=\"{disabled: !imageSet}\" on-image-updated=\"imageUpdated\"></gs-image-upload>\n" +
    "                <img class=\"userprofile__preload\" src=\"/assets/loading_transparent.gif\" alt=\"image loading\" title=\"image loading\" ng-show=\"imgloading\">\n" +
    "                <button class=\"userprofile__imageedit\" ng-hide=\"editMode || blocked\"  ng-click=\"editMode=true;\">Change photo</button>\n" +
    "                <button class=\"userprofile__imagesave\" ng-click=\"submit(); editMode = false;\" ng-show=\"editMode && !blocked\" ng-class=\"{disabled: !imageSet}\">Save</button>\n" +
    "                <button class=\"userprofile__imageupload\" ng-show=\"editMode && !blocked\"  ng-click=\"openImageDialogGlobal();\">Upload</button>\n" +
    "            </div>\n" +
    "            <div class=\"userprofile__name\">\n" +
    "                <h2 ng-show=\"blocked\" class=\"userprofile__title\">\n" +
    "                    {{ user.name }}\n" +
    "                </h2>\n" +
    "                <input class=\"userprofile__title\" type=\"text\" ng-model=\"user.name\" ng-disabled=\"blocked\" ng-hide=\"blocked\" name=\"username\" ng-value=\"user.name\" placeholder=\"{{ user.name }}\" />\n" +
    "            </div>\n" +
    "            <div class=\"userprofile__social\">\n" +
    "                <div class=\"social\" ng-show=\"user.link_facebook||user.link_twitter||user.link_linkedin||user.link_googleplus||user.link_website||editable\">\n" +
    "                    <p class=\"social__desc\">Social profiles</p>\n" +
    "                    <div class=\"social__nolinks\" ng-hide=\"user.link_facebook||user.link_twitter||user.link_linkedin||user.link_googleplus||user.link_website||!blocked\">\n" +
    "                        (none added)\n" +
    "                    </div>\n" +
    "                    <div class=\"social__inline\" >\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_facebook||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_facebook}}\" class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/facebookicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkfacebook\" class=\"social__inputs\" placeholder=\"{{user.link_facebook}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_facebook\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_twitter||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_twitter}}\" class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/twittericon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linktwitter\" class=\"social__inputs\" placeholder=\"{{user.link_twitter}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_twitter\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_linkedin||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_linkedin}}\"  class=\"social__link\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/linkedInicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linklinkedin\" class=\"social__inputs\" placeholder=\"{{user.link_linkedin}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_linkedin\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_googleplus||!blocked\">\n" +
    "                            <a ng-href=\"{{user.link_googleplus}}\"  class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/googleicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkgoogleplus\" class=\"social__inputs\" placeholder=\"{{user.link_googleplus}} Paste link to profile\" onfocus=\"this.placeholder = ''\" ng-hide=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_googleplus\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"social__editblock\" ng-show=\"user.link_website||!blocked\">\n" +
    "                            <a href=\"{{user.link_website}}\"  class=\"social__link\" target=\"_blank\">\n" +
    "                                <img class=\"social__icons\" src=\"/assets/wwwicon.png\">\n" +
    "                            </a>\n" +
    "                            <input type=\"text\" name=\"linkwebsite\" class=\"social__inputs\" placeholder=\"{{user.link_website}} Paste link to web page\" onfocus=\"this.placeholder = ''\" ng-disabled=\"blocked\" ng-hide=\"blocked\" ng-model=\"user.link_website\" ng-blur=\"validateLinks()\"/>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"calendar\" ng-show=\"(user.birth_month&&user.birth_day)||editable\">\n" +
    "                <p class=\"calendar__calendartext\">Birth Date</p>\n" +
    "                <div class=\"calendar__monthwrap\">\n" +
    "                    <select ng-disabled=\"blocked\" class=\"calendar__month\" ng-model=\"user.birth_month\" ng-options=\"month.value as month.label for month in months\"></select>\n" +
    "                </div>\n" +
    "                <input type=\"number\" name=\"date\" min=\"1\" max=\"31\" class=\"calendar__date\" ng-disabled=\"blocked\" ng-model=\"user.birth_day\"  />\n" +
    "            </div>\n" +
    "           <div class=\"userprofile__errors\">{{user.error_message}}</div>\n" +
    "            <div ng-show=\"editable\" class=\"editlink editlink--white\">\n" +
    "                <gs-user-edit fieldisable=\"fieldisable\" blocked=\"blocked\" user=\"user\" userinfo=\"true\" loading=\"loading\" ></gs-user-edit>\n" +
    "            </div>\n" +
    "       </form>"
  );


  $templateCache.put('/scripts/user/user_profile_pitchins.html',
    "<h3 class=\"usercampaign__header\">\n" +
    "    Pitch Ins\n" +
    "</h3>\n" +
    "<div class=\"usercampaign__list\">\n" +
    "    <div ng-show=\"userCampaings.pitchins.length === 0\">\n" +
    "        <p ng-show=\"editable\">You haven't pitched-in on any gifts yet.</p>\n" +
    "        <p ng-hide=\"editable\" >{{ user.name }} hasn't pitched in on any gifts yet. Invite them to pitch-in on one of your campaigns!</p>\n" +
    "    </div>\n" +
    "    <div class=\"usercampaign__items\" ng-repeat-start=\"pitchin in pitchins_unique | limitTo:campaingquantity track by $index \" ng-class=\"{true: 'usercampaign__items--row'}[$index % 3 == 0 && !$first]\" ></div>\n" +
    "    <div class=\"usercampaign__productlistitem\">\n" +
    "        <a ng-href=\"/giftstart/{{ pitchin.giftstart_url_title }}\">\n" +
    "            <div class=\"usercampaign__productimgwrap\">\n" +
    "                <img class=\"usercampaign__itemsimages\" ng-src=\"{{ pitchin.gs_img }}\" alt=\"Pitch Ins image\"/>\n" +
    "            </div>\n" +
    "            <h4 clamp=\"2\"  class=\"usercampaign__itemstitle\">\n" +
    "                {{ pitchin.gs_title }}\n" +
    "            </h4>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div ng-repeat-end=\"\" class=\"h--hide\"></div>\n" +
    "</div>\n" +
    "<div class=\"usercampaign__viewmore\" ng-show=\"showMoreCampaign\" >\n" +
    "    <a class=\"usercampaign__viewmorelink linky\" ng-show=\" userCampaings.pitchins.length > 3\"  ng-click=\"campaingquantity=userCampaings.pitchins.length; showMoreCampaign = false\">\n" +
    "        <span class=\"usercampaign__viewmoretext\" >View More</span> <span class=\"usercampaign__viewmoreicon\"></span>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('/scripts/utilities/image-upload/image-upload.html',
    "<div class=\"image-upload wrapper\">\n" +
    "    <canvas></canvas>\n" +
    "    <div class=\"uploader\">\n" +
    "        <input class=\"thanks-image-input\" type=\"file\" capture=\"camera\" accept=\"image/*\"/>\n" +
    "        <button ng-click=\"openImageDialog()\" class=\"image\"></button>\n" +
    "        <button ng-click=\"rotateImage()\" class=\"rotate tooltip--left\" data-tooltip=\"Rotate uploaded image\"></button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/scripts/utilities/link_create.html',
    "<html>\n" +
    "<body>\n" +
    "    <script src=\"http://cdnjs.cloudflare.com/ajax/libs/ramda/0.8.0/ramda.js\"></script>\n" +
    "    <script src=\"http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js\"></script>\n" +
    "    <script src=\"//tinymce.cachefly.net/4.1/tinymce.min.js\"></script>\n" +
    "    <script>\n" +
    "\n" +
    "        function setJson(shortlink) {\n" +
    "            var ret = '\\n     {';\n" +
    "            ret += '\\n         \"productName\":\"'+htmlentities($('#title').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productNameShort\":\"'+htmlentities($('#titleshort').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productSlug\":\"'+htmlentities($('#slug').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productPrice\":\"'+htmlentities($('#price').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productDescription\":\"'+tinyMCE.activeEditor.getContent({format : 'html'}).replace(/\"/g, \"&quot;\").replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "//            ret += '\\n         \"productDescription\":\"'+htmlentities($('#description').val().trim()).replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "            ret += '\\n         \"productMetaDescription\":\"'+htmlentities($('#metadescription').val().trim()).replace(/(?:\\r\\n|\\r|\\n)/g, '<br />')+'\",';\n" +
    "            ret += '\\n         \"productImage\":\"'+htmlentities($('#image').val().trim())+'\",';\n" +
    "            ret += '\\n         \"productThumb\":\"'+htmlentities($('#imagethumb').val().trim())+'\",';\n" +
    "            ret += '\\n         \"imageAltText\":\"'+htmlentities($('#alttext').val().trim())+'\",';\n" +
    "            ret += '\\n         \"giftStartLink\":\"'+shortlink+'\"';\n" +
    "            ret += '\\n     },';\n" +
    "            $('#json').val(ret);\n" +
    "            $('#json').select();\n" +
    "        }\n" +
    "\n" +
    "        function formSubmit() {\n" +
    "            var url = makeUrl($('#url').val(), $('#title').val(),\n" +
    "                    $('#price').val(), $('#image').val(), $('#source').val());\n" +
    "            $('#result').val(url);\n" +
    "            $('#prodimglink').attr(\"href\",$('#image').val());\n" +
    "            $('#prodimg').attr(\"src\",$('#image').val());\n" +
    "            setBitlyUrl(url);\n" +
    "        }\n" +
    "\n" +
    "        function makeUrl(url, title, price, img, source) {\n" +
    "            if (source === '') {\n" +
    "                alert(\"oops!  need a referrer!  just put any tracking string, like 'mancrate_coffee'.\");\n" +
    "                return '';\n" +
    "            }\n" +
    "            return 'https://www.giftstarter.com/create?' + urlSerialize({\n" +
    "                        product_url: url,\n" +
    "                        title: title,\n" +
    "                        price: 100*price,\n" +
    "                        img_url: (img.toLowerCase().indexOf('http')==0?img:('/assets/giftideas/category'+img)),\n" +
    "                        source: source\n" +
    "                    });\n" +
    "        }\n" +
    "\n" +
    "        function urlSerialize(obj) {\n" +
    "            var str = [];\n" +
    "            for(var p in obj)\n" +
    "                if (obj.hasOwnProperty(p)) {\n" +
    "                    str.push(encodeURIComponent(p) + \"=\" +\n" +
    "                    encodeURIComponent(obj[p]));\n" +
    "                }\n" +
    "            return str.join(\"&\");\n" +
    "        }\n" +
    "\n" +
    "        function setBitlyUrl(long_url){\n" +
    "            $('#shortlink').val(\"\");\n" +
    "            $.getJSON(\n" +
    "                \"http://api.bitly.com/v3/shorten?callback=?\",\n" +
    "                {\n" +
    "                    \"format\": \"json\",\n" +
    "                    \"apiKey\": \"R_85bf9d10211f4423b5c3be4a336ad77d\",\n" +
    "                    \"login\": \"giftstarter\",\n" +
    "                    \"longUrl\": long_url\n" +
    "                },\n" +
    "                function(response)\n" +
    "                {\n" +
    "                    $('#shortlink').val(response.data.url);\n" +
    "                    setJson(response.data.url);\n" +
    "                }\n" +
    "            );\n" +
    "        }\n" +
    "\n" +
    "        function setShortTitle() {\n" +
    "            $('#titleshort').val($('#title').val().substring(0, 28));\n" +
    "            setProductSlug();\n" +
    "        }\n" +
    "        function setProductSlug() {\n" +
    "            $('#alttext').val($('#titleshort').val());\n" +
    "            $('#slug').val(JSON.stringify($('#titleshort').val()).trim().replace(/\\W/g,' ').trim().replace(/ +/g,'-'));\n" +
    "            setImageVals();\n" +
    "        }\n" +
    "        function setImageVals() {\n" +
    "            $('#image').val('/'+$('#catslug').val()+'/'+$('#slug').val().toLowerCase()+'.jpg');\n" +
    "            $('#imagethumb').val('/'+$('#catslug').val()+'/'+$('#slug').val().toLowerCase()+'-thumb.jpg');\n" +
    "        }\n" +
    "        function checkSlug() {\n" +
    "            this.value = this.value.replace(/ /g, \"-\");\n" +
    "            setImageVals();\n" +
    "        }\n" +
    "\n" +
    "        function get_html_translation_table(table, quote_style) {\n" +
    "          //  discuss at: http://phpjs.org/functions/get_html_translation_table/\n" +
    "          // original by: Philip Peterson\n" +
    "          //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "          // bugfixed by: noname\n" +
    "          // bugfixed by: Alex\n" +
    "          // bugfixed by: Marco\n" +
    "          // bugfixed by: madipta\n" +
    "          // bugfixed by: Brett Zamir (http://brett-zamir.me)\n" +
    "          // bugfixed by: T.Wild\n" +
    "          // improved by: KELAN\n" +
    "          // improved by: Brett Zamir (http://brett-zamir.me)\n" +
    "          //    input by: Frank Forte\n" +
    "          //    input by: Ratheous\n" +
    "          //        note: It has been decided that we're not going to add global\n" +
    "          //        note: dependencies to php.js, meaning the constants are not\n" +
    "          //        note: real constants, but strings instead. Integers are also supported if someone\n" +
    "          //        note: chooses to create the constants themselves.\n" +
    "          //   example 1: get_html_translation_table('HTML_SPECIALCHARS');\n" +
    "          //   returns 1: {'\"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}\n" +
    "\n" +
    "          var entities = {},\n" +
    "            hash_map = {},\n" +
    "            decimal;\n" +
    "          var constMappingTable = {},\n" +
    "            constMappingQuoteStyle = {};\n" +
    "          var useTable = {},\n" +
    "            useQuoteStyle = {};\n" +
    "\n" +
    "          // Translate arguments\n" +
    "          constMappingTable[0] = 'HTML_SPECIALCHARS';\n" +
    "          constMappingTable[1] = 'HTML_ENTITIES';\n" +
    "          constMappingQuoteStyle[0] = 'ENT_NOQUOTES';\n" +
    "          constMappingQuoteStyle[2] = 'ENT_COMPAT';\n" +
    "          constMappingQuoteStyle[3] = 'ENT_QUOTES';\n" +
    "\n" +
    "          useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';\n" +
    "          useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() :\n" +
    "            'ENT_COMPAT';\n" +
    "\n" +
    "          if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {\n" +
    "            throw new Error('Table: ' + useTable + ' not supported');\n" +
    "            // return false;\n" +
    "          }\n" +
    "\n" +
    "          entities['38'] = '&amp;';\n" +
    "          if (useTable === 'HTML_ENTITIES') {\n" +
    "            entities['160'] = '&nbsp;';\n" +
    "            entities['161'] = '&iexcl;';\n" +
    "            entities['162'] = '&cent;';\n" +
    "            entities['163'] = '&pound;';\n" +
    "            entities['164'] = '&curren;';\n" +
    "            entities['165'] = '&yen;';\n" +
    "            entities['166'] = '&brvbar;';\n" +
    "            entities['167'] = '&sect;';\n" +
    "            entities['168'] = '&uml;';\n" +
    "            entities['169'] = '&copy;';\n" +
    "            entities['170'] = '&ordf;';\n" +
    "            entities['171'] = '&laquo;';\n" +
    "            entities['172'] = '&not;';\n" +
    "            entities['173'] = '&shy;';\n" +
    "            entities['174'] = '&reg;';\n" +
    "            entities['175'] = '&macr;';\n" +
    "            entities['176'] = '&deg;';\n" +
    "            entities['177'] = '&plusmn;';\n" +
    "            entities['178'] = '&sup2;';\n" +
    "            entities['179'] = '&sup3;';\n" +
    "            entities['180'] = '&acute;';\n" +
    "            entities['181'] = '&micro;';\n" +
    "            entities['182'] = '&para;';\n" +
    "            entities['183'] = '&middot;';\n" +
    "            entities['184'] = '&cedil;';\n" +
    "            entities['185'] = '&sup1;';\n" +
    "            entities['186'] = '&ordm;';\n" +
    "            entities['187'] = '&raquo;';\n" +
    "            entities['188'] = '&frac14;';\n" +
    "            entities['189'] = '&frac12;';\n" +
    "            entities['190'] = '&frac34;';\n" +
    "            entities['191'] = '&iquest;';\n" +
    "            entities['192'] = '&Agrave;';\n" +
    "            entities['193'] = '&Aacute;';\n" +
    "            entities['194'] = '&Acirc;';\n" +
    "            entities['195'] = '&Atilde;';\n" +
    "            entities['196'] = '&Auml;';\n" +
    "            entities['197'] = '&Aring;';\n" +
    "            entities['198'] = '&AElig;';\n" +
    "            entities['199'] = '&Ccedil;';\n" +
    "            entities['200'] = '&Egrave;';\n" +
    "            entities['201'] = '&Eacute;';\n" +
    "            entities['202'] = '&Ecirc;';\n" +
    "            entities['203'] = '&Euml;';\n" +
    "            entities['204'] = '&Igrave;';\n" +
    "            entities['205'] = '&Iacute;';\n" +
    "            entities['206'] = '&Icirc;';\n" +
    "            entities['207'] = '&Iuml;';\n" +
    "            entities['208'] = '&ETH;';\n" +
    "            entities['209'] = '&Ntilde;';\n" +
    "            entities['210'] = '&Ograve;';\n" +
    "            entities['211'] = '&Oacute;';\n" +
    "            entities['212'] = '&Ocirc;';\n" +
    "            entities['213'] = '&Otilde;';\n" +
    "            entities['214'] = '&Ouml;';\n" +
    "            entities['215'] = '&times;';\n" +
    "            entities['216'] = '&Oslash;';\n" +
    "            entities['217'] = '&Ugrave;';\n" +
    "            entities['218'] = '&Uacute;';\n" +
    "            entities['219'] = '&Ucirc;';\n" +
    "            entities['220'] = '&Uuml;';\n" +
    "            entities['221'] = '&Yacute;';\n" +
    "            entities['222'] = '&THORN;';\n" +
    "            entities['223'] = '&szlig;';\n" +
    "            entities['224'] = '&agrave;';\n" +
    "            entities['225'] = '&aacute;';\n" +
    "            entities['226'] = '&acirc;';\n" +
    "            entities['227'] = '&atilde;';\n" +
    "            entities['228'] = '&auml;';\n" +
    "            entities['229'] = '&aring;';\n" +
    "            entities['230'] = '&aelig;';\n" +
    "            entities['231'] = '&ccedil;';\n" +
    "            entities['232'] = '&egrave;';\n" +
    "            entities['233'] = '&eacute;';\n" +
    "            entities['234'] = '&ecirc;';\n" +
    "            entities['235'] = '&euml;';\n" +
    "            entities['236'] = '&igrave;';\n" +
    "            entities['237'] = '&iacute;';\n" +
    "            entities['238'] = '&icirc;';\n" +
    "            entities['239'] = '&iuml;';\n" +
    "            entities['240'] = '&eth;';\n" +
    "            entities['241'] = '&ntilde;';\n" +
    "            entities['242'] = '&ograve;';\n" +
    "            entities['243'] = '&oacute;';\n" +
    "            entities['244'] = '&ocirc;';\n" +
    "            entities['245'] = '&otilde;';\n" +
    "            entities['246'] = '&ouml;';\n" +
    "            entities['247'] = '&divide;';\n" +
    "            entities['248'] = '&oslash;';\n" +
    "            entities['249'] = '&ugrave;';\n" +
    "            entities['250'] = '&uacute;';\n" +
    "            entities['251'] = '&ucirc;';\n" +
    "            entities['252'] = '&uuml;';\n" +
    "            entities['253'] = '&yacute;';\n" +
    "            entities['254'] = '&thorn;';\n" +
    "            entities['255'] = '&yuml;';\n" +
    "          }\n" +
    "\n" +
    "          if (useQuoteStyle !== 'ENT_NOQUOTES') {\n" +
    "            entities['34'] = '&quot;';\n" +
    "          }\n" +
    "          if (useQuoteStyle === 'ENT_QUOTES') {\n" +
    "            entities['39'] = '&#39;';\n" +
    "          }\n" +
    "          entities['60'] = '&lt;';\n" +
    "          entities['62'] = '&gt;';\n" +
    "\n" +
    "          // ascii decimals to real symbols\n" +
    "          for (decimal in entities) {\n" +
    "            if (entities.hasOwnProperty(decimal)) {\n" +
    "              hash_map[String.fromCharCode(decimal)] = entities[decimal];\n" +
    "            }\n" +
    "          }\n" +
    "\n" +
    "          return hash_map;\n" +
    "        }\n" +
    "\n" +
    "        function htmlentities(string, quote_style, charset, double_encode) {\n" +
    "            //  discuss at: http://phpjs.org/functions/htmlentities/\n" +
    "            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            //  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)\n" +
    "            // improved by: nobbler\n" +
    "            // improved by: Jack\n" +
    "            // improved by: Rafał Kukawski (http://blog.kukawski.pl)\n" +
    "            // improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)\n" +
    "            // bugfixed by: Onno Marsman\n" +
    "            // bugfixed by: Brett Zamir (http://brett-zamir.me)\n" +
    "            //    input by: Ratheous\n" +
    "            //  depends on: get_html_translation_table\n" +
    "            //   example 1: htmlentities('Kevin & van Zonneveld');\n" +
    "            //   returns 1: 'Kevin &amp; van Zonneveld'\n" +
    "            //   example 2: htmlentities(\"foo'bar\",\"ENT_QUOTES\");\n" +
    "            //   returns 2: 'foo&#039;bar'\n" +
    "\n" +
    "            var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),\n" +
    "            symbol = '';\n" +
    "            string = string == null ? '' : string + '';\n" +
    "\n" +
    "            if (!hash_map) {\n" +
    "                return false;\n" +
    "            }\n" +
    "\n" +
    "            if (quote_style && quote_style === 'ENT_QUOTES') {\n" +
    "            hash_map[\"'\"] = '&#039;';\n" +
    "            }\n" +
    "\n" +
    "            if ( !! double_encode || double_encode == null) {\n" +
    "                for (symbol in hash_map) {\n" +
    "                  if (hash_map.hasOwnProperty(symbol)) {\n" +
    "                    string = string.split(symbol)\n" +
    "                      .join(hash_map[symbol]);\n" +
    "                  }\n" +
    "                }\n" +
    "            } else {\n" +
    "                string = string.replace(/([\\s\\S]*?)(&(?:#\\d+|#x[\\da-f]+|[a-zA-Z][\\da-z]*);|$)/g, function(ignore, text, entity) {\n" +
    "                  for (symbol in hash_map) {\n" +
    "                    if (hash_map.hasOwnProperty(symbol)) {\n" +
    "                      text = text.split(symbol)\n" +
    "                        .join(hash_map[symbol]);\n" +
    "                    }\n" +
    "                  }\n" +
    "\n" +
    "                  return text + entity;\n" +
    "                });\n" +
    "            }\n" +
    "\n" +
    "          return string;\n" +
    "        }\n" +
    "\n" +
    "    </script>\n" +
    "    <div style=\" display:inline-block; float:left; min-width:750px; white-space: nowrap\">\n" +
    "        <label style=\"color:#999999\" for=\"catslug\">Category Slug*</label> <input type=\"text\" id=\"catslug\" required=\"\" value=\"\" placeholder=\"teacher\"/><br>\n" +
    "        <label for=\"url\">Product URL</label> <input type=\"text\" id=\"url\" required=\"\" size=\"80\"/><br>\n" +
    "        <label for=\"title\">Product Title</label> <input type=\"text\" id=\"title\" required=\"\" size=\"80\" onchange=\"setShortTitle()\"/><br>\n" +
    "        <label style=\"color:#999999\" for=\"titleshort\">Short Title*</label> <input type=\"text\" id=\"titleshort\" required=\"\" size=\"40\" maxlength=\"28\" onchange=\"setProductSlug()\"/> (max 28 chars)<br>\n" +
    "        <label style=\"color:#999999\" for=\"slug\">Product Slug*</label> <input type=\"text\" id=\"slug\" required=\"\" size=\"40\"/><br>\n" +
    "        <label for=\"image\">Product Image URL</label> <input type=\"text\" id=\"image\" required=\"\" size=\"40\" value=\"\" placeholder=\"/teacher/visa-gift-card.png\"/><br>\n" +
    "        <label for=\"imagethumb\" style=\"color:#999999\">Product Thumbnail URL</label> <input type=\"text\" id=\"imagethumb\" required=\"\" size=\"40\" value=\"\"/><br>\n" +
    "        <label style=\"color:#999999\" for=\"alttext\">Image ALT text*</label> <input type=\"text\" id=\"alttext\" required=\"\" size=\"40\" /><br>\n" +
    "        <label for=\"price\">Product Price</label> <input type=\"text\" id=\"price\" required=\"\" placeholder=\"e.g. 299.67 for $299.67\"/><br>\n" +
    "        <label style=\"color:#999999;vertical-align:top\" for=\"description\">Description*</label> <textarea type=\"text\" id=\"description\" required=\"\" rows=\"5\" cols=\"60\"> </textarea><br>\n" +
    "        <label style=\"color:#999999;vertical-align:top\" for=\"metadescription\">Meta Description*</label> <textarea type=\"text\" id=\"metadescription\" required=\"\" rows=\"3\" cols=\"60\"> </textarea><br>\n" +
    "        <label for=\"source\">Referrer (a tracking string)</label> <input type=\"text\" id=\"source\" required=\"\" /><br><br>\n" +
    "        <label style=\"color:#999999\">*only required for JSON</label> &nbsp; &nbsp; <button id=\"submit\" onclick=\"formSubmit()\">Create Link</button><br><br>\n" +
    "        <label for=\"result\">Result </label><input id=\"result\" size=\"40\"/> &nbsp;\n" +
    "        <label for=\"shortlink\">Short </label><input id=\"shortlink\"/><br>\n" +
    "        <textarea id=\"json\" rows=\"10\" cols=\"80\"></textarea>\n" +
    "    </div>\n" +
    "    <div><a id=\"prodimglink\" href=\"/assets/link_create_preview.png\" target=\"prodimg\"><img id=\"prodimg\" style=\"display:inline-block; float:left; width:480px; border: 0px;\" src=\"/assets/link_create_preview.png\"></a></div>\n" +
    "\n" +
    "    <script>\n" +
    "        tinymce.init({\n" +
    "            selector:'#description',\n" +
    "            plugins: [\"code\", \"paste\"],\n" +
    "            oninit : \"setPlainText\",\n" +
    "            width: 620,\n" +
    "            toolbar: \"bold italic underline styleselect fontsizeselect bullist numlist outdent indent removeformat subscript superscript code\"\n" +
    "        });\n" +
    "        $('#slug').on('change', checkSlug);\n" +
    "        $('#catslug').on('change', function () {\n" +
    "            this.value = this.value.toLowerCase();\n" +
    "            this.value = this.value.replace(/ /g, \"-\");\n" +
    "            setImageVals();\n" +
    "        });\n" +
    "    </script>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('/scripts/utilities/toast.html',
    "<div class=\"toast-wrapper\" ng-class=\"{hide: hide, displayed: displayed}\">\n" +
    "    <p class=\"toast\"></p>\n" +
    "    <p class=\"close\" ng-click=\"hideToast()\">X</p>\n" +
    "</div>"
  );

}]);
