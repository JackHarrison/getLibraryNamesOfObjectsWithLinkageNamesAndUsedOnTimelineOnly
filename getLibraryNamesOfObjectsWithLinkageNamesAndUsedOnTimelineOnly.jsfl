/**
 * Created with IntelliJ IDEA.
 * User: johnsky
 * Date: 29/01/2018
 * Time: 14:41
 * To change this template use File | Settings | File Templates.
 */

var dom = fl.getDocumentDOM();
var items = dom.library.items;
var lib= dom.library;
var libraryItemNames = new Array();
var activeItem;

for(var i=0;i<items.length;i++){

    if (items[i].linkageClassName != undefined) {
        libraryItemNames.push(items[i].name+"\n"+"--------------------------------------------------------------------------------------------------------------------------------");
    }
}

libraryItemNames.sort();

fl.trace("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$LIBRARY ITEMS WITH A LINKAGE NAME");
fl.trace("\n");
fl.trace(libraryItemNames.join("\n"));

fl.trace("\n");
fl.trace("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ LIBRARY ITEM THAT ARE USED ON THE TIMELINE");


for(var i=0;i<items.length;i++){
    activeItem = items[i];
    scanTimeline(dom.getTimeline(), true);
}


function scanTimeline(_timeLine, _mainTimeline) {
    var timeline = _timeLine;
    var layerCount = timeline.layerCount;
    while (layerCount--) {

        var frameCount = timeline.layers[layerCount].frameCount;

        while (frameCount--) {


            if( timeline.layers[layerCount].frames[frameCount] == undefined ) continue;

            var elems = timeline.layers[layerCount].frames[frameCount].elements;
            var p = elems.length;

            while(p--)
            {

                //ELEMENT Types
                //shape, text, instance, shapeObj

                //ITEM Types
                //undefined, component, movie clip, graphic, button, folder, font, sound, bitmap, compiled clip, screen, video

                //Check if it's an Instance in the Library
                if (elems[p].elementType == "instance") {
                    //Check if it's the same clip as our the active check
                    if (elems[p].libraryItem.name == activeItem.name) {
                        found = true;
                        var where;
                        if (_mainTimeline == true) {
                            where = "Located in Main Timeline";
                        }
                        else {
                            where = "Located in Library Item: " + item.name;
                        }
                        fl.trace( "" );
                        fl.trace("[FOUND " + activeItem.name + "]\n-" + where + "\n-On Layer: " + layerCount + "\n-On Frame: " + frameCount+"\n"+"--------------------------------------------------------------------------------------------------------------------------------");
                        frameCount = 0;
                    }
                }
            }
        }
    }
}


function scanLibrary() {

    var items = lib.items;


    for (var i = 0; i < items.length; i++) {

        item = items[i];
        if (item.itemType == 'movie clip') {

            scanTimeline(item.timeline, false);

        }
    }
}