function getOffset(element)
{
  var bound = element.getBoundingClientRect();

  return {
    top: bound.top,
    width: bound.width,
    height: bound.height,
    left: bound.left
  };
}
var nodes = document.getElementsByTagName("*");
for(var i = 0; i<nodes.length; i++)
{
    ////////////////bounding box ///////////////////////////
    var att = document.createAttribute("data-bbox");
    var x = nodes[i].offsetLeft;
    var y = nodes[i].offsetTop;
    var width = nodes[i].offsetWidth;
    var height = nodes[i].offsetHeight;
    var space = width*height;
    if(typeof x === 'undefined')
    {
        //var svg = document.getElementsByTagName('path')[0];
        var offset = getOffset(nodes[i]);
        var x = offset.left;
        var y = offset.top;
        var width = offset.width;
        var height = offset.height;
        var space = width*height;
    }
    att.value = "" + x + " " + y + " " + width + " " + height+ " " + space;
    nodes[i].setAttributeNode(att);

    ////////////////style///////////////////////////
    var attStyle = document.createAttribute("data-style");
    var css = window.getComputedStyle(nodes[i]);
    var cssAtts="";
    for (var j=0; j<css.length; j++)
    {
        var val= css[j] + ":" + css.getPropertyValue(""+css[j]);
        cssAtts+=val+";";
    }
    attStyle.value =cssAtts;
    nodes[i].setAttributeNode(attStyle);

    ////////////////Cleaning///////////////////////////
    var checkspace = nodes[i].getAttribute("data-bbox").split(" ");
    var checkcss = nodes[i].getAttribute("data-style").toLowerCase();
    if(checkspace[4]==0 || checkcss.includes("display:none")|| checkcss.includes("visibility:hidden")|| checkcss.includes("hidden:true") || checkspace[0]<0 ||checkspace[1]<0)
    {
        var attclean = document.createAttribute("data-cleaned");
        attclean.value = "true";
        nodes[i].setAttributeNode(attclean);
    }
}