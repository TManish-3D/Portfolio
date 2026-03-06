// Minimal smooth-scroll for internal links
document.addEventListener('DOMContentLoaded', function(){
	// Initialize EmailJS
	emailjs.init("8yLq6b6goMiL-j7fh");

	// Menu toggle functionality
	var menuToggle = document.getElementById('menu-toggle');
	var navMenu = document.getElementById('nav-menu');
	
	if(menuToggle && navMenu){
		menuToggle.addEventListener('click', function(){
			navMenu.classList.toggle('active');
		});
		
		// Close menu when a link is clicked
		navMenu.querySelectorAll('a').forEach(function(link){
			link.addEventListener('click', function(){
				navMenu.classList.remove('active');
			});
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach(function(a){
		a.addEventListener('click', function(e){
			var href = a.getAttribute('href');
			if(href && href !== '#'){
				var target = document.querySelector(href);
				if(target){
					e.preventDefault();
					target.scrollIntoView({behavior:'smooth', block:'start'});
				}
			}
		});
	});

	// Theme toggle (dark/light)
	var themeBtn = document.getElementById('theme-toggle');
	if(themeBtn){
		// apply saved theme
		if(localStorage.getItem('theme') === 'dark'){
			document.body.classList.add('dark');
			themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
		}

		themeBtn.addEventListener('click', function(){
			var isDark = document.body.classList.toggle('dark');
			if(isDark){
				localStorage.setItem('theme','dark');
				themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
			} else {
				localStorage.setItem('theme','light');
				themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
			}
		});
	}

	// Contact form validation and sending
	var contactForm = document.querySelector('#contact form');
	if(contactForm){
		contactForm.addEventListener('submit', function(e){
			e.preventDefault();
			var name = document.getElementById('name').value.trim();
			var email = document.getElementById('email').value.trim();
			var message = document.getElementById('message').value.trim();
			
			if(!name || !email || !message){
				alert('Please fill in all fields.');
				return;
			}
			
			// Basic email validation
			var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if(!emailRegex.test(email)){
				alert('Please enter a valid email address.');
				return;
			}
			
			// Send email using EmailJS
			emailjs.send("service_e9gj8nv", "template_qdezkvv", {
				from_name: name,
				from_email: email,
				message: message,
				to_email: "mahithethala7@gmail.com"
			}).then(function(response) {
				alert("Message sent successfully!");
				contactForm.reset();
			}, function(error) {
				alert("Failed to send message. Please try again.");
			});
		});
	}
});


// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll(){
	const windowHeight = window.innerHeight;
	reveals.forEach(el => {
		const elementTop = el.getBoundingClientRect().top;
		if(elementTop < windowHeight - 100){
			el.classList.add('active');
		}
	});
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
