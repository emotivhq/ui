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
            "http://www.bizjournals.com/seattle/print-edition/2015/08/14/friends-help-friends-give-gifts-giftstarter-brings.html",
            "pugetsound.png",
            "Friends help friends give gifts: GiftStarter brings crowdfunding to the party.  How?  GiftStarter lets friends and family collectively buy anything that is sold online.  Meet Arry Yu, CEO.  She's got a gift, and it's in the cloud."
        ),
        new pressItem(
            "http://www.adamsfinancialconcepts.com/index.php/resources/radio-show?filter_order=a.publish_up&filter_order_Dir=desc&format=html",
            "kkol.png",
            "In 20 years, what will be remembered as the most significant accomplishment of the Obama Administration? What does the future have in store for the stock market? Making group gifting easier and bringing people together, GiftStarter CEO Arry Yu, joins us to her story.  Full radio podcast here: <a href=\"http://www.adamsfinancialconcepts.com/media/com_podcastmanager/08.14.15_AboutMoney_GiftStarter_ArryYu.mp3\">LINK</a>"
        ),
        new pressItem(
            "http://simplyathomemom.com/2015/07/27/back-to-school-gift-ideas-with-giftstarter/",
            "simplyathome.png",
            "In minutes, users can launch a campaign for a gift and then GiftStarter does the rest, from helping collect the money to ordering and shipping the gift with a personalized handmade card from all contributors."
        ),
        new pressItem(
            "http://www.way2goodlife.com/back-to-school-shopping-roundup/",
            "way2goodlife.png",
            "The new school year is getting closer and that means Back to School Shopping. Try GiftStarter.com – this is a group gift solution that makes it easy for family and friends to combine individual budgets and give better, more useful ‪gifts for students in your life."
        ),
        new pressItem(
            "https://www.yahoo.com/tech/underwater-speakers-instagram-prints-124297324844.html",
            "yahoo.png",
            "Like Kickstarter for gifts: online campaigns to fund pricey presents (for birthdays, weddings, whatever) by dividing their prices up among many givers. The site illustrates who’s contributing what. The gift is shipped with a handmade card."
        ),
        new pressItem(
            "http://money.usnews.com/money/personal-finance/articles/2015/08/06/5-ways-to-get-a-big-head-start-on-holiday-shopping",
            "usworldnews.png",
            "...websites like GiftStarter.com, where customers can choose the product they want to buy, break the cost into as many pieces as they need and pay at their own pace."
        ),
        new pressItem(
            "http://issuu.com/arizonahealthandliving/docs/arizona_health_and_living_magazine_/1?e=6323197/14520390",
            "arizonahealthandliving.png",
            "BACK TO SCHOOL can be expensive, especially for college bound students. GiftStarter.com is the ideal solution that makes it easy for family and friends to combine individual budgets to give better more useful gifts to the new college student."
        ),
        new pressItem(
            "http://www.cpapracticeadvisor.com/news/12100941/giftstarter-platform-brings-cloud-to-gift-giving",
            "cpa.png",
            "A new online cloud service is making gift giving easier. GiftStarter allows family and friends to combine individual budgets to give better gifts to loved ones."
        ),
        new pressItem(
            "http://www.designcapsule.com/accessories/giftstarter-for-home-decor-gifts/",
            "designcapsulre.png",
            "The next time you want to surprise a loved one with a gift, you may find GiftStarter the best way to purchase a big ticket item."
        ),
        new pressItem(
            "http://www.seattletimes.com/business/technology/tech-spotlight-giftstarter/",
            "SeattleTimes.png",
            "The gift of efficiency: The site provides the platform for finding the gift, splitting its cost, contacting contributors through social media and processing gift payments. “It really creates that digital event of people coming together in community,” Yu said."
        ),
        new pressItem(
            "http://www.drugstorenews.com/article/giftstarter-looks-take-hassle-out-gift-giving",
            "drug-store-news.png",
            "The way it works is simple. Users launch a campaign for a gift and then GiftStarter does the rest, from helping collect the money to ordering and shipping the gift with a personalized handmade card from all contributors."
        ),
        new pressItem(
            "http://www.retailingtoday.com/article/no-more-crappy-gifts-new-site%E2%80%99s-mission",
            "retailing_today.png",
            "The recently launched Web site GiftStarter ... claims to be reinventing the gifting business so that family members, friends and co-workers are able to co-mingle individual budgets to offer recipients a more substantial gift."
        ),
        new pressItem(
            "http://www.heraldnews.com/article/20150701/BLOGS/307019986",
            "heraldpost.png",
            "That is just the sort of convenience that we always thought the Internet should deliver. And now it does!"
        ),
        new pressItem(
            "http://blogs.capecodonline.com/cape-cod-gaming/2015/07/01/giftstarter-group-gifting-made-easy/",
            "capecod.png",
            "... the scheme that the folks behind GiftStarter have come up with is not only cool, it is a major problem-solver for giving really great gifts!  The site collects the funds and orders and ships the gift – so all you need to do is pick something that is spectacular and then make sure that the right people know about it!"
        ),
        new pressItem(
            "http://agbeat.com/lists/5-things-startups-need-to-do-when-trying-to-sign-with-big-name-brands/",
            "americangeniusnews.png",
            "To better navigate the first few sales in signing on major brands and partners, Yu shares her five tips below in her own words.... Whether you’re working with one person or many people, business is about relationships..."
        ),
        new pressItem(
            "http://www.producthunt.com/tech/giftstarter",
            "producthunt.png",
            "This is awesome. Much better than the person strolling around the office with an envelope and everyone needing change for a $20... It's hard to find good gifts for adults that are inexpensive. I'd typically rather have 15 people buy me 1 thing than 15 different things."
        ),
        new pressItem(
            "http://www.meetadvisors.com/post/7-keys-to-create-a-healthy-work-environment-for-your-business",
            "meetadvisors_logo.png",
            "GiftStarter: startup with happy employees. Culture is created by each individual within a healthy workplace. We build great teams and have very open communication to make sure that everybody is accountable and happy."
        ),
        new pressItem(
            "http://www.seattlen.com/n/bbs/board.php?bo_table=News&wr_id=8398",
            "Seattle-Korean-News.png",
            "유씨는 이 같은 소셜 네트워크 방식에서 착안, 누군가에서 여러 사람이 십시일반 정성을 모아 선물을 사주는 벤처기업 (www.giftstarter.com) 을 창업했다고 설명했다."
        ),
        new pressItem(
            "http://stackeddmagazine.com/2015/04/13/do-the-evolution/",
            "stackedd.png",
            "Both founders of GiftStarter are women, presenting a unique opportunity for Yu’s company to help her employees and partners better understand women’s needs in the workplace."
        ),
        new pressItem(
            "http://www.geekwire.com/2014/9mile-labs-demo-day-favorite-pitches-products-ideas-seattles-b2b-accelerator/",
            "milestone-9.png",
            "Each entrepreneur had a different story to tell and project to pitch, from group gifting platform GiftStarter to structured note-taking service KustomNote  to draft beer inventory system MetaCraft."
        ),
        new pressItem(
            "http://www.womenofpresence.com/arry-yu/",
            "women-of-presence.png",
            "People write personal notes with each pitch-in, all of which are compiled into a beautiful handcrafted card to be delivered with the gift, for the gift recipient on the giftstart completion."
        ),
        new pressItem(
            "http://www.heinzmarketing.com/2014/11/matts-app-week-giftstarter/",
            "heinz.png",
            "Before you know it, the kids are getting that deluxe playset thanks to everyone in the family. It's like Kickstarter, but for gifts. I love it."
        ),
        new pressItem(
            "http://www.bizjournals.com/seattle/print-edition/2014/09/12/40-under-40-2014-arry-yu.html?page=all",
            "PSBJ.png",
            "Most people don't need more bottles of wine or gift cards. Everyone could pitch in $10 or $15 for something someone really wants. We're putting the giving back into gifting."
        ),
        new pressItem(
            "http://www.prweb.com/releases/giftstarter/butterlondon/prweb12271758.htm",
            "prweb.png",
            "Powered by GiftStarter, butter LONDON® will be the first beauty brand to give shoppers access to true social gifting of butter LONDON®'s curated gift collections and sets."
        ),
        new pressItem(
            "http://www.geekwire.com/2014/startup-spotlight-giftstarter-co/",
            "geekwire.png",
            "The site's mission,\" as Yu explains, \"is to bring back the humanity, personality and the joy of real-life interactions, using technology as an enabler - not a focal point."
        ),
        new pressItem(
            "http://blog.up.co/2014/11/30/teammates-challenge-got-seattle-startup-top-accelerator/",
            "up-global.png",
            "GiftStarter seems to have gotten it right without losing the spark of that Sunday night pitch back in March - or at least their partner roster would indicate as much."
        )
    ];
}
