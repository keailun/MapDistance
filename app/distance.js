module.exports.getDistance = function (pointsObject)
{
    // first do a basic check to see if the JSON object provided is valid
    if (validatePointsObject(pointsObject))
    {
      var point1 = pointsObject.point1;
      var point2 = pointsObject.point2;
      return getDistanceFromLatLonInMeters(point1, point2);
    }
    else // throw error if object is valid
    {
        return new Error('Invalid JSON object provided.')
    }
};

function getDistanceFromLatLonInMeters(point1, point2) 
{
  var lat1 = point1.lat;
  var lon1 = point1.lng;
  var lat2 = point2.lat;
  var lon2 = point2.lng;
  var earthRadius = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = (earthRadius * c) * 1000; // Distance in meters
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
 
// todo: Create JSON schema and validate object against schema
function validatePointsObject(pointsObject)
{ 
    var valid = true;
    valid &= pointsObject['point1'] != null && pointsObject['point2'] != null; // first check parent nodes

    if (!valid)
      return false;

    valid &= !isNaN(pointsObject['point1']['lat']) && !isNaN(pointsObject['point1']['lng']);
    valid &= !isNaN(pointsObject['point2']['lat']) && !isNaN(pointsObject['point2']['lng']);

    return valid;
}