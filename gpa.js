angular.module('app', [])
    .controller('mainCtrl', mainCtrl);

function mainCtrl ($scope)
{
    $scope.GPA = 4;
    $scope.course_count = 5;
    $scope.courses = [
	{name: "Course 1", credits: 3, grade: 'A'}, 
	{name: "Course 2", credits: 3, grade: 'A'}, 
	{name: "Course 3", credits: 3, grade: 'A'}, 
	{name: "Course 4", credits: 3, grade: 'A'}, 
	{name: "Course 5", credits: 3, grade: 'A'}
    ];
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
	    name: "Course " + (++$scope.course_count),
            credits: 3,
            grade: 'A'
        });
	$scope.updateGPA();
    }
    
    $scope.removeCourse = function(i) {
        $scope.courses.splice(i,1);
        $scope.course_count--;
        $scope.updateGPA();
    }
    
    $scope.updateGPA = function() {
        //GPA formula
        //GPA = (sum of grade points for all classes) / (total credit hours)
        //To get grade points for a class, (credit hours) * (weight for grade in class)
        var pts = 0;
        var totalCredits = 0;
        angular.forEach($scope.courses, function(course, key) {
		console.log("Entered");
//            console.log("Credits: "+course.credits+" | Grade: "+course.grade+" | Weight: "+$scope.gradesMap[course.grade]);
            if(course.credits){
                pts += (parseFloat(course.credits) * parseFloat($scope.gradesMap[course.grade]));
                totalCredits += parseFloat(course.credits);
            }
        })
        console.log("Points: " +pts+" | Credits "+totalCredits);
        $scope.GPA = (pts / totalCredits);
    }
}
