var app = angular.module('devanaLabs', []);

app.controller('devanaCtrl', function($scope){

  $scope.root={
    "name":"root",
    "files":["Labs.html","Dzimi.js","Devana.css"],
    "foldersArray":["Folder1","Folder2"],
    "folders":{

      //Object inside of object
      "Folder1":{
        "name":"Folder1",
        "files":["File in Folder1.html"],
        "foldersArray":[],
        "folders":{}
      },
      "Folder2":{
        "name":"Folder2",
        "files":["File in Folder2.php"],
        "foldersArray":["subFolder"],
        "folders":{
          "subFolder":{
            "name":"subFolder",
            "files":["File in subFolder.php"],
            "foldersArray":[],
            "folders":{}
          }
        }
      }
    }
  };

  $scope.path = [];
  $scope.opened = $scope.root;

  $scope.openFolder = function(whichFolder){
    $scope.path.push($scope.opened);
    $scope.opened = $scope.opened.folders[whichFolder];
  };

  $scope.goBack = function(){
    $scope.opened = $scope.path[$scope.path.length-1];
    $scope.path.pop();
  };

  $scope.addFile = function(){

    if($scope.newFileName!==""){

      try {

        $scope.extension = $scope.newExtension;
        var location = $scope.locationOfFile;

        check = function(){
          if(location.indexOf("/") >= 0){
            location = location.replace("/",".folders.");
            check();
          };
        };

        check();
        if(eval("$scope."+location+".files").indexOf($scope.newFileName + $scope.extension)>-1){
          alert("File already exists!");
        }
        else {
          eval("$scope."+location+".files").push($scope.newFileName + $scope.extension);
          $scope.addFileVisibility=false;
        };
      }

      catch(err){
        alert("Some folder does not exist!");
      };
    }
    else {
      alert("Please, enter file name!");
    }
  };

  $scope.addFolder = function(){

    if($scope.newFolderName!==""){

      try {
        var location = $scope.locationOfFolder;

        check = function(){
          if(location.indexOf("/") >= 0){
            location = location.replace("/",".folders.");
            check();
          };
        };

        check();
        if(eval("$scope."+location+".foldersArray").indexOf($scope.newFolderName)>-1){
          alert("Folder already exists!");
        }
        else{
          eval("$scope."+location+".folders")[$scope.newFolderName]={};
          eval("$scope."+location+".folders")[$scope.newFolderName].name=$scope.newFolderName;
          eval("$scope."+location+".folders")[$scope.newFolderName].files=[];
          eval("$scope."+location+".folders")[$scope.newFolderName].folders={};
          eval("$scope."+location+".folders")[$scope.newFolderName].foldersArray=[];
          eval("$scope."+location+".foldersArray").push($scope.newFolderName);
          $scope.addFolderVisibility = false;
        }
      }

      catch(err){
        alert("Some folder does not exist!");
      };
    }
    else {
      alert("Please, enter folder name!");
   }
  };

  $scope.showEditFileModal = function(file){

    publicFile = file;
    if(file.indexOf(".html")>-1){
      $scope.editedExtension=".html";
      file = file.replace(".html","");
    }
    else if(file.indexOf(".js")>-1){
      $scope.editedExtension=".js";
      file = file.replace(".js","");
    }
    else if(file.indexOf(".css")>-1){
      $scope.editedExtension=".css";
      file = file.replace(".css","");
        }
    else if(file.indexOf(".php")>-1){
      $scope.editedExtension=".php";
      file = file.replace(".php","");
    };

    $scope.editedFileName = file;
    $scope.editFileVisibility=true;
  };

  $scope.editFile = function(){

    $scope.extension = $scope.editedExtension;

    if(eval($scope.opened.files).indexOf($scope.editedFileName + $scope.extension)>-1){
      alert('File with that name already exist!');
    }
    else{
      var indexOfFile = eval($scope.opened.files).indexOf(publicFile);
      eval($scope.opened.files)[indexOfFile] = $scope.editedFileName + $scope.editedExtension;
      $scope.editFileVisibility = false;
    }
  };

  $scope.showEditFolderModal = function(folderName){

    publicFolderName = folderName;
    $scope.editFolderVisibility=true;
    $scope.editedFolderName = folderName;
  };

  $scope.editFolder = function(){

    oldFolder = eval($scope.opened.folders)[publicFolderName];

    if(oldFolder.name!==$scope.editedFolderName){
      if(eval($scope.opened).foldersArray.indexOf($scope.editedFolderName)>-1){
        alert("Folder with that name already exist!");
      }
      else {
        delete eval($scope.opened.folders)[publicFolderName];

        var newFolderName = $scope.editedFolderName;
        var indexInArray = eval($scope.opened.foldersArray).indexOf(publicFolderName);

        eval($scope.opened.foldersArray)[indexInArray] = newFolderName;
        eval($scope.opened.folders)[newFolderName] = {};
        eval($scope.opened.folders)[newFolderName].name = newFolderName;
        eval($scope.opened.folders)[newFolderName].files = oldFolder.files;
        eval($scope.opened.folders)[newFolderName].folders = oldFolder.folders;
        eval($scope.opened.folders)[newFolderName].foldersArray = oldFolder.foldersArray;

        alert("Folder is edited!");
        $scope.editFolderVisibility = false;
      }
    };
  };

  $scope.deleteFile=function(file){
    var indexOfFile=eval($scope.opened.files).indexOf(file);
    eval($scope.opened.files).splice(indexOfFile,1);
  };

  $scope.deleteFolder=function(folder){
    var indexOfFolder=eval($scope.opened.foldersArray).indexOf(folder);
    eval($scope.opened.foldersArray).splice(indexOfFolder,1)
    delete eval($scope.opened.folders)[folder];
  };

  $scope.refreshFileInputs=function(){
    $scope.newFileName="";
    $scope.newExtension=".html";
    $scope.locationOfFile="root";
  };

  $scope.refreshFolderInputs=function(){
    $scope.newFolderName="";
    $scope.locationOfFolder="root";
  };

  $scope.getExtension=function(value){

    if(value.indexOf(".html")>-1){
      return "html";
    }
    else if(value.indexOf(".js")>-1){
      return "js";
    }
    else if(value.indexOf(".css")>-1){
        return "css";
    }
    else if(value.indexOf(".php")>-1){
        return "php";
    }
  };
});
