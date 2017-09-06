'use strict';

var GitHub = require('./github');
var config = {
   username: 'jkgh',
   password: 'patch1107', // Either your password or an authentication token if two-factor authentication is enabled
   auth: 'basic',
   repository: 'jkgh.github.io',///pages/mock/images
   branchName: 'master'
};
var gitHub = new GitHub(config);


var oldReadme;
var newReadme;
function getText(){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://jkgh.github.io/pages/mock/images/readme.txt', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
               console.log(request.responseText);
               oldReadme = request.responseText;
                return request.responseText;
            }
        }
    }
}

// var textFile = null,
//   makeTextFile = function (text) {
//     var data = new Blob([text], {type: 'text/plain'});

//     // If we are replacing a previously generated file we need to
//     // manually revoke the object URL to avoid memory leaks.
//     if (textFile !== null) {
//       window.URL.revokeObjectURL(textFile);
//     }

//     textFile = window.URL.createObjectURL(data);

//     // returns a URL you can use as a href
//     return textFile;
//   };
function uploadReadme(readmeFile, commitTitle) {
   // Creates an array of Promises resolved when the content
   // of the file provided is read successfully.
   var files = [];
   files[0] = readmeFile;
   var filesPromises = [].map.call(files, readFile);

   return Promise
      .all(filesPromises)
      .then(function(files) {
         return files.reduce(

            function(promise, file) {
               return promise.then(function() {
                  file.filename = "pages/mock/images/readme.txt";
                  // Upload the file on GitHub
                  return gitHub.saveFile({
                     repository: gitHub.repository,
                     branchName: config.branchName,
                     filename: file.filename,//"pages/mock/images/"+
                     content: file.content,
                     commitTitle: commitTitle
                  });
               });
            },
            Promise.resolve()
         );
      });
}
function saveTextAsFile(newFilenameToAdd, commitTitle)
{

    var textToWrite = oldReadme +"\n"+ newFilenameToAdd;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
      var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        //downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        newReadme = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        //downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        newReadme = window.URL.createObjectURL(textFileAsBlob);
        //downloadLink.onclick = destroyClickedElement;
        //downloadLink.style.display = "none";
        //document.body.appendChild(downloadLink);
    }
     uploadReadme(newReadme, commitTitle)
      .then(function() {
         alert('Your readme file has been saved correctly.');
      })
      .catch(function(err) {
         console.error(err);
         alert('Readme upload error. Please, try again.');
      });

    //downloadLink.click();
}


/**
 * Reads the content of the file provided. Returns a promise whose resolved value is an object literal containing the
 * name (<code>filename</code> property) and the content (<code>content</code> property) of the file.
 *
 * @param {File} file The file to read
 *
 * @returns {Promise}
 */
function readFile(file) {
   return new Promise(function (resolve, reject) {
      var fileReader = new FileReader();

      fileReader.addEventListener('load', function (event) {
         var content = event.target.result;

         // Strip out the information about the mime type of the file and the encoding
         // at the beginning of the file (e.g. data:image/gif;base64,).
         content = atob(content.replace(/^(.+,)/, ''));

         resolve({
            filename: file.name,
            content: content
         });
      });

      fileReader.addEventListener('error', function (error) {
         reject(error);
      });

      fileReader.readAsDataURL(file);
   });
}




/**
 * Save the files provided on the repository with the commit title specified. Each file will be saved with
 * a different commit.
 *
 * @param {FileList} files The files to save
 * @param {string} commitTitle The commit title
 *
 * @returns {Promise}
 */
function uploadFiles(files, commitTitle) {
   // Creates an array of Promises resolved when the content
   // of the file provided is read successfully.
   var filesPromises = [].map.call(files, readFile);

   return Promise
      .all(filesPromises)
      .then(function(files) {
         return files.reduce(

            function(promise, file, currentIndex) {
               console.log("current index of reduce:" + currentIndex);
               return promise.then(function() {
                  console.log("current index of reduce inside then:" + currentIndex);
                  var re = /(?:\.([^.]+))?$/;
                  var ext = re.exec(file.filename)[1]; 
                  var newFileName = document.getElementById('couponEnglishUniqueName').value;
                  currentIndex = currentIndex + 1;
                  var currentIndexString = currentIndex.toString();
                  file.filename = "pages/mock/images/" + newFileName + "_" + currentIndexString + "." + ext;
                  console.log("current file name being upload: " + file.filename);
                  // Upload the file on GitHub
                  return gitHub.saveFile({
                     repository: gitHub.repository,
                     branchName: config.branchName,
                     filename: file.filename,//"pages/mock/images/"+
                     content: file.content,
                     commitTitle: commitTitle
                  });
               });
            },
            Promise.resolve()
         );
      });
}

document.querySelector('form').addEventListener('submit', function (event) {
   event.preventDefault();

   var oldfiles = document.getElementById('file1').files;
   var fileInputs = document.getElementsByClassName('inputFile');//.files
   var files = [];
   files[0] = fileInputs[0].files[0];
   files[1] = fileInputs[1].files[0];
   files[2] = fileInputs[2].files[0];
   var commitTitle = document.getElementById('commit-title').value;

   uploadFiles(files, commitTitle)
      .then(function() {
         alert('Your file has been saved correctly.');
      })
      .catch(function(err) {
         console.error(err);
         alert('Something went wrong. Please, try again.');
      });
});

getText();




