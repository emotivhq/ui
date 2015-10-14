/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('PressController', ['$scope','$location','$timeout',
    PressController]);

function PressController($scope,  $location,  $timeout) {
    var pressItem = function(link, img, quote) {
        this.link = link;
        this.img = img;
        this.quote = quote;
    };

    $scope.items = [
        new pressItem(
            "http://www.forbes.com/sites/learnvest/2015/09/22/new-parents-reveal-their-smartest-baby-money-moves/",
            "forbes.png",
            "All kinds of seeming “must-haves” can take a toll on your bottom line..."
        ),
        new pressItem(
            "http://www.huffingtonpost.com/learnvest/new-parents-dish-on-the-b_b_8186200.html",
            "huffingtonpost.jpg",
            "New parents dish on 'The Best Baby Money Decision I Ever Made'"
        ),
        new pressItem(
            "http://www.investorideas.com/news/2015/technology/09221.asp",
            "investorideas.png",
            "GiftStarter has built an experience that is seamless from start to finish"
        ),
        new pressItem(
            "http://blog.timetrade.com/2015/08/21/wbey-episode-3-amazon-prime-day-giftstarter-top-retail-trends-of-2015/",
            "timetrade.png",
            "GiftStarter.com is a new service that allows people to choose a product and pay for it in increments. "
        ),
        new pressItem(
            "http://www.bizjournals.com/seattle/print-edition/2015/08/14/friends-help-friends-give-gifts-giftstarter-brings.html",
            "Thebusinessjournal.jpg",
            "Friends help friends give gifts: GiftStarter brings crowdfunding to the party."
        ),
        new pressItem(
            "http://www.adamsfinancialconcepts.com/index.php/resources/radio-show?filter_order=a.publish_up&filter_order_Dir=desc&format=html",
            "AFC_logo_270.png",
            "Making group gifting easier and bringing people together for what they need and want in their lives."
        ),
        new pressItem(
            "http://simplyathomemom.com/2015/07/27/back-to-school-gift-ideas-with-giftstarter/",
            "simplyathome.png",
            "In minutes, users can launch a campaign for a gift and then GiftStarter does the rest."
        ),
        new pressItem(
            "http://www.way2goodlife.com/back-to-school-shopping-roundup/",
            "way2goodlife.png",
            "This is a group gift solution that makes it easy for family and friends to combine individual budgets"
        ),
        new pressItem(
            "https://www.yahoo.com/tech/underwater-speakers-instagram-prints-124297324844.html",
            "yahoo.png",
            "Like Kickstarter for gifts: online campaigns to fund pricey presents (for birthdays, weddings, whatever) "
        ),
        new pressItem(
            "http://money.usnews.com/money/personal-finance/articles/2015/08/06/5-ways-to-get-a-big-head-start-on-holiday-shopping",
            "usworldnews.png",
            "Choose what you want to buy, break the cost into pieces, and pay at your own pace."
        ),
        new pressItem(
            "http://issuu.com/arizonahealthandliving/docs/arizona_health_and_living_magazine_/1?e=6323197/14520390",
            "arizonahealthandliving.png",
            "Back to school can be expensive, especially for college bound students. GiftStarter makes it easy"
        ),
        new pressItem(
            "http://www.cpapracticeadvisor.com/news/12100941/giftstarter-platform-brings-cloud-to-gift-giving",
            "cpa.png",
            "A new online cloud service is making gift giving easier. "
        ),
        new pressItem(
            "http://www.designcapsule.com/accessories/giftstarter-for-home-decor-gifts/",
            "designcapsulre.png",
            "You may find GiftStarter the best way to purchase a big ticket item."
        ),
        new pressItem(
            "http://www.seattletimes.com/business/technology/tech-spotlight-giftstarter/",
            "SeattleTimes-logo.png",
            "The gift of efficiency: It really creates that digital event of people coming together in a community"
        ),
        new pressItem(
            "http://www.drugstorenews.com/article/giftstarter-looks-take-hassle-out-gift-giving",
            "drug-store-news.png",
            "The way it works is simple. Users launch a campaign for a gift and then GiftStarter does the rest"
        ),
        new pressItem(
            "http://www.retailingtoday.com/article/no-more-crappy-gifts-new-site%E2%80%99s-mission",
            "retailing_today.png",
            "Reinventing the gifting business so that family members, friends and co-workers are able to co-mingle individual budgets"
        ),
        new pressItem(
            "http://www.heraldnews.com/article/20150701/BLOGS/307019986",
            "heraldpost.png",
            "That is just the sort of convenience that we always thought the Internet should deliver. And now it does!"
        ),
        new pressItem(
            "http://blogs.capecodonline.com/cape-cod-gaming/2015/07/01/giftstarter-group-gifting-made-easy/",
            "capecod.png",
            "Not only cool, but a major problem-solver for giving really great gifts!"
        ),
        new pressItem(
            "http://agbeat.com/lists/5-things-startups-need-to-do-when-trying-to-sign-with-big-name-brands/",
            "americangeniusnews.png",
            "Whether you’re working with one person or many people, business is about relationships"
        ),
        new pressItem(
            "http://www.producthunt.com/tech/giftstarter",
            "producthunt.png",
            "This is awesome. Much better than the person strolling around the office with an envelope and everyone needing change for a $20"
        ),
        new pressItem(
            "http://www.meetadvisors.com/post/7-keys-to-create-a-healthy-work-environment-for-your-business",
            "meetadvisors_logo.png",
            "GiftStarter: startup with happy employees. Culture is created by each individual within a healthy workplace"
        ),
        new pressItem(
            "http://www.seattlen.com/n/bbs/board.php?bo_table=News&wr_id=8398",
            "Seattle-Korean-News.png",
            "유씨는 이 같은 소셜 네트워크 방식에서 착안, 누군가에서 여러 사람이 십시일반 정성을"
        ),
        new pressItem(
            "http://stackeddmagazine.com/2015/04/13/do-the-evolution/",
            "stackedd.png",
            "Both founders of GiftStarter are women, presenting a unique opportunity"
        ),
        new pressItem(
            "http://www.geekwire.com/2014/9mile-labs-demo-day-favorite-pitches-products-ideas-seattles-b2b-accelerator/",
            "milestone-9.png",
            "Each entrepreneur had a different story to tell and project to pitch"
        ),
        new pressItem(
            "http://www.womenofpresence.com/arry-yu/",
            "women-of-presence.png",
            "People write personal notes with each pitch-in & receieve beautiful handcrafted cards"
        ),
        new pressItem(
            "http://www.heinzmarketing.com/2014/11/matts-app-week-giftstarter/",
            "heinz.png",
            "Before you know it, the kids are getting that deluxe playset thanks to everyone in the family. "
        ),
        new pressItem(
            "http://www.bizjournals.com/seattle/print-edition/2014/09/12/40-under-40-2014-arry-yu.html?page=all",
            "PSBJ.png",
            "Everyone could pitch in $10 or $15 for something someone really wants."
        ),
        new pressItem(
            "http://www.prweb.com/releases/giftstarter/butterlondon/prweb12271758.htm",
            "prweb.png",
            "With GiftStarter, butter LONDON® is the first brand to give shoppers access to true social gifting"
        ),
        new pressItem(
            "http://www.geekwire.com/2014/startup-spotlight-giftstarter-co/",
            "geekwire.png",
            "Bring back the humanity, personality and the joy of real-life interactions, using technology as an enabler"
        ),
        new pressItem(
            "http://blog.up.co/2014/11/30/teammates-challenge-got-seattle-startup-top-accelerator/",
            "up-global.png",
            "GiftStarter seems to have gotten it right without losing the spark of that Sunday night pitch back in March"
        )
    ];
}
