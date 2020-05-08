
function init_() {
				 const wid = $(window).width();
				 if (wid < 800) {
					 $('.sec_2').data('wow-offset', '0');
					 console.log($('.sec_2').data('wow-offset'));
				 }

	       console.log($('.sec_2').data('wow-offset'));


  $('.about_section-title').lettering();
  $('.price_section-title').lettering();
  $('.costomer_section-title').lettering();

  function animation(e) {
  		const title1 = new TimelineMax();

  		title1.staggerFromTo(
      e, 1,
  		{ ease: Back.easeOut.config(3.7), opacity: 0, bottom: -100 },
  		{ ease: Back.easeOut.config(3.7), opacity: 1, bottom: 0 }, 0.05,
    );
  }

	  function elementScrolled(elem, offset, handler) {
	  	if ($(elem).hasClass('animated_')) {
	  		$(window).off('scroll', handler);
	  		return false;
  		}

	    const docViewTop = $(window).scrollTop();
	    const docViewBottom = docViewTop + $(window).height();
	    let elemTop = $(elem).offset().top;
	    elemTop += parseFloat(offset);
	    return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
  }


  const o = $('.card');
  $('.top').on('mousemove', (t) => {
    const e = -($(window).innerWidth() / 2 - t.pageX) / 40;
    const n = ($(window).innerHeight() + 200 / 2 - t.pageY) / 60;
    o.attr('style', `transform: rotateY(${e}deg) rotateX(${n}deg);-webkit-transform: rotateY(${e}deg) rotateX(${n}deg);-moz-transform: rotateY(${e}deg) rotateX(${n}deg)`);
  });

  var handler_ = function () {
    // console.log('fire');
		  if (elementScrolled('.about_section-title', 400, handler_)) {
		  	const e_about = $('.about_section-title span');
		  	animation(e_about);
		  	$('.about_section-title').addClass('animated_');
		  	$('.about_section-title_container').css('opacity', 1);
		  }
  };

  var handler_price_title = function () {
    // console.log('fire');
		  if (elementScrolled('.price_section-title', 400, handler_price_title)) {
		  	const e_about = $('.price_section-title span');
		  	animation(e_about);
		  	$('.price_section-title').addClass('animated_');
		  	$('.price_section-title_container').css('opacity', 1);
		  }
  };

  var handler_costomer_title = function () {
    console.log('fire');
		  if (elementScrolled('.costomer_section-title', 400, handler_costomer_title)) {
		  	const e_about = $('.costomer_section-title span');
		  	animation(e_about);
		  	$('.costomer_section-title').addClass('animated_');
		  	$('.costomer_section-title_container').css('opacity', 1);
		  }
  };


  $(window).scroll(handler_);
  $(window).scroll(handler_price_title);
  $(window).scroll(handler_costomer_title);


  $('.hideSeekTab').on('click', function () {
    // if the one you clicked is open,
    if ($(this).find('p').hasClass('open')) {
      // then close it.
      $('.hideSeekTab .open').slideToggle().removeClass('open');
      $('.iconBox').removeClass('closed');
      // otherwise,
    } else {
      // close all tabs,
      $('.hideSeekTab .open').slideToggle().removeClass('open');
      // and open the one you clicked
      $(this).find('p').slideToggle().addClass('open');
      $('.iconBox').removeClass('closed');
      $(this).find('.iconBox').addClass('closed');
    }
  });
}


// ajax Request

$('.trigger_handler').click(() => {
  const but = $('.input_file');
  but.click();
});

window.uploaded_file = '';


function removeUploadLayout() {
  $('body').removeClass('bg-white');
  $('.container-fluid').css('display', 'none');
  $('.container_').css('display', 'block');
  $('.container_').css('visibility', 'visible');
}


// PARALLAX
//

// $.ajaxSetup({
//     headers: {
//         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//     }
// });


$('#myform').submit((e) => {
  if (window.uploaded_file == '' || !window.uploaded_file.uploadedFile) {
    alert('please insert file first !');
    return false;
  }
  e.preventDefault();

  localStorage.removeItem('service_id');

  loading_(true);
  let user_name;
  let user_family;
  let email;
  let mobile;
  let telegram;
  let send_via;
  let details;
  let input;

  user_name = $('input[name=user_name]').val();
  user_family = $('input[name=user_family]').val();
  email = $('input[name=email]').val();
  mobile = $('input[name=mobile]').val();
  telegram = $('input[name=telegram]').val();
  send_via = $('input[name=send_via]:checked').val();
  details = $('textarea[name=details]').val();
  input = window.uploaded_file.uploadedFile._id;


  console.log(input);

  function loading_(state) {
    if (state) {
      $('.fs-submit').text(' Loading ');
      return false;
    }

    $('.fs-submit').text('Send');
    return false;
  }


  $.ajax({
    url: `${SERVER_ADDRESS}/v1/services`,
    type: 'POST',


    data: {
      name: user_name,
      family: user_family,
      email,
      mobile,
      telegram,
      send_via,
      details,
      service_file: window.uploaded_file.uploadedFile._id,
      service_type: serviceType,
      service_kind: serviceKind,
    },
    success(result) {
      console.log('success');
      alert('done ');
      loading_(false);
      window.uploaded_file = '';
      console.log(result);

      // Redirect if Receipt done
      if (result.status == 201 && result.redirect) {
        var service_id = result.data._id;
        console.log('saved service');
        console.log(service_id);
        localStorage.setItem('service_id', service_id.toString());
        window.location.href = result.redirect;
      } else {
        alert('Please Try Again');
      }
    },
    error(err) {
      console.log(err);
      loading_(false);
      alert('Please Try Again');
    },
  });
});


function loading(state) {
  const ele = $('#sub_upload');

  if (state) {
    ele.prop('value', 'Loading ...');
    return false;
  }

  ele.prop('value', 'Submit');
}


$('#upload_').submit((event) => {
  if ($('.input_file')[0].files.length == 0) {
	  alert('please insert file first !');
	  return false;
  }
  event.preventDefault();
  loading(true);
  const formData = new FormData($('#upload_')[0]);

  console.log(formData);
  $.ajax({
    url: `${SERVER_ADDRESS}/upload`,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success(result) {
      console.log(result.statusText);
      if (result.statusText == 'error') {
        alert('server error, please check your connections');
        loading(false);
        return false;
      }
      console.log('success');
      console.log('result of server ');
      console.log(result);
      window.uploaded_file = result;
      loading(false);
      removeUploadLayout();
    },
    error(data) {
      console.log(data);
      if (data.statusText == 'error') {
			  alert('server error, please check your connections');
			  loading(false);
			  return false;
      }
    },
  });
});


$(window).scroll(() => {
  parallax();
});

function parallax() {
  const scrolled = $(window).scrollTop();
  $('.bg').css('top', `${-(scrolled * 0.1)}px`);
  $('header .content').css('top', `${50 + (scrolled * 0.1)}%`);
  $('header .content').css('opacity', 1 - (scrolled * 0.01) / 10);
  $('header .content').css('opacity', 1 - (scrolled * 0.01) / 10);
}
