const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '801240311:AAH2Um4x7N6NOGf0Z3q8mi3gcMuTreuY1H8';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
bot.onText(/\/about/, (msg) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId,'This is an election bot which can address infor the Election Commission about the possible violations of the Model Code of Conduct on social media.\nIt uses blockchain to secure data.');
});
bot.onText(/\/start/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

 const chatId = msg.chat.id;
  const resp = 'Here is a list of commands:\n/link_to_FB_post - Provide a link to FB post.\n/youtube_link - Provide a link to hate speeches uploaded on Youtube\n/upload_picture- Provide photos showing possible violation of MCC\n/confirm_identification - Provide contact info'; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
bot.onText(/\/link_to_FB_post/, (msg) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  //const chatId = msg.chat.id;
  //const resp = 'Your response has been recorded '+match[1]; // the captured "whatever"
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Enter FB link:');
   // the captured "whatever"
  bot.once('message', (msg) => {
    const chatId = msg.chat.id;
    const resp = 'Your response has been recorded '+msg.text;
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, resp);


  });
  // send back the matched "whatever" to the chat
//  bot.sendMessage(chatId, resp);
});
bot.onText(/\/youtube_link/, (msg) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Enter YouTube link:');
  // the captured "whatever"
  bot.once('message', (msg) => {
    const chatId = msg.chat.id;
    const resp = 'Your response has been recorded '+msg.text;
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, resp);


  });
  // send back the matched "whatever" to the chat
//  bot.sendMessage(chatId, resp);
});


// Listen for any kind of message. There are different kinds of
// messages.
bot.onText(/^\/confirm_identification/, function (msg, match) {
    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My phone number",
                request_contact: true
            }], ["Cancel"]]
        }
    };
    bot.sendMessage(msg.chat.id, "How can we contact you?", option).then(() => {
        bot.once("contact",(msg)=>{
            var option = {
                "parse_mode": "Markdown",
                "reply_markup": {
                    "one_time_keyboard": true,
                    "keyboard": [[{
                        text: "My location",
                        request_location: true
                    }], ["Cancel"]]
                }
            };
            bot.sendMessage(msg.chat.id,
                            util.format('Thank you %s with phone %s! And where are you?', msg.contact.first_name, msg.contact.phone_number),
                            option)
            .then(() => {
                bot.once("location",(msg)=>{
                    bot.sendMessage(msg.chat.id, "Your location recorded is: " + [msg.location.longitude,msg.location.latitude].join(";"));
                })
            })
        })
    })

});

/*bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');


});*/
