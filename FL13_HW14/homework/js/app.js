function Student(name, email) {
    let _name = name;
    let _email = email;
    let _homeworkResults = [];
    this.getName = function() {
        return _name;
    }
    this.getEmail = function() {
        return _email;
    }
    this.addHomeworkResult = function(topic, success) {
        _homeworkResults.push({topic: topic, success: success});
    } 
    this.getHomeworkResults = function() {
        return _homeworkResults;
    }
}

function FrontendLab(students, failedLimit) {
    let _studentsList = [];
    for (let i = 0; i < students.length; i++) {
        _studentsList[i] = new Student(students[i].name, students[i].email);
    }
    let _failedHomeworksLimit = failedLimit;
    this.printStudentsList = function() {
        for (let i = 0; i < _studentsList.length; i++) {
            console.log('name: ' + _studentsList[i].getName() + ', email: ' + _studentsList[i].getEmail());
            console.log(_studentsList[i].getHomeworkResults());
        }
    }
    this.addHomeworkResults = function(homeworkResult) {
        for (let i = 0; i < _studentsList.length; i++) {
            let result = homeworkResult.results.find(item => _studentsList[i].getEmail() === item.email).success;
            _studentsList[i].addHomeworkResult(homeworkResult.topic, result);
        }
    }
    this.printStudentsEligibleForTest = function() {
        for (let i = 0; i < _studentsList.length; i++) {
            let count = 0;
            let hwres = _studentsList[i].getHomeworkResults();
            for (let j = 0; j < hwres.length; j++) {
                count += hwres[j].success ? 0 : 1;
            }
            if (count <= _failedHomeworksLimit) {
                console.log('name: ' + _studentsList[i].getName() + ', email: ' + _studentsList[i].getEmail());
            }
        }
    }
}
