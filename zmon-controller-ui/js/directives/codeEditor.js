angular.module("zmon2App").directive("codeEditor", ["$timeout",
    function($timeout) {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function (scope, elem, attrs, ngModel) {
                var editor = ace.edit(elem[0]);
                var session = editor.getSession();

                // Set editor options. Default theme is chrome.
                // Set editor max lines to 20 so it expands automatically for longer contents.
                editor.setTheme("ace/theme/chrome");
                editor.setShowPrintMargin(false);

                // Get language (edit mode) from the element data. If not set, use JSON.
                var editMode = attrs.codeLanguage;
                if (editMode) {
                    editMode = "ace/mode/" + editMode;
                } else {
                    editMode = "ace/mode/json";
                }
                session.setMode(editMode);

                // Data binding to ngModel
                ngModel.$render = function () {  
                    try{
                       var value =   JSON.parse(ngModel.$viewValue);
                        if(value.alertErrorMessage){                          
                            ngModel.$viewValue = typeof value.alertErrorMessage == "string"? value.alertErrorMessage.replace(/\\n/g,"\r").replace(/\\n/g,"\r"):JSON.stringify(value.alertErrorMessage,null, 2);
                        }
                    }  
                    catch(er){}                            
                    session.setValue(ngModel.$viewValue)
                    session.setUseWrapMode(true);
                    editor.clearSelection();
                };

                // Update model value when user edits something on the editor.
                editor.on("change", function () {
                    $timeout(function () {
                        scope.$apply(function () {
                            var value = editor.getValue();
                            ngModel.$setViewValue(value);
                        });
                    }, 0);
                });

                // Destroy editor when element is removed from the view.
                elem.on('$destroy', function() {
                    editor.session.$stopWorker();
                    editor.destroy();
                });

                // Observe read-only attribute.
                attrs.$observe("readonly", function (value) {
                    editor.setReadOnly(value === "true");
                });

                // Add "required" validator handler.
                var validator = function(value){
                    var isRequired = $(elem).attr("required");
                    if (isRequired && isRequired !== "") {
                        ngModel.$setValidity("required", editor.getSession().getValue().toString().length > 0);
                    }
                    return value;
                };

                ngModel.$parsers.unshift(validator);
                ngModel.$formatters.unshift(validator);

                scope.$watch(function() {
                    return [elem[0].offsetWidth, elem[0].offsetHeight];
                }, function() {
                    editor.resize();
                    editor.renderer.updateFull();
                }, true);
            }
        };
    }]);
