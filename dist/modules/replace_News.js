module.exports = (template,item) => {
                let output = template.replace("{%BY%}",item.by);
                    output = output.replace("{%ADDED%}",item.added);
                    output = output.replace("{%SOURCE%}",item.source);
                    output = output.replace("{%IMAGE%}",item.image);
                    output = output.replace("{%TITLE%}",item.title);
                    output = output.replace("{%URL%}",item.url);
                    output = output.replace("{%DESCRIPTION%}",item.description);
                    output = output.replace("{%READ%}",item.read);

                    return output;

}