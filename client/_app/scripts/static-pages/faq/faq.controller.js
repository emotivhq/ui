/**
 * Copyright (C) GiftStarter, inc. - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

GiftStarterApp.controller('FaqController', ['$scope','$location','$timeout', 'Analytics',
    FaqController]);

function FaqController($scope,  $location,  $timeout, Analytics) {
    $scope.location = $location;

    $scope.openQuestions = [];

    var allOpen = false;

    $scope.questionCount = 0;
    var question = function(question, answer) {
        this.question = question;
        this.answer = answer;
        $scope.questionCount++;
    };

    var section = function(name, questions) {
        this.name = name;
        this.questions = questions;
    };

    $scope.items = [
        new section(
            "OVERVIEW",
            [
                new question(
                    "What is GiftStarter?",
                    "GiftStarter is a payment parsing service that lets you buy and gift anything that is sold online, piece by piece, at anytime, and with/for whomever you want. We divide anything sold on the internet into a grid, then family and friends buy it tile by tile off the grid. Once complete, we send a handmade card and ensure the gift is shipped, too!"
                ),
                new question(
                    "How does it work?",
                    "Search for and select a product using the search bar on the homepage, fill out the GiftStarter Campaign information to share your story on why this is important to you or your gift recipient, and bring others along on the giving journey.  We let your family and friends choose their pieces of the gift to give, we send an awesome hand-crafted group card to remember the experience, and the gift too."
                ),
                new question(
                    "Who can use the GiftStarter service?",
                    "Anyone can use the GiftStarter service who has a credit card. We accept payments from most everywhere in the world. Gifts are currently limited to delivery in the United States only for now. Europe and Asia are not available for delivery yet - we are working on it."
                ),
                new question(
                    "What methods of payment do you support?",
                    "We accept Visa, Mastercard, American Express, and Discover. We process credit cards using Paypal, and direct payment via PayPal account is coming soon!"
                ),
                new question(
                    "How does GiftStarter compare to other crowdfunding sites?",
                    "Other crowdfunding sites focus on enabling payment process. We focus on enabling the gifting experience all the way to delivering a hand-crafted group card and gift."
                ),
                new question(
                    "Where do I go if I need help?",
                    "We are always here to help!  Email us at <a href=\"mailto:giftconcierge@giftstarter.com\">giftconcierge@giftstarter.com</a>.  We are also on standby on <a href=\"https://twitter.com/GiftStarter\">Twitter</a> (@GiftStarter) and <a href=\"www.facebook.com/giftstart\">Facebook</a> (www.facebook.com/giftstart).  Also, feel free to call us at <a href=\"tel:2064864849\">206-486-4849</a>!"
                )
            ]
        ),
        new section(
            "GIFTSTARTER CAMPAIGNS",
            [
                new question(
                    "How long will my Giftstarter Campaign be live?",
                    "The Gift Champion who creates the gift campaign can decide on how long they want the campaign. You can currently choose from 1 day to 30 days."
                ),
                new question(
                    "What happens if my GiftStarter Campaign isn't completed before the due date?",
                    "We send out a giftcard for the amount raised. Depending on the funding level, we will send the recipient a hand-crafted group card with the image of what was intended."
                ),
                new question(
                    "How do I create a successful GiftStarter Campaign?",
                    "When you create the GiftStarter Campaign title and description, share with others who will pitch in why it's awesome, why it is the perfect gift for your recipient, and any personal notes about the recipient. Encourage others who pitch in to share their personal stories related to the recipient too! After all, we're creating a gifting memory together!"
                ),
                new question(
                    "When am I charged?",
                    "We want to get your contribution to the gift as soon as possible, so we charge your card as soon as you pitch in."
                )
            ]
        ),
        new section(
            "GIFTS",
            [
                new question(
                    "After the GiftStarter Campaign ends, when will the gift arrive?",
                    "We will send both the hand-crafted group card (with all those that pitched in and their personal notes) and the gift within 3-5 business days of the GiftStarter Campaign completion."
                ),
                new question(
                    "How is the \"base price\" determined?",
                    "The price of the gift at the time of campaign creation will be used to determine the \"base price.\""
                ),
                new question(
                    "How do I know who pitched in on the gift?",
                    "You'll receive a link to the GiftStarter Campaign once you pitch in. If you're the recipient, you'll receive a hand-crafted gift card at the end of the campaign!"
                )
            ]
        ),
        new section(
            "SERVICE FEES",
            [
                new question(
                    "Does GiftStarter have a fee?",
                    "Yes, our GiftStarter service fee is 8%."
                ),
                new question(
                    "Who pays the fees?",
                    "The 8% service fee is split up among the contributors to the GiftStarter campaign. For example, the fee would be $8.00 for a $100.00 item. And so if you have ten (10) people pitching in, then each person would only pay an additional $0.80. Yes... only 80 cents!! At that point, you could say it's almost free."
                ),
                new question(
                    "Is there a sales tax?",
                    "Yes, we have to pay all required legal taxes."
                ),
                new question(
                    "Do I get a receipt?",
                    "Yes, as soon as you pitch in, you will receive an email receipt."
                )
            ]
        ),
        new section(
            "SECURITY",
            [
                new question(
                    "Is my credit card information secure?",
                    "Security is our top priority. To get specific, our site uses industry standard 128-bit SSL (Secure Sockets Layer) to ensure that sensitive data (ie. credit card number, name, address, etc.) is transmitted securely during every transaction. SSL encrypts the data before it is transmitted so that it can never be read. You will see the SSL seal displayed on the page during checkout and the address bar will change to begin with https."
                ),
                new question(
                    "Is my personal information safe?",
                    "We’re sticklers about this. We never share or sell any of the personal information of our registrants or gift-givers."
                )
            ]
        )
    ];

    $scope.scrollToSearch = function() {
        if (Object.keys($location.search()).length) {
            var selector = document.querySelector('#'+Object.keys($location.search())[0]);
            var element = angular.element(selector);
            element[0].scrollIntoView();
        }
    };

    $scope.$watch('location.search()', function() {
        $timeout($scope.scrollToSearch, 400);
        $timeout($scope.scrollToSearch, 700);
    });

    $scope.toggleQuestion = function(question) {
        if($scope.isOpenQuestion(question)) {
            $scope.openQuestions.splice($scope.openQuestions.indexOf(question), 1);
        } else {
            $scope.openQuestions.push(question);
            Analytics.track("faq", question.question);
        }
    };

    $scope.toggleAll = function() {
        if (allOpen) {
            $scope.openQuestions.length = 0;
            allOpen = false;
        } else {
            for (var sectionIndex = 0; sectionIndex < $scope.items.length; sectionIndex++) {
                for (var questionIndex = 0; questionIndex < $scope.items[sectionIndex].questions.length; questionIndex++) {
                    $scope.openQuestions.push($scope.items[sectionIndex].questions[questionIndex]);
                }
            }
            allOpen = true;
        }
    };

    $scope.isOpenQuestion = function(question) {
        return $scope.openQuestions.indexOf(question) != -1
    }
}