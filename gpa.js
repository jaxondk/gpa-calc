angular.module('app', [])
    .controller('mainCtrl', mainCtrl);

function mainCtrl ($scope)
{
    $scope.GPA = '___'
    $scope.courses = [{credits: 3, grade: 'A'}, {credits: 3, grade: 'A-'}, {credits: 3, grade: 'A'}, {credits: 3, grade: 'A'}, {credits: 3, grade: 'A'}];
    $scope.gradesMap = {};
    $scope.gradesMap["A"] = 4;
    $scope.gradesMap["A-"] = 3.7;
    $scope.gradesMap["B+"] = 3.3;
    $scope.gradesMap["B"] = 3;
    $scope.gradesMap["B-"] = 2.7;
    $scope.gradesMap["C+"] = 2.3;       //Weights taken from http://www.back2college.com/gpa.htm
    $scope.gradesMap["C"] = 2;
    $scope.gradesMap["C-"] = 1.7;
    $scope.gradesMap["D+"] = 1.3;
    $scope.gradesMap["D"] = 1;
    $scope.gradesMap["D-"] = 0.7;
    $scope.gradesMap["F"] = 0;
    $scope.gradeOptions = Object.keys($scope.gradesMap);
    
    $scope.addCourse = function() {
        $scope.courses.push({
            credits: 3,
            grade: 'A'
        });
    }
    
    $scope.removeCourse = function(i) {
        $scope.courses.splice(i,1);
        $scope.updateGPA();
    }
    
    $scope.updateGPA = function() {
        //GPA formula
        //GPA = (sum of grade points for all classes) / (total credit hours)
        //To get grade points for a class, (credit hours) * (weight for grade in class)
        var pts = 0;
        var totalCredits = 0;
        angular.forEach($scope.courses, function(course, key) {
//            console.log("Credits: "+course.credits+" | Grade: "+course.grade+" | Weight: "+$scope.gradesMap[course.grade]);
            if($scope.credits){
                pts += (course.credits * $scope.gradesMap[course.grade]);
                totalCredits += course.credits;
            }
        })
        console.log("Points: " +pts+" | Credits "+totalCredits);
        $scope.GPA = (pts / totalCredits);
    }
}
