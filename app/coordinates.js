
module.exports.getActiveLocations = function(unix_timestamp)
{
    var fs = require('fs');
    var date = new Date(unix_timestamp*1000); // include milliseconds

    //todo: create MySQL database, rather than reading data from a file
    var jsonContent = JSON.parse(fs.readFileSync(__dirname + '/data.json', 'utf8')); // read data from database
    
    // find all objects that fall in the range of the date provided
    var filteredItems = jsonContent.filter(
        (item) => {
            var dateCreated = new Date(item.date_created)
            var dateDisabled = item.date_disabled == null ? Date.now() : new Date(item.date_disabled);           
            return date > dateCreated && date < dateDisabled;
    });

    return filteredItems;
}
