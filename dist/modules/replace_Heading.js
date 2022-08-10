module.exports = (template, items) => {
         let output = template.replace("{%NAVBAR%}",items.navbar);
             output = output.replace("{%NEWS_CARDS%}", items.cards);
             output = output.replace("{%ABOUT%}", items.about);

         return output;
}