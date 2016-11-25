// /**
//  * Created by ekkert on 23.11.16.
//  */
// (function () {
//   'use strict';
//   //import
//   const RegisterFormView = window.RegisterFormView;
//   let view;
//
//   describe('test for form validation', function () {
//     beforeEach(function () {
//       view = new RegisterFormView;
//     });
//
//     it('login valid', function () {
//       view.submitRegister();
//       // var form = $('#ui.form.register');
//       var submitCallback = jasmine.createSpy().andReturn(false);
//       form.submit(submitCallback);
//
//       $('#ui.button.registe_submit.form_button.pink').click();
//
//       expect(form.attr('action')).toEqual('/export');
//       expect($('#export_images_xml_form input').attr('value')).toEqual('22,33,44');
//       expect(submitCallback).toHaveBeenCalled();
//
//     })
//   });
// })();
