$(document).ready(function() {
  $('#tryitForm').bootstrapValidator({
      feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
          firstName: {
              validators: {
                  notEmpty: {
                      message: 'The first name is required and cannot be empty'
                  }
              }
          },
          lastName: {
              validators: {
                  notEmpty: {
                      message: 'The last name is required and cannot be empty'
                  }
              }
          },
          email: {
              validators: {
                  notEmpty: {
                      message: 'The email address is required'
                  },
                  emailAddress: {
                      message: 'The input is not a valid email address'
                  }
              }
          },
          gender: {
              validators: {
                  notEmpty: {
                      message: 'The gender is required'
                  }
              }
          }
      },
      submitHandler: function(validator, form, submitButton) {
          var fullName = [validator.getFieldElements('firstName').val(),
                          validator.getFieldElements('lastName').val()].join(' ');
          alert('Hello ' + fullName);
      }
  });
});