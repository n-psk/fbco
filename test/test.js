var stop_autobet = false; console.log('stop_autobet:'+stop_autobet);
var autobet_dnr = false; console.log('autobet_dnr:'+autobet_dnr);
var autobet_running = false; console.log('autobet_running:'+autobet_running);
var free_play_sound = false; console.log('free_play_sound:'+free_play_sound);
var detached_captcha; console.log('detached_captcha:'+detached_captcha);
var autobet_history = [
]; console.log('autobet_history:'+autobet_history);
var submissionEnabled = true; console.log('submissionEnabled:'+submissionEnabled);
var bet_history_page = 0; console.log('bet_history_page:'+bet_history_page);
var jackpot_costs = [
  '',
  '0.00000002',
  '0.00000013',
  '0.00000125',
  '0.00001250',
  '0.00012500'
]; console.log('jackpot_costs:'+jackpot_costs);
var se_msg_timeout_id; console.log('se_msg_timeout_id:'+se_msg_timeout_id);
var bonus_table_closed = 0; console.log('bonus_table_closed:'+bonus_table_closed);
var hide_pending_payments = 0; console.log('hide_pending_payments:'+hide_pending_payments);
var hide_pending_deposits = 0; console.log('hide_pending_deposits:'+hide_pending_deposits);
var profile_withdraw_address = ''; console.log('profile_withdraw_address:'+profile_withdraw_address);
var withdraw_max_amount = 0; console.log('withdraw_max_amount:'+withdraw_max_amount);
// eval('var ' + window[tcGiQefA] + ' = \'\'');
var balance_last_changed = 0; console.log('balance_last_changed:'+balance_last_changed);

$.ajaxSetup({
    data: {
        csrf_token: $.cookie('csrf_token')
    },
    beforeSend: function(xhr) {
        xhr.setRequestHeader('x-csrf-token', $.cookie('csrf_token'));
    },
    timeout: 120000
});

$.extend({
    redirectPost: function(location, args) {
        var form = ''; console.log('form =' + form);
        $.each(args, function(key, value) {
            form += '<input type="hidden" name="' + key + '" value="' + value + '">';
        });
        $('<form action="' + location + '" method="POST">' + form + '</form>').appendTo('body').submit();
    }
});

$(document).ready(function() {
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        }
    }

   // CryptoJS.SHA256
 $.get('/cgi-bin/fp_check.pl?s=' + tcGiQefA, function(data) {
        var hash = CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
        window[tcGiQefA] = hash; console.log('window[tcGiQefA]:' + window[tcGiQefA]);
    });

    $("#hide_site_message").click(function() {
        $('#common_site_message').hide();
        $.get('/?op=hide_site_message');
    });
    $("#hide_payout_message").click(function() {
        $('#common_payout_message').hide();
        $.get('/?op=hide_payout_message');
    });

      // random string
 charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = ''; console.log('randomString:' + randomString);
    for (var i = 0; i < 16; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }

     $('#next_client_seed').val(randomString);
    $('.tabs a').click(function() {
        $('.tabs li').removeClass('active');
        $(this).parent().addClass('active');
    });

    $('#free_play_link_li').addClass('active');
    $('#faq_tab').on('load', function() {
        $('.faq_answer').hide();
    });

    $('#faq_tab').on('click', '.faq_question', function() {
        $(this).next('.faq_answer').show();
    });

     $('#what_is_bitcoin_signup_page_read_more_link').click(function() {
        $('#what_is_bitcoin_signup_page_read_more_link').hide();
        $('#what_is_bitcoin_signup_page_more').show();
        insertBitcoinMore("what_is_bitcoin_signup_page_more", "afterBegin");
    });

    $('#provably_fair_link').click(function() {
        $("html, body").animate({
            scrollTop: $("#provably_fair").offset().top - 45
        }, "fast");
    });

    // result value
    $('#auto_withdraw').change(function() {
        var $input = $(this); console.log('$input:' + $input);
        var val = 0; console.log('val =' + val);
        if ($input.is(":checked")) {
            val = 1;
            $('#earn_btc_aw_msg').show();
            $('#earn_btc_msg').show();
            $('#hide_earn_btc_msg').hide();
        } else {
            $('#hide_earn_btc_msg').show();
            $('#earn_btc_aw_msg').hide();
        }
        $.get('/?op=toggle_auto_withdraw&val=' + val, function(data) {
            var result = data.split(":"); console.log('result:' + result);
            DisplaySEMessage(result[0], result[1]);
            if (result[0] == "e" && val == 1) {
                $('#earn_btc_aw_msg').hide();
                $('#hide_earn_btc_msg').show();
                $('#auto_withdraw').attr('checked', false);
            }
        });
    });

    $('#earn_btc_disable_aw').click(function() {
        $.get('/?op=toggle_auto_withdraw&val=0', function(data) {
            $('#earn_btc_aw_msg').hide();
            DisplaySEMessage("s", "Auto-withdraw disabled");
            $('#auto_withdraw').attr('checked', false);
            $('#hide_earn_btc_msg').show();
        });
    });

    // signup_form
    $("#signup_form").submit(function(event) {
        event.preventDefault();
        $("#signup_button").prop("disabled", true);
        var $form = $(this); console.log('$form:' + $form);
        setTimeout(function() {
            var fingerprint = $.fingerprint(); console.log('fingerprint:' + fingerprint);
            var tag = $.url().param("tag"); console.log('tag:' + tag);
            var op = $form.find('input[name="op"]').val(); console.log('op:' + op);
            var referrer = $form.find('input[name="referrer"]').val(); console.log('referrer:' + referrer);
            var btc_address = $form.find('input[name="btc_address"]').val(); console.log('btc_address:' + btc_address);
            var password = $form.find('input[name="password"]').val(); console.log('password:' + password);
            var email = $form.find('input[name="email"]').val(); console.log('email:' + email);
            var token = $form.find('input[name="token"]').val(); console.log('token:' + token);
            var url = $form.attr('action'); console.log('url:' + url);
            var posting = $.post(url, {
                op: op,
                btc_address: btc_address,
                password: password,
                email: email,
                fingerprint: fingerprint,
                referrer: referrer,
                tag: tag,
                token: token,
                rand: GenerateHashes(hash_match)
            }); console.log('posting:' + posting);
            posting.done(function(data) {
                var result = data.split(":"); console.log('result:' + result)
                if (result[0] == "e") {
                    DisplaySEMessage(result[0], result[1]);
                } else if (result[0] == "s") {
                    $.cookie.raw = true;
                    $.cookie('btc_address', result[1], {
                        expires: 3650,
                        secure: true
                    });
                    $.cookie('password', result[2], {
                        expires: 3650,
                        secure: true
                    });
                    $.cookie('have_account', 1, {
                        expires: 3650,
                        secure: true
                    });
                    window.location.replace("http://freebitco.in/?op=home");
                }
                $("#signup_button").prop("disabled", false);
            });
        }, 0);
    });

    // login_button
    $("#login_button").click(function(event) {
        $("#login_button").prop("disabled", true);
        setTimeout(function() {
            var posting = $.post('/', {
                op: 'login_new',
                btc_address: $("#login_form_btc_address").val(),
                password: $("#login_form_password").val(),
                tfa_code: $("#login_form_2fa").val(),
                rand: GenerateHashes(hash_match)
            }); console.log('posting:' + posting)
            posting.done(function(data) {
                var result = data.split(":");
                if (result[0] == "e") {
                    DisplaySEMessage(result[0], result[1]);
                } else if (result[0] == "s") {
                    $.cookie.raw = true;
                    $.cookie('btc_address', result[1], {
                        expires: 3650,
                        secure: true
                    });
                    $.cookie('password', result[2], {
                        expires: 3650,
                        secure: true
                    });
                    $.cookie('have_account', 1, {
                        expires: 3650,
                        secure: true
                    });
                    window.location.replace("http://freebitco.in/?op=home");
                }
                $("#login_button").prop("disabled", false);
            });
        }, 0);
    });

     $("#enable_2fa_msg").click(function () {
        SwitchPageTabs('edit');
        $("html, body").animate({
            scrollTop: $("#2fa_profile_box").offset().top - 45
        }, "fast");
        $("#2fa_profile_box").click();
    });

    $("#advertise_imp_note").click(function (event) {
        alert("Please note that the balance in your advertising account is non-refundable and cannot be transferred to your main account balance on the website so only send/transfer in what you intend to use.");
    });

    $(".free_play_link").click(function (event) {
        SwitchPageTabs('free_play');
    });

    $(".double_your_btc_link").click(function (event) {
        SwitchPageTabs('double_your_btc');
    });

    $(".lottery_link").click(function (event) {
        SwitchPageTabs('lottery');
        $('.tabs li').removeClass('active');
        $('.tabs li').find('.lottery_link').parent().addClass('active');
        UpdateLotteryStats();
    });

    $(".faq_link").click(function (event) {
        SwitchPageTabs('faq');
        document.getElementById("faq_tab").insertAdjacentHTML("afterBegin", '<h3>WEBSITE FAQ</h3><p class="faq_question bold">When will I get paid if I have Auto Withdraw enabled?</p><div class="faq_answer"><p>If you have Auto-Withdraw enabled in your account, your account balance will go into PENDING on Sunday (if it is more than the min. withdraw amount) and you will be able to see this under PENDING PAYOUT on the FREE BTC page. The Bitcoins will be sent to your Bitcoin wallet soon after. You will receive an email notifying you of the payment if you have an email address associated with your account. If you wish to know the exact time when your balance will go into pending, click on the button that says <b>WITHDRAW</b> in the <b>FREE BTC</b> page and then click on <b>AUTO</b> and you will see a timer counting down to the payout time.</p></div><p class="faq_question bold">How do I enable Auto Withdraw?</p><div class="faq_answer"><p>By clicking on the button that says <b>WITHDRAW</b> in the <b>FREE BTC</b> page, then clicking on <b>AUTO</b> and checking the box next to <b>AUTO WITHDRAW</b>. If you enable auto-withdraw after the countdown timer has run out for the current payout cycle, you will receive your payment the next week.</p></div><p class="faq_question bold">When will I get paid if I have requested a Manual Withdraw?</p><div class="faq_answer"><p>If you request a manual withdrawal, the Bitcoins will be sent to your wallet within 6 hours of you initiating the request.</p></div><p class="faq_question bold">When will I get paid if I have requested an Instant Withdraw?</p><div class="faq_answer"><p>If you request an instant withdrawal, the Bitcoins will be sent to your wallet within 15 minutes of you initiating the request.</p></div><p class="faq_question bold">How can I change my Bitcoin address or Email address?</p><div class="faq_answer"><p>By clicking on the button that says <b>PROFILE</b> in the top menu. You will be able to change your email address only if the email that is currently attached to your account is invalid or it is bouncing our emails back.</p></div><p class="faq_question bold">Where can I see my referral link or my referrals?</p><div class="faq_answer"><p>By clicking on the button that says <b>REFER</b> in the top menu.</p></div><p class="faq_question bold">How do I refer my friends?</p><div class="faq_answer"><p>Share your referral link with your friends and ask them to visit it and create an account. On doing so, they will be automatically added as your referral and you will get 50% of their free btc winnings as commission! Nothing will be deducted from their account, we pay the 50% out of our pocket. You will also receive 1 free ticket to our weekly lottery every time your friend plays a free roll! If you do not know how to get your referral link, please see the question above.</p></div><p class="faq_question bold">I have lost/wish to reset my password?</p><div class="faq_answer"><p>Please go to the login page and click on the link that says <b>Forgot Password</b> in the login box.</p></div><p class="faq_question bold">Why does the amount of Bitcoins that you can win, keep changing?</p><div class="faq_answer"><p>The amount of bitcoins that you can win with <b>FREE BTC</b> depends on the current bitcoin price and the biggest prize is fixed at US$200 and the other prizes in proportion to it. So, when the price of a bitcoin goes down, the reward amount calculated in bitcoins goes up and the other way round is also true. So, regardless of the current bitcoin price, you have a fair chance of winning US$200 in bitcoins on each roll.</p></div><p class="faq_question bold">Can you reverse a payment that has already been sent?</p><div class="faq_answer"><p>Unfortunately bitcoin payments are irreversible and so once a payment has been sent, we have no way of getting it back. You should ensure that the correct withdrawal address is specified in the <b>PROFILE</b> page before requesting a payment or enabling auto-withdraw.</p></div><p class="faq_question bold">Where can I check my activity on this website?</p><div class="faq_answer"><p>By clicking on <b>STATS</b> in the above menu and then on <b>PERSONAL STATS</b>.</p></div><p class="faq_question bold">How can I keep my account secure?</p><div class="faq_answer"><p>By using a strong password, not re-using the same password on any other website and not sharing your password with anybody else. We recommend using a password manager like <a href="https://lastpass.com/" target=_blank>LastPass</a> to create and store your passwords. If you do not use these security practices and your account gets hacked, we shall not be able to help you.</p></div><p class="faq_question bold">How can I contact you?</p><div class="faq_answer"><p>By filling in the form below. Please read the questions above before sending us an email. We receive hundreds of emails everyday and do not have the resources to reply to all of them, so we have a policy of not responding to emails asking questions that have already been answered on this page.</p>');
        insertBitcoinMore("faq_tab", "beforeEnd");
    });

    $(".refer_link").click(function (event) {
        SwitchPageTabs('refer');
    });

    $(".rewards_link").click(function (event) {
        $('.tabs li').removeClass('active');
        $('.tabs li').find('.rewards_link').parent().addClass('active');
        SwitchPageTabs('rewards');
    });

    $(".earn_btc_link").click(function (event) {
        $('.tabs li').removeClass('active');
        $('.tabs li').find('.earn_btc_link').parent().addClass('active');
        SwitchPageTabs('earn_btc');
    });

    $(".edit_link").click(function (event) {
        SwitchPageTabs('edit');
    });

    $(".news_link").click(function (event) {
        SwitchPageTabs('news');
    });

    $(".advertise_link").click(function (event) {
        SwitchPageTabs('advertise');
        $('ul.tabs li').removeClass('active');
        $('#advertise_link_li').addClass('active');
    });

    $(".advertise_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=advertise");
    });

    $(".stats_link").click(function (event) {
        window.location.replace("http://freebitco.in/?op=stats");
    });

    $(".free_play_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=free_play");
    });

    $(".double_your_btc_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=double_your_btc");
    });

    $(".lottery_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=lottery");
    });

    $(".rewards_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=rewards");
    });

    $(".faq_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=faq");
    });

    $(".refer_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=refer");
    });

    $(".earn_btc_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=earn_btc");
    });

    $(".edit_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=edit");
    });

    $(".news_link_stats").click(function (event) {
        window.location.replace("http://freebitco.in/?op=home&tab=news");
    });

    $('#site_stats_button').click(function () {
        $('#personal_stats_button').show();
        $('#site_stats_button').hide();
        $('#site_stats').show();
        $('#personal_stats').hide();
    });

    $('#personal_stats_button').click(function () {
        $('#personal_stats_button').hide();
        $('#site_stats_button').show();
        $('#site_stats').hide();
        $('#personal_stats').show();
    });

    $("#double_your_btc_2x").click(function (event) {
        var bet = $("#double_your_btc_stake").val(); console.log('bet:' + bet);
        var bonus_bal = parseFloat($("#bonus_account_balance").html()); console.log('bonus_bal:' + bonus_bal);
        var bal = parseFloat($("#balance").html()); console.log('bal:' + bal);
        var balance = parseFloat(Math.round((bonus_bal + bal) * 100000000) / 100000000).toFixed(8); console.log('balance:' + balance);
        if (bet * 2 <= balance) {
            if (bet * 2 * ($("#double_your_btc_payout_multiplier").val() - 1) <= max_win_amount) {
                $("#double_your_btc_stake").val(parseFloat(Math.round(bet * 2 * 100000000) / 100000000).toFixed(8));
            } else {
                $("#double_your_btc_stake").val(parseFloat(Math.round(max_win_amount / ($("#double_your_btc_payout_multiplier").val() - 1) * 100000000) / 100000000).toFixed(8));
            }
        } else {
            if (bet * 2 * ($("#double_your_btc_payout_multiplier").val() - 1) <= max_win_amount) {
                $("#double_your_btc_stake").val(balance);
            } else {
                $("#double_your_btc_stake").val(parseFloat(Math.round(max_win_amount / ($("#double_your_btc_payout_multiplier").val() - 1) * 100000000) / 100000000).toFixed(8));
            }
        }
        CalculateWinAmount();
    });

    $("#double_your_btc_half").click(function (event) {
        var bet = $("#double_your_btc_stake").val(); console.log('bet:' + bet);
        var bonus_bal = parseFloat($("#bonus_account_balance").html());  console.log('bonus_bal:' + bonus_bal);
        var bal = parseFloat($("#balance").html()); console.log('bal:' + bal);
        var balance = parseFloat(Math.round((bonus_bal + bal) * 100000000) / 100000000).toFixed(8);  console.log('balance:' + balance);
        if (bet * 0.5 <= balance) {
            if (bet * 0.5 * ($("#double_your_btc_payout_multiplier").val() - 1) <= max_win_amount) {
                $("#double_your_btc_stake").val(parseFloat(Math.round(bet * 0.5 * 100000000) / 100000000).toFixed(8));
            } else {
                $("#double_your_btc_stake").val(parseFloat(Math.round(max_win_amount / ($("#double_your_btc_payout_multiplier").val() - 1) * 100000000) / 100000000).toFixed(8));
            }
        } else {
            if (bet * 0.5 * ($("#double_your_btc_payout_multiplier").val() - 1) <= max_win_amount) {
                $("#double_your_btc_stake").val(balance);
            } else {
                $("#double_your_btc_stake").val(parseFloat(Math.round(max_win_amount / ($("#double_your_btc_payout_multiplier").val() - 1) * 100000000) / 100000000).toFixed(8));
            }
        }
        CalculateWinAmount();
    });
    $("#double_your_btc_max").click(function (event) {
        var conf = confirm("Are you sure you wish to bet the maximum amount? Click OK if you would like to proceed else click CANCEL."); console.log('conf:' + conf);
        if (conf == true) {
            var bet = $("#double_your_btc_stake").val(); console.log('bet:' + bet);
            var bonus_bal = parseFloat($("#bonus_account_balance").html()); console.log('bonus_bal:' + bonus_bal);
            var bal = parseFloat($("#balance").html());  console.log('bal:' + bal);
            var balance = parseFloat(Math.round((bonus_bal + bal) * 100000000) / 100000000).toFixed(8); console.log('balance:' + balance);
            if (balance * ($("#double_your_btc_payout_multiplier").val() - 1) <= max_win_amount) {
                $("#double_your_btc_stake").val(balance);
            } else {
                $("#double_your_btc_stake").val(parseFloat(Math.round(max_win_amount / ($("#double_your_btc_payout_multiplier").val() - 1) * 100000000) / 100000000).toFixed(8));
            }
            CalculateWinAmount();
        }
    });

    $("#double_your_btc_min").click(function (event) {
        var bet = $("#double_your_btc_stake").val(); console.log('bet:' + bet);
        var bonus_bal = parseFloat($("#bonus_account_balance").html()); console.log('bonus_bal:' + bonus_bal);
        var bal = parseFloat($("#balance").html()); console.log('bal:' + bal);
        var balance = parseFloat(Math.round((bonus_bal + bal) * 100000000) / 100000000).toFixed(8); console.log('balance:' + balance);
        if (balance >= 0.00000001) {
            $("#double_your_btc_stake").val('0.00000001');
        } else {
            $("#double_your_btc_stake").val('0.00000000');
        }
        CalculateWinAmount();
    });

    $("#double_your_btc_stake").keyup(function (event) {
        CalculateWinAmount();
    });

    $("#double_your_btc_stake").keydown(function (event) {
        $("#double_your_btc_stake").keyup();
    });

    $("#double_your_btc_stake").keypress(function (event) {
        $("#double_your_btc_stake").keyup();
    });

    $("#double_your_btc_stake").focusout(function (event) {
        $("#double_your_btc_stake").keyup();
    });

    $("#double_your_btc_bet_hi_button").click(function (event) {
        DoubleYourBTC('hi');
    });

    $("#double_your_btc_bet_lo_button").click(function (event) {
        DoubleYourBTC('lo');
    });

    $("#contact_form").submit(function (event) {
        event.preventDefault();
        $("#contact_form_button").attr("disabled", true);
        var $form = $(this); console.log('$form:' + $form);
        var op = $form.find('input[name="op"]').val();console.log('op:' + op);
        var name = $form.find('input[name="name"]').val();console.log('name:' + name);
        var email = $form.find('input[name="email"]').val();console.log('email:' + email);
        var message = $form.find('textarea[name="message"]').val();console.log('message:' + message);
        var url = $form.attr('action');console.log('url:' + url);
        var posting = $.post(url, {
            op: op,
            name: name,
            email: email,
            message: message
        }); console.log('posting:' + posting);
        posting.done(function (data) {
            var result = data.split(":");
            $('#contact_form_error').html("");
            $('#contact_form_error').hide();
            $('#contact_form_success').html("");
            $('#contact_form_success').hide();
            $('#contact_form_name').removeClass('input-error');
            $('#contact_form_email').removeClass('input-error');
            $('#contact_form_message').removeClass('input-error');
            if (result[0] == "e1") {
                $('#contact_form_error').show();
                $('#contact_form_error').html("Please enter your name");
                $('#contact_form_name').addClass('input-error');
            }
            if (result[0] == "e2") {
                $('#contact_form_error').show();
                $('#contact_form_error').html("Invalid email address entered");
                $('#contact_form_email').addClass('input-error');
            }
            if (result[0] == "e3") {
                $('#contact_form_error').show();
                $('#contact_form_error').html("Message must be atleast 10 characters");
                $('#contact_form_message').addClass('input-error');
            }
            if (result[0] == "s1") {
                $('#contact_form_success').show();
                $('#contact_form_success').html("Message sent successfully!");
                $('#contact_form_message').val('');
            }
            $("#contact_form_button").attr("disabled", false);
        });
    });

    $("#forgot_password_button").click(function (event) {
        $("#forgot_password_button").prop("disabled", true);
        setTimeout(function () {
            var email = $("#forgot_password_email").val();
            $.get('/?op=forgot_password&email=' + encodeURIComponent(email) + '&rand=' + GenerateHashes(hash_match), function (data) {
                var result = data.split(":");
                DisplaySEMessage(result[0], result[1]);
                $("#forgot_password_button").prop("disabled", false);
                if (result[0] == "s") {
                    hash_match = result[2]; console.log('hash_match:'+hash_match);
                }
            });
        }, 0);
    });

    $("#password_reset_form").submit(function (event) {
        event.preventDefault();
        $("#password_reset_form_button").attr("disabled", true);
        var a = $("#password_reset_form_btc_address").val(); console.log('a:' + a);
        var s = $("#password_reset_form_signature").val(); console.log('s:' + s);
        var m = $("#password_reset_form_message").val(); console.log('m:' + m);
        var verified = verify_message(s, m); console.log('verified:' + verified);
        if (verified == a) {
            var $form = $(this); console.log('$form:' + $form);
            var op = $form.find('input[name="op"]').val(); console.console.log('op:' + op);
            var btc_address = $form.find('input[name="btc_address"]').val(); console.console.log('btc_address:' + btc_address);
            var message = $form.find('input[name="message"]').val(); console.console.log('message:' + message);
            var signature = $form.find('input[name="signature"]').val(); console.console.log('signature:' + signature);
            var url = $form.attr('action'); console.console.log('url:' + url);
            var posting = $.post(url, {
                op: op,
                btc_address: btc_address,
                message: message,
                signature: signature
            }); console.console.log('posting:' + posting);
            posting.done(function (data) {
                $('#password_reset_message').hide();
                $('#password_reset_message').html("");
                $('#password_reset_message').removeClass('green');
                $('#password_reset_message').removeClass('red');
                if (data == "e1") {
                    $('#password_reset_message').show();
                    $('#password_reset_message').html("Invalid Bitcoin Address entered");
                    $('#password_reset_message').addClass('red');
                }
                if (data == "e2") {
                    $('#password_reset_message').show();
                    $('#password_reset_message').html("Invalid Email Address");
                    $('#password_reset_message').addClass('red');
                }
                if (data == "e3") {
                    $('#password_reset_message').show();
                    $('#password_reset_message').html("Signature cannot be blank");
                    $('#password_reset_message').addClass('red');
                }
                if (data == "e4") {
                    $('#password_reset_message').show();
                    $('#password_reset_message').html("No account associated with this Bitcoin Address exists in our database");
                    $('#password_reset_message').addClass('red');
                }
                if (data == "e5") {
                    $('#password_reset_message').show();
                    $('#password_reset_message').html("An account with this email address already exists. Please use the forgot password box above instead.");
                    $('#password_reset_message').addClass('red');
                }
                if (data == "s1") {
                    $('#password_reset_message').show();
                    $('#password_reset_message').html("Password reset request queued. Please check your email inbox after 1 hour for the password reset link.");
                    $('#password_reset_message').addClass('green');
                }
            });
        } else {
            $('#password_reset_message').show();
            $('#password_reset_message').html("Incorrect signature. Please follow the instructions for signing messages above and then try again.");
            $('#password_reset_message').addClass('red');
        }
        $("#password_reset_form_button").attr("disabled", false);
    });

    $("#change_password_button").click(function () {
        var posting = $.post('/', {
            op: 'change_password',
            old_password: $('#cp_old_password').val(),
            new_password: $('#cp_new_password').val(),
            repeat_new_password: $('#cp_repeat_new_password').val(),
            tfa_code: $('#cp_tfa_code').val()
        }); console.log('posting:' + posting);

        posting.done(function (data) {
            var result = data.split(":");
            DisplaySEMessage(result[0], result[1]);
            if (result[0] == "s") {
                $.cookie.raw = true;
                $.cookie('password', result[2], {
                    expires: 3650,
                    secure: true
                });
            }
        });
    });

    $("#edit_profile_button").click(function () {
        var posting = $.post('/', {
            op: 'edit_profile',
            func: 'change_btc_address',
            new_btc_address: $('#edit_profile_form_btc_address').val(),
            password: $('#cba_password').val(),
            tfa_code: $('#cba_tfa_code').val()
        }); console.log('posting:' + posting);
        posting.done(function (data) {
            var result = data.split(":");
            DisplaySEMessage(result[0], result[1]);
            if (result[2] == "s1") {
                $.cookie.raw = true;
                $.cookie('btc_address', result[3], {
                    expires: 3650,
                    secure: true
                });
                $('.withdraw_btc_address').html(result[3]);
                $('.withdraw_btc_address').val(result[3]);
                profile_withdraw_address = result[3];
            } else if (result[2] == "s2") {
                $('#edit_profile_form_btc_address').val(result[3]);
            }
        });
    });

    $("#change_email_button").click(function () {
        var posting = $.post('/', {
            op: 'edit_profile',
            func: 'change_email',
            new_email: $('#edit_profile_form_email').val(),
            password: $('#ce_password').val(),
            tfa_code: $('#ce_tfa_code').val()
        }); console.log('posting:' + posting);
        posting.done(function (data) {
            var result = data.split(":");
            DisplaySEMessage(result[0], result[1]);
        });
    });

    $("#equal_share").click(function (event) {
        $("#weighted_share").attr("checked", false);
        $("#last_payout_share").attr("checked", false);
    });

    $("#weighted_share").click(function (event) {
        $("#equal_share").attr("checked", false);
        $("#last_payout_share").attr("checked", false);
    });

    $("#last_payout_share").click(function (event) {
        $("#equal_share").attr("checked", false);
        $("#weighted_share").attr("checked", false);
    });

    $('.footer_cur_year').html(new Date().getFullYear());
    $("#switch_to_recaptcha").click(function () {
        $("#solvemedia_captcha").hide();
        $("#recaptcha_captcha").show();
    });

    $("#switch_to_solvemedia").click(function () {
        $("#recaptcha_captcha").hide();
        $("#solvemedia_captcha").show();
    });

    $("#get_tag_stats").change(function () {
        var tag = $("#get_tag_stats").val(); console.log('tag:' + tag);
        $.get('/?op=show_advanced_tag_stats&tag=' + tag, function (data) {
            $('#detailed_tag_stats_table').show();
            $('#detailed_tag_stats_table').find("tr:gt(0)").remove();
            $("#detailed_tag_stats_table").append(data);
        });
    });

    $("#main_to_adv_button").click(function (event) {
        var transfer_amt = $("#main_to_adv_amount").val(); console.log('transfer_amt:' + transfer_amt);
        $("#main_to_adv_button").attr("disabled", true);
        $.get('/?op=transfer_from_main_to_adv&transfer_amount=' + transfer_amt, function (data) {
            var result = data.split(":"); console.log('result:' + result);
            $('#main_to_adv_error').hide();
            $('#main_to_adv_success').hide();
            if (result[0] == "e1") {
                $('#main_to_adv_error').show();
                $('#main_to_adv_error').html("Unexpected error. Please log out and then log back in.");
            }
            if (result[0] == "e2") {
                $('#main_to_adv_error').show();
                $('#main_to_adv_error').html("Minimum amount that you can transfer is 0.00000001 BTC.");
            }
            if (result[0] == "e3") {
                $('#main_to_adv_error').show();
                $('#main_to_adv_error').html("Transfer amount cannot be greater than your main account balance.");
            }
            if (result[0] == "s1") {
                $('#main_to_adv_success').show();
                $('#main_to_adv_success').html(transfer_amt + " BTC successfully transferred.");
                $('#balance').html(parseFloat(parseInt(result[1]) / 100000000).toFixed(8));
                balanceChanged();
                $('#ad_balance').html(parseFloat(parseInt(result[2]) / 100000000).toFixed(8));
            }
            $("#main_to_adv_button").attr("disabled", false);
        });
    });

    $(".button").click(function () {
        $(this).blur();
    });

    $("#banner_image_button").click(function () {
        $('#ad_banner').click();
    });

    $('#ad_banner').bind('change', function () {
        var str = ""; console.log('str:' + str);
        str = $(this).val();
        $("#banner_file_name").show();
        $("#banner_file_name").html('<small class="bold">' + str + '</small>');
    }).change();

    $('#ad_banner').bind('change', function () {
        $('#image_upload_error').hide();
        var fsize = this.files[0].size; console.log('fsize:' + fsize);
        if (fsize > 1048576) {
            $('#image_upload_error').show();
            $('#image_upload_error').html("Banner image size exceeds 1Mb");
            submitEvent.preventDefault();
        }
        var filename = $("#ad_banner").val(); console.log('filename:' + filename);
        var extension = filename.replace(/^.*\./, ''); console.log('extension:' + extension);
        if (extension == filename) {
            extension = '';
        } else {
            extension = extension.toLowerCase();
        }
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                break;
            default:
                $('#image_upload_error').show();
                $('#image_upload_error').html("Invalid banner file type. Only JPG, JPEG, PNG and GIF allowed.");
                submitEvent.preventDefault();
        }
    });

    $("#ad_name").click(function () {
        $('#create_ad_error').hide();
        $('#create_ad_success').hide();
    });

    $("#create_an_ad_form").ajaxForm(function (data) {
        $("#create_ad_button").attr("disabled", false);
        $("#create_ad_button").val("CREATE AD!");
        submissionEnabled = true;
        var result = data.split(":"); console.log('result:' + result);
        $('#image_upload_error').hide();
        $('#create_ad_error').hide();
        $('#create_ad_success').hide();
        if (result[0] == "e1") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Please enter a campaign name");
        }
        if (result[0] == "e2") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Invalid campaign name");
        }
        if (result[0] == "e3") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Invalid banner file type. Only JPG, JPEG, PNG and GIF allowed.");
        }
        if (result[0] == "e4") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Banner image size exceeds 1Mb");
        }
        if (result[0] == "e5") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Invalid destination URL");
        }
        if (result[0] == "e6") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Invalid budget amount");
        }
        if (result[0] == "e7") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Please pick a banner or upload a banner less than 1Mb in size");
        }
        if (result[0] == "e8") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Please enter a Destination URL");
        }
        if (result[0] == "e9") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Banner image dimensions must be " + result[1] + "px * " + result[2] + "px");
        }
        if (result[0] == "e10") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Please select atleast one website to advertise in");
        }
        if (result[0] == "e11") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Please select the ad position where you want your banner to be placed");
        }
        if (result[0] == "e12") {
            $('#create_ad_error').show();
            $('#create_ad_error').html("Frequency cap must be between 0 (unlimited) and 100.");
        }
        if (result[0] == "s1") {
            $('#create_ad_success').show();
            $('#create_ad_success').html("Ad campaign created successfully");
            $('#ad_campaigns_table tr:last').after('<tr id="ad_campaign_' + result[1] + '"><td><span id="campaign_name_' + result[1] + '">' + result[2] + '</span></td><td id="ad_campaign_status_' + result[1] + '"><span style="color:#FF6600;">PENDING APPROVAL</span></td><td id="campaign_views_' + result[1] + '">0</td><td id="campaign_clicks_' + result[1] + '">0</td><td id="campaign_total_cost_' + result[1] + '">0.00000000</td><td id="start_pause_ad_campaign_icon_' + result[1] + '"></td><td><a href="javascript:void(0);" onclick="ShowAdDetails(' + result[1] + ');" data-reveal-id="myModal8"><img src="//static6.freebitco.in/images/settings.png" border=0 alt="SETTINGS"></a></td><td><a href="javascript:void(0);" onclick="ShowAdStats(' + result[1] + ');" data-reveal-id="myModal9"><img src="//static6.freebitco.in/images/stats.png" border=0 alt="STATS"></a></td><td><a href="javascript:void(0);" onclick="DeleteAdCampaign(' + result[1] + ');"><img src="//static6.freebitco.in/images/delete.png" border=0 alt="DELETE"></a></td></tr>');
            $('#ad_name').val('');
            $('#ad_banner').val('');
            $('#banner_file_name').html('');
            $('#ad_url').val('http://');
            $('#daily_budget').val('0.00000000');
            $('#total_budget').val('0.00000000');
        }
    });

    $("#edit_ad_params_button").click(function () {
        var daily_budget = $('#ad_details_popup_daily_budget').val(); console.log('daily_budget:' + daily_budget);
        var total_budget = $('#ad_details_popup_total_budget').val(); console.log('total_budget:' + total_budget);
        var campaign_name = $('#ad_details_popup_campaign_name').val(); console.log('campaign_name:' + campaign_name);
        var ad_id = $('#ad_details_popup_ad_id').val(); console.log('ad_id:' + ad_id);
        var freq_cap = $('#ad_details_popup_freq_cap').val(); console.log('freq_cap:' + freq_cap);
        var adv_bit = 0; console.log('adv_bit:' + adv_bit);
        var adv_doge = 0; console.log('adv_doge:' + adv_doge);
        if ($("#ad_details_popup_adv_bit").is(":checked")) {
            adv_bit = 1;
        }
        if ($("#ad_details_popup_adv_doge").is(":checked")) {
            adv_doge = 1;
        }
        $("#edit_ad_params_button").attr("disabled", true);
        var target_countries_list = ""; console.log('target_countries_list:' + target_countries_list);
        if ($("#ad_details_target_country_code").val()) {
            target_countries_list = $("#ad_details_target_country_code").val().join(" ");
        }
        var posting = $.post('/', {
            op: 'edit_ad',
            id: ad_id,
            daily: daily_budget,
            total: total_budget,
            campaign: campaign_name,
            adv_bit: adv_bit,
            adv_doge: adv_doge,
            user_ads_target_country_code: target_countries_list,
            freq_cap: freq_cap
        }); console.log('posting_edit_ad_params:' + posting);
        posting.done(function (data) {
            $('#edit_ad_error').hide();
            $('#edit_ad_success').hide();
            if (data == "e1") {
                $('#edit_ad_error').show();
                $('#edit_ad_error').html('Invalid ad id');
            }
            if (data == "e2") {
                $('#edit_ad_error').show();
                $('#edit_ad_error').html('Invalid daily budget');
            }
            if (data == "e3") {
                $('#edit_ad_error').show();
                $('#edit_ad_error').html('Invalid total budget');
            }
            if (data == "e4") {
                $('#edit_ad_error').show();
                $('#edit_ad_error').html("Invalid campaign name");
            }
            if (data == "e5") {
                $('#edit_ad_error').show();
                $('#edit_ad_error').html("Please select atleast one website to advertise in");
            }
            if (data == "e12") {
                $('#edit_ad_error').show();
                $('#edit_ad_error').html("Frequency cap must be between 0 (unlimited) and 100.");
            }
            if (data == "s1") {
                $('#edit_ad_success').show();
                $('#edit_ad_success').html('Ad details edited successfully');
                $('#ad_details_popup_campaign_name').val(campaign_name);
                $('#ad_details_popup_daily_budget').val(daily_budget);
                $('#ad_details_popup_total_budget').val(total_budget);
                $('#campaign_name_' + ad_id).html(campaign_name);
            }
            $("#edit_ad_params_button").attr("disabled", false);
        });
    });

    $("#as_equal_share").click(function (event) {
        $("#as_weighted_share").attr("checked", false);
        $("#as_last_payout_share").attr("checked", false);
    });

    $("#as_weighted_share").click(function (event) {
        $("#as_equal_share").attr("checked", false);
        $("#as_last_payout_share").attr("checked", false);
    });

    $("#as_last_payout_share").click(function (event) {
        $("#as_equal_share").attr("checked", false);
        $("#as_weighted_share").attr("checked", false);
    });

    $("#as_button").click(function (event) {
        var as_percent = $('#as_percent').val(); console.log('as_percent:' + as_percent);
        $("#as_button").attr("disabled", true);
        var method; console.log('method:' + method);
        if ($("#as_equal_share").is(":checked")) {
            method = 1;
        }
        if ($("#as_weighted_share").is(":checked")) {
            method = 2;
        }
        if ($("#as_last_payout_share").is(":checked")) {
            method = 3;
        }
        $.get('/?op=set_auto_share&mode=' + method + '&as_percent=' + as_percent, function (data) {
            var result = data.split(":"); console.log('result:' + result);
            $('#as_error').hide();
            $('#as_success').hide();
            if (result[0] == "e1") {
                $('#as_error').show();
                $('#as_error').html("Invalid auto-share percentage");
            }
            if (result[0] == "e2") {
                $('#as_error').show();
                $('#as_error').html("Invalid auto-share mode");
            }
            if (result[0] == "s1") {
                $('#as_success').show();
                $('#as_success').html("Auto-share set successfully!");
            }
            $("#as_button").attr("disabled", false);
        });
    });

    $("#hide_bouncing_email_address_msg").click(function () {
        $('#bouncing_email_address_msg').hide();
        $.cookie.raw = true;
        $.cookie('sbem', 0, {
            expires: 3650,
            secure: true
        });
    });

    $(".withdraw_box_button").click(function () {
        $.get('/?op=get_current_address_and_balance', function (data) {
            var result = data.split(":"); console.log('result:' + result);
            if (result[0] == "s") {
                $("#balance").html(result[2]);
                balanceChanged();
                m_w_fee = result[3];
                i_w_fee = result[4];
                $(".withdraw_btc_address").html(result[1]);
                $('#edit_profile_form_btc_address').val(result[1]);
                profile_withdraw_address = result[1]; console.log('profile_withdraw_address:' + profile_withdraw_address);
            }
            var balance = $("#balance").html(); console.log('balance:' + balance);
            var withdraw_amount = parseFloat(Math.floor((balance - 0.00000001) * 100000000) / 100000000).toFixed(8); console.log('withdraw_amount:' + withdraw_amount);
            withdraw_max_amount = withdraw_amount; console.log('withdraw_max_amount:' + withdraw_max_amount);
            $("#withdrawal_amount").val('');
            $("#instant_withdrawal_amount").val('');
            $("#manual_min_withdraw").html(parseFloat(min_withdraw).toFixed(8));
            $("#instant_min_withdraw").html(parseFloat(min_withdraw).toFixed(8));
            $(".manual_withdraw_fee").html(m_w_fee);
            $(".instant_withdraw_fee").html(i_w_fee);
            $('#manual_withdraw_btc_add').val('');
            $('#instant_withdraw_btc_add').val('');
            $("#manual_withdraw_amt_recv").html('0.00000000');
            $("#instant_withdraw_amt_recv").html('0.00000000');
        });
    });

    $(".withdraw_use_profile_address").click(function () {
        $('#manual_withdraw_btc_add').val(profile_withdraw_address);
        $('#instant_withdraw_btc_add').val(profile_withdraw_address);
    });

    $(".withdraw_all_link").click(function () {
        $('#withdrawal_amount').val(parseFloat(withdraw_max_amount - parseFloat(m_w_fee)).toFixed(8));
        $('#instant_withdrawal_amount').val(parseFloat(withdraw_max_amount - parseFloat(i_w_fee)).toFixed(8));
        $("#withdrawal_amount").keyup();
        $("#instant_withdrawal_amount").keyup();
    });

    $("#withdrawal_amount").keyup(function () {
        $("#manual_withdraw_amt_recv").html(parseFloat(parseFloat($("#withdrawal_amount").val()) + parseFloat(m_w_fee)).toFixed(8));
    });

    $("#withdrawal_amount").keypress(function () {
        $("#withdrawal_amount").keyup();
    });

    $("#withdrawal_amount").keydown(function () {
        $("#withdrawal_amount").keyup();
    });

    $("#instant_withdrawal_amount").keyup(function () {
        $("#instant_withdraw_amt_recv").html(parseFloat(parseFloat($("#instant_withdrawal_amount").val()) + parseFloat(i_w_fee)).toFixed(8));
    });

    $("#instant_withdrawal_amount").keypress(function () {
        $("#instant_withdrawal_amount").keyup();
    });

    $("#instant_withdrawal_amount").keydown(function () {
        $("#instant_withdrawal_amount").keyup();
    });

    $("#autobet_win_return_to_base").click(function (event) {
        $("#autobet_win_increase_bet").attr("checked", false);
    });

    $("#autobet_win_increase_bet").click(function (event) {
        $("#autobet_win_return_to_base").attr("checked", false);
    });

    $("#autobet_lose_return_to_base").click(function (event) {
        $("#autobet_lose_increase_bet").attr("checked", false);
    });

    $("#autobet_lose_increase_bet").click(function (event) {
        $("#autobet_lose_return_to_base").attr("checked", false);
    });

    $("#autobet_bet_hi").click(function (event) {
        $("#autobet_bet_lo").attr("checked", false);
        $("#autobet_bet_alternate").attr("checked", false);
    });

    $("#autobet_bet_lo").click(function (event) {
        $("#autobet_bet_hi").attr("checked", false);
        $("#autobet_bet_alternate").attr("checked", false);
    });

    $("#autobet_bet_alternate").click(function (event) {
        $("#autobet_bet_hi").attr("checked", false);
        $("#autobet_bet_lo").attr("checked", false);
    });

    $("#autobet_max_bet_reset").click(function (event) {
        $("#autobet_max_bet_stop").attr("checked", false);
    });

    $("#autobet_max_bet_stop").click(function (event) {
        $("#autobet_max_bet_reset").attr("checked", false);
    });

    $("#start_autobet").click(function (event) {
        $("#autobet_error").hide();
        $("#autobet_error").html('');
        $(".play_jackpot").prop("checked", false);
        $('.autobet_play_jackpot:checkbox:checked').map(function () {
            $(".play_jackpot:checkbox[value=" + this.value + "]").prop("checked", true)
        });
        console.log('base_bet:'+base_bet+'bet_odds:'+bet_odds+'max_bet:'+max_bet+'bet_count:'+bet_count+'mode:'+mode+'autobet_win_return_to_base:'+autobet_win_return_to_base+'autobet_win_increase_bet_percent:'+autobet_win_increase_bet_percent+'autobet_lose_return_to_base:'+autobet_lose_return_to_base+'autobet_lose_increase_bet_percent:'+autobet_lose_increase_bet_percent+'autobet_win_change_odds:'+autobet_win_change_odds+'autobet_lose_change_odds:'+autobet_lose_change_odds+'change_client_seed:'+change_client_seed+'reset_after_max_bet:'+reset_after_max_bet+'rolls_played:'+rolls_played+'biggest_bet:'+biggest_bet+'biggest_win:'+biggest_win);
        console.log('stop_after_profit:'+stop_after_profit+'stop_after_loss:'+stop_after_loss+'session_pl:'+session_pl+'enable_worker:'+enable_worker+'logging:'+logging+'enable_sounds:'+enable_sounds);
        var base_bet = $('#autobet_base_bet').val();
        var bet_odds = $('#autobet_bet_odds').val();
        var max_bet = $('#autobet_max_bet').val();
        var bet_count = $('#autobet_roll_count').val();
        var mode = "alternate";
        var autobet_win_return_to_base = 0
            , autobet_win_increase_bet_percent = 0
            , autobet_lose_return_to_base = 0
            , autobet_lose_increase_bet_percent = 0
            , autobet_win_change_odds = 0
            , autobet_lose_change_odds = 0
            , change_client_seed = 0
            , reset_after_max_bet = 0
            , rolls_played = 0
            , biggest_bet = 0
            , biggest_win = 0
            , stop_after_profit = 0
            , stop_after_loss = 0
            , session_pl = parseFloat(0).toFixed(8)
            , logging = 0
            , enable_worker = 0
            , enable_sounds = 0;
        if ($("#autobet_bet_hi").is(":checked")) {
            mode = "hi";
        }
        if ($("#autobet_bet_lo").is(":checked")) {
            mode = "lo";
        }
        if (base_bet < 0.00000001 || base_bet > max_win_amount) {
            AutoBetErrors("e1");
        } else if (bet_odds < 1.01 || bet_odds > 4750) {
            AutoBetErrors("e2");
        } else if (max_bet < 0.00000001 || max_bet > max_win_amount) {
            AutoBetErrors("e3");
        } else if (bet_count < 1) {
            AutoBetErrors("e4");
        } else if ($("#autobet_win_change_odds").is(":checked") && ($("#autobet_win_change_odds_value").val() < 1.01 || $("#autobet_win_change_odds_value").val() > 4750)) {
            AutoBetErrors("e5");
        } else if ($("#autobet_lose_change_odds").is(":checked") && ($("#autobet_lose_change_odds_value").val() < 1.01 || $("#autobet_lose_change_odds_value").val() > 4750)) {
            AutoBetErrors("e6");
        } else if ($("#stop_after_profit").is(":checked") && $("#stop_after_profit_value").val() <= 0) {
            AutoBetErrors("e7");
        } else if ($("#stop_after_loss").is(":checked") && $("#stop_after_loss_value").val() <= 0) {
            AutoBetErrors("e8");
        } else {
            stop_autobet = false;
            $("#auto_betting_button").hide();
            $("#stop_auto_betting").show();
            $("#double_your_btc_middle_section").css({
                'height': 'auto',
                'border-radius': '0 0 10px 10px',
                'padding-bottom': '20px'
            });
            $("#double_your_btc_stake").val(base_bet);
            $("#double_your_btc_payout_multiplier").val(bet_odds);
            $("#double_your_btc_payout_multiplier").keyup();
            $('#rolls_played_count').html('0');
            $('#rolls_played_count').html('0');
            $('#rolls_status').show();
            $('#autobet_highest_bet_msg').show();
            $('#autobet_highest_bet').html('0.00000000 BTC');
            $('#autobet_highest_win_msg').show();
            $('#autobet_highest_win').html('0.00000000 BTC');
            $('#autobet_pl_msg').show();
            $('#autobet_pl').addClass('green');
            $('#autobet_pl').css({
                'background-color': '#33FF33'
            });
            $('#autobet_pl').html('0.00000000 BTC');
            if ($("#autobet_win_return_to_base").is(":checked")) {
                autobet_win_return_to_base = 1;
            }
            if ($("#autobet_lose_return_to_base").is(":checked")) {
                autobet_lose_return_to_base = 1;
            }
            if ($("#autobet_win_increase_bet").is(":checked")) {
                autobet_win_increase_bet_percent = $("#autobet_win_increase_bet_percent").val();
            }
            if ($("#autobet_lose_increase_bet").is(":checked")) {
                autobet_lose_increase_bet_percent = $("#autobet_lose_increase_bet_percent").val();
            }
            if ($("#autobet_win_change_odds").is(":checked")) {
                autobet_win_change_odds = $("#autobet_win_change_odds_value").val();
            }
            if ($("#autobet_lose_change_odds").is(":checked")) {
                autobet_lose_change_odds = $("#autobet_lose_change_odds_value").val();
            }
            if ($("#autobet_change_client_seed").is(":checked")) {
                change_client_seed = 1;
            }
            if ($("#autobet_max_bet_reset").is(":checked")) {
                reset_after_max_bet = 1;
            }
            if ($("#autobet_dnr").is(":checked")) {
                autobet_dnr = true;
            }
            if ($("#stop_after_profit").is(":checked")) {
                stop_after_profit = $("#stop_after_profit_value").val();
            }
            if ($("#stop_after_loss").is(":checked")) {
                stop_after_loss = $("#stop_after_loss_value").val();
            }
            if ($("#autobet_log_bets").is(":checked")) {
                logging = 1;
                $("#autobet_view_bet_log").show();
            }
            if ($("#autobet_enable_worker").is(":checked")) {
                enable_worker = 1;
            }
            if ($("#autobet_log_bets").is(":checked")) {
                logging = 1;
                $(".autobet_view_bet_log").show();
            }
            if ($("#autobet_enable_sounds").is(":checked")) {
                enable_sounds = 1;
            }
            autobet_running = true;
            autobet_history = [];
            AutoBet(mode, bet_count, max_bet, base_bet, autobet_win_return_to_base, autobet_lose_return_to_base, autobet_win_increase_bet_percent, autobet_lose_increase_bet_percent, change_client_seed, reset_after_max_bet, rolls_played, biggest_bet, biggest_win, session_pl, autobet_win_change_odds, autobet_lose_change_odds, stop_after_profit, stop_after_loss, logging, enable_sounds);
        }
    });

    $("#stop_autobet_button").click(function (event) {
        stop_autobet = true;
    });

    var free_play_sound_cookie = $.cookie('free_play_sound'); console.log('free_play_sound_cookie:'+free_play_sound_cookie);
    if (free_play_sound_cookie == 1) {
        $("#free_play_sound").prop("checked", true);
        free_play_sound = true;
    }
    $.ionSound({
        sounds: ["jump_up", "bell_ring", "tap"],
        path: "https://fbtc-audio.freebitco.in/",
        multiPlay: true
    });

    $("#test_sound").click(function (event) {
        $.ionSound.play("jump_up");
    });

    $("#free_play_sound").click(function (event) {
        $.cookie.raw = true;
        if ($("#free_play_sound").is(":checked")) {
            $.cookie('free_play_sound', 1, {
                expires: 3650,
                secure: true
            });
            free_play_sound = true;
        } else {
            $.cookie('free_play_sound', 0, {
                expires: 3650,
                secure: true
            });
            free_play_sound = false;
        }
    });

    $("#auto_withdraw_option_link").click(function (event) {
        $(".withdraw_options").hide();
        $("#auto_withdraw_option").show();
    });

    $("#manual_withdraw_option_link").click(function (event) {
        $(".withdraw_options").hide();
        $("#manual_withdraw_option").show();
    });

    $("#instant_withdraw_option_link").click(function (event) {
        $(".withdraw_options").hide();
        $("#instant_withdraw_option").show();
    });

    $(".withdraw_options_ul a").click(function () {
        $(".withdraw_options_ul a.active").removeClass();
        $(this).addClass('active').blur();
        return false;
    });

    $("#auto_withdraw_option_link").click();
    $(".remove_autobet_error").focus(function () {
        $("#autobet_error").hide();
        $("#autobet_error").html('');
    });

    $("#instant_withdrawal_button").click(function (event) {
        $("#instant_withdrawal_button").attr("disabled", true);
        var posting = $.post('/', {
            op: 'withdraw',
            type: 'instant',
            amount: $("#instant_withdrawal_amount").val(),
            withdraw_address: $("#instant_withdraw_btc_add").val(),
            tfa_code: $("#iw_tfa_code").val()
        }); console.log('posting:'+posting);
        posting.done(function (data) {
            var result = data.split(":"); console.log('result:'+result+'|withdraw_max_amount:'+withdraw_max_amount);
            if (result[0] == "s") {
                $('#balance').html(result[2]);
                balanceChanged();
                $('#manual_withdraw_btc_add').val('');
                $('#instant_withdraw_btc_add').val('');
                withdraw_max_amount = parseFloat(Math.floor((result[2] - 0.00000001) * 100000000) / 100000000).toFixed(8);
                $("#withdrawal_amount").val('');
                $("#instant_withdrawal_amount").val('');
                $("#manual_withdraw_amt_recv").html('0.00000000');
                $("#instant_withdraw_amt_recv").html('0.00000000');
            }
            DisplaySEMessage(result[0], result[1]);
            $("#instant_withdrawal_button").attr("disabled", false);
        });
    });

    $("#withdrawal_button").click(function (event) {
        $("#withdrawal_button").attr("disabled", true);
        var posting = $.post('/', {
            op: 'withdraw',
            type: 'slow',
            amount: $("#withdrawal_amount").val(),
            withdraw_address: $("#manual_withdraw_btc_add").val(),
            tfa_code: $("#mw_tfa_code").val()
        }); console.log('posting:'+posting);
        posting.done(function (data) {
            var result = data.split(":"); console.log('result:'+result+'|withdraw_max_amount:'+withdraw_max_amount);
            if (result[0] == "s") {
                $('#balance').html(result[2]);
                balanceChanged();
                $('#manual_withdraw_btc_add').val('');
                $('#instant_withdraw_btc_add').val('');
                withdraw_max_amount = parseFloat(Math.floor((result[2] - 0.00000001) * 100000000) / 100000000).toFixed(8);
                $("#withdrawal_amount").val('');
                $("#instant_withdrawal_amount").val('');
                $("#manual_withdraw_amt_recv").html('0.00000000');
                $("#instant_withdraw_amt_recv").html('0.00000000');
            }
            DisplaySEMessage(result[0], result[1]);
            $("#withdrawal_button").attr("disabled", false);
        });
    });

    $("#main_deposit_address_qr_code_link").click(function () {
        $("#main_deposit_address_qr_code").show();
    });
    $("#hide_xapo_wallet_msg").click(function () {
        $('#create_xapo_wallet_msg').hide();
        $.cookie.raw = true;
        $.cookie('hide_xapo_message', 1, {
            expires: 3650,
            secure: true
        });
    });
    var hide_sharing_password_message_cookie = $.cookie('hide_sharing_password_message'); console.log('hide_sharing_password_message_cookie:'+hide_sharing_password_message_cookie);
    if (hide_sharing_password_message_cookie != 1) {
        $('#sharing_password_message').show();
    }
    $("#hide_sharing_password_message").click(function () {
        $('#sharing_password_message').hide();
        $.cookie.raw = true;
        $.cookie('hide_sharing_password_message', 1, {
            expires: 3650,
            secure: true
        });
    });

    $(".logout_link").click(function (event) {
        $.cookie.raw = true;
        $.removeCookie('btc_address');
        $.removeCookie('password');
        window.location.replace("http://freebitco.in/?op=home");
    });

    $("#mob_ver_button").click(function (event) {
        $("#mob_ver_button").attr("disabled", true);
        $.get('/?op=verify_phone&country_code=' + $("#mob_ver_country_code").val() + '&phone_number=' + $("#mob_ver_mobile_number").val(), function (data) {
            var result = data.split(":"); console.log('result:'+result);
            $('#mob_ver_message').html("");
            $('#mob_ver_message').show();
            $('#mob_ver_message').removeClass('red');
            $('#mob_ver_message').removeClass('green');
            $('#reset_mob_ver').hide();
            if (result[0] == "e") {
                $('#mob_ver_message').addClass('red');
            }
            if (result[0] == "s") {
                $('#mob_ver_message').addClass('green');
            }
            if (result[1] == "e1") {
                $('#mob_ver_message').html("Message could not be sent - " + result[2]);
            }
            if (result[1] == "e2") {
                $('#mob_ver_message').html("Someone has already used this mobile number.");
            }
            if (result[1] == "e3") {
                $('#mob_ver_message').html("Invalid country code or mobile number.");
            }
            if (result[1] == "e4") {
                $('#mob_ver_message').html("We have already sent you a verification code. Click the link below to change your mobile number to a different one to get a code.");
            }
            if (result[1] == "e5") {
                $('#mob_ver_message').html("You have already tried to send a code to this mobile number. Please try a different number.");
            }
            if (result[1] == "e6") {
                $('#mob_ver_message').html("Please wait " + result[2] + " minutes before requesting another code");
            }
            if (result[1] == "e7") {
                $('#mob_ver_message').html("You have entered an incorrect mobile number 10 times. You cannot enter another one.");
            }
            if (result[1] == "e8") {
                $('#mob_ver_message').html("You do not have sufficient balance to verify your phone. Phone verification has a one-time charge of " + result[2] + " BTC to cover network costs.");
            }
            if (result[1] == "s1") {
                $('#mob_ver_message').html("Verification message sent to +" + result[2] + ". Please enter the 6 digit code that you get into the box below.");
                $('#mob_ver_button').hide();
                $('#mob_ver_enter_number').hide();
                $('#reset_mob_ver').show();
                $("html, body").animate({
                    scrollTop: $("#mob_ver_enter_number").offset().top - 45
                }, "fast");
            }
            if (result[1] == "s2") {
                $('#mob_ver_message').html("Your mobile number has already been verified.");
            }
            $("#mob_ver_button").attr("disabled", false);
        });
    });

    $("#mob_ver_code_button").click(function (event) {
        $("#mob_ver_code_button").attr("disabled", true);
        $.get('/?op=verify_phone_code&code=' + $("#mob_ver_code").val(), function (data) {
            var result = data.split(":"); console.log('result:'+result);
            $('#mob_ver_code_message').html("");
            $('#mob_ver_code_message').show();
            $('#mob_ver_code_message').removeClass('red');
            $('#mob_ver_code_message').removeClass('green');
            if (result[0] == "e") {
                $('#mob_ver_code_message').addClass('red');
            }
            if (result[0] == "s") {
                $('#mob_ver_code_message').addClass('green');
            }
            if (result[1] == "e1") {
                $('#mob_ver_code_message').html("Incorrect code. " + result[3] + "<BR>You have " + result[2] + " tries remaining.");
            }
            if (result[1] == "e2") {
                $('#mob_ver_code_message').html("Invalid code entered.");
            }
            if (result[1] == "e3") {
                $('#mob_ver_code_message').html("You cannot verify your mobile number anymore as you have entered incorrect codes 5 times.");
            }
            if (result[1] == "e4") {
                $('#mob_ver_code_message').html("You need to request a code before trying to verify it. Use the box above to request a code.");
            }
            if (result[1] == "e5") {
                $('#mob_ver_code_message').html("Someone has already used this mobile number.");
            }
            if (result[1] == "s1") {
                $('#mob_ver_code_message').html("Code verified successfully!");
                $('#reset_mob_ver').hide();
            }
            if (result[1] == "s2") {
                $('#mob_ver_code_message').html("Your mobile number has already been verified.");
                $('#reset_mob_ver').hide();
            }
            $("#mob_ver_code_button").attr("disabled", false);
        });
    });

    $("#reset_mob_ver_link").click(function (event) {
        $.get('/?op=enter_phone_again', function (data) {
            var result = data.split(":"); console.log('result:'+result);
            $('#reset_mob_ver_msg').html("");
            $('#reset_mob_ver_msg').show();
            $('#reset_mob_ver_msg').removeClass('red');
            $('#reset_mob_ver_msg').removeClass('green');
            if (result[0] == "e") {
                $('#reset_mob_ver_msg').addClass('red');
            }
            if (result[0] == "s") {
                $('#reset_mob_ver_msg').addClass('green');
            }
            if (result[1] == "e1") {
                $('#reset_mob_ver_msg').html("You have entered an incorrect mobile number 10 times. You cannot enter another one.");
            } else if (result[1] == "e2") {
                $('#reset_mob_ver').hide();
                $('#mob_ver_mobile_number').val('');
                $('#mob_ver_button').show();
                $('#mob_ver_enter_number').show();
                $('#mob_ver_message').hide();
            } else if (result[1] == "e3") {
                $('#reset_mob_ver_msg').html("Please wait " + result[2] + " minutes before requesting another code");
            } else if (result[1] == "s1") {
                $('#reset_mob_ver').hide();
                $('#mob_ver_mobile_number').val('');
                $('#mob_ver_button').show();
                $('#mob_ver_enter_number').show();
                $('#mob_ver_message').hide();
            } else if (result[1] == "s1") {
                $('#reset_mob_ver').html("Your mobile number has already been verified.");
            }
        });
    });

    var hide_advertising_lower_rates_message_cookie = $.cookie('hide_advertising_lower_rates_message'); console.log('hide_advertising_lower_rates_message_cookie:'+hide_advertising_lower_rates_message_cookie);
    if (hide_advertising_lower_rates_message_cookie != 1) {
        $('#advertising_lower_rates_message').show();
    }
    $("#hide_advertising_lower_rates_message").click(function () {
        $('#advertising_lower_rates_message').hide();
        $.cookie.raw = true;
        $.cookie('hide_advertising_lower_rates_message', 1, {
            expires: 3650,
            secure: true
        });
    });

    $("#free_play_captcha_types").change(function (event) {
        $('.free_play_captchas').hide();
        $('#free_play_captchas_' + $("#free_play_captcha_types").val()).show();
        $.cookie.raw = true;
        $.cookie('default_free_play_captcha', $("#free_play_captcha_types").val(), {
            expires: 3650,
            secure: true
        });
    });

    var default_free_play_captcha = $.cookie('default_free_play_captcha'); console.log('default_free_play_captcha:'+default_free_play_captcha);
    if (default_free_play_captcha === 'recaptcha_v2' || default_free_play_captcha === 'solvemedia') {
        $('#free_play_captcha_types').val(default_free_play_captcha).change();
    }

    $("#free_play_form").on('keydown', '[name="adcopy_response"]', function (e) {
        var keyCode = e.keyCode || e.which; console.log('keyCode:'+keyCode);
        if (keyCode == 13) {
            e.preventDefault();
            $('#free_play_form_button').focus();
        }
    });

    $("#hide_enable_2fa_msg_alert").click(function () {
        $('#enable_2fa_msg_alert').hide();
        $.cookie.raw = true;
        $.cookie('hide_enable_2fa_msg_alert', 1, {
            expires: 7,
            secure: true
        });
    });

    $("#hide_high_network_load_msg").click(function () {
        $('#high_network_load_msg').hide();
        $.cookie.raw = true;
        $.cookie('hide_high_network_load_msg', 1, {
            expires: 2,
            secure: true
        });
    });

    $("#hide_high_network_load_msg_short").click(function () {
        $('#high_network_load_msg_short').hide();
        $.cookie.raw = true;
        $.cookie('hide_high_network_load_msg_short', 1, {
            expires: 2,
            secure: true
        });
    });

    $("#hide_earn_btc_msg").click(function () {
        $('#earn_btc_msg').hide();
        $.cookie.raw = true;
        $.cookie('hide_earn_btc_msg', 1, {
            expires: 3650,
            secure: true
        });
    });

    $("#double_your_btc_tab").on('keydown', '#double_your_btc_stake', function (e) {
        var keyCode = e.keyCode || e.which; console.log('keyCode:'+keyCode);
        if (keyCode == 72) {
            e.preventDefault();
            if ($("#double_your_btc_bet_hi_button").is(":enabled")) {
                $("#double_your_btc_bet_hi_button").click();
            }
        } else if (keyCode == 76) {
            e.preventDefault();
            if ($("#double_your_btc_bet_lo_button").is(":enabled")) {
                $("#double_your_btc_bet_lo_button").click();
            }
        } else if (keyCode == 65) {
            e.preventDefault();
            if ($("#double_your_btc_stake").val() > 0.00000001) {
                $("#double_your_btc_half").click();
            }
        } else if (keyCode == 83) {
            e.preventDefault();
            $("#double_your_btc_2x").click();
        } else if (keyCode == 68) {
            e.preventDefault();
            $("#double_your_btc_min").click();
        } else if (keyCode == 70) {
            e.preventDefault();
            $("#double_your_btc_max").click();
        } else if (keyCode == 81) {
            e.preventDefault();
            $("#double_your_btc_payout_multiplier").val(parseFloat($("#double_your_btc_payout_multiplier").val()) + 1);
            $("#double_your_btc_payout_multiplier").keyup();
        } else if (keyCode == 87) {
            e.preventDefault();
            $("#double_your_btc_payout_multiplier").val(parseFloat($("#double_your_btc_payout_multiplier").val()) - 1);
            $("#double_your_btc_payout_multiplier").keyup();
        } else if (keyCode == 69) {
            e.preventDefault();
            $("#double_your_btc_payout_multiplier").val(parseFloat($("#double_your_btc_payout_multiplier").val()) + 5);
            $("#double_your_btc_payout_multiplier").keyup();
        } else if (keyCode == 82) {
            e.preventDefault();
            $("#double_your_btc_payout_multiplier").val(parseFloat($("#double_your_btc_payout_multiplier").val()) - 5);
            $("#double_your_btc_payout_multiplier").keyup();
        } else if (keyCode == 84) {
            e.preventDefault();
            $("#double_your_btc_payout_multiplier").val(parseFloat($("#double_your_btc_payout_multiplier").val()) + 10);
            $("#double_your_btc_payout_multiplier").keyup();
        } else if (keyCode == 89) {
            e.preventDefault();
            $("#double_your_btc_payout_multiplier").val(parseFloat($("#double_your_btc_payout_multiplier").val()) - 10);
            $("#double_your_btc_payout_multiplier").keyup();
        }
    });

    $("#lottery_tickets_purchase_count").keyup(function (event) {
        var lottery_tickets_purchase_count = parseInt($("#lottery_tickets_purchase_count").val()); console.log('lottery_tickets_purchase_count:'+lottery_tickets_purchase_count);
        var lottery_ticket_price = parseFloat($(".lottery_ticket_price").html()).toFixed(8); console.log('lottery_ticket_price:'+lottery_ticket_price);
        $("#lottery_total_purchase_price").html(parseFloat(lottery_tickets_purchase_count * lottery_ticket_price * 100000000 / 100000000).toFixed(8));
    });

    $("#lottery_tickets_purchase_count").keypress(function () {
        $("#lottery_tickets_purchase_count").keyup();
    });

    $("#lottery_tickets_purchase_count").keydown(function () {
        $("#lottery_tickets_purchase_count").keyup();
    });

    $("#purchase_lottery_tickets_button").click(function (event) {
        $("#purchase_lottery_tickets_button").attr("disabled", true);
        $.get('/?op=purchase_lott_tickets&num=' + $("#lottery_tickets_purchase_count").val(), function (data) {
            var result = data.split(":"); console.log('result:'+result);
            $('#lottery_tickets_purchase_message').html("");
            $('#lottery_tickets_purchase_message').show();
            $('#lottery_tickets_purchase_message').removeClass('free_play_result_error');
            $('#lottery_tickets_purchase_message').removeClass('free_play_result_success');
            if (result[0] == "e") {
                $('#lottery_tickets_purchase_message').addClass('free_play_result_error');
                $('#lottery_tickets_purchase_message').html(result[1]);
            }
            if (result[0] == "s") {
                $('#lottery_tickets_purchase_message').addClass('free_play_result_success');
                if (result[1] == "s1") {
                    var ticket_word = "tickets"; console.log('ticket_word:'+ticket_word);
                    if (parseInt(result[2]) == 1) {
                        ticket_word = "ticket";
                    }
                    $('#lottery_tickets_purchase_message').html("Successfully purchased " + result[2] + " " + ticket_word + " in lottery round " + result[5] + " for " + parseFloat(result[4] / 100000000).toFixed(8) + " BTC.");
                    $('#user_lottery_tickets').html(ReplaceNumberWithCommas(result[3]));
                    $('#balance').html(parseFloat(result[6] / 100000000).toFixed(8));
                    balanceChanged();
                }
            }
            $("#purchase_lottery_tickets_button").attr("disabled", false);
        });
    });

    var free_play_claim_amount = 0; console.log('free_play_claim_amount:'+free_play_claim_amount);
    $(window).scroll(function () {
        $('.fbtc_left_sky').css('top', $(this).scrollTop());
    });

    $("#free_play_claim_button").click(function (event) {
        window.location.href = 'https://freebitco.in/?op=home&free_play_claim=' + free_play_claim_amount;
    });

    $("#free_play_form_button").click(function (event) {
        event.preventDefault();
        $('#free_play_digits').show();
        $('.free_play_element').hide();
        $('#verify_mobile_message').hide();
        $('#verify_mobile_message_email').hide();
        console.log('fingerprint:'+fingerprint+'|fingerprint2:'+fingerprint2+'|intervalID:'+intervalID+'|client_seed:'+client_seed+'|post_variables:'+post_variables+'|posting'+posting);
        var fingerprint = $.fingerprint();
        var fingerprint2 = new Fingerprint({
            canvas: true,
            screen_resolution: true,
            ie_activex: true
        }).get();
        var intervalID = setInterval(function () {
            $("#free_play_first_digit").html(Math.floor(Math.random() * 10));
            $("#free_play_second_digit").html(Math.floor(Math.random() * 10));
            $("#free_play_third_digit").html(Math.floor(Math.random() * 10));
            $("#free_play_fourth_digit").html(Math.floor(Math.random() * 10));
            $("#free_play_fifth_digit").html(Math.floor(Math.random() * 10));
        }, 1);
        $("#free_play_form_button").attr("disabled", true);
        $("html, body").animate({
            scrollTop: $("#free_play_digits").offset().top - 50
        }, "fast");
        var client_seed = $('#next_client_seed').val(); console.log('client_seed:'+client_seed);
        var $form = $('#free_play_form'); console.log('$form:'+$form+'|op:'+op+'|token:'+token+'|g_recaptcha_response:'+g_recaptcha_response+'|adcopy_challenge:'+adcopy_challenge+'|adcopy_response:'+adcopy_response+'|csrf_token2:'+csrf_token2+'|url:'+url);
        var op = $form.find('[name="op"]').val()
        var token = $form.find('[name="' + token_name + '"]').val()
        var g_recaptcha_response = $form.find('#g-recaptcha-response').val() || grecaptcha.getResponse()
        var adcopy_challenge = $form.find('[name="adcopy_challenge"]').val()
        var adcopy_response = $form.find('[name="adcopy_response"]').val()
        var csrf_token2 = $.cookie('csrf_token')
        var url = '/';
        var post_variables = {
            op: op,
            fingerprint: fingerprint,
            client_seed: client_seed,
            adcopy_challenge: adcopy_challenge,
            adcopy_response: adcopy_response,
            fingerprint2: fingerprint2,
            g_recaptcha_response: g_recaptcha_response
        };
        post_variables[token_name] = token;
        post_variables[tcGiQefA] = window[tcGiQefA];
        var posting = $.post(url, post_variables);
        posting.done(function (data) {
            var result = data.split(":"); console.log('result:'+result);
            $('#free_play_error').html("");
            $('#free_play_error').hide();
            clearInterval(intervalID);
            $("#free_play_first_digit").html(0);
            $("#free_play_second_digit").html(0);
            $("#free_play_third_digit").html(0);
            $("#free_play_fourth_digit").html(0);
            $("#free_play_fifth_digit").html(0);
            if (result[0] == "e2") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#free_play_error').html("Incorrect captcha entered");
                ACPuzzle.reload();
                grecaptcha.reset();
            } else if (result[0] == "e3") {
                $('#free_play_digits').hide();
                $('.free_play_element').hide();
                $('#wait').show();
                $('#same_ip_error').show();
                $('#verify_mobile_message').insertAfter("#same_ip_error");
                $('#verify_mobile_message').show();
                $('#same_ip_error').html('Someone has already played from this IP address within the last 1 hour.');
                $('#time_remaining').countdown({
                    until: +result[1],
                    format: 'MS'
                });
                setTimeout(function () {
                    RefreshPageAfterFreePlayTimerEnds();
                }, parseInt(result[1]) * 1000);
                title_countdown(parseInt(result[1]));
            } else if (result[0] == "e4") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#free_play_error').html("Session Expired. <a href='https://freebitco.in/?op=home'>Please click here to reload the page</a>");
            } else if (result[0] == "e8") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#verify_mobile_message').show();
                $('#free_play_error').html("Sorry, this IP address has been blocked. If you are using a proxy or anonymization service, please turn it off before playing.");
                ACPuzzle.reload();
                grecaptcha.reset();
            } else if (result[0] == "e9") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#free_play_error').html("Client Seed cannot be empty.<BR>Please enter one by clicking on the PROVABLY FAIR link above.");
                ACPuzzle.reload();
                grecaptcha.reset();
            } else if (result[0] == "e10") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#verify_mobile_message_email').show();
                $('#free_play_error').html("You have an invalid email address attached to your account. You need to change it to a valid one by clicking on PROFILE before you can play.");
                ACPuzzle.reload();
                grecaptcha.reset();
            } else if (result[0] == "e11") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#free_play_error').html("This website is completely supported by revenue from ads, which is used to buy bitcoins to distribute to users like you.<BR>By blocking ads on our website, you are cutting off our only source of revenue and this will seriously affect our ability to continue distributing bitcoins to our users.<BR>Please disable your ad-blocking browser plugin/software for this page and then <a href='http://freebitco.in/?op=home'>click here</a> to refresh the page and collect your free bitcoins");
                ACPuzzle.reload();
                grecaptcha.reset();
            } else if (result[0] == "e15") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#free_play_error').html("Sorry, this IP address has been blocked from playing the FREE PLAY game. You may continue to use the rest of the website as normal.");
            } else if (result[0] == "e16") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#free_play_error').html("Sorry, this IP address has been blocked. If you are using a proxy, VPN or anonymization service, please turn it off before claiming free bitcoins.");
            } else if (result[0] == "e17") {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#free_play_error').html("You need to verify your email before you can play the FREE BTC game. We have sent an email with a verification link to " + result[1] + " <BR><BR>If you cannot see this email after 15 minutes, please check your SPAM folder. If it isn't there as well, please add noreply\@freebitco.in to your address book and then request another email after 15 minutes.<BR><BR>If you are experiencing problems with verifying your email, please let us know using the contact form in the FAQ page.");
                ACPuzzle.reload();
                grecaptcha.reset();
            } else if (result[0] == "s1") {
                var number = result[1]; console.log('number:'+number+'|single_digit:'+single_digit+'|remaining:'+remaining);
                var single_digit = number.split("");
                if (number.toString().length < 5) {
                    var remaining = 5 - number.toString().length;
                    for (var i = 0; i < remaining; i++) {
                        single_digit.unshift('0');
                    }
                }
                $("#free_play_first_digit").html(single_digit[0]);
                $("#free_play_second_digit").html(single_digit[1]);
                $("#free_play_third_digit").html(single_digit[2]);
                $("#free_play_fourth_digit").html(single_digit[3]);
                $("#free_play_fifth_digit").html(single_digit[4]);
                $.cookie.raw = true;
                $.cookie('last_play', result[4], {
                    expires: 3650,
                    secure: true
                });
                $.removeCookie('ivp7GpJPvMtG');
                $('.free_play_element').hide();
                $('#free_play_result').show();
                $('#wait').show();
                $('#balance').html(result[2]);
                balanceChanged();
                $('#time_remaining').countdown({
                    until: +3600,
                    format: 'MS'
                });
                setTimeout(function () {
                    RefreshPageAfterFreePlayTimerEnds();
                }, 3600 * 1000);
                title_countdown(3600); console.log('free_play_claim_amount:'+free_play_claim_amount);
                free_play_claim_amount = parseFloat(Math.round(result[3] * 100000000) / 100000000).toFixed(8);
                $('#winnings').html(free_play_claim_amount);
                $('#balance_usd').html(result[5]);
                $('#next_server_seed_hash').val(result[6]);
                $('#next_nonce').html(result[8]);
                $('.previous_server_seed').html(result[9]);
                $('#previous_server_seed_hash').val(result[10]);
                $('.previous_client_seed').html(result[11]);
                $('.previous_nonce').html(result[12]);
                $('#previous_roll').html(result[1]);
                $('#no_previous_rolls_msg').hide();
                $('#previous_rolls_table').show();
                $('#previous_roll_strings').show();
                $("#verify_rolls_link").attr("href", "https://s3.amazonaws.com/roll-verifier/verify.html?server_seed=" + result[9] + "&client_seed=" + result[11] + "&server_seed_hash=" + result[10] + "&nonce=" + result[12]);
                $('#user_lottery_tickets').html(ReplaceNumberWithCommas(result[13]));
                $('.user_reward_points').html(ReplaceNumberWithCommas(result[14]));
                $('#fp_lottery_tickets_won').html(result[15]);
                $('#fp_reward_points_won').html(result[16]);
                $('#fp_multiplier_bonus').html(result[17]);
                $('#fp_bonus_req_completed').html(result[18]);
                if (parseInt(result[1]) > 9997) {
                    var fp_win_amt = 20; console.log('fp_win_amt:'+fp_win_amt);
                    if (parseInt(result[1]) > 9999) {
                        fp_win_amt = 200;
                    }
                    $('#make_extra_5_msg').show();
                    $('#fp_forum_msg').html('[b]I just won $' + fp_win_amt + ' at FreeBitco.in![/b]&#13;&#10;&#13;&#10;My user id is ' + socket_userid + '.&#13;&#10;&#13;&#10;My winning seeds: ' + "https://s3.amazonaws.com/roll-verifier/verify.html?server_seed=" + result[9] + "&client_seed=" + result[11] + "&server_seed_hash=" + result[10] + "&nonce=" + result[12]);
                }
                setTimeout(function () {
                    $('.show_multiply_modal').click();
                }, 2000);
            } else {
                $('#free_play_digits').hide();
                $('.free_play_element').show();
                $('#free_play_error').show();
                $('#free_play_error').html("Unexpected error. Please let us know about this at support@freebitco.in with the following error code: " + result[0]);
                ACPuzzle.reload();
                grecaptcha.reset();
            }
            $("#free_play_form_button").attr("disabled", false);
        });
    });

    var lottery_winners_start = 1; console.log('lottery_winners_start:'+lottery_winners_start+'|lottery_show_older:'+lottery_show_older+'|lottery_show_newer:'+lottery_show_newer);
    var lottery_show_older = 0;
    var lottery_show_newer = 0;
    $("#older_lottery_winners_link").click(function () {
        lottery_show_older = 1;
    });

    $("#newer_lottery_winners_link").click(function () {
        lottery_show_newer = 1;
    });

    $(".browse_lottery_winners_link").click(function () {
        if (lottery_show_older == 1) {
            lottery_winners_start = lottery_winners_start + 1;
        } else if (lottery_show_newer == 1) {
            lottery_winners_start = lottery_winners_start - 1;
        }
        if (lottery_winners_start >= latest_lottery_round - 1) {
            lottery_winners_start = latest_lottery_round - 1;
        }
        if (lottery_show_older == 1 && lottery_winners_start < 1) {
            lottery_winners_start = 1;
        }
        $("#older_lottery_winners_link").attr("disabled", true);
        $("#newer_lottery_winners_link").attr("disabled", true);
        $.get('/?op=show_lottery_results&start=' + lottery_winners_start, function (data) {
            if (parseInt(data.round) > 0) {
                $("#previous_lottery_winners_list_div").html("");
                var mobile_class = ""; console.log('mobile_class:'+mobile_class);
                if (mobile_device == 1) {
                    mobile_class = " lottery_table_mobile_style ";
                }
                $("#previous_lottery_winners_list_div").html('<div class="large-12 small-12 columns center lottery_winner_table_box table_header_background br_5_5"><div class="center" style="margin:auto;">LOTTERY ROUND ' + data.round + '</div></div><div class="large-12 small-12 columns center lottery_winner_table_box"><div class="center" style="margin:auto; font-weight:bold;">TOTAL TICKETS: ' + data.total_tickets + '</div></div><div class="large-12 small-12 columns center lottery_winner_table_box_container effect2"><div class="font_bold large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_first_last_cell' + mobile_class + '">#</div><div class="font_bold large-3 small-3 columns center lottery_winner_table_box lottery_winner_table_second_cell' + mobile_class + '">USER ID</div><div class="font_bold large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_third_cell' + mobile_class + '">AMOUNT WON</div><div class="font_bold large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_first_last_cell' + mobile_class + '">USER TICKETS</div></div>');
                for (var i = 0; i < data.winners.length; i++) {
                    $("#previous_lottery_winners_list_div").append('<div class="large-12 small-12 columns center lottery_winner_table_box_container effect2"><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_first_last_cell' + mobile_class + '">' + data.winners[i].rank + '</div><div class="large-3 small-3 columns center lottery_winner_table_box lottery_winner_table_second_cell' + mobile_class + '">' + data.winners[i].userid + '</div><div class="large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_third_cell' + mobile_class + '">' + data.winners[i].amount + ' BTC</div><div class="large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_first_last_cell' + mobile_class + '">' + data.winners[i].tickets_purchased + '</div> </div>');
                }
            }
            lottery_show_older = 0;
            lottery_show_newer = 0;
            $("#older_lottery_winners_link").attr("disabled", false);
            $("#newer_lottery_winners_link").attr("disabled", false);
        });
    });

    $("#newer_lottery_winners_link").click();
    $('.top-bar-section ul.right li').click(function () {
        $('.top-bar').removeClass('expanded');
    });

    $("#set_email_preferences").click(function () {
        $("#set_email_preferences").attr("disabled", true); console.log('subs_arr:'+subs_arr);
        var subs_arr = $('.email_subs_checkbox:checkbox:checked').map(function () {
            return this.value;
        }).get().toString();
        $.get('/?op=set_email_subscriptions&subs=' + subs_arr, function (data) {
            $("#set_email_preferences").attr("disabled", false);
            DisplaySEMessage('s', 'Succesfully updated email subscriptions');
        });
    });

    $("#double_your_btc_payout_multiplier").keyup(function () {
        if (parseFloat($("#double_your_btc_payout_multiplier").val()) < 1.01 && parseFloat($("#double_your_btc_payout_multiplier").val()) != 1) {
            $("#double_your_btc_payout_multiplier").val(1.01);
        } else if (parseFloat($("#double_your_btc_payout_multiplier").val()) > 4750.00) {
            $("#double_your_btc_payout_multiplier").val(4750.00);
        }
        CalculateWinAmount();
        $("#double_your_btc_win_chance").val((parseFloat(parseInt($(".lt").html()) / 10000 * 100).toFixed(2)) + "%");
    });

    $("#double_your_btc_win_chance").keyup(function () {
        if (parseFloat($("#double_your_btc_win_chance").val()) > 94.06) {
            $("#double_your_btc_win_chance").val(94.06 + "%");
        } else if (parseFloat($("#double_your_btc_win_chance").val()) < 0.02 && parseFloat($("#double_your_btc_win_chance").val()) != 0) {
            $("#double_your_btc_win_chance").val(0.02 + "%");
        }
        $("#double_your_btc_payout_multiplier").val(parseFloat(95 / parseFloat($("#double_your_btc_win_chance").val())).toFixed(2));
        CalculateWinAmount();
    });

    $("#double_your_btc_payout_multiplier").change(function () {
        $("#double_your_btc_payout_multiplier").val(parseFloat(9500 / parseInt($(".lt").html())).toFixed(2));
    });

    $("#double_your_btc_win_chance").change(function () {
        $("#double_your_btc_win_chance").val((parseFloat(parseInt($(".lt").html()) / 10000 * 100).toFixed(2)) + "%");
    });

    $("#double_your_btc_win_chance").focus(function () {
        $("#win_chance_value_message").show();
    });

    $("#double_your_btc_win_chance").focusout(function () {
        $("#win_chance_value_message").hide();
    });

    $("#double_your_btc_payout_multiplier").focus(function () {
        $("#payout_value_message").show();
    });

    $("#double_your_btc_payout_multiplier").focusout(function () {
        $("#payout_value_message").hide();
    });

    $('#login_form').hide();
    /*var int_page_captchas = $("#int_page_captchas").detach();int_page_captchas.appendTo('#signup_page_captchas');*/
    $('body').on('click', '.login_menu_button', function () {
        $('#signup_form').hide();
        $('#homepage_login_button').hide();
        $('#homepage_signup_button').show();
        $('#login_form').fadeIn();
        /*int_page_captchas.appendTo('#login_page_captchas');*/
    });

    $('body').on('click', '.signup_menu_button', function () {
        $('#login_form').hide();
        $('#homepage_login_button').show();
        $('#homepage_signup_button').hide();
        $('#signup_form').fadeIn();
        /*int_page_captchas.appendTo('#signup_page_captchas');*/
    });

    $("#link_features").click(function () {
        $('html, body').animate({
            scrollTop: $("#features").offset().top - 40
        }, 800);
    });

    $("#link_home, .login_menu_button, .signup_menu_button").click(function () {
        $('html, body').animate({
            scrollTop: $("#new_home").offset().top - 40
        }, 800);
    });

    $("#link_bitcoin").click(function () {
        $('html, body').animate({
            scrollTop: $("#home_bitcoin").offset().top - 40
        }, 800);
    });

    $("#link_news").click(function () {
        $('html, body').animate({
            scrollTop: $("#home_news").offset().top - 40
        }, 800);
    });

    var have_account_cookie = $.cookie('have_account');
    if (have_account_cookie == 1) {
        $(".login_menu_button").click();
    }
    if (document.createElement("input").placeholder == undefined) {
        $(".form_placeholders").show();
    }
    $("#user_ads_unselect_all_countries").click(function (event) {
        $("#user_ads_target_country_code option").prop("selected", false);
    });

    $("#ad_details_unselect_all_countries").click(function (event) {
        $("#ad_details_target_country_code option").prop("selected", false);
    });

    $(".ad_position_checkbox").click(function (event) {
        $(".ad_position_checkbox").prop("checked", false);
        $(".ad_position_checkbox:checkbox[value=" + this.value + "]").prop("checked", true);
    });

    $("#autobet_bet_odds").focus(function () {
        $("#autobet_payout_value_message").show();
    });

    $("#autobet_bet_odds").focusout(function () {
        $("#autobet_payout_value_message").hide();
    });

    var auto_to_manual = 0;
    $('#auto_bet_on').click(function () {
        $('#double_your_btc_result').hide();
        $('#double_your_btc_left_section').hide();
        $('#double_your_btc_auto_bet_left_section').show();
        $('#double_your_btc_right_section').hide();
        $('#double_your_btc_auto_bet_right_section').show();
        $('.manual_bet_element').hide();
        $('.auto_bet_element').show();
        $("#double_your_btc_middle_section").css({
            'height': 'auto',
            'padding-bottom': '6px'
        });
        $(this).addClass('betting_mode_on');
        $(this).removeClass('manual_auto_bet_on_button');
        $('#manual_bet_on').removeClass('betting_mode_on');
        $('#manual_bet_on').addClass('manual_auto_bet_on_button');
        $('#multiplier_first_digit').html('0');
        $('#multiplier_second_digit').html('0');
        $('#multiplier_third_digit').html('0');
        $('#multiplier_fourth_digit').html('0');
        $('#multiplier_fifth_digit').html('0');
        $('#multiplier_enable_sound_div').hide();
        auto_to_manual = 1;
    });

    $('#manual_bet_on').click(function () {
        if (autobet_running === true) {
            $('#auto_bet_running').show();
        } else {
            if (auto_to_manual === 1 && $('body').innerWidth() > 1255) {
                auto_to_manual = 0;
                $("#double_your_btc_middle_section").css({
                    'border-radius': '0'
                });
            }
            $('#autobet_results_box').hide();
            $('#double_your_btc_result').hide();
            $('#double_your_btc_auto_bet_left_section').hide();
            $('#double_your_btc_left_section').show();
            $('#double_your_btc_auto_bet_right_section').hide();
            $('#double_your_btc_right_section').show();
            $('.auto_bet_element').hide();
            $('.manual_bet_element').show();
            $("#double_your_btc_middle_section").css({
                'height': '362.781px'
            });
            $(this).addClass('betting_mode_on');
            $(this).removeClass('manual_auto_bet_on_button');
            $('#auto_bet_on').removeClass('betting_mode_on');
            $('#auto_bet_on').addClass('manual_auto_bet_on_button');
            $('#multiplier_first_digit').html('0');
            $('#multiplier_second_digit').html('0');
            $('#multiplier_third_digit').html('0');
            $('#multiplier_fourth_digit').html('0');
            $('#multiplier_fifth_digit').html('0');
            $('#multiplier_enable_sound_div').show();
            $("#autobet_error").hide();
        }
    });

    $('#close_auto_bet_running_message').click(function () {
        $('#auto_bet_running').hide();
    });

    $('#show_double_your_btc_auto_bet_on_lose').click(function () {
        $(this).addClass('multiplier_header_background');
        $('#show_double_your_btc_auto_bet_on_win').removeClass('multiplier_header_background');
        $('#double_your_btc_auto_bet_on_win').hide();
        $('#double_your_btc_auto_bet_on_lose').show();
    });

    $('#show_double_your_btc_auto_bet_on_win').click(function () {
        $(this).addClass('multiplier_header_background');
        $('#show_double_your_btc_auto_bet_on_lose').removeClass('multiplier_header_background');
        $('#double_your_btc_auto_bet_on_lose').hide();
        $('#double_your_btc_auto_bet_on_win').show();
    });

    $('#manual_bet_on').click();
    $("#home_news").find(".news_content:first").show();
    $("#news_tab").find(".inside_news_content:first").show();
    $('#newer_bet_history').click(function () {
        bet_history_page--;
        if (bet_history_page < 0) {
            bet_history_page = 0;
        }
        GetBetHistory(bet_history_page);
    });

    $('#older_bet_history').click(function () {
        bet_history_page++;
        if (bet_history_page < 0) {
            bet_history_page = 0;
        }
        GetBetHistory(bet_history_page);
    });

    $('#show_roll_history_mobile').click(function () {
        $('#bet_history_table').toggle();
    });

    $("#signup_page_captcha_types").change(function () {
        $('.signup_page_captcha').hide();
        $('#' + $("#signup_page_captcha_types").val() + '_captcha').show();
    });

    GetRPPrizes();
    $(".reward_point_redeem_result_box_close").click(function () {
        $('#reward_point_redeem_result_container_div').hide();
    });

    $("#encash_points_number").keyup(function (event) {
        var encash_points_number = parseInt($("#encash_points_number").val()); console.log('encash_points_number:'+encash_points_number+'|lottery_ticket_price:'+lottery_ticket_price);
        var lottery_ticket_price = parseFloat($(".lottery_ticket_price").html()).toFixed(8);
        $("#reward_points_redeem_price").html(parseFloat(encash_points_number * lottery_ticket_price * 100000000 / 100000000).toFixed(8));
    });

    $("#encash_points_number").keypress(function () {
        $("#encash_points_number").keyup();
    });

    $("#encash_points_number").keydown(function () {
        $("#encash_points_number").keyup();
    });

    $(".reward_category_name").click(function () {
        if ($(this).find('.toggle_down_up').prop('className').split(' ').indexOf("fa-arrow-down") > -1) {
            $(this).find('.toggle_down_up').remove();
            $(this).append('<i class="toggle_down_up fa fa-arrow-up" style="float:right; color: #fff;" aria-hidden="true"></i>');
        } else if ($(this).find('.toggle_down_up').prop('className').split(' ').indexOf("fa-arrow-up") > -1) {
            $(this).find('.toggle_down_up').remove();
            $(this).append('<i class="toggle_down_up fa fa-arrow-down" style="float:right; color: #fff;" aria-hidden="true"></i>');
        }
        $(this).next(".reward_category_details").slideToggle("200");
        $(this).next(".profile_change_box").slideToggle("200");
    });

    $('#disable_lottery_checkbox').click(function () {
        var val = 0; console.log('val:'+val);
        if ($("#disable_lottery_checkbox").is(":checked")) {
            val = 1;
        }
        $.get('/?op=toggle_lottery&value=' + val, function (data) {
            var result = data.split(":"); console.log('result:'+result);
            DisplaySEMessage(result[0], result[1]);
        });
    });

    $('#disable_interest_checkbox').click(function () {
        var val = 0; console.log('val:'+val);
        if ($("#disable_interest_checkbox").is(":checked")) {
            val = 1;
        }
        $.get('/?op=toggle_interest&value=' + val, function (data) {
            var result = data.split(":"); console.log('result:'+result);
            DisplaySEMessage(result[0], result[1]);
        });
    });

    $("#enable_2fa_0").click(function () {
        $.get('/?op=confirm_email', function (data) {
            var result = data.split(":"); console.log('result:'+result);
            var custom_timeout = 0; console.log('custom_timeout:'+custom_timeout);
            if (result[2] == "s2") {
                $("#enable_2fa_0").parent("div").hide();
                $("#enable_2fa_2").parent("div").show();
            }
            if (result[0] == "s") {
                custom_timeout = 30000;
            }
            DisplaySEMessage(result[0], result[1], custom_timeout);
        });
    });

    $("#enable_2fa_2").click(function () {
        $.get('/?op=enable_2fa&func=show', function (data) {
            var result = data.split(":"); console.log('result:'+result);
            if (result[0] == "s") {
                $("#enable_2fa_2").parent("div").hide();
                $("#show_2fa_secret").show();
                var totp = "otpauth://totp/" + result[2] + "%3Fsecret%3D" + result[3]; console.log('totp:'+totp);
                $("#2fa_secret").html("<p><img src='https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=200x200&chld=M|0&cht=qr&chl=" + totp + "'></p><p style='height: 45px; margin-right: auto; margin-left: auto; width: 300px; border-radius: 3px;'><span class='secret_key_background left'>Secret Key </span><span class='left bold' style='width: 180px; padding: 10px; border: 1px solid #ccc; border-left: none; border-radius: 0 3px 3px 0;'>" + result[3] + "</span></p>");
            } else {
                DisplaySEMessage(result[0], result[1]);
            }
        });
    });

    $("#activate_2fa").click(function () {
        var posting = $.post('/', {
            op: 'enable_2fa',
            func: 'enable',
            code: $("#activate_2fa_code").val(),
            phone: $("#tfa_recovery_phone").val()
        }); console.log('posting:'+posting);
        posting.done(function (data) {
            var result = data.split(":"); console.log('result:'+result);
            DisplaySEMessage(result[0], result[1]);
            if (result[0] == "s") {
                $("#activate_2fa").parent("div").hide();
                $("#disable_2fa").parent("div").show();
                $(".profile_2fa_field").show();
                $("html, body").animate({
                    scrollTop: $("#2fa_profile_box").offset().top - 45
                }, "fast");
                $('#enable_2fa_msg_alert').hide();
            }
        });
    });

    $("#disable_2fa").click(function () {
        var posting = $.post('/', {
            op: 'enable_2fa',
            func: 'disable',
            code: $("#disable_2fa_code").val()
        }); console.log('posting:'+posting);
        posting.done(function (data) {
            var result = data.split(":"); console.log('result:'+result);
            DisplaySEMessage(result[0], result[1]);
            if (result[0] == "s") {
                $("#enable_2fa_0").parent("div").show();
                $(".profile_2fa_field").hide();
                $("#disable_2fa").parent("div").hide();
            }
        });
    });

    $("#submit_2fa_recovery_details").click(function () {
        var posting = $.post('/', {
            op: 'change_2fa_phone',
            code: $("#rp_tfa_code").val(),
            phone: $("#rp_phone_number").val()
        }); console.log('posting:'+posting);
        posting.done(function (data) {
            var result = data.split(":"); console.log('result:'+result);
            DisplaySEMessage(result[0], result[1]);
        });
    });

    $(".tfa_enter_recovery_phone_link").click(function () {
        SwitchPageTabs('edit');
        $("html, body").animate({
            scrollTop: $("#2fa_recovery_phone_box").offset().top - 45
        }, "fast");
        $("#2fa_recovery_phone_box").click();
    });

    $("#share_button").click(function () {
        var amount = $('#share_amount').val(); console.log('amount:'+amount);
        var conf = confirm("If you click OK, then " + amount + " BTC will be deducted from your account and distributed among your referrals. If you do not wish to do this, please click CANCEL");
        if (conf == true) {
            $("#share_button").attr("disabled", true);
            var method = 0; console.log('method:'+method);
            if ($("#equal_share").is(":checked")) {
                method = 1;
            }
            if ($("#weighted_share").is(":checked")) {
                method = 2;
            }
            if ($("#last_payout_share").is(":checked")) {
                method = 3;
            }
            $.get('/?op=share_coins&method=' + method + '&amount=' + amount, function (data) {
                var result = data.split(":"); console.log('result:'+result);
                if (result[0] == "e") {
                    DisplaySEMessage(result[0], result[1]);
                } else if (result[0] == "s") {
                    var share_amount = parseFloat(parseInt(result[2]) / 100000000).toFixed(8); console.log('share_amount:'+share_amount);
                    $('#balance').html(parseFloat(parseInt(result[1]) / 100000000).toFixed(8));
                    balanceChanged();
                    $('#share_given').html(result[4]);
                    $('#recent_share_given').html(result[5]);
                    DisplaySEMessage(result[0], share_amount + " BTC shared with " + result[3] + " referrals");
                }
                $("#share_button").attr("disabled", false);
            });
        }
    });

    $("#claim_bonus_button").click(function () {
        if ($("#accept_bonus_terms").is(":checked")) {
            $.get('/?op=credit_deposit_bonus&amount=' + $("#claim_bonus_amount").val(), function (data) {
                var result = data.split(":"); console.log('result:'+result);
                if (result[0] == "e") {
                    DisplaySEMessage(result[0], result[1]);
                } else if (result[0] == "s") {
                    $('#bonus_account_table').show();
                    $('#bonus_account_balance').html(result[1] + " BTC");
                    $('#bonus_account_wager').html(result[2] + " BTC");
                    $('#balance').html(result[3]);
                    balanceChanged();
                    $('#bonus_eligible_msg').hide();
                    DisplaySEMessage(result[0], result[4]);
                    $("#myModal24").foundation('reveal', 'close');
                    bonus_table_closed = 0;
                }
            });
        } else {
            DisplaySEMessage("e", "Please read and agree to the terms below");
        }
    });

    $("#earn_btc_acc_balance").keyup(function (event) {
        var acc_bal = parseInt($("#earn_btc_acc_balance").val() * 100000000); console.log('acc_bal:'+acc_bal);
        if (acc_bal > 29000) {
            $("#earn_btc_daily_interest").html(parseFloat((Math.floor(acc_bal * 0.0109589 / 100)) / 100000000).toFixed(8));
            $("#earn_btc_monthly_interest").html(parseFloat((Math.floor(acc_bal * 0.32928995 / 100)) / 100000000).toFixed(8));
            $("#earn_btc_yearly_interest").html(parseFloat((Math.floor(acc_bal * 4.08050588 / 100)) / 100000000).toFixed(8));
        } else {
            $("#earn_btc_daily_interest").html("0");
            $("#earn_btc_monthly_interest").html("0");
            $("#earn_btc_yearly_interest").html("0");
        }
    });

    $("#earn_btc_acc_balance").keypress(function () {
        $("#earn_btc_acc_balance").keyup();
    });

    $("#earn_btc_acc_balance").keydown(function () {
        $("#earn_btc_acc_balance").keyup();
    });

    $("#earn_btc_acc_balance").val($('#balance').html());
    $("#earn_btc_acc_balance").keyup();
    $.get('/?op=get_interest_history', function (data) {
        if (data.length > 0) {
            var mobile_class = ""; console.log('mobile_class:'+mobile_class);
            if (mobile_device == 1) {
                mobile_class = " lottery_table_mobile_style ";
            }
            for (var i = 0; i < data.length; i++) {
                $("#interest_history_table").append('<div class="large-12 small-12 columns center lottery_winner_table_box_container effect2"><div class="large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_first_last_cell' + mobile_class + '">' + data[i].date + '</div><div class="large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_third_cell' + mobile_class + '">' + data[i].balance + '</div><div class="large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_first_last_cell' + mobile_class + '">' + data[i].interest + '</div> </div>');
            }
            $("#interest_history_table_row").show();
        }
    });

    $("#hide_pending_payouts_table").click(function () {
        hide_pending_payments = 1;
        $('#pending_payouts_table_new').hide();
    });

    $("#hide_pending_deposits_table").click(function () {
        hide_pending_deposits = 1;
        $('#unconfirmed_deposits_table').hide();
    });

    $("#claim_bonus_link").click(function () {
        if (max_deposit_bonus > parseFloat(min_bonus_amount)) {
            $('.dep_bonus_max').html(max_deposit_bonus + " BTC");
            if (max_deposit_bonus > parseFloat($('#balance').html())) {
                $('.dep_bonus_max').val($('#balance').html());
            } else {
                $('.dep_bonus_max').val(max_deposit_bonus);
            }
        }
        $('#balance2').html($('#balance').html());
    });
});

function BetErrors(code) {
  if (code == 'e1') {
    $('#double_your_btc_error').html('Insufficient balance to make this bet');
  }
  if (code == 'e2') {
    $('#double_your_btc_error').html('Bet amount cannot be less than 0.00000001 BTC');
  }
  if (code == 'e3') {
    $('#double_your_btc_error').html('Bet amount cannot be empty');
  }
  if (code == 'e4') {
    $('#double_your_btc_error').html('Invalid bet method');
  }
  if (code == 'e5') {
    $('#double_your_btc_error').html('Bet amount cannot be more than ' + max_win_amount + ' BTC');
  }
  if (code == 'e6') {
    $('#double_your_btc_error').html('Unexpected error. Please log out and then log back in');
  }
  if (code == 'e7') {
    $('#double_your_btc_error').html('Payout multiplier has to be between 2x and 4750x');
  }
  if (code == 'e8') {
    $('#double_your_btc_error').html('Win amount cannot be more than ' + max_win_amount + ' BTC');
  }
  if (code == 'e9') {
    $('#double_your_btc_error').html('Your balance is insufficient to make this bet and try to win the jackpot<BR>Please un-select the jackpot bet option and try again');
  }
  if (code == 'e10') {
    $('#double_your_btc_error').html('Client Seed is either empty or has invalid characters (only letters and numbers allowed).<BR>Please correct it by clicking on the PROVABLY FAIR link above.');
  }
  if (code == 'e11') {
    $('#double_your_btc_error').html('Please wait for your previous bet to finish rolling.');
  }
  if (code == 'e12') {
    $('#double_your_btc_error').html('Betting is disabled in your country.');
  }
}

function DoubleYourBTC(mode) {
  $('#double_your_btc_digits').show();
  var intervalID = setInterval(function() {
    $('#multiplier_first_digit').html(Math.floor(Math.random() * 10));
    $('#multiplier_second_digit').html(Math.floor(Math.random() * 10));
    $('#multiplier_third_digit').html(Math.floor(Math.random() * 10));
    $('#multiplier_fourth_digit').html(Math.floor(Math.random() * 10));
    $('#multiplier_fifth_digit').html(Math.floor(Math.random() * 10));
  }, 1); console.log('intervalID:'+intervalID);
  $('#double_your_btc_bet_hi_button').attr('disabled', true);
  $('#double_your_btc_bet_lo_button').attr('disabled', true);
  var bet = $('#double_your_btc_stake').val(); console.log('bet:'+bet);
  var jackpot = 0; console.log('jackpot:'+jackpot);
  var jackpot_arr = $('.play_jackpot:checkbox:checked').map(function() {
    return this.value;
  }).get(); console.log('jackpot_arr:'+jackpot_arr);
  if (jackpot_arr.length > 0) {
    jackpot = jackpot_arr.toString();
  }
  var client_seed = $('#next_client_seed').val(); console.log('client_seed:'+client_seed);
  $.get('/cgi-bin/bet.pl?m=' + mode + '&client_seed=' + client_seed + '&jackpot=' + jackpot + '&stake=' + bet + '&multiplier=' + $('#double_your_btc_payout_multiplier').val() + '&rand=' + Math.random(), function(data) {
    var result = data.split(':'); console.log('result:'+result);
    $('#double_your_btc_error').html('');
    $('#double_your_btc_error').hide();
    $('#double_your_btc_stake').removeClass('input-error');
    $('#double_your_btc_bet_win').html('');
    $('#double_your_btc_bet_lose').html('');
    $('#double_your_btc_bet_win').hide();
    $('#double_your_btc_bet_lose').hide();
    $('#jackpot_message').removeClass('green');
    $('#jackpot_message').removeClass('red');
    $('#jackpot_message').html('');
    $('#jackpot_message').hide();
    $('#double_your_btc_result').show();
    if (result[0] == 's1') {
      var number = result[2]; console.log('number:'+number);
      var single_digit = number.split(''); console.log('single_digit:'+single_digit);
      if (number.toString().length < 5) {
        var remaining = 5 - number.toString().length; console.log('single_digit:'+single_digit);
        for (var i = 0; i < remaining; i++) {
          single_digit.unshift('0');
        }
      }
      clearInterval(intervalID);
      $('#multiplier_first_digit').html(single_digit[0]);
      $('#multiplier_second_digit').html(single_digit[1]);
      $('#multiplier_third_digit').html(single_digit[2]);
      $('#multiplier_fourth_digit').html(single_digit[3]);
      $('#multiplier_fifth_digit').html(single_digit[4]);
      $('#balance').html(result[3]);
      max_deposit_bonus = parseFloat(result[18]).toFixed(8); console.log('max_deposit_bonus:'+max_deposit_bonus);
      balanceChanged();
      $('#balance_usd').html(result[5]);
      $('#next_server_seed_hash').val(result[6]);
      $('#next_nonce').html(result[8]);
      $('.previous_server_seed').html(result[9]);
      $('.previous_server_seed').val(result[9]);
      $('#previous_server_seed_hash').val(result[10]);
      $('.previous_client_seed').html(result[11]);
      $('.previous_client_seed').val(result[11]);
      $('.previous_nonce').html(result[12]);
      $('#previous_roll').html(result[2]);
      $('#no_previous_rolls_msg').hide();
      $('#previous_rolls_table').show();
      $('#previous_roll_strings').show();
      $('#bonus_account_balance').html(result[16] + ' BTC');
      $('#bonus_account_wager').html(result[17] + ' BTC');
      if ((parseFloat(result[16]) <= 0 || parseFloat(result[17]) <= 0) && bonus_table_closed == 0) {
        setTimeout(function() {
          $('#bonus_account_table').hide();
          bonus_table_closed = 1;
        }, 5000);
      }
      if (max_deposit_bonus >= parseFloat(min_bonus_amount) && bonus_table_closed == 1) {
        $('#bonus_eligible_msg').show();
      }
      if (parseFloat(result[19]) > 0 && parseFloat(result[19]) < 100) {
        $('.multiply_max_bet').html(result[19] + ' BTC');
        $('.multiply_max_bet').val(result[19]);
        max_win_amount = parseFloat(result[19]);
      }
      $('#verify_rolls_link').attr('href', 'https://s3.amazonaws.com/roll-verifier/verify.html?server_seed=' + result[9] + '&client_seed=' + result[11] + '&server_seed_hash=' + result[10] + '&nonce=' + result[12]);
      var capsmode = mode.toUpperCase(); console.log('capsmode:'+capsmode);
      if (result[1] == 'w') {
        $('#double_your_btc_bet_win').show();
        $('#double_your_btc_bet_win').html('You BET ' + capsmode + ' so you win ' + result[4] + ' BTC!');
        if ($('#manual_enable_sounds').is(':checked')) {
          $.ionSound.play('bell_ring');
        }
      }
      if (result[1] == 'l') {
        $('#double_your_btc_bet_lose').show();
        $('#double_your_btc_bet_lose').html('You BET ' + capsmode + ' so you lose ' + result[4] + ' BTC');
        if ($('#manual_enable_sounds').is(':checked')) {
          $.ionSound.play('tap');
        }
      }
      if (jackpot != 0) {
        $('#jackpot_message').show();
        if (result[13] == '1') {
          $('#jackpot_message').addClass('green');
          $('#jackpot_message').html('Congratulations! You have won the jackpot of ' + result[15] + ' BTC');
        } else {
          $('#jackpot_message').addClass('red');
          $('#jackpot_message').html('Sorry, you did not win the jackpot.');
        }
      }
      $('#double_your_btc_bet_hi_button').attr('disabled', false);
      $('#double_your_btc_bet_lo_button').attr('disabled', false);
      insertIntoBetHistory(result[1], result[4], result[2], result[9], result[11], result[10], result[12], 'DICE', mode, jackpot, bet, $('#double_your_btc_payout_multiplier').val());
    } else {
      $('#double_your_btc_error').show();
      $('#double_your_btc_digits').hide();
      if (parseFloat(result[1]) > 0 && parseFloat(result[1]) < 100) {
        $('.multiply_max_bet').html(result[1] + ' BTC');
        $('.multiply_max_bet').val(result[1]);
        max_win_amount = parseFloat(result[1]);
      }
      BetErrors(result[0]);
      clearInterval(intervalID);
      $('#multiplier_first_digit').html(0);
      $('#multiplier_second_digit').html(0);
      $('#multiplier_third_digit').html(0);
      $('#multiplier_fourth_digit').html(0);
      $('#multiplier_fifth_digit').html(0);
      if (result[0] == 'e6') {
        $('#double_your_btc_bet_hi_button').attr('disabled', true);
        $('#double_your_btc_bet_lo_button').attr('disabled', true);
      } else {
        $('#double_your_btc_bet_hi_button').attr('disabled', false);
        $('#double_your_btc_bet_lo_button').attr('disabled', false);
      }
    }
  }).fail(function() {
    $('#double_your_btc_result').show();
    $('#double_your_btc_error').show();
    $('#double_your_btc_digits').hide();
    $('#double_your_btc_error').html('Request timed out. Please try again.');
    clearInterval(intervalID);
    $('#double_your_btc_bet_hi_button').attr('disabled', false);
    $('#double_your_btc_bet_lo_button').attr('disabled', false);
  });
}

function title_countdown(tot_time) {
  var countdown_end = (new Date() / 1000) + tot_time; console.log('countdown_end:'+countdown_end);
  setInterval(function() {
    if (tot_time < 1) {
      $('title').html('0m:0s - FreeBitco.in - Win free bitcoins every hour!');
      return;
    } else {
      tot_time = countdown_end - (new Date() / 1000) - 1; console.log('tot_time:'+tot_time);
      var mins = Math.floor(tot_time / 60); console.log('mins:'+mins);
      var secs = Math.floor(tot_time - (mins * 60)); console.log('secs:'+secs);
      $('title').html(mins + 'm:' + secs + 's - ' + 'FreeBitco.in - Win free bitcoins every hour!');
    }
  }, 1000);
}

function ShowMoreRefs(count) {
  var refs_shown = parseInt($('#referrals_shown').val(), 0); console.log('refs_shown:'+refs_shown);
  $.get('/?op=show_more_refs&start=' + refs_shown + '&count=' + count, function(data) {
    $('#referral_list_table').append(data);
    if (count == 10) {
      $('#referrals_shown').val(refs_shown + 10);
    } else if (count == 20) {
      $('#referrals_shown').val(refs_shown + 20);
    } else if (count == 9999999) {
      $('#show_more_refs_options').hide();
    }
  });
}

function ShowAdvancedStats(days) {
  $.get('/?op=show_advanced_stats&days=' + days, function(data) {
    $('#detailed_ref_stats_table').show();
    $('#detailed_ref_stats_table').find('tr:gt(0)').remove();
    $('#detailed_ref_stats_table').append(data);
  });
}

function SwitchTabs() {
  $('#top_leader_iframe').attr('src', $('#top_leader_iframe').attr('src'));
  $('#left_sky_iframe').attr('src', $('#left_sky_iframe').attr('src'));
  $('#right_sky_iframe').attr('src', $('#right_sky_iframe').attr('src'));
}

function GenerateDepositAddress() {
  $.get('/?op=generate_bitcoin_deposit_address', function(data) {
    $('#deposit_address').html('<p>Send bitcoins to the address below to top up your advertising account balance.</p><p><div style="width:400px;"><input type="text" size=40 style="text-align:center;" value="' + data + '" onClick="this.select();"></div></p>');
  });
}

function DeleteAdCampaign(id) {
  var conf = confirm('Are you sure you wish to delete this ad campaign? Deleting an ad campaign also deletes it\'s stats. If you wish to stop running this ad but want to retain it\'s stats, please pause it instead. Click OK if you would like to proceed with deleting this ad campaign else click CANCEL.'); console.log('conf:'+conf);
  if (conf == true) {
    $('#ad_campaign_' + id).hide();
    $('#ad_campaign_details_' + id).hide();
    $.get('/?op=delete_ad_campaign&id=' + id, function() {});
  }
}

function StartAdCampaign(id) {
  $('#start_pause_ad_campaign_icon_' + id).html('<a href="javascript:void(0);" onclick="PauseAdCampaign(' + id + ');"><img src="//static6.freebitco.in/images/pause3.png" border=0 alt="PAUSE"></a>');
  $('#ad_campaign_status_' + id).html('<span style="color:#006600;">RUNNING</span>');
  $.get('/?op=start_ad_campaign&id=' + id, function(data) {
    if (data == 'e2') {
      $('#ad_campaign_status_' + id).html('<span style="color:red;">REFILL ADVERTISING ACCOUNT</span>');
      $('#start_pause_ad_campaign_icon_' + id).html('');
    }
  });
}

function PauseAdCampaign(id) {
  $('#start_pause_ad_campaign_icon_' + id).html('<a href="javascript:void(0);" onclick="StartAdCampaign(' + id + ');"><img src="//static6.freebitco.in/images/start4.png" border=0 alt="START"></a>');
  $('#ad_campaign_status_' + id).html('<span style="color:red;">PAUSED</span>');
  $.get('/?op=pause_ad_campaign&id=' + id, function() {});
}

function ShowAdDetails(id) {
  $('#ad_details_table').hide();
  $('#edit_ad_error').hide();
  $('#edit_ad_success').hide();
  $.get('/?op=show_ad_details&id=' + id, function(data) {
    var result = data.split(':'); console.log('result:'+result);
    $('#ad_details_table').show();
    $('#ad_details_popup_campaign_name').val(result[0]);
    $('#ad_details_popup_banner_image').attr('src', '//fbtc-uab.freebitco.in/' + result[1]);
    $('#ad_details_popup_daily_budget').val(result[2]);
    $('#ad_details_popup_total_budget').val(result[3]);
    $('#ad_details_popup_destination_url').val(result[4]);
    $('#ad_details_popup_max_cpm').val(result[8]);
    $('#ad_details_popup_ad_id').val(id);
    $('#ad_details_popup_freq_cap').val(result[9]);
    var target_countries = result[10].split(','); console.log('target_countries:'+target_countries);
    if (result[5] == '1') {
      $('#ad_details_popup_adv_bit').prop('checked', true);
    } else {
      $('#ad_details_popup_adv_bit').prop('checked', false);
    }
    if (result[6] == '1') {
      $('#ad_details_popup_adv_doge').prop('checked', true);
    } else {
      $('#ad_details_popup_adv_doge').prop('checked', false);
    }
    var ad_position = result[7].split('_'); console.log('ad_position:'+ad_position);
    $('#ad_details_popup_ad_position').html(ad_position[0].charAt(0).toUpperCase() + ad_position[0].slice(1) + ' - ' + ad_position[1] + 'x' + ad_position[2]);
    $('#ad_details_target_country_code').val(target_countries);
  });
}

function ShowAdStats(id) {
  $('#daily_ad_stats_table').hide();
  $.get('/?op=show_daily_ad_stats&id=' + id, function(data) {
    var rows = data.split(';'); console.log('rows:'+rows);
    $('#daily_ad_stats_campaign_name').html(rows[0]);
    rows.shift();
    $('#daily_ad_stats_table').show();
    $('#daily_ad_stats_table').find('tr:gt(0)').remove();
    var last_but = rows.length - 1; console.log('last_but:'+last_but);
    for (var i = 0; i < last_but; i++) {
      var elements = rows[i].split(':'); console.log('elements:'+elements);
      $('#daily_ad_stats_table').append('<tr><td>' + elements[0] + '</td><td>' + commaSeparateNumber(elements[1]) + '</td><td>' + commaSeparateNumber(elements[2]) + '</td><td>' + elements[3] + '</td><td>' + elements[4] + '</td></tr>');
    }
    var totals = rows[last_but].split(':'); console.log('totals:'+totals);
    $('#daily_ad_stats_table').append('<tr><td class=bold>TOTAL</td><td>' + commaSeparateNumber(totals[0]) + '</td><td>' + commaSeparateNumber(totals[1]) + '</td><td>' + totals[2] + '</td><td>' + totals[3] + '</td></tr>');
  });
}

function RefreshAdBalance() {
  $.get('/?op=refresh_ad_balance', function(data) {
    $('#ad_balance').html(data);
  });
}

function UpdateAdStats() {
  $.get('/?op=update_ad_stats', function(data) {
    var rows = data.split(';'); console.log('rows:'+rows);
    for (var i = 0; i < rows.length; i++) {
      var elements = rows[i].split(':'); console.log('elements:'+elements);
      if (elements[1] < 2) {
        $('#ad_campaign_status_' + elements[0]).html('<span style=\'color:#FF6600;\'>PENDING APPROVAL</span>');
        $('#start_pause_ad_campaign_icon_' + elements[0]).html('');
      } else if (elements[1] == 2) {
        $('#ad_campaign_status_' + elements[0]).html('<span style=\'color:#006600;\'>APPROVED</span>');
        $('#start_pause_ad_campaign_icon_' + elements[0]).html('<a href=\'javascript:void(0);\' onclick=\'StartAdCampaign(' + elements[0] + ');\'><img src=\'//static6.freebitco.in/images/start4.png\' border=0 alt=\'START\'></a>');
      } else if (elements[1] == 3) {
        $('#ad_campaign_status_' + elements[0]).html('<span style=\'color:#006600;\'>RUNNING</span>');
        $('#start_pause_ad_campaign_icon_' + elements[0]).html('<a href=\'javascript:void(0);\' onclick=\'PauseAdCampaign(' + elements[0] + ');\'><img src=\'//static6.freebitco.in/images/pause3.png\' border=0 alt=\'PAUSE\'></a>');
      } else if (elements[1] == 4) {
        $('#ad_campaign_status_' + elements[0]).html('<span style=\'color:red;\'>PAUSED</span>');
        $('#start_pause_ad_campaign_icon_' + elements[0]).html('<a href=\'javascript:void(0);\' onclick=\'StartAdCampaign(' + elements[0] + ');\'><img src=\'//static6.freebitco.in/images/start4.png\' border=0 alt=\'START\'></a>');
      } else if (elements[1] == 5) {
        $('#ad_campaign_status_' + elements[0]).html('<span style=\'color:red;\'>REJECTED&nbsp;<a href=\'javascript:void(0);\' onclick=\'GetAdRejectedReason(' + elements[0] + ', ' + elements[5] + ');\'>?</a></span>');
        $('#start_pause_ad_campaign_icon_' + elements[0]).html('');
      } else if (elements[1] == 6) {
        $('#ad_campaign_status_' + elements[0]).html('<span style=\'color:red;\'>EXCEEDED DAILY BUDGET</span>');
        $('#start_pause_ad_campaign_icon_' + elements[0]).html('<a href=\'javascript:void(0);\' onclick=\'PauseAdCampaign(' + elements[0] + ');\'><img src=\'//static6.freebitco.in/images/pause3.png\' border=0 alt=\'PAUSE\'></a>');
      } else if (elements[1] == 7) {
        $('#ad_campaign_status_' + elements[0]).html('<span style=\'color:red;\'>EXCEEDED TOTAL BUDGET</span>');
        $('#start_pause_ad_campaign_icon_' + elements[0]).html('<a href=\'javascript:void(0);\' onclick=\'PauseAdCampaign(' + elements[0] + ');\'><img src=\'//static6.freebitco.in/images/pause3.png\' border=0 alt=\'PAUSE\'></a>');
      } else if (elements[1] == 8) {
        $('#ad_campaign_status_' + elements[0]).html('<span style=\'color:red;\'>REFILL ADVERTISING ACCOUNT</span>');
        $('#start_pause_ad_campaign_icon_' + elements[0]).html('');
      }
      $('#campaign_views_' + elements[0]).html(commaSeparateNumber(elements[2]));
      $('#campaign_clicks_' + elements[0]).html(commaSeparateNumber(elements[3]));
      $('#campaign_total_cost_' + elements[0]).html(elements[4]);
    }
  });
}

function commaSeparateNumber(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2'); console.log('val:'+val);
  }
  return val;
}

function AutoBet(mode, bet_count, max_bet, base_bet, autobet_win_return_to_base, autobet_lose_return_to_base, autobet_win_increase_bet_percent, autobet_lose_increase_bet_percent, change_client_seed, reset_after_max_bet, rolls_played, biggest_bet, biggest_win, session_pl, autobet_win_change_odds, autobet_lose_change_odds, stop_after_profit, stop_after_loss, logging, enable_sounds) {
  if (stop_autobet == true) {
    StopAutoBet();
    return;
  } else {
    $('#double_your_btc_digits').show();
    $('#autobet_results_box').show();
    $('#double_your_btc_bet_hi_button').attr('disabled', true);
    $('#double_your_btc_bet_lo_button').attr('disabled', true);
    var bet = parseFloat($('#double_your_btc_stake').val()).toFixed(8); console.log('bet:'+bet);
    if (parseFloat(bet) > parseFloat(biggest_bet)) {
      biggest_bet = bet;
    }
    autobet_win_increase_bet_percent = parseFloat(autobet_win_increase_bet_percent).toFixed(2);
    autobet_lose_increase_bet_percent = parseFloat(autobet_lose_increase_bet_percent).toFixed(2);
    var jackpot = 0; console.log('jackpot:'+jackpot);
    var jackpot_arr = $('.play_jackpot:checkbox:checked').map(function() {
      return this.value;
    }).get(); console.log('jackpot_arr:'+jackpot_arr);
    if (jackpot_arr.length > 0) {
      jackpot = jackpot_arr.toString();
    }
    var client_seed = $('#next_client_seed').val(); console.log('client_seed:'+client_seed);
    var new_mode = mode; console.log('new_mode:'+new_mode);
    if (mode == 'alternate') {
      if (bet_count % 2 == 0) {
        new_mode = 'hi';
      } else {
        new_mode = 'lo';
      }
    }
    $.get('/cgi-bin/bet.pl?m=' + new_mode + '&client_seed=' + client_seed + '&jackpot=' + jackpot + '&stake=' + bet + '&multiplier=' + $('#double_your_btc_payout_multiplier').val() + '&rand=' + Math.random(), function(data) {
      var result = data.split(':'); console.log('result:'+result);
      $('#double_your_btc_error').html('');
      $('#double_your_btc_error').hide();
      $('#double_your_btc_stake').removeClass('input-error');
      $('#double_your_btc_bet_win').html('');
      $('#double_your_btc_bet_lose').html('');
      $('#double_your_btc_bet_win').hide();
      $('#double_your_btc_bet_lose').hide();
      $('#jackpot_message').removeClass('green');
      $('#jackpot_message').removeClass('red');
      $('#jackpot_message').html('');
      $('#jackpot_message').hide();
      $('#double_your_btc_result').show();
      if (result[0] == 's1') {
        bet_count--;
        rolls_played++;
        $('#rolls_played_count').html(rolls_played);
        $('#rolls_remaining_count').html(bet_count);
        $('#autobet_highest_bet').html(biggest_bet + ' BTC');
        var number = result[2]; console.log('number:'+number);
        var single_digit = number.split(''); console.log('single_digit:'+single_digit);
        if (number.toString().length < 5) {
          var remaining = 5 - number.toString().length; console.log('remaining:'+remaining);
          for (var i = 0; i < remaining; i++) {
            single_digit.unshift('0');
          }
        }
        $('#multiplier_first_digit').html(single_digit[0]);
        $('#multiplier_second_digit').html(single_digit[1]);
        $('#multiplier_third_digit').html(single_digit[2]);
        $('#multiplier_fourth_digit').html(single_digit[3]);
        $('#multiplier_fifth_digit').html(single_digit[4]);
        $('#balance').html(result[3]);
        max_deposit_bonus = parseFloat(result[18]).toFixed(8);
        balanceChanged();
        $('#balance_usd').html(result[5]);
        $('#next_server_seed_hash').val(result[6]);
        $('#next_nonce').html(result[8]);
        $('.previous_server_seed').html(result[9]);
        $('.previous_server_seed').val(result[9]);
        $('#previous_server_seed_hash').val(result[10]);
        $('.previous_client_seed').html(result[11]);
        $('.previous_client_seed').val(result[11]);
        $('.previous_nonce').html(result[12]);
        $('#previous_roll').html(result[2]);
        $('#no_previous_rolls_msg').hide();
        $('#previous_rolls_table').show();
        $('#previous_roll_strings').show();
        $('#bonus_account_balance').html(result[16] + ' BTC');
        $('#bonus_account_wager').html(result[17] + ' BTC');
        if ((parseFloat(result[16]) <= 0 || parseFloat(result[17]) <= 0) && bonus_table_closed == 0) {
          setTimeout(function() {
            $('#bonus_account_table').hide();
            bonus_table_closed = 1;
          }, 5000);
        }
        if (max_deposit_bonus >= parseFloat(min_bonus_amount) && bonus_table_closed == 1) {
          $('#bonus_eligible_msg').show();
        }
        if (parseFloat(result[19]) > 0 && parseFloat(result[19]) < 100) {
          $('.multiply_max_bet').html(result[19] + ' BTC');
          $('.multiply_max_bet').val(result[19]);
          max_win_amount = parseFloat(result[19]);
        }
        $('#verify_rolls_link').attr('href', 'https://s3.amazonaws.com/roll-verifier/verify.html?server_seed=' + result[9] + '&client_seed=' + result[11] + '&server_seed_hash=' + result[10] + '&nonce=' + result[12]);
        insertIntoBetHistory(result[1], result[4], result[2], result[9], result[11], result[10], result[12], 'DICE', new_mode, jackpot, bet, $('#double_your_btc_payout_multiplier').val());
        var capsmode = new_mode.toUpperCase(); console.log('capsmode:'+capsmode);
        var bet_profit = ''; console.log('bet_profit:'+bet_profit);
        if (result[1] == 'w') {
          $('#double_your_btc_bet_win').show();
          $('#double_your_btc_bet_win').html('You BET ' + capsmode + ' so you win ' + result[4] + ' BTC!');
          bet_profit = '<font color=green>+' + result[4] + '</font>';
          session_pl = parseFloat(((session_pl * 100000000) + (result[4] * 100000000)) / 100000000).toFixed(8);
          if (autobet_win_return_to_base == 1) {
            $('#double_your_btc_stake').val(parseFloat(base_bet).toFixed(8));
          } else if (parseFloat(autobet_win_increase_bet_percent) != 0) {
            var new_bet_size = parseFloat((bet * ((autobet_win_increase_bet_percent / 100) + 1))).toFixed(8); console.log('new_bet_size:'+new_bet_size);
            $('#double_your_btc_stake').val(new_bet_size);
          }
          if (parseFloat(result[4]) > parseFloat(biggest_win)) {
            biggest_win = parseFloat(result[4]).toFixed(8);
          }
          $('#autobet_highest_win').html(biggest_win + ' BTC');
          if (autobet_win_change_odds != 0) {
            $('#double_your_btc_payout_multiplier').val(autobet_win_change_odds);
            $('#double_your_btc_payout_multiplier').keyup();
          }
          if (enable_sounds === 1) {
            $.ionSound.play('bell_ring');
          }
        }
        if (result[1] == 'l') {
          $('#double_your_btc_bet_lose').show();
          $('#double_your_btc_bet_lose').html('You BET ' + capsmode + ' so you lose ' + result[4] + ' BTC');
          bet_profit = '<font color=red>-' + result[4] + '</font>';
          session_pl = parseFloat(((session_pl * 100000000) - (result[4] * 100000000)) / 100000000).toFixed(8);
          if (autobet_lose_return_to_base == 1) {
            $('#double_your_btc_stake').val(parseFloat(base_bet).toFixed(8));
          } else if (autobet_lose_increase_bet_percent != 0) {
            var new_bet_size = parseFloat((bet * ((autobet_lose_increase_bet_percent / 100) + 1))).toFixed(8); console.log('new_bet_size:'+new_bet_size);
            $('#double_your_btc_stake').val(new_bet_size);
          }
          if (autobet_lose_change_odds != 0) {
            $('#double_your_btc_payout_multiplier').val(autobet_lose_change_odds);
            $('#double_your_btc_payout_multiplier').keyup();
          }
          if (enable_sounds === 1) {
            $.ionSound.play('tap');
          }
        } /*if (logging === 1){var currentdate = new Date();var curtime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();autobet_history[rolls_played-1] = {'time': curtime, 'multiplier': $("#double_your_btc_payout_multiplier").val(),'stake': bet,'bet': capsmode,'roll': single_digit[0]+single_digit[1]+single_digit[2]+single_digit[3]+single_digit[4],'profit': bet_profit,'verify': "<a href='https://s3.amazonaws.com/roll-verifier/verify.html?server_seed="+result[9]+"&client_seed="+result[11]+"&server_seed_hash="+result[10]+"&nonce="+result[12]+"' target=_blank>CLICK</a>"};}*/

        if (jackpot != 0) {
          $('#jackpot_message').show();
          if (result[13] == '1') {
            $('#jackpot_message').addClass('green');
            $('#jackpot_message').html('Congratulations! You have won the jackpot of ' + result[15] + ' BTC');
          } else {
            $('#jackpot_message').addClass('red');
            $('#jackpot_message').html('Sorry, you did not win the jackpot.');
          }
        }
        $('#double_your_btc_bet_hi_button').attr('disabled', false);
        $('#double_your_btc_bet_lo_button').attr('disabled', false);
        $('#autobet_pl').removeClass();
        $('#autobet_pl').addClass('bold');
        if (parseFloat(session_pl) < 0) {
          $('#autobet_pl').css({
            'background-color': '#FF6666'
          });
        } else {
          $('#autobet_pl').css({
            'background-color': '#33FF33'
          });
        }
        $('#autobet_pl').html(session_pl + ' BTC');
        if (bet_count > 0) {
          bet = parseFloat($('#double_your_btc_stake').val()).toFixed(8);
          if (parseFloat(bet) > parseFloat(max_bet) || parseFloat(bet * ($('#double_your_btc_payout_multiplier').val() - 1)) > parseFloat(max_win_amount)) {
            if (reset_after_max_bet == 1) {
              $('#double_your_btc_stake').val(parseFloat(base_bet).toFixed(8));
            } else {
              stop_autobet = true;
            }
          }
          if (change_client_seed == 1) {
            charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var randomString = ''; console.log('randomString:'+randomString);
            for (var i = 0; i < 16; i++) {
              var randomPoz = Math.floor(Math.random() * charSet.length); console.log('randomPoz:'+randomPoz);
              randomString += charSet.substring(randomPoz, randomPoz + 1);
            }
            $('#next_client_seed').val(randomString);
          }
          if ((parseFloat(stop_after_profit) > 0 && parseFloat(session_pl) >= parseFloat(stop_after_profit)) || (parseFloat(stop_after_loss) > 0 && parseFloat(session_pl) <= -1 * parseFloat(stop_after_loss))) {
            stop_autobet = true;
          }
          AutoBet(mode, bet_count, max_bet, base_bet, autobet_win_return_to_base, autobet_lose_return_to_base, autobet_win_increase_bet_percent, autobet_lose_increase_bet_percent, change_client_seed, reset_after_max_bet, rolls_played, biggest_bet, biggest_win, session_pl, autobet_win_change_odds, autobet_lose_change_odds, stop_after_profit, stop_after_loss, logging, enable_sounds);
        } else {
          StopAutoBet();
        }
      } else {
        $('#double_your_btc_error').show();
        $('#double_your_btc_digits').hide();
        if (parseFloat(result[1]) > 0 && parseFloat(result[1]) < 100) {
          $('.multiply_max_bet').html(result[1] + ' BTC');
          $('.multiply_max_bet').val(result[1]);
          max_win_amount = parseFloat(result[1]);
        }
        BetErrors(result[0]);
        StopAutoBet();
        if (result[0] == 'e6') {
          $('#double_your_btc_bet_hi_button').attr('disabled', true);
          $('#double_your_btc_bet_lo_button').attr('disabled', true);
        } else {
          $('#double_your_btc_bet_hi_button').attr('disabled', false);
          $('#double_your_btc_bet_lo_button').attr('disabled', false);
        }
      }
    }).fail(function() {
      AutoBet(mode, bet_count, max_bet, base_bet, autobet_win_return_to_base, autobet_lose_return_to_base, autobet_win_increase_bet_percent, autobet_lose_increase_bet_percent, change_client_seed, reset_after_max_bet, rolls_played, biggest_bet, biggest_win, session_pl, autobet_win_change_odds, autobet_lose_change_odds, stop_after_profit, stop_after_loss, logging);
    });
  }
}

function RefreshPageAfterFreePlayTimerEnds() {
  if (autobet_dnr == false || (autobet_dnr == true && autobet_running == false)) {
    if (free_play_sound == true) {
      $.ionSound.play('jump_up');
    }
    window.location.replace('http://freebitco.in/?op=home');
  }
}

function StopAutoBet() {
  $('#double_your_btc_stake').val('0.00000001');
  $('#double_your_btc_payout_multiplier').val(2);
  $('#double_your_btc_payout_multiplier').keyup();
  $('.play_jackpot').prop('checked', false);
  $('#auto_betting_button').show();
  $('#stop_auto_betting').hide();
  stop_autobet = false;
  autobet_running = false;
  autobet_dnr = false;
  $('#start_autobet').removeClass('close-reveal-modal');
}

function GenerateMainDepositAddress() {
  $.get('/?op=generate_main_bitcoin_deposit_address', function(data) {
    var result = data.split(':'); console.log('result:'+result);
    DisplaySEMessage(result[0], result[1]);
    if (result[0] == 's') {
      $('#main_deposit_address_box').show();
      $('#main_deposit_address_qr_code').show();
      $('#main_deposit_address_qr_code').html('<img src="//chart.googleapis.com/chart?cht=qr&chs=200x200&chl=' + result[2] + '&chld=H|0">');
      $('#main_deposit_address').val(result[2]);
      $('#generate_new_address_msg').hide();
    }
  });
}

function myDecisionFunction() {
  if (submissionEnabled) {
    submissionEnabled = false;
    return true;
  } else {
    return false;
  }
}

function GetAdRejectedReason(ad_id, reject_code) {
  var common = 'Ad Rejection Reason: '; console.log('common:'+common);
  if (reject_code == 1) {
    alert(common + 'Banner is too distracting.');
  } else if (reject_code == 2) {
    alert(common + 'Banner or website contains 18+ content.');
  } else if (reject_code == 3) {
    alert(common + 'Destination URL is invalid or does not load.');
  } else if (reject_code == 4) {
    $.get('/?op=banner_reject_reason&id=' + ad_id, function(data) {
      alert(common + data);
    });
  }
}

function UpdateLotteryStats() {
  var socket = io('wsnew.freebitco.in/fbtc_lottery_stats', {
    autoConnect: true,
    reconnectionDelayMax: 60000,
    port: 443,
    query: 'userid=' + socket_userid + '&password=' + socket_password
  }); console.log('socket:'+socket);
  socket.on('fbtc_lottery_stats', function(data) {
    if (data.fbtc_current_lottery_round > 0) {
      $('.current_lottery_round').html(ReplaceNumberWithCommas(parseInt(data.fbtc_current_lottery_round)));
    }
    if (data.fbtc_lottery_prize_amount >= 0) {
      $('.lottery_first_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 512 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_second_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 256 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_third_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 128 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_fourth_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 64 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_fifth_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 32 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_sixth_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 16 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_seventh_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 8 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_eighth_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 4 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_ninth_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 2 * 0.000977517 / 100000000).toFixed(8)));
      $('.lottery_tenth_prize').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_lottery_prize_amount * 1 * 0.000977517 / 100000000).toFixed(8)));
    }
    if (data.fbtc_total_lottery_tickets >= 0) {
      $('#total_lottery_tickets').html(ReplaceNumberWithCommas(data.fbtc_total_lottery_tickets));
      var user_lottery_tickets = parseInt($('#user_lottery_tickets').html().replace(/\,/g, '')); console.log('user_lottery_tickets:'+user_lottery_tickets);
      if (user_lottery_tickets >= 0) {
        $('#lottery_win_chance').html(ReplaceNumberWithCommas(parseFloat(((1 - Math.pow(((data.fbtc_total_lottery_tickets - user_lottery_tickets) / data.fbtc_total_lottery_tickets), 10)) * 100) * 100000000 / 100000000).toFixed(8)));
      } else {
        $('#lottery_win_chance').html('0.00000000');
      }
    }
    if (data.fbtc_lottery_ticket_price > 0) {
      $('.lottery_ticket_price').html(parseFloat(data.fbtc_lottery_ticket_price / 100000000).toFixed(8));
    }
    if (data.fbtc_current_lottery_round_end > 0) {
      var lottery_timer_end = $('#lottery_round_end').countdown('option', 'until'); console.log('lottery_timer_end:'+lottery_timer_end);
      var d = new Date(); console.log('d:'+d);
      var curtime = parseInt(d.getTime() / 1000); console.log('curtime:'+curtime);
      var lottery_end_time = curtime + parseInt(lottery_timer_end); console.log('lottery_end_time:'+lottery_end_time);
      if (data.fbtc_current_lottery_round_end - lottery_end_time > 29 || lottery_end_time - data.fbtc_current_lottery_round_end > 29) {
        $('#lottery_round_end').countdown('destroy');
        $('#lottery_round_end').countdown({
          until: '+' + parseInt(data.fbtc_current_lottery_round_end) - curtime,
          format: 'DHMS'
        });
      }
    }
  });
}

function UpdateStats() {
  var socket = io('wsnew.freebitco.in/fbtc_stats', {
    autoConnect: true,
    reconnectionDelayMax: 60000,
    port: 443,
    query: 'userid=' + socket_userid + '&password=' + socket_password
  }); console.log('socket:'+socket);
  socket.on('fbtc_stats', function(data) {
    if (data.fbtc_total_btc_won_number > 0) {
      $('#total_btc_won_number').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_total_btc_won_number * 100000000 / 100000000).toFixed(8)) + ' BTC');
      $('#total_btc_won_number_signup_page').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_total_btc_won_number * 100000000 / 100000000).toFixed(8)));
    }
    if (data.fbtc_total_plays_number > 0) {
      $('#total_plays_number').html(ReplaceNumberWithCommas(data.fbtc_total_plays_number));
    }
    if (data.fbtc_total_signups_number > 0) {
      $('#total_signups_number').html(ReplaceNumberWithCommas(data.fbtc_total_signups_number));
    }
    if (data.fbtc_total_wagered_number > 0) {
      $('#total_wagered_number').html(ReplaceNumberWithCommas(parseFloat(data.fbtc_total_wagered_number * 100000000 / 100000000).toFixed(8)) + ' BTC');
    }
    if (data.fbtc_btc_price > 0) {
      $('#btc_usd_price').html(ReplaceNumberWithCommas('$' + parseFloat(data.fbtc_btc_price * 100 / 100).toFixed(2)));
    }
  });
}

function UpdateUserStats() {
  var socket2 = io('wsnew.freebitco.in/fbtc_user_stats', {
    autoConnect: true,
    reconnectionDelayMax: 60000,
    port: 443,
    query: 'userid=' + socket_userid + '&password=' + socket_password
  }); console.log('socket2:'+socket2);
  socket2.on('connect', function() { /*setInterval(function (){socket2.emit('request_user_stats', { userid: socket_userid, password: socket_password });}, request_us_int*1000);*/
    socket2.on('fbtc_user_stats_' + socket_userid, function(data) {
      if (data.balance > 0) {
        if ((Math.floor(Date.now() / 1000)) - balance_last_changed > 2) {
          $('#balance').html(parseFloat(data.balance / 100000000).toFixed(8));
          balanceChanged();
        }
      }
      if (data.lottery_tickets >= 0) {
        $('#user_lottery_tickets').html(ReplaceNumberWithCommas(data.lottery_tickets));
      }
      if (data.reward_points >= 0) {
        $('.user_reward_points').html(ReplaceNumberWithCommas(data.reward_points));
      }
      if (data.unconf_tx.length > 0 && hide_pending_deposits == 0) {
        $('#unconfirmed_deposits_table').show();
        $('#unconfirmed_deposits_table_rows').html('');
        var mobile_class = ''; console.log('mobile_class:'+mobile_class);
        if (mobile_device == 1) {
          mobile_class = 'lottery_table_mobile_style';
        }
        for (var i = 0; i < data.unconf_tx.length; i++) {
          var tx_hash = data.unconf_tx[i].tx_hash.substring(0, 12) + '...' + data.unconf_tx[i].tx_hash.substring(data.unconf_tx[i].tx_hash.length - 12); console.log('tx_hash:'+tx_hash);
          if (mobile_device == 1) {
            tx_hash = data.unconf_tx[i].tx_hash.substring(0, 10) + '...' + data.unconf_tx[i].tx_hash.substring(data.unconf_tx[i].tx_hash.length - 10);
          }
          var amount = parseFloat(data.unconf_tx[i].amount / 100000000).toFixed(8); console.log('amount:'+amount);
          $('#unconfirmed_deposits_table_rows').append('<div class="large-12 small-12 columns center lottery_winner_table_box_container effect2"><div class="large-8 small-8 columns center lottery_winner_table_box lottery_winner_table_first_last_cell ' + mobile_class + '"><a href="https://www.blocktrail.com/BTC/tx/' + data.unconf_tx[i].tx_hash + '" target=_blank>' + tx_hash + '</a></div><div class="large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_first_last_cell ' + mobile_class + '">' + amount + '</div></div></div>');
        }
      } else {
        $('#unconfirmed_deposits_table').hide();
      }
      var show_payout_table = 0; console.log('show_payout_table:'+show_payout_table);
      if (data.instant_payment_requests.length > 0 && hide_pending_payments == 0) {
        show_payout_table = 1;
        $('#instant_pending_payout_table').show();
        $('#instant_pending_payout_table').html('');
        var mobile_class = ''; console.log('mobile_class:'+mobile_class);
        if (mobile_device == 1) {
          mobile_class = 'lottery_table_mobile_style';
        }
        $('#instant_pending_payout_table').append('<div class="large-12 small-12 columns center lottery_winner_table_box"><div class="center bold" style="margin:auto;">INSTANT</div></div>');
        for (var i = 0; i < data.instant_payment_requests.length; i++) {
          var amount = parseFloat(data.instant_payment_requests[i].amount / 100000000).toFixed(8);console.log('amount:'+amount);
          var btc_address = data.instant_payment_requests[i].btc_address;console.log('btc_address:'+btc_address);
          if (mobile_device == 1) {
            btc_address = data.instant_payment_requests[i].btc_address.substring(0, 10) + '...' + data.instant_payment_requests[i].btc_address.substring(data.instant_payment_requests[i].btc_address.length - 10);
          }
          $('#instant_pending_payout_table').append('<div class="large-12 small-12 columns center lottery_winner_table_box_container effect2"><div class="large-8 small-8 columns center lottery_winner_table_box lottery_winner_table_first_last_cell ' + mobile_class + '"><a href="https://www.blocktrail.com/BTC/address/' + data.instant_payment_requests[i].btc_address + '" target=_blank>' + btc_address + '</a></div><div class="large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_first_last_cell ' + mobile_class + '">' + amount + '</div></div>');
        }
      } else {
        $('#instant_pending_payout_table').hide();
      }
      if (data.manual_payment_requests.length > 0 && hide_pending_payments == 0) {
        show_payout_table = 1;
        $('#pending_payout_table').show();
        $('#pending_payout_table').html('');
        var mobile_class = '';console.log('mobile_class:'+mobile_class);
        if (mobile_device == 1) {
          mobile_class = 'lottery_table_mobile_style';
        }
        $('#pending_payout_table').append('<div class="large-12 small-12 columns center lottery_winner_table_box"><div class="center bold" style="margin:auto;">SLOW</div></div>');
        for (var i = 0; i < data.manual_payment_requests.length; i++) {
          var amount = parseFloat(data.manual_payment_requests[i].amount / 100000000).toFixed(8); console.log('amount:'+amount);
          var btc_address = data.manual_payment_requests[i].btc_address; console.log('btc_address:'+btc_address);
          if (mobile_device == 1) {
            btc_address = data.manual_payment_requests[i].btc_address.substring(0, 10) + '...' + data.manual_payment_requests[i].btc_address.substring(data.manual_payment_requests[i].btc_address.length - 10);
          }
          $('#pending_payout_table').append('<div class="large-12 small-12 columns center lottery_winner_table_box_container effect2"><div class="large-8 small-8 columns center lottery_winner_table_box lottery_winner_table_first_last_cell ' + mobile_class + '"><a href="https://www.blocktrail.com/BTC/address/' + data.manual_payment_requests[i].btc_address + '" target=_blank>' + btc_address + '</a></div><div class="large-4 small-4 columns center lottery_winner_table_box lottery_winner_table_first_last_cell ' + mobile_class + '">' + amount + '</div></div>');
        }
      } else {
        $('#pending_payout_table').hide();
      }
      if (show_payout_table == 1) {
        $('#pending_payouts_table_new').show();
      } else {
        $('#pending_payouts_table_new').hide();
      }
    });
  });
}

function ReplaceNumberWithCommas(yourNumber) {
  var n = yourNumber.toString().split('.'); console.log('n:'+n);
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return n.join('.');
}

function CalculateWinAmount() {
  $('.gt').html(parseInt(Math.round(10000 - (9500 / parseFloat($('#double_your_btc_payout_multiplier').val()).toFixed(2)))));
  $('.lt').html(parseInt(Math.round((9500 / parseFloat($('#double_your_btc_payout_multiplier').val()).toFixed(2))))); 
  /*var win_amount = 0;if ($( "#double_your_btc_stake" ).val()*100000000 > 999){win_amount = Math.round(($( "#double_your_btc_stake" ).val()*((parseFloat(9500/parseInt($( ".lt" ).html())).toFixed(2)) - 1))*100000000);}else{win_amount = Math.floor(($( "#double_your_btc_stake" ).val()*((parseFloat(9500/parseInt($( ".lt" ).html())).toFixed(2)) - 1))*100000000);}*/
  var win_amount = Math.floor(($('#double_your_btc_stake').val() * ((parseFloat(9500 / parseInt($('.lt').html())).toFixed(2)) - 1)) * 100000000 + 0.000001); console.log('win_amount:'+win_amount);
  $('#win_amount').html(parseFloat(win_amount / 100000000).toFixed(8));
}

function AutoBetErrors(code) {
  $('#autobet_error').show();
  $('#double_your_btc_result').hide();
  $('#double_your_btc_middle_section').css({
    'border-radius': '0 0 10px 10px'
  });
  if (code == 'e1') {
    $('#autobet_error').html('Base bet has to be between 0.00000001 and ' + max_win_amount + ' BTC');
  }
  if (code == 'e2') {
    $('#autobet_error').html('Bet odds has to be an integer between 1.01 and 4750');
  }
  if (code == 'e3') {
    $('#autobet_error').html('Max bet has to be between 0.00000001 and ' + max_win_amount + ' BTC');
  }
  if (code == 'e4') {
    $('#autobet_error').html('Bet count has to be atleast 1');
  }
  if (code == 'e5') {
    $('#autobet_error').html('Bet odds after win has to be an integer between 1.01 and 4750');
  }
  if (code == 'e6') {
    $('#autobet_error').html('Bet odds after lose has to be an integer between 1.01 and 4750');
  }
  if (code == 'e7') {
    $('#autobet_error').html('Stop after profit value must be greater than 0');
  }
  if (code == 'e8') {
    $('#autobet_error').html('Stop after loss value must be greater than 0');
  }
}

function ScreeSizeCSSChanges() {
  if ($('body').innerWidth() < 1256) {
    $('#double_your_btc_middle_section').appendTo($('#double_your_btc_main_container_outer'));
    $('#double_your_btc_middle_section').css({
      'border-radius': '0 0 10px 10px'
    });
  }
  if ($('body').innerWidth() > 1100) {
    $('.change_size_css').addClass('large-7');
    $('.change_size_css').removeClass('large-10 large-12');
  }
  if ($('body').innerWidth() < 1256 && $('body').innerWidth() > 970) {
    $('#double_your_btc_main_container').addClass('double_your_btc_main_container_to_add');
    $('#double_your_btc_main_container').removeClass('double_your_btc_main_container_remove double_your_btc_main_container_to_add_small');
    $('#double_your_btc_left_section').addClass('double_your_btc_left_section_to_add');
    $('#double_your_btc_left_section').removeClass('double_your_btc_left_section_remove double_your_btc_left_section_to_add_small');
    $('#double_your_btc_middle_section').addClass('double_your_btc_middle_section_to_add');
    $('#double_your_btc_middle_section').removeClass('double_your_btc_middle_section_remove double_your_btc_middle_section_to_add_small');
    $('#double_your_btc_right_section').addClass('double_your_btc_right_section_to_add');
    $('#double_your_btc_right_section').removeClass('double_your_btc_right_section_remove double_your_btc_right_section_to_add_small');
    $('#double_your_btc_auto_bet_left_section').addClass('double_your_btc_left_section_to_add');
    $('#double_your_btc_auto_bet_left_section').removeClass('double_your_btc_left_section_remove double_your_btc_left_section_to_add_small');
    $('#double_your_btc_auto_bet_right_section').addClass('double_your_btc_auto_bet_right_section_to_add');
    $('#double_your_btc_auto_bet_right_section').removeClass('double_your_btc_auto_bet_right_section_remove double_your_btc_auto_bet_right_section_to_add_small');
    $('#bet_hi_button').addClass('bet_hi_button_to_add');
    $('#bet_hi_button').removeClass('bet_hi_button_remove bet_hi_button_to_add_small');
    $('#bet_lo_button').addClass('bet_lo_button_to_add');
    $('#bet_lo_button').removeClass('bet_lo_button_remove bet_lo_button_to_add_small');
  }
  if ($('body').innerWidth() < 1100 && $('body').innerWidth() > 970) {
    $('.change_size_css').addClass('large-10');
    $('.change_size_css').removeClass('large-7 large-12');
  }
  if ($('body').innerWidth() < 971) {
    $('#double_your_btc_main_container').addClass('double_your_btc_main_container_to_add_small');
    $('#double_your_btc_main_container').removeClass('double_your_btc_main_container_remove double_your_btc_main_container_to_add');
    $('#double_your_btc_left_section').addClass('double_your_btc_left_section_to_add_small');
    $('#double_your_btc_left_section').removeClass('double_your_btc_left_section_remove double_your_btc_left_section_to_add');
    $('#double_your_btc_middle_section').addClass('double_your_btc_middle_section_to_add_small');
    $('#double_your_btc_middle_section').removeClass('double_your_btc_middle_section_remove double_your_btc_middle_section_to_add');
    $('#double_your_btc_right_section').addClass('double_your_btc_right_section_to_add_small');
    $('#double_your_btc_right_section').removeClass('double_your_btc_right_section_remove double_your_btc_right_section_to_add');
    $('#double_your_btc_auto_bet_left_section').addClass('double_your_btc_left_section_to_add_small');
    $('#double_your_btc_auto_bet_left_section').removeClass('double_your_btc_left_section_remove double_your_btc_left_section_to_add');
    $('#double_your_btc_auto_bet_right_section').addClass('double_your_btc_auto_bet_right_section_to_add_small');
    $('#double_your_btc_auto_bet_right_section').removeClass('double_your_btc_auto_bet_right_section_remove double_your_btc_auto_bet_right_section_to_add');
    $('#bet_hi_button').addClass('bet_hi_button_to_add_small');
    $('#bet_hi_button').removeClass('bet_hi_button_remove bet_hi_button_to_add');
    $('#bet_lo_button').addClass('bet_lo_button_to_add_small');
    $('#bet_lo_button').removeClass('bet_lo_button_remove bet_lo_button_to_add'); /*$( "#main_content" ).addClass('large-8');$( "#main_content" ).removeClass('large-9 push-3');$( "#main_content_ad_left" ).addClass('large-4');$( "#main_content_ad_left" ).removeClass('large-3 pull-9');if (ad_left == 1){$( "#main_content" ).addClass('push-4');$( "#main_content_ad_left" ).addClass('pull-8');}*/
    $('.change_size_css').addClass('large-12');
    $('.change_size_css').removeClass('large-7 large-10');
  }
}

function ShowNews(id) {
  $('#news_content_' + id).show();
}

function GetNewsContent(location, id, pos) {
  $.get('/?op=get_news_content&id=' + id, function(data) {
    $('#news_content_' + id).remove();
    $(pos).parent().after('<div class="large-11 small-12 large-centered columns ' + location + 'news_content" style="text-align:left;" id="news_content_' + id + '">' + data + '</div>');
  });
}

function GetBetHistory(page) {
  if (page >= 0) {
    bet_history_page = page;
    $('#newer_bet_history').attr('disabled', true);
    $('#older_bet_history').attr('disabled', true);
    $.get('/?op=get_bet_history&page=' + page, function(data) {
      $('#bet_history_table_rows').html('');
      var result1 = data.split(';'); console.log('result1:'+result1);
      for (var i = result1.length - 2; i >= 0; i--) {
        var result2 = result1[i].split(':'); console.log('result2:'+result2);
        result2[0] = result2[0].replace(/\./g, ':');
        var time = formatDate(result2[0] + ' MST'); console.log('time:'+time);
        if (result2[10] == 'm') {
          result2[10] = 'DICE'
        } else if (result2[10] == 'f') {
          result2[10] = 'FREE'
        } else if (result2[10] == 'r') {
          result2[10] = 'ROULETTE'
        }
        var outcome = 'l'; console.log('outcome:'+outcome);
        if (result2[3] >= 0) {
          outcome = 'w';
        }
        result2[3] = result2[3].replace('-', '');
        insertIntoBetHistory(outcome, result2[3], result2[2], result2[7], result2[8], result2[11], result2[9], result2[10], result2[4], result2[5], result2[6], result2[1], time);
      }
      $('#newer_bet_history').attr('disabled', false);
      $('#older_bet_history').attr('disabled', false);
    });
  }
}

function formatDate(date) {
  if (date) {
    date = date.replace(/-/g, '/');
  }
  var d = new Date(date || Date.now()); console.log('d:'+d);
  var month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = '' + d.getHours(),
    minute = '' + d.getMinutes(),
    sec = '' + d.getSeconds(); console.log('month:'+month+'|day:'+day+'|year:'+year+'|hour:'+hour+'|minute:'+minute+'|sec:'+sec);
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if (hour.length < 2) hour = '0' + hour;
  if (minute.length < 2) minute = '0' + minute;
  if (sec.length < 2) sec = '0' + sec;
  var formattedDate = day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + sec; console.log('formattedDate:'+formattedDate);
  return formattedDate;
}

function SwitchPageTabs(tab_name) {
  $('.page_tabs').hide();
  $('#' + tab_name + '_tab').show();
  $('#main_content').removeClass('large-9 small-7 push-3 large-centered columns new_border_shadow');
  $('#box_ad_bottom_mobile').hide();
  $('#box_ad_bottom_desktop').hide();
  $('#main_content_ad_left').hide();
  $('#main_content').css('padding', 'auto');
  $('#main_content').css('margin', 'auto');
  $('html, body').animate({
    scrollTop: 0
  }, 'fast');
  $('#main_content').addClass('large-9 small-7 large-centered columns new_border_shadow');
  if (tab_name == 'free_play') {
    $('#box_ad_bottom_mobile').show();
    $('#box_ad_bottom_desktop').show();
    if (show_sky == 1) {
      $('#main_content').addClass('push-3');
      $('#main_content').removeClass('large-centered new_border_shadow');
      $('#main_content_ad_left').show();
      $('#main_content').css('padding', 0);
      $('#main_content').css('margin', 0);
    }
  }
  if (tab_name == 'double_your_btc') {
    $('#myModal22').foundation('reveal', 'close');
    GetBetHistory(0);
  }
  if (tab_name == 'earn_btc') {
    $('#myModal15').foundation('reveal', 'close');
  }
}

function insertBitcoinMore(div_name, position) {
  document.getElementById(div_name).insertAdjacentHTML(position, '<p class="faq_question bold">What is Bitcoin?</p><div class="faq_answer"><p>Bitcoin is an innovative payment network and a new kind of money.</p><p>Bitcoin uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of bitcoins is carried out collectively by the network. <b>Bitcoin is open-source; its design is public, nobody owns or controls Bitcoin and everyone can take part.</b> Through many of its unique properties, Bitcoin allows exciting uses that could not be covered by any previous payment system.</p></div><p class="faq_question bold">How does Bitcoin work?</p><div class="faq_answer"><p>From a user perspective, Bitcoin is nothing more than a mobile app or computer program that provides a personal Bitcoin wallet and allows a user to send and receive bitcoins with them. This is how Bitcoin works for most users.</p><p>Behind the scenes, the Bitcoin network is sharing a public ledger called the "block chain". This ledger contains every transaction ever processed, allowing a user&rsquo;s computer to verify the validity of each transaction. The authenticity of each transaction is protected by digital signatures corresponding to the sending addresses, allowing all users to have full control over sending bitcoins from their own Bitcoin addresses. In addition, anyone can process transactions using the computing power of specialized hardware and earn a reward in bitcoins for this service. This is often called "mining". To learn more about Bitcoin, you can consult the dedicated page and the original paper.</p></div><p class="faq_question bold">Who created Bitcoin?</p><div class="faq_answer"><p>Bitcoin is the first implementation of a concept called "cryptocurrency", which was first described in 1998 by Wei Dai on the cypherpunks mailing list, suggesting the idea of a new form of money that uses cryptography to control its creation and transactions, rather than a central authority. The first Bitcoin specification and proof of concept was published in 2009 in a cryptography mailing list by Satoshi Nakamoto. Satoshi left the project in late 2010 without revealing much about himself. The community has since grown exponentially with many developers working on Bitcoin.</p><p>Satoshi&rsquo;s anonymity often raised unjustified concerns, many of which are linked to misunderstanding of the open-source nature of Bitcoin. The Bitcoin protocol and software are published openly and any developer around the world can review the code or make their own modified version of the Bitcoin software. Just like current developers, Satoshi&rsquo;s influence was limited to the changes he made being adopted by others and therefore he did not control Bitcoin. As such, the identity of Bitcoin&rsquo;s inventor is probably as relevant today as the identity of the person who invented paper.</p></div><p class="faq_question bold">Who controls the Bitcoin network?</p><div class="faq_answer"><p>Nobody owns the Bitcoin network much like no one owns the technology behind email. Bitcoin is controlled by all Bitcoin users around the world. While developers are improving the software, they can&rsquo;t force a change in the Bitcoin protocol because all users are free to choose what software and version they use. In order to stay compatible with each other, all users need to use software complying with the same rules. Bitcoin can only work correctly with a complete consensus among all users. Therefore, all users and developers have a strong incentive to protect this consensus.</p></div><p class="faq_question bold">Is Bitcoin really used by people?</p><div class="faq_answer"><p>Yes. There is a growing number of businesses and individuals using Bitcoin. This includes brick and mortar businesses like restaurants, apartments, law firms, and popular online services such as Namecheap, WordPress, and Reddit. While Bitcoin remains a relatively new phenomenon, it is growing fast. At the end of August 2013, the value of all bitcoins in circulation exceeded US$ 1.5 billion with millions of dollars worth of bitcoins exchanged daily.</p></div><p class="faq_question bold">How does one acquire bitcoins?</p><div class="faq_answer"><p><ul style="text-align:left;"><li>As payment for goods or services.</li><li>Purchase bitcoins at a Bitcoin exchange.</li><li>Exchange bitcoins with someone near you.</li><li>Earn bitcoins through competitive mining.</li></ul></p><p>While it may be possible to find individuals who wish to sell bitcoins in exchange for a credit card or PayPal payment, most exchanges do not allow funding via these payment methods. This is due to cases where someone buys bitcoins with PayPal, and then reverses their half of the transaction. This is commonly referred to as a chargeback.</p></div><p class="faq_question bold">How difficult is it to make a Bitcoin payment?</p><div class="faq_answer"><p>Bitcoin payments are easier to make than debit or credit card purchases, and can be received without a merchant account. Payments are made from a wallet application, either on your computer or smartphone, by entering the recipient&rsquo;s address, the payment amount, and pressing send. To make it easier to enter a recipient&rsquo;s address, many wallets can obtain the address by scanning a QR code or touching two phones together with NFC technology.</p></div><p class="faq_question bold">What are the advantages of Bitcoin?</p><div class="faq_answer"><p><ul style="text-align:left;"><li>Payment freedom - It is possible to send and receive any amount of money instantly anywhere in the world at any time. No bank holidays. No borders. No imposed limits. Bitcoin allows its users to be in full control of their money.</li><li>Very low fees - Bitcoin payments are currently processed with either no fees or extremely small fees. Users may include fees with transactions to receive priority processing, which results in faster confirmation of transactions by the network. Additionally, merchant processors exist to assist merchants in processing transactions, converting bitcoins to fiat currency and depositing funds directly into merchants&rsquo; bank accounts daily. As these services are based on Bitcoin, they can be offered for much lower fees than with PayPal or credit card networks.</li><li>Fewer risks for merchants - Bitcoin transactions are secure, irreversible, and do not contain customersâ€™ sensitive or personal information. This protects merchants from losses caused by fraud or fraudulent chargebacks, and there is no need for PCI compliance. Merchants can easily expand to new markets where either credit cards are not available or fraud rates are unacceptably high. The net results are lower fees, larger markets, and fewer administrative costs.</li><li>Security and control - Bitcoin users are in full control of their transactions; it is impossible for merchants to force unwanted or unnoticed charges as can happen with other payment methods. Bitcoin payments can be made without personal information tied to the transaction. This offers strong protection against identity theft. Bitcoin users can also protect their money with backup and encryption.</li><li>Transparent and neutral - All information concerning the Bitcoin money supply itself is readily available on the block chain for anybody to verify and use in real-time. No individual or organization can control or manipulate the Bitcoin protocol because it is cryptographically secure. This allows the core of Bitcoin to be trusted for being completely neutral, transparent and predictable.</li></ul></p></div><p class="faq_question bold">What are the disadvantages of Bitcoin?</p><div class="faq_answer"><p><ul style="text-align:left;"><li>Degree of acceptance - Many people are still unaware of Bitcoin. Every day, more businesses accept bitcoins because they want the advantages of doing so, but the list remains small and still needs to grow in order to benefit from network effects.</li><li>Volatility - The total value of bitcoins in circulation and the number of businesses using Bitcoin are still very small compared to what they could be. Therefore, relatively small events, trades, or business activities can significantly affect the price. In theory, this volatility will decrease as Bitcoin markets and the technology matures. Never before has the world seen a start-up currency, so it is truly difficult (and exciting) to imagine how it will play out.</li><li>Ongoing development - Bitcoin software is still in beta with many incomplete features in active development. New tools, features, and services are being developed to make Bitcoin more secure and accessible to the masses. Some of these are still not ready for everyone. Most Bitcoin businesses are new and still offer no insurance. In general, Bitcoin is still in the process of maturing.</li></ul></p></div><p class="faq_question bold">Why do people trust Bitcoin?</p><div class="faq_answer"><p>Much of the trust in Bitcoin comes from the fact that it requires no trust at all. Bitcoin is fully open-source and decentralized. This means that anyone has access to the entire source code at any time. Any developer in the world can therefore verify exactly how Bitcoin works. All transactions and bitcoins issued into existence can be transparently consulted in real-time by anyone. All payments can be made without reliance on a third party and the whole system is protected by heavily peer-reviewed cryptographic algorithms like those used for online banking. No organization or individual can control Bitcoin, and the network remains secure even if not all of its users can be trusted.</p></div><p class="faq_question bold">Can I make money with Bitcoin?</p><div class="faq_answer"><p>You should never expect to get rich with Bitcoin or any emerging technology. It is always important to be wary of anything that sounds too good to be true or disobeys basic economic rules.</p><p>Bitcoin is a growing space of innovation and there are business opportunities that also include risks. There is no guarantee that Bitcoin will continue to grow even though it has developed at a very fast rate so far. Investing time and resources on anything related to Bitcoin requires entrepreneurship. There are various ways to make money with Bitcoin such as mining, speculation or running new businesses. All of these methods are competitive and there is no guarantee of profit. It is up to each individual to make a proper evaluation of the costs and the risks involved in any such project.</p></div><p class="faq_question bold">Is Bitcoin fully virtual and immaterial?</p><div class="faq_answer"><p>Bitcoin is as virtual as the credit cards and online banking networks people use everyday. Bitcoin can be used to pay online and in physical stores just like any other form of money. Bitcoins can also be exchanged in physical form such as the Casascius coins, but paying with a mobile phone usually remains more convenient. Bitcoin balances are stored in a large distributed network, and they cannot be fraudulently altered by anybody. In other words, Bitcoin users have exclusive control over their funds and bitcoins cannot vanish just because they are virtual.</p></div><p class="faq_question bold">Is Bitcoin anonymous?</p><div class="faq_answer"><p>Bitcoin is designed to allow its users to send and receive payments with an acceptable level of privacy as well as any other form of money. However, Bitcoin is not anonymous and cannot offer the same level of privacy as cash. The use of Bitcoin leaves extensive public records. Various mechanisms exist to protect users&rsquo; privacy, and more are in development. However, there is still work to be done before these features are used correctly by most Bitcoin users.</p><p>Some concerns have been raised that private transactions could be used for illegal purposes with Bitcoin. However, it is worth noting that Bitcoin will undoubtedly be subjected to similar regulations that are already in place inside existing financial systems. Bitcoin cannot be more anonymous than cash and it is not likely to prevent criminal investigations from being conducted. Additionally, Bitcoin is also designed to prevent a large range of financial crimes.</p></div><p class="faq_question bold">What happens when bitcoins are lost?</p><div class="faq_answer"><p>When a user loses his wallet, it has the effect of removing money out of circulation. Lost bitcoins still remain in the block chain just like any other bitcoins. However, lost bitcoins remain dormant forever because there is no way for anybody to find the private key(s) that would allow them to be spent again. Because of the law of supply and demand, when fewer bitcoins are available, the ones that are left will be in higher demand and increase in value to compensate.</p></div><p class="faq_question bold">Can Bitcoin scale to become a major payment network?</p><div class="faq_answer"><p>The Bitcoin network can already process a much higher number of transactions per second than it does today. It is, however, not entirely ready to scale to the level of major credit card networks. Work is underway to lift current limitations, and future requirements are well known. Since inception, every aspect of the Bitcoin network has been in a continuous process of maturation, optimization, and specialization, and it should be expected to remain that way for some years to come. As traffic grows, more Bitcoin users may use lightweight clients, and full network nodes may become a more specialized service. For more details, see the Scalability page on the Wiki.</p></div><p class="faq_question bold">Is Bitcoin legal?</p><div class="faq_answer"><p>To the best of our knowledge, Bitcoin has not been made illegal by legislation in most jurisdictions. However, some jurisdictions (such as Argentina and Russia) severely restrict or ban foreign currencies. Other jurisdictions (such as Thailand) may limit the licensing of certain entities such as Bitcoin exchanges.</p><p>Regulators from various jurisdictions are taking steps to provide individuals and businesses with rules on how to integrate this new technology with the formal, regulated financial system. For example, the Financial Crimes Enforcement Network (FinCEN), a bureau in the United States Treasury Department, issued non-binding guidance on how it characterizes certain activities involving virtual currencies.</p></div><p class="faq_question bold">Is Bitcoin useful for illegal activities?</p><div class="faq_answer"><p>Bitcoin is money, and money has always been used both for legal and illegal purposes. Cash, credit cards and current banking systems widely surpass Bitcoin in terms of their use to finance crime. Bitcoin can bring significant innovation in payment systems and the benefits of such innovation are often considered to be far beyond their potential drawbacks.</p><p>Bitcoin is designed to be a huge step forward in making money more secure and could also act as a significant protection against many forms of financial crime. For instance, bitcoins are completely impossible to counterfeit. Users are in full control of their payments and cannot receive unapproved charges such as with credit card fraud. Bitcoin transactions are irreversible and immune to fraudulent chargebacks. Bitcoin allows money to be secured against theft and loss using very strong and useful mechanisms such as backups, encryption, and multiple signatures.</p><p>Some concerns have been raised that Bitcoin could be more attractive to criminals because it can be used to make private and irreversible payments. However, these features already exist with cash and wire transfer, which are widely used and well-established. The use of Bitcoin will undoubtedly be subjected to similar regulations that are already in place inside existing financial systems, and Bitcoin is not likely to prevent criminal investigations from being conducted. In general, it is common for important breakthroughs to be perceived as being controversial before their benefits are well understood. The Internet is a good example among many others to illustrate this.</p></div><p class="faq_question bold">Can Bitcoin be regulated?</p><div class="faq_answer"><p>The Bitcoin protocol itself cannot be modified without the cooperation of nearly all its users, who choose what software they use. Attempting to assign special rights to a local authority in the rules of the global Bitcoin network is not a practical possibility. Any rich organization could choose to invest in mining hardware to control half of the computing power of the network and become able to block or reverse recent transactions. However, there is no guarantee that they could retain this power since this requires to invest as much than all other miners in the world.</p><p>It is however possible to regulate the use of Bitcoin in a similar way to any other instrument. Just like the dollar, Bitcoin can be used for a wide variety of purposes, some of which can be considered legitimate or not as per each jurisdiction&rsquo;s laws. In this regard, Bitcoin is no different than any other tool or resource and can be subjected to different regulations in each country. Bitcoin use could also be made difficult by restrictive regulations, in which case it is hard to determine what percentage of users would keep using the technology. A government that chooses to ban Bitcoin would prevent domestic businesses and markets from developing, shifting innovation to other countries. The challenge for regulators, as always, is to develop efficient solutions while not impairing the growth of new emerging markets and businesses.</p></div><p class="faq_question bold">What about Bitcoin and taxes?</p><div class="faq_answer"><p>Bitcoin is not a fiat currency with legal tender status in any jurisdiction, but often tax liability accrues regardless of the medium used. There is a wide variety of legislation in many different jurisdictions which could cause income, sales, payroll, capital gains, or some other form of tax liability to arise with Bitcoin.</p></div><p class="faq_question bold">What about Bitcoin and consumer protection?</p><div class="faq_answer"><p>Bitcoin is freeing people to transact on their own terms. Each user can send and receive payments in a similar way to cash but they can also take part in more complex contracts. Multiple signatures allow a transaction to be accepted by the network only if a certain number of a defined group of persons agree to sign the transaction. This allows innovative dispute mediation services to be developed in the future. Such services could allow a third party to approve or reject a transaction in case of disagreement between the other parties without having control on their money. As opposed to cash and other payment methods, Bitcoin always leaves a public proof that a transaction did take place, which can potentially be used in a recourse against businesses with fraudulent practices.</p><p>It is also worth noting that while merchants usually depend on their public reputation to remain in business and pay their employees, they don&rsquo;t have access to the same level of information when dealing with new consumers. The way Bitcoin works allows both individuals and businesses to be protected against fraudulent chargebacks while giving the choice to the consumer to ask for more protection when they are not willing to trust a particular merchant.</p></div><p class="faq_question bold">How are bitcoins created?</p><div class="faq_answer"><p>New bitcoins are generated by a competitive and decentralized process called "mining". This process involves that individuals are rewarded by the network for their services. Bitcoin miners are processing transactions and securing the network using specialized hardware and are collecting new bitcoins in exchange.</p><p>The Bitcoin protocol is designed in such a way that new bitcoins are created at a fixed rate. This makes Bitcoin mining a very competitive business. When more miners join the network, it becomes increasingly difficult to make a profit and miners must seek efficiency to cut their operating costs. No central authority or developer has any power to control or manipulate the system to increase their profits. Every Bitcoin node in the world will reject anything that does not comply with the rules it expects the system to follow.</p><p>Bitcoins are created at a decreasing and predictable rate. The number of new bitcoins created each year is automatically halved over time until bitcoin issuance halts completely with a total of 21 million bitcoins in existence. At this point, Bitcoin miners will probably be supported exclusively by numerous small transaction fees.</p></div><p class="faq_question bold">Why do bitcoins have value?</p><div class="faq_answer"><p>Bitcoins have value because they are useful as a form of money. Bitcoin has the characteristics of money (durability, portability, fungibility, scarcity, divisibility, and recognizability) based on the properties of mathematics rather than relying on physical properties (like gold and silver) or trust in central authorities (like fiat currencies). In short, Bitcoin is backed by mathematics. With these attributes, all that is required for a form of money to hold value is trust and adoption. In the case of Bitcoin, this can be measured by its growing base of users, merchants, and startups. As with all currency, bitcoin&rsquo;s value comes only and directly from people willing to accept them as payment.</p></div><p class="faq_question bold">What determines bitcoin&rsquo;s price?</p><div class="faq_answer"><p>The price of a bitcoin is determined by supply and demand. When demand for bitcoins increases, the price increases, and when demand falls, the price falls. There is only a limited number of bitcoins in circulation and new bitcoins are created at a predictable and decreasing rate, which means that demand must follow this level of inflation to keep the price stable. Because Bitcoin is still a relatively small market compared to what it could be, it doesn&rsquo;t take significant amounts of money to move the market price up or down, and thus the price of a bitcoin is still very volatile.</p></div><p class="faq_question bold">Can bitcoins become worthless?</p><div class="faq_answer"><p>Yes. History is littered with currencies that failed and are no longer used, such as the German Mark during the Weimar Republic and, more recently, the Zimbabwean dollar. Although previous currency failures were typically due to hyperinflation of a kind that Bitcoin makes impossible, there is always potential for technical failures, competing currencies, political issues and so on. As a basic rule of thumb, no currency should be considered absolutely safe from failures or hard times. Bitcoin has proven reliable for years since its inception and there is a lot of potential for Bitcoin to continue to grow. However, no one is in a position to predict what the future will be for Bitcoin.</p></div><p class="faq_question bold">Is Bitcoin a bubble?</p><div class="faq_answer"><p>A fast rise in price does not constitute a bubble. An artificial over-valuation that will lead to a sudden downward correction constitutes a bubble. Choices based on individual human action by hundreds of thousands of market participants is the cause for bitcoin&rsquo;s price to fluctuate as the market seeks price discovery. Reasons for changes in sentiment may include a loss of confidence in Bitcoin, a large difference between value and price not based on the fundamentals of the Bitcoin economy, increased press coverage stimulating speculative demand, fear of uncertainty, and old-fashioned irrational exuberance and greed.</p></div><p class="faq_question bold">Is Bitcoin a Ponzi scheme?</p><div class="faq_answer"><p>A Ponzi scheme is a fraudulent investment operation that pays returns to its investors from their own money, or the money paid by subsequent investors, instead of from profit earned by the individuals running the business. Ponzi schemes are designed to collapse at the expense of the last investors when there is not enough new participants.</p><p>Bitcoin is a free software project with no central authority. Consequently, no one is in a position to make fraudulent representations about investment returns. Like other major currencies such as gold, United States dollar, euro, yen, etc. there is no guaranteed purchasing power and the exchange rate floats freely. This leads to volatility where owners of bitcoins can unpredictably make or lose money. Beyond speculation, Bitcoin is also a payment system with useful and competitive attributes that are being used by thousands of users and businesses.</p></div><p class="faq_question bold">Doesn&rsquo;t Bitcoin unfairly benefit early adopters?</p><div class="faq_answer"><p>Some early adopters have large numbers of bitcoins because they took risks and invested time and resources in an unproven technology that was hardly used by anyone and that was much harder to secure properly. Many early adopters spent large numbers of bitcoins quite a few times before they became valuable or bought only small amounts and didn&rsquo;t make huge gains. There is no guarantee that the price of a bitcoin will increase or drop. This is very similar to investing in an early startup that can either gain value through its usefulness and popularity, or just never break through. Bitcoin is still in its infancy, and it has been designed with a very long-term view; it is hard to imagine how it could be less biased towards early adopters, and today&rsquo;s users may or may not be the early adopters of tomorrow.</p></div><p class="faq_question bold">Won&rsquo;t the finite amount of bitcoins be a limitation?</p><div class="faq_answer"><p>Bitcoin is unique in that only 21 million bitcoins will ever be created. However, this will never be a limitation because transactions can be denominated in smaller sub-units of a bitcoin, such as bits - there are 1,000,000 bits in 1 bitcoin. Bitcoins can be divided up to 8 decimal places (0.000 000 01) and potentially even smaller units if that is ever required in the future as the average transaction size decreases.</p></div><p class="faq_question bold">Won&rsquo;t Bitcoin fall in a deflationary spiral?</p><div class="faq_answer"><p>The deflationary spiral theory says that if prices are expected to fall, people will move purchases into the future in order to benefit from the lower prices. That fall in demand will in turn cause merchants to lower their prices to try and stimulate demand, making the problem worse and leading to an economic depression.</p><p>Although this theory is a popular way to justify inflation amongst central bankers, it does not appear to always hold true and is considered controversial amongst economists. Consumer electronics is one example of a market where prices constantly fall but which is not in depression. Similarly, the value of bitcoins has risen over time and yet the size of the Bitcoin economy has also grown dramatically along with it. Because both the value of the currency and the size of its economy started at zero in 2009, Bitcoin is a counterexample to the theory showing that it must sometimes be wrong.</p><p>Notwithstanding this, Bitcoin is not designed to be a deflationary currency. It is more accurate to say Bitcoin is intended to inflate in its early years, and become stable in its later years. The only time the quantity of bitcoins in circulation will drop is if people carelessly lose their wallets by failing to make backups. With a stable monetary base and a stable economy, the value of the currency should remain the same.</p></div><p class="faq_question bold">Isn&rsquo;t speculation and volatility a problem for Bitcoin?</p><div class="faq_answer"><p>This is a chicken and egg situation. For bitcoin&rsquo;s price to stabilize, a large scale economy needs to develop with more businesses and users. For a large scale economy to develop, businesses and users will seek for price stability.</p><p>Fortunately, volatility does not affect the main benefits of Bitcoin as a payment system to transfer money from point A to point B. It is possible for businesses to convert bitcoin payments to their local currency instantly, allowing them to profit from the advantages of Bitcoin without being subjected to price fluctuations. Since Bitcoin offers many useful and unique features and properties, many users choose to use Bitcoin. With such solutions and incentives, it is possible that Bitcoin will mature and develop to a degree where price volatility will become limited.</p></div><p class="faq_question bold">What if someone bought up all the existing bitcoins?</p><div class="faq_answer"><p>Only a fraction of bitcoins issued to date are found on the exchange markets for sale. Bitcoin markets are competitive, meaning the price of a bitcoin will rise or fall depending on supply and demand. Additionally, new bitcoins will continue to be issued for decades to come. Therefore even the most determined buyer could not buy all the bitcoins in existence. This situation isn&rsquo;t to suggest, however, that the markets aren&rsquo;t vulnerable to price manipulation; it still doesn&rsquo;t take significant amounts of money to move the market price up or down, and thus Bitcoin remains a volatile asset thus far.</p></div><p class="faq_question bold">What if someone creates a better digital currency?</p><div class="faq_answer"><p>That can happen. For now, Bitcoin remains by far the most popular decentralized virtual currency, but there can be no guarantee that it will retain that position. There is already a set of alternative currencies inspired by Bitcoin. It is however probably correct to assume that significant improvements would be required for a new currency to overtake Bitcoin in terms of established market, even though this remains unpredictable. Bitcoin could also conceivably adopt improvements of a competing currency so long as it doesn&rsquo;t change fundamental parts of the protocol.</p></div><p class="faq_question bold">What is Bitcoin mining?</p><div class="faq_answer"><p>Mining is the process of spending computing power to process transactions, secure the network, and keep everyone in the system synchronized together. It can be perceived like the Bitcoin data center except that it has been designed to be fully decentralized with miners operating in all countries and no individual having control over the network. This process is referred to as "mining" as an analogy to gold mining because it is also a temporary mechanism used to issue new bitcoins. Unlike gold mining, however, Bitcoin mining provides a reward in exchange for useful services required to operate a secure payment network. Mining will still be required after the last bitcoin is issued.</p></div><p class="faq_question bold">How does Bitcoin mining work?</p><div class="faq_answer"><p>Anybody can become a Bitcoin miner by running software with specialized hardware. Mining software listens for transactions broadcast through the peer-to-peer network and performs appropriate tasks to process and confirm these transactions. Bitcoin miners perform this work because they can earn transaction fees paid by users for faster transaction processing, and newly created bitcoins issued into existence according to a fixed formula.</p><p>For new transactions to be confirmed, they need to be included in a block along with a mathematical proof of work. Such proofs are very hard to generate because there is no way to create them other than by trying billions of calculations per second. This requires miners to perform these calculations before their blocks are accepted by the network and before they are rewarded. As more people start to mine, the difficulty of finding valid blocks is automatically increased by the network to ensure that the average time to find a block remains equal to 10 minutes. As a result, mining is a very competitive business where no individual miner can control what is included in the block chain.</p><p>The proof of work is also designed to depend on the previous block to force a chronological order in the block chain. This makes it exponentially difficult to reverse previous transactions because this requires the recalculation of the proofs of work of all the subsequent blocks. When two blocks are found at the same time, miners work on the first block they receive and switch to the longest chain of blocks as soon as the next block is found. This allows mining to secure and maintain a global consensus based on processing power.</p><p>Bitcoin miners are neither able to cheat by increasing their own reward nor process fraudulent transactions that could corrupt the Bitcoin network because all Bitcoin nodes would reject any block that contains invalid data as per the rules of the Bitcoin protocol. Consequently, the network remains secure even if not all Bitcoin miners can be trusted.</p></div><p class="faq_question bold">Isn&rsquo;t Bitcoin mining a waste of energy?</p><div class="faq_answer"><p>Spending energy to secure and operate a payment system is hardly a waste. Like any other payment service, the use of Bitcoin entails processing costs. Services necessary for the operation of currently widespread monetary systems, such as banks, credit cards, and armored vehicles, also use a lot of energy. Although unlike Bitcoin, their total energy consumption is not transparent and cannot be as easily measured.</p><p>Bitcoin mining has been designed to become more optimized over time with specialized hardware consuming less energy, and the operating costs of mining should continue to be proportional to demand. When Bitcoin mining becomes too competitive and less profitable, some miners choose to stop their activities. Furthermore, all energy expended mining is eventually transformed into heat, and the most profitable miners will be those who have put this heat to good use. An optimally efficient mining network is one that isn&rsquo;t actually consuming any extra energy. While this is an ideal, the economics of mining are such that miners individually strive toward it.</p></div><p class="faq_question bold">How does mining help secure Bitcoin?</p><div class="faq_answer"><p>Mining creates the equivalent of a competitive lottery that makes it very difficult for anyone to consecutively add new blocks of transactions into the block chain. This protects the neutrality of the network by preventing any individual from gaining the power to block certain transactions. This also prevents any individual from replacing parts of the block chain to roll back their own spends, which could be used to defraud other users. Mining makes it exponentially more difficult to reverse a past transaction by requiring the rewriting of all blocks following this transaction.</p></div><p class="faq_question bold">What do I need to start mining?</p><div class="faq_answer"><p>In the early days of Bitcoin, anyone could find a new block using their computer&rsquo;s CPU. As more and more people started mining, the difficulty of finding new blocks increased greatly to the point where the only cost-effective method of mining today is using specialized hardware. You can visit BitcoinMining.com for more information.</p></div><p class="faq_question bold">Is Bitcoin secure?</p><div class="faq_answer"><p>The Bitcoin technology - the protocol and the cryptography - has a strong security track record, and the Bitcoin network is probably the biggest distributed computing project in the world. Bitcoin&rsquo;s most common vulnerability is in user error. Bitcoin wallet files that store the necessary private keys can be accidentally deleted, lost or stolen. This is pretty similar to physical cash stored in a digital form. Fortunately, users can employ sound security practices to protect their money or use service providers that offer good levels of security and insurance against theft or loss.</p></div><p class="faq_question bold">Hasn&rsquo;t Bitcoin been hacked in the past?</p><div class="faq_answer"><p>The rules of the protocol and the cryptography used for Bitcoin are still working years after its inception, which is a good indication that the concept is well designed. However, security flaws have been found and fixed over time in various software implementations. Like any other form of software, the security of Bitcoin software depends on the speed with which problems are found and fixed. The more such issues are discovered, the more Bitcoin is gaining maturity.</p><p>There are often misconceptions about thefts and security breaches that happened on diverse exchanges and businesses. Although these events are unfortunate, none of them involve Bitcoin itself being hacked, nor imply inherent flaws in Bitcoin; just like a bank robbery doesn&rsquo;t mean that the dollar is compromised. However, it is accurate to say that a complete set of good practices and intuitive security solutions is needed to give users better protection of their money, and to reduce the general risk of theft and loss. Over the course of the last few years, such security features have quickly developed, such as wallet encryption, offline wallets, hardware wallets, and multi-signature transactions.</p></div><p class="faq_question bold">Could users collude against Bitcoin?</p><div class="faq_answer"><p>It is not possible to change the Bitcoin protocol that easily. Any Bitcoin client that doesn&rsquo;t comply with the same rules cannot enforce their own rules on other users. As per the current specification, double spending is not possible on the same block chain, and neither is spending bitcoins without a valid signature. Therefore, It is not possible to generate uncontrolled amounts of bitcoins out of thin air, spend other users&rsquo; funds, corrupt the network, or anything similar.</p><p>However, powerful miners could arbitrarily choose to block or reverse recent transactions. A majority of users can also put pressure for some changes to be adopted. Because Bitcoin only works correctly with a complete consensus between all users, changing the protocol can be very difficult and requires an overwhelming majority of users to adopt the changes in such a way that remaining users have nearly no choice but to follow. As a general rule, it is hard to imagine why any Bitcoin user would choose to adopt any change that could compromise their own money.</p></div><p class="faq_question bold">Is Bitcoin vulnerable to quantum computing?</p><div class="faq_answer"><p>Yes, most systems relying on cryptography in general are, including traditional banking systems. However, quantum computers don&rsquo;t yet exist and probably won&rsquo;t for a while. In the event that quantum computing could be an imminent threat to Bitcoin, the protocol could be upgraded to use post-quantum algorithms. Given the importance that this update would have, it can be safely expected that it would be highly reviewed by developers and adopted by all Bitcoin users.</p></div><p class="faq_question bold">What if I have more questions about Bitcoin?</p><div class="faq_answer"><p>Three great places where you can get your questions answered are the BitcoinTalk Forum at <a href="http://bitcointalk.org" target="_blank">BitcoinTalk.org</a>, the Bitcoin sub-reddit at <a href="http://www.reddit.com/r/bitcoin" target="_blank">Reddit.com/r/bitcoin</a> and Bitcoin Stack Exchange at <a href="http://bitcoin.stackexchange.com/" target="_blank">Bitcoin.StackExchange.com</a>.</p></div>');
}

function insertIntoBetHistory(outcome, win_amount, lucky_number, server_seed, client_seed, sseed_hash, nonce, game_type, bet_on, jackpot, stake, multiplier, time) {
  if (outcome === 'w') {
    win_amount = '<font color=green>' + win_amount + '</font>';
  } else if (outcome === 'l') {
    win_amount = '<font color=red>-' + win_amount + '</font>';
  }
  bet_on = bet_on.toUpperCase();
  if (jackpot == '0') {
    jackpot = '&#x2716';
  } else if (jackpot) {
    var result3 = jackpot.split(','); console.log('result3:'+result3);
    var jackpot_string = ''; console.log('jackpot_string:'+jackpot_string);
    for (var z = 0; z < result3.length; z++) {
      jackpot_string = jackpot_string + jackpot_costs[result3[z]] + ' | '
    }
    jackpot_string = jackpot_string.slice(0, -3);
    jackpot = '<span data-tooltip class=\'has-tip\' title=\'' + jackpot_string + '\' style=\'cursor:pointer;\'>&#x2714</span>';
  } else {
    jackpot = '&nbsp;'
  }
  if (bet_on == '') {
    bet_on = '&nbsp;'
  }
  if ($('div.multiply_bet_history_table_row').length == 20) {
    $('div.multiply_bet_history_table_row').last().remove();
  }
  var date = formatDate(); console.log('date:'+date);
  if (time) {
    date = time;
  }
  var split_date = date.split(' '); console.log('split_date:'+split_date);
  var row_html = '<div class="large-12 small-12 columns center lottery_winner_table_box_container effect2 multiply_bet_history_table_row"><div class="large-2 small-2 columns center lottery_winner_table_box lottery_winner_table_first_last_cell">' + split_date[1] + '</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_second_cell">' + game_type + '</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_second_cell">' + bet_on + '</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_second_cell">' + lucky_number + '</div><div class="large-2 small-2 columns center lottery_winner_table_box lottery_winner_table_second_cell">' + stake + '</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_second_cell">' + multiplier + '</div><div class="large-2 small-2 columns center lottery_winner_table_box lottery_winner_table_second_cell">' + win_amount + '</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_third_cell">' + jackpot + '</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_first_last_cell"><a href="https://s3.amazonaws.com/roll-verifier/verify.html?server_seed=' + server_seed + '&client_seed=' + client_seed + '&server_seed_hash=' + sseed_hash + '&nonce=' + nonce + '" target=_blank>CLICK</a></div></div>';
   console.log('row_html:'+row_html);
  var bet_history_date = split_date[0]; console.log('bet_history_date:'+bet_history_date);
  var date_row_name = bet_history_date.replace(/\//g, '_'); console.log('date_row_name:'+date_row_name);
  if ($('#multiply_history_date_row_' + date_row_name).length == 0) {
    row_html = '<div class="large-12 small-12 columns center lottery_winner_table_box" id="multiply_history_date_row_' + date_row_name + '"><div class="center" style="margin:auto; font-weight:bold;">DATE: ' + split_date[0] + '</div></div> <div class="large-12 small-12 columns center lottery_winner_table_box_container effect2 multiply_history_table_header"><div class="large-2 small-2 columns center lottery_winner_table_box lottery_winner_table_first_last_cell font_bold">TIME</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_second_cell font_bold">GAME</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_second_cell font_bold">BET</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_second_cell font_bold">ROLL</div><div class="large-2 small-2 columns center lottery_winner_table_box lottery_winner_table_second_cell font_bold">STAKE</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_second_cell font_bold"><span data-tooltip class="has-tip" title="Multiplier">MULT</span></div><div class="large-2 small-2 columns center lottery_winner_table_box lottery_winner_table_second_cell font_bold">PROFIT</div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_third_cell font_bold"><span data-tooltip class="has-tip" title="Jackpot">JPOT</span></div><div class="large-1 small-1 columns center lottery_winner_table_box lottery_winner_table_first_last_cell font_bold"><span data-tooltip class="has-tip" title="Verify">VER</span></div></div>' + row_html;
    $('#bet_history_table_rows').prepend(row_html);
  } else {
    $('#multiply_history_date_row_' + date_row_name).next('div.multiply_history_table_header').after(row_html);
  }
  return false;
}

function GetRPPrizes() {
  $.get('/?op=get_rp_prizes', function(data) {
    var mobile_class_one = ''; console.log('mobile_class_one:'+mobile_class_one);
    var mobile_class_two = ''; console.log('mobile_class_two:'+mobile_class_two);
    if (mobile_device == 1) {
      mobile_class_one = ' reward_link_redeem_button_mobile ';
      mobile_class_two = ' reward_link_redeem_button_mobile_last ';
    }
    for (var i = 0; i < data.length; i++) {
      $('#' + data[i].category + '_rewards').append('<div class="effect2" style="margin: 0; border-radius: 3px; margin-top: 20px;"><div class="row reward_product_name">' + data[i].product_name + '</div><div class="row" style="margin:0; padding: 10px 0; border: 1px solid #bdbcb8; border-radius: 0 0 3px 3px; background:#fff;"><div class="large-3 small-12 columns"><div class="reward_link_redeem_button_style' + mobile_class_one + '" onclick="VisitLink(\'' + data[i].product_link + '\')">LINK</div></div><div class="large-6 small-12 columns"><div class="reward_dollar_value_style' + mobile_class_one + '">' + data[i].points + ' RP</div></div><div class="large-3 small-12 columns"><button class="reward_link_redeem_button_style ' + mobile_class_two + '" onclick="RedeemRPProduct(\'' + data[i].product_type + '\')">REDEEM</button></div></div></div>');
    }
  });
}

function VisitLink(url) {
  if (url != 'none') {
    window.open(url)
  }
}

function RedeemRPProduct(id) {
  $('.reward_link_redeem_button_style').attr('disabled', true);
  $('.orange_button').attr('disabled', true);
  var points = $('#encash_points_number').val(); console.log('points:'+points);
  $.get('/?op=redeem_rewards&id=' + id + '&points=' + points, function(data) {
    var result = data.split(':'); console.log('result:'+result);
    var msg; console.log('msg:'+msg);
    if (result[0] == 's') {
      $('.user_reward_points').html(result[2]);
      if (result[1] == 's1') {
        $('#balance').html(result[5]);
        balanceChanged();
        msg = 'Successfully converted ' + ReplaceNumberWithCommas(parseInt(result[3])) + ' points to ' + parseFloat(parseInt(result[4]) / 100000000).toFixed(8) + 'BTC.';
      } else if (result[1] == 's2') {
        msg = 'Your bonus has been succesfully activated!';
        var inner_div_html = '<p>Active bonus <span class="free_play_bonus_box_span_large">' + result[5] + '</span> ends in <span class="free_play_bonus_box_span_large" id="bonus_span_' + result[3] + '"></span></p>';
         console.log('inner_div_html:'+inner_div_html);
        if ($('#bonus_container_' + result[3]).length > 0) {
          $('#bonus_container_' + result[3]).html(inner_div_html);
        } else {
          $('#reward_points_bonuses_main_div').append('<div class="bold center free_play_bonus_box_large" id="bonus_container_' + result[3] + '">' + inner_div_html + '</div>');
        }
        $('#bonus_container_' + result[3]).show();
        BonusEndCountdown(result[3], parseInt(result[4]));
        if (result[3] == 'fp_bonus') {
          $('#fp_min_reward').html(result[6] + ' BTC');
        }
      } else if (result[1] == 's3') {
        msg = 'Your redemption request for ' + result[3] + ' has been sent succesfully. We shall contact you via email for your shipping details (if required). If you do not have an email address added to your account, please add it now via the PROFILE page.';
      }
    } else if (result[0] == 'e') {
      msg = result[1];
    }
    DisplaySEMessage(result[0], msg);
    $('.reward_link_redeem_button_style').attr('disabled', false);
    $('.orange_button').attr('disabled', false);
  });
}

function BonusEndCountdown(selector, duration) {
  var start = Date.now(),
    diff,
    hours,
    minutes,
    seconds; console.log('start:'+start+'|diff:'+diff+'|hours:'+hours+'|minutes:'+minutes+'|seconds:'+seconds);
  var timer_run = setInterval(function timer() {
    diff = duration - (((Date.now() - start) / 1000) | 0);
    hours = (diff / (60 * 60)) | 0;
    minutes = ((diff - (hours * 60 * 60)) / 60) | 0;
    seconds = (diff - (minutes * 60) - (hours * 60 * 60)) | 0;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    $('#bonus_span_' + selector).html(hours + ':' + minutes + ':' + seconds);
    if (diff <= 0) {
      $('#bonus_container_' + selector).hide();
      clearInterval(timer_run);
      return;
    }
  }, 1000); console.log('timer_run:'+timer_run);
}

function DisplaySEMessage(result, msg, custom_timeout) {
  if (result != '' && result != 0 && result != undefined && msg != '' && msg != 0 && msg != undefined) {
    clearTimeout(se_msg_timeout_id);
    $('.reward_point_redeem_result_box').removeClass('reward_point_redeem_result_error');
    $('.reward_point_redeem_result_box').removeClass('reward_point_redeem_result_success');
    $('#reward_point_redeem_result_container_div').show();
    if (result == 's') {
      $('.reward_point_redeem_result_box').addClass('reward_point_redeem_result_success');
    } else if (result == 'e') {
      $('.reward_point_redeem_result_box').addClass('reward_point_redeem_result_error');
    }
    $('.reward_point_redeem_result').html(msg);
    var timeout = 15000; console.log('timeout:'+timeout);
    if (custom_timeout > 0) {
      timeout = custom_timeout;
    }
    se_msg_timeout_id = setTimeout(function() {
      $('#reward_point_redeem_result_container_div').hide();
    }, timeout);
  }
}

function balanceChanged() {
  if (max_deposit_bonus > parseFloat(min_bonus_amount)) {
    $('.dep_bonus_max').html(max_deposit_bonus + ' BTC');
  }
  $('#balance2').html($('#balance').html());
  balance_last_changed = Math.floor(Date.now() / 1000);
}

function GenerateHashes(string) {
  var rand = Math.random(); console.log('rand:'+rand);
  var hash = CryptoJS.SHA1(rand.toString() + rand.toString()).toString(CryptoJS.enc.Hex); console.log('hash:'+hash);
  while (hash.indexOf(string) == -1) {
    rand = Math.random();
    hash = CryptoJS.SHA1(rand.toString() + rand.toString()).toString(CryptoJS.enc.Hex);
    if (hash.indexOf(string) !== -1) {
      return rand;
    }
  }
}
$.urlParam = function(name) {
  var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.href); console.log('results:'+results);
  if (results == null) {
    return '';
  } else {
    return results[1] || 0;
  }
}
