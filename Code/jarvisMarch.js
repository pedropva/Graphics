 

// extensions
 
function ArrayExtensions()
{
    // extension class
}
{
    Array.prototype.contains = function(item)
    {
        return (this.indexOf(item) != -1);
    }
 
    Array.prototype.insert = function(itemToInsert, indexToInsertAt)
    {
        this.splice(indexToInsertAt, 0, itemToInsert);
    }
}
 
function jarvisMarch(points){
    var numberOfPoints = points.length;

    var pointsSorted = sortPoints(points);       
    var pointOnHull = pointsSorted[0];
    var pointsOnHull = [ pointOnHull ];

    var displacement = new Point();
    var angleAbsolutePrev = 0;

    while (pointOnHull != pointsOnHull[0] || pointsOnHull.length == 1)
    {
        var minAngleRelativeSoFar = Number.POSITIVE_INFINITY;
        var pointWithMinAngleRelativeSoFar = null;

        for (var i = 0; i < numberOfPoints; i++)
        {       
            var pointCandidate = points[i];

            displacement.overwriteWith(pointCandidate).subtract(pointOnHull);

            var distanceFromPointOnHullToCandidate = displacement.magnitude();

            if (distanceFromPointOnHullToCandidate != 0)
            {
                var angleAbsolute = displacement.angleInCycles();
                var angleRelativeToHullEdge = 
                    angleAbsolute - angleAbsolutePrev;

                if (angleRelativeToHullEdge < 0) 
                {
                    angleRelativeToHullEdge += 1;
                }

                if (angleRelativeToHullEdge <= minAngleRelativeSoFar)
                {
                    if (angleRelativeToHullEdge == minAngleRelativeSoFar)
                    {
                        // collinear points; use closest
                        var distancePrev = displacement.overwriteWith
                        (
                            pointWithMinAngleRelativeSoFar
                        ).subtract
                        (
                            pointOnHull
                        ).magnitude();

                        if (distanceFromPointOnHullToCandidate < distancePrev)
                        {
                            minAngleRelativeSoFar = 
                                angleRelativeToHullEdge;

                            pointWithMinAngleRelativeSoFar = 
                                pointCandidate;
                        }
                    }
                    else
                    {
                        minAngleRelativeSoFar = angleRelativeToHullEdge;
                        pointWithMinAngleRelativeSoFar = pointCandidate;
                    }

                } // end if (angle < minSoFar)

            } // end if (distanceFromPointOnHullToCandidate != 0)

        } // end for (each candidate point)

        pointOnHull = pointWithMinAngleRelativeSoFar;
        pointsOnHull.push(pointOnHull);
        angleAbsolutePrev += minAngleRelativeSoFar;
    }

    return pointsOnHull;
}

function sortPoints(pointsToSort){
    var pointsSorted = [];

    for (var i = 0; i < pointsToSort.length; i++)
    {
        var pointToSort = pointsToSort[i];

        var j;
        for (j = 0; j < pointsSorted.length; j++)
        {
            var pointSorted = pointsSorted[j];
            if (pointToSort.y <= pointSorted.y)
            {
                if (pointToSort.y == pointSorted.y)
                {
                    if (pointToSort.x < pointSorted.x)
                    {
                        break;
                    }
                }
                else
                {
                    break;
                }
            }
        }
        pointsSorted.insert(pointToSort, j);
    }

    return pointsSorted;
}   


 