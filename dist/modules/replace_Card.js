module.exports = (template, element) => {
      let SIZE_INDEX = Date.now()%3; 
      let SIZE = new Map([[0, "small"],  [1, "medium"], [2, "large"]]);
      let output = template.replace(/{%ID%}/g, element.id);
          output = output.replace(/{%TITLE%}/g, element.title);
          output = output.replace(/{%DESCRIPTION%}/g,element.description);
          output = output.replace(/{%BRIEF%}/g,element.brief);
          output = output.replace(/{%BY%}/g,element.by);
          output = output.replace(/{%IMAGE%}/g, element.image);
          output = output.replace(/{%SOURCE%}/g,element.source);
          output = output.replace(/{%ADDED%}/g,element.added);
          output = output.replace(/{%READ%}/g, element.read);
          output = output.replace(/{%URL%}/g,element.url);
          output = output.replace(/{%SIZE%}/g,SIZE.get(SIZE_INDEX));

          setTimeout(() => {
            SIZE_INDEX = Date.now() % 3;
          }, 100);
          

          return output;
}